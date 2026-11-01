# Booking on antonwester.se

## Why

Every "Boka möte" button links to a Google appointment page that now says "Appointment not found", so nobody can book. Anton wants booking to live on the site, in the site's own look, with a calendar view, connected to his calendar and email. Anton chose this over embedding Google's booking page.

## Goals

- A visitor picks a free time on the site and gets a calendar invite with a Meet link.
- The meeting lands in Anton's calendar, and only free times are offered.
- Swedish and English, light and dark theme, phone and desktop.

## Non-goals

- Own confirmation or reminder emails to visitors. Google sends them.
- Own cancel or reschedule pages. The visitor uses the Google invite.
- Several meeting types, payment, or an admin screen.

## Anti-goals

- It must not offer a time when Anton is busy.
- It must not be usable to send Google invites to strangers in bulk from Anton's account.
- No Google secret may reach the browser.

## Decisions

### From Anton

- Own calendar view, not an embed.
- Week view: Mon–Fri columns, every free time visible, one click on a time, then the form. On phones the days stack as a list. The last step asks for name, email and what the call is about.
- Calendar account: anton.wester.ab@gmail.com.

### Proposed by Claude, shown to Anton, no objection

- 30-minute call with a Google Meet link.
- Bookable Mon–Fri 09:00–17:00 Europe/Stockholm.
- Earliest 24 hours ahead, latest 4 weeks ahead.
- 15-minute gap around every meeting.
- Times that clash with the calendar are hidden.
- Times show in the visitor's own time zone.

### Claude's calls, check these

- Pages `/sv/boka/` and `/en/book/`. `site.booking` stops being one URL: every button (Nav, HomeHero, PageHero, Contact) links to the page for its locale, and `worker/chat.js` and `src/pages/llms.txt.ts` do too. Both pages go in the sitemap with hreflang, through a new `PageRef` kind.
- Slots start every 30 minutes. A slot is free when its 30 minutes plus 15 on each side touch nothing busy. Last start 16:30.
- Only the primary calendar is checked; Anton confirmed all his meetings are there. Events marked "free" do not block a time. Swedish public holidays are not known; Anton blocks them in the calendar.
- Auth is OAuth with a refresh token, because a service account cannot invite guests from a plain Gmail. Worker secrets: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`. The Google Cloud OAuth app must be set to "In production"; in "Testing" the refresh token dies after 7 days. Scopes: `calendar.events` and `calendar.freebusy`.
- No new runtime dependency. The Worker calls Google with `fetch`.
- Hard cap, because rate limits are per IP and the email address is not verified: at most 10 upcoming bookings from the site, and one per email address. Events carry a private extended property `source=site`. Step 3 reads them with `events.list`, so no new storage is needed. Over the cap, the page shows the email address and contact form instead.
- Privacy: one short line by the form says that name and email go to Google for the invite. No privacy page in this work; the site has none today.

## How it works

`GET /api/booking/slots?week=YYYY-MM-DD` calls Google `freeBusy.query` for primary, and returns the free slots as UTC ISO strings. The browser formats them in the visitor's time zone. Short edge or `no-store` caching is left to the builder; a stale list is safe because the POST checks again.

`POST /api/booking` takes `{ start, name, email, company, message, turnstile token, _honey }` and:

1. Applies the same Origin check and honeypot as `/api/contact`, and a new `BOOK_LIMIT` rate limit.
2. Verifies Cloudflare Turnstile. A visible invite goes to any address typed in, so a form honeypot is not enough. This needs a new widget, a site key, and a `TURNSTILE_SECRET` secret.
3. Validates fields with the rules in `readSubmission`, and checks that `start` is on the slot grid and inside the booking rules.
4. Runs `freeBusy` again. If busy, returns 409 and the page reloads the week with a "taken" message.
5. Calls `events.insert` with `sendUpdates=all`, `conferenceDataVersion=1` and a `hangoutsMeet` create request, with the visitor as attendee.
6. Mails Anton through the existing `MAIL` binding and `buildMessage`, with the visitor's message.

The event title and description are fixed text, with no visitor text, because Google shows them in the invite to the address typed in. The visitor's own words reach Anton only through step 6. If step 6 fails, the booking still stands: log it and answer success.

Times are computed in `Europe/Stockholm` with `Intl`, so daylight saving must work. 2026-10-25 and 2027-03-28 are the test dates.

Between step 4 and step 5 two people could take the same time. Accept this with a `shortcut:` comment: traffic is low, and Google would show both on the calendar.

## Failure

If Google is down or the token is dead, slots return an error, and the page shows the email address and the contact form instead of an empty calendar. A dead token must log a clear error.

## Tests

- Unit: slot generation (rules, gap, daylight saving, 24-hour and 4-week limits), and POST validation.
- Dist: both pages exist, and no page links to the old Google URL.
- By hand on production: one real booking, and check invite, Meet link and the mail to Anton.

## What Anton must do

1. Create a Google Cloud project with the Calendar API on, and an OAuth client. Set the app to "In production".
2. Sign in once to approve access, so the refresh token can be stored as a secret.
3. Approve the Turnstile widget and the `wrangler secret put` calls, if Claude cannot do them.

## Left to the builder

File layout under `worker/`, caching of slots, exact copy (run it through the human-writing skill), and the week view's empty and loading states. The approved mockup is `.superpowers/brainstorm/86196-1793570094/content/layout.html`, option B.
