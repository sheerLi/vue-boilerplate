<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineComponent, ref, computed, onMounted } from 'vue'
import HelloWorld from '@/components/hello-world.vue'
import { useUserStore } from '@/store/user'

export default defineComponent({
  components: {
    HelloWorld,
  },
  setup() {
    const userStore = useUserStore()

    const loading = ref<boolean>(false)

    userStore.getUserInfo()

    const userInfo = computed(() => userStore.userInfo)

    onMounted(async () => {
      loading.value = true
      await userStore.getUserInfo()
      loading.value = false
    })

    return {
      userInfo,
      loading,
    }
  },
})
</script>

<template>
  <img class="mx-auto" alt="Vue logo" src="@/assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <a-button class="my-[10px]" type="primary">按钮</a-button>
  <div>
    <a-spin v-if="loading" />
    <div v-else-if="userInfo">store中user信息：{{ userInfo.name }}</div>
  </div>
</template>

<style lang="scss">
#app {
  margin-top: 60px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
