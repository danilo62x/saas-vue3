import { defineStore } from 'pinia'
import { ref } from 'vue'
import { PROJECTS, type Project } from '@/data/mock'

const COLORS = ['#465fff', '#12b76a', '#f79009', '#0ba5ec', '#f04438', '#7592ff']

let nextId = 1000

export const useProjectsStore = defineStore(
  'saas-projects',
  () => {
    const projects = ref<Project[]>([...PROJECTS])
    const workspace = ref('Acme Inc.')

    function addProject(name: string) {
      const id = ++nextId
      const color = COLORS[projects.value.length % COLORS.length]
      const project: Project = {
        id,
        name,
        status: 'active',
        progress: 0,
        members: 1,
        updatedAt: new Date().toISOString().slice(0, 10),
        color,
      }
      projects.value = [project, ...projects.value]
    }

    function removeProject(id: number) {
      projects.value = projects.value.filter((p) => p.id !== id)
    }

    function setStatus(id: number, status: Project['status']) {
      projects.value = projects.value.map((p) => (p.id === id ? { ...p, status } : p))
    }

    function setWorkspace(name: string) {
      workspace.value = name
    }

    return { projects, workspace, addProject, removeProject, setStatus, setWorkspace }
  },
  {
    persist: { key: 'saas-projects' },
  }
)
