import {MongoModel} from 'n158/classes';
import {deferResponse} from 'n158/services';
import sha256 from 'sha256';
import { ObjectId } from "mongodb";

import {UserCredentialsModel} from './UserCredentials';
import {SessionModel} from './Session';

export class UserModel extends MongoModel {

    constructor (db) {
        super(db, 'user', {
            title: 'User',
            type: 'object',
            properties: {
                email: { type: 'string' }
            },
            required: ['email']
        }, {
            indexes: [ ]
        });
    }

    registerPersonWithEmailPassword (email, password) {
        return this.register({email: email}, 'email-password', {
            email: email,
            password: password,
        });
    }

    register(userData, credentialsType, userCredentials) {
        var deferred = deferResponse();
        super.register(userData).then((user) => {
            var userCredentialsModel = new UserCredentialsModel(this.db);
            userCredentials.userId = user._id;
            userCredentials.type = credentialsType;
            userCredentialsModel.registerCredentials(
                userCredentials.userId, userCredentials.type, userCredentials
            ).then(() => {            
                deferred.resolve(200, {});
            }).catch((err) => {
                super.removeById(user._id);
                deferred.reject(err);
            });
        }).catch((err) => {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    validateWithEmailPassword (email, password) {
        var deferred = deferResponse();
        var userCredentials = new UserCredentialsModel(this.db);
        userCredentials.validateCredentialsWithEmailPassword({
            email: email,
            password: password,
        }).then((credentials) => {
            super.findOne({
                _id: credentials.userId,
            }).then((user) => {
                if (!user) {
                    deferred.reject(404, 'User not found', { details: 'User not found' });
                    return;
                }
                deferred.resolve(user);
            }).catch(deferred.reject);
        }).catch(deferred.reject);
        return deferred.promise;
    }

    createSessionUsingEmailPassword (email, password) {
        var deferred = deferResponse();
        this.validateWithEmailPassword(email, password).then((user) => {
            var sessionModel = new SessionModel(this.db);
            sessionModel.createUserSession(user._id).then((session) => {
                session.user = user;
                deferred.resolve(session);
            }).catch(deferred.reject);
        }).catch(deferred.reject);
        return deferred.promise;
    }

}