import {describe, it, expect} from 'vitest';
import { last } from '../src/array';

describe('array last', () => {
  it('参数没有时返回最后一位', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(last(arr)).toBe(5);
  })

  it('参数为0时返回空数组', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(last(arr, 0)).toEqual([]);
  })

  it('参数为负数时返回空数组', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(last(arr, -1)).toEqual([]);
  })

  it('参数为1时返回最后一位', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(last(arr, 1)).toBe(5);
  })

  it('参数为2时返回最后两位', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(last(arr, 2)).toEqual([4, 5]);
  })
})
