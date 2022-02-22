<template>
  <div id="app">
    <component :is="layout">
      <keep-alive>
        <router-view :key="$route.fullPath" />
      </keep-alive>
    </component>
  </div>
</template>

<script>
import '@/scss/app.scss'

export default {
  computed: {
    layout() {
      return `layout-${this.$route.meta.layout || 'default'}`
    }
  }
}
</script>
