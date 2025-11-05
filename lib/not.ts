import { Signal, computed } from '@angular/core';

/**
 * Computes the logical negation of the provided signal.
 */
export function not(signal: Signal<boolean>): Signal<boolean> {
  return computed(() => !signal());
}
