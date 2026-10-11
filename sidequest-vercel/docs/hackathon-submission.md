# SideQuest submission working draft

## Description
SideQuest makes product testing feel like a small adventure. Builders publish three specific tasks and public acceptance criteria. Testers try the product and share honest observations. Sponsors review the feedback and reward qualifying testers through verifiable Solana payments. Negative feedback can earn a reward; positive ratings are not required.

Current implementation: a working shared-data app with wallet authentication, feedback review and direct sponsor-paid Solana devnet transfers. The example quest uses simulated rewards. Escrow, public mainnet launch and guaranteed tester claims are not implemented.

## Why Solana
Small tester rewards fit low-cost wallet payments. Each payout has a transfer plus a submission-specific memo that can be inspected independently in Explorer. Feedback stays offchain to avoid publishing testers' sensitive observations. The current app uses the System and Memo programs; it does not deploy a custom program.

## Customer hypothesis
Early-stage consumer apps and community managers need specific onboarding feedback. They may redirect part of a giveaway or user-research budget to structured product tests. This hypothesis is not validated by paying customers yet.

## Distribution plan
Founder-led outreach to small Solana teams; free setup for a small sponsor-funded testing pilot; recruit testers through existing communities. Measure complete task-based feedback, actionable findings, sponsor satisfaction and repeat campaigns. No confirmed sponsors, users or revenue should be invented.

## Potential business model
Charge sponsors a setup fee or software subscription once pilots demonstrate value. Do not charge testers to qualify for rewards. Pricing has not been validated.

## Team
Priyanshu Raj — GTM strategist with community, outbound and Solana partnership experience. Verify exact role, dates, metrics and project details before submission. Disclose AI-assisted development and all pre-existing code as requested by the submission form.

## Pitch video outline (2–3 minutes)
0:00–0:20: Most community giveaways measure attention. Builders need to know where real users get stuck.
0:20–0:45: Introduce SideQuest: try a product, complete three tasks, submit useful feedback. Honest criticism qualifies.
0:45–1:25: Show quest creation, tester feedback, sponsor review and the payment receipt. Clearly say devnet and identify simulated segments.
1:25–1:55: Explain Solana transfers and memos; feedback stored privately offchain. Current payments are sponsor-controlled; escrow is the next milestone.
1:55–2:25: Customer hypothesis, community-led pilot plan and what will be measured.
2:25–2:45: Founder fit and next steps. Do not claim unverified traction or a deployed escrow program.

## Technical demo checklist (maximum 3 minutes)
- Use two distinct wallets and a funded sponsor devnet wallet.
- Publish a quest with clear criteria.
- Submit specific critical feedback with a low rating from the tester wallet.
- Approve it because it meets criteria, not because it is complimentary.
- Pay, then show a confirmed devnet Explorer transaction.
- Explain signed-message authentication, D1 storage, authorization and receipt validation.
- If a live transfer fails, disclose it and show the simulated example separately. Do not present a simulated payout as onchain proof.

## Before submission
- Complete registration and join the hackathon; select Solana.
- Make a reviewer-accessible app available. The initial hosted build is private.
- Provide a GitHub repository (export this source and create one, or give private reviewer access as allowed).
- Upload the pitch and technical demo videos; include their actual links.
- Fill in logo, team, location, integration and distribution information.
- Verify the current submission portal's required fields.
- Deadline: October 12, 2026, 11:59 p.m. PDT / October 13, 2026, 12:29 p.m. IST.
