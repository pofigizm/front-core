/* eslint-disable camelcase */
import { toCamelcase, toSnakecase } from './keyConvert'

test('toCamelcase', () => {
  expect(toCamelcase({ foo_bar: true })).toEqual({ fooBar: true })

  expect(toCamelcase({ foo_bar: true, obj: { one_two: false, arr: [{ three_four: true }] } })).toEqual({ fooBar: true, obj: { oneTwo: false, arr: [{ threeFour: true }] } })
})

test('toSnakecase', () => {
  expect(toSnakecase({ fooBar: true })).toEqual({ foo_bar: true })

  expect(toSnakecase({ fooBar: true, obj: { oneTwo: false, arr: [{ threeFour: true }] } })).toEqual({ foo_bar: true, obj: { one_two: false, arr: [{ three_four: true }] } })
})
