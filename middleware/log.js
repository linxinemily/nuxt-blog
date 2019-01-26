export default function (context) {
     // if it is asynchronous , return it
     console.log('[middleware]just auth')
     console.log(context.store.getters.isAuthenticate)
     if(!context.store.getters.isAuthenticate) {
        context.redirect('/admin/auth')
     }
}
