<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
     <admin-post-form @submit="onSubmitted"/>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
  middleware: ['check-auth','log'],
  components: {
    AdminPostForm
  },
  methods: {
    onSubmitted(postData) {
     this.$store.dispatch('addPost', postData)
     .then(() => {
       this.$router.push('/admin')
     })
    }
  }
}
</script>

<style scoped>
.admin-new-post-page .new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .admin-new-post-page .new-post-form {
    width: 500px;
  }
}
</style>
