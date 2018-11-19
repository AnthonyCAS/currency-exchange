export default (context, next, finish) => {
    var currentSession = context.get('currentSession');
    if (!currentSession) {
        context.res.redirect('/access');
        return;
    }
    context.res.redirect('/exchange');
}