import { expect, test, describe, it } from 'vitest'
import { add } from '../src/common'

describe('common test', () => {
  it('add', () => {
    expect(add(1, 2)).toBe(3)
  })
})

