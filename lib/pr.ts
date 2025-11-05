import { Signal, computed } from '@angular/core';

/**
 * Computes whether the provided signal's current value matches the supplied predicate.
 */
export function pr<T>(signal: Signal<T>, predicate: (value: T) => boolean): Signal<boolean> {
  return computed(() => predicate(signal()));
}
