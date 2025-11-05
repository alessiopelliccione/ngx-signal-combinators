import { Signal, computed } from '@angular/core';

/**
 * Computes the logical disjunction of the provided boolean signals.
 * Returns true when at least one signal currently evaluates to true.
 */
export function or(...signals: Signal<boolean>[]): Signal<boolean> {
  return computed(() => {
    if (signals.length === 0) {
      return false;
    }
    for (const sig of signals) {
      if (sig()) {
        return true;
      }
    }
    return false;
  });
}
