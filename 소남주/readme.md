# 🗓️ 2025.03.04.TUE

## Styled Components

### 1. Styled Components란?

- CSS-in-JS 라이브러리
- JS 코드 안에서 스타일을 정의하고 컴포넌트화하여 사용할 수 있도록 도와준다.
- 주로 React와 함께 사용된다.

### 2. 주요 장점

- CSS 문법을 그대로 사용할 수 있다.
- 컴포넌트 단위의 스타일링이 가능하다. (Scoped CSS)
  - 사실 이 부분은 Styled Components만의 장점인지는 잘 모르겠다... 일반 module css로도 가능하지 않나...?
- props 활용이 가능하다. 이를 통해 동적 스타일을 적용할 수 있다.
- CSS 중첩(nesting)이 가능하다.
- ThemeProvider 제공을 통해, 전역 스타일 관리를 편하게 해준다.

# 🗓️ 2025.03.05.WED

## 자바스크립트에서 긴 작업을 분할하는 방법

### 1. `setTimeout()` + 재귀 호출

- timeout 콜백을 이용해 함수가 스스로를 재귀적으로 호출하는 방식

  ```js
  function processItems(items, index) {
    index = index || 0;
    var currentItem = items[index];

    console.log("processing item:", currentItem);

    if (index + 1 < items.length) {
      setTimeout(function () {
        processItems(items, index + 1);
      }, 0);
    }
  }

  processItems(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]);
  ```

### 2. `Async/Await` & 타임아웃

- 재귀 호출 없이 더 간결하게 처리 가능능

  ```js
  <button id="button">count</button>
  <div>Click count: <span id="clickCount">0</span></div>
  <div>Loop count: <span id="loopCount">0</span></div>

  <script>
    function waitSync(milliseconds) {
      const start = Date.now();
      while (Date.now() - start < milliseconds) {}
    }

    button.addEventListener("click", () => {
      clickCount.innerText = Number(clickCount.innerText) + 1;
    });

    (async () => {
      const items = new Array(100).fill(null);

      for (const i of items) {
        loopCount.innerText = Number(loopCount.innerText) + 1;

        await new Promise((resolve) => setTimeout(resolve, 0));

        waitSync(50);
      }
    })();
  </script>
  ```

### 3. `scheduler.postTask()`

- Chromium 브라우저에서 사용할 수 있으며, 더 정교하고 효율적으로 작업을 예약(scheduling)할 수 있도록 설계되었다.

- `postTask()`의 기본 우선순위(priority)는 “user-visible”이며, 이는 `setTimeout(() => {}, 0)`과 유사한 우선순위를 가진다.

- `setTimeout()`과는 다르게, `postTask()`는 스케줄링을 위해 만들어졌기 때문에 타임아웃의 제약을 받지 않는다. 게다가, 예약된 모든 작업은 항상 태스크 큐(task queue)의 가장 앞에 배치되므로, 다른 항목이 먼저 실행되거나 실행이 지연되는 상황을 방지할 수 있다.

  ```js
  const items = new Array(100).fill(null);

  for (const i of items) {
    loopCount.innerText = Number(loopCount.innerText) + 1;

    await new Promise((resolve) => scheduler.postTask(resolve));

    waitSync(50);
  }
  ```

### 4. `scheduler.yield()`

- 작업 도중 메인 스레드에 제어권을 넘기고, 이후에 우선순위가 지정된 작업으로 다시 실행을 계속하도록 한다. 이를 통해 장시간 실행되는 작업을 나누어 브라우저의 반응성을 유지할 수 있다.

  ```js
  const items = new Array(100).fill(null);

  for (const i of items) {
    loopCount.innerText = Number(loopCount.innerText) + 1;

    await scheduler.yield();

    waitSync(50);
  }
  ```

### 5. `requestAnimationFrame()`

- 브라우저의 화면 갱신 주기와 동기화하여 작업을 예약하도록 설계되었기 때문에, 콜백 실행 타이밍이 매우 정밀하다.

- 콜백은 항상 다음 화면이 렌더링 되기 직전에 실행되므로, 개별 작업이 매우 밀집되어 실행된다.

- 애니메이션 프레임 콜백은 사실상 렌더링 단계의 특정 시점에서 실행되는 별도의 큐를 가지고 있기 때문에, 다른 작업이 이를 방해하거나 순서를 바꾸는 것이 어렵다.

- 단, 화면 갱신 주기에 맞춰 무거운 작업을 실행하면 렌더링 성능이 저하될 수 있다. 또한, 애니메이션 프레임 콜백은 탭이 활성 상태가 아니면 보통 실행되지 않기 때문에, 이 방법을 사용하는 것은 피하는 게 좋다.

### 6. `MessageChannel()`

- 브라우저에 타이머를 대기열에 넣고 콜백을 예약하도록 요청하는 대신, 채널을 인스턴스화하고 즉시 메시지를 게시하는 방식

- 개별 작업 간의 지연 시간이 거의 없ek.

- 단, 작업 분할을 위해 설계된 API가 아니기 때문에, 선호되지 않는 방법이다.

  ```js
  for (const i of items) {
    loopCount.innerText = Number(loopCount.innerText) + 1;

    await new Promise((resolve) => {
      const channel = new MessageChannel();
      channel.port1.onmessage = resolve();
      channel.port2.postMessage(null);
    });

    waitSync(50);
  }
  ```

### 7. 웹 워커(Web Workers)

- 메인 스레드에서 작업을 실행할 필요가 없다면, 웹 워커를 가장 먼저 고려해야 한다.

  ```js
  const items = new Array(100).fill(null);

  const workerScript = `
    function waitSync(milliseconds) {
      const start = Date.now();
      while (Date.now() - start < milliseconds) {}
    }
  
    self.onmessage = function(e) {
      waitSync(50);
      self.postMessage('Process complete!');
    }
  `;

  const blob = new Blob([workerScript], { type: "text/javascipt" });
  const worker = new Worker(window.URL.createObjectURL(blob));

  for (const i of items) {
    worker.postMessage(items);

    await new Promise((resolve) => {
      worker.onmessage = function (e) {
        loopCount.innerText = Number(loopCount.innerText) + 1;
        resolve();
      };
    });
  }
  ```
