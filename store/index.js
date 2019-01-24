import Vuex from 'vuex'
import axios from 'axios';
import Cookie from 'js-cookie';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
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
        state.token = token
      },
      clearToken(state) {
        state.token = null
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
        return axios.post(`https://nuxt-blog-emily.firebaseio.com/posts.json?auth=${vuexContext.state.token}`, createdPost)
        .then(result => {
          commit('addPost', {...createdPost, id: result.data.name}) //firebase default id field
        })
        .catch(e => console.log(e))
      },
      editedPost(vuexContext, editedPost) { //getting data from server, not from store
        return axios.put(
          `https://nuxt-blog-emily.firebaseio.com/posts/${editedPost.id}.json?auth=${vuexContext.state.token}`,
          editedPost)
        .then(res => {
          vuexContext.commit('editedPost', editedPost)
        })
        .catch(e => console.log(e))
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
          localStorage.setItem('token', result.data.idToken)
          localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000)
          Cookie.set('jwt', result.data.idToken)
          Cookie.set('expirationDate', new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000)
        }).catch(e => {
          console.log(e)
        })
      },
      initAuth(vuexContext, req) {
        let token
        let expirationDate
        console.log(req)
        if(req) {
          if(!req.headers.Cookie) {
            return
          }
          const jwtCookie = req.headers.Cookie
            .split(";")
            .find(e => e.trim().startsWith("jwt="))
          if(!jwtCookie) {
            return
          }
            token = jwtCookie.split("=")[1]
            expirationDate = req.headers.Cookie
            .split(";")
            .find(e => e.trim().startsWith("expirationDate="))
            .split("=")[1]
        } else {
            token = localStorage.getItem('token')
            expirationDate = localStorage.getItem('tokenExpiration')
        }
        if(new Date().getTime() > +expirationDate || !token) {
          console.log('no token or invalid token')
          vuexContext.dispatch('logout')
          return
        }
        vuexContext.commit('setToken', token)
      },
      logout(vuexContext) {
        vuexContext.commit('clearToken')
        Cookie.remove('jwt')
        Cookie.remove('expirationDate')
        if(process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
        }
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      token (state) {
        return state.token
      },
      isAuthenticate(state) {
        return state.token != null
      }
    }
  })
}

export default createStore
