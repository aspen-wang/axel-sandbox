# Axel Chat — Design Criteria

## Core Concept

Axel is **not a chat log**. Unlike traditional LLM interfaces that append messages into a growing scroll, Axel **replaces context** at each step. The user always sees the most relevant information — never a scrollback.

---

## Three-Zone Layout

The screen is divided into three persistent zones. Each zone has a clear owner and purpose.

### 1. Stage (Top)

- **Owner:** System
- **Content:** Navigation header, status indicator, trip context summary
- **Behavior:** Stays stable across all states. Axel never modifies this zone.
- **Purpose:** Orientation — the user always knows where they are and what has been confirmed
- **Example:** "New trip plan" header, back button, "Axel is working" status, "Flight confirmed: United SEA -> SFO, Apr 15-18"

### 2. AI Automation (Middle)

- **Owner:** Axel
- **Content:** Axel label + natural language message + deal cards / options
- **Behavior:** **Replaces entirely** when the context changes. Searching flights -> showing flights -> picking hotel -> showing summary are all different states of this single zone — not stacked messages.
- **Purpose:** Present the current task with Axel's insight and actionable cards
- **Key rules:**
  - Axel speaks in 1-2 sentences above the cards — short, opinionated, helpful
  - Cards are first-class embedded UI (FlightDealCard, HotelDealCard, etc.) — not formatted text
  - The entire zone swaps when moving between steps (flights -> hotels -> summary)
  - No message history accumulates — only the current state is visible
  - Scrollable if the card list is long, but the zone itself stays bounded

### 3. Manual (Bottom)

- **Owner:** User
- **Content:** Quick action pills + text input
- **Behavior:** Always anchored at the bottom. Quick actions update contextually per state.
- **Purpose:** Give users control without typing — and a fallback text input for freeform requests
- **Key rules:**
  - Quick action pills are **blue** (user-interactive, per design system rule)
  - Pills change per context: "Cheapest first" / "Nonstop only" for flights, "Under $200" / "Near venue" for hotels, "Book now" / "Change flight" for summary
  - Text input is always present — users can override Axel at any point
  - This zone never scrolls off screen

---

## Why Not a Chat Log?

| Chat Log (LLM pattern) | Axel (Contextual pattern) |
|---|---|
| Messages stack up endlessly | Context replaces in place |
| User scrolls to find previous info | Current state always visible |
| AI responses are formatted text | Cards are native UI components |
| Input buried under long history | Input always anchored at bottom |
| History provides context | Stage zone provides context |

---

## State Transitions

The AI Automation zone transitions between states. Each state fully replaces the previous one.

```
trip-input -> axel-searching -> flight-results -> flight-selected
                                                      |
                                              axel-searching -> hotel-results -> hotel-selected
                                                                                      |
                                                                                  itinerary -> payment -> confirmation
```

At each transition:
- The Axel message updates to describe the new context
- The card list replaces with the relevant content type
- The quick action pills update to match the new state
- The Stage may update its context line (e.g., adding "Flight confirmed: ...")

---

## Axel Voice in AI Automation Zone

Axel speaks briefly and with opinion — not generic AI responses.

- **Good:** "Lots of nonstops to choose from — all about 2h15m. The morning ones are the sweet spot for a business trip."
- **Bad:** "Here are the available flights from SEA to LAX. Please select one."
- **Good:** "Found some great options near your meeting area:"
- **Bad:** "I found 12 hotels matching your criteria. Here they are sorted by price."

Axel is a concierge, not a search engine.

---

## Spacing & Layout Rules

- Stage: fixed height, does not scroll
- AI Automation: flexible height, scrollable when content overflows
- Manual: fixed at bottom, never pushed off screen by AI content
- Minimum 16px gap between zones
- Cards follow existing card component spacing (see DESIGN_SYSTEM.md)
- Quick action pills: 8px gap between, 12px horizontal padding, 6px vertical padding
