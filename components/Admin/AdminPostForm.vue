<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>
    <AppControlInput v-model="editedPost.title">Title</AppControlInput>
    <AppControlInput v-model="editedPost.thumbnail">Thumbnail Link</AppControlInput>
    <AppControlInput
      controlType="textarea"
      v-model="editedPost.content">Thumbnail Link</AppControlInput>
    <app-control-input
    controlType="textarea"
    v-model="editedPost.previewText">Preview Text</app-control-input>
    <app-button type="submit">Save</app-button>
    <app-button
      type="button"
      btn-style="cancel"
      @click="onCancel">Cancel</app-button>
  </form>
</template>

<script>

export default {
  props: {
    post: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      editedPost: this.post
      ? {...this.post}
      : {
        author: '',
        title: '',
        thumbnail: '',
        content: '',
        previewText: ''
      }
    }
  },
  methods: {
    onSave() {
      this.$emit('submit', this.editedPost)
    },
    onCancel() {
      this.$router.push('/admin')
    }
  }
}
</script>
