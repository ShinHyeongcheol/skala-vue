<script setup>
const props = defineProps({
  userName: {
    type: String,
    required: true,
    default: '게스트'
  },
  userPoint: {
    type: Number,
    default: 0
  },
  isVip: {
    type: Boolean,
    default: false
  }
})


const emit = defineEmits(['update:userName', 'update:userPoint', 'update:isVip'])

const onRequest500 = () => {
    emit('charge-point', 500)
}

const onRequest1000 = () => {
  emit('charge-point', 1000)
}

const onReset = () => {
  emit('reset-point')
}

</script>

<template>
    <div class = "child-card">
        <h4 class = "child-title">자식 컴포넌트</h4>
        <div class = "info-box">
            <p class = "text">사용자 이름: <strong class = "text-bold">{{ props.userName }}</strong></p>
            <p class = "text">사용자 포인트: <strong class = "text-point">{{ props.userPoint }}</strong></p>
            <p class = "text">VIP 여부: 
                <span v-if="props.isVip" class = "badge-vip">VIP</span>
                <span v-else class = "badge-normal">일반</span>
            </p>
        </div>
        <div class="btn-group">
            <button @click="onRequest500" class="btn btn-primary">+500P 충전 요청 (Emit)</button>
            <button @click="onRequest1000" class="btn btn-success">+1000P 충전 요청 (Emit)</button>
            <button @click="onReset" class="btn btn-danger">0P 초기화 (Emit)</button>
        </div>
    </div>
</template>

<style scoped>
.child-card {
  padding: 18px;
  background: #ffffff;
  border: 2px dashed #3b82f6;
  border-radius: 10px;
  color: #000000;
  margin-top: 15px;
}
.child-title { margin: 0 0 12px 0; font-size: 16px; color: #000000; font-weight: bold; }
.info-box { padding: 12px; background-color: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; margin-bottom: 14px; }
.text { font-size: 14px; color: #000000; margin: 6px 0; }
.text-bold { font-weight: bold; color: #000000; }
.text-point { font-weight: 800; color: #2563eb; font-size: 16px; }
.badge-vip { padding: 3px 8px; background-color: #fef08a; color: #854d0e; border-radius: 4px; font-weight: bold; font-size: 12px; }
.badge-normal { padding: 3px 8px; background-color: #e2e8f0; color: #334155; border-radius: 4px; font-weight: bold; font-size: 12px; }
.btn-group { display: flex; flex-wrap: wrap; gap: 10px; }
.btn { padding: 8px 14px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; color: #ffffff; font-size: 13px; transition: opacity 0.2s; }
.btn:hover { opacity: 0.9; }
.btn-primary { background-color: #2563eb; }
.btn-success { background-color: #16a34a; }
.btn-danger { background-color: #dc2626; }
.btn-secondary { background-color: #475569; }
</style>
