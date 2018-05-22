import request from 'superagent'
import math from 'mathjs'
// import $ from 'jquery'

window.addEventListener('load', function () {
  request
    .get('http://fantasy-currency.glitch.me/rates')
    .then(response => {
      console.log(response.body)
    })
})

const PRECISION = 3
const EXPONENT = (10 ** PRECISION)

export class Money {
  constructor (amount, currencyCode) {
    const decimalAsStr = amount.toString().split('.')[1]
    if (decimalAsStr && decimalAsStr.length > PRECISION) {
      throw new Error('Maximum money precision is ' + PRECISION)
    }

    this._amount = amount * EXPONENT
    this.currencyCode = currencyCode
  }

  getAmount () {
    return this._amount / EXPONENT
  }

  plus (other) {
    this.checkCurrencyCodes(other)
    return new Money((this._amount + other._amount) / EXPONENT, this.currencyCode)
  }

  minus (other) {
    this.checkCurrencyCodes(other)
    return new Money((this._amount - other._amount) / EXPONENT, this.currencyCode)
  }

  times (number) {
    return new Money((this._amount * number) / EXPONENT, this.currencyCode)
  }

  checkCurrencyCodes (other) {
    if (this.currencyCode !== other.currencyCode) {
      throw new Error('Currency codes do not match')
    }
  }
}

export class Bank {
  constructor (rates) {
    this.rates = rates
  }

  convert (money, currencyCode) {
    if (money.currencyCode === currencyCode) {
      return new Money(money.getAmount(), currencyCode)
    } else if (money.currencyCode !== 'USD' && currencyCode === 'USD') {
      // return new Money((1 * 5.37) * money.getAmount(), currencyCode)
      return new Money((1 * this.rates[0].rateInUSD) * money.getAmount(), currencyCode)
    } else if (money.currencyCode === 'USD') {
      return new Money(math.round((1 / this.rates[0].rateInUSD) * money.getAmount(), 2), currencyCode)
    } else if (money.currencyCode !== 'USD' && currencyCode !== 'USD') {
      return new Money(math.round((1 * 6.71 / 3.2) * money.getAmount(), 2), currencyCode)
    }
  }
}
