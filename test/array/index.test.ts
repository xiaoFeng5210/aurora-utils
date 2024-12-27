import { describe, it, expect } from 'vitest'
import { last } from '../../packages/array'

describe('Array Utils', () => {
  describe('last', () => {
    it('should return the last element of array', () => {
      expect(last([1, 2, 3])).toEqual([3])
      expect(last(['a', 'b', 'c'])).toEqual(['c'])
    })

    it('should return empty array for empty array', () => {
      expect(last([])).toEqual([])
    })

    it('should handle array with single element', () => {
      expect(last([1])).toEqual([1])
    })

    it('should handle array with undefined/null values', () => {
      expect(last([1, undefined])).toEqual([undefined])
      expect(last([1, null])).toEqual([null])
    })

    it('should handle array with negative n', () => {
      expect(last([1, 2, 3], -1)).toEqual([])
    })

    it('should handle array with n greater than array length', () => {
      expect(last([1, 2, 3], 4)).toEqual([1, 2, 3])
    })

    it('should handle array with n equal to array length', () => {
      expect(last([1, 2, 3], 3)).toEqual([1, 2, 3])
    })

    it('should handle array with n equal to 0', () => {
      expect(last([1, 2, 3], 0)).toEqual([])
    })

    it('查找最后两位', () => {
      expect(last([1, 2, 3, 4, 5], 2)).toEqual([4, 5])
    })

    it('查找最后一位', () => {
      expect(last([1, 2, 3, 4, 5], 1)).toEqual([5])
    })
  })
}) 
