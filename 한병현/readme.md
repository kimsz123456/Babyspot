# StoryBook (250304)

<aside>

- Storybook은 UI 컴포넌트를 개발, 테스트 및 문서화하기 위한 오픈 소스 도구.
- 개발한 공통 컴포넌트 혹은 디자인 시스템을 테스트하고 시각적으로 확인할 수 있는 환경을 제공
</aside>

## **🔎 장점**

### ✅ **독립적인 분리**

- 공통적으로 사용하는 컴포넌트들을 정의해 Storybook에 등록하려 한다면, 도메인에 상관없이 어떠한 프로젝트에서도 사용할 수 있어야 함
- 그러기 위해서 컴포넌트는 특정 관심사와 의존성들을 모두 제거해 범용성이 높고 독립적이어야 함

### ✅ **유지보수**

- 컴포넌트가 독립적이라는 것은 코드를 집중화해, 한 곳에서 관리가능
- 집중화 된 코드를 배포 후 철저한 버전관리를 통해 일관성 있는 유지보수가 가능해짐

## 💾 설치 순서

```jsx
// 1. Yarn을 전역(global)으로 설치
npm i --global yarn

// 2. 프로젝트의 node_modules을 설정하고 패키지 설치
yarn

// 3. storybook 실행
yarn storybook
```


# Styled Components (250305)

## 1. **Styled Components란?**

Styled Components는 **CSS-in-JS** 라이브러리로, JavaScript 코드 안에서 스타일을 정의하고, 컴포넌트화하여 사용할 수 있도록 도와줍니다. React와 함께 많이 사용되며, 스타일을 컴포넌트 단위로 캡슐화할 수 있다는 장점이 있음.

📌 **공식 문서:** https://styled-components.com/

## 2. **Styled Components의 주요 특징**

- CSS 문법 그대로 사용 가능
- 컴포넌트 단위 스타일링 (Scoped CSS)
    - 이 부분은 사실 module css로도 해결할 수 있음.
- props 활용 가능 → 동적 스타일 적용
- CSS 중첩(Nesting) 가능
- ThemeProvider 제공 → 전역 스타일 관리, 다크모드 적용 편함
- Global Style, Keyframes 지원 (애니메이션 가능)