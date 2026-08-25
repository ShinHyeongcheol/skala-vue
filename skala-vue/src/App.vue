<script setup>
import { ref } from 'vue'

import SampleOne from './components/practices/codeChallenge/reactivity/SampleOne.vue'

import DirectiveText from './components/practices/codeChallenge/vueDirective/DirectiveText.vue'
import DirectiveBind from './components/practices/codeChallenge/vueDirective/DirectiveBind.vue'
import DirectiveCondition from './components/practices/codeChallenge/vueDirective/DirectiveCondition.vue'
import DirectiveList from './components/practices/codeChallenge/vueDirective/DirectiveList.vue'

import EventHandler from './components/practices/codeChallenge/evnetHandling/EventHandler.vue'
import EventObject from './components/practices/codeChallenge/evnetHandling/EventObject.vue'
import EventModifier from './components/practices/codeChallenge/evnetHandling/EventModifiers.vue'

const openCards = ref({
  sampleOne: false,
  directiveText: false,
  directiveBind: false,
  directiveCondition: false,
  directiveList: false,
  eventHandler: false,
  eventObject: false,
  eventModifiers: false,
})
</script>

<template>
  <main class="practice-hub">
    <header class="page-header">
      <p class="eyebrow">Vue Practice</p>
      <h1>실습 목록</h1>
      <p>주제별로 실습을 모아두고, 필요한 항목을 계속 추가해 보세요.</p>
    </header>

    <section class="practice-section" aria-labelledby="code-challenge-title">
      <div class="section-heading">
        <p class="section-label">Practice</p>
        <h2 id="code-challenge-title">Code Challenge</h2>
      </div>

      <div class="practice-grid">
        <!-- 새 Code Challenge는 이 article을 복사해 컴포넌트만 바꿔 추가하세요. -->
        <article class="practice-card">
          <div class="card-heading">
            <div>
              <p>Responsive example</p>
              <h3>Sample One</h3>
            </div>
            <button class="card-toggle" type="button" :aria-expanded="openCards.sampleOne" @click="openCards.sampleOne = !openCards.sampleOne">
              {{ openCards.sampleOne ? '접기' : '열기' }}
            </button>
          </div>
          <div v-show="openCards.sampleOne"><SampleOne /></div>
        </article>
        <article class="practice-card">
          <div class="card-heading">
            <div>
              <p>Directive example</p>
              <h3>Directive Text</h3>
            </div>
            <button class="card-toggle" type="button" :aria-expanded="openCards.directiveText" @click="openCards.directiveText = !openCards.directiveText">
              {{ openCards.directiveText ? '접기' : '열기' }}
            </button>
          </div>
          <div v-show="openCards.directiveText"><DirectiveText /></div>
        </article>
        <article class="practice-card">
          <div class="card-heading">
            <div>
              <p>Directive example</p>
              <h3>Directive Bind</h3>
            </div>
            <button class="card-toggle" type="button" :aria-expanded="openCards.directiveBind" @click="openCards.directiveBind = !openCards.directiveBind">
              {{ openCards.directiveBind ? '접기' : '열기' }}
            </button>
          </div>
          <div v-show="openCards.directiveBind"><DirectiveBind /></div>
        </article>
        <article class="practice-card"> 
          <div class="card-heading">
            <div>
              <p>Directive example</p>
              <h3>Directive Condition</h3>
            </div>
            <button class="card-toggle" type="button" :aria-expanded="openCards.directiveCondition" @click="openCards.directiveCondition = !openCards.directiveCondition">
              {{ openCards.directiveCondition ? '접기' : '열기' }}
            </button>
          </div>
          <div v-show="openCards.directiveCondition"><DirectiveCondition /></div>
        </article>
        <article class="practice-card">
          <div class="card-heading">
            <div>
              <p>Directive example</p>
              <h3>Directive List</h3>
            </div>
            <button class="card-toggle" type="button" :aria-expanded="openCards.directiveList" @click="openCards.directiveList = !openCards.directiveList">
              {{ openCards.directiveList ? '접기' : '열기' }}
            </button>
          </div>
          <div v-show="openCards.directiveList"><DirectiveList /></div>
        </article>
        <article class="practice-card">
          <div class="card-heading">
            <div>
              <p>Event Handling example</p>
              <h3>Event Handler</h3>
            </div>
            <button class="card-toggle" type="button" :aria-expanded="openCards.eventHandler" @click="openCards.eventHandler = !openCards.eventHandler">
              {{ openCards.eventHandler ? '접기' : '열기' }}
            </button>
          </div>
          <div v-show="openCards.eventHandler"><EventHandler /></div>
        </article>
        <article class="practice-card">
          <div class="card-heading">
            <div>
              <p>Event Handling example</p>
              <h3>Event Object</h3>
            </div>
            <button class="card-toggle" type="button" :aria-expanded="openCards.eventObject" @click="openCards.eventObject = !openCards.eventObject">
              {{ openCards.eventObject ? '접기' : '열기' }}
            </button>
          </div>
          <div v-show="openCards.eventObject"><EventObject /></div>
        </article>
        <article class="practice-card">
          <div class="card-heading">
            <div>
              <p>Event Handling example</p>
              <h3>Event Modifiers</h3>
            </div>
            <button class="card-toggle" type="button" :aria-expanded="openCards.eventModifiers" @click="openCards.eventModifiers = !openCards.eventModifiers">
              {{ openCards.eventModifiers ? '접기' : '열기' }}
            </button>
          </div>
          <div v-show="openCards.eventModifiers"><EventModifier /></div>
        </article>
      </div>
    </section>

    <section class="practice-section" aria-labelledby="hands-on-title">
      <div class="section-heading">
        <p class="section-label">Practice</p>
        <h2 id="hands-on-title">Hands-On</h2>
      </div>

      <div class="empty-card">
        다음 Hands-On 실습을 여기에 추가하세요.
      </div>
    </section>
  </main>
</template>

<style scoped>
.practice-hub {
  display: grid;
  gap: 3rem;
  width: min(100%, 960px);
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.page-header {
  display: grid;
  gap: 0.5rem;
}

.eyebrow,
.section-label,
.card-heading p {
  color: #2563eb;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1,
h2,
h3 {
  color: var(--color-heading);
  font-weight: 700;
  line-height: 1.2;
}

h1 {
  font-size: clamp(2rem, 5vw, 3rem);
}

h2 {
  font-size: 1.5rem;
}

.practice-section {
  display: grid;
  gap: 1rem;
}

.section-heading {
  display: grid;
  gap: 0.25rem;
}

.practice-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  align-items: start;
}

.practice-card,
.empty-card {
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  background: var(--color-background-soft);
  padding: 1.5rem;
}

.practice-card {
  display: grid;
  gap: 1.5rem;
}

.card-heading {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 1rem;
}

.card-heading > div {
  display: grid;
  gap: 0.25rem;
}

.card-toggle {
  flex: 0 0 auto;
  padding: 0.375rem 0.625rem;
  color: #2563eb;
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 700;
  background: transparent;
  border: 1px solid #93c5fd;
  border-radius: 0.375rem;
  cursor: pointer;
}

.card-toggle:hover {
  background: #eff6ff;
}

.empty-card {
  color: var(--color-text);
  border-style: dashed;
}

@media (max-width: 640px) {
  .practice-hub {
    gap: 2rem;
    padding: 2rem 1rem;
  }

  .practice-grid {
    grid-template-columns: 1fr;
  }
}
</style>
