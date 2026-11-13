/* Visual Geometry Guide: Parallel & Perpendicular Lines
   Cadet Keithley Lake • Grade 7 Math • 13 Nov 2026 */

const pages = [
  {
    title: "Corresponding Angles",
    subtitle: "F-Shape Pattern",
    tagClass: "tag-cyan",
    tagText: "F-SHAPE · EQUAL",
    svg: "/images/geometry/math7_visual_corresponding.svg",
    formula: "\\[a \\parallel b \\implies \\widehat{A_1} = \\widehat{B_1}\\]"
  },
  {
    title: "Alternate Interior Angles",
    subtitle: "Z-Shape Pattern",
    tagClass: "tag-amber",
    tagText: "Z-SHAPE · EQUAL",
    svg: "/images/geometry/math7_visual_alternate_interior.svg",
    formula: "\\[a \\parallel b \\implies \\widehat{A_3} = \\widehat{B_1}\\]"
  },
  {
    title: "Consecutive Interior Angles",
    subtitle: "U-Shape Pattern",
    tagClass: "tag-rose",
    tagText: "U-SHAPE · SUPPLEMENTARY (180°)",
    svg: "/images/geometry/math7_visual_consecutive_interior.svg",
    formula: "\\[a \\parallel b \\implies \\widehat{A_4} + \\widehat{B_1} = 180^\\circ\\]"
  },
  {
    title: "Double Perpendicular Theorem",
    subtitle: "Two Lines ⊥ Third Line",
    tagClass: "tag-emerald",
    tagText: "90° BRIDGE · PARALLEL",
    svg: "/images/geometry/math7_visual_double_perpendicular.svg",
    formula: "\\[a \\perp c \\quad \\text{and} \\quad b \\perp c \\implies a \\parallel b\\]"
  }
];

const lesson = document.querySelector("#lesson");
const stationsNav = document.querySelector("#stations");
const prevBtn = document.querySelector("#previous");
const nextBtn = document.querySelector("#next");
const locationSpan = document.querySelector("#location");

let currentPage = 0;

function renderMath() {
  if (window.renderMathInElement) {
    window.renderMathInElement(lesson, {
      delimiters: [
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true }
      ],
      output: "html",
      throwOnError: false
    });
  }
}

function renderNav() {
  stationsNav.innerHTML = pages.map((p, idx) => `
    <button type="button" data-index="${idx}" ${idx === currentPage ? 'aria-current="step"' : ''}>
      <small>Page ${idx + 1}</small>
      ${p.title}
    </button>
  `).join("");

  stationsNav.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetIdx = parseInt(btn.dataset.index, 10);
      setPage(targetIdx);
    });
  });
}

function setPage(idx) {
  if (idx < 0 || idx >= pages.length) return;
  currentPage = idx;

  const page = pages[currentPage];

  lesson.innerHTML = `
    <div class="visual-container">
      <div class="visual-card">
        <span class="page-tag ${page.tagClass}">${page.tagText}</span>
        <h2>${currentPage + 1}. ${page.title}</h2>
        <div class="svg-wrap">
          <img src="${page.svg}" alt="${page.title} diagram" />
        </div>
        <div class="formula-banner">
          ${page.formula}
        </div>
      </div>
    </div>
  `;

  locationSpan.textContent = `Page ${currentPage + 1} of ${pages.length} · ${page.title}`;
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage === pages.length - 1;

  renderNav();
  renderMath();
}

prevBtn.addEventListener("click", () => setPage(currentPage - 1));
nextBtn.addEventListener("click", () => setPage(currentPage + 1));

// Keyboard Arrow Support
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") setPage(currentPage - 1);
  if (e.key === "ArrowRight") setPage(currentPage + 1);
});

// Initial boot
setPage(0);
