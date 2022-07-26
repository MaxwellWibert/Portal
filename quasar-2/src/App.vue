<template>
  <router-view></router-view>
</template>

<script>
import { ref } from 'vue'

import { useUserStore } from './store/UserStore'
import { useQuasar } from 'quasar'

export default {
  name: 'LayoutDefault',

  components: {
  
  },

  setup() {
    const $q = useQuasar()
    $q.dark.set(false)
    const userStore = useUserStore()
    return {
      userStore,
      leftDrawerOpen: ref(false),
    }
  },
}
</script>
