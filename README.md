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
    ├── handsOn/
    │   └── WeatherHandsOn.vue      # 날씨 Mockup·Composition Hands-On 과제
    └── practices/
        └── codeChallenge/          # 기능별 실습 컴포넌트
            ├── reactivity/
            ├── composition/
            ├── computedWatchers/
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

### 1. Weather Mockup

날씨 데이터를 활용해 Vue의 데이터 렌더링, 조건부 UI, 입력 처리, 이벤트를 하나의 화면에 조합했습니다.

| 기본 구현 | 적용 내용 |
| --- | --- |
| 날씨 카드 목록 | `weatherList` 배열을 `v-for`와 `:key="city.id"`로 반복 렌더링했습니다. |
| 기온/날씨 라벨 | `v-if / v-else`로 25도 기준의 더움/선선함 라벨을 표시하고, 비 상태일 때는 별도 비 라벨을 추가했습니다. |
| 도시 검색 | `v-model.trim`으로 한글 도시명을 입력받고, 입력된 값을 화면에 즉시 출력했습니다. |
| 카드 이벤트 | 카드를 클릭하면 선택 도시를 상태바에 표시하고, 상세보기 버튼은 `@click.stop`으로 버블링을 막은 뒤 `window.alert()`를 실행했습니다. |

### 추가 구현 - 시간대별 예보/날씨 라벨

추가 구현 진행에는 기존 기온 라벨에서 v-if 활용을 위해 비 상태의 날씨 라벨을 추가했습니다.
v-show와 v-for에 대한 학습을 추가적으로 진행을 해보고자 시간대별 예보 상태를 추가해 토글의 형식으로 보이도록 기획했습니다.

이에 따라 판교/용인 데이터를 추가하고, 각 도시에 시간대별 예보 데이터(`forecast`)를 추가했습니다. 예보 보기 버튼을 누르면 해당 도시의 예보만 표시되도록 `openForecastCityId` 상태를 두었습니다.

- `v-show`: 선택한 도시의 예보 영역을 DOM에 유지한 채 열고 닫습니다.
- 중첩 `v-for`: 각 도시의 `forecast` 배열을 반복해 시간, 기온, 날씨 상태를 가로 목록으로 표시합니다.
- `.stop`: 예보 토글 버튼을 눌러도 부모 날씨 카드의 선택 이벤트가 함께 실행되지 않도록 제어했습니다.

### 2. Weather Composition

Weather Mockup을 Composition API 방식으로 확장해, 여러 반응형 상태를 조합하고 감시하는 흐름을 구현했습니다.

| 구현 항목 | 적용 내용 |
| --- | --- |
| 검색·선택 상태 | `searchQuery`, `selectedCityInfo`, `selectedWeatherStatus`, `selectedTime`을 `ref`로 관리했습니다. |
| 검색 결과 계산 | `computed(filteredWeatherList)`에서 도시명 검색어와 날씨 상태 필터를 함께 적용했습니다. 검색어가 없으면 전체 도시를 표시하고, 결과가 없으면 안내 문구를 출력합니다. |
| 결과 요약 | `computed(visibleCityCount)`로 현재 필터 조건에 맞는 도시 수를 표시했습니다. |
| 상태 감시 | `watch`로 선택 도시·날씨 상태 변경을 콘솔에 기록하고, `watchEffect`로 검색어 변화를 자동 추적했습니다. |

### 추가 구현 - 시간대별 날씨 필터

Weather Mockup에서 추가했던 시간대별 예보 데이터에 대한 기능을 확장하는 방향으로 추가 기능을 기획했습니다.
오전 9시와 오후 9시를 추가해 시간대를 조금 더 세분화 했고, 도시 검색에 따른 필터링 기능처럼 날씨나 시간대별로 지역별 날씨 카드가 변하게 수정했습니다.
상태가 변할 때 마다 콘솔로그에 나타나게 했고, 토글 목록에서도 내가 선택한 시간대를 좀 더 잘 확인할 수 있게 반영했습니다.

- `computed(weatherAtSelectedTime)`: 각 도시의 `forecast` 배열에서 선택한 시각을 찾아 카드의 날씨·기온 표시값으로 변환합니다.
- `watch(selectedTime)`: 시간 필터가 변경될 때 선택 시간을 콘솔에 기록합니다.

시각의 날씨 정보를 기준으로 동작하도록 구성했습니다.

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

### 5. Composition API - Reactive State

| 실습 | 사용한 기능 | 학습 내용 |
| --- | --- | --- |
| `refExample.vue` | `ref()`, `.value`, `v-model` | 숫자, 문자열, 불리언, 배열, 객체를 `ref`로 선언하고 값 변경에 따른 화면 갱신을 확인했습니다. Script에서는 `.value`로 접근하고, 템플릿에서는 자동으로 언래핑되는 특징을 학습했습니다. |
| `reactiveExample.vue` | `reactive()`, 객체·배열 메서드 | 객체와 배열을 반응형으로 만들고, 객체 속성 변경과 배열 항목 추가·삭제가 화면에 반영되는 흐름을 확인했습니다. |

### 6. Computed & Watchers

| 실습 | 사용한 기능 | 학습 내용 |
| --- | --- | --- |
| `ComputedExample.vue` | `computed()`, Writable Computed | 의존하는 상태가 바뀔 때만 계산 결과를 갱신하는 캐싱 특성과 `get / set`을 가진 Writable Computed를 확인했습니다. |
| `watchExample.vue` | `watch()`, 단일 상태·객체 속성 감시 | `ref` 값의 이전·현재 값을 비교하고, `reactive` 객체 전체 감시와 특정 속성 감시의 차이를 확인했습니다. |
| `watchEffectExample.vue` | `watchEffect()` | 콜백 안에서 사용한 반응형 상태를 자동 추적하며, 화면 진입 시에도 즉시 실행되는 동작을 확인했습니다. |

### 확인 방법

1. `npm run dev`로 개발 서버를 실행합니다.
2. 기본 경로에서 Hands-On 화면을 확인하고, 상단의 `Code Challenge` 메뉴로 이동합니다.
3. 각 카드의 `열기` 버튼을 눌러 입력, 클릭, 상태 변경에 따른 화면 변화를 확인합니다.
