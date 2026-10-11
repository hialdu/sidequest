# SideQuest product plan

## The product
A small, welcoming place to try an app, give specific feedback, and receive a reward when the team accepts the work. The interaction should feel like a guided task, not a crypto dashboard.

The current launch uses Solana devnet. Test SOL has no monetary value. Real shared quests use direct sponsor payments; rewards are not escrowed or guaranteed. The local example is always visibly labeled as a simulation.

## The two people we serve
**Tester:** curious about an app, comfortable giving an opinion, possibly unfamiliar with wallets. They need to know what to do, how long it takes, what qualifies, and what happens after submission.

**Product team:** needs specific observations about a feature. They need a concise brief, a small number of testers, useful feedback, clear review decisions, and a payment record.

## The first minute
1. See one clear explanation: try a product, complete three tasks, share observations.
2. Find a quest. See time, task count, reward and review conditions before starting.
3. Try the example without a wallet. Show simulated rewards beside the reward itself.
4. Follow one task at a time. Keep the task, product link and answer field together.
5. At submission, explain why a wallet is needed for a shared quest. Preserve answers while connecting. Never request a deposit or a token purchase.
6. Show a confirmation explaining the next step. Keep feedback visible in My feedback.

Browsing and writing do not require wallet sign-in. Shared submission and sponsor actions require signed wallet proof. There is no email login or automatic wallet creation in this MVP; do not imply either exists.

## Navigation
- **Find a quest:** home, example, available quests and a short explanation.
- **My feedback:** draft continuation, submitted feedback and readable statuses.
- **For teams:** create a quest, view submissions, review, and pay.

Use simple words in the interface. “Task” replaces “checkpoint.” “Waiting for review” replaces “pending.” “Approved, waiting for payment” avoids confusing approval with a payout. “Payment confirmed” only appears after RPC verification.

## Sponsor setup
A three-step form:
1. Product: name, HTTPS link, short brief and category.
2. Tasks: exactly three concrete prompts.
3. Rewards: reward per accepted tester, number of testers, estimated time and public acceptance criteria. Show total commitment before publishing and explain that publishing moves no funds.

The sponsor connects at publish time. Approval/rejection always includes a reason. Reward eligibility does not depend on rating; useful criticism qualifies. Payment requires explicit confirmation of recipient, amount and devnet before the wallet prompt.

## Visual system
Use the approved Solana-color symbol and white SideQuest wordmark. Charcoal background, readable off-white text, restrained violet and mint accents, large spacing and clean typography. No oversized trading metrics, fabricated partners, fake quest counts, leaderboards, price tickers or urgency claims.

One main action per screen. Motion is limited to hover/focus and a subtle decorative path. Respect reduced-motion preferences. Mobile gets the same information in a single-column layout; controls remain touch-friendly.

## Make it fun without adding friction
- Three small tasks with a visible progress indicator.
- Encouraging completion receipt and a local demo achievement stamp.
- An example people can finish without wallet setup.
- Specific task prompts and friendly empty states.

No random prizes, purchases to qualify, recruit-to-earn rewards, or invented achievement statistics.

## Honest states
- Example: local simulation; never represented as a real payout.
- Test launch: test SOL has no monetary value, shown near browsing and rewards.
- No wallet: explain it only when an action needs it; offer the example.
- Waiting: feedback is saved, sponsor has not reviewed it.
- Approved: sponsor accepted it; payment has not happened.
- Paid: confirmed devnet receipt available.
- Declined: show the sponsor's actual reason.
- Payment verification failed: retain the existing transaction signature and retry verification without another transfer.
- Full quest: viewing is allowed, submission is blocked; do not suggest a slot is reserved while a draft is open.

## Validation and launch priorities
First verify the navigation, retained drafts, task progression, sponsor form, keyboard-accessible dialogs, mobile styles and matching logo asset. Rerun authentication/authorization/payment integration checks after refactoring shared behavior. Browser QA is unavailable in the current environment, so do not claim screenshots prove the interaction works.

Before the hackathon demo: test with two wallets and a funded devnet sponsor wallet; confirm the Explorer receipt. Collect a few real observations and distinguish those from simulated entries. Submit only the features actually implemented. A reviewed escrow program, stronger identity checks and mainnet payouts follow later.

## What we measure in a pilot
- People who understand a quest and start it.
- Started tasks that become complete feedback.
- Submissions that include actionable observations.
- Time from submission to review and confirmed payment.
- Sponsor willingness to run another test.

These are proposed measures, not current traction. Do not report numbers before collecting them.

## Founder story and copy
The home page explains the founder’s goal: make Solana fun through useful testing, with teams paying accepted feedback. Negative ratings can qualify. Current devnet and simulated reward labels remain visible. The opening hook is “Try an app. Tell it like it is.” The footer uses the official all-white Solana logotype.
