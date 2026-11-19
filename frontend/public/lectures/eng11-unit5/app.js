/**
 * INTERACTIVE LECTURE STUDIO - LOGIC & CONTROLLER
 * Subject: Tiếng Anh 11 - Unit 5: Global Warming
 * Học sinh: Bạn Thái | Giáo viên: Thầy Thức
 */

(function () {
  'use strict';

  // --- AUDIO SYNTHESIS & SOUND FX UTILITY ---
  const AudioEngine = {
    ctx: null,
    initCtx() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
    },
    speak(text) {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.92;
      const voices = window.speechSynthesis.getVoices();
      const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
      if (enVoice) utterance.voice = enVoice;
      window.speechSynthesis.speak(utterance);
    },
    playSuccessSound() {
      try {
        this.initCtx();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } catch (e) {}
    },
    playErrorSound() {
      try {
        this.initCtx();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(150, now + 0.2);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } catch (e) {}
    }
  };

  // --- SECTION TABS SWITCHER ---
  function initTabs() {
    const tabBtns = document.querySelectorAll('.tabs-bar .tab-btn');
    const tabPanels = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');
        if (!targetId) return;

        tabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        tabPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const activePanel = document.getElementById(targetId);
        if (activePanel) activePanel.classList.add('active');

        // Scroll slightly up to header
        window.scrollTo({ top: 120, behavior: 'smooth' });
      });
    });
  }

  // --- SECTION 1: VOCABULARY & GRAMMAR COMPENDIUM ---
  function initVocabHub() {
    const vocabGrid = document.getElementById('vocabGrid');
    const emptyState = document.getElementById('vocabEmptyState');
    const searchInput = document.getElementById('vocabSearchInput');
    const filterGroup = document.getElementById('filterButtonGroup');
    const statVocabCount = document.getElementById('statVocabCount');

    if (!vocabGrid || !LECTURE_DATA.vocabList) return;

    let currentFilter = 'all';
    let searchQuery = '';

    if (statVocabCount) {
      statVocabCount.textContent = `${LECTURE_DATA.vocabList.length} Từ`;
    }

    function renderVocabList() {
      const q = searchQuery.toLowerCase().trim();

      const filtered = LECTURE_DATA.vocabList.filter(item => {
        const matchesUnit = currentFilter === 'all' || item.unit.toString() === currentFilter;
        if (!matchesUnit) return false;
        if (!q) return true;
        return (
          item.word.toLowerCase().includes(q) ||
          item.meaning.toLowerCase().includes(q) ||
          item.ipa.toLowerCase().includes(q) ||
          (item.collocation && item.collocation.toLowerCase().includes(q))
        );
      });

      if (filtered.length === 0) {
        vocabGrid.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
      }

      if (emptyState) emptyState.style.display = 'none';

      vocabGrid.innerHTML = filtered.map(item => {
        const unitClass = `unit-${item.unit}-tag`;
        const unitShort = item.unitName;
        return `
          <div class="vocab-card" data-word="${escapeHtml(item.word)}">
            <div class="vocab-card-header">
              <div class="vocab-meta-left">
                <span class="vocab-id-badge">#${item.id}</span>
                <span class="unit-tag ${unitClass}">${escapeHtml(unitShort)}</span>
              </div>
              <button class="vocab-audio-btn" data-speak="${escapeHtml(item.word)}" title="Nghe phát âm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                <span>US</span>
              </button>
            </div>

            <div class="vocab-word-row">
              <h3 class="vocab-term">${escapeHtml(item.word)}</h3>
              <span class="vocab-type-badge">${escapeHtml(item.type)}</span>
            </div>

            <div class="vocab-ipa-row">
              <span class="vocab-ipa-text">${escapeHtml(item.ipa)}</span>
            </div>

            <div class="vocab-meaning-box">
              <p class="vocab-meaning-text">${escapeHtml(item.meaning)}</p>
            </div>

            ${item.collocation ? `
              <div class="vocab-colloc-box">
                <span class="vocab-colloc-label">Collocations / Cụm Cố Định:</span>
                <span class="vocab-colloc-text">${escapeHtml(item.collocation)}</span>
              </div>
            ` : ''}

            <div class="vocab-example-box">
              <p class="vocab-example-en">"${escapeHtml(item.example)}"</p>
              <p class="vocab-example-vi">➔ ${escapeHtml(item.exampleVi)}</p>
            </div>
          </div>
        `;
      }).join('');

      // Attach audio buttons
      vocabGrid.querySelectorAll('.vocab-audio-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const word = btn.getAttribute('data-speak');
          if (word) AudioEngine.speak(word);
        });
      });
    }

    // Search events
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderVocabList();
      });
    }

    // Filter chip buttons
    if (filterGroup) {
      const chips = filterGroup.querySelectorAll('.filter-chip');
      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          chips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          currentFilter = chip.getAttribute('data-unit') || 'all';
          renderVocabList();
        });
      });
    }

    renderVocabList();
  }

  // --- SECTION 2: GRAMMAR ACCORDIONS & INTERACTIVE QUICK QUIZ ---
  function initGrammarAccordion() {
    const container = document.getElementById('grammarAccordionContainer');
    if (!container || !LECTURE_DATA.grammarModules) return;

    container.innerHTML = LECTURE_DATA.grammarModules.map((mod, idx) => {
      const isFirst = idx === 0;
      return `
        <div class="accordion-item ${isFirst ? 'open' : ''}" id="mod-${mod.id}">
          <button class="accordion-header" type="button" aria-expanded="${isFirst ? 'true' : 'false'}">
            <div class="acc-title-left">
              <span class="acc-num-pill">${mod.id}</span>
              <span class="acc-title-text">${escapeHtml(mod.title)}</span>
            </div>
            <span class="acc-chevron">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
            </span>
          </button>

          <div class="accordion-content">
            <div class="acc-inner-body">
              <!-- Formula Highlight Card -->
              <div class="grammar-formula-card">
                <div class="formula-main">
                  <span class="formula-badge">Công Thức Cốt Lõi</span>
                  <div class="formula-code">${escapeHtml(mod.formula)}</div>
                </div>
                ${mod.equivalent ? `
                  <div class="formula-equiv">
                    <span class="equiv-label">Bản chất chuyển đổi:</span>
                    <span class="equiv-text">${escapeHtml(mod.equivalent)}</span>
                  </div>
                ` : ''}
              </div>

              <!-- Rules & Principles -->
              <div class="grammar-rules-list">
                <h4 class="rules-heading">📌 Quy Tắc Vàng &amp; Dấu Hiệu Nhận Biết:</h4>
                <ul>
                  ${mod.rules.map(r => `<li>${escapeHtml(r)}</li>`).join('')}
                </ul>
              </div>

              <!-- Exam Traps (8.5+) -->
              ${mod.traps ? `
                <div class="grammar-traps-card">
                  <div class="traps-icon">⚠️</div>
                  <div class="traps-text">
                    <strong>Cảnh Báo Bẫy Thi Cử 8.5+:</strong> ${escapeHtml(mod.traps)}
                  </div>
                </div>
              ` : ''}

              <!-- Practical Examples with Breakdown -->
              <div class="grammar-examples-section">
                <h4 class="examples-heading">💡 Ví Dụ Thực Chiến &amp; Phân Tích:</h4>
                <div class="examples-grid">
                  ${mod.examples.map(ex => `
                    <div class="example-item-card">
                      <p class="ex-en">${escapeHtml(ex.en)}</p>
                      <p class="ex-vi">${escapeHtml(ex.vi)}</p>
                      <p class="ex-short"><strong>${escapeHtml(ex.short)}</strong></p>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Interactive Quick Quiz Widget -->
              ${mod.quickQuiz ? `
                <div class="quick-quiz-widget" id="quick-quiz-${mod.id}">
                  <div class="quiz-widget-header">
                    <span class="quiz-pill">🎯 BÀI TẬP NHANH VẬN DỤNG NGAY</span>
                    <span class="quiz-subtext">Click chọn đáp án để nhận phản hồi và giải thích tức thì!</span>
                  </div>

                  <div class="quiz-question-box">
                    <p class="quiz-question-text">${escapeHtml(mod.quickQuiz.question)}</p>
                  </div>

                  <div class="quiz-options-grid">
                    ${mod.quickQuiz.options.map(opt => `
                      <button class="quiz-opt-btn" data-opt-id="${opt.id}" data-mod-id="${mod.id}">
                        <span class="opt-letter">${opt.id}</span>
                        <span class="opt-content">${escapeHtml(opt.text)}</span>
                      </button>
                    `).join('')}
                  </div>

                  <div class="quiz-feedback-box" id="quizFeedback-${mod.id}" style="display: none;">
                    <div class="feedback-status-row">
                      <span class="feedback-badge" id="feedbackBadge-${mod.id}"></span>
                    </div>
                    <div class="feedback-explanation" id="feedbackText-${mod.id}"></div>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Accordion toggle click handlers
    container.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const wasOpen = item.classList.contains('open');

        // Toggle self
        if (wasOpen) {
          item.classList.remove('open');
          header.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('open');
          header.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Quick Quiz button click handlers
    container.querySelectorAll('.quiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modId = parseInt(btn.getAttribute('data-mod-id'), 10);
        const selectedId = btn.getAttribute('data-opt-id');
        const moduleData = LECTURE_DATA.grammarModules.find(m => m.id === modId);
        if (!moduleData || !moduleData.quickQuiz) return;

        const widget = document.getElementById(`quick-quiz-${modId}`);
        const allOpts = widget.querySelectorAll('.quiz-opt-btn');
        const feedbackBox = document.getElementById(`quizFeedback-${modId}`);
        const feedbackBadge = document.getElementById(`feedbackBadge-${modId}`);
        const feedbackText = document.getElementById(`feedbackText-${modId}`);

        const correctId = moduleData.quickQuiz.correct;
        const isCorrect = selectedId === correctId;

        allOpts.forEach(b => {
          b.classList.remove('correct-opt', 'wrong-opt');
          b.disabled = true;
          if (b.getAttribute('data-opt-id') === correctId) {
            b.classList.add('correct-opt');
          }
        });

        if (!isCorrect) {
          btn.classList.add('wrong-opt');
          AudioEngine.playErrorSound();
        } else {
          AudioEngine.playSuccessSound();
        }

        // Show feedback
        feedbackBox.style.display = 'block';
        if (isCorrect) {
          feedbackBadge.className = 'feedback-badge success';
          feedbackBadge.innerHTML = '🎉 CHÍNH XÁC! XUẤT SẮC!';
        } else {
          feedbackBadge.className = 'feedback-badge error';
          feedbackBadge.innerHTML = `❌ CHƯA ĐÚNG! ĐÁP ÁN ĐÚNG LÀ: <strong>${correctId}</strong>`;
        }
        feedbackText.innerHTML = `<strong>Thầy Thức hướng dẫn bạn Thái:</strong> ${escapeHtml(moduleData.quickQuiz.explanation)}`;
      });
    });
  }

  // --- SECTION 3: 3D DUAL-MODE FLASHCARDS ---
  function initFlashcard3D() {
    const mainCard = document.getElementById('mainFlashcard');
    const faceFront = document.getElementById('cardFaceFront');
    const faceBack = document.getElementById('cardFaceBack');
    const btnFlip = document.getElementById('btnFlipCard');
    const btnAudio = document.getElementById('btnAudioSpeak');
    const btnPrev = document.getElementById('btnPrevCard');
    const btnNext = document.getElementById('btnNextCard');
    const counterText = document.getElementById('fcCounterText');
    const progressFill = document.getElementById('fcProgressFill');
    const progressPct = document.getElementById('fcProgressPct');
    const btnModeEnVi = document.getElementById('btnModeEnVi');
    const btnModeViEn = document.getElementById('btnModeViEn');
    const btnViewDeck = document.getElementById('btnViewDeck');
    const btnViewGrid = document.getElementById('btnViewGrid');
    const btnFullscreen = document.getElementById('btnFullscreen');
    const deckContainer = document.getElementById('fcDeckContainer');
    const gridContainer = document.getElementById('fcGridContainer');
    const gridWrapper = document.getElementById('flashcardGrid');
    const filterChips = document.querySelectorAll('.fc-unit-filters .filter-chip');

    if (!mainCard || !faceFront || !faceBack || !LECTURE_DATA.vocabList) return;

    let currentIndex = 0;
    let isFlipped = false;
    let currentMode = 'en-vi'; // 'en-vi' | 'vi-en'
    let currentView = 'deck'; // 'deck' | 'grid'
    let filterUnit = 'all';

    const originalList = LECTURE_DATA.vocabList;
    let activeCards = [...originalList];

    function filterCards() {
      if (filterUnit === 'all') {
        activeCards = [...originalList];
      } else {
        activeCards = originalList.filter(item => item.unit.toString() === filterUnit);
      }
      currentIndex = 0;
      isFlipped = false;
      renderCurrentCard();
      renderGridView();
    }

    function renderCurrentCard() {
      if (activeCards.length === 0) {
        faceFront.innerHTML = '<div class="fc-empty">Không có thẻ nào phù hợp bộ lọc.</div>';
        faceBack.innerHTML = '';
        return;
      }

      if (currentIndex >= activeCards.length) currentIndex = activeCards.length - 1;
      if (currentIndex < 0) currentIndex = 0;

      const item = activeCards[currentIndex];
      const total = activeCards.length;
      const progressPercent = Math.round(((currentIndex + 1) / total) * 100);

      if (counterText) counterText.textContent = `Thẻ ${currentIndex + 1} / ${total}`;
      if (progressFill) progressFill.style.width = `${progressPercent}%`;
      if (progressPct) progressPct.textContent = `${progressPercent}%`;

      // Always reset flip animation state when changing card
      mainCard.classList.remove('is-flipped');
      isFlipped = false;

      const unitShort = item.unitName;

      if (currentMode === 'en-vi') {
        // Mode 1: English on FRONT -> Vietnamese on BACK
        faceFront.innerHTML = `
          <div class="fc-face-header">
            <span class="fc-tag">MẶT TRƯỚC: TIẾNG ANH (US)</span>
            <span class="unit-tag unit-${item.unit}-tag">${escapeHtml(unitShort)}</span>
          </div>

          <div class="fc-face-center">
            <span class="fc-type-label">${escapeHtml(item.type)}</span>
            <h2 class="fc-term-display">${escapeHtml(item.word)}</h2>
            <div class="fc-ipa-badge">${escapeHtml(item.ipa)}</div>
          </div>

          <div class="fc-face-footer">
            ${item.collocation ? `
              <div class="fc-hint-colloc">
                <span class="hint-label">Collocation:</span>
                <span class="hint-val">${escapeHtml(item.collocation)}</span>
              </div>
            ` : ''}
            <div class="fc-prompt-flip">
              <span>👉 Bấm Space hoặc nhấp thẻ để xem nghĩa tiếng Việt &amp; ví dụ</span>
            </div>
          </div>
        `;

        faceBack.innerHTML = `
          <div class="fc-face-header">
            <span class="fc-tag success">MẶT SAU: NGHĨA &amp; VÍ DỤ SONG NGỮ</span>
            <span class="fc-term-mini">${escapeHtml(item.word)}</span>
          </div>

          <div class="fc-face-center">
            <div class="fc-meaning-hero">${escapeHtml(item.meaning)}</div>
            <div class="fc-example-card">
              <p class="fc-ex-en">"${escapeHtml(item.example)}"</p>
              <p class="fc-ex-vi">➔ ${escapeHtml(item.exampleVi)}</p>
            </div>
          </div>

          <div class="fc-face-footer">
            <button class="fc-speak-in-card" data-word="${escapeHtml(item.word)}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
              <span>Nghe lại phát âm (${escapeHtml(item.word)})</span>
            </button>
          </div>
        `;
      } else {
        // Mode 2: Vietnamese on FRONT -> English on BACK
        faceFront.innerHTML = `
          <div class="fc-face-header">
            <span class="fc-tag highlight">MẶT TRƯỚC: NGHĨA TIẾNG VIỆT</span>
            <span class="unit-tag unit-${item.unit}-tag">${escapeHtml(unitShort)}</span>
          </div>

          <div class="fc-face-center">
            <span class="fc-type-label">${escapeHtml(item.type)}</span>
            <h2 class="fc-meaning-display">${escapeHtml(item.meaning)}</h2>
            ${item.collocation ? `
              <div class="fc-colloc-hint-badge">
                <span>Gợi ý cụm: <strong>${escapeHtml(item.collocation)}</strong></span>
              </div>
            ` : ''}
          </div>

          <div class="fc-face-footer">
            <div class="fc-prompt-flip">
              <span>👉 Hãy thử đoán từ tiếng Anh trong đầu rồi bấm Lật Thẻ</span>
            </div>
          </div>
        `;

        faceBack.innerHTML = `
          <div class="fc-face-header">
            <span class="fc-tag success">MẶT SAU: TỪ TIẾNG ANH &amp; PHIÊN ÂM</span>
            <span class="fc-term-mini">${escapeHtml(item.meaning)}</span>
          </div>

          <div class="fc-face-center">
            <h2 class="fc-term-display">${escapeHtml(item.word)}</h2>
            <div class="fc-ipa-badge">${escapeHtml(item.ipa)}</div>
            <div class="fc-example-card" style="margin-top: 16px;">
              <p class="fc-ex-en">"${escapeHtml(item.example)}"</p>
              <p class="fc-ex-vi">➔ ${escapeHtml(item.exampleVi)}</p>
            </div>
          </div>

          <div class="fc-face-footer">
            <button class="fc-speak-in-card" data-word="${escapeHtml(item.word)}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
              <span>Phát âm từ này (US)</span>
            </button>
          </div>
        `;
      }

      // Re-bind in-card speak button
      faceBack.querySelectorAll('.fc-speak-in-card').forEach(b => {
        b.addEventListener('click', (e) => {
          e.stopPropagation();
          const w = b.getAttribute('data-word');
          if (w) AudioEngine.speak(w);
        });
      });
    }

    function renderGridView() {
      if (!gridWrapper) return;
      if (activeCards.length === 0) {
        gridWrapper.innerHTML = '<div class="fc-empty">Không có thẻ nào phù hợp bộ lọc.</div>';
        return;
      }

      gridWrapper.innerHTML = activeCards.map((item, idx) => {
        const unitShort = item.unitName;
        return `
          <div class="fc-grid-card" data-index="${idx}">
            <div class="grid-card-inner">
              <!-- FRONT -->
              <div class="grid-card-front">
                <div class="grid-card-top">
                  <span class="grid-card-num">#${idx + 1}</span>
                  <span class="unit-tag unit-${item.unit}-tag">${escapeHtml(unitShort)}</span>
                </div>
                ${currentMode === 'en-vi' ? `
                  <h3 class="grid-card-term">${escapeHtml(item.word)}</h3>
                  <div class="grid-card-ipa">${escapeHtml(item.ipa)}</div>
                  <div class="grid-card-type">${escapeHtml(item.type)}</div>
                  <div class="grid-card-footer">
                    <span>Nhấp để lật nghĩa ➔</span>
                  </div>
                ` : `
                  <h3 class="grid-card-meaning">${escapeHtml(item.meaning)}</h3>
                  <div class="grid-card-type">${escapeHtml(item.type)}</div>
                  <div class="grid-card-footer">
                    <span>Nhấp để xem từ tiếng Anh ➔</span>
                  </div>
                `}
              </div>

              <!-- BACK -->
              <div class="grid-card-back">
                <div class="grid-card-top">
                  <span class="grid-card-num">#${idx + 1}</span>
                  <span class="unit-tag unit-${item.unit}-tag">${escapeHtml(unitShort)}</span>
                </div>
                ${currentMode === 'en-vi' ? `
                  <div class="grid-card-meaning-back">${escapeHtml(item.meaning)}</div>
                  <div class="grid-card-colloc"><strong>Colloc:</strong> ${escapeHtml(item.collocation || '---')}</div>
                  <div class="grid-card-actions">
                    <button class="grid-speak-btn" data-word="${escapeHtml(item.word)}">🔊 Nghe</button>
                  </div>
                ` : `
                  <h3 class="grid-card-term-back">${escapeHtml(item.word)}</h3>
                  <div class="grid-card-ipa">${escapeHtml(item.ipa)}</div>
                  <div class="grid-card-colloc"><strong>Colloc:</strong> ${escapeHtml(item.collocation || '---')}</div>
                  <div class="grid-card-actions">
                    <button class="grid-speak-btn" data-word="${escapeHtml(item.word)}">🔊 Nghe</button>
                  </div>
                `}
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Click to flip on individual grid cards
      gridWrapper.querySelectorAll('.fc-grid-card').forEach(gc => {
        gc.addEventListener('click', () => {
          gc.classList.toggle('is-flipped');
        });
      });

      // Speak buttons in grid
      gridWrapper.querySelectorAll('.grid-speak-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const w = btn.getAttribute('data-word');
          if (w) AudioEngine.speak(w);
        });
      });
    }

    // Toggle Flip
    function toggleFlip() {
      isFlipped = !isFlipped;
      mainCard.classList.toggle('is-flipped', isFlipped);
    }

    // Next Card
    function nextCard() {
      if (currentIndex < activeCards.length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0; // loop back to first
      }
      renderCurrentCard();
    }

    // Prev Card
    function prevCard() {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = activeCards.length - 1; // loop to last
      }
      renderCurrentCard();
    }

    // Speak Current Card
    function speakCurrent() {
      if (activeCards[currentIndex]) {
        AudioEngine.speak(activeCards[currentIndex].word);
      }
    }

    // Event Listeners for controls
    mainCard.addEventListener('click', toggleFlip);
    btnFlip.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFlip();
    });
    btnAudio.addEventListener('click', (e) => {
      e.stopPropagation();
      speakCurrent();
    });
    btnNext.addEventListener('click', (e) => {
      e.stopPropagation();
      nextCard();
    });
    btnPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      prevCard();
    });

    // Mode Switcher Buttons
    btnModeEnVi.addEventListener('click', () => {
      btnModeEnVi.classList.add('active');
      btnModeViEn.classList.remove('active');
      currentMode = 'en-vi';
      renderCurrentCard();
      renderGridView();
    });

    btnModeViEn.addEventListener('click', () => {
      btnModeViEn.classList.add('active');
      btnModeEnVi.classList.remove('active');
      currentMode = 'vi-en';
      renderCurrentCard();
      renderGridView();
    });

    // View Switcher Buttons
    btnViewDeck.addEventListener('click', () => {
      btnViewDeck.classList.add('active');
      btnViewGrid.classList.remove('active');
      currentView = 'deck';
      deckContainer.style.display = 'block';
      gridContainer.style.display = 'none';
    });

    btnViewGrid.addEventListener('click', () => {
      btnViewGrid.classList.add('active');
      btnViewDeck.classList.remove('active');
      currentView = 'grid';
      deckContainer.style.display = 'none';
      gridContainer.style.display = 'block';
      renderGridView();
    });

    // Fullscreen Toggle
    btnFullscreen.addEventListener('click', () => {
      const wrapper = document.querySelector('.flashcard-panel-wrapper');
      if (!document.fullscreenElement) {
        if (wrapper.requestFullscreen) {
          wrapper.requestFullscreen();
        } else if (wrapper.webkitRequestFullscreen) {
          wrapper.webkitRequestFullscreen();
        }
        btnFullscreen.classList.add('in-fullscreen');
        btnFullscreen.querySelector('span').textContent = 'Thu Nhỏ (Esc)';
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
        btnFullscreen.classList.remove('in-fullscreen');
        btnFullscreen.querySelector('span').textContent = 'Toàn Màn Hình';
      }
    });

    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        btnFullscreen.classList.remove('in-fullscreen');
        btnFullscreen.querySelector('span').textContent = 'Toàn Màn Hình';
      }
    });

    // Filter Chips
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        filterUnit = chip.getAttribute('data-unit') || 'all';
        filterCards();
      });
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      // Don't trigger if typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const activeTab = document.querySelector('.tab-content.active');
      if (!activeTab || activeTab.id !== 'tab-flashcards') return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          toggleFlip();
          break;
        case 'ArrowRight':
        case 'KeyD':
          e.preventDefault();
          nextCard();
          break;
        case 'ArrowLeft':
        case 'KeyA':
          e.preventDefault();
          prevCard();
          break;
        case 'KeyP':
          e.preventDefault();
          speakCurrent();
          break;
        case 'KeyF':
          e.preventDefault();
          btnFullscreen.click();
          break;
        case 'Digit1':
          e.preventDefault();
          btnModeEnVi.click();
          break;
        case 'Digit2':
          e.preventDefault();
          btnModeViEn.click();
          break;
      }
    });

    // Initial render
    renderCurrentCard();
  }

  // --- HTML ESCAPE HELPER ---
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- DOM READY INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initVocabHub();
    initGrammarAccordion();
    initFlashcard3D();
  });
})();
