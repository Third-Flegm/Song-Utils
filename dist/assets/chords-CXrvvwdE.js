import"./style-D2z-nlSX.js";import{c as s}from"./instruments-CfFpsWla.js";const t=document.querySelector("#app");function o(i){return i.id==="piano"?`
      <div class="choice-piano" aria-hidden="true">
        <i class="choice-white active"></i><i class="choice-white"></i><i class="choice-white active"></i><i class="choice-white"></i><i class="choice-white active"></i><i class="choice-white"></i><i class="choice-white"></i>
        <i class="choice-black black-a"></i><i class="choice-black black-b"></i><i class="choice-black black-d"></i><i class="choice-black black-e"></i><i class="choice-black black-f"></i>
      </div>
    `:`
    <div class="choice-guitar" aria-hidden="true">
      <i class="choice-string"></i><i class="choice-string"></i><i class="choice-string"></i><i class="choice-string"></i><i class="choice-string"></i><i class="choice-string"></i>
      <i class="choice-fret"></i><i class="choice-fret"></i><i class="choice-fret"></i><i class="choice-fret"></i>
      <i class="choice-dot dot-a"></i><i class="choice-dot dot-b"></i><i class="choice-dot dot-c"></i>
    </div>
  `}t.innerHTML=`
  <div class="app-shell instrument-page-shell">
    <header class="topbar">
      <a class="brand" href="../" aria-label="Song Utils home">
        <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
        <span>song<span class="brand-light">utils</span></span>
      </a>
      <div class="topbar-right">
        <a class="home-link" href="../">HOME <span aria-hidden="true">↖</span></a>
        <button class="theme-toggle" id="theme-toggle" type="button" aria-label="Switch to dark mode" title="Switch to dark mode" aria-pressed="false">
          <span class="theme-icon" aria-hidden="true">☾</span>
        </button>
      </div>
    </header>

    <main class="instrument-page-main">
      <section class="instrument-page-heading">
        <p class="eyebrow"><span class="eyebrow-dot"></span> SONG UTILS <span class="eyebrow-divider">/</span> CHORDS</p>
        <h1>Pick your <em>instrument.</em></h1>
        <p>Choose the view that matches what you play.</p>
      </section>

      <section class="instrument-choice-section" aria-labelledby="instrument-choice-title">
        <div class="instrument-choice-heading">
          <div>
            <p class="section-index">01 <span>CHORD ATLAS</span></p>
            <h2 id="instrument-choice-title">Select an instrument</h2>
          </div>
          <span class="choice-count">${String(s.instruments.length).padStart(2,"0")}</span>
        </div>
        <div class="instrument-choice-grid">
          ${s.instruments.map((i,e)=>`
            <a class="instrument-choice" href="./atlas/?instrument=${i.id}">
              <div class="choice-topline"><span>${String(e+1).padStart(2,"0")} / ${i.id==="piano"?"KEYS":"STRINGS"}</span><span class="choice-arrow" aria-hidden="true">↗</span></div>
              ${o(i)}
              <div class="choice-copy">
                <h3>${i.name}</h3>
                <p>${i.id==="piano"?"Chord notes highlighted on the keyboard.":"Open chord shapes and movable barre grips."}</p>
              </div>
              <span class="choice-action">OPEN ${i.name.toUpperCase()} ATLAS <span aria-hidden="true">→</span></span>
            </a>
          `).join("")}
        </div>
      </section>

      <footer class="page-footer instrument-page-footer">
        <span>SONG UTILS <span class="footer-separator">/</span> CHORD ATLAS</span>
        <span>12 ROOTS · MAJOR + MINOR</span>
      </footer>
    </main>
  </div>
`;const a=document.querySelector("#theme-toggle");function c(i){const e=i==="dark";document.documentElement.dataset.theme=i,a.setAttribute("aria-pressed",String(e)),a.setAttribute("aria-label",`Switch to ${e?"light":"dark"} mode`),a.title=`Switch to ${e?"light":"dark"} mode`,a.querySelector(".theme-icon").textContent=e?"☼":"☾"}c(localStorage.getItem("song-utils-theme")??"dark");a.addEventListener("click",()=>{const i=document.documentElement.dataset.theme==="dark"?"light":"dark";localStorage.setItem("song-utils-theme",i),c(i)});
