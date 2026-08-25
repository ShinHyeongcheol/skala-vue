<script setup>
//꺠끗
</script>

<template>
  <div class="card">
    <h3 class="card-title">4. Scoped 스타일 및 외부 CSS 활용</h3>

    <div class="box">
      <p class="title">이 글자는 이 컴포넌트 내부에서만 빨간색이 됩니다. (.title)</p>
      
    
      <button class="btn-external">외부 CSS에서 불러온 버튼 스타일</button>
    </div>
  </div>
</template>

<style scoped>
.title {
  color: #dc2626;
  font-weight: bold;
  font-size: 16px;
}
.card { padding: 20px; background: #f8fafc; border-radius: 8px; border: 1px solid #cbd5e1; color: #000000; }
.card-title { margin: 0 0 12px 0; font-size: 18px; color: #000000; font-weight: bold; }
.box { margin-top: 14px; padding: 14px; background: #ffffff; border-radius: 6px; border: 1px solid #cbd5e1; }

.btn-external {
  margin-top: 10px;
  padding: 10px 18px;
  background-color: #0f172a;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}
</style>