# Sauce Demo — Comprehensive Test Plan

## Executive Summary

This test plan covers the main user journeys and edge cases for the Sauce Labs demo e-commerce site at https://www.saucedemo.com/ ("Swag Labs"). The focus is functional verification of authentication, product browsing, cart and checkout flows, UI controls (sorting/filtering), error handling, and basic negative and performance scenarios. Assume a fresh browser state for each scenario.

Test data (canonical):
- Valid user: `standard_user` / `secret_sauce`
- Locked user: `locked_out_user` / `secret_sauce`
- Problem user: `problem_user` / `secret_sauce` (special behavior)
- Performance test user: `performance_glitch_user` / `secret_sauce`
- Error user: `error_user` / `secret_sauce`

Notes:
- Start each scenario from a blank session (no cookies, localStorage, or logged-in state) unless stated otherwise.
- The site is static/demo; some users intentionally present unusual behavior — include those as negative/edge tests.

---

## Test Scenarios

### 1. Login — Happy Path

Assumptions:
1. Browser state is blank.
2. Test user `standard_user` exists and `secret_sauce` is the correct password.

Steps:
1. Navigate to `https://www.saucedemo.com/`.
2. Enter username `standard_user` into the Username field.
3. Enter password `secret_sauce` into the Password field.
4. Click the `Login` button.

Expected Results:
- The app navigates to the products page (`/inventory.html`).
- Page title or heading displays `Products`.
- Product list is visible and initially populated with items.

Success criteria:
- User reaches the products listing and can interact with product controls.

Failure conditions:
- Any client-side validation prevents login (unexpected).
- Server returns an error or displays an authentication error message.

---

### 2. Login — Invalid Credentials

Assumptions:
- Blank session.

Steps:
1. Go to the login page.
2. Enter username `invalid_user` and password `bad_pass`.
3. Click `Login`.

Expected Results:
- The app shows a clear error message (e.g., `Username and password do not match` or `Epic sadface: Username and password do not match any user in this service`).
- No navigation to `/inventory.html`.

Success criteria:
- Error message is shown and is accessible (focusable or announced).

Failure conditions:
- The app navigates to inventory despite wrong credentials.

---

### 3. Login — Locked Out User

Assumptions:
- Blank session.

Steps:
1. Enter `locked_out_user` / `secret_sauce` and click `Login`.

Expected Results:
- The site displays a locked account message (e.g., `Epic sadface: Sorry, this user has been locked out.`).
- No navigation to inventory.

Success criteria: locked-out message is shown and login prevented.

Failure conditions: account gets access.

---

### 4. Login — Missing Fields Validation

Assumptions:
- Blank session.

Steps:
1. Leave username empty, enter password only, click `Login`.
2. Reverse: enter username only, leave password empty, click `Login`.
3. Click `Login` with both fields empty.

Expected Results:
- Appropriate validation messages appear for missing fields.
- No navigation to inventory.

Success criteria: each case produces a specific message.

Failure conditions: silent failure or unexpected navigation.

---

### 5. Product Listing — Basic UI & Content

Assumptions:
- Logged in as `standard_user`.

Steps:
1. On the products page, verify header, product count, and sorting control presence.
2. Inspect first product: title, description snippet, price, `Add to cart` button, image.

Expected Results:
- Each product card shows title, description, price and an `Add to cart` button and image.
- Default sort is `Name (A to Z)`.

Success criteria: product listing renders correctly and consistently.

Failure conditions: missing product info, broken images, or missing CTA buttons.

---

### 6. Add to Cart / Remove from Cart

Assumptions:
- Logged in and on `/inventory.html`.

Steps:
1. Click `Add to cart` on a product.
2. Verify cart icon updates (badge/increment) if present.
3. Click `Remove` (button toggles to Remove) and verify cart updates.

Expected Results:
- Clicking `Add to cart` changes the button to `Remove` and updates the cart badge to reflect item count.
- Removing decrements the badge and button toggles back to `Add to cart`.

Success criteria: add/remove updates both UI and cart state.

Failure conditions: count not updated, state inconsistent across refresh.

---

### 7. Cart Page — View, Update, and Persistence

Assumptions:
- Items have been added to cart.

Steps:
1. Click the cart icon to navigate to `/cart.html`.
2. Verify listed items match added items (title, price, quantity control if present).
3. Remove items from cart and verify the list updates.
4. Refresh the page; verify cart content persistence (if expected by app behavior).

Expected Results:
- Cart shows correct items and prices.
- Removing updates UI immediately.
- Persistence behavior documented (Sauce Demo typically persists in session/localStorage while in same browser session).

Success criteria: cart behavior matches UI and expected persistence.

Failure conditions: items lost unexpectedly or duplication.

---

### 8. Checkout — Happy Path (Complete Purchase)

Assumptions:
- At least one item in the cart.

Steps:
1. Navigate to cart, click `Checkout`.
2. On the checkout information page, fill `First Name`, `Last Name`, `Postal Code` (e.g., `Jane`, `Doe`, `12345`).
3. Click `Continue`.
4. Verify order overview contains correct items and total.
5. Click `Finish`.

Expected Results:
- After `Finish`, the app shows an order confirmation page (e.g., `THANK YOU FOR YOUR ORDER`).
- The cart is emptied (or state consistent with design).

Success criteria: full flow completes without error and confirmation shown.

Failure conditions: incorrect totals, missing order confirmation.

---

### 9. Checkout — Validation & Negative Cases

Assumptions:
- Cart has items.

Steps:
1. Click `Checkout` and attempt to continue with missing fields (e.g., leave postal code empty).

Expected Results:
- Form validation messages appear and prevent continuing until required fields are filled.

Success criteria: validation prevents incomplete checkout.

Failure conditions: checkout continues with incomplete data.

---

### 10. Sorting / Filter Controls

Assumptions:
- Logged in and viewing inventory.

Steps:
1. Use sort dropdown to select `Name (Z to A)` then `Price (low to high)`, and `Price (high to low)`.
2. Validate order of items matches selected sort.

Expected Results:
- Items reorder correctly and reflect sorting selection.

Success criteria: sorting matches expected order.

Failure conditions: no change or incorrect sorting.

---

### 11. Navigation — Menu & Logout

Assumptions:
- Logged in.

Steps:
1. Open the menu (hamburger). 2. Click `Logout`.

Expected Results:
- User is returned to the login page and session is cleared.

Success criteria: logout invalidates session and prevents back navigation to inventory without login.

Failure conditions: user still has access after logout.

---

### 12. Problem User Behavior (UI/Asset Edge Cases)

Assumptions:
- Log in as `problem_user`.

Steps:
1. Log in with `problem_user` / `secret_sauce`.
2. Inspect product images, links and interactions.

Expected Results:
- Known demo behavior: images or links may be broken or swapped; surface these anomalies as tickets rather than test failures if they match documented demo behavior.

Success criteria: anomalies are reproducible and captured.

Failure conditions: unexpected crash or blocking error.

---

### 13. Performance Glitch User — Slow Load Handling

Assumptions:
- Log in as `performance_glitch_user`.

Steps:
1. Log in and measure load time of `inventory.html` and key interactions.

Expected Results:
- Page may load slowly but remains functional; timeouts and UX should handle latency gracefully.

Success criteria: app does not hang; loading indicators (if any) show.

Failure conditions: uncaught timeouts or app freeze.

---

### 14. Accessibility Checks (Smoke)

Assumptions:
- Use a single scenario (products page) with a fresh session.

Steps:
1. Verify keyboard-only navigation can reach login, form fields, and product `Add to cart` controls.
2. Verify ARIA labels or semantic elements for inputs and main headings.
3. Check color contrast of key elements (buttons, links) using an automated tool.

Expected Results:
- Login form fields and error messages are reachable and announced by screen readers.

Success criteria: no critical accessibility blockers.

Failure conditions: inaccessible error messages or focus traps.

---

### 15. Visual Regression / Smoke Test

Assumptions:
- Baseline screenshots available for critical pages (login, inventory, cart, checkout).

Steps:
1. Capture screenshots of key pages and compare with baseline.

Expected Results:
- No unexpected visual diffs in major UI regions.

Success criteria: screenshot diffs are within acceptable thresholds.

Failure conditions: major layout regressions.

---

### 16. Session/Storage & Refresh Behavior

Assumptions:
- Items added to cart.

Steps:
1. Add items, refresh the browser.
2. Close tab, open new tab and visit `/inventory.html`.

Expected Results:
- Cart persistence behavior should match product design (test and document whether persistence is expected beyond session).

Success criteria: documented and consistent behavior.

Failure conditions: data loss beyond expected behavior.

---

## Test Execution Notes & Prioritization

- Priority 1 (P1): Login flows, add to cart, cart checkout happy path, logout.
- Priority 2 (P2): Sorting/filtering, remove from cart, negative login tests, validation.
- Priority 3 (P3): Problem user anomalies, performance/latency tests, accessibility, visual regression.

## Test Environment

- Browser: Chromium-based and Firefox (cross-browser smoke).
- Network: normal + throttled (for performance glitch tests).
- Start each test with an isolated profile.

## Reporting

- Log steps, input data, screenshots on failures.
- For known demo-user edge behavior (e.g., `problem_user`), mark as "documented demo behavior" and include repro steps.

---

## Appendix: Quick Run Checklist

- [ ] Clear browser cookies/localStorage.
- [ ] Open `https://www.saucedemo.com/`.
- [ ] Execute P1 tests: Login (standard_user), Add to cart, Checkout, Logout.
- [ ] Execute P2 tests: Negative login, Sort checks, Cart updates.
- [ ] Execute P3 tests: problem_user, performance_glitch_user, accessibility checks.



*End of test plan.*
