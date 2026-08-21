(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function a(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=a(n);fetch(n.href,o)}})();const w=[1,2,3,4,5,6,7,8,9,0],N=[32,32,32,32,32,32,32,32,32,128];function V(e,t=!0){const a=e.reduce((i,b)=>i+b,0);if(a<6)return{evPlayer:0,evBanker:0,pPlayerWin:0,pBankerWin:0,pDragon7:0,pTie:0};let s=0,n=0,o=0,l=0;for(let i=0;i<10;i++){const b=e[i];if(b<=0)continue;const B=b/a;for(let u=0;u<10;u++){const C=e[u]-(u===i?1:0);if(C<=0)continue;const D=B*(C/(a-1));for(let g=0;g<10;g++){const A=e[g]-(g===i?1:0)-(g===u?1:0);if(A<=0)continue;const P=D*(A/(a-2));for(let m=0;m<10;m++){const f=e[m]-(m===i?1:0)-(m===u?1:0)-(m===g?1:0);if(f<=0)continue;const k=P*(f/(a-3)),x=(w[i]+w[g])%10,c=(w[u]+w[m])%10,E=(r,h,v)=>{r>h?s+=v:h>r?t&&h===7?l+=v:n+=v:o+=v};if(x>=8||c>=8){E(x,c,k);continue}if(x>=6){if(c<=5)for(let r=0;r<10;r++){const h=e[r]-(r===i?1:0)-(r===u?1:0)-(r===g?1:0)-(r===m?1:0);if(h<=0)continue;const v=k*(h/(a-4)),S=(c+w[r])%10;E(x,S,v)}else E(x,c,k);continue}for(let r=0;r<10;r++){const h=e[r]-(r===i?1:0)-(r===u?1:0)-(r===g?1:0)-(r===m?1:0);if(h<=0)continue;const v=k*(h/(a-4)),S=w[r],F=(x+S)%10;let L=!1;if((c<=2||c===3&&S!==8||c===4&&[2,3,4,5,6,7].includes(S)||c===5&&[4,5,6,7].includes(S)||c===6&&[6,7].includes(S))&&(L=!0),L)for(let y=0;y<10;y++){const M=e[y]-(y===i?1:0)-(y===u?1:0)-(y===g?1:0)-(y===m?1:0)-(y===r?1:0);if(M<=0)continue;const H=v*(M/(a-5)),W=(c+w[y])%10;E(F,W,H)}else E(F,c,v)}}}}}const T=s-n-l;let p;return t?p=n-s:p=.95*(n+l)-s,{evPlayer:T,evBanker:p,pPlayerWin:s,pBankerWin:n+l,pDragon7:l,pTie:o}}function G(){const e=[];for(let t=0;t<N.length;t++){const a=N[t];for(let s=0;s<a;s++)e.push(t)}return e}function U(e){for(let t=e.length-1;t>0;t--){const a=Math.floor(Math.random()*(t+1));[e[t],e[a]]=[e[a],e[t]]}}const Z=document.querySelector("#app");Z.innerHTML=`

<div class="app-shell">

  <header class="app-header">

    <div class="eyebrow">
      FINITE-SHOE ANALYZER
    </div>

    <h1>
      Baccarat Exact EV Analyzer
    </h1>

    <p>
      Finite 8-deck conditional EV analysis
      using exact hypergeometric probabilities.
    </p>

  </header>


  <main>

    <!-- ============================================== -->
    <!-- WARNING PAGE -->
    <!-- ============================================== -->

    <section
      id="warning-page"
      class="page-card"
    >

      <div class="warning-icon">
        !
      </div>

      <h2>
        Warning
      </h2>

      <p>
        <strong>
          This software is provided solely for training,
          educational, and simulation purposes.
        </strong>
      </p>

      <p>
        Do not use it at real casino tables,
        during live gambling, or in any manner
        that violates applicable laws, regulations,
        casino policies, or terms of service.
      </p>

      <p>
        You are solely responsible for deciding
        how you use this application and for any
        risks, losses, legal consequences, or other
        outcomes arising from its use. The developer
        and distributor do not provide gambling,
        legal, or financial advice and assume no
        responsibility for decisions you make based
        on this software.
      </p>

      <button
        id="enter-app"
        class="primary-button"
      >
        I Understand — Enter Analyzer
      </button>

    </section>


    <!-- ============================================== -->
    <!-- ANALYZER -->
    <!-- ============================================== -->

    <section
      id="analyzer-page"
      class="hidden"
    >

      <div class="tabs">

        <button
          class="tab active"
          data-tab="simulation"
        >
          Shoe Simulation
        </button>

        <button
          class="tab"
          data-tab="live"
        >
          Shoe Composition
        </button>

      </div>


      <!-- ========================================== -->
      <!-- SIMULATION TAB -->
      <!-- ========================================== -->

      <section
        id="simulation-tab"
        class="tab-panel"
      >

        <div class="card">

          <h2>
            Monte Carlo Finite Shoe Simulation
          </h2>

          <div class="grid">

            <label>
              Number of 8-Deck Shoes

              <input
                id="num-shoes"
                type="number"
                min="1"
                value="50"
              />

            </label>


            <label>
              Cut Card Position —
              Cards Remaining

              <input
                id="cut-card"
                type="number"
                min="0"
                max="416"
                value="52"
              />

            </label>

          </div>


          <div class="mode-row">

            <label>

              <input
                type="radio"
                name="mode"
                value="EZ"
                checked
              />

              EZ Baccarat —
              Dragon 7 Push

            </label>


            <label>

              <input
                type="radio"
                name="mode"
                value="STD"
              />

              Standard —
              5% Commission

            </label>

          </div>


          <button
            id="run-sim"
            class="primary-button"
          >
            Run Simulation
          </button>


          <progress
            id="progress"
            value="0"
            max="100"
          ></progress>


          <pre
            id="sim-results"
            class="output"
          >Ready.</pre>

        </div>

      </section>


      <!-- ========================================== -->
      <!-- LIVE SHOE TAB -->
      <!-- ========================================== -->

      <section
        id="live-tab"
        class="tab-panel hidden"
      >

        <div class="card">

          <h2>
            Card Removal / Remaining Shoe
          </h2>


          <div
            id="rank-buttons"
            class="rank-grid"
          ></div>


          <div class="action-row">

            <button
              id="undo-card"
            >
              Undo Last Card
            </button>


            <button
              id="reset-shoe"
            >
              Reset Fresh Shoe
            </button>

          </div>


          <div
            id="live-output"
            class="output live-output"
          ></div>

        </div>

      </section>

    </section>

  </main>

</div>
`;const O=document.createElement("style");O.textContent=`

:root {

  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;

  color: #e5e7eb;

  background: #020617;
}


* {
  box-sizing: border-box;
}


html {
  min-width: 320px;
}


body {

  margin: 0;

  min-width: 320px;

  background:
    linear-gradient(
      160deg,
      #020617,
      #0f172a
    );
}


button,
input {
  font: inherit;
}


button {
  cursor: pointer;
}


.app-shell {

  min-height: 100vh;

  padding-bottom:
    env(safe-area-inset-bottom);
}


.app-header {

  padding:
    28px
    max(
      18px,
      env(safe-area-inset-left)
    );

  background: #0f172a;

  border-bottom:
    1px solid #334155;
}


.eyebrow {

  font-size: 12px;

  letter-spacing: .16em;

  color: #94a3b8;

  font-weight: 700;
}


h1 {

  margin:
    6px 0;

  font-size:
    clamp(
      24px,
      5vw,
      38px
    );
}


.app-header p {

  color: #94a3b8;

  margin-bottom: 0;
}


main {

  width:
    min(
      1100px,
      100%
    );

  margin: auto;

  padding: 18px;
}


.page-card,
.card {

  background:
    rgba(
      15,
      23,
      42,
      .94
    );

  border:
    1px solid #334155;

  border-radius: 18px;

  padding: 22px;

  box-shadow:
    0 14px 40px
    rgba(
      0,
      0,
      0,
      .25
    );
}


.page-card {

  max-width: 850px;

  margin:
    8vh auto;

  text-align: left;
}


.warning-icon {

  width: 42px;

  height: 42px;

  border-radius: 50%;

  display: grid;

  place-items: center;

  background: #f59e0b;

  color: #111827;

  font-size: 26px;

  font-weight: 900;
}


.page-card p {

  line-height: 1.65;

  color: #cbd5e1;
}


.primary-button {

  background: #2563eb;

  color: white;

  border: 0;

  border-radius: 12px;

  padding:
    13px
    18px;

  font-weight: 700;
}


.primary-button:hover {

  background: #1d4ed8;
}


.primary-button:disabled {

  opacity: .6;

  cursor: wait;
}


.hidden {
  display: none !important;
}


.tabs {

  display: flex;

  gap: 8px;

  margin-bottom: 14px;

  overflow: auto;
}


.tab,
.action-row button {

  background: #1e293b;

  color: #cbd5e1;

  border:
    1px solid #475569;

  border-radius: 10px;

  padding:
    10px
    14px;
}


.tab.active {

  background: #2563eb;

  color: white;

  border-color: #2563eb;
}


.grid {

  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(
        0,
        1fr
      )
    );

  gap: 14px;
}


label {

  color: #cbd5e1;

  font-weight: 600;
}


input[type="number"] {

  display: block;

  width: 100%;

  margin-top: 7px;

  background: #020617;

  color: #fff;

  border:
    1px solid #475569;

  border-radius: 9px;

  padding: 11px;
}


.mode-row {

  display: flex;

  flex-wrap: wrap;

  gap: 14px;

  margin:
    18px 0;
}


progress {

  display: block;

  width: 100%;

  height: 18px;

  margin:
    15px 0;
}


.output {

  margin-top: 15px;

  background: #020617;

  border:
    1px solid #334155;

  border-radius: 12px;

  padding: 15px;

  white-space: pre-wrap;

  overflow: auto;

  line-height: 1.5;

  color: #dbeafe;
}


.rank-grid {

  display: grid;

  grid-template-columns:
    repeat(
      5,
      minmax(
        0,
        1fr
      )
    );

  gap: 8px;
}


.rank-grid button {

  min-height: 48px;

  background: #1e293b;

  color: #f8fafc;

  border:
    1px solid #475569;

  border-radius: 10px;
}


.rank-grid button:active {

  transform: scale(.98);
}


.action-row {

  display: flex;

  gap: 10px;

  flex-wrap: wrap;

  margin-top: 12px;
}


.live-output {

  min-height: 330px;
}


@media (max-width: 650px) {

  main {
    padding: 12px;
  }


  .page-card,
  .card {

    padding: 16px;

    border-radius: 14px;
  }


  .grid {

    grid-template-columns: 1fr;
  }


  .rank-grid {

    grid-template-columns:
      repeat(
        2,
        minmax(
          0,
          1fr
        )
      );
  }


  .tabs {

    position: sticky;

    top: 0;

    z-index: 5;

    background: #020617;

    padding:
      6px 0;
  }

}

`;document.head.appendChild(O);let d=[...N],q=[],I="simulation";function R(){return(document.querySelector('input[name="mode"]:checked')?.value??"EZ")==="EZ"}function $(){const e=d.reduce((i,b)=>i+b,0),t=V(d,R()),s=e>0?1.96*1.07/Math.sqrt(e)*100:0;let n="NEUTRAL / NO ADVANTAGE";t.evBanker>0?n=">>> TRIGGER: BANKER BET ADVANTAGE DETECTED! <<<":t.evPlayer>0&&(n=">>> TRIGGER: PLAYER BET ADVANTAGE DETECTED! <<<");const o=R()?"EZ Baccarat (Dragon 7 Push)":"Standard 5% Commission Baccarat",l=`A : ${d[0]} | 2 : ${d[1]} | 3 : ${d[2]} | 4 : ${d[3]}
5 : ${d[4]} | 6 : ${d[5]} | 7 : ${d[6]} | 8 : ${d[7]}
9 : ${d[8]} | 10/J/Q/K : ${d[9]}`,T=`Cards Remaining: ${e} / 416
Decks Remaining: ${(e/52).toFixed(2)}
Rules: ${o}


--- EXACT CONDITIONAL EXPECTED VALUES ---


Banker EV:
${(t.evBanker*100).toFixed(4)}%


Banker House Edge:
${(-t.evBanker*100).toFixed(4)}%


Player EV:
${(t.evPlayer*100).toFixed(4)}%


Player House Edge:
${(-t.evPlayer*100).toFixed(4)}%


Dragon 7 Probability:
${(t.pDragon7*100).toFixed(3)}%


Tie Probability:
${(t.pTie*100).toFixed(3)}%


Player Win Probability:
${(t.pPlayerWin*100).toFixed(3)}%


Banker Win Probability:
${(t.pBankerWin*100).toFixed(3)}%


--- STATISTICAL CONFIDENCE & RISK ---


Estimation Error Boundary (95% CI):


±${s.toFixed(3)}%


Current Threshold Status:


${n}


--- REMAINING RANK COMPOSITION ---


${l}`,p=document.querySelector("#live-output");p&&(p.textContent=T)}const z=["A","2","3","4","5","6","7","8","9","10/J/Q/K"],K=document.querySelector("#rank-buttons");z.forEach((e,t)=>{const a=document.createElement("button");a.textContent=e,a.addEventListener("click",()=>{d[t]>0&&(d[t]--,q.push(t),$())}),K.appendChild(a)});document.querySelector("#undo-card").addEventListener("click",()=>{const e=q.pop();e!==void 0&&d[e]++,$()});document.querySelector("#reset-shoe").addEventListener("click",()=>{d=[...N],q=[],$()});document.querySelector("#enter-app").addEventListener("click",()=>{document.querySelector("#warning-page").classList.add("hidden"),document.querySelector("#analyzer-page").classList.remove("hidden"),$()});document.querySelectorAll(".tab").forEach(e=>{e.addEventListener("click",()=>{I=e.dataset.tab??"simulation",document.querySelectorAll(".tab").forEach(t=>{t.classList.toggle("active",t===e)}),document.querySelector("#simulation-tab").classList.toggle("hidden",I!=="simulation"),document.querySelector("#live-tab").classList.toggle("hidden",I!=="live"),I==="live"&&$()})});document.querySelectorAll('input[name="mode"]').forEach(e=>{e.addEventListener("change",()=>{I==="live"&&$()})});document.querySelector("#run-sim").addEventListener("click",async()=>{const e=document.querySelector("#num-shoes"),t=document.querySelector("#cut-card"),a=Math.max(1,Number(e.value)||1),s=Math.max(0,Math.min(416,Number(t.value)||52)),n=R(),o=document.querySelector("#run-sim"),l=document.querySelector("#progress"),T=document.querySelector("#sim-results");o.disabled=!0,l.value=0,T.textContent="Simulation running...";let p=0,i=0,b=0,B=-1/0,u=-1/0;for(let A=0;A<a;A++){const P=G();U(P);const m=[...N];for(;P.length>s;){const f=V(m,n);p++,f.evBanker>0&&i++,f.evPlayer>0&&b++,B=Math.max(B,f.evBanker),u=Math.max(u,f.evPlayer);const k=[4,5,6],x=Math.min(k[Math.floor(Math.random()*k.length)],P.length);for(let c=0;c<x;c++){const E=P.pop();E!==void 0&&m[E]--}}l.value=(A+1)/a*100,await new Promise(f=>requestAnimationFrame(()=>f()))}const C=n?"EZ Baccarat":"Standard 5% Commission",D=p>0?i/p*100:0,g=p>0?b/p*100:0;T.textContent=`--- SIMULATION RESULTS ---


Shoes Simulated:
${a}


Variant:
${C}


Cut Card:
${s} cards remaining


Total Hands Analyzed:
${p}


Hands with Banker EV > 0:
${i}


Percentage:
${D.toFixed(4)}%


Hands with Player EV > 0:
${b}


Percentage:
${g.toFixed(4)}%


Maximum Banker EV Observed:
${(B*100).toFixed(4)}%


Maximum Player EV Observed:
${(u*100).toFixed(4)}%


SUMMARY:


The application recalculates the conditional EV
from the finite remaining shoe composition before
each simulated hand.


The calculation uses exact sampling without
replacement rather than treating the remaining
shoe as an infinite deck.


Positive EV states are therefore identified from
the current mathematical shoe composition.`,o.disabled=!1});
