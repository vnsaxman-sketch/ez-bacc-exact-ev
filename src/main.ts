// ============================================================
// EZ BACCARAT FINITE-SHOE EXACT EV ANALYZER
// TypeScript / Vite Cross-Platform Web Application
//
// Supports:
// iPhone / iPad / MacBook / Windows / Linux
//
// Educational and simulation purposes only.
// ============================================================


// ============================================================
// TYPES
// ============================================================

type ShoeCounts = number[];

interface EVResult {
  evPlayer: number;
  evBanker: number;

  pPlayerWin: number;
  pBankerWin: number;

  pDragon7: number;
  pTie: number;
}


// ============================================================
// BACCARAT CARD VALUES
// ============================================================
//
// Index:
// 0 = Ace
// 1 = 2
// 2 = 3
// 3 = 4
// 4 = 5
// 5 = 6
// 6 = 7
// 7 = 8
// 8 = 9
// 9 = 10/J/Q/K
//
// An 8-deck shoe contains:
// A-9: 32 cards each
// 10/J/Q/K: 128 cards total
// ============================================================

const RANK_VAL = [
  1, // A
  2, // 2
  3, // 3
  4, // 4
  5, // 5
  6, // 6
  7, // 7
  8, // 8
  9, // 9
  0  // 10/J/Q/K
] as const;


// ============================================================
// FRESH 8-DECK SHOE
// ============================================================

const DEFAULT_SHOE: ShoeCounts = [
  32,   // A
  32,   // 2
  32,   // 3
  32,   // 4
  32,   // 5
  32,   // 6
  32,   // 7
  32,   // 8
  32,   // 9
  128   // 10/J/Q/K
];


// ============================================================
// EXACT FINITE-SHOE EV CALCULATION
// ============================================================

function getExactEV(
  shoeCounts: ShoeCounts,
  isEzBaccarat: boolean = true
): EVResult {

  const N = shoeCounts.reduce(
    (sum, count) => sum + count,
    0
  );

  if (N < 6) {
    return {
      evPlayer: 0,
      evBanker: 0,
      pPlayerWin: 0,
      pBankerWin: 0,
      pDragon7: 0,
      pTie: 0
    };
  }

  let pPlayerWin = 0;
  let pBankerWinStandard = 0;
  let pTie = 0;
  let pDragon7 = 0;


  // ==========================================================
  // FIRST FOUR CARDS
  //
  // P1
  // B1
  // P2
  // B2
  // ==========================================================

  for (let c1 = 0; c1 < 10; c1++) {

    const count1 = shoeCounts[c1];

    if (count1 <= 0) {
      continue;
    }

    const w1 = count1 / N;


    for (let c2 = 0; c2 < 10; c2++) {

      const count2 =
        shoeCounts[c2] -
        (c2 === c1 ? 1 : 0);

      if (count2 <= 0) {
        continue;
      }

      const w2 =
        w1 *
        (count2 / (N - 1));


      for (let c3 = 0; c3 < 10; c3++) {

        const count3 =
          shoeCounts[c3] -
          (c3 === c1 ? 1 : 0) -
          (c3 === c2 ? 1 : 0);

        if (count3 <= 0) {
          continue;
        }

        const w3 =
          w2 *
          (count3 / (N - 2));


        for (let c4 = 0; c4 < 10; c4++) {

          const count4 =
            shoeCounts[c4] -
            (c4 === c1 ? 1 : 0) -
            (c4 === c2 ? 1 : 0) -
            (c4 === c3 ? 1 : 0);

          if (count4 <= 0) {
            continue;
          }

          const w4 =
            w3 *
            (count4 / (N - 3));


          // ==================================================
          // INITIAL TOTALS
          // ==================================================

          const playerValue =
            (
              RANK_VAL[c1] +
              RANK_VAL[c3]
            ) % 10;

          const bankerValue =
            (
              RANK_VAL[c2] +
              RANK_VAL[c4]
            ) % 10;


          // ==================================================
          // SETTLEMENT HELPER
          // ==================================================

          const settleHand = (
            finalPlayer: number,
            finalBanker: number,
            probability: number,
            bankerIsThreeCards: boolean = false
          ): void => {

            if (finalPlayer > finalBanker) {

              pPlayerWin += probability;

            } else if (finalBanker > finalPlayer) {

              if (
                //EZ Baccarat Dragon 7:
                //Only a Banker WIN with a THREE-CARD total of 7
                //is a push on the Banker wager.
                isEzBaccarat &&
                bankerIsThreeCards &&
                finalBanker === 7
              ) {

                pDragon7 += probability;

              } else {

                pBankerWinStandard += probability;
              }

            } else {

              pTie += probability;
            }
          };


          // ==================================================
          // NATURAL
          // ==================================================

          if (
            playerValue >= 8 ||
            bankerValue >= 8
          ) {

            settleHand(
              playerValue,
              bankerValue,
              w4
            );

            continue;
          }


          // ==================================================
          // PLAYER STANDS ON 6 OR 7
          // ==================================================

          if (playerValue >= 6) {

            // ------------------------------------------------
            // Banker draws on 0-5
            // ------------------------------------------------

            if (bankerValue <= 5) {

              for (
                let bankerThird = 0;
                bankerThird < 10;
                bankerThird++
              ) {

                const countBankerThird =
                  shoeCounts[bankerThird] -
                  (bankerThird === c1 ? 1 : 0) -
                  (bankerThird === c2 ? 1 : 0) -
                  (bankerThird === c3 ? 1 : 0) -
                  (bankerThird === c4 ? 1 : 0);

                if (countBankerThird <= 0) {
                  continue;
                }

                const w5 =
                  w4 *
                  (
                    countBankerThird /
                    (N - 4)
                  );

                const finalBanker =
                  (
                    bankerValue +
                    RANK_VAL[bankerThird]
                  ) % 10;

                settleHand(
                  playerValue,
                  finalBanker,
                  w5,
                  true
                );
              }

            } else {

              // Banker stands

              settleHand(
                playerValue,
                bankerValue,
                w4
              );
            }

            continue;
          }


          // ==================================================
          // PLAYER DRAWS THIRD CARD
          // ==================================================

          for (
            let playerThird = 0;
            playerThird < 10;
            playerThird++
          ) {

            const countPlayerThird =
              shoeCounts[playerThird] -
              (playerThird === c1 ? 1 : 0) -
              (playerThird === c2 ? 1 : 0) -
              (playerThird === c3 ? 1 : 0) -
              (playerThird === c4 ? 1 : 0);

            if (countPlayerThird <= 0) {
              continue;
            }

            const w5 =
              w4 *
              (
                countPlayerThird /
                (N - 4)
              );

            const playerThirdValue =
              RANK_VAL[playerThird];

            const finalPlayer =
              (
                playerValue +
                playerThirdValue
              ) % 10;


            // =================================================
            // BANKER THIRD-CARD RULE
            // =================================================

            let bankerDraws = false;

            if (bankerValue <= 2) {

              bankerDraws = true;

            } else if (
              bankerValue === 3 &&
              playerThirdValue !== 8
            ) {

              bankerDraws = true;

            } else if (
              bankerValue === 4 &&
              [2, 3, 4, 5, 6, 7]
                .includes(playerThirdValue)
            ) {

              bankerDraws = true;

            } else if (
              bankerValue === 5 &&
              [4, 5, 6, 7]
                .includes(playerThirdValue)
            ) {

              bankerDraws = true;

            } else if (
              bankerValue === 6 &&
              [6, 7]
                .includes(playerThirdValue)
            ) {

              bankerDraws = true;
            }


            // =================================================
            // BANKER DRAWS
            // =================================================

            if (bankerDraws) {

              for (
                let bankerThird = 0;
                bankerThird < 10;
                bankerThird++
              ) {

                const countBankerThird =
                  shoeCounts[bankerThird] -
                  (bankerThird === c1 ? 1 : 0) -
                  (bankerThird === c2 ? 1 : 0) -
                  (bankerThird === c3 ? 1 : 0) -
                  (bankerThird === c4 ? 1 : 0) -
                  (bankerThird === playerThird ? 1 : 0);

                if (countBankerThird <= 0) {
                  continue;
                }

                const w6 =
                  w5 *
                  (
                    countBankerThird /
                    (N - 5)
                  );

                const finalBanker =
                  (
                    bankerValue +
                    RANK_VAL[bankerThird]
                  ) % 10;

                settleHand(
                  finalPlayer,
                  finalBanker,
                  w6,
                  true
                );
              }

            } else {

              // Banker stands

              settleHand(
                finalPlayer,
                bankerValue,
                w5
              );
            }
          }
        }
      }
    }
  }


  // ==========================================================
  // PLAYER EV
  //
  // Player:
  // +1 Player win
  // -1 Banker win
  // Tie = 0
  // ==========================================================

  const evPlayer =
    pPlayerWin -
    pBankerWinStandard -
    pDragon7;


  // ==========================================================
  // BANKER EV
  // ==========================================================

  let evBanker: number;

  if (isEzBaccarat) {

    // EZ Baccarat:
    //
    // Standard Banker win = +1
    // Dragon 7 = Push
    // Player win = -1

    evBanker =
      pBankerWinStandard -
      pPlayerWin;

  } else {

    // Standard commission Baccarat:
    //
    // Banker win = +0.95
    // Player win = -1

    evBanker =
      (
        0.95 *
        (
          pBankerWinStandard +
          pDragon7
        )
      ) -
      pPlayerWin;
  }


  return {
    evPlayer,
    evBanker,
    pPlayerWin,
    pBankerWin:
      pBankerWinStandard +
      pDragon7,
    pDragon7,
    pTie
  };
}


// ============================================================
// CREATE RANDOM 8-DECK SHOE
// ============================================================

function createFreshDeck(): number[] {

  const deck: number[] = [];

  for (
    let rank = 0;
    rank < DEFAULT_SHOE.length;
    rank++
  ) {

    const count =
      DEFAULT_SHOE[rank];

    for (
      let i = 0;
      i < count;
      i++
    ) {

      deck.push(rank);
    }
  }

  return deck;
}


// ============================================================
// FISHER-YATES SHUFFLE
// ============================================================

function shuffleDeck(
  deck: number[]
): void {

  for (
    let i = deck.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() * (i + 1)
      );

    [
      deck[i],
      deck[j]
    ] = [
      deck[j],
      deck[i]
    ];
  }
}


// ============================================================
// HTML
// ============================================================

const app =
  document.querySelector<HTMLDivElement>(
    "#app"
  )!;

app.innerHTML = `

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
`;


// ============================================================
// CSS
// ============================================================

const style =
  document.createElement("style");

style.textContent = `

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

`;

document.head.appendChild(style);


// ============================================================
// APPLICATION STATE
// ============================================================

let liveShoe: ShoeCounts = [
  ...DEFAULT_SHOE
];

// FIXED:
// The previous declaration was:
// let removedCards: number[] [];
//
// Correct declaration:
let removedCards: number[] = [];

let currentTab =
  "simulation";


// ============================================================
// GET CURRENT GAME MODE
// ============================================================

function modeIsEZ(): boolean {

  const selected =
    document.querySelector<HTMLInputElement>(
      'input[name="mode"]:checked'
    );

  return (
    selected?.value ??
    "EZ"
  ) === "EZ";
}


// ============================================================
// UPDATE LIVE SHOE DISPLAY
// ============================================================

function updateLive(): void {

  const cardsLeft =
    liveShoe.reduce(
      (sum, count) =>
        sum + count,
      0
    );


  const ev =
    getExactEV(
      liveShoe,
      modeIsEZ()
    );


  // Approximation retained from original program.
  const stdDev = 1.07;


  const ci95 =
    cardsLeft > 0
      ? (
          1.96 *
          stdDev /
          Math.sqrt(cardsLeft)
        ) * 100
      : 0;


  let trigger =
    "NEUTRAL / NO ADVANTAGE";


  if (ev.evBanker > 0) {

    trigger =
      ">>> TRIGGER: BANKER BET ADVANTAGE DETECTED! <<<";

  } else if (ev.evPlayer > 0) {

    trigger =
      ">>> TRIGGER: PLAYER BET ADVANTAGE DETECTED! <<<";
  }


  const variant =
    modeIsEZ()
      ? "EZ Baccarat (Dragon 7 Push)"
      : "Standard 5% Commission Baccarat";


  const rankLines =

`A : ${liveShoe[0]} | 2 : ${liveShoe[1]} | 3 : ${liveShoe[2]} | 4 : ${liveShoe[3]}
5 : ${liveShoe[4]} | 6 : ${liveShoe[5]} | 7 : ${liveShoe[6]} | 8 : ${liveShoe[7]}
9 : ${liveShoe[8]} | 10/J/Q/K : ${liveShoe[9]}`;


  const output =

`Cards Remaining: ${cardsLeft} / 416
Decks Remaining: ${(cardsLeft / 52).toFixed(2)}
Rules: ${variant}


--- EXACT CONDITIONAL EXPECTED VALUES ---


Banker EV:
${(ev.evBanker * 100).toFixed(4)}%


Banker House Edge:
${(-ev.evBanker * 100).toFixed(4)}%


Player EV:
${(ev.evPlayer * 100).toFixed(4)}%


Player House Edge:
${(-ev.evPlayer * 100).toFixed(4)}%


Dragon 7 Probability:
${(ev.pDragon7 * 100).toFixed(3)}%


Tie Probability:
${(ev.pTie * 100).toFixed(3)}%


Player Win Probability:
${(ev.pPlayerWin * 100).toFixed(3)}%


Banker Win Probability:
${(ev.pBankerWin * 100).toFixed(3)}%


--- STATISTICAL CONFIDENCE & RISK ---


Estimation Error Boundary (95% CI):


±${ci95.toFixed(3)}%


Current Threshold Status:


${trigger}


--- REMAINING RANK COMPOSITION ---


${rankLines}`;


  const outputElement =
    document.querySelector(
      "#live-output"
    );


  if (outputElement) {

    outputElement.textContent =
      output;
  }
}


// ============================================================
// RANK BUTTONS
// ============================================================

const rankLabels = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10/J/Q/K"
];


const rankButtons =
  document.querySelector(
    "#rank-buttons"
  )!;


rankLabels.forEach(
  (
    label,
    index
  ) => {

    const button =
      document.createElement(
        "button"
      );


    button.textContent =
      label;


    button.addEventListener(
      "click",
      () => {

        if (
          liveShoe[index] > 0
        ) {

          liveShoe[index]--;

          // FIX:
          // index is a single number.
          // removedCards is now correctly typed as number[].
          removedCards.push(
            index
          );

          updateLive();
        }
      }
    );


    rankButtons.appendChild(
      button
    );
  }
);


// ============================================================
// UNDO
// ============================================================

document
  .querySelector(
    "#undo-card"
  )!
  .addEventListener(
    "click",
    () => {

      // FIX:
      // pop() returns number | undefined,
      // not number[].
      const last: number | undefined =
        removedCards.pop();


      if (
        last !== undefined
      ) {

        // last is now guaranteed to be a number.
        liveShoe[last]++;
      }


      updateLive();
    }
  );


// ============================================================
// RESET
// ============================================================

document
  .querySelector(
    "#reset-shoe"
  )!
  .addEventListener(
    "click",
    () => {

      liveShoe = [
        ...DEFAULT_SHOE
      ];

      removedCards = [];

      updateLive();
    }
  );


// ============================================================
// ENTER APPLICATION
// ============================================================

document
  .querySelector(
    "#enter-app"
  )!
  .addEventListener(
    "click",
    () => {

      document
        .querySelector(
          "#warning-page"
        )!
        .classList
        .add("hidden");


      document
        .querySelector(
          "#analyzer-page"
        )!
        .classList
        .remove("hidden");


      updateLive();
    }
  );


// ============================================================
// TAB SWITCHING
// ============================================================

document
  .querySelectorAll<HTMLButtonElement>(
    ".tab"
  )
  .forEach(
    tab => {

      tab.addEventListener(
        "click",
        () => {

          currentTab =
            tab.dataset.tab ??
            "simulation";


          document
            .querySelectorAll(
              ".tab"
            )
            .forEach(
              t => {

                t.classList.toggle(
                  "active",
                  t === tab
                );
              }
            );


          document
            .querySelector(
              "#simulation-tab"
            )!
            .classList.toggle(
              "hidden",
              currentTab !==
                "simulation"
            );


          document
            .querySelector(
              "#live-tab"
            )!
            .classList.toggle(
              "hidden",
              currentTab !==
                "live"
            );


          if (
            currentTab ===
            "live"
          ) {

            updateLive();
          }
        }
      );
    }
  );


// ============================================================
// MODE SWITCHING
// ============================================================

document
  .querySelectorAll<HTMLInputElement>(
    'input[name="mode"]'
  )
  .forEach(
    radio => {

      radio.addEventListener(
        "change",
        () => {

          if (
            currentTab ===
            "live"
          ) {

            updateLive();
          }
        }
      );
    }
  );


// ============================================================
// MONTE CARLO SIMULATION
// ============================================================

document
  .querySelector(
    "#run-sim"
  )!
  .addEventListener(
    "click",
    async () => {

      const numShoesInput =
        document.querySelector<HTMLInputElement>(
          "#num-shoes"
        )!;


      const cutCardInput =
        document.querySelector<HTMLInputElement>(
          "#cut-card"
        )!;


      const numShoes =
        Math.max(
          1,
          Number(
            numShoesInput.value
          ) || 1
        );


      const cutCard =
        Math.max(
          0,
          Math.min(
            416,
            Number(
              cutCardInput.value
            ) || 52
          )
        );


      const isEZ =
        modeIsEZ();


      const runButton =
        document.querySelector<HTMLButtonElement>(
          "#run-sim"
        )!;


      const progress =
        document.querySelector<HTMLProgressElement>(
          "#progress"
        )!;


      const output =
        document.querySelector(
          "#sim-results"
        )!;


      runButton.disabled =
        true;


      progress.value =
        0;


      output.textContent =
        "Simulation running...";


      let totalHands =
        0;


      let positiveBankerHands =
        0;


      let positivePlayerHands =
        0;


      let maxBankerEV =
        -Infinity;


      let maxPlayerEV =
        -Infinity;


      // ======================================================
      // SHOE LOOP
      // ======================================================

      for (
        let shoeNumber = 0;
        shoeNumber < numShoes;
        shoeNumber++
      ) {

        const deck =
          createFreshDeck();


        shuffleDeck(
          deck
        );


        const counts =
          [
            ...DEFAULT_SHOE
          ];


        // ====================================================
        // HAND LOOP
        // ====================================================

        while (
          deck.length >
          cutCard
        ) {

          const ev =
            getExactEV(
              counts,
              isEZ
            );


          totalHands++;


          if (
            ev.evBanker > 0
          ) {

            positiveBankerHands++;
          }


          if (
            ev.evPlayer > 0
          ) {

            positivePlayerHands++;
          }


          maxBankerEV =
            Math.max(
              maxBankerEV,
              ev.evBanker
            );


          maxPlayerEV =
            Math.max(
              maxPlayerEV,
              ev.evPlayer
            );


          // ================================================
          // SIMULATE NEXT HAND
          //
          // Simplified random 4/5/6 card removal model.
          // ================================================

          const possibleCards =
            [
              4,
              5,
              6
            ];


          const numberOfCards =
            Math.min(
              possibleCards[
                Math.floor(
                  Math.random() *
                  possibleCards.length
                )
              ],
              deck.length
            );


          for (
            let card = 0;
            card < numberOfCards;
            card++
          ) {

            const rank =
              deck.pop();


            if (
              rank !== undefined
            ) {

              counts[rank]--;
            }
          }
        }


        progress.value =
          (
            (shoeNumber + 1) /
            numShoes
          ) * 100;


        // Give browser UI time to repaint.
        await new Promise<void>(
          resolve =>
            requestAnimationFrame(
              () => resolve()
            )
        );
      }


      const variant =
        isEZ
          ? "EZ Baccarat"
          : "Standard 5% Commission";


      const bankerPercentage =
        totalHands > 0
          ? (
              positiveBankerHands /
              totalHands
            ) * 100
          : 0;


      const playerPercentage =
        totalHands > 0
          ? (
              positivePlayerHands /
              totalHands
            ) * 100
          : 0;


      output.textContent =

`--- SIMULATION RESULTS ---


Shoes Simulated:
${numShoes}


Variant:
${variant}


Cut Card:
${cutCard} cards remaining


Total Hands Analyzed:
${totalHands}


Hands with Banker EV > 0:
${positiveBankerHands}


Percentage:
${bankerPercentage.toFixed(4)}%


Hands with Player EV > 0:
${positivePlayerHands}


Percentage:
${playerPercentage.toFixed(4)}%


Maximum Banker EV Observed:
${(maxBankerEV * 100).toFixed(4)}%


Maximum Player EV Observed:
${(maxPlayerEV * 100).toFixed(4)}%


SUMMARY:


The application recalculates the conditional EV
from the finite remaining shoe composition before
each simulated hand.


The calculation uses exact sampling without
replacement rather than treating the remaining
shoe as an infinite deck.


Positive EV states are therefore identified from
the current mathematical shoe composition.`;

      runButton.disabled =
        false;
    }
  );
