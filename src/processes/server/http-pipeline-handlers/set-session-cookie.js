export default (context, next, finish) => {
    var req = context.req;
    var session = new context.params.SessionModel(context.params.db);
    session.createUserSession(req.locals.data._id).then(sessionInstance => {
        context.res.cookie('sid', (sessionInstance._id).toString());
        next(200, {
            session: sessionInstance,
        });
    }).catch(err => {
        next(500, err);
    });
}