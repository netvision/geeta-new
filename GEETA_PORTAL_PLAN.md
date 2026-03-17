# गीता पाठ — Interactive Web Portal
## Project Plan for Stakeholders

---

**Document Version:** 1.0
**Date:** March 2026
**Prepared for:** Stakeholder Review

---

## 1. Project Overview

Geeta Paath is an interactive, subscription-based web portal designed to bring the timeless teachings of the Bhagavad Gita to students in schools. The portal is built around a curated curriculum of 30+ chapters (पाठ), each chapter presenting Sanskrit shlokas along with their meanings, real-life context, stories, and reflection questions — all designed to make the teachings accessible, engaging, and relevant to modern life.

The portal will be available primarily in **Hindi**, with a full **English** version to follow, making it accessible to a wider audience across India and internationally.

---

## 2. Vision and Purpose

- To make the philosophical and practical wisdom of the Bhagavad Gita available to school students in a structured, progressive learning format.
- To provide schools with a digital platform that supplements their values and character education curriculum.
- To present ancient wisdom through beautiful, culturally resonant design and illustrations — making learning both inspiring and meaningful.

---

## 3. Target Audience

| User Type      | Description                                                     |
|----------------|-----------------------------------------------------------------|
| Students       | Primary users — read chapters, reflect on discussion questions  |
| Teachers       | Monitor student progress, moderate discussions                  |
| School Admins  | Manage their school's subscription and student accounts         |
| Platform Admin | Portal owner — manages all content, schools, and subscriptions  |

---

## 4. Content Structure

The portal is built around **30 chapters** (पाठ) sourced from a carefully structured curriculum based on the Bhagavad Gita. More chapters will be added over time without any disruption to the existing platform.

Each chapter contains:

- **Sanskrit Shloka(s)** — original verse with Hindi translation
- **Prasang (Context)** — the situation in the Gita that the shloka arises from
- **Tatparya (Meaning)** — practical life lessons drawn from the shloka
- **Stories and Examples** — relatable narratives to illustrate the teaching
- **Charcha ka Vishay (Discussion Questions)** — reflection prompts for students and class discussions
- **Illustration** — a unique artwork for each chapter, in the style of Indian miniature painting

The 30 chapters are organized into five progressive learning phases:

| Phase          | Chapters | Focus                                          |
|----------------|----------|------------------------------------------------|
| Problem        | 1 – 3    | Arjuna's dilemma, grief, impermanence          |
| Path           | 4 – 13   | Purpose, right action, karma yoga              |
| Obstacles      | Key chapters | Desire, duality, ego                      |
| Practice       | 14 – 22  | Yajna, equanimity, silence, meditation         |
| Mastery        | 23 – 30  | Dissolution of ego, final state, true refuge   |

---

## 5. Key Features of the Portal

### For Students
- Read all chapters in a beautifully designed, easy-to-navigate interface
- View shlokas in Sanskrit with Hindi (and later English) translation
- Read stories and life examples embedded in each chapter
- Reflect on discussion questions
- Track their own reading progress
- Bookmark favourite shlokas or sections
- Search across all chapters and shlokas
- Browse a Glossary of key Sanskrit and Hindi terms

### For Teachers
- View the reading progress of their students
- Moderate and approve student discussion responses
- Identify which chapters have been completed by the class

### For School Admins
- Register their school and manage a subscription plan
- Generate a unique school code for student self-registration
- Monitor overall school-level progress and engagement
- Manage student accounts

### For Platform Admin
- Add, edit, and publish new chapters at any time
- Upload illustrations (AI-generated or hand-drawn) per chapter
- Manage all schools and their subscriptions
- View platform-wide analytics and revenue reports
/
---

## 6. Illustrations and Design

### Illustration Approach
Each of the 30+ chapters will have a **dedicated illustration** that visually represents the chapter's core teaching or story — for example:
- Chapter 1 (Moha): Arjuna on the chariot, bow lowered in grief
- Chapter 8 (Yajna): Sacred fire with offerings
- Chapter 22 (Silence): A still flame in a windless room
- Chapter 26 (Being): A thread running through pearls

Illustrations will be produced using a **hybrid approach**:
- **AI-generated artwork** for the majority of chapters — fast, cost-effective, consistent style
- **Hand-drawn artwork** for select chapters of special significance

All illustrations will follow the **Indian miniature painting aesthetic** — flat perspective, rich jewel tones, gold outlines, and intricate details — making the portal visually distinctive and culturally authentic.

### Design Philosophy
The portal's design is inspired by **ancient Gita manuscripts** — warm parchment backgrounds, Devanagari script as a visual element, lotus and chakra motifs, and a colour palette of saffron, gold, ivory, deep blue, and earthy greens. Every design choice is made to evoke the feeling of engaging with a sacred but living text.

Each chapter's illustration palette also subtly tints that chapter's page, giving each lesson its own visual identity.

---

## 7. Technology Overview

*(Written for non-technical stakeholders — no engineering knowledge required to understand this section)*

| Component        | What it does                                                |
|------------------|-------------------------------------------------------------|
| Website Frontend | The interface students and teachers see and interact with   |
| Backend Server   | Handles user accounts, content delivery, payments, and data |
| Database         | Securely stores all chapters, user accounts, and progress   |
| Payment Gateway  | Razorpay — handles school subscription payments (India)     |
| Image Storage    | Cloudinary — stores and serves all chapter illustrations    |
| Hosting          | Private VPS server — fully owned and controlled             |
| Security         | HTTPS (SSL), encrypted passwords, token-based login         |

The platform is built to be **fully scalable** — it can handle hundreds of schools and thousands of students without any infrastructure changes.

---

## 8. Subscription Model

Schools subscribe to the platform on an **annual basis**. Three plans are available:

| Plan    | Students Allowed | Chapters | Discussions | Analytics | Price (indicative) |
|---------|-----------------|----------|-------------|-----------|-------------------|
| Free    | Up to 10        | First 5  | No          | No        | ₹0                |
| Basic   | Up to 100       | All 30+  | Yes         | Basic     | TBD               |
| Premium | Unlimited       | All + new| Yes         | Full      | TBD               |

- **Free plan** gives schools a taste of the platform before committing.
- **Basic and Premium** unlock the full curriculum, discussions, and reporting.
- New chapters added to the platform are automatically available to all active subscribers.
- Payments are processed securely via **Razorpay** — the leading payment gateway in India.

---

## 9. Language Support

- **Phase 1 (Launch):** Full Hindi content — all 30 chapters, UI, and navigation
- **Phase 2 (Post-launch):** Full English translation of all content and UI

Students and teachers will be able to toggle between Hindi and English at any time. Language preference is saved to their account.

---

## 10. Privacy and Data Security

- All student data is stored securely on a private server
- Passwords are encrypted and never stored in plain text
- Student accounts are created under a school — no student needs to provide personal information beyond a name and email
- No third-party advertising or data sharing
- Compliant with standard data protection practices

---

## 11. Development Phases and Timeline

| Phase | Work                                         | Estimated Duration |
|-------|----------------------------------------------|--------------------|
| 1     | Backend: server, database, login system      | 1 week             |
| 2     | Content API: all 30 chapters structured      | 1 week             |
| 3     | Subscription and payment integration         | 1 week             |
| 4     | Frontend foundation: design system, routing  | 1 week             |
| 5     | Public pages: Home, Pricing, About           | 3–4 days           |
| 6     | Chapter reading experience (core product)    | 1.5 weeks          |
| 7     | Student features: progress, bookmarks, search| 1 week             |
| 8     | Dashboards: student, teacher, school admin   | 1 week             |
| 9     | Illustration upload and display pipeline     | 3–4 days           |
| 10    | Hindi ↔ English language toggle             | 1 week             |
| 11    | Server deployment, SSL, final testing        | 3–4 days           |
|       | **Total Estimated Duration**                 | **~11–12 weeks**   |

*Timeline assumes single developer. Can be reduced with additional resources.*

---

## 12. What Makes This Portal Unique

1. **Structured curriculum** — Not a Gita recitation app, but a progressive learning journey with 30 thoughtfully sequenced lessons
2. **Discussion-first design** — Every chapter ends with reflection questions designed for classroom discussion
3. **Culturally authentic design** — Miniature painting illustrations, Devanagari typography, and sacred motifs create an immersive experience
4. **Built for schools** — School-based subscription model with teacher oversight, progress tracking, and admin control
5. **Expandable** — New chapters can be added at any time without any changes to the platform
6. **Bilingual** — Hindi now, English next — reaching students across India and the diaspora
7. **Owned infrastructure** — Hosted on a private server, giving full control over data, uptime, and costs

---

## 13. Immediate Next Steps

1. Stakeholder sign-off on this plan
2. Finalise subscription pricing for Basic and Premium plans
3. Commission / generate illustrations for first 5 chapters (Free tier launch set)
4. Begin development — Phase 1 (Backend foundation)
5. Identify 2–3 pilot schools for beta testing before public launch

---

*For any questions about this document, please contact the project lead.*

---

**End of Document**
