# SauceDemo test plan

## Application Overview

Comprehensive QA plan for the SauceDemo application, covering login, catalog browsing, cart management, checkout, and failure states for a realistic e-commerce user journey.

## Test Scenarios

### 1. Authentication and access control

**Seed:** `tests/seed.spec.ts`

#### 1.1. should allow a valid user to log in and see the product catalog

**File:** `tests/authentication/should-allow-valid-user-login.spec.ts`

**Steps:**
  1. Open the SauceDemo home page at https://www.saucedemo.com/
    - expect: The login form is visible with username, password, and login fields.
  2. Enter standard_user in the username field and secret_sauce in the password field
    - expect: The values are entered exactly as typed.
  3. Click the Login button
    - expect: The browser navigates to /inventory.html and loads the Products page.
    - expect: The product catalog is visible and the cart icon is present.

#### 1.2. should reject invalid or locked credentials

**File:** `tests/authentication/should-reject-invalid-or-locked-credentials.spec.ts`

**Steps:**
  1. Open the login page from a fresh browser state
    - expect: The login form is visible.
  2. Enter a valid username with an incorrect password and submit
    - expect: The page shows an error message indicating invalid credentials.
    - expect: The user remains on the login page.
  3. Attempt to log in as locked_out_user with the correct password
    - expect: The page shows a locked-out error and prevents access to the inventory page.
  4. Submit the form with empty values
    - expect: The login is blocked and the required-field validation is shown or the form behaves as expected.

### 2. Product browsing and sorting

**Seed:** `tests/seed.spec.ts`

#### 2.1. should sort and browse products from the inventory list

**File:** `tests/products/should-sort-and-browse-products.spec.ts`

**Steps:**
  1. Log in with a valid user account
    - expect: The inventory page loads successfully.
  2. Open the sort dropdown and choose Name (Z to A)
    - expect: The list reorders in descending alphabetical order.
  3. Change the sort to Price (low to high)
    - expect: Products are displayed from the lowest price to the highest price.
  4. Open a product detail page by clicking a product name
    - expect: The selected product detail page shows the title, description, price, and Back button.
  5. Use the Back button to return to the product catalog
    - expect: The user returns to the inventory list without losing the session.

#### 2.2. should add products to the cart and reflect item counts

**File:** `tests/products/should-add-products-to-cart-and-reflect-item-counts.spec.ts`

**Steps:**
  1. Log in to the app and confirm the product list is visible
    - expect: The inventory page is loaded and interactive.
  2. Click Add to cart on Sauce Labs Backpack
    - expect: The Add to cart button changes to Remove and the cart badge displays 1.
  3. Add Sauce Labs Bike Light and Sauce Labs Bolt T-Shirt
    - expect: The cart badge updates to 3 and each selected product shows Remove.
  4. Open the cart from the cart icon
    - expect: The cart page lists the selected products and the total item count.
  5. Remove one product from the cart
    - expect: The removed product disappears from the cart and the badge count decreases appropriately.

### 3. Checkout and order completion

**Seed:** `tests/seed.spec.ts`

#### 3.1. should complete a valid checkout flow

**File:** `tests/checkout/should-complete-valid-checkout-flow.spec.ts`

**Steps:**
  1. Log in and add at least two products to the cart
    - expect: The cart shows the expected quantity and item list.
  2. Open the cart and click Checkout
    - expect: The checkout information form is visible.
  3. Enter valid first name, last name, and postal code values
    - expect: The form accepts the values and allows Continue.
  4. Click Continue
    - expect: The checkout overview page loads showing the selected items and totals.
  5. Click Finish
    - expect: A confirmation page appears with a success message and order completion state.
  6. Click Back Home
    - expect: The user returns to the inventory page for a fresh shopping session.

#### 3.2. should validate checkout fields and prevent incomplete orders

**File:** `tests/checkout/should-validate-checkout-information.spec.ts`

**Steps:**
  1. Log in and add one product to the cart
    - expect: The cart has at least one item.
  2. Open the cart and start checkout
    - expect: The checkout form is visible.
  3. Leave all required fields blank and click Continue
    - expect: An inline error is shown and the user cannot continue.
  4. Fill in only the first name and click Continue
    - expect: The page keeps the user on the form and asks for the missing required values.
  5. Enter complete valid information and then cancel at the overview screen
    - expect: The user is returned to the cart and the order is not finished.
