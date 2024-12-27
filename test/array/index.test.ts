import { describe, it, expect } from 'vitest'
import { last } from '../../packages/array'

describe('Array Utils', () => {
  describe('last', () => {
    it('should return the last element of array', () => {
      expect(last([1, 2, 3])).toBe(3)
      expect(last(['a', 'b', 'c'])).toBe('c')
    })

    it('should return undefined for empty array', () => {
      expect(last([])).toBeUndefined()
    })

    it('should handle array with single element', () => {
      expect(last([1])).toBe(1)
    })

    it('should handle array with undefined/null values', () => {
      expect(last([1, undefined])).toBeUndefined()
      expect(last([1, null])).toBeNull()
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
  })
}) 
