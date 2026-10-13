import"./style-BJXntHts.js";document.querySelector("#app").innerHTML=`
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
          <span class="tool-total">02</span>
        </div>

        <div class="instrument-grid">
          <a class="instrument-card chord-hub-card" href="./chords/">
            <div class="instrument-card-top">
              <span class="instrument-number">01 / CHORDS</span>
              <span class="card-arrow" aria-hidden="true">↗</span>
            </div>
            <div class="mini-chord-preview" aria-hidden="true">
              <div class="chord-preview-instrument">
                <span>PIANO</span>
                <div class="mini-piano">
                  <i class="mini-white played"></i><i class="mini-white"></i><i class="mini-white played"></i><i class="mini-white"></i><i class="mini-white played"></i><i class="mini-white"></i><i class="mini-white"></i>
                  <i class="mini-black black-one"></i><i class="mini-black black-two"></i><i class="mini-black black-four"></i><i class="mini-black black-five"></i><i class="mini-black black-six"></i>
                </div>
              </div>
              <div class="chord-preview-instrument">
                <span>GUITAR</span>
                <div class="mini-guitar">
                  <i class="mini-guitar-string"></i><i class="mini-guitar-string"></i><i class="mini-guitar-string"></i><i class="mini-guitar-string"></i><i class="mini-guitar-string"></i><i class="mini-guitar-string"></i>
                  <i class="mini-guitar-fret"></i><i class="mini-guitar-fret"></i><i class="mini-guitar-fret"></i><i class="mini-guitar-fret"></i>
                  <i class="mini-guitar-dot dot-one"></i><i class="mini-guitar-dot dot-two"></i><i class="mini-guitar-dot dot-three"></i>
                </div>
              </div>
            </div>
            <div class="instrument-card-copy">
              <h3>Chords</h3>
              <p>Choose piano or guitar, then find the chord shape.</p>
            </div>
            <span class="instrument-action">CHOOSE AN INSTRUMENT <span aria-hidden="true">→</span></span>
          </a>

          <a class="instrument-card archive-card" href="./archives/">
            <div class="instrument-card-top">
              <span class="instrument-number">02 / SONGS</span>
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
`;const s=document.querySelector("#theme-toggle");function e(i){const a=i==="dark";document.documentElement.dataset.theme=i,s.setAttribute("aria-pressed",String(a)),s.setAttribute("aria-label",`Switch to ${a?"light":"dark"} mode`),s.title=`Switch to ${a?"light":"dark"} mode`,s.querySelector(".theme-icon").textContent=a?"☼":"☾"}e(localStorage.getItem("song-utils-theme-v2")??"dark");s.addEventListener("click",()=>{const i=document.documentElement.dataset.theme==="dark"?"light":"dark";localStorage.setItem("song-utils-theme-v2",i),e(i)});
