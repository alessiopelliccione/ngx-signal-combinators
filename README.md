# ngx-signal-combinators

Composable boolean helpers built on Angular 20+ signals. The library exports tree-shakable utilities that let you combine `Signal<boolean>` values just like boolean expressions, while maintaining full type safety and reactivity.

## Installation

```bash
npm install ngx-signal-combinators
```

The package is designed for Angular 20+ applications that leverage the standalone APIs.

## Usage

```ts
import { Component, signal } from '@angular/core';
import { and, not, or, pr } from 'ngx-signal-combinators';

@Component({
  standalone: true,
  selector: 'user-banner',
  template: `
    @if (isPrivileged()) {
      <p>Welcome back, privileged user!</p>
    }
  `,
})
export class UserBannerComponent {
  private readonly isSignedIn = signal(true);
  private readonly isAdmin = signal(false);
  private readonly isNotSuspended = not(signal(false));

  readonly isPrivileged = and(this.isSignedIn, or(this.isAdmin, this.isNotSuspended));
}
```

### API surface

| Function | Description |
| --- | --- |
| `and(...signals)` | Returns a computed signal that is `true` when every source signal is currently `true` (empty input resolves to `true`). |
| `or(...signals)` | Returns a computed signal that is `true` when any source signal is currently `true` (empty input resolves to `false`). |
| `not(signal)` | Returns a computed signal that negates the current value of the supplied signal. |
| `pr(signal, predicate)` | Returns a computed signal that runs the predicate against the current value of the supplied signal. |

### Template example

See `src/app/app.component.ts` for a full example that wires the helpers into a standalone component and uses the `@if` control flow syntax introduced in Angular 17. An excerpt is shown below:

```ts
@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    @if (canSeeAdminPanel()) {
      <article class="admin-panel">Admin panel unlocked.</article>
    } @else {
      <article class="admin-panel--locked">Admin panel locked.</article>
    }

    @if (hasSearchTerm()) {
      <section class="search-results">
        Showing results for "{{ searchTerm() }}".
      </section>
    }
  `,
})
export class AppComponent {
  readonly isSignedIn = signal(false);
  readonly isAdmin = signal(false);
  readonly hasPremium = signal(false);
  readonly isSuspended = signal(false);
  readonly searchTerm = signal('');

  private readonly isNotSuspended = not(this.isSuspended);
  readonly hasSearchTerm = pr(this.searchTerm, (term) => term.trim().length > 0);

  readonly canSeeAdminPanel = and(this.isSignedIn, this.isAdmin, this.hasPremium, this.isNotSuspended);
}
```

## Testing

Unit tests are provided in `tests/ngx-signal-combinators.spec.ts` using [Vitest](https://vitest.dev/). They verify every exported helper. Run them with:

```bash
npx vitest run
```

The tests assert that each computed signal reacts to updates emitted by the source signals. If you prefer a browser-like environment, enable the `jsdom` environment in your Vitest config.
