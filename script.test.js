/* globals test, expect */

import {Money, Bank} from './script'

test('Bank can return same amount of money with same two currency codes', () => {
  const money = new Money(1, 'USD')
  const bank = new Bank([])
  expect(bank.convert(money, 'USD')).toEqual(new Money(1, 'USD'))
})

test('Bank can return something to USD', () => {
  const money = new Money(1, 'NLN')
  const bank = new Bank([
    {
      'abbr': 'NLN',
      'name': 'Narnia Lion',
      'rateInUSD': 5.37
    }])
  expect(bank.convert(money, 'USD')).toEqual(new Money(5.37, 'USD'))
  // expect(bank.convert(money, 'USD')).toEqual(new Money(this.bank[0].rateInUSD, 'USD'))
})

test('Bank can return USD to something else', () => {
  const money = new Money(1, 'USD')
  const bank = new Bank([
    {
      'abbr': 'FRC',
      'name': 'Forgotten Realms Copper',
      'rateInUSD': 0.14
    }])
  expect(bank.convert(money, 'FRC')).toEqual(new Money(7.14, 'FRC'))
})

test('Bank can take two currencies that arent USD and still work', () => {
  const money = new Money(1, 'NLN')
  const bank = new Bank([])
  expect(bank.convert(money, 'GCA')).toEqual(new Money(2.10, 'GCA'))
})
