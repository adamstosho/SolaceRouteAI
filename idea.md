# SolaceRouteAI — Complete Figma Make Prompt & PRD
### BU7083 Smart Tourism and Digital Transformation | Part 2 Portfolio Asset

---

## HOW TO USE THIS DOCUMENT

1. Open Figma → click **"Use Figma Make"** (or open a new Figma file and activate the Make plugin)
2. Paste the entire contents of the **FIGMA MAKE PROMPT** section (Section 6) into the Figma Make prompt box
3. Figma Make will generate the full prototype automatically
4. Review each screen against the PRD checklist in Section 5
5. Share the prototype link for your poster

---

# SECTION 1 — PRODUCT OVERVIEW

## Product Name
**SolaceRouteAI**

## Tagline
*"Smart travel. Less crowds. Better experiences."*

## One-Line Summary
SolaceRouteAI is an AI-powered itinerary planner that dynamically disperses tourists across a region by personalising travel routes based on real-time crowd density data and individual user preferences.

## Problem Statement
Overtourism — where visitor volumes surpass a destination's sustainable limits — is one of the most critical challenges facing the global tourism and hospitality industry. Iconic destinations such as Venice, Barcelona, and Machu Picchu suffer chronic overcrowding that degrades visitor experiences, harms local communities, and damages natural and cultural heritage. Existing solutions (regulatory caps, IoT monitoring, awareness campaigns) are fragmented: data stays with officials, tourists receive no personalised guidance, and there is no closed-loop system linking crowd intelligence directly to individual visitor decision-making. SolaceRouteAI fills this gap.

## Core Value Proposition
- **For tourists:** Personalised, real-time itineraries that actively route them away from overcrowded sites toward hidden gems — improving their experience while reducing their impact.
- **For DMOs:** Anonymised, aggregated demand data and a direct communication channel to visitors during congestion peaks.
- **For local communities:** Increased economic distribution as visitors are guided toward community-run and lesser-known attractions.

---

# SECTION 2 — DESIGN SYSTEM

## 2.1 Colour Palette

### Primary Brand Colours
| Token | Hex | Usage |
|---|---|---|
| `--solace-green-600` | `#1D9E75` | Primary CTA buttons, active states, confirmed routes |
| `--solace-green-100` | `#E1F5EE` | Backgrounds, success states, low-crowd indicators |
| `--solace-green-800` | `#085041` | Dark text on green backgrounds |

### Secondary Colours
| Token | Hex | Usage |
|---|---|---|
| `--solace-teal-500` | `#0F6E56` | Secondary buttons, headers, navigation active |
| `--solace-navy-900` | `#0D1B2A` | Primary text, headings |
| `--solace-navy-600` | `#1B3A5C` | Secondary text |

### Semantic / Status Colours
| Token | Hex | Usage |
|---|---|---|
| `--crowd-low` | `#1D9E75` | Green — crowd level: low (safe to visit) |
| `--crowd-moderate` | `#EF9F27` | Amber — crowd level: moderate (some wait) |
| `--crowd-high` | `#E24B4A` | Red — crowd level: high / at capacity |
| `--crowd-unknown` | `#B4B2A9` | Grey — no data |

### Neutral Colours
| Token | Hex | Usage |
|---|---|---|
| `--neutral-50` | `#F8FAFB` | App background |
| `--neutral-100` | `#F1F3F4` | Card backgrounds, input fields |
| `--neutral-200` | `#E2E5E9` | Dividers, borders |
| `--neutral-400` | `#9CA3AF` | Placeholder text, disabled states |
| `--neutral-700` | `#374151` | Body text |
| `--white` | `#FFFFFF` | Cards, modals, screen backgrounds |

## 2.2 Typography

### Font Family
**Primary:** Inter (Google Fonts — free)
**Fallback:** SF Pro Display (iOS), Roboto (Android)

### Type Scale
| Style | Font | Size | Weight | Line Height | Usage |
|---|---|---|---|---|---|
| `heading-xl` | Inter | 28px | 700 | 34px | Screen titles (welcome, major headings) |
| `heading-lg` | Inter | 22px | 700 | 28px | Section headings |
| `heading-md` | Inter | 18px | 600 | 24px | Card titles, attraction names |
| `heading-sm` | Inter | 16px | 600 | 22px | Sub-section labels |
| `body-lg` | Inter | 16px | 400 | 24px | Primary body text |
| `body-md` | Inter | 14px | 400 | 21px | Secondary body, descriptions |
| `body-sm` | Inter | 12px | 400 | 18px | Captions, metadata, timestamps |
| `label` | Inter | 13px | 500 | 18px | Input labels, tags, badges |
| `button` | Inter | 16px | 600 | 20px | All button text |
| `cta-sm` | Inter | 14px | 600 | 18px | Small buttons, chips |

## 2.3 Spacing System
Uses an 8px base grid.
- `4px` — micro spacing (icon gap, badge padding)
- `8px` — xs (tight element spacing)
- `12px` — sm (input padding vertical)
- `16px` — md (card padding, section gap)
- `20px` — lg (between major elements)
- `24px` — xl (screen horizontal padding)
- `32px` — 2xl (section separation)
- `48px` — 3xl (major section breaks)

## 2.4 Border Radius
| Token | Value | Usage |
|---|---|---|
| `radius-sm` | 8px | Input fields, small chips |
| `radius-md` | 12px | Cards, buttons |
| `radius-lg` | 16px | Bottom sheets, modals |
| `radius-xl` | 24px | Large cards, map overlays |
| `radius-full` | 999px | Pills, badges, avatar circles |

## 2.5 Shadows
| Token | Value | Usage |
|---|---|---|
| `shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` | Input fields, small cards |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.10)` | Cards, dropdowns |
| `shadow-lg` | `0 8px 24px rgba(0,0,0,0.12)` | Modals, bottom sheets |
| `shadow-map` | `0 2px 8px rgba(0,0,0,0.15)` | Map overlay elements |

## 2.6 Iconography
Use **Phosphor Icons** (free, available in Figma Community). Style: Regular weight. Size: 24px default, 20px in compact contexts, 32px for featured icons.

Key icons used:
- `MapPin` — location / attraction
- `NavigationArrow` — routing / directions
- `Users` — crowd level
- `Clock` — timing / duration
- `Leaf` — eco / sustainability
- `Star` — rating / feedback
- `Bell` — alerts / notifications
- `ArrowsClockwise` — re-route / refresh
- `ThumbsUp` / `ThumbsDown` — feedback
- `Sliders` — preferences / filters
- `Lightning` — AI suggestion
- `ShieldCheck` — privacy / safety
- `Globe` — multilingual

## 2.7 Component Library

### Buttons
**Primary Button:**
- Background: `--solace-green-600`
- Text: `#FFFFFF`, `button` style
- Padding: 16px vertical, 24px horizontal
- Border radius: `radius-md`
- Height: 52px
- State — hover: darken 8%; pressed: darken 15%; disabled: `--neutral-200` bg, `--neutral-400` text

**Secondary Button:**
- Background: `--white`
- Border: 1.5px `--solace-green-600`
- Text: `--solace-green-600`, `button` style
- Same sizing as primary

**Ghost Button:**
- Background: transparent
- Text: `--neutral-700`, `button` style
- No border
- Used for cancel / dismiss actions

**Chip / Tag Button:**
- Background: `--neutral-100` (unselected) / `--solace-green-100` (selected)
- Border: 1px `--neutral-200` (unselected) / 1px `--solace-green-600` (selected)
- Text: `--neutral-700` (unselected) / `--solace-green-800` (selected)
- Padding: 8px 14px
- Border radius: `radius-full`
- Height: 36px

### Crowd Level Badge
Pill-shaped badge showing crowd status:
- **Low:** background `--solace-green-100`, text `--solace-green-800`, dot `--crowd-low`
- **Moderate:** background `#FAEEDA`, text `#633806`, dot `--crowd-moderate`
- **High:** background `#FCEBEB`, text `#791F1F`, dot `--crowd-high`
- Padding: 4px 10px, border-radius: `radius-full`
- Text: `label` style
- Leading coloured dot: 8px circle

### Attraction Card
- Background: `--white`
- Border radius: `radius-lg`
- Shadow: `shadow-md`
- Padding: 16px
- Structure (top to bottom):
  1. Attraction image (full width, height 140px, border-radius top only 16px)
  2. Attraction name (`heading-md`)
  3. Category tag chip
  4. Crowd badge (right-aligned, same row as category)
  5. "Best visit time" row with clock icon
  6. Short AI reason note in green italics (`body-sm`, `--solace-green-600`)

### Itinerary Timeline Item
- Left: vertical green line with time dot (12px circle, `--solace-green-600`)
- Right: content card with attraction name, time slot, duration, crowd badge
- Divider: dashed line between items
- "AI suggests" note in teal below attraction name

### Bottom Navigation Bar
- Background: `--white`
- Border top: 1px `--neutral-200`
- Height: 80px (including safe area)
- 4 tabs: Home (MapPin), Explore (Compass), My Route (NavigationArrow), Profile (UserCircle)
- Active tab: icon and label in `--solace-green-600`
- Inactive: `--neutral-400`

### Top App Bar
- Background: `--white`
- Height: 56px
- Left: back arrow (where applicable)
- Centre: screen title (`heading-sm`)
- Right: contextual icon (filter, share, etc.)
- Bottom border: 1px `--neutral-200`

### Status Bar (top of phone)
- Time left, signal/battery right
- Dark text on white background
- Height: 44px

---

# SECTION 3 — USER PERSONAS

## Persona 1 — Maria, the Cultural Explorer
- Age: 34, Spanish teacher from Germany
- Travelling solo to Barcelona for 5 days
- Frustrated by tourist crowds at Sagrada Família; wants authentic local experiences
- Comfortable with apps; uses Google Maps daily
- Goal: discover hidden gems, avoid queues, feel like a local

## Persona 2 — James, the Family Traveller
- Age: 42, father of two (ages 8 and 11), visiting Venice
- Worried about crowds and children's safety
- Needs accessible routes and real-time guidance
- Goal: stress-free, enjoyable family experience without wasting time in queues

## Persona 3 — Aisha, the Eco-Conscious Millennial
- Age: 27, digital nomad, visiting Machu Picchu
- Deeply concerned about her environmental impact
- Wants to know her choices help local communities
- Goal: sustainable travel, support local businesses, minimal footprint

---

# SECTION 4 — USER STORIES (for prototype scope)

| ID | As a... | I want to... | So that... |
|---|---|---|---|
| US01 | Tourist | See the app's value proposition clearly on launch | I know immediately whether this app is for me |
| US02 | Tourist | Input my destination, dates, and interests | The app can personalise my experience |
| US03 | Tourist | See a live crowd heatmap of my destination | I can make informed choices about where to go |
| US04 | Tourist | Receive a personalised day itinerary | I don't waste time planning and can avoid crowds |
| US05 | Tourist | Get an alert when my planned site is at capacity | I can adjust my plans in real time |
| US06 | Tourist | Accept a re-routed alternative with one tap | Re-routing is effortless and not frustrating |
| US07 | Tourist | Rate my experience after visiting a site | I can help the app learn my preferences |
| US08 | Tourist | See why the app made each suggestion | I trust the AI's decisions |
| US09 | DMO (future) | Access anonymised crowd flow data | I can make better destination management decisions |

---

# SECTION 5 — PRD: SCREEN-BY-SCREEN SPECIFICATIONS

## Frame Size
**390 × 844px** (iPhone 14 standard — industry default for mobile prototype)

All 8 screens use this frame size. The prototype is a mobile app.

---

## SCREEN 1 — Splash / Welcome Screen

**Purpose:** First impression. Establish brand identity and value proposition. Trigger onboarding.

**Layout (top to bottom):**
1. Status bar (44px, dark text)
2. Full-screen illustration zone (300px tall): abstract green wavy map-line pattern suggesting routes and destinations. Background: `--solace-green-600`. Illustration uses white line-art of a simplified map with dotted route paths and pin markers.
3. App logo: "SolaceRouteAI" in `heading-xl`, white, centred. Below it: leaf icon (Phosphor, 24px, white).
4. Tagline: *"Smart travel. Less crowds. Better experiences."* in `body-lg`, white, centred, opacity 90%.
5. White rounded card (bottom sheet style, border-radius 24px top only, fills bottom 360px of screen):
   - Heading: "Travel smarter, not harder" in `heading-lg`, `--solace-navy-900`
   - Body: "SolaceRouteAI uses live crowd data and AI to guide you to the right place at the right time — protecting destinations and enhancing your journey." in `body-md`, `--neutral-700`
   - Primary button: "Get started" full width
   - Ghost button below: "Sign in" in `--solace-teal-500`
6. Privacy note at bottom: "Your data is anonymised and never sold." with ShieldCheck icon, `body-sm`, `--neutral-400`

**Prototype link:** Tapping "Get started" → Screen 2

---

## SCREEN 2 — Preferences & Trip Setup

**Purpose:** Collect user destination, dates, interests and mobility needs. This is the AI's input layer. Demonstrates decision logic input.

**Layout (top to bottom):**
1. Status bar
2. Top app bar: back arrow left, title "Set up your trip" centre
3. Progress indicator: 3 dots — dot 1 filled green, dots 2 and 3 empty. Label "Step 1 of 3" in `body-sm`
4. Section — Destination:
   - Label: "Where are you going?" (`label`, `--neutral-700`)
   - Input field: placeholder "Search destination…" with MapPin icon left. Background `--neutral-100`, border 1px `--neutral-200`, radius `radius-sm`. On the design show it pre-filled with "Barcelona, Spain" as a selected state (border `--solace-green-600`, tick icon right)
5. Section — Travel Dates:
   - Label: "When are you travelling?" (`label`)
   - Two side-by-side date inputs: "Arrival" (showing 12 Apr 2026) and "Departure" (showing 16 Apr 2026). Each has a Calendar icon. Background `--neutral-100`, radius `radius-sm`
6. Section — Your Interests:
   - Label: "What do you enjoy?" (`label`)
   - Subtext: "Select all that apply" (`body-sm`, `--neutral-400`)
   - Grid of 8 chip buttons (2 rows of 4): "Culture", "Nature", "Food & Drink", "Heritage", "Art", "Architecture", "Markets", "Hidden Gems"
   - Show "Culture", "Heritage", "Hidden Gems" as selected (green chip style)
7. Section — Mobility:
   - Label: "Any accessibility needs?" (`label`)
   - Toggle row: "Wheelchair accessible routes only" — toggle switch (off by default, green when on)
8. Primary button: "Find my routes →" full width, pinned above bottom nav
9. Bottom navigation bar

**Prototype link:** Tapping "Find my routes →" → Screen 3

---

## SCREEN 3 — Live Crowd Heatmap

**Purpose:** Show real-time crowd density across the destination. This is the data intelligence layer — the visual centrepiece of the app.

**Layout (top to bottom):**
1. Status bar
2. Top app bar: hamburger menu left, title "Barcelona — Live crowds" centre, Filter icon right (Sliders icon)
3. Map zone (full width, height 380px):
   - Background: light grey map tiles suggesting a simplified city grid (use neutral rectangles for blocks, thin lines for streets — do not use a real map image)
   - 6 attraction pins on the map, each a teardrop pin shape:
     - "Sagrada Família" — RED pin (at capacity) — position upper-centre of map
     - "Park Güell" — AMBER pin (moderate) — position upper-right
     - "Gothic Quarter" — GREEN pin (low) — position centre-left
     - "Picasso Museum" — RED pin (at capacity) — position centre
     - "La Barceloneta Beach" — AMBER pin (moderate) — position lower-right
     - "Montjuïc Castle" — GREEN pin (low) — position lower-left
   - Each pin has a small white label below it showing the attraction name in `body-sm`
   - "Live data" pill badge top-right of map: green dot + "Updated 2 min ago" in `label` style, white background, shadow
   - Map attribution line bottom of map: "Crowd data: SolaceRouteAI · IoT sensors + booking data" in `body-sm`, neutral
4. Legend strip (horizontal, full width, 40px height, white background):
   - Three items: green dot "Low" | amber dot "Moderate" | red dot "At capacity"
   - `body-sm` text, evenly spaced
5. Scrollable attraction list below map (3 visible cards):
   - Each card: attraction name (`heading-sm`), crowd badge (right), "Best time: 4–6pm" note, "AI suggests visiting now / later" note in green italic
   - Cards shown: Gothic Quarter (LOW badge — "Visit now"), Park Güell (MODERATE — "Best after 3pm"), Sagrada Família (HIGH — "Avoid until 5pm")
6. Primary button (floating above bottom nav, full width): "Build my itinerary →"
7. Bottom navigation bar (Explore tab active)

**Prototype link:** Tapping "Build my itinerary →" → Screen 4

---

## SCREEN 4 — Smart Itinerary Output

**Purpose:** Display the AI-generated personalised day plan. This is the core output — showing differentiated, reasoned suggestions for each step of the day.

**Layout (top to bottom):**
1. Status bar
2. Top app bar: back arrow left, title "Your itinerary — Day 1" centre, Share icon right
3. Date strip: "Tuesday, 12 April 2026 · Barcelona" in `body-sm`, `--neutral-400`, centred
4. AI summary card (full width, background `--solace-green-100`, border-radius `radius-md`, padding 16px):
   - Lightning icon (green, 20px) left
   - Text: "AI optimised your route based on live crowd data. Estimated wait time saved: 2h 20min." in `body-md`, `--solace-green-800`
5. Timeline (vertical, scrollable, 4 itinerary items):

   **Item 1 — 9:00 AM:**
   - Time dot: green circle on vertical line
   - Attraction: "Gothic Quarter" (`heading-sm`)
   - Chip: "Heritage" tag
   - Crowd badge: LOW (green)
   - Duration: "Approx. 2 hours"
   - AI reason note (italics, green): *"Quietest in the morning — only 18% capacity right now."*
   - Divider (dashed)

   **Item 2 — 11:30 AM:**
   - Attraction: "Picasso Museum" (`heading-sm`)
   - Chip: "Art" tag
   - Crowd badge: MODERATE (amber)
   - Duration: "Approx. 1.5 hours"
   - AI reason note: *"Crowds reduce mid-morning. Pre-booked ticket recommended."*
   - Divider (dashed)

   **Item 3 — 1:30 PM:**
   - Attraction: "La Boqueria Market — side entrance" (`heading-sm`)
   - Chip: "Food & Drink" tag
   - Crowd badge: LOW (green)
   - Duration: "Approx. 1 hour"
   - AI reason note: *"Local tip: side entrance has 40% less congestion than main entrance."*
   - Divider (dashed)

   **Item 4 — 3:30 PM:**
   - Attraction: "Park Güell (free zone)" (`heading-sm`)
   - Chip: "Nature" tag
   - Crowd badge: LOW (green)
   - Duration: "Approx. 1.5 hours"
   - AI reason note: *"Sagrada Família is at capacity — Park Güell is a stunning alternative nearby."*

6. Floating bottom bar (white, shadow-lg):
   - Left: "Re-generate" ghost button (ArrowsClockwise icon)
   - Right: Primary button "Start my day →"
7. Bottom navigation bar (My Route tab active)

**Prototype link:** Tapping "Start my day →" → Screen 5. Tapping "Re-generate" → stays on Screen 4 (static, no change needed for prototype).

---

## SCREEN 5 — Overcrowding Alert

**Purpose:** Simulate a real-time push notification and in-app alert when a planned site reaches capacity. Demonstrate adaptive, responsive AI behaviour.

**Layout (top to bottom):**
1. Status bar
2. Top app bar: back arrow, title "Live alert"
3. Alert banner (full width, background `#FCEBEB`, border-left 4px `--crowd-high`, padding 16px, radius `radius-md`):
   - Bell icon (red, 24px) top-left
   - Heading: "Capacity reached" (`heading-md`, `#791F1F`)
   - Body: "Sagrada Família has reached maximum visitor capacity. Entry is currently suspended." (`body-md`, `--neutral-700`)
   - Timestamp: "Detected 3 minutes ago" (`body-sm`, `--neutral-400`)
4. Current plan card (white card, shadow-md):
   - Label: "Your original plan" (`label`, `--neutral-400`)
   - Crossed-out item: "Sagrada Família — 2:00 PM" with red strikethrough text
5. Section heading: "SolaceRouteAI suggests" (`heading-sm`, `--solace-green-600`) with Lightning icon
6. Alternative attraction card (white card, shadow-md, green left border 3px):
   - Attraction image placeholder (top, 120px, rounded top corners)
   - Name: "Casa Batlló" (`heading-md`)
   - Crowd badge: LOW (green)
   - Distance: "0.4 km from your current location" with MapPin icon
   - AI reason: *"Designed by the same architect as Sagrada Família — equally stunning, currently only 22% capacity."* (`body-sm`, italic, `--solace-green-600`)
   - Rating: 4.8 stars (5 star row, filled amber)
7. Two buttons:
   - Primary: "Accept new route →" (full width, green)
   - Secondary: "See other options" (full width, outlined)
8. Bottom navigation bar

**Prototype link:** Tapping "Accept new route →" → Screen 6. Tapping "See other options" → Screen 3 (heatmap, so user can browse).

---

## SCREEN 6 — Feedback & Learning

**Purpose:** Collect post-visit feedback to close the data loop. Show that the system learns. Reinforce the ethical data use narrative.

**Layout (top to bottom):**
1. Status bar
2. Top app bar: title "How was your visit?" centre (no back arrow — end of flow)
3. Completion celebration strip: light green background, white tick circle (40px), "Visit complete!" heading (`heading-md`), "Gothic Quarter · 9:00 – 11:05 AM" subtext (`body-sm`)
4. Rating section:
   - Label: "Rate your experience" (`heading-sm`)
   - 5-star row (large stars, 36px each, filled amber to match rating). Show 4 stars filled.
   - Subtext: "Tap to rate" (`body-sm`, `--neutral-400`)
5. Crowd match section:
   - Label: "How accurate was our crowd prediction?" (`label`)
   - Three chip buttons: "Spot on", "Slightly off", "Very wrong" — show "Spot on" selected (green)
6. Quick feedback:
   - Label: "What did you enjoy?" (`label`)
   - 4 chip options: "No queues", "Discovered something new", "Easy navigation", "Felt safe" — show "No queues" and "Discovered something new" selected
7. Optional text note:
   - Label: "Anything else?" (`label`)
   - Multi-line text input, placeholder "Tell us more (optional)…" background `--neutral-100`
8. Privacy note: ShieldCheck icon + "Your feedback is anonymised and helps improve routes for all travellers." (`body-sm`, `--neutral-400`)
9. Primary button: "Submit feedback" full width (green)
10. Ghost button below: "Skip for now"
11. Bottom navigation bar

**Prototype link:** Tapping "Submit feedback" → Screen 7 (Thank you / completion screen)

---

## SCREEN 7 — Thank You & Next Steps

**Purpose:** Confirm feedback received. Show the data loop closing. Encourage continued use. This is the final screen of the core flow.

**Layout (top to bottom):**
1. Status bar
2. Centred illustration zone (200px): large green circle with white checkmark (60px) — clean, minimal celebration
3. Heading: "Thank you, Maria!" (`heading-xl`, centred, `--solace-navy-900`)
4. Body: "Your feedback helps SolaceRouteAI improve routes for thousands of travellers. Together we make tourism more sustainable." (`body-lg`, centred, `--neutral-700`, max-width 300px)
5. Stats card (green background, `--solace-green-100`, radius `radius-lg`, padding 20px):
   - Heading: "Your impact today" (`heading-sm`, `--solace-green-800`)
   - Three stat rows with icons:
     - Users icon: "~340 tourists redirected from Sagrada Família today"
     - Leaf icon: "You visited 2 community-recommended sites"
     - Clock icon: "Estimated 2h 20min of queuing avoided"
   - All `body-md`, `--solace-green-800`
6. Section: "Up next on your trip"
   - Horizontal scroll row of 2 attraction preview cards for tomorrow
7. Primary button: "Plan tomorrow →" full width
8. Ghost button: "Back to map"
9. Bottom navigation bar (Home tab active)

**Prototype link:** "Plan tomorrow →" → Screen 2 (loops back to trip setup for next day). "Back to map" → Screen 3.

---

## SCREEN 8 — DMO Dashboard Preview (Bonus Screen)

**Purpose:** Show the B2B / DMO-facing side of SolaceRouteAI. Demonstrates the two-way data flow and business model. Excellent for the appendix visual evidence.

**Layout (top to bottom):**
1. Status bar
2. Top app bar: title "DMO Dashboard — Barcelona" with a small "BETA" badge right
3. Summary metric strip (horizontal, 4 cards):
   - "Active visitors today: 48,200"
   - "Sites at capacity: 3"
   - "Routes re-optimised: 1,240"
   - "Avg. crowd satisfaction: 4.2/5"
   - Each card: white bg, `heading-md` number, `body-sm` label, shadow-sm
4. Simplified heatmap (same as Screen 3 but smaller — 200px height)
5. Alert log (2 items):
   - "14:32 — Sagrada Família reached capacity. 340 tourists re-routed."
   - "13:15 — Park Güell moderate. Advisory sent to 180 users."
   - Each item: Bell icon, text, timestamp. Divider between.
6. Section: "Recommended DMO actions"
   - Two action cards: "Open Parc de la Ciutadella overflow zone" (primary button: "Activate") and "Push notification to users near Gràcia district" (button: "Send alert")
7. Bottom navigation (Dashboard tab active, different nav from tourist view)

---

# SECTION 6 — FIGMA MAKE PROMPT

**PASTE EVERYTHING BELOW THIS LINE INTO FIGMA MAKE:**

---

Create a complete, high-fidelity mobile app prototype for **SolaceRouteAI** — an AI-powered smart tourism app that uses real-time crowd data to personalise tourist itineraries and reduce overtourism at destinations like Barcelona, Venice, and Machu Picchu.

## Design System to apply throughout every screen:

**Frame size:** 390 × 844px (iPhone 14) for all screens.

**Colours:**
- Primary green: #1D9E75 (buttons, active states, low-crowd indicators)
- Primary green light: #E1F5EE (backgrounds, cards, success states)
- Primary green dark: #085041 (text on green backgrounds)
- Teal accent: #0F6E56 (secondary buttons, headers)
- Navy text: #0D1B2A (primary headings)
- Body text: #374151
- Muted text: #9CA3AF
- App background: #F8FAFB
- White: #FFFFFF (cards, modals)
- Crowd low (green): #1D9E75
- Crowd moderate (amber): #EF9F27
- Crowd high (red): #E24B4A
- Dividers: #E2E5E9
- Input background: #F1F3F4

**Typography (Inter font throughout):**
- Screen headings: 28px, weight 700
- Section headings: 22px, weight 700
- Card titles: 18px, weight 600
- Body text: 16px, weight 400
- Small body: 14px, weight 400
- Captions: 12px, weight 400
- Labels/chips: 13px, weight 500
- Buttons: 16px, weight 600

**Components to reuse across screens:**
- Status bar: 44px tall, dark text, time left, signal/battery right
- Top app bar: 56px, white background, 1px bottom border #E2E5E9, title centred in 18px weight 600
- Bottom navigation bar: 80px, white, 1px top border #E2E5E9, 4 tabs (Home, Explore, My Route, Profile), active tab in #1D9E75, inactive in #9CA3AF
- Crowd badge pill: coloured background pill with 8px coloured dot + text. Low = green bg #E1F5EE, text #085041. Moderate = amber bg #FAEEDA, text #633806. High = red bg #FCEBEB, text #791F1F.
- Primary button: full width, height 52px, background #1D9E75, white text 16px weight 600, border-radius 12px
- Card: white background, border-radius 16px, shadow 0 4px 12px rgba(0,0,0,0.10), padding 16px

---

## SCREEN 1 — Welcome / Splash Screen

Create a mobile welcome screen for SolaceRouteAI.

Top half (300px): solid background in #1D9E75 (primary green). On this background place a white abstract illustration of a simplified city map with dotted route lines and teardrop map pin markers — minimal, line-art style. Centred at the top of this zone: app name "SolaceRouteAI" in 28px white bold Inter. Below it a small leaf icon in white. Below that: tagline "Smart travel. Less crowds. Better experiences." in 16px white, opacity 90%, centred.

Bottom half: white rounded card that covers the bottom 360px of the screen, with border-radius 24px on the top-left and top-right corners only. Inside this card from top to bottom:
- Heading: "Travel smarter, not harder" in 22px weight 700, #0D1B2A
- Body paragraph: "SolaceRouteAI uses live crowd data and AI to guide you to the right place at the right time — protecting destinations and enhancing your journey." in 16px weight 400, #374151, line-height 24px
- Gap of 24px
- Full-width primary button "Get started" (height 52px, #1D9E75, white text)
- Gap of 12px
- Ghost button "Sign in" centred, text #0F6E56, no background, no border
- Gap of 20px
- Small row at very bottom: ShieldCheck icon (16px, #9CA3AF) + text "Your data is anonymised and never sold." in 12px #9CA3AF

Add status bar at the very top.

Connect: "Get started" button → Screen 2

---

## SCREEN 2 — Preferences & Trip Setup

Create a mobile preferences screen for SolaceRouteAI.

Include status bar at top. Top app bar with back arrow icon on left, title "Set up your trip" centred. Below app bar: progress dots row — 3 dots horizontally centred, first dot filled #1D9E75 (12px circle), second and third dots empty/outline. Label "Step 1 of 3" in 12px #9CA3AF below the dots.

Scrollable content area (24px horizontal padding throughout):

Section 1 — Destination (margin-top 24px):
- Label "Where are you going?" in 13px weight 500 #374151
- Input field below (full width, height 52px, background #F1F3F4, border-radius 8px, border 1.5px #1D9E75 — showing selected state): MapPin icon (#1D9E75, 20px) on left inside field, text "Barcelona, Spain" in 16px #0D1B2A, green checkmark icon on right

Section 2 — Dates (margin-top 20px):
- Label "When are you travelling?" in 13px weight 500 #374151
- Two side-by-side date boxes (equal width, 8px gap between): Left box labelled "Arrival" showing "12 Apr 2026" with calendar icon. Right box labelled "Departure" showing "16 Apr 2026" with calendar icon. Each box: height 64px, background #F1F3F4, border-radius 8px, label in 11px #9CA3AF, date in 16px weight 600 #0D1B2A

Section 3 — Interests (margin-top 20px):
- Label "What do you enjoy?" in 13px weight 500 #374151
- Sub-label "Select all that apply" in 12px #9CA3AF
- Wrap grid of 8 chip buttons with 8px gap: "Culture" (selected — green), "Nature" (unselected), "Food & Drink" (unselected), "Heritage" (selected — green), "Art" (unselected), "Architecture" (unselected), "Markets" (unselected), "Hidden Gems" (selected — green). Selected chip: background #E1F5EE, border 1px #1D9E75, text #085041, 13px weight 500. Unselected: background #F1F3F4, border 1px #E2E5E9, text #374151.

Section 4 — Accessibility (margin-top 20px):
- Label "Any accessibility needs?" in 13px weight 500 #374151
- Row: text "Wheelchair accessible routes only" in 14px #374151, toggle switch on right (off state — grey)

Bottom (fixed, above bottom nav): full-width primary button "Find my routes →" height 52px.

Add bottom navigation bar (Explore tab active).

Connect: "Find my routes →" → Screen 3

---

## SCREEN 3 — Live Crowd Heatmap

Create a mobile live crowd heatmap screen for SolaceRouteAI.

Status bar at top. Top app bar: hamburger menu icon on left, title "Barcelona — Live crowds" centred, filter/sliders icon on right.

Map area (full width, height 380px, background #E8EEF2 representing simplified city map): Draw a simplified abstract city grid using light grey rectangles (#D3D9DE) for city blocks and thin white lines for streets. This is a schematic map, not a real map image. On this map place 6 teardrop-shaped map pins:

Pin 1 — "Sagrada Família": position upper-centre of map. Pin fill #E24B4A (red). Below pin: small white pill label "Sagrada Família" in 10px.
Pin 2 — "Park Güell": position upper-right. Pin fill #EF9F27 (amber).
Pin 3 — "Gothic Quarter": position centre-left. Pin fill #1D9E75 (green).
Pin 4 — "Picasso Museum": position centre. Pin fill #E24B4A (red).
Pin 5 — "La Barceloneta": position lower-right. Pin fill #EF9F27 (amber).
Pin 6 — "Montjuïc Castle": position lower-left. Pin fill #1D9E75 (green).

In the top-right corner of the map: a floating pill badge (white background, shadow, border-radius 999px, padding 6px 12px): green dot (8px) + "Updated 2 min ago" in 12px #374151.

Below the map — legend strip (full width, height 40px, white background, 1px border top and bottom #E2E5E9, horizontal padding 24px): Three equally spaced items — green circle (8px) "Low" | amber circle "Moderate" | red circle "At capacity". All 13px weight 500.

Below legend — scrollable list of 3 attraction cards (24px horizontal padding, 12px gap between cards):

Card 1 — Gothic Quarter:
- Name "Gothic Quarter" in 18px weight 600 #0D1B2A
- Row: "Heritage" chip tag (unselected style) + LOW crowd badge on right
- Row: clock icon + "Best time: Now — 9am to 12pm" in 14px #374151
- AI note in italic 12px #1D9E75: "Visit now — currently only 18% capacity"

Card 2 — Park Güell:
- Name "Park Güell"
- "Nature" chip + MODERATE badge
- "Best time: After 3pm"
- AI note: "Crowds ease in the late afternoon"

Card 3 — Sagrada Família:
- Name "Sagrada Família"
- "Architecture" chip + HIGH badge
- "Best time: After 5pm today"
- AI note: "Currently at capacity — we'll alert you when it clears"

Floating full-width primary button above bottom nav: "Build my itinerary →"

Bottom navigation bar (Explore tab active).

Connect: "Build my itinerary →" → Screen 4

---

## SCREEN 4 — Smart Itinerary Output

Create a mobile personalised itinerary screen for SolaceRouteAI.

Status bar. Top app bar: back arrow left, "Your itinerary — Day 1" centred, share icon right.

Date strip centred below app bar: "Tuesday, 12 April 2026 · Barcelona" in 12px #9CA3AF.

AI summary banner (full width, 24px horizontal margin, background #E1F5EE, border-radius 12px, padding 14px 16px):
- Row: Lightning icon (#1D9E75, 20px) on left + text "AI optimised your route. Estimated wait time saved: 2h 20min." in 14px weight 500 #085041

Timeline (24px left margin for content, 8px left margin for timeline line):
Vertical green line (#1D9E75, 2px wide) runs the full height of all 4 items. Each item has a filled green circle (12px) on the line at the time dot position.

Item 1:
- Time: "9:00 AM" in 13px weight 600 #1D9E75 (left of card, above the dot)
- Card (white, shadow-md, radius 12px, padding 16px, margin-left 20px):
  - "Gothic Quarter" in 18px weight 600 #0D1B2A
  - Row: "Heritage" chip + LOW badge
  - "Approx. 2 hours" with clock icon, 14px #374151
  - Italic note: "Quietest in the morning — only 18% capacity right now." 12px #1D9E75
- Dashed divider between items

Item 2:
- Time: "11:30 AM"
- Card: "Picasso Museum", "Art" chip, MODERATE badge, "Approx. 1.5 hours", italic note: "Crowds reduce mid-morning. Pre-booked ticket recommended."

Item 3:
- Time: "1:30 PM"
- Card: "La Boqueria — side entrance", "Food & Drink" chip, LOW badge, "Approx. 1 hour", italic note: "Local tip: side entrance has 40% less congestion."

Item 4:
- Time: "3:30 PM"
- Card: "Park Güell (free zone)", "Nature" chip, LOW badge, "Approx. 1.5 hours", italic note: "Sagrada Família is at capacity — Park Güell is a stunning nearby alternative."

Fixed bottom bar (white, shadow-lg, padding 16px 24px): Row with "Re-generate" ghost button (ArrowsClockwise icon, left) and primary button "Start my day →" on right (width 200px).

Bottom navigation bar (My Route tab active).

Connect: "Start my day →" → Screen 5

---

## SCREEN 5 — Overcrowding Alert & Re-route

Create a mobile real-time overcrowding alert screen for SolaceRouteAI.

Status bar. Top app bar: back arrow, "Live alert" centred. No share icon.

Alert banner (full width, 24px horizontal margin, background #FCEBEB, left border 4px solid #E24B4A, border-radius 12px, padding 16px):
- Row: Bell icon (red #E24B4A, 24px) + heading "Capacity reached" in 18px weight 600 #791F1F
- Body: "Sagrada Família has reached maximum visitor capacity. Entry is currently suspended." in 14px #374151
- Timestamp: "Detected 3 minutes ago" in 12px #9CA3AF

Original plan card (white card, margin 16px 24px, padding 16px, radius 12px, shadow-sm):
- Label "Your original plan" in 12px #9CA3AF weight 500
- Row with strikethrough: crossed-out text "Sagrada Família — 2:00 PM" in 16px weight 600, strikethrough line through it, text colour #E24B4A

Section heading (margin 20px 24px 12px): Lightning icon (#1D9E75, 20px) + "SolaceRouteAI suggests" in 16px weight 600 #1D9E75

Alternative card (white card, 24px horizontal margin, padding 0 0 16px 0, radius 16px, shadow-md, left border 3px solid #1D9E75):
- Image placeholder (full width, height 120px, background #D1E8E0, top border-radius 16px, label "Casa Batlló" centred in the image placeholder in white 14px)
- Content below image (padding 0 16px):
  - "Casa Batlló" in 18px weight 600 #0D1B2A
  - Row: LOW badge + "0.4 km away" with MapPin icon in 13px #374151
  - 5-star row: 4 filled amber stars + 1 empty, "4.8" rating text in 14px weight 600
  - Italic note in 12px #1D9E75: "Designed by the same architect — equally stunning, only 22% capacity right now."

Two buttons (24px horizontal margin, 12px gap):
- Primary "Accept new route →" full width
- Secondary outlined "See other options" full width

Bottom navigation bar.

Connect: "Accept new route →" → Screen 6. "See other options" → Screen 3.

---

## SCREEN 6 — Post-Visit Feedback

Create a mobile feedback collection screen for SolaceRouteAI.

Status bar. Top app bar: title "How was your visit?" centred. No back arrow.

Completion strip (full width, background #E1F5EE, padding 20px 24px):
- Row: white circle (40px, background #1D9E75) with white checkmark icon inside + content right side
- Content: "Visit complete!" in 16px weight 600 #085041, below it "Gothic Quarter · 9:00 – 11:05 AM" in 13px #0F6E56

Section — Star rating (margin 24px):
- Label "Rate your experience" in 16px weight 600 #0D1B2A
- 5 large stars (36px each, 8px gap): 4 filled amber (#EF9F27), 1 unfilled (#E2E5E9)
- Sub-label "Tap to change your rating" in 12px #9CA3AF

Section — Crowd accuracy (margin-top 20px):
- Label "How accurate was our crowd prediction?" in 13px weight 500 #374151
- Row of 3 chip buttons: "Spot on" (selected — green), "Slightly off" (unselected), "Very wrong" (unselected)

Section — Quick feedback (margin-top 20px):
- Label "What did you enjoy?" in 13px weight 500 #374151
- Wrap row of chips: "No queues" (selected), "Discovered something new" (selected), "Easy navigation" (unselected), "Felt safe" (unselected)

Section — Text note (margin-top 20px):
- Label "Anything else?" in 13px weight 500 #374151
- Multi-line input field (height 80px, background #F1F3F4, border-radius 8px, padding 12px, placeholder "Tell us more (optional)…" in #9CA3AF)

Privacy row (margin-top 16px): ShieldCheck icon (16px #9CA3AF) + "Your feedback is anonymised and helps improve routes for all travellers." in 12px #9CA3AF

Primary button "Submit feedback" full width.
Ghost button "Skip for now" centred below.

Bottom navigation bar.

Connect: "Submit feedback" → Screen 7.

---

## SCREEN 7 — Thank You & Impact Summary

Create a mobile thank-you and impact screen for SolaceRouteAI.

Status bar. No top app bar on this screen — full content layout.

Centred illustration zone (height 180px, margin-top 40px): large green circle (100px diameter, background #1D9E75) centred horizontally, white checkmark icon inside (48px). Below the circle: "Thank you, Maria!" in 28px weight 700 #0D1B2A, centred. Below that: "Your feedback helps SolaceRouteAI improve routes for thousands of travellers. Together we make tourism more sustainable." in 16px #374151, centred, max-width 300px, line-height 24px.

Impact card (24px horizontal margin, background #E1F5EE, border-radius 16px, padding 20px, margin-top 24px):
- Heading "Your impact today" in 16px weight 600 #085041
- Three rows (16px gap between), each with icon left + text right:
  - Row 1: Users icon (#1D9E75, 20px) + "~340 tourists redirected from Sagrada Família today" in 14px #085041
  - Row 2: Leaf icon (#1D9E75, 20px) + "You visited 2 community-recommended sites" in 14px #085041
  - Row 3: Clock icon (#1D9E75, 20px) + "Estimated 2h 20min of queuing avoided" in 14px #085041

Section heading (margin-top 28px, 24px horizontal): "Up next on your trip" in 16px weight 600 #0D1B2A.

Horizontal scroll area (single row, 2 small preview cards visible, 24px left padding): Each card (width 160px, white, radius 12px, shadow-sm): image placeholder 100px tall, attraction name in 14px weight 600, tomorrow's date label in 12px #9CA3AF.

Primary button "Plan tomorrow →" full width (24px margin).
Ghost button "Back to map" centred below.

Bottom navigation bar (Home tab active).

Connect: "Plan tomorrow →" → Screen 2. "Back to map" → Screen 3.

---

## SCREEN 8 — DMO Dashboard (Bonus)

Create a mobile DMO (Destination Management Organisation) dashboard screen for SolaceRouteAI.

Status bar with dark text. Top app bar: title "DMO Dashboard — Barcelona" centred, small "BETA" badge (green pill, 11px) to its right.

Metric strip (horizontal scroll, 24px left padding, 12px gap, each card width 140px):
Card style: white background, shadow-sm, radius 12px, padding 12px.
4 cards:
- "48,200" in 22px weight 700 #0D1B2A, label "Active visitors today" in 12px #9CA3AF
- "3" in 22px weight 700 #E24B4A, label "Sites at capacity" in 12px #9CA3AF
- "1,240" in 22px weight 700 #1D9E75, label "Routes re-optimised" in 12px #9CA3AF
- "4.2/5" in 22px weight 700 #1D9E75, label "Crowd satisfaction" in 12px #9CA3AF

Mini heatmap (full width, height 200px, same style as Screen 3 but smaller, with only 4 pins visible).

Alert log section (24px horizontal margin, margin-top 20px):
- Section label "Recent alerts" in 16px weight 600 #0D1B2A
- Alert item 1: Bell icon (red) + "14:32 — Sagrada Família at capacity. 340 re-routed." in 14px #374151 + timestamp "3h ago" right-aligned in 12px #9CA3AF. Divider below.
- Alert item 2: Bell icon (amber) + "13:15 — Park Güell moderate. Advisory sent to 180 users." + "4h ago"

Recommended actions section (margin-top 20px):
- Section label "Suggested actions" in 16px weight 600 #0D1B2A
- Action card 1 (white card, shadow-sm, radius 12px, padding 16px): "Open Parc de la Ciutadella overflow zone" in 14px weight 600 #0D1B2A. Sub-text "Estimated impact: reduce Sagrada Família load by 15%" in 12px #374151. Primary button "Activate" on right (small, width 90px, height 36px).
- Action card 2: "Send advisory to users near Gràcia district" + "Estimated reach: 420 tourists" + "Send alert" outlined button.

Bottom navigation bar with different tab labels for DMO view: Overview, Map, Alerts, Settings.

---

## PROTOTYPE CONNECTIONS SUMMARY

After generating all 8 screens, set up these prototype interactions in Figma's Prototype panel:

- Screen 1 "Get started" button → Navigate to Screen 2
- Screen 2 "Find my routes →" button → Navigate to Screen 3
- Screen 3 "Build my itinerary →" button → Navigate to Screen 4
- Screen 4 "Start my day →" button → Navigate to Screen 5
- Screen 5 "Accept new route →" button → Navigate to Screen 6
- Screen 5 "See other options" button → Navigate to Screen 3
- Screen 6 "Submit feedback" button → Navigate to Screen 7
- Screen 7 "Plan tomorrow →" button → Navigate to Screen 2
- Screen 7 "Back to map" button → Navigate to Screen 3

Transition style for all connections: Smart Animate, 300ms, ease-in-out.

---

## FINAL QUALITY CHECKLIST (apply to every screen before export)

- [ ] Every screen uses 390 × 844px frame size
- [ ] Status bar present at top of every screen
- [ ] Bottom navigation bar present at bottom of every screen
- [ ] All primary buttons are #1D9E75, height 52px, border-radius 12px, white text
- [ ] All crowd badges use correct colour coding (green/amber/red)
- [ ] All card elements have white background, radius 16px, shadow 0 4px 12px rgba(0,0,0,0.10)
- [ ] All body text is minimum 14px
- [ ] All headings use Inter weight 700
- [ ] Horizontal padding is 24px on all content
- [ ] AI suggestion notes are in italic, #1D9E75, 12px
- [ ] Privacy messaging appears on Screens 1 and 6
- [ ] All 8 prototype connections are wired correctly
- [ ] Prototype can be shared via "Anyone with link" in Figma Share settings

---

*End of SolaceRouteAI Figma Make Prompt & PRD*
*Module: BU7083 Smart Tourism and Digital Transformation*
*Assessment: Portfolio Part 2 — Design of an Interactive Digital Prototype*