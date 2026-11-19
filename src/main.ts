import './styles.css'
import {
  BAKE_LOGS,
  PHOTO_CARDS,
  PROFILE,
  PROJECTS,
} from './content'
import {
  BREAD_ART_SVG,
  EYES_SVG,
  HARRI_PORTRAIT_SVG,
  TALLY_SVG,
  TIP_SVG,
} from './svg-art'

const rootEl = document.getElementById('app')
if (!rootEl) {
  throw new Error('Root #app element not found')
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function renderPage(app: HTMLElement): void {
  const projectRows = PROJECTS.map(
    (project) => `
      <li>
        <a href="${escapeHtml(project.url)}" target="_blank" rel="noopener">
          <span class="r-name">${escapeHtml(project.name)}</span>
          <span class="r-desc">${escapeHtml(project.description)}</span>
          <span class="r-arrow" aria-hidden="true">↗</span>
        </a>
      </li>`,
  ).join('')

  const photoButtons = PHOTO_CARDS.map(
    (card, index) => `
      <button
        type="button"
        class="print"
        data-index="${index}"
        aria-label="${escapeHtml(`Open card: ${card.caption}`)}"
        style="--ar:${card.ar};--r:${card.rot}deg"
      >
        <img src="${escapeHtml(card.src)}" alt="${escapeHtml(card.alt)}" loading="lazy" />
      </button>`,
  ).join('')

  const bakeItems = BAKE_LOGS.map(
    (item) => `
      <article class="bake-card">
        <div class="bake-card-top">
          <h3>${escapeHtml(item.number)}: ${escapeHtml(item.title)}</h3>
          <span>${escapeHtml(item.hydration)}</span>
        </div>
        <p class="bake-meta">${escapeHtml(item.flour)} · ${escapeHtml(item.ferment)}</p>
        <p>${escapeHtml(item.notes)}</p>
      </article>`,
  ).join('')

  app.innerHTML = `
    <div class="page" id="page">
      <svg id="line" aria-hidden="true" focusable="false"></svg>
      <div id="tip" aria-hidden="true"><span>${TIP_SVG}</span></div>

      <header class="hello" id="hello">
        <div class="hello-portrait" id="a-portrait">${HARRI_PORTRAIT_SVG}</div>
        <div class="hello-copy">
          <div class="hello-eyes" id="a-word">${EYES_SVG}</div>
          <div class="hello-text">
            <h1 class="lead" id="a-lead">${escapeHtml(PROFILE.greeting)}</h1>
            <p>${escapeHtml(PROFILE.intro)}</p>
            <p class="aside">
              ${escapeHtml(PROFILE.rolePrefix)}<a href="${escapeHtml(PROFILE.orgUrl)}" target="_blank" rel="noopener">${escapeHtml(PROFILE.orgName)}</a>.
            </p>
          </div>
        </div>
      </header>

      <main>
        <section class="bread" id="bread" aria-labelledby="bread-title">
          <div class="bread-art" id="a-art">${BREAD_ART_SVG}</div>
          <div class="bread-copy">
            <h2 class="section-title" id="bread-title">${escapeHtml(PROFILE.breadTitle)}</h2>
            <p>${escapeHtml(PROFILE.breadBody)}</p>
            <div class="btns">
              <button type="button" class="btn" id="open-bake-log">Bake log</button>
              <a class="btn" href="${escapeHtml(PROFILE.githubUrl)}" target="_blank" rel="noopener">
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section class="things" id="things" aria-labelledby="things-title">
          <h2 class="section-title" id="things-title">Some things I made</h2>
          <ul class="rows">${projectRows}</ul>
          ${TALLY_SVG}
          <p class="tally-note">
            ${escapeHtml(PROFILE.repoCountNote)}
            <a href="${escapeHtml(PROFILE.githubReposUrl)}" target="_blank" rel="noopener">See them all →</a>
          </p>
        </section>

        <section class="photos" id="photos" aria-labelledby="photos-title">
          <div class="photos-head">
            <h2 class="section-title" id="photos-title">From my camera roll</h2>
            <p class="photos-hint">Drag cards around, or click one for a closer look.</p>
          </div>
          <div class="pile" id="a-pile">${photoButtons}</div>
        </section>
      </main>

      <footer class="hi" id="hi" aria-labelledby="hi-title">
        <h2 class="section-title" id="hi-title">Say hi</h2>
        <div class="btns">
          <a class="btn" href="${escapeHtml(PROFILE.githubUrl)}" target="_blank" rel="noopener">GitHub</a>
          <a class="btn" href="${escapeHtml(PROFILE.orgUrl)}" target="_blank" rel="noopener">CommandOSS</a>
          <a class="btn" href="${escapeHtml(PROFILE.email)}">Email</a>
          <button type="button" class="btn" id="theme-toggle">Theme</button>
        </div>
        <p class="hi-foot">Harri (${escapeHtml(PROFILE.handle)}) · CommandOSS</p>
      </footer>
    </div>

    <div class="lightbox" id="closer" role="dialog" aria-modal="true" aria-label="Photo card preview" hidden>
      <div class="closer-scrim" id="closer-scrim"></div>
      <div class="closer-frame">
        <img id="closer-img" src="" alt="" />
        <p class="closer-caption" id="closer-caption"></p>
        <div class="closer-controls">
          <button type="button" class="btn" id="closer-prev">Prev</button>
          <button type="button" class="btn" id="closer-next">Next</button>
          <button type="button" class="btn" id="closer-close">Close</button>
        </div>
      </div>
    </div>

    <div class="bake-dialog" id="bake-dialog" role="dialog" aria-modal="true" aria-labelledby="bake-dialog-title" hidden>
      <div class="closer-scrim" id="bake-scrim"></div>
      <div class="bake-sheet">
        <div class="bake-head">
          <h2 class="section-title" id="bake-dialog-title">Harri's Bake Log</h2>
          <button type="button" class="btn" id="close-bake-log">Close</button>
        </div>
        <div class="bake-list">${bakeItems}</div>
      </div>
    </div>
  `
}

function initEyes(): void {
  const eyes = document.getElementById('eyes')
  const pupils = document.getElementById('pupils')
  const hoverTarget = document.getElementById('a-word') ?? eyes
  if (!eyes || !pupils || !hoverTarget) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
  let lastMove = 0

  const setOffset = (x: number, y: number) => {
    pupils.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`
  }

  const lookAt = (clientX: number, clientY: number) => {
    const rect = eyes.getBoundingClientRect()
    const dx = clientX - (rect.left + rect.width / 2)
    const dy = clientY - (rect.top + rect.height * 0.6)
    const dist = Math.hypot(dx, dy) || 1
    const scale = Math.min(1, dist / 240)
    setOffset((dx / dist) * 10 * scale, (dy / dist) * 13 * scale + 2)
  }

  window.addEventListener(
    'pointermove',
    (e) => {
      if (reduced.matches) return
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
        lastMove = performance.now()
        lookAt(e.clientX, e.clientY)
      }
    },
    { passive: true },
  )

  hoverTarget.addEventListener('pointerenter', () =>
    eyes.classList.add('surprised'),
  )
  hoverTarget.addEventListener('pointerleave', () =>
    eyes.classList.remove('surprised'),
  )

  const idleLook = () => {
    window.setTimeout(idleLook, 2200 + Math.random() * 2400)
    if (reduced.matches || performance.now() - lastMove < 3500) return
    const angle = Math.random() * Math.PI * 2
    const mag = 0.4 + Math.random() * 0.6
    setOffset(Math.cos(angle) * 10 * mag, Math.sin(angle) * 12 * mag + 2)
  }

  if (finePointer.matches) {
    setOffset(0, 2)
  } else {
    idleLook()
  }

  const blink = () => {
    window.setTimeout(blink, 2600 + Math.random() * 4000)
    if (reduced.matches || document.hidden) return
    eyes.classList.add('blink')
    window.setTimeout(() => eyes.classList.remove('blink'), 120)
  }
  window.setTimeout(blink, 2200)
}

function initScrollLine(): void {
  const page = document.getElementById('page')
  const svg = document.getElementById('line')
  const tip = document.getElementById('tip')
  if (!page || !(svg instanceof SVGSVGElement) || !tip) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  let pathEl: SVGPathElement | null = null
  let totalLen = 0
  let points: Array<{ x: number; y: number }> = []

  const buildPath = () => {
    const w = page.clientWidth
    const h = page.scrollHeight
    const pageRect = page.getBoundingClientRect()
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`)
    svg.setAttribute('width', String(w))
    svg.setAttribute('height', String(h))

    const relRect = (selectorOrId: string, byId = true) => {
      const el = byId
        ? document.getElementById(selectorOrId)
        : page.querySelector(selectorOrId)
      if (!el) return null
      const r = el.getBoundingClientRect()
      return {
        left: r.left - pageRect.left,
        right: r.right - pageRect.left,
        top: r.top - pageRect.top,
        bottom: r.bottom - pageRect.top,
        width: r.width,
        height: r.height,
      }
    }

    const ptFromRect = (
      r: { left: number; top: number; width: number; height: number } | null,
      xFrac = 0.5,
      yFrac = 0.5,
    ) => (r ? { x: r.left + r.width * xFrac, y: r.top + r.height * yFrac } : null)

    const portraitRect = relRect('a-portrait')
    const leadRect = relRect('a-lead')
    const artRect = relRect('a-art')
    const thingsTitleRect = relRect('things-title')
    const rowsRect = relRect('.rows', false)
    const tallyRect = relRect('.tally-note', false)
    const photosTitleRect = relRect('photos-title')
    const pileRect = relRect('a-pile')
    const hiTitleRect = relRect('hi-title')

    const raw: Array<{ x: number; y: number } | null> =
      w >= 820
        ? [
            ptFromRect(portraitRect, 0.885, 0.84),
            leadRect
              ? { x: Math.max(24, leadRect.left - 34), y: leadRect.bottom + 24 }
              : null,
            ptFromRect(artRect, 0.48, 0.08),
            ptFromRect(artRect, 0.5, 1.02),
            ptFromRect(thingsTitleRect, 0.5, -0.35),
            rowsRect
              ? { x: Math.max(20, rowsRect.left - 44), y: rowsRect.top + rowsRect.height * 0.45 }
              : null,
            rowsRect
              ? {
                  x: Math.max(20, rowsRect.left - 44),
                  y: (tallyRect ? tallyRect.bottom : rowsRect.bottom) + 28,
                }
              : null,
            ptFromRect(photosTitleRect, 0.5, -0.35),
            ptFromRect(pileRect, 0.5, 0.48),
            ptFromRect(hiTitleRect, 0.5, -0.35),
          ]
        : [
            ptFromRect(portraitRect, 0.82, 0.9),
            artRect ? { x: w - 18, y: artRect.top - 24 } : null,
            ptFromRect(artRect, 0.5, 0.98),
            rowsRect ? { x: 18, y: rowsRect.top - 20 } : null,
            photosTitleRect ? { x: 18, y: photosTitleRect.top - 24 } : null,
            ptFromRect(pileRect, 0.5, 0.5),
            ptFromRect(hiTitleRect, 0.5, -0.35),
          ]

    const resolved = raw.filter((p): p is { x: number; y: number } => p !== null)

    if (resolved.length < 2) return
    points = resolved

    let d = `M ${resolved[0].x.toFixed(1)} ${resolved[0].y.toFixed(1)}`
    for (let i = 1; i < resolved.length; i++) {
      const prev = resolved[i - 1]
      const curr = resolved[i]
      const midY = (prev.y + curr.y) / 2
      d += ` C ${prev.x.toFixed(1)} ${midY.toFixed(1)}, ${curr.x.toFixed(1)} ${midY.toFixed(1)}, ${curr.x.toFixed(1)} ${curr.y.toFixed(1)}`
    }

    svg.innerHTML = `<path class="stroke" fill="none" stroke-width="4" d="${d}"/>`
    pathEl = svg.querySelector('path')
    if (!pathEl) return
    totalLen = pathEl.getTotalLength()
    pathEl.style.strokeDasharray = `${totalLen}`
    updateDraw()
  }

  const updateDraw = () => {
    if (!pathEl || totalLen <= 0 || points.length === 0) return
    if (reduced.matches) {
      pathEl.style.strokeDashoffset = '0'
      tip.classList.remove('on')
      return
    }
    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight,
    )
    const progress = Math.min(1, Math.max(0.08, window.scrollY / maxScroll))
    const drawn = totalLen * progress
    pathEl.style.strokeDashoffset = `${Math.max(0, totalLen - drawn)}`
    const pt = pathEl.getPointAtLength(drawn)
    tip.style.transform = `translate(${pt.x.toFixed(1)}px, ${pt.y.toFixed(1)}px)`
    tip.classList.toggle('on', window.scrollY > 24 && progress < 0.99)
  }

  buildPath()
  window.addEventListener('resize', buildPath)
  window.addEventListener('scroll', updateDraw, { passive: true })
}

function initPileAndLightbox(): void {
  const pile = document.getElementById('a-pile')
  const closer = document.getElementById('closer')
  const closerImg = document.getElementById('closer-img') as HTMLImageElement | null
  const closerCaption = document.getElementById('closer-caption')
  const prevBtn = document.getElementById('closer-prev')
  const nextBtn = document.getElementById('closer-next')
  const closeBtn = document.getElementById('closer-close')
  const scrim = document.getElementById('closer-scrim')
  if (!pile || !closer || !closerImg || !closerCaption) return

  const prints = Array.from(pile.querySelectorAll<HTMLButtonElement>('.print'))
  let topZ = prints.length + 2
  let activeIndex = -1

  const layoutPile = () => {
    const pw = pile.clientWidth
    const cols = pw < 540 ? 2 : 3
    const cardW = pw < 540 ? Math.min(190, pw * 0.43) : Math.min(240, pw * 0.27)
    const colGap = (pw - cols * cardW) / (cols + 1)
    const rowH = pw < 540 ? 235 : 270
    const rows = Math.ceil(prints.length / cols)
    pile.style.minHeight = `${rows * rowH + 60}px`

    prints.forEach((btn, idx) => {
      const col = idx % cols
      const row = Math.floor(idx / cols)
      const jitterX = ((idx % 3) - 1) * (pw < 540 ? 6 : 16)
      const jitterY = (idx % 2 === 0 ? -1 : 1) * (pw < 540 ? 8 : 14)
      const x = Math.max(4, Math.min(pw - cardW - 4, colGap * (col + 1) + col * cardW + jitterX))
      const y = Math.max(8, row * rowH + 18 + jitterY)
      btn.style.setProperty('--w', `${cardW}px`)
      btn.style.setProperty('--x', `${x.toFixed(1)}px`)
      btn.style.setProperty('--y', `${y.toFixed(1)}px`)
      btn.style.zIndex = String(idx + 1)
    })
  }

  const openLightbox = (index: number) => {
    activeIndex = (index + PHOTO_CARDS.length) % PHOTO_CARDS.length
    const card = PHOTO_CARDS[activeIndex]
    closerImg.src = card.src
    closerImg.alt = card.alt
    closerCaption.textContent = card.caption
    closer.hidden = false
    closeBtn?.focus()
  }

  const closeLightbox = () => {
    closer.hidden = true
    activeIndex = -1
  }

  layoutPile()
  window.addEventListener('resize', layoutPile)

  prints.forEach((btn, idx) => {
    let startX = 0
    let startY = 0
    let origX = 0
    let origY = 0
    let moved = false
    let dragging = false

    btn.addEventListener('pointerdown', (e) => {
      dragging = true
      moved = false
      startX = e.clientX
      startY = e.clientY
      origX = Number.parseFloat(btn.style.getPropertyValue('--x')) || 0
      origY = Number.parseFloat(btn.style.getPropertyValue('--y')) || 0
      topZ += 1
      btn.style.zIndex = String(topZ)
      btn.classList.add('dragging')
      btn.setPointerCapture(e.pointerId)
    })

    btn.addEventListener('pointermove', (e) => {
      if (!dragging) return
      const dx = e.clientX - startX
      const dy = e.clientY - startY
      if (Math.hypot(dx, dy) > 6) moved = true
      const maxX = Math.max(0, pile.clientWidth - btn.offsetWidth)
      const maxY = Math.max(0, pile.clientHeight - btn.offsetHeight)
      const nx = Math.max(0, Math.min(maxX, origX + dx))
      const ny = Math.max(0, Math.min(maxY, origY + dy))
      btn.style.setProperty('--x', `${nx.toFixed(1)}px`)
      btn.style.setProperty('--y', `${ny.toFixed(1)}px`)
    })

    const endDrag = () => {
      if (!dragging) return
      dragging = false
      btn.classList.remove('dragging')
      if (!moved) {
        openLightbox(idx)
      }
    }

    btn.addEventListener('pointerup', endDrag)
    btn.addEventListener('pointercancel', endDrag)
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        openLightbox(idx)
      }
    })
  })

  prevBtn?.addEventListener('click', () => {
    if (activeIndex >= 0) openLightbox(activeIndex - 1)
  })
  nextBtn?.addEventListener('click', () => {
    if (activeIndex >= 0) openLightbox(activeIndex + 1)
  })
  closeBtn?.addEventListener('click', closeLightbox)
  scrim?.addEventListener('click', closeLightbox)
  window.addEventListener('keydown', (e) => {
    if (closer.hidden) return
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') openLightbox(activeIndex - 1)
    if (e.key === 'ArrowRight') openLightbox(activeIndex + 1)
  })
}

function initModalsAndTheme(): void {
  const openBake = document.getElementById('open-bake-log')
  const closeBake = document.getElementById('close-bake-log')
  const bakeScrim = document.getElementById('bake-scrim')
  const bakeDialog = document.getElementById('bake-dialog')

  openBake?.addEventListener('click', () => {
    if (!bakeDialog) return
    bakeDialog.hidden = false
    closeBake?.focus()
  })

  const hideBake = () => {
    if (bakeDialog) bakeDialog.hidden = true
  }
  closeBake?.addEventListener('click', hideBake)
  bakeScrim?.addEventListener('click', hideBake)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bakeDialog && !bakeDialog.hidden) {
      hideBake()
    }
  })

  const themeBtn = document.getElementById('theme-toggle')
  const isCurrentlyDark = () => {
    const explicit = document.documentElement.dataset.theme
    if (explicit === 'dark') return true
    if (explicit === 'light') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  const syncThemeLabel = () => {
    if (!themeBtn) return
    themeBtn.textContent = isCurrentlyDark() ? 'Light mode' : 'Dark mode'
  }
  syncThemeLabel()

  themeBtn?.addEventListener('click', () => {
    const next = isCurrentlyDark() ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('harri-theme', next)
    } catch {}
    syncThemeLabel()
  })
}

renderPage(rootEl)
initEyes()
initScrollLine()
initPileAndLightbox()
initModalsAndTheme()
