import {ObjectID} from 'mongodb';
import {deferResponse} from 'n158/services';
import {MongoModel} from 'n158/classes';
import {UserModel} from './User';

export class SessionModel extends MongoModel {

    constructor (db) {
        super(db, 'session', {
            title: 'Session',
            type: 'object',
            properties: {
                userId: {},
                type: { type: 'string' },
                active: { type: 'boolean' },
            },
            required: ['type']
        }, {
            indexes: [
                { key: {userId: 1}, options: {unique: false} }
            ]
        });
    }

    createUserSession (userId) {
        return super.register({
            userId: ObjectID(userId),
            type: 'user',
            active: true
        });
    }

    get (sessionId) {
        var userModel = new UserModel(this.db);
        var deferred = deferResponse();
        this.aggregate([
            {
                $match: {
                    _id: ObjectID(sessionId)
                }
            }
        ], {}).then(function (sessions) {
            if (!sessions.length) {
                deferred.reject(404, 'Session not found');
                return;
            }
            var session = sessions[0];
            deferred.resolve(session);
        }).catch(deferred.reject);
        return deferred.promise;
    }

}
