import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "Qwen/Qwen2.5-7B-Instruct"
device = "cuda" if torch.cuda.is_available() else "cpu"  # GPU 사용 가능 여부 확인

model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype=torch.float16,  # float16 사용으로 속도 향상 가능
    device_map="auto"
).to(device)  # 명시적으로 GPU로 이동

tokenizer = AutoTokenizer.from_pretrained(model_name)

prompt = "이 문장이 긍정인지 부정인지 점수만 판단해줘 (50이상 긍정, 50이하부정)"
messages = [
    {
      "role":"user","content":prompt
    },
    {
    "role": "user", "content": "안녕하세요 에브리데이 맘입니다. 주말에 딸아이랑 영화를 보고 주변에서 밥을 먹으려 찾다가 24시 황기 닭곰탕 식당을 오게되었어요 매장이 엄청 넓고 깨끗하였어요 2층에는 단체분들이 계셨는지 꽤 시끌벅적 하더라구요. 그런데 밖이 쌀쌀한 편이였는데 난방은 안해놓으셨더라구요 처음엔 춥다고 못느꼈지만 차차 ㅠㅠ 저희는 닭곰탕과 닭백반 새우튀김을 주문했어요 닭백반이 뭔지 물어봤더니 닭살,닭껍질,닭다리 이렇게 조금씩 나오는 거라 해서 궁금해서 주문해봤어요. 닭곰탕 먼저 나와서 다데기를 풀었어요. 소금과 후추를 넣어서 간을 맞췄어요. 그다음 닭백반 다른 접시에 닭살,껍질,닭다리가 나오고 그냥 소스에 찍어 드셔도되고 육수국물에 담가서 드셔도 된다고 하시더라구요. 짜잔~~ 새우튀김 바삭바삭하고 뜨겁고 뭣모르고 입에 넣었다가 입천장 다 까지는줄 알았어요 돈까스는 제가 포장해서 먹어봤는데 바삭하고 고기 냄새도 안나고 맛있었어요 닭곰탕도 한번 먹어보고 싶어서 온거였는데 닭은 사실 좀 질겼고 잡내도 있었고 육수도 깊은맛은 없었어요 더군다나 날씨가 추운데 난방을 안한상태로 먹다가 탕과 닭고기들이 금방 식어서 더 맛없다고 느낀게 아닌가 싶어요. 다 먹고나서 느낀거지만 진작에 난방을 좀 해달라고 할걸 그랬나봐요. ㅎㅎ #중랑구 #면목동 #24시황기닭곰탕"
    }
]

text = tokenizer.apply_chat_template(
    messages,
    tokenize=False,
    add_generation_prompt=True
)

model_inputs = tokenizer([text], return_tensors="pt").to(device)  # GPU로 이동

with torch.no_grad():  # 메모리 사용 최적화
    generated_ids = model.generate(
        **model_inputs,
        max_new_tokens=512
    )

generated_ids = [
    output_ids[len(input_ids):] for input_ids, output_ids in zip(model_inputs.input_ids, generated_ids)
]

response = tokenizer.batch_decode(generated_ids, skip_special_tokens=True)[0]
print(response)
