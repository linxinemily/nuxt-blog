<template>
  <div>
    <post-list
      :posts="loadedPosts"/>
  </div>
</template>

<script>
import PostList from '@/components/Posts/postList'

export default {
  components: {
    PostList
  },
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  }
}
</script>
