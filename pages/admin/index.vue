<template>
  <div class="admin-page">
    <div class="new-post">
      <button @click="$router.push('/admin/newPost')">Create Post</button>
      <button @click="logout">Log out</button>
    </div>
    <section class="existing-posts">
      <!-- <h1>Existing Posts{{$store.state.token}}111</h1> -->
      <post-list :posts="loadedPosts" isAdmin/>
    </section>
  </div>
</template>

<script>
export default {
  middleware: ['check-auth','log'],
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/admin/auth')
    }
  }
}
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>
