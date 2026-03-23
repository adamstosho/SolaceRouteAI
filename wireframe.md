SOLACEROUTEAI — DETAILED WIREFRAME SPECIFICATION
Design Philosophy

The wireframe follows three principles aligned with **Smart Tourism systems:

Clarity over complexity (academic usability expectation)
Decision support, not just display
Progressive disclosure (information shown step-by-step)
GLOBAL STRUCTURE
Navigation Model
Bottom Navigation Bar (persistent after onboarding)
Home
Map
Plan
Saved
Profile
SCREEN 1: SPLASH SCREEN
 -------------------------------------------------
|                                                 |
|                 [LOGO]                          |
|                                                 |
|          SolaceRouteAI                          |
|     Smart Routes. Better Experiences            |
|                                                 |
|              (Subtle loading...)                |
|                                                 |
 -------------------------------------------------

Notes

Minimal design
No interaction
SCREEN 2: ONBOARDING
 -------------------------------------------------
|  Skip                                           |
|                                                 |
|  [Illustration: tourist + map + AI flow]        |
|                                                 |
|  Avoid crowds. Travel smarter.                  |
|  Discover better routes in real time.           |
|                                                 |
|  ● ○ ○                                          |
|                                                 |
|             [Get Started]                       |
|        [Continue as Guest]                      |
 -------------------------------------------------
SCREEN 3: PREFERENCES SETUP
 -------------------------------------------------
|  ← Back             Preferences                 |
|                                                 |
|  What are you interested in?                    |
|  [ Culture ] [ Nature ] [ Food ] [ Shopping ]   |
|                                                 |
|  Travel Pace                                    |
|  ( ) Relaxed   ( ) Moderate   ( ) Fast          |
|                                                 |
|  Mobility                                      |
|  [ Walking ] [ Public Transport ] [ Mixed ]     |
|                                                 |
|                [Continue]                       |
 -------------------------------------------------
SCREEN 4: DESTINATION INPUT
 -------------------------------------------------
|  ← Back             Plan Trip                   |
|                                                 |
|  Destination                                    |
|  [ Search destination... 🔍 ]                   |
|                                                 |
|  Date                                           |
|  [ Select date ]                                |
|                                                 |
|  Time                                           |
|  [ Select time ]                                |
|                                                 |
|                [Generate Route]                 |
 -------------------------------------------------
SCREEN 5: PROCESSING / AI THINKING
 -------------------------------------------------
|                                                 |
|         Optimising your journey...               |
|                                                 |
|      [Animated AI wave / map pulse]             |
|                                                 |
|   Analysing crowd density                       |
|   Matching your preferences                     |
|   Generating best route                         |
|                                                 |
 -------------------------------------------------
SCREEN 6: SMART ITINERARY (CORE SCREEN)
 -------------------------------------------------
|  Today’s Route                                  |
|                                                 |
|  [MAP VIEW]                                     |
|   • Route line                                  |
|   • Pins                                        |
|   • Heat overlay                                |
|                                                 |
| ---------------------------------------------  |
|  10:00  Museum (LOW crowd - green)              |
|  12:00  Botanical Garden (LOW crowd)            |
|  14:00  Cathedral (HIGH crowd ⚠)                |
| ---------------------------------------------  |
|                                                 |
|  [View Alternatives]                            |
|  [Adjust Route]                                 |
 -------------------------------------------------
SCREEN 7: ALTERNATIVE SUGGESTIONS
 -------------------------------------------------
|  Alternatives                                   |
|                                                 |
|  ⚠ Cathedral is crowded                         |
|                                                 |
|  Suggested Instead:                             |
|                                                 |
|  [ Botanical Garden ]                           |
|  Less crowded • Similar experience              |
|                                                 |
|  [ Local Art Gallery ]                          |
|  Hidden gem • Cultural                          |
|                                                 |
|  [Accept Suggestion]                            |
 -------------------------------------------------
SCREEN 8: MAP WITH HEATMAP
 -------------------------------------------------
|  Map View                                       |
|                                                 |
|  [Full Screen Map]                              |
|                                                 |
|  🔴 High Density Areas                          |
|  🟠 Medium                                      |
|  🟢 Low                                         |
|                                                 |
|  [Toggle: Heatmap ON/OFF]                       |
|                                                 |
|  [Recalculate Route]                            |
 -------------------------------------------------
SCREEN 9: EDIT ITINERARY
 -------------------------------------------------
|  Edit Route                                     |
|                                                 |
|  Drag to reorder                                |
|                                                 |
|  ☰ Museum                                       |
|  ☰ Botanical Garden                             |
|  ☰ Cathedral                                    |
|                                                 |
|  [+ Add Location]                               |
|                                                 |
|  [Save Changes]                                 |
 -------------------------------------------------
SCREEN 10: FINAL CONFIRMATION
 -------------------------------------------------
|  Your Plan is Ready                             |
|                                                 |
|  ✔ Optimised for low congestion                 |
|  ✔ Personalised to your interests               |
|                                                 |
|  Estimated Time: 6 hours                        |
|                                                 |
|  [Save Plan]                                    |
|  [Share Plan]                                   |
 -------------------------------------------------
SCREEN 11: FEEDBACK LOOP
 -------------------------------------------------
|  How was your experience?                       |
|                                                 |
|  ⭐⭐⭐⭐⭐                                       |
|                                                 |
|  Was it crowded?                                |
|  ( ) Yes   ( ) No                               |
|                                                 |
|  [Submit Feedback]                              |
 -------------------------------------------------
INTERACTION FLOW SUMMARY
Onboarding → Preferences → Destination Input → AI Processing
→ Itinerary → Alternatives → Map → Edit → Confirm → Feedback
KEY DESIGN DETAILS (FOR DISTINCTION LEVEL)
Visual Hierarchy
Primary actions = large buttons
Secondary = links
Colour Logic (important for your theme)
Green → low crowd
Orange → medium
Red → high
UX Principle

Every screen must answer: