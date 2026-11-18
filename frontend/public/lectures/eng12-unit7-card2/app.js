/**
 * INTERACTIVE LECTURE STUDIO - LOGIC & CONTROLLER
 * Subject: Tiếng Anh 12 - Unit 7: The World of Mass Media
 * Học sinh: Bạn Nam Việt | Giáo viên: Thầy Thức
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
        const unitShort = item.unitName || (item.unit === 1 ? 'Nhóm 1: AI & Công Nghệ' : item.unit === 2 ? 'Nhóm 2: Năng Lực' : 'Nhóm 3: Đạo Đức');
        return `
          <div class="vocab-card" data-word="${escapeHtml(item.word)}">
            <div>
              <div class="vocab-card-header">
                <span class="unit-tag ${unitClass}">${escapeHtml(unitShort)}</span>
                <button class="audio-btn" title="Nghe phát âm chuẩn" data-speak="${escapeHtml(item.word)}">
                  🔊
                </button>
              </div>
              <div class="vocab-word">
                ${escapeHtml(item.word)}
                <span style="font-size:0.75rem; font-weight:600; color:var(--text-muted); margin-left:4px;">(${escapeHtml(item.pos)})</span>
              </div>
              <div class="vocab-ipa">${escapeHtml(item.ipa)}</div>
              <div class="vocab-meaning">${escapeHtml(item.meaning)}</div>
            </div>

            <div>
              ${item.collocation ? `
                <div class="vocab-collocation-pill">
                  <strong>Cụm từ:</strong> ${escapeHtml(item.collocation)}
                </div>
              ` : ''}
              <div class="vocab-example">
                "${escapeHtml(item.example)}"
                <div class="vocab-example-vi">${escapeHtml(item.exampleVi)}</div>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Attach audio buttons
      vocabGrid.querySelectorAll('.audio-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const word = btn.getAttribute('data-speak');
          if (word) AudioEngine.speak(word);
        });
      });
    }

    // Search events
    searchInput?.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderVocabList();
    });

    // Filter chip events
    filterGroup?.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        filterGroup.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
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
    if (!container || !LECTURE_DATA.grammarModules) return;

    container.innerHTML = LECTURE_DATA.grammarModules.map((mod, index) => {
      const focusPill = mod.focus ? `
        <div style="font-size:0.8rem; font-weight:700; color:var(--primary-blue); margin-bottom:14px; background:var(--primary-blue-bg); padding:6px 12px; border-radius:8px; display:inline-block; border:1px solid rgba(37,99,235,0.2);">
          🎯 ${escapeHtml(mod.focus)}
        </div>
      ` : '';

      const contentHtml = mod.theoryHtml || '';

      return `
        <div class="grammar-module-accordion">
          <button class="accordion-header" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
            <span>${escapeHtml(mod.title)}</span>
            <span class="chevron" style="font-size:0.8rem; transition:transform 0.2s;">${index === 0 ? '▲' : '▼'}</span>
          </button>
          <div class="accordion-body" style="display: ${index === 0 ? 'block' : 'none'};">
            ${focusPill}
            ${contentHtml}
          </div>
        </div>
      `;
    }).join('');

    // Accordion toggle events
    container.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const body = header.nextElementSibling;
        const chevron = header.querySelector('.chevron');
        const isHidden = body.style.display === 'none';
        body.style.display = isHidden ? 'block' : 'none';
        header.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
        if (chevron) chevron.textContent = isHidden ? '▲' : '▼';
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

    // State
    let mode = 'en-vi'; // 'en-vi' (Mode 1) or 'vi-en' (Mode 2)
    let view = 'deck';   // 'deck' or 'grid'
    let filterUnit = 'all';
    let originalList = [...LECTURE_DATA.vocabList];
    let activeCards = [...originalList];
    let currentIndex = 0;
    let isFlipped = false;

    function updateActiveCards() {
      if (filterUnit === 'all') {
        activeCards = [...originalList];
      } else {
        activeCards = originalList.filter(item => item.unit.toString() === filterUnit);
      }
      currentIndex = 0;
      isFlipped = false;
      render();
    }

    function renderDeck() {
      if (!fcCard || !fcFront || !fcBack) return;

      if (activeCards.length === 0) {
        fcFront.innerHTML = `
          <div class="fc-side-body">
            <div style="font-size:1.1rem; font-weight:700; color:var(--text-muted);">Không có thẻ nào trong nhóm này</div>
          </div>
        `;
        fcBack.innerHTML = fcFront.innerHTML;
        if (progressCounter) progressCounter.textContent = '0 / 0';
        if (progressFill) progressFill.style.width = '0%';
        return;
      }

      const item = activeCards[currentIndex];
      const total = activeCards.length;
      const progressPercent = Math.round(((currentIndex + 1) / total) * 100);

      if (progressCounter) {
        progressCounter.textContent = `Thẻ ${currentIndex + 1} / ${total}`;
      }
      if (progressFill) {
        progressFill.style.width = `${progressPercent}%`;
      }

      // Container styling based on mode
      const panelWrapper = document.querySelector('.flashcard-panel-wrapper');
      if (panelWrapper) {
        if (mode === 'vi-en') {
          panelWrapper.classList.add('mode-vi-en');
        } else {
          panelWrapper.classList.remove('mode-vi-en');
        }
      }

      fcCard.classList.toggle('flipped', isFlipped);

      const unitShort = item.unitName || (item.unit === 1 ? 'Mass Media & Báo Chí' : item.unit === 2 ? 'Quảng Cáo & Thương Mại' : 'Tính Xác Thực & Kỷ Nguyên Số');

      if (mode === 'en-vi') {
        // FUNCTION 1: FRONT = ENGLISH, BACK = VIETNAMESE
        fcFront.innerHTML = `
          <div class="fc-side-header">
            <span class="unit-tag unit-${item.unit}-tag">${escapeHtml(unitShort)}</span>
            <span class="fc-face-label fc-label-en">Mặt trước: Tiếng Anh</span>
            <button class="audio-btn fc-audio-inline" title="Phát âm chuẩn (Phím P)" data-speak="${escapeHtml(item.word)}">
              🔊
            </button>
          </div>
          <div class="fc-side-body">
            <div class="fc-word-main">${escapeHtml(item.word)}</div>
            <div class="fc-ipa-text">${escapeHtml(item.ipa)}</div>
            <span class="fc-pos-badge">(${escapeHtml(item.pos)})</span>
          </div>
          <div class="fc-side-footer">
            <span>Tiếng Anh 12 • Unit 7</span>
            <span class="fc-hint-action">Chạm để lật xem nghĩa Tiếng Việt 👆</span>
          </div>
        `;

        fcBack.innerHTML = `
          <div class="fc-side-header">
            <span class="fc-face-label fc-label-vi">Mặt sau: Nghĩa Tiếng Việt</span>
            <button class="audio-btn fc-audio-inline" title="Phát âm chuẩn (Phím P)" data-speak="${escapeHtml(item.word)}">
              🔊
            </button>
          </div>
          <div class="fc-side-body">
            <div class="fc-meaning-text">${escapeHtml(item.meaning)}</div>
            ${item.collocation ? `
              <div class="fc-colloc-box">
                <strong>Cụm từ:</strong> ${escapeHtml(item.collocation)}
              </div>
            ` : ''}
            <div class="fc-example-box">
              <em>"${escapeHtml(item.example)}"</em>
              <div style="margin-top:4px; color:#065f46; font-weight:500;">${escapeHtml(item.exampleVi)}</div>
            </div>
          </div>
          <div class="fc-side-footer">
            <span style="font-weight:700; color:var(--emerald-accent);">✓ Đã lật mở</span>
            <span class="fc-hint-action">Chạm để lật lại mặt trước 🔄</span>
          </div>
        `;
      } else {
        // FUNCTION 2: FRONT = VIETNAMESE, BACK = ENGLISH
        fcFront.innerHTML = `
          <div class="fc-side-header">
            <span class="unit-tag unit-${item.unit}-tag">${escapeHtml(unitShort)}</span>
            <span class="fc-face-label fc-label-vi">Mặt trước: Tiếng Việt</span>
            <span class="fc-pos-badge">(${escapeHtml(item.pos)})</span>
          </div>
          <div class="fc-side-body">
            <div class="fc-meaning-text">${escapeHtml(item.meaning)}</div>
            ${item.collocation ? `
              <div class="fc-colloc-box" style="background:#fffbeb; border-color:#fde68a;">
                <strong>Gợi ý ngữ cảnh:</strong> ${escapeHtml(item.collocation)}
              </div>
            ` : ''}
          </div>
          <div class="fc-side-footer">
            <span>Tiếng Anh 12 • Unit 7</span>
            <span class="fc-hint-action">Chạm để lật xem từ Tiếng Anh & Phát âm 👆</span>
          </div>
        `;

        fcBack.innerHTML = `
          <div class="fc-side-header">
            <span class="fc-face-label fc-label-en">Mặt sau: Tiếng Anh & Phát Âm</span>
            <button class="audio-btn fc-audio-inline" title="Phát âm chuẩn (Phím P)" data-speak="${escapeHtml(item.word)}">
              🔊
            </button>
          </div>
          <div class="fc-side-body">
            <div class="fc-word-main" style="color:var(--primary-blue);">${escapeHtml(item.word)}</div>
            <div class="fc-ipa-text">${escapeHtml(item.ipa)}</div>
            <span class="fc-pos-badge">(${escapeHtml(item.pos)})</span>
            ${item.collocation ? `
              <div class="fc-colloc-box">
                <strong>Cụm từ:</strong> ${escapeHtml(item.collocation)}
              </div>
            ` : ''}
            <div class="fc-example-box">
              <em>"${escapeHtml(item.example)}"</em>
              <div style="margin-top:4px; color:#1d4ed8; font-weight:500;">${escapeHtml(item.exampleVi)}</div>
            </div>
          </div>
          <div class="fc-side-footer">
            <span style="font-weight:700; color:var(--primary-blue);">✓ Đã lật mở</span>
            <span class="fc-hint-action">Chạm để lật lại mặt trước 🔄</span>
          </div>
        `;
      }

      // Attach inline speech buttons
      fcCard.querySelectorAll('.fc-audio-inline').forEach(btn => {
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
        gridCountText.textContent = `Hiển thị ${activeCards.length} thẻ flashcard (${mode === 'en-vi' ? 'Tiếng Anh ➔ Tiếng Việt' : 'Tiếng Việt ➔ Tiếng Anh'})`;
      }

      if (activeCards.length === 0) {
        gridCards.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: white; border-radius: var(--radius-xl); border: 1px dashed var(--border-color); color: var(--text-muted);">
            <p style="font-weight: 700;">Không có thẻ nào phù hợp bộ lọc.</p>
          </div>
        `;
        return;
      }

      gridCards.innerHTML = activeCards.map((item, idx) => {
        const unitShort = item.unitName || (item.unit === 1 ? 'Mass Media & Báo Chí' : item.unit === 2 ? 'Quảng Cáo & Thương Mại' : 'Tính Xác Thực & Kỷ Nguyên Số');

        if (mode === 'en-vi') {
          return `
            <div class="fc-item-card" data-idx="${idx}">
              <div class="fc-item-inner">
                <!-- Front: English -->
                <div class="fc-item-face fc-item-front">
                  <div class="fc-side-header">
                    <span class="unit-tag unit-${item.unit}-tag">${escapeHtml(unitShort)}</span>
                    <button class="audio-btn fc-grid-audio" title="Nghe phát âm" data-speak="${escapeHtml(item.word)}">🔊</button>
                  </div>
                  <div style="text-align: center; margin: auto 0;">
                    <div style="font-size:1.35rem; font-weight:800; color:var(--text-main); margin-bottom:2px;">${escapeHtml(item.word)}</div>
                    <div style="font-size:0.85rem; font-family:monospace; color:var(--primary-blue); margin-bottom:4px;">${escapeHtml(item.ipa)}</div>
                    <span class="fc-pos-badge">(${escapeHtml(item.pos)})</span>
                  </div>
                  <div style="font-size:0.75rem; color:var(--primary-blue); font-weight:600; text-align:center; border-top:1px dashed var(--border-color); padding-top:8px;">
                    Chạm để xem nghĩa 👆
                  </div>
                </div>

                <!-- Back: Vietnamese -->
                <div class="fc-item-face fc-item-back">
                  <div class="fc-side-header">
                    <span class="fc-face-label fc-label-vi">Nghĩa Tiếng Việt</span>
                    <button class="audio-btn fc-grid-audio" title="Nghe phát âm" data-speak="${escapeHtml(item.word)}">🔊</button>
                  </div>
                  <div style="margin: auto 0;">
                    <div style="font-size:1.15rem; font-weight:700; color:#065f46; margin-bottom:6px; line-height:1.3;">${escapeHtml(item.meaning)}</div>
                    ${item.collocation ? `<div style="font-size:0.78rem; color:var(--text-main); background:white; padding:4px 8px; border-radius:6px; border:1px solid #e2e8f0; margin-bottom:6px;"><strong>Cụm:</strong> ${escapeHtml(item.collocation)}</div>` : ''}
                    <div style="font-size:0.75rem; color:var(--text-muted); line-height:1.3;">"${escapeHtml(item.example)}"</div>
                  </div>
                  <div style="font-size:0.75rem; color:#059669; font-weight:600; text-align:center; border-top:1px dashed #86efac; padding-top:8px;">
                    Chạm để lật lại 🔄
                  </div>
                </div>
              </div>
            </div>
          `;
        } else {
          return `
            <div class="fc-item-card" data-idx="${idx}">
              <div class="fc-item-inner">
                <!-- Front: Vietnamese -->
                <div class="fc-item-face fc-item-front">
                  <div class="fc-side-header">
                    <span class="unit-tag unit-${item.unit}-tag">${escapeHtml(unitShort)}</span>
                    <span class="fc-pos-badge">(${escapeHtml(item.pos)})</span>
                  </div>
                  <div style="text-align: center; margin: auto 0;">
                    <div style="font-size:1.25rem; font-weight:700; color:#92400e; margin-bottom:6px; line-height:1.3;">${escapeHtml(item.meaning)}</div>
                    ${item.collocation ? `<div style="font-size:0.78rem; color:var(--text-main); background:white; padding:4px 8px; border-radius:6px; border:1px solid #fde68a;"><strong>Gợi ý:</strong> ${escapeHtml(item.collocation)}</div>` : ''}
                  </div>
                  <div style="font-size:0.75rem; color:#b45309; font-weight:600; text-align:center; border-top:1px dashed var(--border-color); padding-top:8px;">
                    Chạm để xem từ Tiếng Anh 👆
                  </div>
                </div>

                <!-- Back: English -->
                <div class="fc-item-face fc-item-back">
                  <div class="fc-side-header">
                    <span class="fc-face-label fc-label-en">Tiếng Anh</span>
                    <button class="audio-btn fc-grid-audio" title="Nghe phát âm" data-speak="${escapeHtml(item.word)}">🔊</button>
                  </div>
                  <div style="margin: auto 0; text-align:center;">
                    <div style="font-size:1.35rem; font-weight:800; color:var(--primary-blue); margin-bottom:2px;">${escapeHtml(item.word)}</div>
                    <div style="font-size:0.85rem; font-family:monospace; color:var(--text-muted); margin-bottom:4px;">${escapeHtml(item.ipa)}</div>
                    ${item.collocation ? `<div style="font-size:0.78rem; color:var(--text-main); background:white; padding:4px 8px; border-radius:6px; border:1px solid #93c5fd; margin-bottom:6px; text-align:left;"><strong>Cụm:</strong> ${escapeHtml(item.collocation)}</div>` : ''}
                    <div style="font-size:0.75rem; color:var(--text-muted); text-align:left; line-height:1.3;">"${escapeHtml(item.example)}"</div>
                  </div>
                  <div style="font-size:0.75rem; color:var(--primary-blue); font-weight:600; text-align:center; border-top:1px dashed #93c5fd; padding-top:8px;">
                    Chạm để lật lại 🔄
                  </div>
                </div>
              </div>
            </div>
          `;
        }
      }).join('');

      // Attach flip events for grid cards
      gridCards.querySelectorAll('.fc-item-card').forEach(card => {
        card.addEventListener('click', () => {
          card.classList.toggle('flipped');
        });
      });

      // Attach grid audio buttons
      gridCards.querySelectorAll('.fc-grid-audio').forEach(btn => {
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

    // --- EVENT BINDINGS ---
    fcCard?.addEventListener('click', flipCard);
    flipBtn?.addEventListener('click', flipCard);
    nextBtn?.addEventListener('click', nextCard);
    prevBtn?.addEventListener('click', prevCard);
    speakBtn?.addEventListener('click', speakCurrentCard);

    // Mode Switcher Buttons (2 FUNCTIONS)
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

    // View Switcher (Deck vs Grid)
    viewDeckBtn?.addEventListener('click', () => {
      view = 'deck';
      viewDeckBtn.classList.add('active');
      viewGridBtn?.classList.remove('active');
      if (deckContainer) deckContainer.style.display = 'block';
      if (gridContainer) gridContainer.style.display = 'none';
    });

    viewGridBtn?.addEventListener('click', () => {
      view = 'grid';
      viewGridBtn.classList.add('active');
      viewDeckBtn?.classList.remove('active');
      if (deckContainer) deckContainer.style.display = 'none';
      if (gridContainer) gridContainer.style.display = 'block';
      renderGrid();
    });

    // Shuffle & Reset
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

    // Filter Chips
    filterChips?.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        filterUnit = chip.getAttribute('data-unit') || 'all';
        updateActiveCards();
      });
    });

    // Grid Actions
    gridFlipAllBtn?.addEventListener('click', () => {
      gridCards?.querySelectorAll('.fc-item-card').forEach(c => c.classList.add('flipped'));
    });

    gridResetAllBtn?.addEventListener('click', () => {
      gridCards?.querySelectorAll('.fc-item-card').forEach(c => c.classList.remove('flipped'));
    });

    // Fullscreen and Standalone Tab Controls
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
        // Try HTML5 Fullscreen API if available
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

    // Sync when user exits browser native fullscreen (e.g. via ESC)
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement && deckContainer.classList.contains('is-fullscreen')) {
        toggleFullscreen(false);
      }
    });

    // Auto-enter fullscreen if URL parameter has ?fullscreen=1
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('fullscreen') === '1') {
      const fcTabBtn = document.querySelector('[data-tab="tab-flashcards"]');
      if (fcTabBtn) fcTabBtn.click();
      setTimeout(() => {
        toggleFullscreen(true);
      }, 350);
    }

    // Scroll Detection via IntersectionObserver for Floating Bar
    if (floatingBar && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !deckContainer.classList.contains('is-fullscreen')) {
            floatingBar.classList.add('visible');
          } else {
            floatingBar.classList.remove('visible');
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
      });

      const targetSection = document.getElementById('tab-flashcards') || deckContainer;
      if (targetSection) observer.observe(targetSection);
    }

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      // Don't trigger if user is typing in an input or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      // Only handle if Flashcards tab is visible or in fullscreen
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

    // Initial render
    updateActiveCards();
  }

  // Helper
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- BOOTSTRAP APPLICATION ---
  document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initFlashcards();
    initVocabHub();
  });

})();
