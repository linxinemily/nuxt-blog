export default function (context) {
  // console.log('[middleware]check auth')
  // console.log(context.store.state.token)
  context.store.dispatch('initAuth', context.req)
}
