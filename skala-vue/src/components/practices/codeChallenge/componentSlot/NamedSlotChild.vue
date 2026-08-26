<template>
  <div class="base-card">
    <header class="card-header">
      <slot name="header">
        <h4 style="margin: 0; color: #000000;">기본 헤더</h4>
      </slot>
    </header>

    <main class="card-body">
      <slot>
        <p style="color: #64748b; margin: 0;">기본 본문 영역입니다.</p>
      </slot>
    </main>
  </div>
</template>

<style scoped>
.base-card {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
  color: #000000;
}
.card-header { padding: 12px 16px; background-color: #f1f5f9; border-bottom: 1px solid #cbd5e1; }
.card-body { padding: 16px; font-size: 14px; color: #000000; line-height: 1.6; }
</style>