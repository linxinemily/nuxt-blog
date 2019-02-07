export default function (context) {
  console.log('[middleware]check auth')
  console.log(context)
  context.store.dispatch('initAuth', context.req)
}
