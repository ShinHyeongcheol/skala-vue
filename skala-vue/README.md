# SKALA Vue 실습 기록

## 개요

Vue 3와 Vite를 기반으로 Vue의 핵심 문법과 화면 동작을 실습하는 프로젝트입니다. 현재는 `Code Challenge`를 통해 작은 예제를 작성하고, 각 기능이 상태와 화면에 어떻게 반영되는지 확인하고 있습니다.

```bash
npm install
npm run dev
```

## 전체 프로젝트 구조

```text
src/
├── App.vue                         # 공통 레이아웃과 상단 메뉴
├── main.js                         # Vue 앱 생성 및 Router/Pinia 등록
├── router/
│   └── index.js                    # 화면 경로 설정
├── views/
│   ├── CodeChallengeView.vue       # Code Challenge 목록 화면
│   └── HandsOnView.vue             # Hands-On 목록 화면
└── components/
    └── practices/
        └── codeChallenge/          # 기능별 실습 컴포넌트
            ├── reactivity/
            ├── vueDirective/
            ├── evnetHandling/
            └── form/
```

### 화면 구성

- `App.vue`는 공통 상단 메뉴와 `<RouterView />`만 담당합니다.
- 기본 경로(`/`)는 채점 과제 화면인 `HandsOnView.vue`로 이동하며, 상단 메뉴에서 `Code Challenge` 화면으로 전환할 수 있습니다.
- `CodeChallengeView.vue`는 실습 컴포넌트를 2열 카드 그리드로 표시합니다. 각 카드는 기본적으로 닫혀 있고, `열기/접기` 토글로 필요한 예제만 확인할 수 있습니다.
- `HandsOnView.vue`는 과제 목록과 향후 구현할 Hands-On 결과물을 배치하는 화면입니다.

## Hands-On

채점 과제는 Hands-On 화면에서 별도 과제 단위로 진행할 예정입니다. 과제를 시작하면 요구사항, 구현 내용, 테스트 결과를 이곳에 추가합니다.

## Code Challenge

Vue의 개별 기능을 작은 컴포넌트로 나누어 작성했습니다. 각 카드는 기본적으로 닫혀 있으며, 필요한 실습을 열어 동작을 확인할 수 있습니다.

### 1. Reactivity

| 실습 | 사용한 기능 | 학습 내용 |
| --- | --- | --- |
| `SampleOne.vue` | `ref()`, 템플릿 보간법, `@click` | 일반 변수는 값만 변경해도 화면이 다시 렌더링되지 않지만, `ref`로 만든 반응형 상태는 값이 변경되면 화면에도 반영됨을 확인했습니다. |

### 2. Vue Directive

| 실습 | 사용한 기능 | 학습 내용 |
| --- | --- | --- |
| `DirectiveText.vue` | `{{ }}`, `v-html` | 문자열 보간은 태그를 텍스트로 표시하고, `v-html`은 HTML로 렌더링한다는 차이를 확인했습니다. 외부 입력을 `v-html`로 출력할 때는 XSS에 주의해야 합니다. |
| `DirectiveBind.vue` | `v-bind`, `:disabled`, `:class`, `:style` | 상태에 따라 버튼 속성, 클래스, 글자 크기, 박스 너비를 동적으로 바인딩했습니다. |
| `DirectiveCondition.vue` | `v-if`, `v-else-if`, `v-else`, `v-show` | 점수에 따른 등급 표시와 모달의 표시 여부를 제어하며 조건부 렌더링과 단순 표시 전환의 차이를 확인했습니다. |
| `DirectiveList.vue` | `v-for`, `:key` | 배열과 객체 데이터를 반복 렌더링하고, 목록 항목에 고유한 키를 지정하는 방법을 학습했습니다. |

### 3. Event Handling

| 실습 | 사용한 기능 | 학습 내용 |
| --- | --- | --- |
| `EventHandler.vue` | `@click`, 메서드 핸들러 | 클릭으로 반응형 카운트를 증감하고, 이벤트에서 함수를 호출했습니다. |
| `EventObject.vue` | `$event`, 이벤트 객체 전달 | 마우스 좌표와 이벤트가 발생한 HTML 태그를 확인하며 이벤트 객체의 정보를 사용했습니다. |
| `EventModifiers.vue` | `@click.prevent`, `@click.stop` | 링크의 기본 이동을 막고, 자식 요소 클릭이 부모로 전파되는 버블링을 제어했습니다. |

### 4. Form 및 Style

| 실습 | 사용한 기능 | 학습 내용 |
| --- | --- | --- |
| `ModelBasic.vue` | `v-model`, `:value`, `@input` | `v-model`의 양방향 바인딩과 속성 바인딩·입력 이벤트로 직접 구현한 동작을 비교했습니다. |
| `FormElements.vue` | textarea, checkbox, radio, select + `v-model` | 각 폼 요소가 문자열, 불리언, 배열 등의 상태와 연결되는 방식을 확인했습니다. |
| `ModelModifiers.vue` | `.lazy`, `.number`, `.trim` | 입력 반영 시점 변경, 숫자 변환, 앞뒤 공백 제거 등 `v-model` 수식어를 사용했습니다. |
| `ScopedStyle.vue` | `<style scoped>` | 컴포넌트 내부에만 적용되는 스타일을 작성해 다른 컴포넌트와 CSS가 충돌하지 않도록 했습니다. |

### 확인 방법

1. `npm run dev`로 개발 서버를 실행합니다.
2. 기본 경로에서 Hands-On 화면을 확인하고, 상단의 `Code Challenge` 메뉴로 이동합니다.
3. 각 카드의 `열기` 버튼을 눌러 입력, 클릭, 상태 변경에 따른 화면 변화를 확인합니다.
