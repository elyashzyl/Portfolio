# Portfolio TODO

## Recommended update: Make the portfolio application-ready

The portfolio now communicates the target role, availability, selected work, and contact path more clearly. Live project descriptions and previews are based on the public websites. The remaining items below require real career information or evidence before they should be added.

- [x] Add a clear target role and value proposition to the hero section.
- [x] Add a hiring snapshot with role, location, availability, and email.
- [x] Add `View selected work` and `Start a conversation` calls to action.
- [x] Improve page title and social/share metadata.
- [ ] Add a real, up-to-date resume PDF and a visible `Download resume` link.
- [ ] Add a verified LinkedIn profile link.
- [ ] Add measurable project outcomes where they are available, such as users served, time saved, or workflow improvements.
- [ ] Add a short work-history timeline with company/client names, dates, and responsibilities.
- [ ] Add testimonials or references only with permission.
- [ ] Run a final keyboard, mobile, link, and performance review before sending applications.

## Recommended update: Add project case studies

Upgrade the Recent Projects cards into short, interactive case studies. The current previews and live links show what was built, but case studies would better communicate the thinking, responsibilities, and results behind each project.

### Goals

- Make each project feel like a complete portfolio story.
- Show the technical and design decisions behind the work.
- Help potential clients or employers understand the value delivered.
- Keep the current visual style, hover previews, and live-demo links.

### Implementation plan

- [x] Add structured case-study data to each project in `src/components/DevSection.vue`.
- [x] Use source-verified product descriptions and public capabilities for the live projects.
- [x] Make each project card open a case-study modal.
- [x] Add a clear close button, click-outside close, and keyboard `Escape` support.
- [x] Keep the `Live Demo` button separate so it opens the external site in a new tab.
- [x] Add accessible labels, focus states, focus return, and focus trapping for the modal.
- [x] Add responsive layouts for the case-study content on tablet and mobile.
- [x] Add case-study content for EduPulse, ElyTrack, ELWrite, and the existing projects.
- [x] Replace invented project mockups with exact screenshots captured from the live websites.
- [ ] Refresh live-site captures when the public products change.
- [ ] Add additional project screenshots when they are available.
- [ ] Test the interaction with mouse, keyboard, and touch devices.

### Source-verified live product notes

#### EduPulse

- Gamified learning platform for students and teachers.
- Public capabilities include XP and levels, achievement badges, quizzes, daily streaks, leaderboards, messaging, analytics, and teacher tools.
- Public site positioning: Learn. Play. Achieve.

#### ElyTrack

- School attendance and operations platform for Philippine schools.
- Public capabilities include daily roll call, DepEd Form 2 calculations, SARDO alerts, audit logs, CSV learner ingestion, and isolated campus workspaces.
- Public site references DepEd Order No. 8, s. 2015 and the Philippine Data Privacy Act.

#### ElWrite

- Digital identity and NFC profile platform for modern teams.
- Public capabilities include 19 profile formats, web NFC sharing, iOS/Android support, profile updates, vCard integration, and NFC card pairing.
- Public site positioning: digital profiles and NFC destinations.

### Definition of done

- [x] Every project has a useful summary that can be read without leaving the portfolio.
- [x] The modal/detail view has desktop, tablet, and mobile layouts.
- [x] External live demos still open correctly.
- [x] Keyboard and screen-reader interactions are supported.
- [x] `npm run build` completes successfully.
