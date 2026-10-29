/**
 * INTERACTIVE LECTURE STUDIO - LOGIC & CONTROLLER
 * Subject: Tiếng Anh 11 - Ôn thi giữa kì 1
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

  // Pre-load speech voices
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }

  // --- TAB CONTROLLER ---
  function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');
        tabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        tabPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const activePane = document.getElementById(targetId);
        if (activePane) {
          activePane.classList.add('active');
        }
      });
    });
  }

  // --- SECTION 1: VOCABULARY & GRAMMAR HUB ---
  function initVocabHub() {
    const vocabGrid = document.getElementById('vocabGrid');
    const searchInput = document.getElementById('vocabSearchInput');
    const filterGroup = document.getElementById('filterButtonGroup');
    const emptyState = document.getElementById('vocabEmptyState');
    const statVocabCount = document.getElementById('statVocabCount');

    if (!vocabGrid || typeof LECTURE_DATA === 'undefined') return;

    let currentFilter = 'all';
    let searchQuery = '';

    if (statVocabCount) {
      statVocabCount.textContent = `${LECTURE_DATA.vocabList.length} Từ`;
    }

    function renderVocabList() {
      const q = searchQuery.trim().toLowerCase();
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
        const unitShort = item.unit === 1 ? 'Unit 1: Sức Khỏe' : item.unit === 2 ? 'Unit 2: Thế Hệ' : 'Unit 3: Đô Thị';
        return `
          <div class="vocab-card" data-word="${escapeHtml(item.word)}">
            <div>
              <div class="vocab-card-header">
                <span class="unit-tag ${unitClass}">${unitShort}</span>
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
      let contentHtml = '';

      if (mod.id === 'tenses') {
        contentHtml = `
          <div class="grammar-compare-grid">
            <div class="grammar-card past-card">
              <h4>${escapeHtml(mod.tense1.name)}</h4>
              <p style="font-size:0.85rem; color:#4b5563; margin-bottom:8px;">${escapeHtml(mod.tense1.usage)}</p>
              <div class="formula-box">${escapeHtml(mod.tense1.formula)}</div>
              <div class="signal-tag-list">
                ${mod.tense1.signals.map(s => `<span class="signal-tag">${escapeHtml(s)}</span>`).join('')}
              </div>
              <div class="example-quote">${escapeHtml(mod.tense1.example)}</div>
            </div>

            <div class="grammar-card perfect-card">
              <h4>${escapeHtml(mod.tense2.name)}</h4>
              <p style="font-size:0.85rem; color:#4b5563; margin-bottom:8px;">${escapeHtml(mod.tense2.usage)}</p>
              <div class="formula-box">${escapeHtml(mod.tense2.formula)}</div>
              <div class="signal-tag-list">
                ${mod.tense2.signals.map(s => `<span class="signal-tag">${escapeHtml(s)}</span>`).join('')}
              </div>
              <div class="example-quote">${escapeHtml(mod.tense2.example)}</div>
            </div>
          </div>

          <div class="transform-formula-box" style="margin-bottom:14px;">
            <h5>🎯 3 Cấu Trúc Viết Lại Câu Tương Đương Hay Thi Nhất:</h5>
            <ul style="line-height:1.7;">
              ${mod.transformFormulas.map(f => `
                <li style="margin-bottom:8px;">
                  <code>${escapeHtml(f.pattern)}</code><br>
                  <span style="font-size:0.8rem; color:#451a03; font-style:italic;">Ví dụ: ${escapeHtml(f.example)}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        `;
      } else if (mod.id === 'modal_verbs') {
        contentHtml = `
          <div class="modal-rules-table-wrapper" style="margin-bottom:14px;">
            <table class="modal-rules-table">
              <thead>
                <tr>
                  <th>Động Từ Khuyết Thiếu</th>
                  <th>Ý Nghĩa & Sắc Thái</th>
                  <th>Ví Dụ Minh Họa</th>
                </tr>
              </thead>
              <tbody>
                ${mod.rules.map(r => `
                  <tr>
                    <td><strong class="color-${r.verb.toLowerCase().replace(/[^a-z]/g, '-')}">${escapeHtml(r.verb)}</strong></td>
                    <td>${escapeHtml(r.meaning)}</td>
                    <td class="example-quote">${escapeHtml(r.example)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      } else if (mod.id === 'linking_verbs') {
        contentHtml = `
          <div class="formula-box" style="margin-bottom:12px; background:#f0fdf4; border:1px solid #bbf7d0; color:#166534;">
            ${escapeHtml(mod.rule)}
          </div>
          <p style="font-size:0.85rem; font-weight:700; color:var(--text-main); margin-bottom:6px;">
            Các Linking Verbs thường gặp trong đề thi:
          </p>
          <div class="linking-chips">
            ${mod.verbs.map(v => `<span>${escapeHtml(v)}</span>`).join('')}
          </div>
        `;
      }

      // Add pitfall if exists
      if (mod.pitfall) {
        contentHtml += `
          <div class="pitfall-box">
            <strong>⚠️ Bẫy Đề Thi:</strong> ${escapeHtml(mod.pitfall.title)}
            <ul>
              ${mod.pitfall.points.map(p => `<li>${escapeHtml(p)}</li>`).join('')}
            </ul>
          </div>
        `;
      }

      return `
        <div class="grammar-module-accordion">
          <button class="accordion-header" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
            <span>${escapeHtml(mod.title)}</span>
            <span class="chevron" style="font-size:0.8rem; transition:transform 0.2s;">${index === 0 ? '▲' : '▼'}</span>
          </button>
          <div class="accordion-body" style="display: ${index === 0 ? 'block' : 'none'};">
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

  // --- SECTION 2: COLLOCATION MATCHING & ODD ONE OUT ---
  function initCollocations() {
    const verbsCol = document.getElementById('collocVerbsCol');
    const nounsCol = document.getElementById('collocNounsCol');
    const resetBtn = document.getElementById('resetCollocBtn');
    const successBanner = document.getElementById('collocSuccessBanner');

    if (!verbsCol || !nounsCol || !LECTURE_DATA.collocationPairs) return;

    let selectedVerb = null;
    let selectedNoun = null;
    let matchedCount = 0;
    const totalPairs = LECTURE_DATA.collocationPairs.length;

    function shuffle(arr) {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    function setupBoard() {
      matchedCount = 0;
      selectedVerb = null;
      selectedNoun = null;
      if (successBanner) successBanner.style.display = 'none';

      const verbsShuffled = shuffle(LECTURE_DATA.collocationPairs);
      const nounsShuffled = shuffle(LECTURE_DATA.collocationPairs);

      verbsCol.innerHTML = verbsShuffled.map(p => `
        <div class="colloc-item" data-id="${p.id}" data-type="verb">
          <span>${escapeHtml(p.verb)}</span>
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight: normal;">(Động từ)</span>
        </div>
      `).join('');

      nounsCol.innerHTML = nounsShuffled.map(p => `
        <div class="colloc-item" data-id="${p.id}" data-type="noun">
          <span>${escapeHtml(p.noun)}</span>
          <span style="font-size:0.7rem; color:var(--text-muted); font-weight: normal; margin-left:6px;">${escapeHtml(p.meaning)}</span>
        </div>
      `).join('');

      // Add item listeners
      verbsCol.querySelectorAll('.colloc-item').forEach(el => {
        el.addEventListener('click', () => handleSelect(el, 'verb'));
      });
      nounsCol.querySelectorAll('.colloc-item').forEach(el => {
        el.addEventListener('click', () => handleSelect(el, 'noun'));
      });
    }

    function handleSelect(element, type) {
      if (element.classList.contains('matched')) return;

      if (type === 'verb') {
        verbsCol.querySelectorAll('.colloc-item').forEach(el => el.classList.remove('selected'));
        element.classList.add('selected');
        selectedVerb = element;
      } else {
        nounsCol.querySelectorAll('.colloc-item').forEach(el => el.classList.remove('selected'));
        element.classList.add('selected');
        selectedNoun = element;
      }

      // Check if both selected
      if (selectedVerb && selectedNoun) {
        const verbId = selectedVerb.getAttribute('data-id');
        const nounId = selectedNoun.getAttribute('data-id');

        if (verbId === nounId) {
          // MATCH!
          AudioEngine.playSuccessSound();
          selectedVerb.classList.remove('selected');
          selectedNoun.classList.remove('selected');
          selectedVerb.classList.add('matched');
          selectedNoun.classList.add('matched');

          selectedVerb = null;
          selectedNoun = null;
          matchedCount++;

          if (matchedCount === totalPairs) {
            if (successBanner) {
              successBanner.style.display = 'block';
              AudioEngine.playSuccessSound();
            }
          }
        } else {
          // MISMATCH!
          AudioEngine.playErrorSound();
          const v = selectedVerb;
          const n = selectedNoun;
          v.classList.add('wrong');
          n.classList.add('wrong');

          setTimeout(() => {
            v.classList.remove('wrong', 'selected');
            n.classList.remove('wrong', 'selected');
          }, 500);

          selectedVerb = null;
          selectedNoun = null;
        }
      }
    }

    resetBtn?.addEventListener('click', setupBoard);
    setupBoard();

    // Odd one out section
    initOddOneOut();
  }

  function initOddOneOut() {
    const container = document.getElementById('oddOneOutContainer');
    if (!container || !LECTURE_DATA.oddOneOut) return;

    container.innerHTML = LECTURE_DATA.oddOneOut.map((item, idx) => `
      <div class="odd-card" data-idx="${idx}">
        <div class="odd-prompt">
          ${idx + 1}. Tìm từ <u>KHÔNG THỂ</u> kết hợp cùng với:
          <span style="color:var(--primary-blue); font-weight:800;">"${escapeHtml(item.nounPhrase)}"</span>
        </div>
        <div class="odd-options-grid">
          ${item.options.map((opt, oIdx) => `
            <button class="odd-btn" data-opt-idx="${oIdx}">
              <strong>${String.fromCharCode(65 + oIdx)}.</strong> ${escapeHtml(opt)}
            </button>
          `).join('')}
        </div>
        <div class="feedback-banner" id="oddFeedback_${idx}"></div>
      </div>
    `).join('');

    container.querySelectorAll('.odd-card').forEach(card => {
      const idx = parseInt(card.getAttribute('data-idx') || '0', 10);
      const data = LECTURE_DATA.oddOneOut[idx];
      const feedback = card.querySelector(`#oddFeedback_${idx}`);
      const buttons = card.querySelectorAll('.odd-btn');

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const optIdx = parseInt(btn.getAttribute('data-opt-idx') || '0', 10);
          buttons.forEach(b => b.classList.remove('correct', 'incorrect'));

          if (optIdx === data.wrongIndex) {
            btn.classList.add('correct');
            AudioEngine.playSuccessSound();
            if (feedback) {
              feedback.className = 'feedback-banner success';
              feedback.innerHTML = `<strong>Chính xác!</strong> ${escapeHtml(data.explanation)}`;
            }
          } else {
            btn.classList.add('incorrect');
            AudioEngine.playErrorSound();
            if (feedback) {
              feedback.className = 'feedback-banner error';
              feedback.innerHTML = `<strong>Chưa đúng!</strong> Từ này kết hợp hoàn toàn tự nhiên với "${escapeHtml(data.nounPhrase)}". Hãy thử chọn lại!`;
            }
          }
        });
      });
    });
  }

  // --- SECTION 3: WORD FAMILY & OPEN CLOZE ---
  function initWordFamily() {
    const treeContainer = document.getElementById('wordFamilyContainer');
    const clozeContainer = document.getElementById('openClozeContainer');

    if (treeContainer && LECTURE_DATA.wordFamilyRoots) {
      treeContainer.innerHTML = LECTURE_DATA.wordFamilyRoots.map(tree => `
        <div class="word-tree-card">
          <div class="tree-root-badge">
            <span>🌱 Gốc từ:</span>
            <span style="font-size:1.1rem; text-transform:uppercase;">${escapeHtml(tree.root)}</span>
            <span style="font-weight:normal; font-size:0.75rem; color:var(--text-muted);">(${escapeHtml(tree.meaning)})</span>
          </div>
          <div class="derivatives-branch-grid">
            ${tree.derivatives.map(d => `
              <div class="branch-node">
                <div class="node-pos">${escapeHtml(d.pos)}</div>
                <div class="node-word">${escapeHtml(d.word)}</div>
                <div class="node-vi">${escapeHtml(d.vi)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('');
    }

    if (clozeContainer && LECTURE_DATA.openCloze) {
      clozeContainer.innerHTML = LECTURE_DATA.openCloze.map(item => `
        <div class="cloze-item" data-id="${item.id}">
          <div class="cloze-sentence">
            ${item.id}. ${escapeHtml(item.sentence)}
          </div>
          <div class="cloze-input-row">
            <input
              type="text"
              class="cloze-input"
              placeholder="Nhập dạng từ..."
              data-expected="${escapeHtml(item.expectedAnswer)}"
              autocomplete="off"
            />
            <button class="btn-primary cloze-check-btn">Kiểm Tra</button>
            <button class="btn-subtle cloze-hint-btn">Gợi Ý</button>
          </div>
          <div class="feedback-banner"></div>
        </div>
      `).join('');

      clozeContainer.querySelectorAll('.cloze-item').forEach(itemEl => {
        const input = itemEl.querySelector('.cloze-input');
        const checkBtn = itemEl.querySelector('.cloze-check-btn');
        const hintBtn = itemEl.querySelector('.cloze-hint-btn');
        const feedback = itemEl.querySelector('.feedback-banner');
        const id = parseInt(itemEl.getAttribute('data-id') || '0', 10);
        const data = LECTURE_DATA.openCloze.find(c => c.id === id);

        function checkAnswer() {
          const val = input.value.trim().toLowerCase();
          const expected = (input.getAttribute('data-expected') || '').trim().toLowerCase();

          if (!val) {
            input.focus();
            return;
          }

          if (val === expected) {
            AudioEngine.playSuccessSound();
            input.classList.remove('invalid');
            input.classList.add('valid');
            if (feedback) {
              feedback.className = 'feedback-banner success';
              feedback.innerHTML = `<strong>Chính xác! (+10đ)</strong> ${escapeHtml(data.explanation)}`;
            }
          } else {
            AudioEngine.playErrorSound();
            input.classList.remove('valid');
            input.classList.add('invalid');
            if (feedback) {
              feedback.className = 'feedback-banner error';
              feedback.innerHTML = `<strong>Chưa chính xác!</strong> Hãy xem lại từ loại cần điền hoặc ngữ cảnh phủ định. Thử lại nhé!`;
            }
          }
        }

        checkBtn?.addEventListener('click', checkAnswer);
        input?.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') checkAnswer();
        });

        hintBtn?.addEventListener('click', () => {
          if (feedback && data) {
            feedback.className = 'feedback-banner';
            feedback.style.display = 'block';
            feedback.style.background = '#fef3c7';
            feedback.style.color = '#92400e';
            feedback.style.border = '1px solid #fde68a';
            feedback.innerHTML = `💡 <strong>Gợi ý:</strong> ${escapeHtml(data.explanation.split('.')[0])}. Bắt đầu bằng chữ cái: <strong>${data.expectedAnswer.slice(0, 3)}...</strong>`;
          }
        });
      });
    }
  }

  // --- SECTION 4: ACTIVE RECALL (FIRST LETTER CLUE) ---
  function initActiveRecall() {
    const container = document.getElementById('activeRecallContainer');
    if (!container || !LECTURE_DATA.activeRecall) return;

    container.innerHTML = LECTURE_DATA.activeRecall.map(item => `
      <div class="recall-card" data-id="${item.id}">
        <div class="recall-def-box">
          <strong>📖 Định nghĩa tiếng Anh:</strong> "${escapeHtml(item.definition)}"
        </div>
        <div style="font-size:0.95rem; font-weight:600; line-height:1.6; margin-bottom:12px;">
          ${escapeHtml(item.sentence)}
        </div>
        <div class="cloze-input-row">
          <input
            type="text"
            class="cloze-input recall-input"
            placeholder="Gợi ý: ${escapeHtml(item.clue)}..."
            data-target="${escapeHtml(item.targetWord)}"
            autocomplete="off"
          />
          <button class="btn-primary recall-check-btn">Kiểm Tra</button>
          <button class="btn-subtle recall-speak-btn" style="display:none;" title="Nghe phát âm">🔊 Nghe</button>
        </div>
        <div class="feedback-banner"></div>
      </div>
    `).join('');

    container.querySelectorAll('.recall-card').forEach(card => {
      const input = card.querySelector('.recall-input');
      const checkBtn = card.querySelector('.recall-check-btn');
      const speakBtn = card.querySelector('.recall-speak-btn');
      const feedback = card.querySelector('.feedback-banner');
      const id = parseInt(card.getAttribute('data-id') || '0', 10);
      const data = LECTURE_DATA.activeRecall.find(r => r.id === id);

      function check() {
        const val = input.value.trim().toLowerCase();
        const target = (input.getAttribute('data-target') || '').trim().toLowerCase();

        if (!val) {
          input.focus();
          return;
        }

        if (val === target) {
          AudioEngine.playSuccessSound();
          input.classList.remove('invalid');
          input.classList.add('valid');
          if (speakBtn) speakBtn.style.display = 'inline-block';
          if (feedback) {
            feedback.className = 'feedback-banner success';
            feedback.innerHTML = `<strong>Chính xác!</strong> Từ vựng: <strong>${escapeHtml(data.targetWord)}</strong> (${escapeHtml(data.ipa)}) - ${escapeHtml(data.vi)}`;
          }
        } else {
          AudioEngine.playErrorSound();
          input.classList.remove('valid');
          input.classList.add('invalid');
          if (feedback) {
            feedback.className = 'feedback-banner error';
            feedback.innerHTML = `<strong>Chưa đúng rồi!</strong> Gợi ý: từ này gồm <strong>${data.targetWord.length} chữ cái</strong> và bắt đầu bằng "<strong>${escapeHtml(data.clue)}</strong>".`;
          }
        }
      }

      checkBtn?.addEventListener('click', check);
      input?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') check();
      });
      speakBtn?.addEventListener('click', () => {
        if (data) AudioEngine.speak(data.targetWord);
      });
    });
  }

  // --- SECTION 5: INTERACTIVE SENTENCE WRITING CHALLENGE ---
  function initWritingChallenges() {
    const container = document.getElementById('writingChallengesContainer');
    if (!container || !LECTURE_DATA.writingChallenges) return;

    container.innerHTML = LECTURE_DATA.writingChallenges.map(item => `
      <div class="writing-card" data-id="${item.id}">
        <span class="target-keyword-badge">Từ khóa: ${escapeHtml(item.keyword)}</span>
        <div style="font-size:0.95rem; font-weight:700; color:var(--text-main); margin-bottom:8px;">
          ${escapeHtml(item.prompt)}
        </div>
        <textarea
          class="writing-textarea"
          rows="2"
          placeholder="Nhập câu tiếng Anh hoàn chỉnh của bạn tại đây..."
        ></textarea>
        <div style="display:flex; gap:10px; align-items:center;">
          <button class="btn-primary writing-submit-btn">Phân Tích & Chấm Câu 🚀</button>
          <button class="btn-subtle writing-model-btn">Xem Câu Mẫu</button>
        </div>
        <div class="feedback-banner"></div>
      </div>
    `).join('');

    container.querySelectorAll('.writing-card').forEach(card => {
      const textarea = card.querySelector('.writing-textarea');
      const submitBtn = card.querySelector('.writing-submit-btn');
      const modelBtn = card.querySelector('.writing-model-btn');
      const feedback = card.querySelector('.feedback-banner');
      const id = parseInt(card.getAttribute('data-id') || '0', 10);
      const data = LECTURE_DATA.writingChallenges.find(w => w.id === id);

      submitBtn?.addEventListener('click', () => {
        const text = textarea.value.trim();
        const lower = text.toLowerCase();

        if (text.split(/\s+/).length < 4) {
          feedback.className = 'feedback-banner error';
          feedback.innerHTML = '⚠️ Câu của bạn quá ngắn! Hãy viết một câu hoàn chỉnh có Chủ ngữ và Vị ngữ.';
          return;
        }

        // Check required keywords
        const missingWords = data.requiredWords.filter(w => !lower.includes(w.toLowerCase()));
        if (missingWords.length > 0) {
          AudioEngine.playErrorSound();
          feedback.className = 'feedback-banner error';
          feedback.innerHTML = `⚠️ Câu của bạn chưa chứa từ khóa bắt buộc: <strong>${missingWords.join(', ')}</strong>. Hãy bổ sung nhé!`;
          return;
        }

        // Check forbidden words (common pitfalls)
        const foundForbidden = (data.forbiddenWords || []).find(f => lower.includes(f.toLowerCase()));
        if (foundForbidden) {
          AudioEngine.playErrorSound();
          feedback.className = 'feedback-banner error';
          feedback.innerHTML = `
            ❌ <strong>Bẫy ngữ pháp phát hiện:</strong> Bạn đang dùng cụm từ sai <code>${escapeHtml(foundForbidden)}</code>.<br>
            <em>Lưu ý quy tắc:</em> Sau linking verb ta dùng TÍNH TỪ chứ không dùng trạng từ (taste delicious NOT taste deliciously); hoặc mustn't chỉ dùng khi cấm đoán!
          `;
          return;
        }

        // Success
        AudioEngine.playSuccessSound();
        feedback.className = 'feedback-banner success';
        feedback.innerHTML = `
          🎉 <strong>Tuyệt vời!</strong> Câu của Thái chuẩn xác ngữ pháp và sử dụng đúng từ khóa mục tiêu.<br>
          <div style="margin-top:6px; font-size:0.8rem; color:#065f46;">
            <strong>Câu mẫu tham khảo từ Thầy Thức:</strong> "${escapeHtml(data.modelAnswer)}"
          </div>
        `;
      });

      modelBtn?.addEventListener('click', () => {
        feedback.className = 'feedback-banner';
        feedback.style.display = 'block';
        feedback.style.background = '#f5f3ff';
        feedback.style.color = '#6b21a8';
        feedback.style.border = '1px solid #ddd6fe';
        feedback.innerHTML = `💡 <strong>Câu mẫu của Thầy Thức:</strong> "${escapeHtml(data.modelAnswer)}"`;
      });
    });
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
    initVocabHub();
    initCollocations();
    initWordFamily();
    initActiveRecall();
    initWritingChallenges();
  });

})();
