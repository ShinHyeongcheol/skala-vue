<script setup>
import { ref } from 'vue'

import SampleOne from '../components/practices/codeChallenge/reactivity/SampleOne.vue'
import DirectiveText from '../components/practices/codeChallenge/vueDirective/DirectiveText.vue'
import DirectiveBind from '../components/practices/codeChallenge/vueDirective/DirectiveBind.vue'
import DirectiveCondition from '../components/practices/codeChallenge/vueDirective/DirectiveCondition.vue'
import DirectiveList from '../components/practices/codeChallenge/vueDirective/DirectiveList.vue'
import EventHandler from '../components/practices/codeChallenge/evnetHandling/EventHandler.vue'
import EventObject from '../components/practices/codeChallenge/evnetHandling/EventObject.vue'
import EventModifier from '../components/practices/codeChallenge/evnetHandling/EventModifiers.vue'
import ModelBasic from '../components/practices/codeChallenge/form/ModelBasic.vue'
import FormElements from '../components/practices/codeChallenge/form/FormElements.vue'
import ModelModifiers from '../components/practices/codeChallenge/form/ModelModifiers.vue'
import ScopedStyle from '../components/practices/codeChallenge/form/ScopedStyle.vue'
import refExample from '../components/practices/codeChallenge/composition/refExample.vue'
import reactiveExample from '../components/practices/codeChallenge/composition/reactiveExample.vue'
import computedExample from '../components/practices/codeChallenge/computedWatchers/ComputedExample.vue'
import watchExample from '../components/practices/codeChallenge/computedWatchers/watchExample.vue'
import watchEffectExample from '../components/practices/codeChallenge/computedWatchers/watchEffectExample.vue'
import componentLifcycleExample from '../components/practices/codeChallenge/componentLifecycle/componentLifcycleExample.vue'
import prosEmitExample from '../components/practices/codeChallenge/propsAndEmit/PropsEmitParent.vue'

const practices = [
  { id: 'sampleOne', category: 'Reactivity example', title: 'Sample One', component: SampleOne },
  { id: 'directiveText', category: 'Directive example', title: 'Directive Text', component: DirectiveText },
  { id: 'directiveBind', category: 'Directive example', title: 'Directive Bind', component: DirectiveBind },
  { id: 'directiveCondition', category: 'Directive example', title: 'Directive Condition', component: DirectiveCondition },
  { id: 'directiveList', category: 'Directive example', title: 'Directive List', component: DirectiveList },
  { id: 'eventHandler', category: 'Event Handling example', title: 'Event Handler', component: EventHandler },
  { id: 'eventObject', category: 'Event Handling example', title: 'Event Object', component: EventObject },
  { id: 'eventModifiers', category: 'Event Handling example', title: 'Event Modifiers', component: EventModifier },
  { id: 'modelBasic', category: 'Form example', title: 'Model Basic', component: ModelBasic },
  { id: 'formElements', category: 'Form example', title: 'Form Elements', component: FormElements },
  { id: 'modelModifiers', category: 'Form example', title: 'Model Modifiers', component: ModelModifiers },
  { id: 'scopedStyle', category: 'Form example', title: 'Scoped Style', component: ScopedStyle },
  { id: 'refExample', category: 'Composition API example', title: 'Ref Example', component: refExample },
  { id: 'reactiveExample', category: 'Composition API example', title: 'Reactive Example', component: reactiveExample },
  { id: 'computedExample', category: 'Computed & Watchers example', title: 'Computed Example', component: computedExample },
  { id: 'watchExample', category: 'Computed & Watchers example', title: 'Watch Example', component: watchExample },
  { id: 'watchEffectExample', category: 'Computed & Watchers example', title: 'Watch Effect Example', component: watchEffectExample },
  { id: 'componentLifecycle', category: 'Lifecycle example', title: 'Component Lifecycle', component: componentLifcycleExample },
  { id: 'propsEmit', category: 'Props & Emits example', title: 'Props & Emits', component: prosEmitExample }
]

const openCards = ref(Object.fromEntries(practices.map(({ id }) => [id, false])))
</script>

<template>
  <section class="practice-page" aria-labelledby="code-challenge-title">
    <header class="page-heading">
      <p class="eyebrow">Practice</p>
      <h1 id="code-challenge-title">Code Challenge</h1>
      <p>Vue의 개별 기능을 작은 예제로 작성하고, 동작을 직접 확인합니다.</p>
    </header>

    <div class="practice-grid">
      <article v-for="practice in practices" :key="practice.id" class="practice-card">
        <div class="card-heading">
          <div>
            <p>{{ practice.category }}</p>
            <h2>{{ practice.title }}</h2>
          </div>
          <button
            class="card-toggle"
            type="button"
            :aria-expanded="openCards[practice.id]"
            @click="openCards[practice.id] = !openCards[practice.id]"
          >
            {{ openCards[practice.id] ? '접기' : '열기' }}
          </button>
        </div>
        <div v-show="openCards[practice.id]">
          <component :is="practice.component" />
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.practice-page { display: grid; gap: 2rem; }
.page-heading { display: grid; gap: 0.5rem; }
.eyebrow, .card-heading p { color: #2563eb; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
h1, h2 { color: var(--color-heading); font-weight: 700; line-height: 1.2; }
h1 { font-size: clamp(2rem, 5vw, 3rem); }
h2 { font-size: 1.25rem; }
.practice-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; align-items: start; }
.practice-card { display: grid; gap: 1.5rem; padding: 1.5rem; background: var(--color-background-soft); border: 1px solid var(--color-border); border-radius: 0.75rem; }
.card-heading { display: flex; align-items: start; justify-content: space-between; gap: 1rem; }
.card-heading > div { display: grid; gap: 0.25rem; }
.card-toggle { flex: 0 0 auto; padding: 0.375rem 0.625rem; color: #2563eb; font: inherit; font-size: 0.8125rem; font-weight: 700; background: transparent; border: 1px solid #93c5fd; border-radius: 0.375rem; cursor: pointer; }
.card-toggle:hover { background: #eff6ff; }
@media (max-width: 640px) { .practice-grid { grid-template-columns: 1fr; } }
</style>
