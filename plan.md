# Implementation Plan: Solar Wise Academy

Building a professional solar energy learning platform and e-book marketplace.

## Scope Summary
A web-based (mobile-responsive) application featuring a solar e-book marketplace, an AI-powered technical assistant, a learning center for solar tutorials, and a user dashboard. Due to environment constraints, data persistence will be handled via browser storage (localStorage) or simulated mock APIs.

## Non-Goals
- Native mobile app binary generation (APK/IPA). The focus is on a responsive web application that functions as a mobile-first PWA.
- Server-side persistence (No Supabase/Postgres).
- Live payment gateway processing (Simulated checkout flow with Paystack/Flutterwave UI mocks).
- Real-time search of external sites by AI (Simulated AI assistant with a robust knowledge base).

## Assumptions & Open Questions
- **Assumption:** The app will use `localStorage` to simulate "purchased" content and user profiles.
- **Assumption:** AI logic will be a sophisticated frontend simulation or use a mock API wrapper for OpenAI if keys are provided (otherwise a deterministic solar-knowledge base).
- **Question:** Are there specific e-book PDFs to include, or should we use placeholder covers and descriptions? (Plan: Use placeholders).

## Affected Areas
- **Frontend:** Core UI using React, Tailwind CSS (Green/Blue theme), and Lucide icons.
- **State Management:** React Context or simple state for the "Cart" and "Owned Books".
- **AI Module:** A dedicated chat interface with solar-specific logic.
- **Learning Center:** Layout for tutorials and quiz components.

---

## Phase 1: Foundation & Theme (frontend_engineer)
- Set up global styles (Green/Blue/White theme).
- Configure Layout (Navigation, Mobile-first Sidebar/Bottom Nav).
- Establish Mock Data structures (Books, Tutorials, FAQs).

## Phase 2: Marketplace & E-Book Library (frontend_engineer)
- Build E-Book grid and detail pages.
- Implement Search & Filter for book categories.
- Create "Preview" modal for book excerpts.
- Implement the "Buy Now" flow (Simulated Payment UI).

## Phase 3: AI Solar Assistant (frontend_engineer)
- Design and build the Chat Interface.
- Implement the logic for technical solar queries (Calculations, Troubleshooting).
- Add "Source Reference" UI components within chat bubbles.

## Phase 4: Learning Center & User Profiles (frontend_engineer)
- Build the Tutorial section (Video/Text/Images).
- Create a Quiz engine for certifications.
- Build the User Profile / "My Library" dashboard to view purchased items.

## Phase 5: Admin Dashboard & Refinement (quick_fix_engineer)
- Create a simplified Admin view to "add" books (updates local state).
- Implement Dark Mode toggle.
- Final UI polish, responsiveness checks, and "Download" simulation (triggering browser downloads of mock files).

---

## Sequencing Constraints
- Phase 1 must complete before others.
- Phase 2 and 4 can run in parallel if multiple engineers were present, but here we follow order.
- Phase 5 is the final polish layer.