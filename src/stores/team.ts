import { defineStore } from 'pinia'
import { ref } from 'vue'
import { MEMBERS, type Member, type MemberRole } from '@/data/mock'

let nextId = 1000

export const useTeamStore = defineStore(
  'saas-team',
  () => {
    const members = ref<Member[]>([...MEMBERS])

    function invite(email: string, role: MemberRole) {
      const id = ++nextId
      const name = email.split('@')[0].replace(/[._-]/g, ' ')
      const member: Member = {
        id,
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email,
        role,
        status: 'pending',
        joinedAt: new Date().toISOString().slice(0, 10),
      }
      members.value = [...members.value, member]
    }

    function setRole(id: number, role: MemberRole) {
      members.value = members.value.map((m) => (m.id === id ? { ...m, role } : m))
    }

    function remove(id: number) {
      members.value = members.value.filter((m) => m.id !== id)
    }

    return { members, invite, setRole, remove }
  },
  {
    persist: { key: 'saas-team' },
  }
)
