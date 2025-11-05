import { Signal, computed } from '@angular/core';

/**
 * Computes the logical conjunction of the provided boolean signals.
 * Returns true when every signal currently evaluates to true.
 */
export function and(...signals: Signal<boolean>[]): Signal<boolean> {
  return computed(() => {
    if (signals.length === 0) {
      return true;
    }
    for (const signal of signals) {
      if (!signal()) {
        return false;
      }
    }
    return true;
  });
}
