import md5 from 'md5';
import {ObjectID} from 'mongodb';
import {deferResponse} from 'n158/services';
import {MongoModel} from 'n158/classes';

export class UserCredentialsModel extends MongoModel {

    constructor (db) {
        super(db, 'usercredentials', {
            title: 'User Credentials',
            type: 'object',
            properties: {
                userId: {},
                type: { type: 'string' },
                credentials: {},
            },
            required: ['userId', 'type', 'credentials']
        }, {
            indexes: [
				{ key: {userId: 1}, options: {unique: true} }
            ]
        });
    }

    register (userId, type, credentials) {
        return super.register({
            userId: ObjectID(userId),
            type: type,
            credentials: credentials,
        });
    }

    registerUsingEmailPassword (userId, email, password) {
        return this.register(userId, 'email-password', {
            email: email,
            password: md5(password),
        });
    }

    registerCredentials (userId, type, credentials) {
        switch (type) {
            case 'email-password':
                return this.registerUsingEmailPassword(userId, credentials.email, credentials.password);
            default:
                break;
        }
    }

    validateCredentialsWithEmailPassword (credentials) {
        var deferred = deferResponse();
        super.findOne({
            type: 'email-password',
            credentials: {
                email: credentials.email,
                password: md5(credentials.password)
            }
        }).then((credentialsFound) => {
            if (!credentialsFound) {
                deferred.reject(401, 'Invalid credentials', {});
                return;
            }
            deferred.resolve(credentialsFound);
        }).catch((err) => {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    validateCredentials (userId, type, credentials) {
        var deferred = deferResponse();
        switch (type) {
            case 'password':
                super.findOne({
                    userId: ObjectID(userId),
                    type: type,
                    credentials: {
                        password: md5(credentials.password)
                    }
                }).then((credentialsFound) => {
                    if (!credentialsFound) {
                        deferred.reject(401, 'Invalid credentials', {});
                        return;
                    }
                    deferred.resolve(200, {});
                }).catch((err) => { deferred.reject(err); });
            break;
            default:
                deferred.reject(400, 'Invalid credentials type');
            break;
        }
        return deferred.promise;
    }

}