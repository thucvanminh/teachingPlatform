# Lesson 11: Theorems & Formal Geometric Proofs
*Space Flight Telemetry Briefing • Flight Commander Thầy Thức*

Interactive Virtual Lab Studio: `/lectures/math7-theorems-proofs/index.html`

---

## 🛰️ Protocol 01: Anatomy of a Theorem

A **Theorem** is a mathematical truth established by logical deduction from known facts.

$$\text{Universal Structure: } \mathbf{IF} \text{ [Hypothesis]} \implies \mathbf{THEN} \text{ [Conclusion]}$$

| Component | Math Code | Definition | Mission Example |
| :--- | :---: | :--- | :--- |
| **Hypothesis** | **Given (GT)** | Starting conditions assumed true | If $\widehat{xOy}$ and $\widehat{x'Oy'}$ are vertical angles |
| **Conclusion** | **Prove (KL)** | Target truth to be derived | Then $\widehat{xOy} = \widehat{x'Oy'}$ |

![Theorem Architecture](/images/geometry/math7_l11_theorem_anatomy.svg)

---

## ⚡ Protocol 02: The 3-Step Deductive Proof Engine

To **prove a theorem**, execute this linear logical chain:

1. **State the Given:** Write down initial facts directly from the Hypothesis.
2. **Build the Bridge:** Apply definitions, axioms, or previously proven theorems with mathematical justification.
3. **Conclude:** Reach the target Conclusion with $\therefore$ (*therefore*), ending with **Q.E.D.** (*quod erat demonstrandum*).

---

## 📐 Protocol 03: Classic Model 1 — Vertical Angles Theorem

> **Theorem:** Two vertically opposite angles are equal.

![Vertical Angles Proof](/images/geometry/math7_l11_vertical_angles_proof.svg)

### 1. Statement Matrix

| Given (Hypothesis) | Prove (Conclusion) |
| :--- | :--- |
| $\widehat{xOy}$ and $\widehat{x'Oy'}$ are vertically opposite angles | $\widehat{xOy} = \widehat{x'Oy'}$ |

### 2. Proof (2-Step Execution)

1. Ray $Ox$ and straight line $x'y'$ form supplementary linear pairs:
   $$\widehat{xOy} + \widehat{xOy'} = 180^\circ \implies \widehat{xOy} = 180^\circ - \widehat{xOy'}$$
2. Ray $Oy'$ and straight line $xy$ form supplementary linear pairs:
   $$\widehat{x'Oy'} + \widehat{xOy'} = 180^\circ \implies \widehat{x'Oy'} = 180^\circ - \widehat{xOy'}$$
3. Comparing (1) and (2):
   $$\therefore \widehat{xOy} = \widehat{x'Oy'} \quad (\text{Q.E.D.})$$

---

## 🚀 Protocol 04: Classic Model 2 — Perpendicular Transversal Theorem

> **Theorem:** If a line is perpendicular to one of two parallel lines, it is also perpendicular to the other line.

![Perpendicular Transversal Proof](/images/geometry/math7_l11_perpendicular_transversal_proof.svg)

### 1. Statement Matrix

| Given (Hypothesis) | Prove (Conclusion) |
| :--- | :--- |
| $a \parallel b$ and $c \perp a$ (at point $A$, so $\widehat{A_1} = 90^\circ$) | $c \perp b$ (at point $B$, so $\widehat{B_1} = 90^\circ$) |

### 2. Proof (2-Step Execution)

1. Because lines $a \parallel b$ are cut by transversal $c$:
   $$\widehat{B_1} = \widehat{A_1} \quad (\text{Alternate interior angles})$$
2. Since $c \perp a \implies \widehat{A_1} = 90^\circ$:
   $$\widehat{B_1} = 90^\circ \implies c \perp b \quad (\text{Q.E.D.})$$

---

## 🎯 Cadet Golden Rules

- **Rule 1:** A theorem **MUST** contain an **IF** clause (Given) and a **THEN** clause (Prove).
- **Rule 2:** Never assume what you need to prove. Always start strictly from the **Given**.
- **Rule 3:** Every deductive step **MUST** state a mathematical justification in parentheses (e.g., *Linear pair*, *Alternate interior angles*).
