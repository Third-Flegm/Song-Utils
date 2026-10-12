import"./style-D2z-nlSX.js";document.querySelector("#app").innerHTML=`
  <div class="app-shell home-shell">
    <header class="topbar">
      <a class="brand" href="./" aria-label="Song Utils home">
        <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
        <span>song<span class="brand-light">utils</span></span>
      </a>
      <div class="topbar-right">
        <span class="edition-label">YOUR MUSIC WORKSPACE</span>
        <button class="theme-toggle" id="theme-toggle" type="button" aria-label="Switch to dark mode" title="Switch to dark mode" aria-pressed="false">
          <span class="theme-icon" aria-hidden="true">☾</span>
        </button>
      </div>
    </header>

    <main class="home-main">
      <section class="home-heading">
        <p class="eyebrow"><span class="eyebrow-dot"></span> SONG UTILS <span class="eyebrow-divider">/</span> HOME</p>
        <h1>Make room for <em>music.</em></h1>
          <p class="home-intro">Quick references for the chords and songs you play.</p>
      </section>

      <section class="home-tools" aria-labelledby="tools-title">
        <div class="home-section-heading">
          <div>
            <p class="section-index">01 <span>YOUR TOOLS</span></p>
            <h2 id="tools-title">Choose a tool</h2>
          </div>
          <span class="tool-total">03</span>
        </div>

        <div class="instrument-grid">
          <a class="instrument-card" href="./chords/?instrument=piano">
            <div class="instrument-card-top">
              <span class="instrument-number">01 / KEYS</span>
              <span class="card-arrow" aria-hidden="true">↗</span>
            </div>
            <div class="mini-piano" aria-hidden="true">
              <span class="mini-white played"></span><span class="mini-white"></span><span class="mini-white played"></span><span class="mini-white"></span><span class="mini-white played"></span><span class="mini-white"></span><span class="mini-white"></span>
              <span class="mini-black black-one"></span><span class="mini-black black-two"></span><span class="mini-black black-four"></span><span class="mini-black black-five"></span><span class="mini-black black-six"></span>
            </div>
            <div class="instrument-card-copy">
              <h3>Piano chords</h3>
              <p>See chord tones highlighted on the keyboard.</p>
            </div>
            <span class="instrument-action">OPEN PIANO ATLAS <span aria-hidden="true">→</span></span>
          </a>

          <a class="instrument-card guitar-card" href="./chords/?instrument=guitar">
            <div class="instrument-card-top">
              <span class="instrument-number">02 / STRINGS</span>
              <span class="card-arrow" aria-hidden="true">↗</span>
            </div>
            <div class="mini-guitar" aria-hidden="true">
              <span class="mini-guitar-string"></span><span class="mini-guitar-string"></span><span class="mini-guitar-string"></span><span class="mini-guitar-string"></span><span class="mini-guitar-string"></span><span class="mini-guitar-string"></span>
              <span class="mini-guitar-fret"></span><span class="mini-guitar-fret"></span><span class="mini-guitar-fret"></span><span class="mini-guitar-fret"></span>
              <span class="mini-guitar-dot dot-one"></span><span class="mini-guitar-dot dot-two"></span><span class="mini-guitar-dot dot-three"></span>
            </div>
            <div class="instrument-card-copy">
              <h3>Guitar chords</h3>
              <p>Find familiar open shapes and barre grips.</p>
            </div>
            <span class="instrument-action">OPEN GUITAR ATLAS <span aria-hidden="true">→</span></span>
          </a>

          <a class="instrument-card archive-card" href="./archives/">
            <div class="instrument-card-top">
              <span class="instrument-number">03 / SONGS</span>
              <span class="card-arrow" aria-hidden="true">↗</span>
            </div>
            <div class="mini-archive" aria-hidden="true">
              <span class="mini-archive-line"><b>C</b><i></i><i></i></span>
              <span class="mini-archive-line"><b>Am</b><i></i><i></i></span>
              <span class="mini-archive-line"><b>F</b><i></i><i></i></span>
            </div>
            <div class="instrument-card-copy">
              <h3>Song Archives</h3>
              <p>Keep lyrics and chord changes together by measure.</p>
            </div>
            <span class="instrument-action">BROWSE SONGS <span aria-hidden="true">→</span></span>
          </a>
        </div>
      </section>

      <footer class="page-footer home-footer">
        <span>SONG UTILS <span class="footer-separator">/</span> CHORD ATLAS</span>
        <span>CHORDS + SONGS · PIANO + GUITAR</span>
      </footer>
    </main>
  </div>
`;const s=document.querySelector("#theme-toggle");function n(i){const a=i==="dark";document.documentElement.dataset.theme=a?"dark":"light",s.setAttribute("aria-pressed",String(a)),s.setAttribute("aria-label",`Switch to ${a?"light":"dark"} mode`),s.title=`Switch to ${a?"light":"dark"} mode`,s.querySelector(".theme-icon").textContent=a?"☼":"☾"}n(localStorage.getItem("song-utils-theme")==="dark"?"dark":"light");s.addEventListener("click",()=>{const i=document.documentElement.dataset.theme==="dark"?"light":"dark";localStorage.setItem("song-utils-theme",i),n(i)});
