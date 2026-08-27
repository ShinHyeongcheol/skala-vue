<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

// 1. 백엔드 공용 REST API 주소
const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

// 2. 상태 변수 정의
const items = ref([])
const textInput = ref('')
const logMessage = ref('대기 중...')
const isProcessing = ref(false)
const isError = ref(false)

const setLogMessage = (message, error = false) => {
  logMessage.value = message
  isError.value = error
}

// ----------------------------------------------------
// [READ] GET : 데이터 목록 3개 가져오기
// ----------------------------------------------------
const handleRead = async () => {
  isProcessing.value = true
  setLogMessage('GET 요청 중입니다...')

  try {
    // 💡 params: { _limit: 3 } ➔ /posts?_limit=3 쿼리스트링 전달
    const response = await axios.get(BASE_URL, { params: { _limit: 3 } })
    items.value = response.data
    setLogMessage(`GET 성공: ${response.data.length}건 데이터 수신 완료`)
    console.log('GET 성공:', response.data)
  } catch (error) {
    setLogMessage(`GET 실패: ${error.message}`, true)
    console.error('GET 실패:', error)
  } finally {
    isProcessing.value = false
  }
}

// ----------------------------------------------------
// [CREATE] POST : 새로운 게시글 등록하기
// ----------------------------------------------------
const handleCreate = async () => {
  const title = textInput.value.trim()

  if (!title) {
    setLogMessage('POST 실패: 게시글 제목을 입력하세요.', true)
    return
  }

  isProcessing.value = true
  setLogMessage('POST 요청 중입니다...')

  try {
    // 💡 두 번째 인자로 넘긴 객체가 HTTP Request Body로 자동 JSON 직렬화되어 전송됨!
    const response = await axios.post(BASE_URL, {
      title,
      body: '새로 등록된 본문 내용입니다.',
      userId: 1
    })

    // 백엔드가 생성해 준 데이터(ID: 101)를 화면 배열 맨 앞에 추가
    items.value.unshift(response.data)
    setLogMessage(`POST 성공: [ID #${response.data.id}] "${response.data.title}" 등록됨`)
    textInput.value = ''
    console.log('POST 성공:', response.data)
  } catch (error) {
    setLogMessage(`POST 실패: ${error.message}`, true)
    console.error('POST 실패:', error)
  } finally {
    isProcessing.value = false
  }
}

// ----------------------------------------------------
// [DELETE] DELETE : 게시글 삭제하기
// ----------------------------------------------------
const handleDelete = async (id) => {
  isProcessing.value = true
  setLogMessage(`DELETE 요청 중입니다. [ID #${id}]`)

  try {
    // 💡 /posts/1 형태로 삭제 요청 전송
    await axios.delete(`${BASE_URL}/${id}`)
    
    // 화면 목록에서 해당 ID 아이템 제거 (UI 동기화)
    items.value = items.value.filter(item => item.id !== id)
    setLogMessage(`DELETE 성공: [ID #${id}] 항목이 화면에서 삭제되었습니다.`)
    console.log(`DELETE #${id} 성공`)
  } catch (error) {
    setLogMessage(`DELETE 실패: ${error.message}`, true)
    console.error('DELETE 실패:', error)
  } finally {
    isProcessing.value = false
  }
}

// 컴포넌트 마운트 시 초기 목록 자동 로드
onMounted(() => {
  handleRead()
})
</script>

<template>
  <div class="card">
    <h3 class="card-title">REST API CRUD 통신 실습</h3>

    <!-- 글 작성 및 새로고침 바 (Flex gap 적용) -->
    <div class="input-row">
      <input 
        type="text" 
        v-model.trim="textInput"
        @keyup.enter="handleCreate"
        placeholder="새 게시글 제목을 입력하고 Enter를 치세요" 
        class="custom-input" 
      />
      <button type="button" @click="handleCreate" :disabled="isProcessing" class="btn btn-success">
        POST 등록
      </button>
      <button type="button" @click="handleRead" :disabled="isProcessing" class="btn btn-primary">
        GET 새로고침
      </button>
    </div>

    <!-- 통신 로그 패널 -->
    <div class="log-box" :class="{ 'log-box-error': isError }" aria-live="polite">
      📢 <strong>네트워크 상태 로그:</strong> <span class="log-text">{{ logMessage }}</span>
    </div>

    <!-- 데이터 목록 출력 -->
    <div class="list-section">
      <h4 class="list-title">서버 데이터 목록 (총 {{ items.length }}건)</h4>
      
      <ul class="item-list">
        <li v-for="item in items" :key="item.id" class="item-card">
          <div class="item-content">
            <span class="item-id">#{{ item.id }}</span>
            <span class="item-name">{{ item.title }}</span>
          </div>
          <button type="button" @click="handleDelete(item.id)" :disabled="isProcessing" class="btn-del">삭제 (DELETE)</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.card { width: 100%; min-width: 0; max-width: 100%; padding: 20px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; color: #000000; }
.card-title { margin: 0 0 16px 0; font-size: 18px; color: #000000; font-weight: bold; }

.input-row { display: flex; gap: 8px; margin-bottom: 14px; }
.custom-input { flex: 1; min-width: 0; padding: 9px 12px; border: 1px solid #94a3b8; border-radius: 6px; font-size: 14px; color: #000000; outline: none; }
.custom-input:focus { border-color: #2563eb; }

.btn { padding: 9px 14px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; color: #ffffff; font-size: 13px; white-space: nowrap; }
.btn-primary { background-color: #2563eb; }
.btn-success { background-color: #16a34a; }
.btn:disabled { background-color: #94a3b8; cursor: not-allowed; }

.log-box { padding: 10px 14px; background-color: #f1f5f9; border-left: 4px solid #2563eb; border-radius: 4px; font-size: 13px; color: #000000; margin-bottom: 16px; overflow-wrap: anywhere; }
.log-box-error { background-color: #fee2e2; border-left-color: #dc2626; }
.log-text { font-weight: bold; color: #2563eb; }
.log-box-error .log-text { color: #b91c1c; }

.list-section { margin-top: 10px; }
.list-title { margin: 0 0 10px 0; font-size: 15px; color: #000000; font-weight: bold; }

.item-list { list-style: none; padding: 0; margin: 0; }
.item-card { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 12px 14px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px; }
.item-content { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
.item-id { font-weight: 800; color: #2563eb; font-size: 14px; }
.item-name { font-size: 14px; color: #000000; font-weight: 500; overflow-wrap: anywhere; }

.btn-del { flex-shrink: 0; padding: 6px 12px; background-color: #dc2626; color: #ffffff; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold; white-space: nowrap; }
.btn-del:hover { background-color: #b91c1c; }
.btn-del:disabled { background-color: #94a3b8; cursor: not-allowed; }

@media (max-width: 640px) {
  .input-row { flex-wrap: wrap; }
  .custom-input { flex-basis: 100%; }
  .item-card { align-items: flex-start; gap: 10px; }
}
</style>
