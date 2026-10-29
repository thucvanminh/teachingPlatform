# Interactive Lecture Studio Specification (Quy Chuẩn Phòng Học Tương Tác)

Whenever creating an interactive lecture, it must be hosted in `frontend/public/lectures/<slug>/` and contain 4 core files:
- `data.js`: Structured content matrix (Vocab, Grammar, Collocations, Word Tree, Recall, Writing).
- `style.css`: Clean, bright Light Theme with soft shadows and tactile responsive elements.
- `index.html`: Semantic layout with tab bar and panels.
- `app.js`: Audio synthesis, drag/match game mechanics, evaluation algorithms.

---

## The 6 Core Interactive Mechanics

### 1. Vocabulary & Grammar Handbook (50 Từ Vựng & Lý Thuyết)
- **Speech Synthesis:** Uses browser native `window.speechSynthesis.speak()` with `en-US` or `en-GB` voice.
- **Card Data:** Word, IPA, POS tag, Vietnamese definition, natural collocation phrase, bilingual context example.
- **Search & Filter:** Instant live search query across word, meaning, and collocations; tab chips to filter by Unit.
- **Grammar Modules:** Rendered via `mod.theoryHtml`, showing formula cards, signal badges, and the 4 classic rewrite formulas.

### 2. Collocation Matching Board (Trò Chơi Ghép Cặp Từ)
- **Mechanic:** Left column displays randomized verbs; right column displays randomized noun phrases.
- **Interaction:** Tap/click left verb -> tap/click right noun.
- **Feedback:**
  - Correct pair: Turns emerald green (`.matched`), plays soft chord chime via Web Audio API.
  - Incorrect pair: Turns red (`.wrong`), shakes, resets selection, plays low tone.
  - Complete: Shows congratulatory celebration banner and score.

### 3. Odd One Out Collocation (Phát Hiện Kết Hợp Từ Sai)
- **Mechanic:** Shows a central target noun phrase and 4 verbs. 1 verb is unnatural or ungrammatical.
- **Interaction:** Student clicks the unnatural verb.
- **Feedback:** Immediate explanation of why that collocation is incorrect and which verb should be used instead.

### 4. Word Family Tree & Open Cloze (Cây Từ Loại & Điền Dạng Đúng)
- **Word Tree:** Shows root word in center badge (`sustain`, `infect`, `nutrient`, `live`), with surrounding derivative cards (Noun, Verb, Adjective, Adverb, Negative forms).
- **Open Cloze:** Sentences with missing derivative and root word in brackets. Instant validation with case-insensitive check, hint button revealing first 3 letters.

### 5. Active Recall with First-Letter Clues (Đoán Chữ Siêu Tốc)
- **Mechanic:** English-to-English definition + sentence with missing word + first-letter clue (`e.g. l... for longevity`).
- **Interaction:** Student types full word and clicks "Kiểm Tra" (or Enter).
- **Feedback:** Reveals pronunciation audio button upon correct answer.

### 6. Interactive Sentence Writing (Thử Thách Đặt Câu Tương Tác)
- **Mechanic:** Real-life communicative or argumentative prompt requiring a target keyword (e.g. `taste`, `should`).
- **Automated Validation:**
  - Length check ($\ge 4$ words).
  - Target keyword inclusion (case-insensitive).
  - Pitfall detector: Flags forbidden error patterns (e.g., `tastes deliciously`, `mustn't` used for lack of necessity).
  - Instant teacher model answer displayed from Thầy Thức.
