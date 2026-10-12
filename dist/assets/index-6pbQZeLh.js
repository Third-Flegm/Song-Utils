(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))d(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&d(n)}).observe(document,{childList:!0,subtree:!0});function l(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(a){if(a.ep)return;a.ep=!0;const o=l(a);fetch(a.href,o)}})();const M=[{id:"piano",name:"Piano",description:"Keyboard chords",roots:["C","C#","D","D#","E","F","F#","G","G#","A","B","H"],chordTypes:[{id:"major",name:"Major",suffix:"",intervals:[0,4,7]},{id:"minor",name:"Minor",suffix:"m",intervals:[0,3,7]}]}],q={instruments:M},p=["C","C#","D","D#","E","F","F#","G","G#","A","B","H"],f=["C","D","E","F","G","A","H"],N={C:0,D:2,E:4,F:5,G:7,A:9,H:11},P=new Set([1,3,6,8,10]),R=document.querySelector("#app");R.innerHTML=`
  <div class="app-shell">
    <header class="topbar">
      <a class="brand" href="#" aria-label="Song Utils home">
        <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
        <span>song<span class="brand-light">utils</span></span>
      </a>
      <div class="topbar-right">
        <span class="edition-label">THE MUSICIAN'S TOOLKIT</span>
        <label class="instrument-control" for="instrument-select">
          <span class="instrument-icon" aria-hidden="true">♫</span>
          <select id="instrument-select" aria-label="Select instrument"></select>
          <span class="select-chevron" aria-hidden="true">⌄</span>
        </label>
        <button class="theme-toggle" id="theme-toggle" type="button" aria-label="Switch to dark mode" title="Switch to dark mode" aria-pressed="false">
          <span class="theme-icon" aria-hidden="true">☾</span>
        </button>
      </div>
    </header>

    <main>
      <section class="intro-row" aria-labelledby="page-title">
        <div>
          <p class="eyebrow"><span class="eyebrow-dot"></span> CHORD ATLAS <span class="eyebrow-divider">/</span> PIANO</p>
          <h1 id="page-title">Find your <em>next</em> sound.</h1>
          <p class="intro-copy">Pick a root. Add a sharp or minor and see the keys change.</p>
        </div>
        <div class="instrument-stamp" aria-hidden="true">
          <span class="stamp-note">♪</span>
          <span class="stamp-caption">PLAY<br />BY FEEL</span>
        </div>
      </section>

      <section class="workspace" aria-label="Piano chord explorer">
        <aside class="catalog-panel">
          <div class="panel-heading">
            <div>
              <p class="section-index">01 <span>LIBRARY</span></p>
              <h2>Choose a chord</h2>
            </div>
            <span class="chord-count" id="chord-count"></span>
          </div>

          <div class="modifier-label">BASE NOTE</div>
          <div class="root-picker" id="root-picker" role="group" aria-label="Choose a base note">
            ${f.map(e=>`<button class="root-option${e==="C"?" is-active":""}" type="button" data-base-root="${e}" aria-pressed="${e==="C"}">${e}</button>`).join("")}
          </div>

          <div class="modifier-label modifier-heading">ADD MODIFIERS</div>
          <div class="modifier-row" role="group" aria-label="Chord modifiers">
            <button class="modifier-button" id="sharp-toggle" type="button" aria-pressed="false"><span class="modifier-symbol">#</span><span>Sharp</span></button>
            <button class="modifier-button" id="minor-toggle" type="button" aria-pressed="false"><span class="modifier-symbol">m</span><span>Minor</span></button>
          </div>
          <p class="catalog-footnote"><span class="footnote-dot"></span> <span id="catalog-summary"></span></p>
        </aside>

        <section class="detail-panel" aria-live="polite" aria-label="Selected chord">
          <div class="detail-topline">
            <p class="section-index">02 <span>YOUR CHORD</span></p>
            <span class="voicing-badge"><span class="live-dot"></span> ROOT POSITION</span>
          </div>
          <div class="chord-heading">
            <div>
              <h2 id="chord-title">C</h2>
              <p id="chord-subtitle">C major triad</p>
            </div>
            <span class="chord-symbol" id="chord-symbol">C</span>
          </div>

          <div class="notes-strip">
            <div class="notes-label"><span class="notes-icon" aria-hidden="true">⌁</span> NOTES IN THIS CHORD</div>
            <div class="note-chips" id="note-chips"></div>
          </div>

          <div class="keyboard-header">
            <div>
              <p class="keyboard-title">KEYBOARD VIEW</p>
              <p class="keyboard-hint">Highlighted keys are played together</p>
            </div>
            <div class="octave-label" id="octave-label"></div>
          </div>
          <div class="keyboard-scroll" tabindex="0" aria-label="Scrollable piano keyboard">
            <div class="keyboard" id="keyboard" role="img" aria-label="Piano keyboard with chord notes highlighted"></div>
          </div>
          <div class="keyboard-legend"><span class="legend-key"></span> PLAY THIS NOTE <span class="legend-rule"></span> <span id="grip-caption">3 NOTES · ROOT POSITION</span></div>
          <div class="detail-bottom">
            <span class="detail-tip"><span aria-hidden="true">✳</span> Start with the lowest highlighted key.</span>
            <span class="range-note" id="range-note"></span>
          </div>
        </section>
      </section>

      <footer class="page-footer">
        <span>SONG UTILS <span class="footer-separator">/</span> CHORD ATLAS</span>
        <span>GOOD MUSIC STARTS WITH A NOTE.</span>
      </footer>
    </main>
  </div>
`;const $=document.querySelector("#instrument-select"),u=document.querySelector("#theme-toggle"),T=document.querySelector("#root-picker"),H=document.querySelector("#chord-count"),D=document.querySelector("#catalog-summary"),v=q.instruments;let h=v[0],S=f[0],m=!1,b=!1;function A(e){const s=e==="dark";document.documentElement.dataset.theme=s?"dark":"light",u.setAttribute("aria-pressed",String(s)),u.setAttribute("aria-label",`Switch to ${s?"light":"dark"} mode`),u.title=`Switch to ${s?"light":"dark"} mode`,u.querySelector(".theme-icon").textContent=s?"☼":"☾"}A(localStorage.getItem("song-utils-theme")==="dark"?"dark":"light");u.addEventListener("click",()=>{const e=document.documentElement.dataset.theme==="dark"?"light":"dark";localStorage.setItem("song-utils-theme",e),A(e)});$.innerHTML=v.map(e=>`<option value="${e.id}">${e.name}</option>`).join("");function j(e,s){return`${e}${s.suffix}`}function F(){const e=(N[S]+Number(m))%p.length;return p[e]}function G(){T.querySelectorAll("[data-base-root]").forEach(e=>{const s=e.dataset.baseRoot===S;e.classList.toggle("is-active",s),e.setAttribute("aria-pressed",String(s))}),document.querySelector("#sharp-toggle").setAttribute("aria-pressed",String(m)),document.querySelector("#minor-toggle").setAttribute("aria-pressed",String(b)),H.textContent=String(f.length).padStart(2,"0"),D.textContent=`${h.roots.length} notes · major and minor`}function B(e,s){const l=Math.max(...s.map(t=>t.midi)),d=60,a=Math.max(e+12,l+2),o=[],n=[];let i=0;for(let t=d;t<=a;t+=1){const r=t%12,y={midi:t,pitchClass:r,name:p[r],octave:Math.floor(t/12)-1};if(P.has(r)){const w=o.length;n.push({...y,left:w*42-13})}else o.push({...y,left:i*42}),i+=1}const c=new Set(s.map(t=>t.midi)),k=o.map(t=>{const r=c.has(t.midi),y=t.name==="C";return`<span class="white-key${r?" is-played":""}" style="left:${t.left}px" aria-hidden="true">
      ${r?`<span class="key-note-label">${t.name}</span>`:""}
      ${y?`<span class="key-octave-label">C${t.octave}</span>`:""}
    </span>`}).join(""),x=n.map(t=>{const r=c.has(t.midi);return`<span class="black-key${r?" is-played":""}" style="left:${t.left}px" aria-hidden="true">
      ${r?`<span class="key-note-label">${t.name}</span>`:""}
    </span>`}).join(""),E=o.length*42,I=Math.max(0,...n.map(t=>t.left+26)),L=Math.max(E,I),C=`${p[d%12]}${Math.floor(d/12)-1}`,O=`${p[a%12]}${Math.floor(a/12)-1}`;document.querySelector("#keyboard").innerHTML=`
    <div class="keyboard-keys" style="width:${L}px;height:166px">
      ${k}${x}
    </div>
  `,document.querySelector("#keyboard").setAttribute("aria-label",`Piano keyboard showing ${s.map(t=>`${t.name}${t.octave}`).join(", ")}`),document.querySelector("#octave-label").textContent=`${C} — ${O}`,document.querySelector("#range-note").textContent=`${C} TO ${O}`}function K(){const e=F(),s=b?"minor":"major",l=h.chordTypes.find(i=>i.id===s)??h.chordTypes[0],a=60+h.roots.indexOf(e),o=j(e,l),n=l.intervals.map(i=>{const c=a+i,k=c%12;return{midi:c,name:p[k],octave:Math.floor(c/12)-1}});document.querySelector("#chord-title").textContent=o,document.querySelector("#chord-subtitle").textContent=`${e} ${l.name.toLowerCase()} chord`,document.querySelector("#chord-symbol").textContent=o,document.querySelector("#note-chips").innerHTML=n.map((i,c)=>`
    <span class="note-chip"><span class="note-chip-index">${String(c+1).padStart(2,"0")}</span>${i.name}<sup>${i.octave}</sup></span>
  `).join(""),document.querySelector("#grip-caption").textContent=`${n.length} NOTES · ROOT POSITION`,B(a,n)}function g(){G(),K()}T.addEventListener("click",e=>{const s=e.target.closest("[data-base-root]");s&&(S=s.dataset.baseRoot,g())});document.querySelector("#sharp-toggle").addEventListener("click",()=>{m=!m,g()});document.querySelector("#minor-toggle").addEventListener("click",()=>{b=!b,g()});$.addEventListener("change",()=>{h=v.find(e=>e.id===$.value)??v[0],S=f[0],m=!1,b=!1,g()});g();
