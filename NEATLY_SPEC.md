# Neatly: Customer Website Build Spec (Phase 1)

You are building the real, production customer website for **Neatly**, an on-demand house-cleaning marketplace in Greater Hartford, Connecticut. Customers book vetted, independent cleaning professionals online.

- **This phase is the customer website only.** The cleaner (worker) portal comes later as Phase 2. Design the database so the worker portal can be added without rework.
- Until the worker portal exists, the business owner assigns cleaners and updates job status from a small **staff console** (section 12).
- A clickable design prototype is in `reference/neatly-prototype.html`. Open it in a browser and match its look, layout and flows. Don't copy its code; it is a single-file demo with fake data.

The owner (Livia) is a designer, not a developer. Explain decisions in plain language, and stop to ask whenever you need an account, a key or a choice from her.

---

## 1. How to work

1. **Plan first.** Read this whole file and the prototype. Then propose a short plan: the folder structure, the milestones from section 15, and the accounts and keys you need from Livia. Wait for her OK before writing code.
2. **Build one milestone at a time.** At the end of each one:
   - run the app;
   - run the tests and fix failures;
   - commit with a clear message;
   - tell Livia in a few sentences what now works and how to try it.
3. **Never put secrets in code.** Use `.env.local` and keep `.env.example` up to date, with every variable and a comment saying where to get it.
4. **Use test mode everywhere until launch:** Stripe test keys, a Supabase development project and test email addresses.
5. **Use the latest stable versions** of every library. Check the official docs when unsure, since APIs change.
6. **Ask, don't guess.** If something in this spec is unclear or seems wrong, ask.
7. **No dead buttons.** Every button and link must do something real. If a feature is not built yet, hide it; don't show a button that does nothing.
8. **Keep `README.md` current,** with setup steps a beginner can follow (install, environment variables, run, deploy).

---

## 2. Tech stack

| Need | Use |
|---|---|
| Framework | Next.js (App Router) + TypeScript + Tailwind CSS |
| Database, auth, file storage | Supabase (Postgres, Auth, Storage, Row Level Security) |
| Sign-in | Supabase Auth: **Google**, **Apple** and **email + password** (plus "forgot password") |
| Payments | Stripe (saved cards via SetupIntent, off-session charges, refunds, webhooks). Stripe Connect payouts come in Phase 2. |
| Email | Resend (or Postmark), with React Email templates |
| Text messages | Twilio, **behind a feature flag and off by default**. US business texting needs A2P 10DLC registration first. |
| Address entry | Google Places Autocomplete, with plain fields as a fallback if no key is set |
| Translations | next-intl: English (default), Português, Español |
| Validation | zod, on both client and server |
| Scheduled jobs | Supabase scheduled functions (pg_cron) or Vercel Cron |
| Errors and analytics | Sentry, PostHog (optional; behind environment variables) |
| Tests | Vitest (unit), Playwright (end-to-end) |
| Hosting | Vercel (preview deploy for every branch; production on the main branch) |
| Help chat | Crisp or Intercom widget, behind an environment variable, **plus** the built-in support tickets in section 10 |

---

## 3. Design system (match the prototype)

**Colors:**
- white `#FFFFFF`
- ink (text) `#172B3A`
- muted text `#5E6E7A`
- borders `#E3ECF1`
- baby blue (primary buttons) `#A8D8F0`
- soft blue `#DDF2FC`
- mist (page background) `#F3FAFE`
- mint (success) `#B9E6D3`
- deep blue (links and selected states) `#276C90`
- warning: background `#F3D9A4`, text `#7A4E00`
- error: background `#F6D3D0`, text `#8E2B22`

**Font:** Inter, loaded with `next/font`.

**Shapes and shadows:** rounded cards (radius 18px), buttons at 12px radius and 44px tall, subtle shadows only on floating elements. No gradients, no emojis.

**Logo:** a house outline with a small sparkle. Recreate it as an SVG component from the prototype.

**Navigation (DoorDash-style):**
- signed-in phones: bottom tab bar with **Home, Book, Bookings, Account**;
- signed-in computers: left sidebar with the same tabs;
- top bar on every signed-in screen: the address picker and a search bar.

**Shared components:** Button, Card, Chip, Stepper, Toggle, StatusPill, Tracker, Modal/Sheet, ConfirmDialog, Toast, EmptyState, ErrorState, Skeleton loaders.

**Accessibility:** WCAG 2.1 AA, which includes:
- visible keyboard focus;
- labels on every input;
- contrast checked;
- works with a screen reader and at 200% zoom;
- respects reduced motion.

**Layout:** works at 360px width and never scrolls sideways.

---

## 4. Pages and routes

**Public (no login):**
- `/`: landing page with an instant price calculator, a ZIP code check and a waitlist for areas not open yet.
- `/services` and `/services/[slug]`: Light Refresh, Standard Clean, Deep Clean, Move-In/Move-Out.
- `/cleaning/[town]`: one search-friendly page per town served (West Hartford, Hartford, Farmington, Bloomfield, Newington).
- `/how-it-works`, `/pricing`, `/faq`.
- `/help` and `/help/[slug]`: searchable help center (section 10).
- `/legal/terms`, `/legal/privacy`, `/legal/cancellation`, `/legal/re-clean-guarantee`, `/accessibility`.
  - Fill these with clearly marked **DRAFT placeholder text** and a banner saying "Draft, pending attorney review." Do not write final legal language.

**Auth:**
- `/welcome`: the first-visit tutorial (4 screens, skippable, see section 5).
- `/signup`, `/login`, `/forgot-password`, `/reset-password`, `/auth/callback`.

**Signed in:**
- `/home`
- `/book` (3 steps)
- `/bookings` and `/bookings/[id]`
- `/account`, with sub-pages:
  - `/account/profile`
  - `/account/homes`
  - `/account/payment`
  - `/account/notifications`
  - `/account/referrals`
  - `/account/privacy`
- `/support`, `/support/new`, `/support/[id]`

**Staff only:** `/staff` (section 12).

Every page needs:
- a loading state (skeleton);
- an empty state;
- an error state with a "Try again" button;
- a working 404 page and error page.

---

## 5. Accounts, first visit and tour

- **First visit:** show the 4-screen tutorial from the prototype:
  1. Book in 60 seconds
  2. Only vetted pros
  3. Track it live
  4. Pay after it's done

  It is skippable and remembered per device. It can be replayed from Account.
- **Sign up:** Continue with Apple, Continue with Google, or Continue with email.
  - Apple and Google: after the provider confirms, show a "Finish your account" step that collects full name, ZIP code, optional mobile number and the terms checkbox.
  - Email: same fields, plus a password with a minimum of 8 characters and a show/hide toggle.
  - Text updates need a **separate, unchecked-by-default** consent checkbox, with "Message and data rates may apply. Reply STOP to opt out."
- **Apple "Hide My Email":** support it. If someone later signs in with another method using the same real email, offer to link the accounts instead of creating a duplicate.
- **Account recovery:** forgot password, change email (with re-verification) and change phone (with a text code, once SMS is enabled).
- **Tour:** after the first sign-up, run the 4-step guided tour of `/home` (address, search, service tiles, navigation). Use a dimmed overlay that spotlights each element. It is skippable and can be replayed from Account.
- **ZIP not served:** still create the account, add the person to the waitlist and show a friendly banner on Home.
- **Sessions:** if a session expires, send the person back to where they were after they log in again. Never lose a half-finished booking.

---

## 6. Home, search and address

- **Greeting:** "Good morning / afternoon / evening, {first name}", based on the local time.
- **Service tiles:** show the estimated time and the "from" price for the customer's saved home.
- **Your next clean:** a live tracker card.
- **Offer banner:** the welcome offer for new customers ($15 off the first clean, applied automatically), otherwise the referral offer.
- **Book again:** one tap to rebook a past cleaning.
- **Popular extras:** a horizontal row.
- **Trust row:** a short line of reasons to trust Neatly, as in the prototype.
- **Search:** matches services and extras by name and keywords ("oven", "move out", "bathroom") and jumps into booking with that choice filled in. Show a friendly message when nothing matches.
- **Address picker:**
  - customers can save several homes (house, a parent's place, a rental);
  - each home stores the street, unit/apartment, ZIP, neighborhood, gate or parking notes, size, bedrooms, bathrooms and pets;
  - if the ZIP isn't served, show the waitlist message.

---

## 7. Booking (3 steps, total always visible)

**Step 1, Your home:**
- pick a saved home or add a new one;
- bedrooms, bathrooms, size range and pets.

**Step 2, Your clean:**
- cleaning level (radio cards);
- extras (chips with prices);
- a collapsible section for notes, rooms to skip, supplies preference and entry method.
  - Entry details (door code, key location) are **encrypted at rest** and shown only to the assigned cleaner on the day of the visit.

**Step 3, Time and payment:**
- next 30 days of dates, with holidays and full days disabled;
- arrival times;
- frequency: one time, weekly −15%, every 2 weeks −10%, every 4 weeks −5%;
- payment: Apple Pay, Google Pay or card;
- promo code field;
- credit toggle;
- the cancellation rules in plain words.

**Sticky bottom bar:** the total, about how long the clean takes, and Continue / Place booking.

**Pricing (one shared function, used on both client and server):**
- Read every number from the `pricing_settings` table. Never hard-code prices.
- Starting price by level: light 79, standard 109, deep 189, move 169.
- Each bedroom beyond the first: +15.
- Each bathroom beyond the first: +20.
- Size adjustment: 1,500–2,500 sq ft +20; 2,500+ sq ft +45.
- Extras:
  - Inside fridge 25
  - Inside oven 30
  - Interior windows 20
  - Laundry 15
  - Dishes 15
  - Inside cabinets 20
- Plan discount: applied to cleaning + extras.
- Service fee: 8% of the discounted service amount.
- Then subtract the promo and the credit. The total can never go below $0.
- Estimated hours:
  - base hours: light 2, standard 3, deep 5, move 4.5;
  - plus 0.5 per bedroom above 3 and 0.5 per bathroom above 2;
  - plus 0.3 per extra;
  - round to the nearest 0.5, with a minimum of 1.5.
- The server **recalculates the price at checkout.** If it differs from what the customer saw, show the new price and the reason, and ask them to confirm.
- Write unit tests for this function.

**After "Place booking":**
- confirmation screen with the live tracker;
- confirmation email;
- the booking appears in `/bookings`.

**Edge cases to handle:**
- double-click on Place booking: make it idempotent;
- the chosen slot was just taken;
- the ZIP was closed;
- the card was declined or needs extra verification (3-D Secure);
- the network drops: keep the draft saved;
- a booking in the past.

---

## 8. Payments (Stripe)

**How a booking is paid:**
1. **At booking:** save the payment method with a SetupIntent. **No charge yet.**
2. **24 hours before the visit:** check that the saved card is still valid.
   - If it fails, email the customer a link to update it and flag the booking for staff.
3. **When staff (later, the cleaner) marks the job complete:** charge the final amount off-session. Use idempotency keys.
4. **If the bank requires the customer to confirm (3-D Secure):** email a secure link to finish the payment, and show a banner in the account.

**Other money flows:**
- **Tips:** after completion, the customer can tip $10, $15, $20 or a custom amount, charged separately. Tips are 100% for the cleaner.
- **Refunds:** full or partial, issued from the staff console.
- **Re-clean:** a $0 booking linked to the original.
- **Late cancellation fee:** $40 if cancelled less than 24 hours before the visit, charged to the saved card.

**Webhooks:** handle `setup_intent.succeeded`, `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded` and `charge.dispute.created`. Verify webhook signatures, and store every event once.

**Never store card numbers.** Only Stripe IDs are stored.

**Receipts:** a receipt page for every payment, emailed and downloadable as a PDF from `/bookings/[id]`.

**Phase 2 (not now):** Stripe Connect Express accounts for cleaner payouts. Keep the `payments` table ready for a `transfer_id`.

---

## 9. Managing bookings (`/bookings` and `/bookings/[id]`)

The booking detail page has:
- the live tracker: Booked → Cleaner confirmed → On the way → Cleaning → Done;
- the cleaner card (photo, first name, rating, number of cleanings);
- the home, date and time, what's included, extras, notes, rooms to skip, price breakdown and payment status.

**Actions (each one works, and each one that can't be undone asks "Are you sure?" first):**
- **Reschedule:** pick a new date or time, with the same rules as booking. It's free outside 24 hours; inside 24 hours, show the fee before confirming.
- **Edit details:** extras, notes and entry instructions, until 24 hours before the visit. Show the price difference.
- **Cancel:** a confirmation dialog that says whether it's free or shows the fee, plus an optional reason (dropdown).
- **Recurring plans:** skip one visit, pause the plan, change frequency or end the plan.
- **Message my cleaner:** in-app thread, available once a cleaner is assigned.
- **Report a problem** (section 10).
- **Rate, review and tip** after completion; "Request a re-clean" within 24 hours.
- **Cleaner preferences:** "Request this cleaner again" (favorite) and "Don't send this cleaner again" (block, private).
- **View or download the receipt.**

**Clear messages for problem states:**
- **No cleaner yet:**
  - after 2 hours, alert staff;
  - after 6 hours, or if the visit is less than 24 hours away, tell the customer and offer: pick another time, keep waiting and get notified, or cancel free.
- **Cleaner cancelled or is running late:** banner, email (and text if enabled), with options to rebook or cancel free.
- **Payment needs attention:** banner with an "Update payment" button.
- **Can't get in:** if the cleaner reports no access (once the worker portal exists, or staff for now), show what happened and what the fee policy is.

---

## 10. Help, support and reporting problems

**Report a problem** (from any booking, and from `/support/new`). Each category asks the right follow-up questions:

| Category | Asks for | What happens |
|---|---|---|
| Areas missed or poorly cleaned | Which rooms, photos (optional) | Offer a free re-clean within 24 h, or a partial refund if the customer prefers. Staff approves. |
| Something damaged | What, where, photos (required), estimated value | Urgent ticket for staff, insurance claim process. |
| Something missing | What, value, when noticed | **Urgent, goes to a person immediately**, never automated. |
| Cleaner late, no-show or left early | Times | Automatic credit offer; staff reviews. |
| Behavior or safety concern | Description, option to stay anonymous to the cleaner | **Urgent and private**, the cleaner is paused from this customer, and staff contacts the customer. Show the emergency note: "If you are in danger, call 911." |
| Billing problem | Which charge, what's wrong | Staff ticket with the payment attached. |
| App not working | What happened, a screenshot (optional), device info (auto-filled) | Goes to a bug list for the developer. |
| Something else | Free text | Staff ticket. |

**Photo uploads:** images only, up to 5 photos at 10 MB each, stored in a private Supabase Storage bucket. Only the uploader and staff can open them.

**Tickets** (`/support` and `/support/[id]`):
- a status: Received → In review → Waiting on you → Resolved;
- a message thread with staff;
- email notification on every staff reply;
- the outcome shown clearly ("Refunded $45 to Visa •••• 4242", "Re-clean booked for Thu, Nov 12, 10 AM").

**Help center:**
- searchable articles, written in plain language and in all 3 languages;
- start with about 15 articles: pricing, what each clean includes, cancelling, rescheduling, tipping, payments and receipts, re-clean guarantee, safety and vetting, entry and keys, pets, supplies, account and login, privacy, service areas, reporting a problem;
- every article ends with "Did this help? Yes / No" and a "Contact support" button.

**Contact:** live chat widget (if configured), a support email and a phone number shown as text, and the support hours.

---

## 11. Account

- **Profile:** name, email, phone, language (EN/PT/ES) and photo (optional).
- **Saved homes:** add, edit, delete, set the default.
- **Payment:** saved methods (via Stripe), default method, payment history, receipts.
- **Notifications:** email and text toggles per type (booking updates, reminders, offers), stored and respected by every sender.
- **Referrals:** a personal code, $25 credit for both people after the friend's first completed clean, and a credit history.
- **Privacy:**
  - **Download my data:** a JSON or ZIP sent by email.
  - **Delete my account:** confirmation step, cancels future bookings, keeps only what the law requires for payments and taxes.
- **Also on the Account page:** replay the tutorial, show the tour, sign out, and sign out of all devices.

---

## 12. Staff console (`/staff`, minimal, for Livia until Phase 2)

Only users with `role = 'staff'` or `'owner'` can open it. It requires 2-step login (Supabase MFA).

- **Bookings:**
  - list with filters (unassigned, today, upcoming, completed, cancelled);
  - assign a cleaner from a simple `cleaners` table that staff manages;
  - change the status;
  - add internal notes.
- **Mark complete:** this triggers the charge.
- **Refunds:** full or partial.
- **Tickets:** inbox with urgent ones at the top; reply, change the status, issue a refund or credit, create a re-clean booking.
- **Cleaners (basic records only for now):** name, photo, towns, rating, active/paused.
- **Pricing and service area:** edit `pricing_settings`, open or close ZIP codes (opening one emails its waitlist).
- **Customers:** search, view bookings, add credit, block an account.
- **Audit log:** every staff action is recorded.

---

## 13. Database (Supabase Postgres, with Row Level Security on every table)

Create SQL migrations for these tables. Add `created_at` and `updated_at` everywhere.

- `profiles`: user id, role (customer, staff, owner, *cleaner later*), full name, phone, phone_verified, language, marketing consent, SMS consent (with timestamp), referral code, referred_by.
- `homes`: owner, label, street, unit, city, ZIP, neighborhood, lat/lng, size range, beds, baths, pets, parking/gate notes, `entry_details_encrypted`, is_default.
- `service_areas`: ZIP, town, is_open.
- `waitlist`: email, ZIP, notified_at.
- `pricing_settings`: one active row with every number from section 7, plus the cancel window, late fee, referral credit and welcome offer.
- `promo_codes`: code, amount, first-booking-only, expires_at, max_uses.
- `cleaners`: name, photo, towns, rating, jobs_count, status. *In Phase 2, link it to a profile.*
- `plans`: customer, home, level, extras, frequency, preferred cleaner, next date, status (active, paused, ended).
- `bookings`:
  - customer, home, plan;
  - cleaner (nullable);
  - date, arrival time, level, extras, notes, rooms_to_skip, supplies, entry method;
  - status: `pending_match`, `confirmed`, `en_route`, `in_progress`, `completed`, `cancelled`, `no_show`;
  - price breakdown as JSON;
  - currency;
  - cancellation reason;
  - parent_booking (for re-cleans).
- `booking_events`: every status change, with who did it and when. This drives the tracker and the audit trail.
- `cleaner_preferences`: customer, cleaner, favorite or blocked.
- `payments`: booking, kind (charge, tip, late_fee, refund), Stripe IDs, amount, status, failure reason, *transfer_id (Phase 2)*.
- `credits_ledger`: customer, amount (+ or −), reason, related booking or referral.
- `reviews`: booking, stars, text, tip amount, visible_to_cleaner.
- `tickets`: number, customer, booking, category, urgency, status, outcome, assigned staff.
- `ticket_messages`: ticket, sender, body, internal_only.
- `ticket_attachments`: ticket, storage path, file type, size.
- `messages`: booking, sender, body, read_at.
- `saved_quotes`: unfinished bookings, used by the follow-up automation.
- `notifications`: user, channel, template, status, error. This is the log of everything sent.
- `stripe_events`: event id (unique), type, processed_at.
- `help_articles`: slug, language, title, body (markdown), category, helpful_yes, helpful_no.
- `audit_log`: actor, action, table, record, before, after.

**RLS rules:**
- customers see and change only their own rows;
- staff see everything;
- entry details are decrypted only through a server function that checks the caller is staff (later: the assigned cleaner, on the day of the visit).

Write a **seed script** with test data: the 5 towns, prices, 5 cleaners, help articles and a test customer.

---

## 14. Automations (scheduled jobs and triggers)

Every automation must:
- be logged in `notifications` or `audit_log`;
- be safe to run twice (idempotent);
- respect each person's notification settings.

| When | Do |
|---|---|
| Booking placed | Confirmation email; alert staff that the booking needs a cleaner |
| Unassigned 2 h | Alert staff again |
| Unassigned 6 h, or visit < 24 h away | Tell the customer, offer the options in section 9 |
| 24 h before visit | Reminder email (and text if enabled); check the saved card |
| Status changes (en route, started, done) | Update the tracker; notify the customer |
| Completed | Charge the card; email the receipt; ask for a rating and tip |
| Rating ≤ 3 stars | Open a re-clean ticket automatically; email the customer the re-clean offer |
| Plan visit confirmed or completed | Create the next visit (same cleaner preferred) |
| Payment failed | Email a secure update link; retry once after the update; hold the next plan visit |
| Booking started but not finished | Email the saved quote 2 h later (once only) |
| Referred friend's first completed clean | Add $25 credit to both; email both |
| ZIP opened | Email everyone on that ZIP's waitlist |
| Customer inactive 45 days | "Time for a clean?" email (only if they opted in to offers) |
| New ticket or ticket reply | Email the other side; urgent tickets also alert staff immediately |

---

## 15. Milestones (build in this order, commit after each)

| # | Milestone | What it covers |
|---|---|---|
| M0 | Setup | Repo, Next.js, Tailwind, design tokens, linting, Supabase project connection, `.env.example`, README, Vercel preview deploy. |
| M1 | Design system and public pages | Components from section 3, landing page, services, town pages, how it works, pricing, FAQ, legal drafts, 404 and error pages. |
| M2 | Accounts | Sign up and log in with Google, Apple and email; forgot password; welcome tutorial; finish-account step; guided tour; protected routes. |
| M3 | Homes, pricing and booking | Saved homes, address autocomplete, pricing function with tests, 3-step booking, Stripe SetupIntent, confirmation email. |
| M4 | Managing bookings | Booking detail, tracker, reschedule, edit, cancel with confirmation, plans, receipts, ratings, tips, favorites and blocks. |
| M5 | Support | Report a problem (all categories), photo uploads, tickets with messages, help center with search, contact options, chat widget. |
| M6 | Staff console | Assign cleaners, change status, mark complete (charges the card), refunds, tickets inbox, pricing and ZIP settings, audit log. |
| M7 | Automations and notifications | Every row in section 14; notification settings; email templates in 3 languages; SMS behind a flag. |
| M8 | Polish and launch prep | Translations (EN/PT/ES), accessibility pass, search engine basics (sitemap, metadata, town pages), performance, Playwright tests, launch checklist (section 17). |

**End-to-end tests (Playwright) must cover:**
- sign up with email;
- book a one-time clean with a Stripe test card;
- 3-D Secure test card;
- declined test card;
- reschedule;
- cancel inside and outside 24 h;
- report a damaged item with a photo;
- staff marks complete, then the customer is charged and rates the clean;
- a low rating opens a re-clean ticket;
- delete account.

---

## 16. Security and privacy checklist

- Row Level Security on every table, with tests proving one customer can't read another's data.
- Entry details encrypted (Supabase Vault or pgcrypto), never sent to the browser except to authorized viewers.
- Rate limits on login, sign-up, password reset, promo code checks and ticket creation.
- Server-side validation with zod for every form and server action.
- Uploads: check the file type and size, strip location data from photos, private bucket, signed URLs that expire.
- Stripe webhook signatures verified; no card data stored.
- Staff accounts require 2-step login.
- Security headers (Content Security Policy, HSTS) set in Next.js.
- No personal data in logs or error reports.
- Daily database backups turned on in Supabase.

---

## 17. Launch checklist (tell Livia which ones she must do herself)

- [ ] Domain bought and connected to Vercel; HTTPS on.
- [ ] Supabase production project created; migrations and seed run; backups on.
- [ ] Stripe account verified; live keys added; live webhook created; test a real $1 charge and refund.
- [ ] Google sign-in: Google Cloud OAuth client created, production domain added.
- [ ] Apple sign-in: Apple Developer Program membership; Service ID and key created; domain verified.
- [ ] Email sending domain verified (SPF, DKIM, DMARC).
- [ ] SMS (if used): Twilio number plus A2P 10DLC registration approved.
- [ ] Legal pages reviewed by a Connecticut attorney; business insurance active.
- [ ] Help articles reviewed; support email and phone working.
- [ ] Google Business Profile created; sitemap submitted to Google Search Console.
- [ ] All Playwright tests pass against production with test accounts.

---

## 18. Out of scope for this phase (Phase 2: worker portal)

Do not build these now, but don't block them:
- the cleaner portal (application, onboarding, job board, active job screen, earnings);
- automatic dispatch;
- Stripe Connect payouts;
- cleaners' own reports (can't get in, home bigger than described, safety button);
- masked phone calls;
- native mobile apps.
