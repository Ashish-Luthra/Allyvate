# AI Creative Studio - Clickable Screen Specs (Per-Screen User Stories + Acceptance Criteria)

## 0) Purpose

This document translates the concept boards into **clickable product specs** for high-fidelity prototyping and frontend implementation.

Each screen includes:
- user stories
- click map (what is clickable and where it goes)
- interaction behavior
- acceptance criteria (Given/When/Then style)

---

## 1) Prototype Foundations (Global)

## 1.1 Primary Routes
- `/command-center`
- `/campaigns/:campaignId/brief`
- `/campaigns/:campaignId/studio`
- `/campaigns/:campaignId/experiments`
- `/campaigns/:campaignId/insights`
- `/approvals`
- `/brand-hub`
- `/integrations`

## 1.2 Global Navigation (Always Clickable)
- Left nav items route to primary pages.
- Top bar brand switcher updates active brand context without full page reload.
- Global search opens command palette (`Ctrl/Cmd + K`).
- Notifications icon opens right-side notification drawer.

## 1.3 Persistent UI States
- **Draft**
- **In Review**
- **Approved**
- **Scheduled**
- **Live**
- **Learning**

All creative artifacts must display one of these states.

## 1.4 Shared Overlay Components
- Variant Detail Drawer
- Score Breakdown Drawer
- Export Drawer
- Comment Thread Panel
- Approval Decision Modal

---

## 2) Screen Spec - Command Center

**Route:** `/command-center`  
**Primary user:** Growth Marketing Lead, Agency Account Director

### 2.1 User Stories
1. As a growth lead, I want to quickly assess portfolio health so I can prioritize campaigns.
2. As an agency director, I want immediate visibility into risks so I can unblock teams fast.
3. As a media manager, I want to jump directly into next actions from alerts.

### 2.2 Click Map
| Clickable Element | Behavior | Destination |
|---|---|---|
| KPI card (Spend/ROAS/CPA/CTR) | Opens metric drill-down drawer | In-page drawer |
| Creative Momentum widget | Opens top movers list | `/campaigns/:id/insights` |
| Alert card: Fatigue Risk | Opens filtered campaign list | `/campaigns?filter=fatigue-risk` |
| CTA: Create Campaign | Starts new campaign wizard | `/campaigns/new/brief` |
| CTA: Generate Next 20 Variants | Opens quick generation modal | In-page modal |
| CTA: Review Approvals | Opens approval queue | `/approvals` |
| Campaign row | Opens campaign workspace | `/campaigns/:campaignId/studio` |

### 2.3 Interaction Notes
- KPI card hover shows 7-day trend preview.
- Alerts are sorted by severity (Critical, High, Medium).
- `Generate Next 20 Variants` requires selecting campaign + concept family.

### 2.4 Acceptance Criteria
- **AC-CC-01**  
  Given the user is on Command Center, when they click `Review Approvals`, then the app routes to `/approvals`.
- **AC-CC-02**  
  Given one or more critical alerts exist, when the page loads, then critical alerts are rendered above all medium/high alerts.
- **AC-CC-03**  
  Given the user clicks a campaign row, when route transition completes, then Studio opens with that campaign preselected.
- **AC-CC-04**  
  Given KPI data fails to load, when the request errors, then inline error with retry action appears without blocking page navigation.

---

## 3) Screen Spec - Campaign Brief Builder

**Route:** `/campaigns/:campaignId/brief`  
**Primary user:** Creative Strategist, Growth Marketing Lead

### 3.1 User Stories
1. As a strategist, I want a structured brief flow so AI recommendations are high quality.
2. As a marketer, I want AI-generated hooks/angles to reduce time spent ideating.
3. As a team lead, I want to lock constraints (claims/legal/channel limits) before generation.

### 3.2 Click Map
| Clickable Element | Behavior | Destination |
|---|---|---|
| Stepper item (Goal/Audience/Offer/Channels/Constraints/KPI) | Jump to step with validation warning if incomplete required fields | In-page step |
| `Suggest Hooks` button | Generates hook suggestions from inputs | In-page panel |
| `Generate Strategy Draft` | Runs AI strategy expansion | In-page result cards |
| `Save as Draft` | Saves partial brief | Persist + toast |
| `Continue to Studio` | Creates/updates strategy and routes forward | `/campaigns/:campaignId/studio` |

### 3.3 Interaction Notes
- Required fields: campaign objective, primary audience, channel selection, success KPI.
- Strategy result cards are editable inline.
- Unsaved changes prompt appears if user attempts route change.

### 3.4 Acceptance Criteria
- **AC-BR-01**  
  Given required fields are incomplete, when user clicks `Continue to Studio`, then the form highlights missing fields and blocks navigation.
- **AC-BR-02**  
  Given brief fields are valid, when user clicks `Generate Strategy Draft`, then 3-5 strategy cards render with editable text.
- **AC-BR-03**  
  Given unsaved edits exist, when user navigates away, then a confirm dialog appears with `Discard` and `Stay`.
- **AC-BR-04**  
  Given the brief is saved, when page reloads, then all step data is restored.

---

## 4) Screen Spec - Infinite Creative Canvas (Studio)

**Route:** `/campaigns/:campaignId/studio`  
**Primary user:** Performance Designer, Creative Strategist

### 4.1 User Stories
1. As a designer, I want to generate variants from one prompt to scale output quickly.
2. As a strategist, I want score visibility so I can prioritize likely winners.
3. As an agency team, I want quick edit actions to avoid round-tripping to external tools.

### 4.2 Click Map
| Clickable Element | Behavior | Destination |
|---|---|---|
| Prompt composer `Generate` | Creates selected number of variants | In-page canvas nodes |
| Variant card | Opens Variant Detail Drawer | In-page drawer |
| Score chip on variant | Opens Score Breakdown Drawer | In-page drawer |
| Quick action: Rewrite Copy | Opens rewrite modal and applies revision | In-page modal |
| Quick action: Swap Background | Opens asset picker | In-page modal |
| Quick action: Resize | Creates channel-specific dimensions | In-page updates |
| `Burst Variants` | Batch generate variants across selected dimensions | In-page generation |
| `Create Test Matrix` | Sends selected variants to Experiment Planner | `/campaigns/:id/experiments` |
| `Send for Approval` | Creates approval tasks | `/approvals` |

### 4.3 Interaction Notes
- Multi-select enabled with shift-click on variant cards.
- Generating assets displays progress per item, not one global spinner.
- Scores shown: Predicted Performance, Brand Fit, Policy Safety, Novelty, Fatigue Risk.

### 4.4 Acceptance Criteria
- **AC-ST-01**  
  Given one variant exists, when user clicks it, then Variant Detail Drawer opens with preview, tags, version history, and comments tab.
- **AC-ST-02**  
  Given multiple variants are selected, when `Burst Variants` is clicked, then new variants are generated for each selected source with inherited metadata.
- **AC-ST-03**  
  Given generation is in progress, when one item fails, then failure is shown on that item while others continue processing.
- **AC-ST-04**  
  Given `Send for Approval` is clicked, when routing succeeds, then approval tasks are created with selected reviewers and SLA.

---

## 5) Screen Spec - Experiment Planner

**Route:** `/campaigns/:campaignId/experiments`  
**Primary user:** Paid Media Manager, Growth Lead

### 5.1 User Stories
1. As a media manager, I want drag-and-drop experiment setup so I can launch tests quickly.
2. As a growth lead, I want confidence and stop-loss rules to reduce wasted spend.
3. As a strategist, I want clear winner criteria tied to KPIs.

### 5.2 Click Map
| Clickable Element | Behavior | Destination |
|---|---|---|
| Variant tile drag to test cell | Assign variant to test arm | In-page update |
| Audience split control | Edit % allocation across arms | In-page update |
| Budget input | Assign per-arm budgets | In-page update |
| Confidence threshold slider | Set statistical confidence target | In-page update |
| Stop-loss toggle + inputs | Enable/define pause conditions | In-page update |
| `Launch Experiment` | Publishes test config | In-page success + status |
| Experiment row | Opens experiment detail page | `/campaigns/:id/experiments/:expId` |

### 5.3 Interaction Notes
- Real-time validation ensures audience split totals 100%.
- Arms must have at least one creative each.
- Launch button disabled until validation passes.

### 5.4 Acceptance Criteria
- **AC-EX-01**  
  Given audience split total is not 100%, when user tries to launch, then launch is blocked and split error is shown.
- **AC-EX-02**  
  Given any arm has zero creatives, when launch is attempted, then the system highlights the empty arm and blocks launch.
- **AC-EX-03**  
  Given valid setup, when user clicks `Launch Experiment`, then status changes to `Live` and experiment ID is generated.
- **AC-EX-04**  
  Given stop-loss rules are enabled, when live performance crosses stop-loss threshold, then arm status auto-updates to `Paused`.

---

## 6) Screen Spec - Insight Lab

**Route:** `/campaigns/:campaignId/insights`  
**Primary user:** Creative Strategist, Growth Lead, Analyst

### 6.1 User Stories
1. As a strategist, I want to understand why winners won so I can replicate patterns.
2. As a growth lead, I want actionable recommendations rather than raw dashboards.
3. As an analyst, I want to segment findings by audience and channel.

### 6.2 Click Map
| Clickable Element | Behavior | Destination |
|---|---|---|
| Cluster node (creative archetype) | Opens cluster detail with top variants | In-page drawer |
| KPI filter pills | Re-slice insight set by metric (CTR/CPA/ROAS) | In-page update |
| Segment selector | Filters by audience/channel/geo | In-page update |
| Recommendation card | Opens rationale + evidence panel | In-page drawer |
| CTA: Generate from Insight | Creates new variant set from selected pattern | `/campaigns/:id/studio` |

### 6.3 Interaction Notes
- AI narrative panel updates live as filters change.
- Every recommendation includes confidence band and evidence signals.
- Users can bookmark insights for weekly review.

### 6.4 Acceptance Criteria
- **AC-IN-01**  
  Given an insight recommendation is clicked, when drawer opens, then it shows top evidence signals, confidence band, and projected KPI impact.
- **AC-IN-02**  
  Given user clicks `Generate from Insight`, when route completes, then Studio opens with prompt prefilled from selected insight.
- **AC-IN-03**  
  Given filters are applied, when page is refreshed, then URL query params preserve filter state.
- **AC-IN-04**  
  Given no results match active filters, when data resolves, then empty state displays with `Reset filters` action.

---

## 7) Screen Spec - Approval Console

**Route:** `/approvals`  
**Primary user:** Brand Manager, Client Reviewer, Agency Director

### 7.1 User Stories
1. As a brand manager, I want fast review and compare tools to approve confidently.
2. As a client reviewer, I want simple annotate-and-request-change interactions.
3. As an agency director, I want SLA visibility to prevent launch delays.

### 7.2 Click Map
| Clickable Element | Behavior | Destination |
|---|---|---|
| Queue row | Opens approval detail workspace | In-page workspace |
| Side-by-side compare toggle | Displays current vs previous/current vs baseline | In-page update |
| Annotation tool | Adds comment pinned to specific region/time | In-page update |
| `Approve` | Opens confirmation modal then marks approved | In-page status update |
| `Request Changes` | Opens reason template + comment input | In-page status update |
| `Reject` | Requires reason and updates status | In-page status update |

### 7.3 Interaction Notes
- SLA timer visible at queue and item levels.
- External reviewers can only access assigned items.
- Decision actions are permission-gated by role.

### 7.4 Acceptance Criteria
- **AC-AP-01**  
  Given a reviewer opens an item, when they add annotation and submit, then comment is timestamped and visible to assignee.
- **AC-AP-02**  
  Given reviewer clicks `Approve`, when confirmed, then status updates to `Approved` and audit log records actor + timestamp.
- **AC-AP-03**  
  Given reviewer clicks `Request Changes`, when no reason is provided, then submission is blocked with inline validation.
- **AC-AP-04**  
  Given user lacks permission, when they try decision actions, then actions are disabled and tooltip explains access restriction.

---

## 8) Overlay Spec - Variant Detail Drawer

**Invocation:** click any variant card in Studio or Insights

### 8.1 User Stories
1. As a designer, I want full context for a variant so I can edit accurately.
2. As a strategist, I want to see score rationale and lineage of the asset.

### 8.2 Click Map
| Clickable Element | Behavior |
|---|---|
| Tabs: Preview/Metadata/Scores/Version History/Comments | Switch panel |
| `Duplicate` | Creates copy with inherited tags |
| `Archive` | Moves asset to archived state |
| `Open in Studio` | Focuses asset on canvas |

### 8.3 Acceptance Criteria
- **AC-VD-01**  
  Given drawer is open, when tab changes, then panel content updates without closing drawer.
- **AC-VD-02**  
  Given user clicks `Duplicate`, when action succeeds, then new variant appears in current concept family.

---

## 9) Non-Functional Acceptance Criteria (Clickable Prototype Readiness)

- **NFR-01 (Responsiveness):** Prototype supports desktop widths 1280, 1440, and 1920 without clipped core actions.
- **NFR-02 (Latency UX):** Every async action has visible progress state within 150ms.
- **NFR-03 (Accessibility):** All primary clickable controls keyboard-focusable with visible focus ring; color contrast meets WCAG AA.
- **NFR-04 (State Persistence):** Filter/sort/view mode persists on refresh per screen.
- **NFR-05 (Telemetry):** All primary click actions emit analytics event with campaignId, userRole, and sourceScreen.

---

## 10) Handoff Checklist (Design + Engineering)

Before implementation starts, confirm:
1. Every screen has normal/loading/error/empty states in mockups.
2. Every clickable element in this document has a prototype link target.
3. Route names and params match frontend router conventions.
4. Acceptance criteria are mirrored in QA test cases.
5. Analytics event names are defined in tracking schema.

