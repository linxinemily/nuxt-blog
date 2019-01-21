import Vuex from 'vuex'
import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: 'abcd',
      emily: '',
      counter: 0
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editedPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id)
        state.loadedPosts[postIndex] = editedPost
      },
      setToken(state, token) {
        console.log('token ', token)
        state.emily = 'world'
        state.token = token
      },
      increment (state) {
        state.counter++
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios.get('https://nuxt-blog-emily.firebaseio.com/posts.json')
        .then(res => {
          const postsArray = []
          for(const key in res.data) {
            postsArray.push({ ...res.data[key], id: key })
          }
          vuexContext.commit('setPosts', postsArray)
        })
      },
      addPost({ commit }, post) {
        const createdPost = { ... post, updatedDate: new Date() }
        return axios.post('https://nuxt-blog-emily.firebaseio.com/posts.json', createdPost)
        .then(result => {
          commit('addPost', {...createdPost, id: result.data.name}) //firebase default id field
        })
        .catch(e => console.log(e))
      },
      editedPost(vuexContext, editedPost) { //getting data from server, not from store
        return axios.put(
          `https://nuxt-blog-emily.firebaseio.com/posts/${editedPost.id}.json`,
          editedPost)
        .then(res => {
          vuexContext.commit('editedPost', editedPost)
        })
        .catch(e => context.error(e))
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      },
      authenticateUser(vuexContext, authData) {
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBJsUi2xooXdY4B6IhLDbf6Aya7wToKoVs'
          //sign in
        if(!authData.isLogin) {
          url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBJsUi2xooXdY4B6IhLDbf6Aya7wToKoVs'
        }
        return axios.post(url,
        {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
        }).then(result => {
          vuexContext.commit('setToken', result.data.idToken)
        }).catch(e => {
          console.log(e)
        })
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      token (state) {
        return state.token
      }
    }
  })
}

export default createStore
