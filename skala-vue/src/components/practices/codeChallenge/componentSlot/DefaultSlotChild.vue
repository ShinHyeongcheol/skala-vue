<template>
    <div class="base-card">
        <slot>
            <p>기본 콘텐츠 영역입니다.</p>
        </slot>
    </div>
</template>

<style scoped>
.base-card {
  padding: 1rem;
  color: #334155;
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
}

:slotted(p) {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
}

:slotted(h2) {
  margin: 0 0 0.75rem;
  font-size: 1.125rem;
  font-weight: 800;
}

:slotted(button) {
  padding: 0.5rem 0.75rem;
  color: #fff;
  font: inherit;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  background: #2563eb;
  border: 0;
  border-radius: 0.375rem;
}

:slotted(button:hover) {
  background: #1d4ed8;
}
</style>
