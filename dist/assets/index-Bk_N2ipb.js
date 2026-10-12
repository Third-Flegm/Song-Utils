(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))c(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function p(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(a){if(a.ep)return;a.ep=!0;const s=p(a);fetch(a.href,s)}})();const M=["C","C#","D","D#","E","F","F#","G","G#","A","B","H"],L=[{id:"major",name:"Major",suffix:"",intervals:[0,4,7]},{id:"minor",name:"Minor",suffix:"m",intervals:[0,3,7]}],R=[{id:"piano",name:"Piano"},{id:"guitar",name:"Guitar",tuning:"EADGHE"}],k={roots:M,chordTypes:L,instruments:R},S=["C","C#","D","D#","E","F","F#","G","G#","A","B","H"],w=["C","D","E","F","G","A","H"],P={C:0,D:2,E:4,F:5,G:7,A:9,H:11},F=[2,2,3,3,3,4],j=new Set([1,3,6,8,10]),D=document.querySelector("#app");D.innerHTML=`
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
            ${w.map(e=>`<button class="root-option${e==="C"?" is-active":""}" type="button" data-base-root="${e}" aria-pressed="${e==="C"}">${e}</button>`).join("")}
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
`;const E=document.querySelector("#instrument-select"),$=document.querySelector("#theme-toggle"),x=document.querySelector("#root-picker"),H=document.querySelector("#chord-count"),G=document.querySelector("#catalog-summary"),T=k.instruments;let v=T[0],q=w[0],C=!1,O=!1;function N(e){const n=e==="dark";document.documentElement.dataset.theme=n?"dark":"light",$.setAttribute("aria-pressed",String(n)),$.setAttribute("aria-label",`Switch to ${n?"light":"dark"} mode`),$.title=`Switch to ${n?"light":"dark"} mode`,$.querySelector(".theme-icon").textContent=n?"☼":"☾"}N(localStorage.getItem("song-utils-theme")==="dark"?"dark":"light");$.addEventListener("click",()=>{const e=document.documentElement.dataset.theme==="dark"?"light":"dark";localStorage.setItem("song-utils-theme",e),N(e)});E.innerHTML=T.map(e=>`<option value="${e.id}">${e.name}</option>`).join("");function B(e,n){return`${e}${n.suffix}`}function U(){const e=(P[q]+Number(C))%S.length;return S[e]}function W(){x.querySelectorAll("[data-base-root]").forEach(e=>{const n=e.dataset.baseRoot===q;e.classList.toggle("is-active",n),e.setAttribute("aria-pressed",String(n))}),document.querySelector("#sharp-toggle").setAttribute("aria-pressed",String(C)),document.querySelector("#minor-toggle").setAttribute("aria-pressed",String(O)),document.querySelector("#instrument-name").textContent=v.name.toUpperCase(),document.querySelector("#workspace").setAttribute("aria-label",`${v.name} chord explorer`),H.textContent=String(w.length).padStart(2,"0"),G.textContent=v.id==="guitar"?`STANDARD TUNING · ${v.tuning.split("").join(" ")}`:`${k.roots.length} notes · major and minor`}function Y(e,n){const p=Math.max(...n.map(o=>o.midi)),c=60,a=Math.max(e+12,p+2),s=[],i=[];let g=0;for(let o=c;o<=a;o+=1){const b=o%12,f={midi:o,pitchClass:b,name:S[b],octave:Math.floor(o/12)-1};if(j.has(b)){const I=s.length;i.push({...f,left:I*42-13})}else s.push({...f,left:g*42}),g+=1}const d=new Set(n.map(o=>o.midi)),u=s.map(o=>{const b=d.has(o.midi),f=o.name==="C";return`<span class="white-key${b?" is-played":""}" style="left:${o.left}px" aria-hidden="true">
      ${b?`<span class="key-note-label">${o.name}</span>`:""}
      ${f?`<span class="key-octave-label">C${o.octave}</span>`:""}
    </span>`}).join(""),l=i.map(o=>{const b=d.has(o.midi);return`<span class="black-key${b?" is-played":""}" style="left:${o.left}px" aria-hidden="true">
      ${b?`<span class="key-note-label">${o.name}</span>`:""}
    </span>`}).join(""),m=s.length*42,h=Math.max(0,...i.map(o=>o.left+26)),r=Math.max(m,h),t=`${S[c%12]}${Math.floor(c/12)-1}`,y=`${S[a%12]}${Math.floor(a/12)-1}`;document.querySelector("#keyboard").innerHTML=`
    <div class="keyboard-keys" style="width:${r}px;height:166px">
      ${u}${l}
    </div>
  `,document.querySelector("#keyboard").setAttribute("aria-label",`Piano keyboard showing ${n.map(o=>`${o.name}${o.octave}`).join(", ")}`),document.querySelector("#octave-label").textContent=`${t} — ${y}`,document.querySelector("#range-note").textContent=`${t} TO ${y}`}function K(e,n){const p=v.tuning.split("").map((l,m)=>({note:l,midi:(F[m]+1)*12+S.indexOf(l)})),a={"0:major":{frets:[null,3,2,0,1,0],fingers:[0,3,2,0,1,0]},"2:major":{frets:[null,null,0,2,3,2],fingers:[0,0,0,1,3,2]},"4:major":{frets:[0,2,2,1,0,0],fingers:[0,2,3,1,0,0]},"7:major":{frets:[3,2,0,0,0,3],fingers:[2,1,0,0,0,3]},"9:major":{frets:[null,0,2,2,2,0],fingers:[0,0,1,2,3,0]},"2:minor":{frets:[null,null,0,2,3,1],fingers:[0,0,0,2,3,1]},"4:minor":{frets:[0,2,2,0,0,0],fingers:[0,2,3,0,0,0]},"9:minor":{frets:[null,0,2,2,1,0],fingers:[0,0,2,3,1,0]}}[`${e}:${n.id}`];let s,i,g=[];if(a)({frets:s,fingers:i}=a);else{const l=n.id==="minor",m=(e-p[0].midi%12+12)%12,h=(e-p[1].midi%12+12)%12,r=h>0&&(m===0||h<m),t=r?h:m;r?(s=l?[null,t,t+2,t+2,t+1,t]:[null,t,t+2,t+2,t+2,t],i=l?[0,1,3,3,2,1]:[0,1,3,3,3,1],g=[{fret:t,firstString:1,lastString:5,finger:1}]):(s=l?[t,t+2,t+2,t,t,t]:[t,t+2,t+2,t+1,t,t],i=l?[1,3,4,1,1,1]:[1,3,4,2,1,1],g=[{fret:t,firstString:0,lastString:5,finger:1}])}const d=p.flatMap((l,m)=>{if(s[m]===null)return[];const h=l.midi+s[m],r=h%12;return[{midi:h,name:S[r],octave:Math.floor(h/12)-1,isRoot:r===e}]}),u=s.filter(l=>l!==null&&l>0);return{tuning:p,frets:s,fingers:i,barres:g,notes:d,firstFret:u.length?Math.min(...u):1,rootFret:u.length?Math.min(...u):0,isOpenPosition:s.includes(0)}}function V(e,n){const c=e.firstFret,a=Array.from({length:5},(r,t)=>c+t),s=e.tuning.map(r=>`<span>${r.note}${Math.floor(r.midi/12)-1}</span>`).join(""),i=e.frets.map(r=>`<span>${r===null?'<span class="guitar-muted-marker">×</span>':r===0?'<span class="guitar-open-marker">0</span>':""}</span>`).join(""),g=e.tuning.map((r,t)=>{const y=e.frets[t];if(y===null||y===0||e.barres.some(f=>f.fret===y&&t>=f.firstString&&t<=f.lastString))return"";const o=y-c+1;return`<span class="guitar-finger${e.notes.some(f=>f.isRoot&&f.midi===r.midi+y)?" is-root":""}" style="grid-column:${t+1};grid-row:${o}">${e.fingers[t]}</span>`}).join(""),d=e.barres.map(r=>{const t=r.fret-c+1;return`<span class="guitar-barre" style="grid-column:${r.firstString+1}/${r.lastString+2};grid-row:${t}">${r.finger}</span>`}).join(""),u=e.tuning.map((r,t)=>`<span class="guitar-string-wire" style="grid-column:${t+1};grid-row:1/6"></span>`).join(""),l=a.map((r,t)=>`<span class="guitar-fret-row${t===0&&e.isOpenPosition?" is-nut":""}" style="grid-column:1/-1;grid-row:${t+1}"></span>`).join(""),m=e.isOpenPosition?"OPEN POSITION":`FRET ${c}–${c+5-1}`,h=e.barres.length?"BARRE SHAPE":"OPEN SHAPE";document.querySelector("#keyboard").innerHTML=`
    <div class="guitar-diagram">
      <div class="guitar-string-labels"><span class="guitar-axis-label">TUNING</span>${s}</div>
      <div class="guitar-open-row"><span class="guitar-axis-label">OPEN</span>${i}</div>
      <div class="guitar-neck-grid">
        <div class="guitar-fret-labels">${a.map(r=>`<span>${r}</span>`).join("")}</div>
        <div class="guitar-grid${e.isOpenPosition?" is-open-position":""}">
          ${l}${u}${d}${g}
        </div>
      </div>
    </div>
  `,document.querySelector("#keyboard").setAttribute("aria-label",`Guitar fretboard showing ${n} chord grip`),document.querySelector("#grip-display").setAttribute("aria-label",`Scrollable guitar fretboard showing ${n}`),document.querySelector("#keyboard-legend").classList.add("is-guitar"),document.querySelector("#grip-title").textContent="FRETBOARD VIEW",document.querySelector("#grip-hint").textContent="× is muted, 0 is open; numbers show fingers.",document.querySelector("#grip-legend").textContent="FINGER POSITIONS",document.querySelector("#grip-caption").textContent=h,document.querySelector("#grip-tip").textContent="Follow each string from its tuning label to the marked fret.",document.querySelector("#octave-label").textContent="STANDARD TUNING",document.querySelector("#range-note").textContent=m}function _(){const e=U(),n=O?"minor":"major",p=k.chordTypes.find(d=>d.id===n)??k.chordTypes[0],c=k.roots.indexOf(e),a=60+c,s=B(e,p),i=p.intervals.map(d=>{const u=a+d,l=u%12;return{midi:u,name:S[l],octave:Math.floor(u/12)-1}});document.querySelector("#chord-title").textContent=s,document.querySelector("#chord-subtitle").textContent=`${e} ${p.name.toLowerCase()} chord`,document.querySelector("#chord-symbol").textContent=s;let g=i;if(v.id==="guitar"){const d=K(c,p);g=d.notes,V(d,s)}else document.querySelector("#keyboard-legend").classList.remove("is-guitar"),document.querySelector("#keyboard").setAttribute("role","img"),document.querySelector("#grip-display").setAttribute("aria-label","Scrollable piano keyboard"),document.querySelector("#grip-title").textContent="KEYBOARD VIEW",document.querySelector("#grip-hint").textContent="Highlighted keys are played together",document.querySelector("#grip-legend").textContent="PLAY THIS NOTE",document.querySelector("#grip-tip").textContent="Start with the lowest highlighted key.",document.querySelector("#grip-caption").textContent=`${i.length} NOTES · ROOT POSITION`,Y(a,i);document.querySelector("#note-chips").innerHTML=g.map((d,u)=>`
    <span class="note-chip"><span class="note-chip-index">${String(u+1).padStart(2,"0")}</span>${d.name}<sup>${d.octave}</sup></span>
  `).join("")}function A(){W(),_()}x.addEventListener("click",e=>{const n=e.target.closest("[data-base-root]");n&&(q=n.dataset.baseRoot,A())});document.querySelector("#sharp-toggle").addEventListener("click",()=>{C=!C,A()});document.querySelector("#minor-toggle").addEventListener("click",()=>{O=!O,A()});E.addEventListener("change",()=>{v=T.find(e=>e.id===E.value)??T[0],q=w[0],C=!1,O=!1,A()});A();
