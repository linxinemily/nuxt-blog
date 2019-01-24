export default function (context) {
     // if it is asynchronous , return it
     console.log('[middleware]just auth')
     if(!context.store.getters.isAuthenticate) {
       console.log(context.store.state.token)
       console.log(context.store.getters.isAuthenticate)
        context.redirect('/admin/auth')
     }
}
