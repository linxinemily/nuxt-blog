<template>
  <div>
    <TheHeader @sidenavToggle="sideNavShow = !sideNavShow"/>
    <TheSideNav
      :show="sideNavShow"
      @close="sideNavShow = false"/>
    <nuxt/>
  </div>
</template>

<script>
import TheHeader from '@/components/Navigation/TheHeader'
import TheSideNav from '@/components/Navigation/TheSideNav'
export default {
  components: {
    TheHeader, TheSideNav
  },
  data() {
    return {
      sideNavShow: false
    }
  }
}
</script>


<style>
html,body {
  font-family: 'Inconsolata', monospace;
}
</style>
