<template>
  <div class="grid gap-6 lg:grid-cols-4">
    <PlanCard
      v-for="plan in PLANS"
      :key="plan.id"
      :plan="plan"
      :cycle="cycle"
      :current="highlightCurrent && plan.id === subscription.planId"
      @select="handleSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { PLANS, type BillingCycle, type Plan } from '@/data/mock'
import { useSubscriptionStore } from '@/stores/subscription'
import { useAuthStore } from '@/stores/auth'
import PlanCard from './PlanCard.vue'

const props = withDefaults(
  defineProps<{
    cycle: BillingCycle
    /** show "current plan" state from subscription store (used on the app/billing context). */
    highlightCurrent?: boolean
  }>(),
  { highlightCurrent: false }
)

const emit = defineEmits<{ (e: 'select', plan: Plan): void }>()

const router = useRouter()
const subscription = useSubscriptionStore()
const auth = useAuthStore()

function handleSelect(plan: Plan) {
  // When a parent listens for `select`, defer to it (billing context).
  if (props.highlightCurrent) {
    emit('select', plan)
    return
  }
  if (plan.id === 'enterprise') {
    router.push('/contato')
    return
  }
  router.push(auth.user !== null ? '/app/cobranca' : '/registro')
}
</script>
