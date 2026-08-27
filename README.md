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
│   ├── CodeChallengeView.vue        # Code Challenge 목록 화면
│   ├── HandsOnLayoutView.vue        # Hands-On 공통 안내·하위 RouterView
│   ├── WeatherHomeView.vue          # 날씨 대시보드 화면
│   ├── WeatherHourlyView.vue        # 시간대별 날씨 비교 화면
│   ├── WeatherDetailView.vue        # 도시 ID 기반 상세 날씨 화면
│   ├── WeatherAboutView.vue         # 날씨 소개 화면
│   └── NotFoundView.vue             # 미매칭 경로 안내 화면
├── data/
│   └── weather.js                   # 홈·상세 화면에서 공유하는 날씨 Mock Data
├── stores/
│   ├── counter.js                    # Pinia Counter 실습 Store
│   ├── weatherStore.js               # 온도 단위·선택 시간 전역 상태
│   └── favoriteStore.js              # 즐겨찾는 도시 전역 상태
└── components/
    ├── handsOn/
    │   └── weatherComponent/
    │       ├── BaseCard.vue         # 검색/목록 영역의 공통 카드 레이아웃
    │       ├── SearchBar.vue        # 도시 검색 입력 컴포넌트
    │       └── WeatherCard.vue      # 도시별 날씨 카드 컴포넌트
    └── practices/
        └── codeChallenge/          # 기능별 실습 컴포넌트
            ├── reactivity/
            ├── composition/
            ├── computedWatchers/
            ├── vueDirective/
            ├── evnetHandling/
            ├── form/
            ├── componentLifecycle/
            ├── propsAndEmit/
            ├── componentSlot/
            └── axios/               # Axios HTTP 통신 실습
```

### 화면 구성

- `App.vue`는 공통 상단 메뉴와 `<RouterView />`만 담당합니다.
- 기본 경로(`/`)는 `/hands-on`으로 이동합니다. 상단 메뉴는 `Hands-On`과 `Code Challenge` 화면으로 구성했습니다.
- `CodeChallengeView.vue`는 실습 컴포넌트를 2열 카드 그리드로 표시합니다. 각 카드는 기본적으로 닫혀 있고, `열기/접기` 토글로 필요한 예제만 확인할 수 있습니다.
- `HandsOnLayoutView.vue`는 Hands-On 안내와 내부 메뉴를 공통으로 표시하고, 하위 `<RouterView />`에 날씨 관련 화면을 렌더링합니다.

## 환경 변수 설정

OpenWeatherMap API 등 프로젝트에서 사용하는 외부 설정값은 코드에 직접 작성하지 않고 Vite 환경 변수로 관리한다. Hands-On과 Code Challenge 실습에서 공통으로 사용할 수 있다.

프로젝트의 `skala-vue` 폴더에서 예제 파일을 복사한 뒤 발급받은 키를 입력한다.

```bash
cp .env.example .env
```

```env
VITE_OPENWEATHER_API_KEY=발급받은_OpenWeatherMap_API_키
```

- `VITE_` 접두사가 있는 환경 변수만 클라이언트 코드의 `import.meta.env`에서 사용할 수 있다.
- `.env`는 Git에 포함하지 않고, 공유 가능한 변수 이름만 `.env.example`에 관리한다.
- `.env` 값을 바꾼 경우 개발 서버를 다시 실행해야 한다.


## Hands-On

### 0. Project Scaffolding

- Node.js와 npm 개발 환경을 확인하고 Vue 3 + Vite 기반의 `skala-vue` 프로젝트를 생성했습니다.
- `npm install`로 의존성을 설치하고 `npm run dev`로 개발 서버를 실행해 로컬 화면 동작을 확인했습니다.
- `src/main.js`에서 Vue 앱이 생성되고, `App.vue`, Router, View 컴포넌트로 화면이 연결되는 기본 구조를 확인했습니다.
- 화면의 텍스트를 수정한 뒤 저장만으로 브라우저에 즉시 반영되는 HMR(Hot Module Replacement) 동작을 확인했습니다.
- vue devTool을 사용해보면서 유용하다고 생각했던 기능으로는 그래프를 통해 각 뷰나 컴포넌트가 어떻게 연결이 되어있는지 확인해보고 움직여볼 수 있는 기능이었고, Components를 통해 트리 형태의 코드 구조나 실제 렌더링이 된 코드를 확인해볼 수 있던 기능이 구조 파악에 도움이 되어 vue를 처음 학습할 때 도움이 되었습니다.

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
- `.stop`: 예보 토글 버튼을 눌러도 부모 날씨 카드의 선택 이벤트가 함께 실행되지 않도록했습니다.


### 2. Weather Composition

Weather Mockup을 Composition API 방식으로 확장해, 여러 반응형 상태를 조합하고 감시하는 흐름을 구현했습니다.

| 구현 항목 | 적용 내용 |
| --- | --- |
| 검색·선택 상태 | `searchQuery`, `selectedCityInfo`, `selectedWeatherStatus`를 `ref`로 관리했습니다. 시간 선택 상태는 이후 `weatherStore.selectedTime`으로 전역 관리하도록 확장했습니다. |
| 검색 결과 계산 | `computed(filteredWeatherList)`에서 도시명 검색어와 날씨 상태 필터를 함께 적용했습니다. 검색어가 없으면 전체 도시를 표시하고, 결과가 없으면 안내 문구를 출력합니다. |
| 결과 요약 | `computed(visibleCityCount)`로 현재 필터 조건에 맞는 도시 수를 표시했습니다. |
| 상태 감시 | `watch`로 선택 도시·날씨 상태 변경을 콘솔에 기록하고, `watchEffect`로 검색어 변화를 자동 추적했습니다. |

### 추가 구현 - 시간대별 날씨 필터

Weather Mockup에서 추가했던 시간대별 예보 데이터에 대한 기능을 확장하는 방향으로 추가 기능을 기획했습니다.
오전 9시와 오후 9시를 추가해 시간대를 조금 더 세분화 했고, 도시 검색에 따른 필터링 기능처럼 날씨나 시간대별로 지역별 날씨 카드가 변하게 수정했습니다.
상태가 변할 때 마다 콘솔로그에 나타나게 했고, 토글 목록에서도 내가 선택한 시간대를 좀 더 잘 확인할 수 있게 반영했습니다.

- `computed(weatherAtSelectedTime)`: 각 도시의 `forecast` 배열에서 선택한 시각을 찾아 카드의 날씨/기온 표시값으로 변환합니다.
- `watch(() => weatherStore.selectedTime)`: 시간 필터가 변경될 때 선택 시간을 콘솔에 기록합니다.

### 3. Weather Component 분리

기존 날씨 화면에 함께 있던 검색 입력, 공통 카드 레이아웃, 도시별 날씨 카드 UI를 역할별 컴포넌트로 분리했습니다. `WeatherHomeView.vue`는 반응형 상태와 계산 로직을 관리하고, 자식 컴포넌트는 `props`로 데이터를 받아 화면에 표시하거나 `emit`으로 사용자 동작을 부모에 전달하도록 구성했습니다.

| 컴포넌트 | 역할 | 적용 내용 |
| --- | --- | --- |
| `WeatherHomeView.vue` | 부모 View | `weatherList`, 검색어, 날씨/시간 필터, 선택 도시 상태를 관리합니다. `computed`로 필터링된 목록을 만들고, 자식 컴포넌트 이벤트를 처리합니다. |
| `BaseCard.vue` | 공통 레이아웃 | `title` prop으로 카드 제목을 받고, 기본 `<slot />`으로 검색 영역 또는 날씨 목록을 감싸 공통 카드 스타일을 재사용합니다. |
| `SearchBar.vue` | 검색 입력 | `searchQuery`를 props로 받아 표시하고, 입력 시 `update-query` 이벤트로 공백이 제거된 검색어를 부모에 전달합니다. |
| `WeatherCard.vue` | 도시별 날씨 표시 | 도시 객체와 선택 시간을 props로 받아 카드·시간대별 예보를 렌더링합니다. 카드 선택, 상세보기, 예보 토글을 emit으로 부모에 전달합니다. |

#### 컴포넌트 데이터 흐름

`SearchBar`에서 검색어를 입력하면 `update-query` 이벤트가 `WeatherHomeView`로 전달됩니다. 부모는 `searchQuery`를 변경하고, `computed(filteredWeatherList)`가 다시 계산한 결과를 각 `WeatherCard`에 전달합니다. 반대로 도시 카드에서 발생한 선택·상세보기·예보 토글 이벤트도 부모가 받아 상태를 변경합니다.

### 컴포넌트 분리 과정에서의 궁금증
1. 자식과 부모 사이의 데이터가 props와 emit을 통해 오고 가는 것으로 이해했는데, 자식이 부모의 다른 자식의 데이터를 수정하려 한다면?(pdf 예시로는 Deep child가 Header의 데이터를 수정하려 한다면?)
- 내 생각: Inject를 잘 사용하지 않는다고 하였으니 DeepChild가 emit을 통해 Root의 데이터를 수정 요청하고, Root가 Props로 Header에게 전달한다.
- DeepChild는 emit으로 상위 컴포넌트에 상태 변경을 요청하고, Root가 실제 데이터를 변경한 뒤 props로 Header에 전달한다. 다만 컴포넌트 깊이가 너무 깊어 전달만 반복된다면, 특정 트리 안에서는 provide / inject를 사용하고 여러 화면에서 공유하는 상태라면 Pinia를 사용하는 방식을 고려한다.

2. 기존에 안드로이드 개발을 공부 했었는데, 공통 컴포넌트와 각 스크린별 컴포넌트를 나누는 방식이 Vue에서도 같은가? 공통 컴포넌트를 사용하게 되면 props와 emit은 어떻게 처리할까?
- 내 생각: 전체적인 흐름 자체는 비슷하지 않을까? 카드 등의 컴포넌트가 공통으로 사용이 되면 default 값을 줘서 빈 이벤트를 넣을 수 있지 않을까?
- Vue에서도 Android와 비슷하게 공통 컴포넌트와 화면·기능별 컴포넌트를 분리한다. 여러 화면에서 사용하는 카드, 버튼, 모달 등은 공통 컴포넌트로 만들고, 날씨 카드처럼 특정 기능에만 필요한 컴포넌트는 해당 도메인 안에 둔다.
- 공통 컴포넌트의 props에는 제목, 여백, 색상, 클릭 가능 여부처럼 범용적인 값만 두고 기본값을 설정한다. 화면별 데이터는 필요한 기능 컴포넌트에서 별도의 props로 전달한다. 이벤트는 공통 컴포넌트가 emit으로 발생시키고, 이를 사용하는 부모가 필요할 때만 수신한다. 부모가 이벤트를 받지 않아도 오류가 발생하지 않으므로, 빈 이벤트 함수를 기본값으로 둘 필요는 없다.

### 4. Weather Router

날씨 대시보드를 여러 화면으로 분리하고, Vue Router를 통해 상단 화면 전환·중첩 라우팅·동적 상세 페이지 이동을 구현했습니다.

| 경로 | 화면 | 적용 내용 |
| --- | --- | --- |
| `/hands-on` | `WeatherHomeView.vue` | 도시 검색, 날씨·시간 필터, 도시별 카드 목록을 제공하는 기본 대시보드입니다. |
| `/hands-on/hourly` | `WeatherHourlyView.vue` | 선택한 시각의 모든 도시 날씨를 비교하고 최고 기온·비 지역을 요약합니다. |
| `/hands-on/about` | `WeatherAboutView.vue` | 날씨 대시보드의 기능을 소개하고 메인 화면으로 돌아가는 링크를 제공합니다. |
| `/weather/:cityId` | `WeatherDetailView.vue` | URL의 도시 ID를 기준으로 해당 도시의 현재 날씨와 시간대별 예보를 표시합니다. |
| 미매칭 경로 | `NotFoundView.vue` | Catch-all Route로 정의되지 않은 주소에 대한 안내를 표시합니다. |

#### Router 구성

`router/index.js`에서 View를 동적 import로 등록해 필요한 화면에 접근할 때만 로드되도록 했습니다. `/hands-on`은 `HandsOnLayoutView`를 부모로 두고, 하위 `<RouterView />`에 대시보드·시간대별 날씨·소개 화면을 표시하는 중첩 라우팅 구조입니다.

```js
{
  path: '/hands-on',
  component: HandsOnLayoutView,
  children: [
    { path: '', name: 'weather-home', component: WeatherHomeView },
    { path: 'hourly', name: 'weather-hourly', component: WeatherHourlyView },
    { path: 'about', name: 'weather-about', component: WeatherAboutView },
  ],
}
```

#### 동적 경로와 프로그래밍 방식 이동

도시 카드의 상세보기 버튼은 도시 ID를 emit으로 전달합니다. `WeatherHomeView`는 `useRouter()`의 `router.push()`를 이용해 `/weather/:cityId` 경로로 이동하며, `WeatherDetailView`는 `useRoute()`와 `onMounted()`로 도시 ID에 해당하는 Mock Data를 선택합니다.

```js
router.push(`/weather/${cityId}`)

city.value = weatherList.find(
  (item) => item.id === route.params.cityId,
) ?? null
```

#### 추가 구현 - 시간대별 날씨 비교

추가 구현내용이었던 시간대별 날씨를 따로 비교할 수 있는 화면을 구성했습니다. `WeatherHourlyView`에서는 `weatherStore.selectedTime`을 사용하고, `computed(weatherAtSelectedTime)`에서 각 도시의 `forecast` 배열을 선택 시간 기준의 표시값으로 변환했습니다. 변환된 목록으로 최고 기온 도시와 비가 오는 도시 목록도 `computed`로 출력하게 했습니다.

### 5. Weather Store

Pinia Store를 활용해 여러 View에서 함께 사용해야 하는 날씨 설정과 사용자 선택 상태를 전역으로 관리했습니다. `main.js`에서 등록한 Pinia 인스턴스를 통해 각 컴포넌트가 Store를 직접 사용할 수 있도록 구성했습니다.

#### 날씨 설정 Store

`weatherStore.js`는 날씨 단위와 선택 시간을 관리합니다.

| 구분 | 항목 | 적용 내용 |
| --- | --- | --- |
| state | `temperatureUnit` | 기본값을 `celsius`로 두고, 현재 온도 단위를 저장합니다. |
| state | `selectedTime` | 기본값을 `12:00`으로 두고, 대시보드·시간대별 날씨 화면이 공유하는 선택 시간을 저장합니다. |
| getter | `temperatureSymbol` | 현재 단위에 맞는 `°C` 또는 `°F` 기호를 반환합니다. |
| action | `toggleTemperatureUnit()` | 섭씨와 화씨 상태를 전환합니다. |
| action | `setSelectedTime(time)` | 시간 필터 버튼에서 선택한 시각으로 상태를 변경합니다. |

`UnitToggler.vue`는 Hands-On 내부 메뉴 아래에 배치했습니다. 단위를 바꾸면 `WeatherCard`, `WeatherDetailView`, `WeatherHourlyView`가 같은 Store 상태를 참조해 동시에 섭씨 또는 화씨로 표시됩니다. 원본 Mock Data는 섭씨로 유지하고, 각 화면에서 화씨 변환식을 적용했습니다.

```js
Math.round((celsius * 9) / 5 + 32)
```

시간 필터도 Store로 옮겨 대시보드에서 선택한 시간이 시간대별 날씨 화면에 그대로 반영되도록 했습니다. 화면 간 이동 중에는 상태가 유지되며, 새로고침하면 기본값인 `12:00`으로 초기화됩니다.

#### 추가 Store - 즐겨찾는 도시

시간대별 날씨 확인 외에도 즐겨찾기를 통해 관심있는 도시를 선택할 수 있게 기획하여 구현했습니다.
`favoriteStore.js`는 사용자가 선택한 즐겨찾기 도시 ID를 관리하고, 해당 도시는 `⭐`을 구분할 수 있도록 했습니다.

| 구분 | 항목 | 적용 내용 |
| --- | --- | --- |
| state | `favoriteCityIds` | 즐겨찾기한 도시 ID를 배열로 저장합니다. |
| getter | `favoriteCount` | 현재 즐겨찾기 도시 개수를 반환합니다. |
| action | `toggleFavorite(cityId)` | 이미 선택한 도시는 제거하고, 선택하지 않은 도시는 추가합니다. |
| helper | `isFavorite(cityId)` | 특정 도시의 즐겨찾기 여부를 확인합니다. |

대시보드 카드에서는 상세보기 버튼 위에 즐겨찾기 버튼을 배치했고, 상세 화면에서도 즐겨찾기를 변경할 수 있게 했습니다. 시간대별 날씨 화면의 경우 즐겨찾기가 되어있을 경우 카드 배경과 테두리 색을 변경해 구분했습니다.

### 6. Weather Axios

OpenWeatherMap API를 연결해 기존 Mock Data 기반 날씨 대시보드에 실제 현재 날씨와 시간대별 예보를 적용했습니다. API 키는 `.env`의 `VITE_OPENWEATHER_API_KEY`로 관리하고, Axios 요청 코드는 `src/api/openWeather.js`에 분리했습니다.

| 구현 항목 | 적용 내용 |
| --- | --- |
| 현재 날씨 | Current Weather API로 서울·수원·부산·판교·용인의 실제 기온과 날씨 상태를 요청합니다. 한글 화면명과 API 요청용 영문 이름(`apiName`)을 분리해 `Seoul,KR`처럼 요청했습니다. |
| 시간대별 예보 | Forecast API 응답에서 한국 시간 기준 `09:00`, `12:00`, `15:00`, `18:00`, `21:00` 항목을 추려 카드의 시간대별 예보와 시간대별 날씨 화면에 사용했습니다. |
| 상태 공유 | `weatherStore`에 `forecastByCityId`, 로딩·오류 상태, `fetchForecasts()`를 추가했습니다. 대시보드·상세 화면·시간대별 날씨 화면이 같은 예보 데이터를 참조합니다. |
| 현재 날씨와 예보 분리 | 대시보드 카드의 현재 기온·상태는 Current Weather API 값으로 고정했습니다. 시간 필터는 현재 날씨를 변경하지 않고, 시간대별 예보의 선택 표시와 시간대별 날씨 비교에만 사용합니다. |
| 원하는 지역 추가 | Geocoding API로 입력한 한글·영문 지역명을 좌표로 변환한 뒤, 해당 좌표의 현재 날씨와 예보를 병렬 요청합니다. 성공한 지역은 지역별 날씨 목록 아래에 추가됩니다. |

날씨 상태값은 매핑 전 단계로 `Clear`, `Clouds`, `Rain` 등 OpenWeatherMap의 영어 원문을 그대로 표시했습니다. 각 도시의 원본 응답은 콘솔에서 확인할 수 있도록 했습니다.

#### 발생한 이슈 및 해결 - 화면 이동 후 추가 도시가 사라지는 문제

**문제 상황**

새로 추가한 지역이 대시보드와 시간대별 날씨 화면에서는 모두 표시되었지만, 다시 대시보드로 돌아오면 목록에서 사라졌습니다.

**원인**

`WeatherHomeView`는 화면에 다시 진입할 때 로컬 `weatherList`를 기존 Mock Data인 `weatherData`만으로 새로 생성했습니다. 반면 사용자 추가 도시는 `weatherStore.additionalCities`에 저장되어 있었으므로, 시간대별 날씨 화면에서는 Store를 참조해 보이지만 대시보드 초기 목록에는 합쳐지지 않았습니다.

**해결**

사용자 추가 도시는 `weatherStore.addCustomCity()` Action으로 Store에 저장하고, 대시보드 생성 시에도 Mock Data와 Store의 추가 도시를 함께 초기화하도록 수정했습니다.

```js
const weatherList = ref([
  ...weatherData,
  ...weatherStore.additionalCities,
])
```

각 화면 사이를 이동해을 때 Pinia Store를 기반으로 추가한 도시와 예보 정보가 유지됩니다.

### 7. Weather UI Library

| 라이브러리 | 사용 위치 | 활용 내용 |
| --- | --- | --- |
| `primevue` | `src/main.js`, `WeatherHomeView.vue`, `HandsOnLayoutView.vue` | 입력창·버튼·선택 메뉴·Toast 안내 UI를 제공합니다. `@primeuix/themes`의 Aura 테마를 함께 적용했습니다. |
| `tsParticles` | `WeatherParticles.vue` | 맑음·구름·비·천둥번개 상태에 따라 배경 입자와 커서 상호작용을 다르게 표시합니다. |
| `mouse-animations` | `MouseWaterEffects.vue` | 클릭 위치에서 파란 계열 파티클이 물방울처럼 퍼지는 효과를 제공합니다. |

기본적인 vue의 ui 테마를 `primevue`를 이용해 테마를 적용을 시켰습니다.
그 외에 다양한 라이브러리를 적용시켜보고 싶어 배경입자에 대한 파티클을 적용시키는 `tsParticles`와 마우스 이벤트에 따른 효과를 적용시켜보기 위해 `mouse-animations`을 적용시켰습니다.

### 8. Weather Deployment

Vercel 배포를 준비하며 ESLint 점검, Vite 빌드, 환경 변수 분리, SPA 라우팅 설정의 흐름을 확인했습니다. `vercel.json`에 rewrite 규칙을 추가해 `/hands-on/hourly`, `/weather/:cityId`처럼 Vue Router가 처리하는 주소를 직접 열거나 새로고침해도 `index.html`을 통해 앱이 다시 실행되도록 구성했습니다.

- 배포 링크: https://skala-vue-ashen.vercel.app/hands-on

#### 배포 준비 과정에서 확인한 점

- 개발 서버에서는 자연스럽게 동작하던 Router 주소도 정적 호스팅 환경에서는 별도의 SPA fallback 설정이 필요합니다.
- `npm run lint`와 `npm run build`를 배포 전에 실행하면 문법 오류와 빌드 오류를 서버에 올리기 전에 확인할 수 있습니다.
- `.env`를 Git에서 제외하고 `.env.example`만 공유하면 API 설정 방식은 안내하면서 실제 키는 저장소에 노출하지 않을 수 있습니다.
- Vite의 `VITE_` 변수는 최종 브라우저 번들에 포함되므로, Git 제외와 별개로 민감한 비밀값은 백엔드나 서버리스 함수에서 관리해야 합니다.
- Vercel은 GitHub 저장소의 커밋을 기준으로 빌드와 배포를 자동화하므로, Preview 배포로 확인한 뒤 Production 배포로 이어지는 흐름을 경험할 수 있습니다.

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

### 7. Component Lifecycle

| 실습 | 사용한 기능 | 학습 내용 |
| --- | --- | --- |
| `componentLifcycleExample.vue` | `onMounted`, `onUpdated`, `onUnmounted` | 마운트 시 타이머를 자동 시작하고, 반응형 시간 값으로 화면이 갱신될 때마다 로그를 확인했습니다. 컴포넌트가 사라질 때는 `clearInterval()`을 호출해 타이머를 정리하는 흐름을 구현했습니다. |

### 8. Props & Emits

| 실습 | 사용한 기능 | 학습 내용 |
| --- | --- | --- |
| `PropsEmitParent.vue`, `PropsEmitChild.vue` | `defineProps`, `defineEmits`, `ref` | 부모가 사용자 이름·포인트·VIP 상태를 `ref`로 관리하고, 자식에 props로 전달했습니다. 자식은 포인트 충전과 초기화 요청을 emit으로 전달하며, 실제 상태 변경은 부모가 처리하는 단방향 데이터 흐름을 확인했습니다. |

### 9. Component Slot

| 실습 | 사용한 기능 | 학습 내용 |
| --- | --- | --- |
| `DefaultSlotParent.vue`, `DefaultSlotChild.vue` | 기본 슬롯, fallback 콘텐츠, `:slotted()` | 부모가 자식 컴포넌트의 기본 슬롯에 텍스트·제목·버튼 마크업을 주입하고, 내용이 없을 때는 자식의 기본 콘텐츠가 표시되는 동작을 확인했습니다. |
| `NamedSlotParent.vue`, `NamedSlotChild.vue` | `v-slot:header`, 이름 있는 슬롯 | 카드의 헤더와 본문처럼 목적이 다른 영역을 이름으로 구분해 부모가 원하는 위치에 콘텐츠를 주입했습니다. |
| `ScopedSlotParent.vue`, `ScopedSlotChild.vue` | 슬롯 props, `v-slot` | 자식의 `message`, `userCount` 데이터를 슬롯 props로 부모에 전달하고, 부모가 받은 데이터로 마크업을 구성했습니다. |

### 10. Pinia State Management

| 실습 | 사용한 기능 | 학습 내용 |
| --- | --- | --- |
| `StoreCounter.vue`, `counter.js` | `defineStore()`, State, Getters, Actions, `storeToRefs()` | `count`를 전역 State로 관리하고, `doubleCount` Getter로 파생 값을 만들었습니다. `increment`, `decrement`, `reset` Action으로 상태를 변경했으며, `storeToRefs()`를 통해 Store의 반응형 State와 Getter를 템플릿에서 안전하게 사용했습니다. |

Vue Devtools의 Pinia 탭에서 `count` 값과 Action 실행에 따른 전역 상태 변화를 확인했습니다.

### 11. Axios HTTP 통신

| 실습 | 사용한 기능 | 학습 내용 |
| --- | --- | --- |
| `AxiosWeather.vue` | `axios.get()`, `params`, `async / await`, `try / catch / finally` | 서울의 실시간 날씨를 GET 요청으로 가져왔습니다. 요청 파라미터를 `params` 객체로 분리하고, 로딩·성공·실패 상태에 따라 화면을 다르게 표시했습니다. |
| `AxiosJson.vue` | `axios.get()`, `axios.post()`, `axios.delete()`, `onMounted`, `v-model.trim` | JSONPlaceholder API를 이용해 목록 조회·게시글 등록·삭제 흐름을 구현했습니다. 요청 중에는 버튼을 비활성화하고, 성공·실패 상태를 로그 패널에 표시해 UI 상태를 동기화했습니다. |

`AxiosJson.vue`의 삭제는 JSONPlaceholder의 Mock API 응답을 바탕으로 화면 목록을 갱신하는 실습이다. 실제 서버 데이터가 영구적으로 삭제되는 것은 아니다.


### 확인 방법

1. `npm run dev`로 개발 서버를 실행합니다.
2. 기본 경로에서 Hands-On 화면을 확인하고, 상단의 `Code Challenge` 메뉴로 이동합니다.
3. 각 카드의 `열기` 버튼을 눌러 입력, 클릭, 상태 변경에 따른 화면 변화를 확인합니다.
4. Axios Weather 실습은 환경 변수 설정 후 `실시간 서울 날씨 가져오기` 버튼을 눌러 응답을 확인합니다.
