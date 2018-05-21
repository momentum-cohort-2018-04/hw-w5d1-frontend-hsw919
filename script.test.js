/* globals test, expect */

import {Money, Bank} from './script'

test('Bank can return same amount of money with same two currency codes', () => {
  const money = new Money(1, 'USD')
  const bank = new Bank([])
  expect(bank.convert(money, 'USD')).toEqual(new Money(1, 'USD'))
})

// test('Bank can return something to USD')