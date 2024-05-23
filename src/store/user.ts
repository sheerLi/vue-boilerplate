import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface User {
  name: string
}

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<User | null>(null)
  const isLogin = computed(() => !!userInfo.value)

  async function getUserInfo() {
    const { ok, data } = await new Promise<{ ok: boolean; data: any }>(
      resolve => {
        setTimeout(() => {
          resolve({
            ok: true,
            data: {
              name: '张三',
            },
          })
        }, 2000)
      },
    )
    if (ok) {
      userInfo.value = data
    }
  }

  return { userInfo, getUserInfo, isLogin }
})
