---
name: human-writing
description: The house voice for antonwester.se copy a visitor reads (sv + en): the home page, service, case and city pages, UI strings, the chat's answers and prompt. Use when writing new copy, editing or de-slopping existing copy, or when the user says "humanize", "läser som AI", "de-slop". Covers the voice rules, banned phrases, Swedish traps, the workflow and the self-check. NOT for code comments.
---

# Human writing: the voice of antonwester.se

Adapted from SökHem's `human-writing` (`~/Documents/repos/sokhem/.ruler/skills/human-writing/SKILL.md`, the full
version with examples). The goal is copy a good consultant would sign: it answers the visitor's question in plain
words, uses real numbers and gets out of the way. Most visitors are not technical. The AI-utveckling service page
is the one page allowed to be technical.

## 1. Before you write

- **Lead with the answer.** "Vad kostar det?" gets the price model in the first sentence.
- **Concrete beats abstract.** A number, a client, a real case, not "kan spara tid".
- **One idea per paragraph.** If you can't say what a paragraph is for, delete it.
- **Admit limits.** "Det beror på hur mycket som ska byggas" plus what it depends on. No fake enthusiasm.

## 2. When editing

**Meaning survives exactly.** Every fact, number, name, link, id and placeholder (`{weeks}`, `{step}`) stays.
**Zero edits is a valid result.** Fix what is wrong; don't rewrite good text into different text. Texts the owner
chose word for word (the hero offer, the bio) are pinned in `test/unit/content-core.test.ts`.

## 3. Voice rules

1. **No dashes as punctuation** (`–`, `—`). Use a comma, period or colon, or split the sentence. Year spans in the
   experience table are data and keep theirs.
2. **Vary rhythm.** Three sentences in a row with the same shape: change one.
3. **Active voice.** "Jag bygger", not "lösningen byggs". Natural Swedish passives ("krävs", "ingår") are fine.
4. **Varied openers.** Not every sentence starts with Jag/Vi/Det (en: I/We/The).
5. **Structure only when it helps.** No forced lists of three.
6. **No closing summaries.** A paragraph ends on its point; a page ends on a next step (book a call, write).
7. **English uses contractions** (it's, don't, I'll).
8. **No emojis.**
9. **No staging:** "inte X, utan Y" contrasts, end-of-paragraph punchlines, answers to objections nobody raised,
   "fungerar som"/"utgör"/"serves as" where "är"/"is" works, tacked-on "vilket …"/"-ing" clauses, decorative bold.

Staging, banned phrases and dashes are strong tells: one is enough to edit. Rhythm, openers, passive and lists are
weak: edit only when two or more show in one paragraph.

## 4. Banned phrases

Delete, don't substitute. **sv:** dessutom/vidare/slutligen as openers, sammanfattningsvis, avslutningsvis, kort
sagt, det är viktigt att, det är värt att, i dagens samhälle, i en värld där, spelar en avgörande roll, en rad
olika, möjliggör, sömlös, robust, holistisk, innovativ, banbrytande, utnyttja, låsa upp, frigöra, dyka in i, nästa
nivå, resa/navigera as metaphors. **en:** furthermore, moreover, additionally, in conclusion, worth noting, delve,
unlock, seamless, streamline, holistic, cutting-edge, game-changer, transformative, leverage, utilize, facilitate,
foster, empower, showcase, journey/landscape/navigate as metaphors. Translated idioms ("I slutet av dagen") too.

## 5. Swedish traps

No särskrivning. "ni" to a company, "du" to a person, as the page around it does. Space as thousands separator
("1 080 h"), comma as decimal separator.

## 6. What a humanizer pass must not add

Interjections ("Ärligt talat?"), invented anecdotes, typos, hedging everywhere.

## 7. Workflow and self-check

Read the whole section first, edit in place, keep sv and en in step (separate texts, same meaning). Many files:
one sub-agent per file, each told that zero edits is valid. Then:

```bash
npx vitest run test/unit/voice.test.ts
```

It checks dashes, banned phrases and emoji in `src/content/*` and the chat prompt. Rhythm and staging need a read:
go through the diff once more and ask "would a consultant say this to a client across the table?"

## Where the text lives

- Home, services, cases, cities, calculator: `src/content/*.ts`
- UI strings and the chat's fixed lines: `src/content/ui.ts`
- The chat's question tree: built from the FAQs in `src/lib/chat-tree.ts`
- The chat's AI prompt: `worker/chat.js` (`systemPrompt`)
