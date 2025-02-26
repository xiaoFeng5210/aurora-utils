import { describe, it, expect } from 'vitest'
import { last, arrAt, customSort } from '../../packages/array'

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

  describe('arrAt', () => {
    it('查找最后一位', () => {
      expect(arrAt([1, 2, 3, 4, 5], -1)).toEqual(5)
    })

    it('查找倒数第二位', () => {
      expect(arrAt([1, 2, 3, 4, 5], -2)).toEqual(4)
    })

    it('查找第一位', () => {
      expect(arrAt([1, 2, 3, 4, 5], 0)).toEqual(1)
    })

    it('查找第二位', () => {
      expect(arrAt([1, 2, 3, 4, 5], 1)).toEqual(2)
    })

    it('查找不在数组长度范围内', () => {
      expect(arrAt([1, 2, 3, 4, 5], 5)).toEqual(5)
    })

    it('查找负数超过数组长度  ', () => {
      expect(arrAt([1, 2, 3, 4, 5], -6)).toEqual(1)
    })

    it('查找负数超过数组长度  ', () => {
      expect(arrAt([1, 2, 3, 4, 5], -6)).toEqual(1)
    })

    it('查找负数，正好查到数组长度', () => {
      expect(arrAt([1, 2, 3, 4, 5], -5)).toEqual(1)
    })
  })

  describe('customSort', () => {
    it('应该根据条件对数组进行排序', () => {
      const arr = ['apple', 'banana', 'orange', 'grape']
      const conditions = {
        'orange': 0,
        'grape': 1,
        'apple': 2,
        'banana': 3
      }
      expect(customSort(arr, conditions)).toEqual(['orange', 'grape', 'apple', 'banana'])
    })

    it('应该将没有指定权重的元素放在最后', () => {
      const arr = ['apple', 'banana', 'orange', 'grape', 'kiwi']
      const conditions = {
        'orange': 0,
        'grape': 1,
        'apple': 2
      }
      expect(customSort(arr, conditions)).toEqual(['orange', 'grape', 'apple', 'banana', 'kiwi'])
    })

    it('应该处理数字数组', () => {
      const arr = [5, 3, 1, 4, 2]
      const conditions = {
        '1': 0,
        '3': 1,
        '5': 2
      }
      const result = customSort(arr, conditions)
      // 检查有权重的元素排序正确
      expect(result.slice(0, 3)).toEqual([1, 3, 5])
      // 检查剩余元素包含在结果中
      expect(result).toContain(2)
      expect(result).toContain(4)
      expect(result.length).toBe(5)
    })

    it('当权重相同时应保持原有顺序', () => {
      const arr = ['apple', 'banana', 'orange', 'grape']
      const conditions = {
        'apple': 1,
        'banana': 1,
        'orange': 0,
        'grape': 0
      }
      expect(customSort(arr, conditions)).toEqual(['orange', 'grape', 'apple', 'banana'])
    })

    it('应该抛出错误当第一个参数不是数组', () => {
      // @ts-ignore
      expect(() => customSort('not an array', {})).toThrow('第一个参数必须是数组')
    })

    it('应该抛出错误当第二个参数不是对象', () => {
      // @ts-ignore
      expect(() => customSort([1, 2, 3], 'not an object')).toThrow('第二个参数必须是对象')
    })

    it('应该能够根据对象的特定属性进行排序', () => {
      const arr = [
        { display_name: 'apple', id: 1 },
        { display_name: 'banana', id: 2 },
        { display_name: 'orange', id: 3 },
        { display_name: 'grape', id: 4 }
      ]
      const conditions = {
        'orange': 0,
        'grape': 1,
        'apple': 2,
        'banana': 3
      }
      const result = customSort(arr, conditions, 'display_name')
      expect(result).toEqual([
        { display_name: 'orange', id: 3 },
        { display_name: 'grape', id: 4 },
        { display_name: 'apple', id: 1 },
        { display_name: 'banana', id: 2 }
      ])
    })

    it('应该将没有指定权重的对象属性放在最后', () => {
      const arr = [
        { display_name: 'apple', id: 1 },
        { display_name: 'banana', id: 2 },
        { display_name: 'orange', id: 3 },
        { display_name: 'grape', id: 4 },
        { display_name: 'kiwi', id: 5 }
      ]
      const conditions = {
        'orange': 0,
        'grape': 1,
        'apple': 2
      }
      const result = customSort(arr, conditions, 'display_name')
      expect(result).toEqual([
        { display_name: 'orange', id: 3 },
        { display_name: 'grape', id: 4 },
        { display_name: 'apple', id: 1 },
        { display_name: 'banana', id: 2 },
        { display_name: 'kiwi', id: 5 }
      ])
    })

    it('应该处理对象中属性不存在的情况', () => {
      const arr = [
        { display_name: 'apple', id: 1 },
        { name: 'banana', id: 2 }, // 没有display_name属性
        { display_name: 'orange', id: 3 },
        { display_name: 'grape', id: 4 }
      ]
      const conditions = {
        'orange': 0,
        'grape': 1,
        'apple': 2,
        '': 3 // 对应没有display_name属性的对象
      }
      const result = customSort(arr, conditions, 'display_name')
      expect(result[0]).toEqual({ display_name: 'orange', id: 3 })
      expect(result[1]).toEqual({ display_name: 'grape', id: 4 })
      expect(result[2]).toEqual({ display_name: 'apple', id: 1 })
      expect(result[3]).toEqual({ name: 'banana', id: 2 })
    })
  })
})

