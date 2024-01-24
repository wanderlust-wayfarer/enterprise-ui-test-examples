import { test, expect, vi } from 'vitest';
import Arithmetic from './arithmetic';

test('arithmetic adds', () => {
  expect(Arithmetic.add(3, 5)).toBe(8);
  expect(Arithmetic.add(-3, -8)).toBe(-11);
});

test('multiply multiplies', () => {
  expect(Arithmetic.multiply(2, 5)).toBe(10);
  expect(Arithmetic.multiply(0, 10)).toBe(0);
});

test('the multiply method invokes the add method b times', () => {
  const spy = vi.spyOn(Arithmetic, 'add');

  const result = Arithmetic.multiply(4, 2);

  expect(spy).toHaveBeenCalledTimes(2);
  expect(spy).toHaveBeenCalledWith(0, 4);
  expect(spy).toHaveBeenCalledWith(4, 4);
  expect(result).toBe(8);

  spy.mockRestore();
});

test('double duplicates', () => {
  expect(Arithmetic.double(5)).toBe(10);
  expect(Arithmetic.double(-3)).toBe(-6);
});
