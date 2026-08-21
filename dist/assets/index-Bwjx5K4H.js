(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))d(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&d(l)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();const S=[1,2,3,4,5,6,7,8,9,0],I=[32,32,32,32,32,32,32,32,32,128];function O(t,e=!0){const a=t.reduce((i,E)=>i+E,0);if(a<6)return{evPlayer:0,evBanker:0,evDragon7:0,pPlayerWin:0,pBankerWin:0,pDragon7:0,pTie:0};let d=0,n=0,r=0,l=0;for(let i=0;i<10;i++){const E=t[i];if(E<=0)continue;const $=E/a;for(let m=0;m<10;m++){const N=t[m]-(m===i?1:0);if(N<=0)continue;const V=$*(N/(a-1));for(let p=0;p<10;p++){const k=t[p]-(p===i?1:0)-(p===m?1:0);if(k<=0)continue;const C=V*(k/(a-2));for(let s=0;s<10;s++){const D=t[s]-(s===i?1:0)-(s===m?1:0)-(s===p?1:0);if(D<=0)continue;const T=C*(D/(a-3)),f=(S[i]+S[p])%10,u=(S[m]+S[s])%10,L=(o,h,v,y=!1)=>{o>h?d+=v:h>o?e&&y&&h===7?l+=v:n+=v:r+=v};if(f>=8||u>=8){L(f,u,T);continue}if(f>=6){if(u<=5)for(let o=0;o<10;o++){const h=t[o]-(o===i?1:0)-(o===m?1:0)-(o===p?1:0)-(o===s?1:0);if(h<=0)continue;const v=T*(h/(a-4)),y=(u+S[o])%10;L(f,y,v,!0)}else L(f,u,T);continue}for(let o=0;o<10;o++){const h=t[o]-(o===i?1:0)-(o===m?1:0)-(o===p?1:0)-(o===s?1:0);if(h<=0)continue;const v=T*(h/(a-4)),y=S[o],q=(f+y)%10;let A=!1;if((u<=2||u===3&&y!==8||u===4&&[2,3,4,5,6,7].includes(y)||u===5&&[4,5,6,7].includes(y)||u===6&&[6,7].includes(y))&&(A=!0),A)for(let x=0;x<10;x++){const M=t[x]-(x===i?1:0)-(x===m?1:0)-(x===p?1:0)-(x===s?1:0)-(x===o?1:0);if(M<=0)continue;const G=v*(M/(a-5)),W=(u+S[x])%10;L(q,W,G,!0)}else L(q,u,v)}}}}}const w=d-n-l,g=41*l-1;let b;return e?b=n-d:b=.95*(n+l)-d,{evPlayer:w,evBanker:b,evDragon7:g,pPlayerWin:d,pBankerWin:n+l,pDragon7:l,pTie:r}}function Z(){const t=[];for(let e=0;e<I.length;e++){const a=I[e];for(let d=0;d<a;d++)t.push(e)}return t}function U(t){for(let e=t.length-1;e>0;e--){const a=Math.floor(Math.random()*(e+1));[t[e],t[a]]=[t[a],t[e]]}}const z=document.querySelector("#app");z.innerHTML=`

<div class="app-shell">

  <header class="app-header">

    <div class="eyebrow">
      FINITE-SHOE ANALYZER (416 cards)
    </div>

    <h1>
      EZ Baccarat Exact EV Analyzer
    </h1>

    <p>
      Finite 8-deck conditional EV analysis
      using exact hypergeometric probabilities.
      <br><br>
      Developed by: Long Nguyen
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
`;const H=document.createElement("style");H.textContent=`

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
      20px,
      5vw,
      28px
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

`;document.head.appendChild(H);let c=[...I],R=[],B="simulation";function F(){return(document.querySelector('input[name="mode"]:checked')?.value??"EZ")==="EZ"}function P(){const t=c.reduce((b,i)=>b+i,0),e=O(c,F()),d=t>0?1.96*1.07/Math.sqrt(t)*100:0;let n="NEUTRAL / NO ADVANTAGE";e.evBanker>0?n=">>> TRIGGER: BANKER BET ADVANTAGE DETECTED! <<<":e.evPlayer>0&&(n=">>> TRIGGER: PLAYER BET ADVANTAGE DETECTED! <<<");const r=F()?"EZ Baccarat (Dragon 7 Push)":"Standard 5% Commission Baccarat",l=`A : ${c[0]} | 2 : ${c[1]} | 3 : ${c[2]} | 4 : ${c[3]}
5 : ${c[4]} | 6 : ${c[5]} | 7 : ${c[6]} | 8 : ${c[7]}
9 : ${c[8]} | 10/J/Q/K : ${c[9]}`,w=`Cards Remaining: ${t} / 416
Decks Remaining: ${(t/52).toFixed(2)}
Rules: ${r}


--- EXACT CONDITIONAL EXPECTED VALUES ---


Banker EV:
${(e.evBanker*100).toFixed(4)}%


Banker House Edge:
${(-e.evBanker*100).toFixed(4)}%


Player EV:
${(e.evPlayer*100).toFixed(4)}%


Player House Edge:
${(-e.evPlayer*100).toFixed(4)}%


Dragon 7 Probability:
${(e.pDragon7*100).toFixed(4)}%

Dragon 7 Break-Even Probability:
${(100/41).toFixed(4)}%

Dragon 7 EV:
${(e.evDragon7*100).toFixed(4)}%

Dragon 7 House Edge:
${(-e.evDragon7*100).toFixed(4)}%

Dragon 7 Status:
${e.evDragon7>0?"POSITIVE EV":e.evDragon7<0?"NEGATIVE EV":"BREAK-EVEN"}


Tie Probability:
${(e.pTie*100).toFixed(3)}%


Player Win Probability:
${(e.pPlayerWin*100).toFixed(3)}%


Banker Win Probability:
${(e.pBankerWin*100).toFixed(3)}%


--- STATISTICAL CONFIDENCE & RISK ---


Estimation Error Boundary (95% CI):


±${d.toFixed(3)}%


Current Threshold Status:


${n}


--- REMAINING RANK COMPOSITION ---


${l}`,g=document.querySelector("#live-output");g&&(g.textContent=w)}const K=["A","2","3","4","5","6","7","8","9","10/J/Q/K"],Y=document.querySelector("#rank-buttons");K.forEach((t,e)=>{const a=document.createElement("button");a.textContent=t,a.addEventListener("click",()=>{c[e]>0&&(c[e]--,R.push(e),P())}),Y.appendChild(a)});document.querySelector("#undo-card").addEventListener("click",()=>{const t=R.pop();t!==void 0&&c[t]++,P()});document.querySelector("#reset-shoe").addEventListener("click",()=>{c=[...I],R=[],P()});document.querySelector("#enter-app").addEventListener("click",()=>{document.querySelector("#warning-page").classList.add("hidden"),document.querySelector("#analyzer-page").classList.remove("hidden"),P()});document.querySelectorAll(".tab").forEach(t=>{t.addEventListener("click",()=>{B=t.dataset.tab??"simulation",document.querySelectorAll(".tab").forEach(e=>{e.classList.toggle("active",e===t)}),document.querySelector("#simulation-tab").classList.toggle("hidden",B!=="simulation"),document.querySelector("#live-tab").classList.toggle("hidden",B!=="live"),B==="live"&&P()})});document.querySelectorAll('input[name="mode"]').forEach(t=>{t.addEventListener("change",()=>{B==="live"&&P()})});document.querySelector("#run-sim").addEventListener("click",async()=>{const t=document.querySelector("#num-shoes"),e=document.querySelector("#cut-card"),a=Math.max(1,Number(t.value)||1),d=Math.max(0,Math.min(416,Number(e.value)||52)),n=F(),r=document.querySelector("#run-sim"),l=document.querySelector("#progress"),w=document.querySelector("#sim-results");r.disabled=!0,l.value=0,w.textContent="Simulation running...";let g=0,b=0,i=0,E=-1/0,$=-1/0;for(let p=0;p<a;p++){const k=Z();U(k);const C=[...I];for(;k.length>d;){const s=O(C,n);g++,s.evBanker>0&&b++,s.evPlayer>0&&i++,E=Math.max(E,s.evBanker),$=Math.max($,s.evPlayer);const D=[4,5,6],T=Math.min(D[Math.floor(Math.random()*D.length)],k.length);for(let f=0;f<T;f++){const u=k.pop();u!==void 0&&C[u]--}}l.value=(p+1)/a*100,await new Promise(s=>requestAnimationFrame(()=>s()))}const m=n?"EZ Baccarat":"Standard 5% Commission",N=g>0?b/g*100:0,V=g>0?i/g*100:0;w.textContent=`--- SIMULATION RESULTS ---


Shoes Simulated:
${a}


Variant:
${m}


Cut Card:
${d} cards remaining


Total Hands Analyzed:
${g}


Hands with Banker EV > 0:
${b}


Percentage:
${N.toFixed(4)}%


Hands with Player EV > 0:
${i}


Percentage:
${V.toFixed(4)}%


Maximum Banker EV Observed:
${(E*100).toFixed(4)}%


Maximum Player EV Observed:
${($*100).toFixed(4)}%


SUMMARY:


The application recalculates the conditional EV
from the finite remaining shoe composition before
each simulated hand.


The calculation uses exact sampling without
replacement rather than treating the remaining
shoe as an infinite deck.


Positive EV states are therefore identified from
the current mathematical shoe composition.`,r.disabled=!1});
