import"./style-D2z-nlSX.js";import{c as v}from"./instruments-CfFpsWla.js";const R=[2,2,3,3,3,4];function N({instrument:e,rootPitch:a,type:p,symbol:l,noteNames:c}){const g=M(e,a,p,c);return L(g,l),g.notes}function M(e,a,p,l){const c=e.tuning.split("").map((d,n)=>({note:d,midi:(R[n]+1)*12+l.indexOf(d)})),u={"0:major":{frets:[null,3,2,0,1,0],fingers:[0,3,2,0,1,0]},"2:major":{frets:[null,null,0,2,3,2],fingers:[0,0,0,1,3,2]},"4:major":{frets:[0,2,2,1,0,0],fingers:[0,2,3,1,0,0]},"7:major":{frets:[3,2,0,0,0,3],fingers:[2,1,0,0,0,3]},"9:major":{frets:[null,0,2,2,2,0],fingers:[0,0,1,2,3,0]},"2:minor":{frets:[null,null,0,2,3,1],fingers:[0,0,0,2,3,1]},"4:minor":{frets:[0,2,2,0,0,0],fingers:[0,2,3,0,0,0]},"9:minor":{frets:[null,0,2,2,1,0],fingers:[0,0,2,3,1,0]}}[`${a}:${p.id}`];let o,r,h=[];if(u)({frets:o,fingers:r}=u);else{const d=p.id==="minor",n=(a-c[0].midi%12+12)%12,i=(a-c[1].midi%12+12)%12,t=i>0&&(n===0||i<n),s=t?i:n;t?(o=d?[null,s,s+2,s+2,s+1,s]:[null,s,s+2,s+2,s+2,s],r=d?[0,1,3,3,2,1]:[0,1,3,3,3,1],h=[{fret:s,firstString:1,lastString:5,finger:1}]):(o=d?[s,s+2,s+2,s,s,s]:[s,s+2,s+2,s+1,s,s],r=d?[1,3,4,1,1,1]:[1,3,4,2,1,1],h=[{fret:s,firstString:0,lastString:5,finger:1}])}const m=c.flatMap((d,n)=>{if(o[n]===null)return[];const i=d.midi+o[n],t=i%12;return[{midi:i,name:l[t],octave:Math.floor(i/12)-1,isRoot:t===a}]}),b=o.filter(d=>d!==null&&d>0);return{tuning:c,frets:o,fingers:r,barres:h,notes:m,firstFret:b.length?Math.min(...b):1,isOpenPosition:o.includes(0)}}function L(e,a){const l=e.firstFret,c=Array.from({length:5},(n,i)=>l+i),g=e.tuning.map(n=>`<span>${n.note}${Math.floor(n.midi/12)-1}</span>`).join(""),u=e.frets.map(n=>`<span>${n===null?'<span class="guitar-muted-marker">×</span>':n===0?'<span class="guitar-open-marker">0</span>':""}</span>`).join(""),o=e.tuning.map((n,i)=>{const t=e.frets[i];if(t===null||t===0||e.barres.some(S=>S.fret===t&&i>=S.firstString&&i<=S.lastString))return"";const s=t-l+1;return`<span class="guitar-finger${e.notes.some(S=>S.isRoot&&S.midi===n.midi+t)?" is-root":""}" style="grid-column:${i+1};grid-row:${s}">${e.fingers[i]}</span>`}).join(""),r=e.barres.map(n=>{const i=n.fret-l+1;return`<span class="guitar-barre" style="grid-column:${n.firstString+1}/${n.lastString+2};grid-row:${i}">${n.finger}</span>`}).join(""),h=e.tuning.map((n,i)=>`<span class="guitar-string-wire" style="grid-column:${i+1};grid-row:1/6"></span>`).join(""),m=c.map((n,i)=>`<span class="guitar-fret-row${i===0&&e.isOpenPosition?" is-nut":""}" style="grid-column:1/-1;grid-row:${i+1}"></span>`).join(""),b=e.isOpenPosition?"OPEN POSITION":`FRET ${l}–${l+5-1}`,d=e.barres.length?"BARRE SHAPE":"OPEN SHAPE";document.querySelector("#keyboard").innerHTML=`
    <div class="guitar-diagram">
      <div class="guitar-string-labels"><span class="guitar-axis-label">TUNING</span>${g}</div>
      <div class="guitar-open-row"><span class="guitar-axis-label">OPEN</span>${u}</div>
      <div class="guitar-neck-grid">
        <div class="guitar-fret-labels">${c.map(n=>`<span>${n}</span>`).join("")}</div>
        <div class="guitar-grid${e.isOpenPosition?" is-open-position":""}">
          ${m}${h}${r}${o}
        </div>
      </div>
    </div>
  `,document.querySelector("#keyboard").setAttribute("aria-label",`Guitar fretboard showing ${a} chord grip`),document.querySelector("#grip-display").setAttribute("aria-label",`Scrollable guitar fretboard showing ${a}`),document.querySelector("#keyboard-legend").classList.add("is-guitar"),document.querySelector("#grip-title").textContent="FRETBOARD VIEW",document.querySelector("#grip-hint").textContent="× is muted, 0 is open; numbers show fingers.",document.querySelector("#grip-legend").textContent="FINGER POSITIONS",document.querySelector("#grip-caption").textContent=d,document.querySelector("#grip-tip").textContent="Follow each string from its tuning label to the marked fret.",document.querySelector("#octave-label").textContent="STANDARD TUNING",document.querySelector("#range-note").textContent=b}const P=new Set([1,3,6,8,10]);function F({rootMidi:e,notes:a,noteNames:p}){const l=Math.max(...a.map(t=>t.midi)),c=60,g=Math.max(e+12,l+2),u=[],o=[];let r=0;for(let t=c;t<=g;t+=1){const s=t%12,E={midi:t,name:p[s],octave:Math.floor(t/12)-1};P.has(s)?o.push({...E,left:u.length*42-13}):(u.push({...E,left:r*42}),r+=1)}const h=new Set(a.map(t=>t.midi)),m=u.map(t=>{const s=h.has(t.midi);return`<span class="white-key${s?" is-played":""}" style="left:${t.left}px" aria-hidden="true">
      ${s?`<span class="key-note-label">${t.name}</span>`:""}
      ${t.name==="C"?`<span class="key-octave-label">C${t.octave}</span>`:""}
    </span>`}).join(""),b=o.map(t=>{const s=h.has(t.midi);return`<span class="black-key${s?" is-played":""}" style="left:${t.left}px" aria-hidden="true">
      ${s?`<span class="key-note-label">${t.name}</span>`:""}
    </span>`}).join(""),d=Math.max(u.length*42,...o.map(t=>t.left+26)),n=`${p[c%12]}${Math.floor(c/12)-1}`,i=`${p[g%12]}${Math.floor(g/12)-1}`;document.querySelector("#keyboard").innerHTML=`
    <div class="keyboard-keys" style="width:${d}px;height:166px">
      ${m}${b}
    </div>
  `,document.querySelector("#keyboard").setAttribute("aria-label",`Piano keyboard showing ${a.map(t=>`${t.name}${t.octave}`).join(", ")}`),document.querySelector("#octave-label").textContent=`${n} — ${i}`,document.querySelector("#range-note").textContent=`${n} TO ${i}`}const f=["C","C#","D","D#","E","F","F#","G","G#","A","B","H"],A=["C","D","E","F","G","A","H"],j={C:0,D:2,E:4,F:5,G:7,A:9,H:11},H=document.querySelector("#app");H.innerHTML=`
  <div class="app-shell">
    <header class="topbar">
      <a class="brand" href="../../" aria-label="Song Utils home">
        <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
        <span>song<span class="brand-light">utils</span></span>
      </a>
      <div class="topbar-right">
        <a class="home-link" href="../../">HOME <span aria-hidden="true">↖</span></a>
        <a class="home-link" href="../">INSTRUMENTS <span aria-hidden="true">↗</span></a>
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
          <p class="eyebrow"><span class="eyebrow-dot"></span> CHORD ATLAS <span class="eyebrow-divider">/</span> <span id="instrument-name">PIANO</span></p>
          <h1 id="page-title">Find your <em>next</em> sound.</h1>
          <p class="intro-copy">Pick a root. Add a sharp or minor and see the keys change.</p>
        </div>
        <div class="instrument-stamp" aria-hidden="true">
          <span class="stamp-note">♪</span>
          <span class="stamp-caption">PLAY<br />BY FEEL</span>
        </div>
      </section>

      <section class="workspace" id="workspace" aria-label="Piano chord explorer">
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
            ${A.map(e=>`<button class="root-option${e==="C"?" is-active":""}" type="button" data-base-root="${e}" aria-pressed="${e==="C"}">${e}</button>`).join("")}
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
              <p class="keyboard-title" id="grip-title">KEYBOARD VIEW</p>
              <p class="keyboard-hint" id="grip-hint">Highlighted keys are played together</p>
            </div>
            <div class="octave-label" id="octave-label"></div>
          </div>
          <div class="keyboard-scroll" id="grip-display" tabindex="0" aria-label="Scrollable piano keyboard">
            <div class="keyboard" id="keyboard" role="img" aria-label="Piano keyboard with chord notes highlighted"></div>
          </div>
          <div class="keyboard-legend" id="keyboard-legend"><span class="legend-key"></span> <span id="grip-legend">PLAY THIS NOTE</span> <span class="legend-rule"></span> <span id="grip-caption">3 NOTES · ROOT POSITION</span></div>
          <div class="detail-bottom">
            <span class="detail-tip"><span aria-hidden="true">✳</span> <span id="grip-tip">Start with the lowest highlighted key.</span></span>
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
`;const T=document.querySelector("#instrument-select"),$=document.querySelector("#theme-toggle"),I=document.querySelector("#root-picker"),D=document.querySelector("#chord-count"),G=document.querySelector("#catalog-summary"),k=v.instruments,U=new URLSearchParams(window.location.search).get("instrument");let y=k.find(e=>e.id===U)??k[0],q=A[0],C=!1,O=!1;function x(e){const a=e==="dark";document.documentElement.dataset.theme=a?"dark":"light",$.setAttribute("aria-pressed",String(a)),$.setAttribute("aria-label",`Switch to ${a?"light":"dark"} mode`),$.title=`Switch to ${a?"light":"dark"} mode`,$.querySelector(".theme-icon").textContent=a?"☼":"☾"}x(localStorage.getItem("song-utils-theme")==="dark"?"dark":"light");$.addEventListener("click",()=>{const e=document.documentElement.dataset.theme==="dark"?"light":"dark";localStorage.setItem("song-utils-theme",e),x(e)});T.innerHTML=k.map(e=>`<option value="${e.id}">${e.name}</option>`).join("");T.value=y.id;function B(e,a){return`${e}${a.suffix}`}function Y(){const e=(j[q]+Number(C))%f.length;return f[e]}function K(){I.querySelectorAll("[data-base-root]").forEach(e=>{const a=e.dataset.baseRoot===q;e.classList.toggle("is-active",a),e.setAttribute("aria-pressed",String(a))}),document.querySelector("#sharp-toggle").setAttribute("aria-pressed",String(C)),document.querySelector("#minor-toggle").setAttribute("aria-pressed",String(O)),document.querySelector("#instrument-name").textContent=y.name.toUpperCase(),document.querySelector("#workspace").setAttribute("aria-label",`${y.name} chord explorer`),D.textContent=String(A.length).padStart(2,"0"),G.textContent=y.id==="guitar"?`STANDARD TUNING · ${y.tuning.split("").join(" ")}`:`${v.roots.length} notes · major and minor`}function W(){const e=Y(),a=O?"minor":"major",p=v.chordTypes.find(r=>r.id===a)??v.chordTypes[0],l=v.roots.indexOf(e),c=60+l,g=B(e,p),u=v.chords[e][p.id].map(r=>{const m=(f.indexOf(r)-l+f.length)%f.length,b=c+m;return{midi:b,name:r,octave:Math.floor(b/12)-1}});document.querySelector("#chord-title").textContent=g,document.querySelector("#chord-subtitle").textContent=`${e} ${p.name.toLowerCase()} chord`,document.querySelector("#chord-symbol").textContent=g;let o=u;if(y.id==="guitar"){const r=N({instrument:y,rootPitch:l,type:p,symbol:g,noteNames:f}),h=new Map(u.map(m=>[m.midi%f.length,m.name]));o=r.map(m=>({...m,name:h.get(m.midi%f.length)??m.name}))}else document.querySelector("#keyboard-legend").classList.remove("is-guitar"),document.querySelector("#keyboard").setAttribute("role","img"),document.querySelector("#grip-display").setAttribute("aria-label","Scrollable piano keyboard"),document.querySelector("#grip-title").textContent="KEYBOARD VIEW",document.querySelector("#grip-hint").textContent="Highlighted keys are played together",document.querySelector("#grip-legend").textContent="PLAY THIS NOTE",document.querySelector("#grip-tip").textContent="Start with the lowest highlighted key.",document.querySelector("#grip-caption").textContent=`${u.length} NOTES · ROOT POSITION`,F({rootMidi:c,notes:u,noteNames:f});document.querySelector("#note-chips").innerHTML=o.map((r,h)=>`
    <span class="note-chip"><span class="note-chip-index">${String(h+1).padStart(2,"0")}</span>${r.name}<sup>${r.octave}</sup></span>
  `).join("")}function w(){K(),W()}I.addEventListener("click",e=>{const a=e.target.closest("[data-base-root]");a&&(q=a.dataset.baseRoot,w())});document.querySelector("#sharp-toggle").addEventListener("click",()=>{C=!C,w()});document.querySelector("#minor-toggle").addEventListener("click",()=>{O=!O,w()});T.addEventListener("change",()=>{y=k.find(a=>a.id===T.value)??k[0],q=A[0],C=!1,O=!1;const e=new URL(window.location.href);e.searchParams.set("instrument",y.id),window.history.replaceState(null,"",e),w()});w();
