export default (context, next, finish) => {
    var req = context.req;
    var sType = Math.floor(req.locals.status / 100);
    var whenError = context.params.whenError;
    var shouldRedirect = ((sType == 4 || sType == 5) && whenError);
    if (shouldRedirect) {
        context.res.redirect(
            context.params.redirectUrl + (
                context.params.forgetPreviewsUrl ? '' :
                '?prevUrl=' + encodeURIComponent(req.originalUrl)
            )
        );
        return;
    }
    next();
}