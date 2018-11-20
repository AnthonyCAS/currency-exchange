import { Component, OnInit } from '@angular/core';
import { MyCurrencyPipe } from "./../../shared/pipes/CurrencyPipe";

import { ResourcesService } from '../../shared/services';

@Component({
  template: require('./template.pug')(),
  styles: [require('./styles.styl').toString()]
})

export class ExchangeComponent implements OnInit {

    currency: any;
    baseValue: Number;

    // Methods
    constructor (
        private resourcesService: ResourcesService,
        private currencyPipe: MyCurrencyPipe
    ) {
        this.currency = {};
        this.baseValue = 0;
    }

    ngOnInit () {

    }

    onAmountChange(amount: string) {
        this.currency.base = amount;
        this.baseValue = Number(amount);
    }

    private isEmpty(str) {
        return (!str || 0 === str.length);
    }

    computeRate() {
        if (this.isEmpty(this.baseValue))
            return
        this.resourcesService.getCurrencyRate(
            "USD", "EUR"
        ).subscribe(currency => {
            if (currency.status === 200) {
                console.log("I =>", currency);
                var targetValue = Number(currency.rates["EUR"]) * Number(this.baseValue);
                this.currency.target = this.currencyPipe.transform(targetValue);
            }
            else {
                alert("Currency not found")
            }
        }, err => {
            console.error("Error getting currency =>", err);
        });
    }
}
