# Dark Portfolio Landing Page

An ultra-modern, single-page dark portfolio built with **React**, **Vite**, **Tailwind CSS**, **TypeScript**, **GSAP**, **Framer Motion**, and **hls.js**.

---

## 🚀 Key Features Implemented

1. **Section 1: Loading Screen**
   - Fullscreen overlay (`fixed inset-0 z-[9999] bg-bg`).
   - High-precision `requestAnimationFrame` counter transitioning smoothly from `000` to `100` over `2700ms`.
   - Cycling rotating words (`"Design"`, `"Create"`, `"Inspire"`) with `AnimatePresence` every `900ms`.
   - Bottom progress bar with `.accent-gradient` (`linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)`) and soft glow.

2. **Section 2: Hero Section**
   - Full-viewport background HLS video powered by `hls.js` with fallback to native iOS/macOS Safari HLS (`https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8`).
   - Floating navbar pill with `backdrop-blur-md`, logo ring with hover reversal, nav links, and interactive "Say hi" button with gradient hover border.
   - Cycling roles (`"Creative"`, `"Fullstack"`, `"Founder"`, `"Scholar"`) with `@keyframes role-fade-in`.
   - GSAP entrance timeline (`power3.out`) for `.name-reveal` and `.blur-in`.
   - Animated scroll indicator with `@keyframes scroll-down`.

3. **Section 3: Selected Works**
   - Bento Grid with alternating column spans (`7 / 5 / 5 / 7`).
   - Halftone dot matrix overlay with `radial-gradient` and `mix-blend-multiply`.
   - Hover blur reveal with pill featuring animated rotating gradient border.
   - Project detail inspection modal on click.

4. **Section 4: Journal**
   - Recent thoughts displayed in horizontal pill capsules with category tags, read times, and dates.

5. **Section 5: Explorations (Parallax Gallery)**
   - Scroll-driven parallax with `GSAP ScrollTrigger`.
   - Pinned center layer (`pin: contentRef, pinSpacing: false`).
   - Dual-column parallax items with card rotations and interactive lightbox modal on click.

6. **Section 6: Stats**
   - 3-column stats grid (`20+ Years Experience`, `95+ Projects Done`, `200% Satisfied Clients`).

7. **Section 7: Contact & Footer**
   - Flipped HLS background video (`scale-y-[-1]`) with `bg-black/60` dark overlay.
   - GSAP infinite marquee loop (`"BUILDING THE FUTURE • "` repeated 10x, `xPercent: -50`).
   - Email CTA with gradient hover border ring.
   - Footer bar with social links and live pulsing green status dot ("Available for projects").

8. **Dual Profile Toggle**
   - Switch seamlessly between the exact specification data (**Michael Smith**) and **Ashutosh Dubey**'s real portfolio data directly from the navbar pill!

---

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Start local development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
