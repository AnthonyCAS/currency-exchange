import { ObjectId } from "mongodb";
import { MongoModel } from "n158/classes";
import { deferResponse } from "n158/services";

export class CurrencyModel extends MongoModel {
    constructor (db) {
        super(db, 'currency', {
            title: 'Currency',
            type: 'object',
            properties: {
                base: {type: 'string'},
                last_updated: {type: 'string'},
                rates: {}
            },
            required: ['base']
        }, {
            indexes: []
        })
    }

    /**
     * Get a currency rates by base name
     * @param {*} base source currency
     * @param {*} symbols target currecny
     */
    getCurrencyRate (base, symbols) {
        var deferred = deferResponse();
        super.findOne({
            base: base,
        }).then((currency) => {
            if (currency == null) {
                deferred.resolve({
                    status: 404
                });
            }
            let rate = currency.rates[symbols];
            if (rate == null) {                
                deferred.resolve({
                    status: 404
                });
            }
            var response = {
                base: currency.base,
                date: currency.last_updated,
                rates: { },
                status: 200
            };            
            response.rates[symbols] = rate;
            deferred.resolve(response);
        }).catch((err) => {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}
