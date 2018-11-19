export default (context, next, finish) => {
    var sessionId = context.req.cookies.sid || context.req.query._sid_;
    var SessionModel = context.params.model;
    var db = context.params.db;
    var sessionModel = new SessionModel(db);
    sessionModel.get(sessionId).then((sessionData) => {        
        context.set('currentSession', sessionData);
        next();
    }).catch(() => {
        next();
    });
}