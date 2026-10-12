import"./style-D2z-nlSX.js";const D=["C","C#","D","D#","E","F","F#","G","G#","A","B","H"],I=[{id:"major",name:"Major",suffix:""},{id:"minor",name:"Minor",suffix:"m"}],j={C:{major:["C","E","G"],minor:["C","D#","G"]},"C#":{major:["C#","F","G#"],minor:["C#","E","G#"]},D:{major:["D","F#","A"],minor:["D","F","A"]},"D#":{major:["D#","G","B"],minor:["D#","F#","B"]},E:{major:["E","G#","H"],minor:["E","G","H"]},F:{major:["F","A","C"],minor:["F","G#","C"]},"F#":{major:["F#","B","C#"],minor:["F#","A","C#"]},G:{major:["G","H","D"],minor:["G","B","D"]},"G#":{major:["G#","C","D#"],minor:["G#","H","D#"]},A:{major:["A","C#","E"],minor:["A","C","E"]},B:{major:["B","D","F"],minor:["B","C#","F"]},H:{major:["H","D#","F#"],minor:["H","D","F#"]}},R=[{id:"piano",name:"Piano"},{id:"guitar",name:"Guitar",tuning:"EADGHE"}],v={roots:D,chordTypes:I,chords:j,instruments:R},M=[2,2,3,3,3,4];function N({instrument:e,rootPitch:n,type:p,symbol:l,noteNames:c}){const g=G(e,n,p,c);return H(g,l),g.notes}function G(e,n,p,l){const c=e.tuning.split("").map((d,a)=>({note:d,midi:(M[a]+1)*12+l.indexOf(d)})),u={"0:major":{frets:[null,3,2,0,1,0],fingers:[0,3,2,0,1,0]},"2:major":{frets:[null,null,0,2,3,2],fingers:[0,0,0,1,3,2]},"4:major":{frets:[0,2,2,1,0,0],fingers:[0,2,3,1,0,0]},"7:major":{frets:[3,2,0,0,0,3],fingers:[2,1,0,0,0,3]},"9:major":{frets:[null,0,2,2,2,0],fingers:[0,0,1,2,3,0]},"2:minor":{frets:[null,null,0,2,3,1],fingers:[0,0,0,2,3,1]},"4:minor":{frets:[0,2,2,0,0,0],fingers:[0,2,3,0,0,0]},"9:minor":{frets:[null,0,2,2,1,0],fingers:[0,0,2,3,1,0]}}[`${n}:${p.id}`];let i,r,h=[];if(u)({frets:i,fingers:r}=u);else{const d=p.id==="minor",a=(n-c[0].midi%12+12)%12,o=(n-c[1].midi%12+12)%12,t=o>0&&(a===0||o<a),s=t?o:a;t?(i=d?[null,s,s+2,s+2,s+1,s]:[null,s,s+2,s+2,s+2,s],r=d?[0,1,3,3,2,1]:[0,1,3,3,3,1],h=[{fret:s,firstString:1,lastString:5,finger:1}]):(i=d?[s,s+2,s+2,s,s,s]:[s,s+2,s+2,s+1,s,s],r=d?[1,3,4,1,1,1]:[1,3,4,2,1,1],h=[{fret:s,firstString:0,lastString:5,finger:1}])}const m=c.flatMap((d,a)=>{if(i[a]===null)return[];const o=d.midi+i[a],t=o%12;return[{midi:o,name:l[t],octave:Math.floor(o/12)-1,isRoot:t===n}]}),f=i.filter(d=>d!==null&&d>0);return{tuning:c,frets:i,fingers:r,barres:h,notes:m,firstFret:f.length?Math.min(...f):1,isOpenPosition:i.includes(0)}}function H(e,n){const l=e.firstFret,c=Array.from({length:5},(a,o)=>l+o),g=e.tuning.map(a=>`<span>${a.note}${Math.floor(a.midi/12)-1}</span>`).join(""),u=e.frets.map(a=>`<span>${a===null?'<span class="guitar-muted-marker">×</span>':a===0?'<span class="guitar-open-marker">0</span>':""}</span>`).join(""),i=e.tuning.map((a,o)=>{const t=e.frets[o];if(t===null||t===0||e.barres.some(S=>S.fret===t&&o>=S.firstString&&o<=S.lastString))return"";const s=t-l+1;return`<span class="guitar-finger${e.notes.some(S=>S.isRoot&&S.midi===a.midi+t)?" is-root":""}" style="grid-column:${o+1};grid-row:${s}">${e.fingers[o]}</span>`}).join(""),r=e.barres.map(a=>{const o=a.fret-l+1;return`<span class="guitar-barre" style="grid-column:${a.firstString+1}/${a.lastString+2};grid-row:${o}">${a.finger}</span>`}).join(""),h=e.tuning.map((a,o)=>`<span class="guitar-string-wire" style="grid-column:${o+1};grid-row:1/6"></span>`).join(""),m=c.map((a,o)=>`<span class="guitar-fret-row${o===0&&e.isOpenPosition?" is-nut":""}" style="grid-column:1/-1;grid-row:${o+1}"></span>`).join(""),f=e.isOpenPosition?"OPEN POSITION":`FRET ${l}–${l+5-1}`,d=e.barres.length?"BARRE SHAPE":"OPEN SHAPE";document.querySelector("#keyboard").innerHTML=`
    <div class="guitar-diagram">
      <div class="guitar-string-labels"><span class="guitar-axis-label">TUNING</span>${g}</div>
      <div class="guitar-open-row"><span class="guitar-axis-label">OPEN</span>${u}</div>
      <div class="guitar-neck-grid">
        <div class="guitar-fret-labels">${c.map(a=>`<span>${a}</span>`).join("")}</div>
        <div class="guitar-grid${e.isOpenPosition?" is-open-position":""}">
          ${m}${h}${r}${i}
        </div>
      </div>
    </div>
  `,document.querySelector("#keyboard").setAttribute("aria-label",`Guitar fretboard showing ${n} chord grip`),document.querySelector("#grip-display").setAttribute("aria-label",`Scrollable guitar fretboard showing ${n}`),document.querySelector("#keyboard-legend").classList.add("is-guitar"),document.querySelector("#grip-title").textContent="FRETBOARD VIEW",document.querySelector("#grip-hint").textContent="× is muted, 0 is open; numbers show fingers.",document.querySelector("#grip-legend").textContent="FINGER POSITIONS",document.querySelector("#grip-caption").textContent=d,document.querySelector("#grip-tip").textContent="Follow each string from its tuning label to the marked fret.",document.querySelector("#octave-label").textContent="STANDARD TUNING",document.querySelector("#range-note").textContent=f}const L=new Set([1,3,6,8,10]);function P({rootMidi:e,notes:n,noteNames:p}){const l=Math.max(...n.map(t=>t.midi)),c=60,g=Math.max(e+12,l+2),u=[],i=[];let r=0;for(let t=c;t<=g;t+=1){const s=t%12,q={midi:t,name:p[s],octave:Math.floor(t/12)-1};L.has(s)?i.push({...q,left:u.length*42-13}):(u.push({...q,left:r*42}),r+=1)}const h=new Set(n.map(t=>t.midi)),m=u.map(t=>{const s=h.has(t.midi);return`<span class="white-key${s?" is-played":""}" style="left:${t.left}px" aria-hidden="true">
      ${s?`<span class="key-note-label">${t.name}</span>`:""}
      ${t.name==="C"?`<span class="key-octave-label">C${t.octave}</span>`:""}
    </span>`}).join(""),f=i.map(t=>{const s=h.has(t.midi);return`<span class="black-key${s?" is-played":""}" style="left:${t.left}px" aria-hidden="true">
      ${s?`<span class="key-note-label">${t.name}</span>`:""}
    </span>`}).join(""),d=Math.max(u.length*42,...i.map(t=>t.left+26)),a=`${p[c%12]}${Math.floor(c/12)-1}`,o=`${p[g%12]}${Math.floor(g/12)-1}`;document.querySelector("#keyboard").innerHTML=`
    <div class="keyboard-keys" style="width:${d}px;height:166px">
      ${m}${f}
    </div>
  `,document.querySelector("#keyboard").setAttribute("aria-label",`Piano keyboard showing ${n.map(t=>`${t.name}${t.octave}`).join(", ")}`),document.querySelector("#octave-label").textContent=`${a} — ${o}`,document.querySelector("#range-note").textContent=`${a} TO ${o}`}const b=["C","C#","D","D#","E","F","F#","G","G#","A","B","H"],E=["C","D","E","F","G","A","H"],B={C:0,D:2,E:4,F:5,G:7,A:9,H:11},U=document.querySelector("#app");U.innerHTML=`
  <div class="app-shell">
    <header class="topbar">
      <a class="brand" href="../" aria-label="Song Utils home">
        <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
        <span>song<span class="brand-light">utils</span></span>
      </a>
      <div class="topbar-right">
        <a class="home-link" href="../">HOME <span aria-hidden="true">↖</span></a>
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
            ${E.map(e=>`<button class="root-option${e==="C"?" is-active":""}" type="button" data-base-root="${e}" aria-pressed="${e==="C"}">${e}</button>`).join("")}
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
`;const w=document.querySelector("#instrument-select"),C=document.querySelector("#theme-toggle"),x=document.querySelector("#root-picker"),Y=document.querySelector("#chord-count"),K=document.querySelector("#catalog-summary"),$=v.instruments,W=new URLSearchParams(window.location.search).get("instrument");let y=$.find(e=>e.id===W)??$[0],T=E[0],k=!1,A=!1;function F(e){const n=e==="dark";document.documentElement.dataset.theme=n?"dark":"light",C.setAttribute("aria-pressed",String(n)),C.setAttribute("aria-label",`Switch to ${n?"light":"dark"} mode`),C.title=`Switch to ${n?"light":"dark"} mode`,C.querySelector(".theme-icon").textContent=n?"☼":"☾"}F(localStorage.getItem("song-utils-theme")==="dark"?"dark":"light");C.addEventListener("click",()=>{const e=document.documentElement.dataset.theme==="dark"?"light":"dark";localStorage.setItem("song-utils-theme",e),F(e)});w.innerHTML=$.map(e=>`<option value="${e.id}">${e.name}</option>`).join("");w.value=y.id;function V(e,n){return`${e}${n.suffix}`}function _(){const e=(B[T]+Number(k))%b.length;return b[e]}function z(){x.querySelectorAll("[data-base-root]").forEach(e=>{const n=e.dataset.baseRoot===T;e.classList.toggle("is-active",n),e.setAttribute("aria-pressed",String(n))}),document.querySelector("#sharp-toggle").setAttribute("aria-pressed",String(k)),document.querySelector("#minor-toggle").setAttribute("aria-pressed",String(A)),document.querySelector("#instrument-name").textContent=y.name.toUpperCase(),document.querySelector("#workspace").setAttribute("aria-label",`${y.name} chord explorer`),Y.textContent=String(E.length).padStart(2,"0"),K.textContent=y.id==="guitar"?`STANDARD TUNING · ${y.tuning.split("").join(" ")}`:`${v.roots.length} notes · major and minor`}function J(){const e=_(),n=A?"minor":"major",p=v.chordTypes.find(r=>r.id===n)??v.chordTypes[0],l=v.roots.indexOf(e),c=60+l,g=V(e,p),u=v.chords[e][p.id].map(r=>{const m=(b.indexOf(r)-l+b.length)%b.length,f=c+m;return{midi:f,name:r,octave:Math.floor(f/12)-1}});document.querySelector("#chord-title").textContent=g,document.querySelector("#chord-subtitle").textContent=`${e} ${p.name.toLowerCase()} chord`,document.querySelector("#chord-symbol").textContent=g;let i=u;if(y.id==="guitar"){const r=N({instrument:y,rootPitch:l,type:p,symbol:g,noteNames:b}),h=new Map(u.map(m=>[m.midi%b.length,m.name]));i=r.map(m=>({...m,name:h.get(m.midi%b.length)??m.name}))}else document.querySelector("#keyboard-legend").classList.remove("is-guitar"),document.querySelector("#keyboard").setAttribute("role","img"),document.querySelector("#grip-display").setAttribute("aria-label","Scrollable piano keyboard"),document.querySelector("#grip-title").textContent="KEYBOARD VIEW",document.querySelector("#grip-hint").textContent="Highlighted keys are played together",document.querySelector("#grip-legend").textContent="PLAY THIS NOTE",document.querySelector("#grip-tip").textContent="Start with the lowest highlighted key.",document.querySelector("#grip-caption").textContent=`${u.length} NOTES · ROOT POSITION`,P({rootMidi:c,notes:u,noteNames:b});document.querySelector("#note-chips").innerHTML=i.map((r,h)=>`
    <span class="note-chip"><span class="note-chip-index">${String(h+1).padStart(2,"0")}</span>${r.name}<sup>${r.octave}</sup></span>
  `).join("")}function O(){z(),J()}x.addEventListener("click",e=>{const n=e.target.closest("[data-base-root]");n&&(T=n.dataset.baseRoot,O())});document.querySelector("#sharp-toggle").addEventListener("click",()=>{k=!k,O()});document.querySelector("#minor-toggle").addEventListener("click",()=>{A=!A,O()});w.addEventListener("change",()=>{y=$.find(n=>n.id===w.value)??$[0],T=E[0],k=!1,A=!1;const e=new URL(window.location.href);e.searchParams.set("instrument",y.id),window.history.replaceState(null,"",e),O()});O();
