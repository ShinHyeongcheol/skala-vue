<script setup>
const handleLink = () => {
  alert(`수식어(@click.prevent) 덕분에 함수만 실행됩니다.`)
}
const handleBox = () => {
    alert('부모 박스가 클릭되었습니다.')
}
const handleChild1 = () => {
    alert('자식 박스 1이 클릭되었습니다. 곧 부모 박스의 이벤트도 실행됩니다. (버블링)')
}
const handleChild2 = () => {
    alert('자식 박스 2가 클릭되었습니다. .stop 수식어 덕분에 부모 박스의 이벤트는 실행되지 않습니다. (버블링 방지)')
}
</script>


<template>
  <div class="card">
    <h3 class="card-title">3.이벤트 수식어</h3>
    <div class="box">
      <h4 class="box-title">1) @click.prevent (링크 기본 동작 차단)</h4>
      <p class="text">아래 링크를 클릭해도 네이버 웹사이트로 이동하지 않습니다.</p>
      <a href="https://www.naver.com" @click.prevent="handleLink" class="custom-link">
        네이버 이동 링크 (@click.prevent 적용됨)
      </a>
    </div>
    <div class="box">
      <h4 class="box-title">2) @click.stop (이벤트 버블링 차단 비교)</h4>
      
      <div @click="handleBox" class="parent-area">
        <p class="parent-text"><strong>[부모 영역]</strong> 이 회색 바탕을 클릭하면 부모 경고창이 뜹니다.</p>
        <button @click="handleChild1" class="btn btn-warning">
          1번 버튼 (버블링 발생)
        </button>
        <button @click.stop="handleChild2" class="btn btn-success" style="margin-left: 8px;">
          2번 버튼 (@click.stop 버블링 차단)
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.card { padding: 20px; background: #f8fafc; border-radius: 8px; border: 1px solid #cbd5e1; color: #000000; }
.card-title { margin: 0 0 12px 0; font-size: 18px; color: #000000; font-weight: bold; }
.box { margin-top: 15px; padding: 14px; background: #ffffff; border-radius: 6px; border: 1px solid #cbd5e1; }
.box-title { margin: 0 0 8px 0; font-size: 15px; color: #000000; font-weight: bold; }
.text { font-size: 14px; color: #000000; margin: 4px 0 8px 0; }
.custom-link { color: #000000; font-weight: bold; text-decoration: underline; cursor: pointer; }
.parent-area { padding: 20px; background-color: #f1f5f9; border: 2px dashed #64748b; border-radius: 8px; margin-top: 10px; cursor: pointer; }
.parent-text { color: #000000; font-size: 14px; margin-bottom: 10px; }
.btn { padding: 8px 14px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; color: #ffffff; }
.btn-warning { background-color: #ea580c; }
.btn-success { background-color: #16a34a; }
</style>