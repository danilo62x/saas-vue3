import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type BillingCycle, type PlanId } from '@/data/mock'

export const useSubscriptionStore = defineStore(
  'saas-subscription',
  () => {
    const planId = ref<PlanId>('pro')
    const cycle = ref<BillingCycle>('monthly')
    const canceled = ref(false)

    function setPlan(id: PlanId) {
      planId.value = id
      canceled.value = false
    }

    function setCycle(c: BillingCycle) {
      cycle.value = c
    }

    function toggleCycle() {
      cycle.value = cycle.value === 'monthly' ? 'yearly' : 'monthly'
    }

    function cancel() {
      canceled.value = true
    }

    function resume() {
      canceled.value = false
    }

    return { planId, cycle, canceled, setPlan, setCycle, toggleCycle, cancel, resume }
  },
  {
    persist: { key: 'saas-subscription' },
  }
)
