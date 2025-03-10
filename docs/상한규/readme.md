## 상한규 오늘 학습한 일

<details><summary>2025.03.03 (월)</summary>

# Atomic Design

## 아토믹 디자인은 개발하고자 하는 컴포넌트를 잘게 쪼개어 원자 단위의 제작을 하는 UI 설계 원칙이다.

### 컴포넌트 제작 단위는 Atoms, Molecules, Organisms, Templates, Pages로 나뉘게 된다. 그리고 이에 따라 프로젝트 폴더가 구성된다.

### 개발에 들어간다면 페이지를 구성하고 컴포넌트 제작을 시작한다. 하나의 버튼, 하나의 인풋 필드, 하나의 아이콘 등 한 기능을 담당하는 것들이 Atoms에 속하게 된다. 이러한 Atoms의 집합이 Molecules가 된다. 이는 하단에서 더욱 자세히 다루도록 한다.

### 아토믹 디자인은 컴포넌트 단위의 개발을 하기 때문에 재사용성을 높여준다. Atoms 단위의 컴포넌트는 재사용성을 고려하여 매개변수 등을 설정하는 것이 좋지만, Atoms를 포함한 모든 단위 즉, Molecules와 Organisms 등 전부 처음부터 재사용성을 고려할 필요가 없다. 개발을 하는 과정에서 해당 컴포넌트가 재사용이 된다고 판단이 되었을 때 매개변수를 추가해주는 등의 Agile한 방식을 따르는 것이 더욱 효율적이다.

### 만일 특정 컴포넌트가 더 이상 재사용되지 않을 것이라고 확신되면 컴포넌트화 하지 않아도 된다. 즉, 텍스트와 같은 간단한 것들은 굳이 컴Atoms로 만들지 않는 것이 좋다. 항상 개발에 앞서 효율을 생각해야 한다.

### 컴포넌트 단위에 따라 폴더를 나눌 것이지만, 실제 개발 시에는 Buttons와 같이 비슷한 단어를 자동 완성으로 import해오기 때문에 컴포넌트 네이밍 뒤에 Atoms, Molecules과 같이 명명해주는 것이 좋다. (SIgnInButtonAtoms.tsx)

### 재사용성을 고려하여 Buttons와 같이 큰 범주를 갖게 끔 설계를 할 수 있지만, 이와 같은 Atoms를 계속 사용하다 보면 많은 페이지에서 수정을 해야 할 수도 있다. 그리하여 넓은 범위의 페이지가 아니더라도, 비슷한 Atoms를 계속 만들어 사용해도 무방하다. (SignInButtonAtoms, AcceptButtonAtoms 등..)

### Atoms(원자)

가장 작은 단위의 컴포넌트. 버튼, 텍스트, 아이콘 등의 가장 작은 기능을 담당한다. 하지만 텍스트 등 너무 간단하여 굳이 원자로 뺄 필요가 없다고 판단되는 컴포넌트의 경우 굳이 원자로 만들지 않고, 분자 혹은 유기체에서 바로 선언하여 사용하는 것이 좋다. 원자 컴포넌트는 단일 책임 원칙을 따른다.

처음 개발할 때에는 일단 페이지에 컴포넌트를 만들고, 재사용이 될 것 같다고 판단이 될 때 따로 빼는 것이 좋다. 처음부터 재사용성을 고려하여 원자화한다면 개발 효율을 해칠 수 있다.

### Molecules(분자)

원자 컴포넌트의 모임이다. 입력 폼, 카드 등 UI 컴포넌트가 여기에 해당된다. 개발을 하다보면 제일 많이 만들어지는 컴포넌트로, 원자의 경우 너무 간단하여 생략하는 것이 많지만, 분자는 UI를 짜는 데에 있어 중요하여 많이 생성한다.

### Organisms(유기체)

원자, 또는 분자 컴포넌트의 모임이다. 분자보다 더욱 넓은 범위의 섹션을 가지게 된다. 아이콘 원자, 네비게이션 원자, 인풋 폼 분자 등이 모여 Header를 구성하게 되면, 이는 유기체에 해당된다. 즉, 섹션 혹은 그와 준하는 것들이 이 곳에 해당된다.

### Templates(템플릿)

앞선 단위의 컴포넌트들이 구성되어 있는 레이아웃을 미리 짜주는 구조다. 템플릿은 컴포넌트보다는 구조, 틀에 가깝다고 생각하는 것이 좋으며, 그렇기 때문에 실제 개발 시에는 같은 형식의 페이지가 존재하지 않는다면 거의 만들어지지 않는다. 즉, 페이지에 대한 스켈레톤이라고 생각하는 것이 좋다.

### Pages(페이지)

실제 유저에게 제공되는 콘텐츠가 담긴 컴포넌트다. 앞선 모든 컴포넌트가 담기며, 페이지의 구조가 재사용된다면, 이를 템플릿으로 빼게 된다.

### 비즈니스 로직은 페이지에 두는 것을 원칙으로 하지만, 상황에 따라 유기체에도 들어갈 수 있다.

### 컴포넌트의 단위를 나누는 것이 까다로우며, 개인마다 기준이 달라 협업 시 불편을 줄 수 있다. 하지만 서로 배려하며 협업을 해가면서 그 기준을 정립하는 것을 추천한다. 기준이 서로 다르다고 미워하지말자..!

### 아토믹 디자인은 CDD(Component Driven Development)의 개발 프로세스와 Storybook과 깊은 연관이 있다. 스토리북과 관한 내용은 하단을 참조한다.

[Storybook](https://www.notion.so/Storybook-1a7e2a727e998061aaa1c3d187a160d1?pvs=21)

</details>

<br/>

<details><summary>2025.03.04 (화)</summary>

### 추천 프론트엔드 스택

- 대규모 실시간 데이터 처리가 필요하므로, CSR 기반으로 구성하는 것이 유리함
- Next.js를 사용하더라도 ISR (Incremental Static Regeneration)과 CSR 조합 추천
- 상태 관리와 데이터 스트리밍을 최적화하여 성능 향상

| 역할                               | 추천 기술                                   |
| ---------------------------------- | ------------------------------------------- |
| 프레임워크                         | Next.js (ISR + CSR) or Vite + React         |
| 차트 라이브러리                    | Recharts, Apache ECharts, D3.js, Highcharts |
| 상태 관리                          | Recoil, SWR, React Query                    |
| 데이터 스트리밍                    | WebSocket, SSE (Server-Sent Events)         |
| 가상화 렌더링 (대량 데이터 최적화) | react-virtualized, react-window             |
| CSS/UI 라이브러리                  | Tailwind CSS, Material-UI, Ant Design       |

=> 향후 ssr이나 ssg로 발전할 가능성이 있다면 nextjs를 쓰는 것이 좋아보이나, 우리는 따로 api 백앤드가 있기 때문에 굳이 그러지 않고, vite + react를 써도 될 것 같다.

어쨌든 실시간 데이터 처리에는 CSR 기반이 성능적으로 유리하기 때문.

차트를 많이 사용할 것이기 때문에 자체 구현을 고려해보거나, 차트를 사용해야 할 것 같다.

데이터 스트리밍은 단방향 양방향이 확인되고 생각하면 되겠다.

대량 데이터가 필요할 수 있으므로, react-virtrualized 생각해야겠다.

상태관리가 react query를 고려해볼만 한 것 같다.

</details>

<br/>

<details><summary>2025.03.05 (수)</summary>

https://storybook.js.org/

## 스토리북이란?

UI 개발을 돕는 도구다. 프론트앤드 측에서 컴포넌트를 제작하는 데에 이를 실제 어떻게 동작하는지 확인하고, 테스트 하며, 문서화해주는 아주 강력한 도구다.

리액트, vue 등 많은 프레임워크를 지원하고 있으며, 해당 프레임워크로 컴포넌트를 제작하고, .stories.ts를 만들어 스토리북 관련 설정을 작성하면 위에 보이는 스토리북 툴에 접속하여 해당 컴포넌트의 동작, 테스트, 문서화를 할 수 있게 된다.

## 프로젝트 적용법

1. vite를 통해 react 프로젝트를 생성한다.
2. 해당 프로젝트 root 폴더에서 `npx sb init`을 실행한다.
3. `yarn storybook` 을 통해 스토리북을 실행한다.

⇒ 열심히 써보죠. 파이팅!

</details>

<br/>

<details><summary>2025.03.06 (목)</summary>

# React에서 SSE(Server-Sent Events) 처리 및 디버깅 과정

## SSE를 적용해보다

프로젝트에서 알림을 구독하여 실시간 반영하는 기술을 도입해보았다. 이 때 조금의 난항을 겪어 이를 써보고자 한다.

## SSE란

서버 센트 이벤트라고 해서 프론트앤드에서 서버를 구독하는 형식이다. 알림 등과 같이 서버가 주기적으로 확인하고 알려주어야하는 이벤트의 경우 프론트앤드가 서버를 구독하고, 서버가 특정 이벤트가 발생했음을 알려주는 기술이다.

## SSE를 React에서 감지하는 방법

React에서 SSE(Server-Sent Events)를 감지하려면 EventSource 또는 fetch API를 사용해야 한다. 반면, Axios는 사용할 수 없다.

### 왜 Axios로 SSE를 사용할 수 없는가?

1. Axios는 단일 요청-응답 기반의 라이브러리이기 때문이다.
   - SSE는 한 번 연결하면 여러 개의 이벤트를 지속적으로 수신해야 하지만, Axios는 한 번의 요청 후 응답을 받으면 종료된다.
2. Axios는 스트리밍 응답을 지원하지 않는다.
   - SSE는 text/event-stream을 사용하여 데이터를 지속적으로 받아야 하지만, Axios는 이를 처리할 수 없다.

### SSE를 React에서 감지하는 방법

- EventSource 사용 (가장 간단한 방식)

  ```jsx
  const eventSource = new EventSource("https://example.com/notifications/subscribe")

  eventSource.addEventListener("message", (event) => {
    console.log("새로운 메시지 수신:", event.data)
  })

  eventSource.onerror = (err) => {
    console.error("SSE 에러 발생:", err)
  }
  ```

- fetch API 사용 (스트리밍 방식)

  ```jsx
  fetch("https://example.com/notifications/subscribe", {
    headers: { Accept: "text/event-stream" },
  }).then((response) => {
    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    reader.read().then(({ value, done }) => {
      if (done) return
      console.log("받은 SSE 데이터:", decoder.decode(value))
    })
  })
  ```

## 왜 EventSourcePolyfill을 사용하였는가

React에서 기본 EventSource를 사용할 수도 있지만, EventSourcePolyfill을 사용하면 Authorization과 CORS 문제를 해결할 수 있다.

### 기본 EventSource의 문제점

1. Authorization 헤더를 지원하지 않는다.
   - 기본 EventSource는 Authorization 헤더를 추가할 수 없기 때문에 JWT 인증을 사용하는 API에서 SSE를 받을 수 없다.
2. CORS(Cross-Origin Resource Sharing) 문제 발생 가능
   - 기본 EventSource는 withCredentials: true 옵션을 지원하지 않아서 쿠키나 인증 정보를 포함한 요청이 불가능하다.

우리 프로젝트는 Authroization 토큰을 통해 api를 교환하고, CORS 설정도 되어있기 때문에 EventSourcePolyFill 라이브러리를 사용하였다.

## 하지만 안됐다…. 무엇이 문제였던 것인가? (디버깅 과정)

### 백엔드 문제라고 착각했던 이유

초기에는 SSE 이벤트를 수신하지 못하는 원인이 백엔드 문제라고 생각했다. 하지만 실제로는 EventSource의 onmessage 함수에서 이벤트를 감지하지 못했기 때문이었다.

### 디버깅을 통해 알게 된 것

1. EventSource의 onmessage는 event: 필드가 없는 기본 메시지만 처리한다.
   - 만약 서버가 event: 알림처럼 특정 이벤트 이름을 지정해서 보낸다면, onmessage가 아니라 addEventListener('이벤트이름', ...)을 사용해야 한다.
2. 백엔드에서 event: ‘알림: ‘과 같은 형식으로 데이터를 보내고 있었다.

   - 예제:

     ```
     event: 알림:
     data: {"notificationId": 3857, "type": "독서록", "content": "선생님이 칭찬 도장을 주셨다."}

     ```

   - 이 경우, onmessage에서는 감지되지 않고, 올바른 이벤트 이름을 사용한 addEventListener에서만 감지되었다.
     ![image.png](attachment:8ccb2d90-6ffe-47ad-8a9e-4216592cdd81:image.png)

### 해결 방법

```jsx
// 기존: 작동하지 않음

eventSource.onmessage = (event) => {
  console.log("onmessage 실행됨:", event.data)
}

// 수정 후: 정상 동작

eventSource.addEventListener("알림: ", (event) => {
  console.log("새로운 알림 수신:", event.data)
})
```

### 결론

백엔드 문제라고 착각했지만, 실제 문제는 이벤트 이름이 있는 경우 onmessage가 아니라 addEventListener('이벤트이름', ...)을 사용해야 한다는 것이었다.
SSE 이벤트의 구조를 면밀히 살펴보는 것이 중요하다.

</details>

<br/>

<details><summary>2025.03.07 (금)</summary>
</details>
