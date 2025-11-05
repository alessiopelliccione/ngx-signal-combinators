# ngx-signal-combinators

Composable boolean helpers built on Angular 20+ signals. The library exports tree-shakable utilities that let you combine `Signal<boolean>` values just like boolean expressions, while maintaining full type safety and reactivity.

## Installation

```bash
npm install ngx-signal-combinators
```

The package is designed for Angular 20+ applications that leverage the standalone APIs.

## Usage

### API surface

| Function | Description |
| --- | --- |
| `and(...signals)` | Returns a computed signal that is `true` when every source signal is currently `true` (empty input resolves to `true`). |
| `or(...signals)` | Returns a computed signal that is `true` when any source signal is currently `true` (empty input resolves to `false`). |
| `not(signal)` | Returns a computed signal that negates the current value of the supplied signal. |
| `pr(signal, predicate)` | Returns a computed signal that runs the predicate against the current value of the supplied signal. |

### Template example

See `src/app/app.component.ts` for a full example that wires the helpers into a standalone component and uses the `@if` control flow syntax introduced in Angular 17. Below are individual template snippets that demonstrate each helper (assuming the component exposes `isSignedIn`, `hasPremium`, `isSuspended`, `searchTerm`, and a predicate helper `isNonEmpty` as signals/functions):

#### `and(...)`

```html
@if (and(isSignedIn, hasPremium)()) {
  <article class="premium-banner">
    Thanks for subscribing! Premium features unlocked.
  </article>
} @else {
  <article class="premium-banner--locked">Activate premium to unlock more features.</article>
}
```

#### `not(...)`

```html
@if (not(isSuspended)()) {
  <aside class="account-status">Account in good standing.</aside>
} @else {
  <aside class="account-status--warning">Account currently suspended.</aside>
}
```

#### `or(...)`

```html
@if (or(isSignedIn, hasPremium)()) {
  <section class="dashboard">Dashboard available.</section>
} @else {
  <section class="dashboard--locked">Sign in to access your dashboard.</section>
}
```

#### `pr(...)`

```html
@if (pr(searchTerm, isNonEmpty)()) {
  <section class="search-results">
    Showing results for "{{ searchTerm() }}".
  </section>
} @else {
  <section class="search-results--empty">
    Enter a search term to see results.
  </section>
}
```

## Testing

Unit tests are provided in `tests/ngx-signal-combinators.spec.ts` using [Vitest](https://vitest.dev/). They verify every exported helper. Run them with:

```bash
npx vitest run
```

The tests assert that each computed signal reacts to updates emitted by the source signals. If you prefer a browser-like environment, enable the `jsdom` environment in your Vitest config.
