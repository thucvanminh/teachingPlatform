# Interactive Lecture Studio Specification (Quy Chuẩn Phòng Học Tương Tác)

Whenever creating an interactive lecture, it must be hosted in `frontend/public/lectures/<slug>/` and contain 4 core files:
- `data.js`: Structured content matrix (Vocab, Grammar, Collocations, Word Tree, Recall, Writing).
- `style.css`: Clean, bright Light Theme with soft shadows and tactile responsive elements.
- `index.html`: Semantic layout with tab bar and panels.
- `app.js`: Audio synthesis, drag/match game mechanics, evaluation algorithms.

---

## 1. Chuẩn Hóa Khung Dữ Liệu (The Strict Data Contract)

> [!CAUTION]
> **Bài học xương máu:** Các trường (`fields`) giữa `data.js` và `app.js` phải khớp 100%. Nếu sai tên trường hoặc thiếu `id`, giao diện sẽ gặp lỗi `undefined` hoặc `NaN` và khung hiển thị sẽ bị **bỏ trống (blank)**!

### Cấu trúc chuẩn của `LECTURE_DATA` (trong `data.js`):

```javascript
const LECTURE_DATA = {
  title: "...",
  subject: "...",
  teacher: "Thầy Thức",

  // 1. TỪ VỰNG CỐT LÕI (50 TỪ VỰNG)
  vocabList: [
    {
      id: 1, // BẮT BUỘC: Số nguyên dương
      unit: 1, // 1, 2, hoặc 3
      unitName: "Unit 1: A Long and Healthy Life",
      word: "Longevity",
      ipa: "/lɒnˈdʒevəti/",
      pos: "noun",
      meaning: "Tuổi thọ, sự sống lâu",
      collocation: "promote longevity / achieve longevity",
      example: "A balanced diet and regular exercise are key factors that promote longevity.",
      exampleVi: "Chế độ ăn cân bằng và tập thể dục đều đặn là những yếu tố then chốt giúp nâng cao tuổi thọ."
    }
  ],

  // 2. CHUYÊN ĐỀ NGỮ PHÁP (3 MODULES)
  grammarModules: [
    {
      id: "gram1", // BẮT BUỘC: chuỗi ID
      title: "1. Thì Quá khứ đơn vs. Hiện tại hoàn thành",
      focus: "Trọng tâm Unit 1 - Bẫy nhận biết thời gian trong đề thi",
      theoryHtml: `...toàn bộ thẻ HTML đẹp mắt (past-card, perfect-card, transform-formula-box)...` // BẮT BUỘC: app.js sẽ render trực tiếp theoryHtml này!
    }
  ],

  // 3. COLLOCATION MATCHING PAIRS (8 CẶP)
  collocationPairs: [
    {
      id: 1, // BẮT BUỘC: Số nguyên để ghép cặp với cột danh từ
      verb: "cut down on",
      noun: "fatty foods and sugary drinks",
      meaning: "(cắt giảm thức ăn dầu mỡ & đồ ngọt)"
    }
  ],

  // 3B. ODD-ONE-OUT COLLOCATION (4 CÂU)
  oddOneOut: [
    {
      id: 1,
      nounPhrase: "________ the generation gap",
      options: ["bridge", "narrow", "widen", "prescribe"], // Mảng 4 chuỗi ký tự (KHÔNG dùng mảng object)
      wrongIndex: 3, // BẮT BUỘC: Index (0-3) của từ SAI cần tìm
      explanation: "Chính xác! Ta dùng 'bridge/narrow/widen the generation gap'. 'prescribe' chỉ dùng cho thuốc kháng sinh!"
    }
  ],

  // 4. WORD FAMILY TREE (4 GỐC TỪ)
  wordFamilyRoots: [
    {
      id: 1,
      root: "SUSTAIN",
      pos: "verb",
      meaning: "duy trì, chống đỡ",
      derivatives: [
        {
          word: "sustainability", // BẮT BUỘC: Dùng tên trường 'word' (KHÔNG dùng 'form')
          pos: "noun",
          vi: "sự bền vững môi trường"
        },
        {
          word: "sustainable",
          pos: "adjective",
          vi: "bền vững, thân thiện sinh thái"
        }
      ]
    }
  ],

  // 4B. OPEN CLOZE WORD FORMATION (5 CÂU)
  openCloze: [
    {
      id: 1, // BẮT BUỘC: Số nguyên để tìm kiếm
      sentence: "It is crucial to follow a _________ diet containing all vital vitamins. (BALANCE)",
      root: "BALANCE",
      expectedAnswer: "balanced", // BẮT BUỘC: Dùng tên trường 'expectedAnswer' (chữ thường)
      explanation: "Trước danh từ 'diet' cần một TÍNH TỪ mang nghĩa 'cân bằng' ➔ balanced."
    }
  ],

  // 5. ACTIVE RECALL FIRST-LETTER CLUE (5 CÂU)
  activeRecall: [
    {
      id: 1, // BẮT BUỘC: Số nguyên
      sentence: "Modern city planners are building dedicated p_____________ zones where all motor vehicles are banned.",
      clue: "p", // BẮT BUỘC: Chữ cái đầu gợi ý (ví dụ: 'p')
      targetWord: "pedestrian", // BẮT BUỘC: Từ cần gõ (chữ thường)
      ipa: "/pəˈdestriən/",
      vi: "Người đi bộ / khu vực đi bộ",
      definition: "A person walking rather than travelling in a vehicle." // BẮT BUỘC: Dùng 'definition' (KHÔNG dùng 'def')
    }
  ],

  // 6. INTERACTIVE SENTENCE WRITING (4 THỬ THÁCH)
  writingChallenges: [
    {
      id: 1, // BẮT BUỘC: Số nguyên (1, 2, 3...) để tránh lỗi parseInt ra NaN
      keyword: "cut down on",
      prompt: "Hãy viết 1 câu khuyên bạn bè 'cắt giảm đồ ngọt hoặc đồ ăn nhanh' dùng 'cut down on'.",
      requiredWords: ["cut down on"],
      forbiddenWords: ["cut down at", "cut down in"], // Bẫy cần bắt lỗi
      modelAnswer: "You should cut down on fast food and sugary drinks to live a healthier life."
    }
  ]
};
```

---

## 2. Các Lỗi Thường Gặp Phải Tránh (Anti-Patterns Checklist)

| Lỗi sai từng gặp | Hậu quả trên giao diện | Cách khắc phục chuẩn |
| :--- | :--- | :--- |
| **`app.js` kiểm tra `mod.id === 'tenses'`** nhưng trong `data.js` ID là `"gram1"` | Toàn bộ nội dung lý thuyết ngữ pháp bị rỗng trắng (blank accordion) | `app.js` luôn render trực tiếp `mod.theoryHtml`, không hardcode so sánh ID. |
| **`collocationPairs` thiếu trường `id`** | Cột trái và cột phải đều có `data-id="undefined"`, trò chơi nối từ tê liệt | Bắt buộc đánh số `id: 1, 2, 3...` trên từng cặp. |
| **`oddOneOut` dùng `options: [{ word, isOdd }]`** | Giao diện nút hiển thị `[object Object]` và không nhận sự kiện click | `options` phải là mảng chuỗi `["A", "B", "C", "D"]` kèm `wrongIndex: number`. |
| **`wordFamilyRoots` dùng `d.form` thay vì `d.word`** | Các nhánh từ loại bị trống rỗng chữ | Đồng bộ tên trường là `d.word`. |
| **`openCloze` dùng `answer` thay vì `expectedAnswer`** | Bấm kiểm tra luôn báo sai hoặc không tìm thấy câu hỏi | Đồng bộ `id: number` và `expectedAnswer: string`. |
| **`activeRecall` dùng `def` thay vì `definition`** | Hộp định nghĩa hiển thị `"undefined"`, không nhận diện được từ mục tiêu | Dùng đầy đủ `definition`, `targetWord` và `clue`. |
| **`writingChallenges` dùng `id: "w1"`** | `parseInt("w1", 10)` trả về `NaN`, câu hỏi không thể submit | Dùng số nguyên `id: 1, 2, 3...`. |
