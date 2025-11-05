import { describe, expect, it } from 'vitest';
import { signal } from '@angular/core';
import { and, not, or, pr } from '../src/lib';

describe('ngx-signal-combinators', () => {
  describe('and', () => {
    it('returns true when every signal is true', () => {
      const a = signal(true);
      const b = signal(true);
      const result = and(a, b);

      expect(result()).toBe(true);
    });

    it('returns false when any signal is false', () => {
      const a = signal(true);
      const b = signal(false);
      const result = and(a, b);

      expect(result()).toBe(false);

      b.set(true);
      expect(result()).toBe(true);

      a.set(false);
      expect(result()).toBe(false);
    });

    it('returns true when no signals are provided', () => {
      const result = and();
      expect(result()).toBe(true);
    });
  });

  describe('or', () => {
    it('returns true when at least one signal is true', () => {
      const a = signal(false);
      const b = signal(true);
      const result = or(a, b);

      expect(result()).toBe(true);

      b.set(false);
      expect(result()).toBe(false);

      a.set(true);
      expect(result()).toBe(true);
    });

    it('returns false when no signals are provided', () => {
      const result = or();
      expect(result()).toBe(false);
    });
  });

  describe('not', () => {
    it('returns the negated value of the source signal', () => {
      const source = signal(true);
      const result = not(source);

      expect(result()).toBe(false);
      source.set(false);
      expect(result()).toBe(true);
    });
  });

  describe('pr', () => {
    it('returns true when the predicate matches the current value', () => {
      const count = signal(1);
      const isEven = pr(count, (value) => value % 2 === 0);

      expect(isEven()).toBe(false);
      count.set(2);
      expect(isEven()).toBe(true);
    });
  });
});
