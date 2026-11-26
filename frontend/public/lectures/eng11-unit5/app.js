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
      const enVoice = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Natural') ||
            v.name.includes('Google') ||
            v.name.includes('Samantha'))
      );
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
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1);
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2);
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

  function getGroupFallback(unit) {
    if (unit === 1) return 'Năng Lượng & Khí Thải';
    if (unit === 2) return 'Khí Quyển & Nóng Lên';
    return 'Hậu Quả & Bền Vững';
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return str
      .toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- SECTION TABS SWITCHER ---
  function initTabs() {
    const tabBtns = document.querySelectorAll('.tabs-bar .tab-btn');
    const tabPanels = document.querySelectorAll('.tab-content');

    function activateTab(targetId, shouldScroll) {
      tabBtns.forEach((b) => {
        const isTarget = b.getAttribute('data-tab') === targetId;
        b.classList.toggle('active', isTarget);
        b.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      });
      tabPanels.forEach((p) => {
        p.classList.toggle('active', p.id === targetId);
      });
      if (shouldScroll) {
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }
    }

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');
        if (!targetId) return;
        activateTab(targetId, true);
      });
    });

    // Quick jump from header grammar summary box to 6 Grammar Modules
    const grammarBox = document.getElementById('headerGrammarJump');
    if (grammarBox) {
      const jumpToGrammar = () => {
        activateTab('tab-vocab', false);
        setTimeout(() => {
          const section = document.getElementById('grammarSection');
          if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      };
      grammarBox.addEventListener('click', jumpToGrammar);
      grammarBox.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          jumpToGrammar();
        }
      });
    }

    // Respect URL hash on load (#tab-vocab or #tab-flashcards)
    if (window.location.hash === '#tab-vocab') {
      activateTab('tab-vocab', false);
    }
  }

  // --- SECTION 2: VOCABULARY & GRAMMAR HUB ---
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
      const filtered = LECTURE_DATA.vocabList.filter((item) => {
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

      if (statVocabCount) {
        statVocabCount.textContent = `${filtered.length} / ${LECTURE_DATA.vocabList.length} Từ`;
      }

      if (filtered.length === 0) {
        vocabGrid.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
      }

      if (emptyState) emptyState.style.display = 'none';

      vocabGrid.innerHTML = filtered
        .map((item) => {
          const unitClass = `unit-${item.unit}-tag`;
          const unitShort = item.unitName || getGroupFallback(item.unit);
          const pos = item.type || item.pos || '';
          return `
            <div class="vocab-card" data-word="${escapeHtml(item.word)}">
              <div>
                <div class="vocab-card-header">
                  <div class="vocab-meta-left">
                    <span class="vocab-id-badge">#${item.id}</span>
                    <span class="unit-tag ${unitClass}">${escapeHtml(unitShort)}</span>
                  </div>
                  <button type="button" class="audio-btn" title="Nghe phát âm chuẩn" data-speak="${escapeHtml(item.word)}">
                    🔊
                  </button>
                </div>
                <div class="vocab-word">
                  ${escapeHtml(item.word)}
                  ${pos ? `<span class="vocab-pos-inline">(${escapeHtml(pos)})</span>` : ''}
                </div>
                <div class="vocab-ipa">${escapeHtml(item.ipa)}</div>
                <div class="vocab-meaning">${escapeHtml(item.meaning)}</div>
              </div>

              <div>
                ${
                  item.collocation
                    ? `<div class="vocab-collocation-pill"><strong>Cụm từ:</strong> ${escapeHtml(item.collocation)}</div>`
                    : ''
                }
                <div class="vocab-example">
                  "${escapeHtml(item.example)}"
                  <div class="vocab-example-vi">${escapeHtml(item.exampleVi)}</div>
                </div>
              </div>
            </div>
          `;
        })
        .join('');

      vocabGrid.querySelectorAll('.audio-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const word = btn.getAttribute('data-speak');
          if (word) AudioEngine.speak(word);
        });
      });
    }

    searchInput?.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderVocabList();
    });

    filterGroup?.querySelectorAll('.filter-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        filterGroup.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        currentFilter = chip.getAttribute('data-unit') || 'all';
        renderVocabList();
      });
    });

    renderVocabList();
    renderGrammarCompendium();
  }

  function renderGrammarCompendium() {
    const container = document.getElementById('grammarContainer');
    const btnExpandAll = document.getElementById('btnExpandAllGrammar');
    const btnCollapseAll = document.getElementById('btnCollapseAllGrammar');

    if (!container || !LECTURE_DATA.grammarModules) return;

    container.innerHTML = LECTURE_DATA.grammarModules
      .map((mod, index) => {
        const isFirst = index === 0;
        const quiz = mod.quickQuiz;

        return `
          <div class="grammar-module-accordion ${isFirst ? 'is-open' : ''}" id="mod-${mod.id}">
            <button class="grammar-accordion-header" type="button" aria-expanded="${isFirst ? 'true' : 'false'}">
              <div class="acc-title-left">
                <span class="acc-num-pill">${mod.id}</span>
                <span class="acc-title-text">${escapeHtml(mod.title)}</span>
              </div>
              <span class="acc-chevron" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
              </span>
            </button>

            <div class="grammar-accordion-body" style="display: ${isFirst ? 'block' : 'none'};">
              <!-- Formula Highlight Card -->
              <div class="grammar-formula-card">
                <div class="formula-main">
                  <span class="formula-badge">Công Thức Cốt Lõi</span>
                  <div class="formula-code">${escapeHtml(mod.formula)}</div>
                </div>
                ${
                  mod.equivalent
                    ? `
                      <div class="formula-equiv">
                        <span class="equiv-label">Bản chất chuyển đổi:</span>
                        <span class="equiv-text">${escapeHtml(mod.equivalent)}</span>
                      </div>
                    `
                    : ''
                }
              </div>

              <!-- Golden Rules & Traps 2-Column / Stacked -->
              <div class="grammar-rules-card">
                <h4 class="grammar-block-heading">📌 Quy Tắc Vàng &amp; Dấu Hiệu Nhận Biết</h4>
                <ul class="grammar-rules-list">
                  ${mod.rules.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}
                </ul>
              </div>

              ${
                mod.traps
                  ? `
                    <div class="grammar-traps-card">
                      <span class="traps-icon" aria-hidden="true">⚠️</span>
                      <div class="traps-text">
                        <strong>Cảnh Báo Bẫy Thi Cử 8.5+:</strong> ${escapeHtml(mod.traps)}
                      </div>
                    </div>
                  `
                  : ''
              }

              <!-- Practical Examples -->
              <div class="grammar-examples-section">
                <h4 class="grammar-block-heading">💡 Ví Dụ Thực Chiến &amp; Phân Tích Chuyển Đổi</h4>
                <div class="examples-grid">
                  ${mod.examples
                    .map((ex) => {
                      const isTrapExample = ex.en.trim().startsWith('❌');
                      return `
                        <div class="example-item-card ${isTrapExample ? 'is-trap-example' : ''}">
                          <p class="ex-en ${isTrapExample ? 'ex-wrong' : ''}">${escapeHtml(ex.en)}</p>
                          <p class="ex-vi">${escapeHtml(ex.vi)}</p>
                          <div class="ex-short-pill">${escapeHtml(ex.short)}</div>
                        </div>
                      `;
                    })
                    .join('')}
                </div>
              </div>

              <!-- Interactive Quick Check Drill -->
              ${
                quiz
                  ? `
                    <div class="grammar-drills-container" id="quick-quiz-${mod.id}">
                      <div class="drills-header">
                        <div class="drills-title">
                          <span class="drills-icon">⚡</span>
                          <span>BÀI TẬP NHANH VẬN DỤNG NGAY (QUICK CHECK)</span>
                        </div>
                        <span class="drills-badge">Phản xạ tức thì</span>
                      </div>

                      <div class="drill-card" data-mod-id="${mod.id}">
                        <div class="drill-q-row">
                          <span class="drill-q-num">Câu ${mod.id}:</span>
                          <span class="drill-q-text">${escapeHtml(quiz.question)}</span>
                        </div>

                        <div class="drill-options-grid">
                          ${quiz.options
                            .map(
                              (opt) => `
                                <button type="button" class="drill-opt-btn" data-mod-id="${mod.id}" data-opt-id="${escapeHtml(opt.id)}">
                                  <span class="opt-letter">${escapeHtml(opt.id)}</span>
                                  <span class="opt-content">${escapeHtml(opt.text)}</span>
                                </button>
                              `
                            )
                            .join('')}
                        </div>

                        <div class="drill-explanation-box" id="quizFeedback-${mod.id}" style="display: none;">
                          <div class="drill-expl-top">
                            <div class="drill-expl-header" id="feedbackBadge-${mod.id}"></div>
                            <button type="button" class="drill-retry-btn" data-mod-id="${mod.id}">Làm lại</button>
                          </div>
                          <div class="drill-expl-text" id="feedbackText-${mod.id}"></div>
                        </div>
                      </div>
                    </div>
                  `
                  : ''
              }
            </div>
          </div>
        `;
      })
      .join('');

    function setAccordionState(accordionEl, open) {
      const header = accordionEl.querySelector('.grammar-accordion-header');
      const body = accordionEl.querySelector('.grammar-accordion-body');
      if (!header || !body) return;
      accordionEl.classList.toggle('is-open', open);
      body.style.display = open ? 'block' : 'none';
      header.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    container.querySelectorAll('.grammar-accordion-header').forEach((header) => {
      header.addEventListener('click', () => {
        const accordion = header.closest('.grammar-module-accordion');
        if (!accordion) return;
        const isOpen = accordion.classList.contains('is-open');
        setAccordionState(accordion, !isOpen);
      });
    });

    btnExpandAll?.addEventListener('click', () => {
      container.querySelectorAll('.grammar-module-accordion').forEach((acc) => {
        setAccordionState(acc, true);
      });
    });

    btnCollapseAll?.addEventListener('click', () => {
      container.querySelectorAll('.grammar-module-accordion').forEach((acc) => {
        setAccordionState(acc, false);
      });
    });

    // Quick Quiz Option handlers
    container.querySelectorAll('.drill-opt-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const modId = parseInt(btn.getAttribute('data-mod-id') || '0', 10);
        const selectedId = btn.getAttribute('data-opt-id');
        const moduleData = LECTURE_DATA.grammarModules.find((m) => m.id === modId);
        if (!moduleData || !moduleData.quickQuiz) return;

        const widget = document.getElementById(`quick-quiz-${modId}`);
        const card = widget?.querySelector('.drill-card');
        if (!widget || !card || card.classList.contains('answered')) return;

        const feedbackBox = document.getElementById(`quizFeedback-${modId}`);
        const feedbackBadge = document.getElementById(`feedbackBadge-${modId}`);
        const feedbackText = document.getElementById(`feedbackText-${modId}`);

        const correctId = moduleData.quickQuiz.correct;
        const isCorrect = selectedId === correctId;

        card.classList.add('answered');
        widget.querySelectorAll('.drill-opt-btn').forEach((b) => {
          b.disabled = true;
          if (b.getAttribute('data-opt-id') === correctId) {
            b.classList.add('is-correct');
          }
        });

        if (!isCorrect) {
          btn.classList.add('is-wrong');
          AudioEngine.playErrorSound();
          if (feedbackBadge) {
            feedbackBadge.innerHTML = `❌ <strong style="color:#b91c1c;">Chưa chính xác! Đáp án đúng là ${escapeHtml(correctId)}.</strong>`;
          }
          if (feedbackBox) feedbackBox.className = 'drill-explanation-box is-error';
        } else {
          AudioEngine.playSuccessSound();
          if (feedbackBadge) {
            feedbackBadge.innerHTML = '🎉 <strong style="color:#15803d;">Chính xác! Xuất sắc!</strong>';
          }
          if (feedbackBox) feedbackBox.className = 'drill-explanation-box is-success';
        }

        if (feedbackText) {
          feedbackText.innerHTML = `<strong>Thầy Thức hướng dẫn bạn Thái:</strong> ${escapeHtml(moduleData.quickQuiz.explanation)}`;
        }
        if (feedbackBox) {
          feedbackBox.style.display = 'block';
        }
      });
    });

    // Retry quick quiz handlers
    container.querySelectorAll('.drill-retry-btn').forEach((retryBtn) => {
      retryBtn.addEventListener('click', () => {
        const modId = parseInt(retryBtn.getAttribute('data-mod-id') || '0', 10);
        const widget = document.getElementById(`quick-quiz-${modId}`);
        const card = widget?.querySelector('.drill-card');
        const feedbackBox = document.getElementById(`quizFeedback-${modId}`);
        if (!widget || !card) return;

        card.classList.remove('answered');
        widget.querySelectorAll('.drill-opt-btn').forEach((b) => {
          b.disabled = false;
          b.classList.remove('is-correct', 'is-wrong');
        });
        if (feedbackBox) {
          feedbackBox.style.display = 'none';
        }
      });
    });
  }

  // --- SECTION 1: INTERACTIVE 3D FLASHCARDS (2-WAY SYSTEM) ---
  function initFlashcards() {
    const deckContainer = document.getElementById('fcDeckContainer');
    const gridContainer = document.getElementById('fcGridContainer');
    const fcCard = document.getElementById('fcCard');
    const fcFront = document.getElementById('fcFront');
    const fcBack = document.getElementById('fcBack');
    const progressFill = document.getElementById('fcProgressFill');
    const progressCounter = document.getElementById('fcProgressCounter');
    const prevBtn = document.getElementById('fcPrevBtn');
    const nextBtn = document.getElementById('fcNextBtn');
    const flipBtn = document.getElementById('fcFlipBtn');
    const speakBtn = document.getElementById('fcSpeakBtn');
    const shuffleBtn = document.getElementById('fcShuffleBtn');
    const resetOrderBtn = document.getElementById('fcResetOrderBtn');
    const btnModeEnVi = document.getElementById('btnModeEnVi');
    const btnModeViEn = document.getElementById('btnModeViEn');
    const viewDeckBtn = document.getElementById('fcViewDeckBtn');
    const viewGridBtn = document.getElementById('fcViewGridBtn');
    const filterChips = document.getElementById('fcFilterChips');
    const gridCards = document.getElementById('fcGridCards');
    const gridFlipAllBtn = document.getElementById('fcGridFlipAllBtn');
    const gridResetAllBtn = document.getElementById('fcGridResetAllBtn');
    const gridCountText = document.getElementById('fcGridCountText');

    if (!deckContainer || !LECTURE_DATA.vocabList) return;

    let mode = 'en-vi';
    let filterUnit = 'all';
    const originalList = [...LECTURE_DATA.vocabList];
    let activeCards = [...originalList];
    let currentIndex = 0;
    let isFlipped = false;

    function updateActiveCards() {
      activeCards =
        filterUnit === 'all'
          ? [...originalList]
          : originalList.filter((item) => item.unit.toString() === filterUnit);
      currentIndex = 0;
      isFlipped = false;
      render();
    }

    function renderDeck() {
      if (!fcCard || !fcFront || !fcBack) return;

      if (activeCards.length === 0) {
        fcFront.innerHTML =
          '<div class="fc-side-body"><div style="font-size:1.1rem; font-weight:700; color:var(--text-muted);">Không có thẻ nào trong nhóm này</div></div>';
        fcBack.innerHTML = fcFront.innerHTML;
        if (progressCounter) progressCounter.textContent = '0 / 0';
        if (progressFill) progressFill.style.width = '0%';
        return;
      }

      const item = activeCards[currentIndex];
      const total = activeCards.length;
      const progressPercent = Math.round(((currentIndex + 1) / total) * 100);

      if (progressCounter) progressCounter.textContent = `Thẻ ${currentIndex + 1} / ${total}`;
      if (progressFill) progressFill.style.width = `${progressPercent}%`;

      const panelWrapper = document.querySelector('.flashcard-panel-wrapper');
      if (panelWrapper) {
        panelWrapper.classList.toggle('mode-vi-en', mode === 'vi-en');
      }

      fcCard.classList.toggle('flipped', isFlipped);
      const unitShort = item.unitName || getGroupFallback(item.unit);
      const pos = item.type || item.pos || '';

      if (mode === 'en-vi') {
        fcFront.innerHTML = `
          <div class="fc-side-header">
            <span class="unit-tag unit-${item.unit}-tag">${escapeHtml(unitShort)}</span>
            <span class="fc-face-label fc-label-en">Mặt trước: Tiếng Anh</span>
            <button type="button" class="audio-btn fc-audio-inline" title="Phát âm chuẩn (Phím P)" data-speak="${escapeHtml(item.word)}">🔊</button>
          </div>
          <div class="fc-side-body">
            <div class="fc-word-main">${escapeHtml(item.word)}</div>
            <div class="fc-ipa-text">${escapeHtml(item.ipa)}</div>
            ${pos ? `<span class="fc-pos-badge">(${escapeHtml(pos)})</span>` : ''}
          </div>
          <div class="fc-side-footer">
            <span>Tiếng Anh 11 • Unit 5: Global Warming</span>
            <span class="fc-hint-action">Chạm để lật xem nghĩa Tiếng Việt 👆</span>
          </div>
        `;

        fcBack.innerHTML = `
          <div class="fc-side-header">
            <span class="fc-face-label fc-label-vi">Mặt sau: Nghĩa Tiếng Việt</span>
            <button type="button" class="audio-btn fc-audio-inline" title="Phát âm chuẩn (Phím P)" data-speak="${escapeHtml(item.word)}">🔊</button>
          </div>
          <div class="fc-side-body">
            <div class="fc-meaning-text">${escapeHtml(item.meaning)}</div>
            ${item.collocation ? `<div class="fc-colloc-box"><strong>Cụm từ:</strong> ${escapeHtml(item.collocation)}</div>` : ''}
            <div class="fc-example-box">
              <em>"${escapeHtml(item.example)}"</em>
              <div class="fc-example-vi-emerald">${escapeHtml(item.exampleVi)}</div>
            </div>
          </div>
          <div class="fc-side-footer">
            <span class="fc-flipped-done emerald">✓ Đã lật mở</span>
            <span class="fc-hint-action">Chạm để lật lại mặt trước 🔄</span>
          </div>
        `;
      } else {
        fcFront.innerHTML = `
          <div class="fc-side-header">
            <span class="unit-tag unit-${item.unit}-tag">${escapeHtml(unitShort)}</span>
            <span class="fc-face-label fc-label-vi">Mặt trước: Tiếng Việt</span>
            ${pos ? `<span class="fc-pos-badge">(${escapeHtml(pos)})</span>` : ''}
          </div>
          <div class="fc-side-body">
            <div class="fc-meaning-text">${escapeHtml(item.meaning)}</div>
            ${
              item.collocation
                ? `<div class="fc-colloc-box fc-colloc-amber"><strong>Gợi ý ngữ cảnh:</strong> ${escapeHtml(item.collocation)}</div>`
                : ''
            }
          </div>
          <div class="fc-side-footer">
            <span>Tiếng Anh 11 • Unit 5: Global Warming</span>
            <span class="fc-hint-action">Chạm để lật xem từ Tiếng Anh &amp; Phát âm 👆</span>
          </div>
        `;

        fcBack.innerHTML = `
          <div class="fc-side-header">
            <span class="fc-face-label fc-label-en">Mặt sau: Tiếng Anh &amp; Phát Âm</span>
            <button type="button" class="audio-btn fc-audio-inline" title="Phát âm chuẩn (Phím P)" data-speak="${escapeHtml(item.word)}">🔊</button>
          </div>
          <div class="fc-side-body">
            <div class="fc-word-main fc-word-blue">${escapeHtml(item.word)}</div>
            <div class="fc-ipa-text">${escapeHtml(item.ipa)}</div>
            ${pos ? `<span class="fc-pos-badge">(${escapeHtml(pos)})</span>` : ''}
            ${item.collocation ? `<div class="fc-colloc-box"><strong>Cụm từ:</strong> ${escapeHtml(item.collocation)}</div>` : ''}
            <div class="fc-example-box">
              <em>"${escapeHtml(item.example)}"</em>
              <div class="fc-example-vi-blue">${escapeHtml(item.exampleVi)}</div>
            </div>
          </div>
          <div class="fc-side-footer">
            <span class="fc-flipped-done blue">✓ Đã lật mở</span>
            <span class="fc-hint-action">Chạm để lật lại mặt trước 🔄</span>
          </div>
        `;
      }

      fcCard.querySelectorAll('.fc-audio-inline').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const word = btn.getAttribute('data-speak');
          if (word) AudioEngine.speak(word);
        });
      });
    }

    function renderGrid() {
      if (!gridCards) return;

      if (gridCountText) {
        gridCountText.textContent = `Hiển thị ${activeCards.length} thẻ flashcard (${
          mode === 'en-vi' ? 'Tiếng Anh ➔ Tiếng Việt' : 'Tiếng Việt ➔ Tiếng Anh'
        })`;
      }

      if (activeCards.length === 0) {
        gridCards.innerHTML =
          '<div class="fc-grid-empty"><p>Không có thẻ nào phù hợp bộ lọc.</p></div>';
        return;
      }

      gridCards.innerHTML = activeCards
        .map((item, idx) => {
          const unitShort = item.unitName || getGroupFallback(item.unit);
          const pos = item.type || item.pos || '';

          if (mode === 'en-vi') {
            return `
              <div class="fc-item-card" data-idx="${idx}">
                <div class="fc-item-inner">
                  <div class="fc-item-face fc-item-front">
                    <div class="fc-side-header">
                      <span class="unit-tag unit-${item.unit}-tag">${escapeHtml(unitShort)}</span>
                      <button type="button" class="audio-btn fc-grid-audio" title="Nghe phát âm" data-speak="${escapeHtml(item.word)}">🔊</button>
                    </div>
                    <div class="fc-grid-center">
                      <div class="fc-grid-word">${escapeHtml(item.word)}</div>
                      <div class="fc-grid-ipa">${escapeHtml(item.ipa)}</div>
                      ${pos ? `<span class="fc-pos-badge">(${escapeHtml(pos)})</span>` : ''}
                    </div>
                    <div class="fc-grid-foot-blue">Chạm để xem nghĩa 👆</div>
                  </div>

                  <div class="fc-item-face fc-item-back">
                    <div class="fc-side-header">
                      <span class="fc-face-label fc-label-vi">Nghĩa Tiếng Việt</span>
                      <button type="button" class="audio-btn fc-grid-audio" title="Nghe phát âm" data-speak="${escapeHtml(item.word)}">🔊</button>
                    </div>
                    <div class="fc-grid-center-left">
                      <div class="fc-grid-meaning-emerald">${escapeHtml(item.meaning)}</div>
                      ${
                        item.collocation
                          ? `<div class="fc-grid-colloc"><strong>Cụm:</strong> ${escapeHtml(item.collocation)}</div>`
                          : ''
                      }
                      <div class="fc-grid-ex">"${escapeHtml(item.example)}"</div>
                    </div>
                    <div class="fc-grid-foot-emerald">Chạm để lật lại 🔄</div>
                  </div>
                </div>
              </div>
            `;
          }

          return `
            <div class="fc-item-card" data-idx="${idx}">
              <div class="fc-item-inner">
                <div class="fc-item-face fc-item-front">
                  <div class="fc-side-header">
                    <span class="unit-tag unit-${item.unit}-tag">${escapeHtml(unitShort)}</span>
                    ${pos ? `<span class="fc-pos-badge">(${escapeHtml(pos)})</span>` : ''}
                  </div>
                  <div class="fc-grid-center">
                    <div class="fc-grid-meaning-amber">${escapeHtml(item.meaning)}</div>
                    ${
                      item.collocation
                        ? `<div class="fc-grid-colloc amber"><strong>Gợi ý:</strong> ${escapeHtml(item.collocation)}</div>`
                        : ''
                    }
                  </div>
                  <div class="fc-grid-foot-amber">Chạm để xem từ Tiếng Anh 👆</div>
                </div>

                <div class="fc-item-face fc-item-back">
                  <div class="fc-side-header">
                    <span class="fc-face-label fc-label-en">Tiếng Anh</span>
                    <button type="button" class="audio-btn fc-grid-audio" title="Nghe phát âm" data-speak="${escapeHtml(item.word)}">🔊</button>
                  </div>
                  <div class="fc-grid-center">
                    <div class="fc-grid-word blue">${escapeHtml(item.word)}</div>
                    <div class="fc-grid-ipa muted">${escapeHtml(item.ipa)}</div>
                    ${
                      item.collocation
                        ? `<div class="fc-grid-colloc blue"><strong>Cụm:</strong> ${escapeHtml(item.collocation)}</div>`
                        : ''
                    }
                    <div class="fc-grid-ex left">"${escapeHtml(item.example)}"</div>
                  </div>
                  <div class="fc-grid-foot-blue">Chạm để lật lại 🔄</div>
                </div>
              </div>
            </div>
          `;
        })
        .join('');

      gridCards.querySelectorAll('.fc-item-card').forEach((card) => {
        card.addEventListener('click', () => {
          card.classList.toggle('flipped');
        });
      });

      gridCards.querySelectorAll('.fc-grid-audio').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const word = btn.getAttribute('data-speak');
          if (word) AudioEngine.speak(word);
        });
      });
    }

    function render() {
      renderDeck();
      renderGrid();
    }

    function flipCard() {
      isFlipped = !isFlipped;
      if (fcCard) fcCard.classList.toggle('flipped', isFlipped);
    }

    function nextCard() {
      if (activeCards.length === 0) return;
      isFlipped = false;
      currentIndex = (currentIndex + 1) % activeCards.length;
      renderDeck();
    }

    function prevCard() {
      if (activeCards.length === 0) return;
      isFlipped = false;
      currentIndex = (currentIndex - 1 + activeCards.length) % activeCards.length;
      renderDeck();
    }

    function speakCurrentCard() {
      if (activeCards.length === 0) return;
      const word = activeCards[currentIndex]?.word;
      if (word) AudioEngine.speak(word);
    }

    fcCard?.addEventListener('click', flipCard);
    flipBtn?.addEventListener('click', flipCard);
    nextBtn?.addEventListener('click', nextCard);
    prevBtn?.addEventListener('click', prevCard);
    speakBtn?.addEventListener('click', speakCurrentCard);

    btnModeEnVi?.addEventListener('click', () => {
      if (mode === 'en-vi') return;
      mode = 'en-vi';
      btnModeEnVi.classList.add('active');
      btnModeViEn?.classList.remove('active');
      isFlipped = false;
      render();
    });

    btnModeViEn?.addEventListener('click', () => {
      if (mode === 'vi-en') return;
      mode = 'vi-en';
      btnModeViEn.classList.add('active');
      btnModeEnVi?.classList.remove('active');
      isFlipped = false;
      render();
    });

    viewDeckBtn?.addEventListener('click', () => {
      viewDeckBtn.classList.add('active');
      viewGridBtn?.classList.remove('active');
      deckContainer.style.display = 'block';
      if (gridContainer) gridContainer.style.display = 'none';
    });

    viewGridBtn?.addEventListener('click', () => {
      viewGridBtn.classList.add('active');
      viewDeckBtn?.classList.remove('active');
      deckContainer.style.display = 'none';
      if (gridContainer) gridContainer.style.display = 'block';
      renderGrid();
    });

    shuffleBtn?.addEventListener('click', () => {
      for (let i = activeCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [activeCards[i], activeCards[j]] = [activeCards[j], activeCards[i]];
      }
      currentIndex = 0;
      isFlipped = false;
      render();
    });

    resetOrderBtn?.addEventListener('click', () => {
      updateActiveCards();
    });

    filterChips?.querySelectorAll('.filter-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        filterChips.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        filterUnit = chip.getAttribute('data-unit') || 'all';
        updateActiveCards();
      });
    });

    gridFlipAllBtn?.addEventListener('click', () => {
      gridCards?.querySelectorAll('.fc-item-card').forEach((c) => c.classList.add('flipped'));
    });

    gridResetAllBtn?.addEventListener('click', () => {
      gridCards?.querySelectorAll('.fc-item-card').forEach((c) => c.classList.remove('flipped'));
    });

    const fullscreenBtn = document.getElementById('fcFullscreenBtn');
    const newTabBtn = document.getElementById('fcNewTabBtn');
    const exitFullscreenBtn = document.getElementById('fcExitFullscreenBtn');
    const floatFullscreenBtn = document.getElementById('fcFloatFullscreenBtn');
    const floatNewTabBtn = document.getElementById('fcFloatNewTabBtn');
    const floatingBar = document.getElementById('fcFloatingBar');

    function toggleFullscreen(forceState) {
      const isCurrentlyFullscreen = deckContainer.classList.contains('is-fullscreen');
      const targetState = typeof forceState === 'boolean' ? forceState : !isCurrentlyFullscreen;

      if (targetState) {
        deckContainer.classList.add('is-fullscreen');
        document.body.classList.add('fc-body-locked');
        if (fullscreenBtn) {
          fullscreenBtn.innerHTML = '<span>✕</span> Thoát toàn màn hình';
          fullscreenBtn.classList.add('active');
        }
        if (floatFullscreenBtn) {
          floatFullscreenBtn.innerHTML = '<span>✕</span> Thoát F';
        }
        if (!document.fullscreenElement && deckContainer.requestFullscreen) {
          deckContainer.requestFullscreen().catch(() => {});
        }
      } else {
        deckContainer.classList.remove('is-fullscreen');
        document.body.classList.remove('fc-body-locked');
        if (fullscreenBtn) {
          fullscreenBtn.innerHTML = '<span>⛶</span> Toàn màn hình';
          fullscreenBtn.classList.remove('active');
        }
        if (floatFullscreenBtn) {
          floatFullscreenBtn.innerHTML = '<span>⛶</span> Toàn màn hình';
        }
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      }
    }

    function openFlashcardTab() {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('fullscreen', '1');
      currentUrl.hash = '#tab-flashcards';
      window.open(currentUrl.toString(), '_blank');
    }

    fullscreenBtn?.addEventListener('click', () => toggleFullscreen());
    exitFullscreenBtn?.addEventListener('click', () => toggleFullscreen(false));
    newTabBtn?.addEventListener('click', openFlashcardTab);
    floatFullscreenBtn?.addEventListener('click', () => toggleFullscreen());
    floatNewTabBtn?.addEventListener('click', openFlashcardTab);

    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement && deckContainer.classList.contains('is-fullscreen')) {
        toggleFullscreen(false);
      }
    });

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('fullscreen') === '1') {
      const fcTabBtn = document.querySelector('[data-tab="tab-flashcards"]');
      if (fcTabBtn) fcTabBtn.click();
      setTimeout(() => {
        toggleFullscreen(true);
      }, 300);
    }

    if (floatingBar && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !deckContainer.classList.contains('is-fullscreen')) {
              floatingBar.classList.add('visible');
            } else {
              floatingBar.classList.remove('visible');
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -10% 0px'
        }
      );

      const targetSection = document.getElementById('tab-flashcards') || deckContainer;
      if (targetSection) observer.observe(targetSection);
    }

    window.addEventListener('keydown', (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const flashcardTab = document.getElementById('tab-flashcards');
      const isFcTabActive = flashcardTab && flashcardTab.classList.contains('active');
      const isFcFullscreen = deckContainer.classList.contains('is-fullscreen');

      if (!isFcTabActive && !isFcFullscreen) return;

      if (e.code === 'Space') {
        e.preventDefault();
        flipCard();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        nextCard();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        prevCard();
      } else if (e.code === 'KeyP' || e.code === 'KeyA') {
        e.preventDefault();
        speakCurrentCard();
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.code === 'Escape' && isFcFullscreen) {
        e.preventDefault();
        toggleFullscreen(false);
      } else if (e.code === 'Digit1') {
        btnModeEnVi?.click();
      } else if (e.code === 'Digit2') {
        btnModeViEn?.click();
      } else if (e.code === 'KeyS') {
        shuffleBtn?.click();
      }
    });

    updateActiveCards();
  }

  // --- BOOTSTRAP APPLICATION ---
  document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initFlashcards();
    initVocabHub();
  });
})();
