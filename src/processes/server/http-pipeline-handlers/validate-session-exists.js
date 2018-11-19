export default (context, next, finish) => {
    var currentSession = context.get('currentSession');
    if (!currentSession) {
        next(401, { details: 'Session not found' });
        return;
    }
    next();
}