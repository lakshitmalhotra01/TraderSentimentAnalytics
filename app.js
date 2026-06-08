// ============================================================
// APP.JS — Application Orchestrator & UI Interactions
// Dr. Aria Voss | Fear, Greed & The Ghost in the Machine
// ============================================================

window.addEventListener('DOMContentLoaded', () => {
  // Load dynamic templates
  renderDataDist();
  renderStreaks();
  renderPerformanceMatrix();
  renderWhaleRetail();
  renderTransitionMatrix();
  renderFatigueTable();
  renderSmartMoney();
  renderSymbolMap();
  renderGoldenHours();
  renderIntradayHeatmap();
  renderHerdTable();
  renderStrategyComparison();
  renderPsychologyReportCard();
  initCodeTabs();

  // Scroll Animations
  setupScrollAnimations();

  // Counter animation
  animateCounters();
});

// Render classification distribution (Module 1)
function renderDataDist() {
  const container = document.getElementById('distBars');
  if (!container) return;

  container.innerHTML = sentimentDist.map(item => `
    <div class="dist-bar-row">
      <div class="dist-bar-label">${item.label}</div>
      <div class="dist-bar-track">
        <div class="dist-bar-fill" style="width: 0%; background: ${item.color};" data-width="${item.pct}%">
          ${item.days} days
        </div>
      </div>
      <div class="dist-bar-pct">${item.pct}%</div>
    </div>
  `).join('');

  // Trigger animation after brief delay
  setTimeout(() => {
    container.querySelectorAll('.dist-bar-fill').forEach(fill => {
      fill.style.width = fill.getAttribute('data-width');
    });
  }, 100);
}

// Render Extreme Sentiment Streaks (Module 1)
function renderStreaks() {
  const container = document.getElementById('streaksGrid');
  if (!container) return;

  container.innerHTML = streaks.slice(0, 8).map(streak => `
    <div class="streak-item">
      <div class="streak-header">
        <span class="streak-class" style="background: ${streak.color}15; color: ${streak.color}">${streak.class}</span>
        <span class="streak-date">${streak.start}</span>
      </div>
      <div class="streak-len">${streak.len} days</div>
      <div class="streak-pnl ${streak.avgPnL > 0 ? 'positive' : 'negative'}">
        Avg PnL: ${streak.avgPnL > 0 ? '+' : ''}${streak.avgPnL}%
      </div>
    </div>
  `).join('');
}

// Render Performance Matrix (Module 2)
function renderPerformanceMatrix() {
  const body = document.getElementById('perfMatrixBody');
  if (!body) return;

  body.innerHTML = perfMatrix.map(row => {
    const isWinRateGood = row.wr > 50;
    const wrColor = isWinRateGood ? 'var(--emerald)' : 'var(--rose)';
    return `
      <tr>
        <td>
          <span class="sentiment-pill" style="background: ${COLORS[row.sent]}15; color: ${COLORS[row.sent]}">
            ${row.sent}
          </span>
        </td>
        <td class="td-right">${row.trades}</td>
        <td class="td-right ${row.meanPnL > 0 ? 'positive' : 'negative'}">$${row.meanPnL > 0 ? '+' : ''}${row.meanPnL}</td>
        <td class="td-right ${row.medPnL > 0 ? 'positive' : 'negative'}">$${row.medPnL > 0 ? '+' : ''}${row.medPnL}</td>
        <td class="td-right">$${row.stdPnL}</td>
        <td>
          <div class="wr-bar-wrap">
            <span style="font-family: var(--font-mono); width: 45px;">${row.wr}%</span>
            <div class="wr-bar" style="width: ${row.wr}px; background: ${wrColor};"></div>
          </div>
        </td>
        <td class="td-right">${row.pf}</td>
        <td class="td-right">${row.lev}x</td>
        <td>
          <span class="badge-${row.risk === 'LOW' ? 'green' : row.risk === 'MEDIUM' ? 'yellow' : 'red'}">${row.risk}</span>
        </td>
      </tr>
    `;
  }).join('');

  // LONG vs SHORT breakdown Tables
  const longT = document.getElementById('longTable');
  if (longT) {
    longT.innerHTML = `
      <thead>
        <tr>
          <th>Sentiment</th>
          <th>Trades</th>
          <th class="td-right">Avg PnL</th>
          <th class="td-right">Win Rate</th>
        </tr>
      </thead>
      <tbody>
        ${longPerf.map(row => `
          <tr>
            <td><span style="color: ${COLORS[row.sent]}">${row.sent}</span></td>
            <td>${row.trades}</td>
            <td class="td-right ${row.meanPnL > 0 ? 'positive' : 'negative'}">$${row.meanPnL > 0 ? '+' : ''}${row.meanPnL}</td>
            <td class="td-right font-mono">${row.wr}%</td>
          </tr>
        `).join('')}
      </tbody>
    `;
  }

  const shortT = document.getElementById('shortTable');
  if (shortT) {
    shortT.innerHTML = `
      <thead>
        <tr>
          <th>Sentiment</th>
          <th>Trades</th>
          <th class="td-right">Avg PnL</th>
          <th class="td-right">Win Rate</th>
        </tr>
      </thead>
      <tbody>
        ${shortPerf.map(row => `
          <tr>
            <td><span style="color: ${COLORS[row.sent]}">${row.sent}</span></td>
            <td>${row.trades}</td>
            <td class="td-right ${row.meanPnL > 0 ? 'positive' : 'negative'}">$${row.meanPnL > 0 ? '+' : ''}${row.meanPnL}</td>
            <td class="td-right font-mono">${row.wr}%</td>
          </tr>
        `).join('')}
      </tbody>
    `;
  }

  // Crowd Mistake Rate (Module 2)
  const crowdTable = document.getElementById('crowdTable');
  if (crowdTable) {
    crowdTable.innerHTML = `
      <table class="data-table mt-2">
        <thead>
          <tr>
            <th>Sentiment Class</th>
            <th>Dominant Sentiment Herd</th>
            <th class="td-right">Crowd Mistake Rate</th>
          </tr>
        </thead>
        <tbody>
          ${crowdMistake.map(item => `
            <tr>
              <td><span style="color: ${COLORS[item.sent]}">${item.sent}</span></td>
              <td><strong>${item.dominant}</strong></td>
              <td class="td-right font-mono" style="color: var(--rose); font-weight: 700;">${item.rate}%</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  // The Leverage Trap Visualizer
  const levVisual = document.getElementById('leverageVisual');
  if (levVisual) {
    levVisual.innerHTML = perfMatrix.map(row => {
      const scale = row.lev / 20 * 100;
      return `
        <div class="lev-row">
          <div class="lev-label">${row.sent}</div>
          <div class="lev-bar-track">
            <div class="lev-bar-fill" style="width: ${scale}%; background: ${COLORS[row.sent]}">
              ${row.lev}x
            </div>
          </div>
          <div class="lev-wr font-mono">${row.wr}% WR</div>
        </div>
      `;
    }).join('');
  }
}

// Render Whale vs Retail Tier (Module 2)
function renderWhaleRetail() {
  const container = document.getElementById('whaleRetailGrid');
  if (!container) return;

  container.innerHTML = SENTIMENTS.map(sent => {
    const data = whaleRetail[sent];
    return `
      <div class="wr-col">
        <div class="wr-col-head" style="background: ${COLORS[sent]}15; color: ${COLORS[sent]}">${SENT_ABBR[sent]}</div>
        <div class="wr-cell">
          <div class="wr-cell-tier">🐳 WHALE</div>
          <div class="wr-cell-pnl positive">+$${data.whale.pnl}</div>
          <div class="wr-cell-wr">${data.whale.wr}% WR</div>
        </div>
        <div class="wr-cell">
          <div class="wr-cell-tier">🧑‍🌾 RETAIL</div>
          <div class="wr-cell-pnl ${data.retail.pnl > 0 ? 'positive' : 'negative'}">
            ${data.retail.pnl > 0 ? '+' : ''}$${data.retail.pnl}
          </div>
          <div class="wr-cell-wr">${data.retail.wr}% WR</div>
        </div>
      </div>
    `;
  }).join('');
}

// Render 5x5 Transition Matrix (Module 3A)
function renderTransitionMatrix() {
  const container = document.getElementById('transitionMatrix');
  if (!container) return;

  let headers = `<th>FROM \\ TO</th>`;
  SENTIMENTS.forEach(sent => {
    headers += `<th>${SENT_ABBR[sent]}</th>`;
  });

  let rows = '';
  SENTIMENTS.forEach(fromSent => {
    rows += `<tr><td class="row-head">${fromSent}</td>`;
    SENTIMENTS.forEach(toSent => {
      const cell = transitionData[fromSent][toSent];
      let bgStyle = '';
      if (cell.pnl > 800) bgStyle = 'background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.3);';
      else if (cell.pnl < -400) bgStyle = 'background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3);';
      
      rows += `
        <td style="${bgStyle}">
          <div class="tc-pnl ${cell.pnl > 0 ? 'positive' : 'negative'}">${cell.pnl > 0 ? '+' : ''}$${cell.pnl}</div>
          <div class="tc-wr">${cell.wr}% WR</div>
        </td>
      `;
    });
    rows += `</tr>`;
  });

  container.innerHTML = `
    <table class="t-matrix">
      <thead><tr>${headers}</tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

// Render fatigue table under decay chart (Module 3B)
function renderFatigueTable() {
  const container = document.getElementById('fatigueTable');
  if (!container) return;

  container.innerHTML = `
    <thead>
      <tr>
        <th>Consecutive Days</th>
        ${fatigueData.slice(0, 10).map(d => `<th class="td-right">${d.days}d</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Win Rate (%)</td>
        ${fatigueData.slice(0, 10).map(d => `<td class="td-right font-mono ${d.days >= 7 ? 'negative' : 'positive'}">${d.winRate}%</td>`).join('')}
      </tr>
    </tbody>
  `;
}

// Render Smart Money Profiles (Module 3C)
function renderSmartMoney() {
  const profileContainer = document.getElementById('smartMoneyProfile');
  if (profileContainer) {
    profileContainer.innerHTML = smartMoneyProfile.map(trait => `
      <div class="sm-trait">
        <div class="sm-trait-icon">${trait.icon}</div>
        <div style="flex: 1;">
          <div class="sm-trait-name">${trait.name}</div>
          <div class="sm-trait-desc">${trait.desc}</div>
        </div>
        <div class="sm-trait-val ${trait.type}">${trait.val}</div>
      </div>
    `).join('');
  }

  const statsContainer = document.getElementById('smartMoneyStats');
  if (statsContainer) {
    statsContainer.innerHTML = smartMoneyStats.map(stat => `
      <div class="sm-stat-card">
        <span class="sm-stat-num">${stat.num}</span>
        <span class="sm-stat-label">${stat.label}</span>
      </div>
    `).join('');
  }
}

// Render Symbol sensitivity scorecard (Module 3D)
function renderSymbolMap() {
  const container = document.getElementById('symbolMap');
  if (!container) return;

  container.innerHTML = symbols.slice(0, 6).map(sym => {
    const scale = sym.score;
    return `
      <div class="symbol-item">
        <div class="symbol-name" style="color: ${sym.color}">${sym.name}</div>
        <div class="symbol-score">Sensitivity: ${sym.score}</div>
        <div class="symbol-bar">
          <div class="symbol-bar-fill" style="width: ${scale}%; background: ${sym.color}"></div>
        </div>
        <div class="symbol-fear-pnl positive">+$${sym.fearPnL} Fear PnL</div>
      </div>
    `;
  }).join('');

  // Render sleeper assets container
  const sleepersContainer = document.getElementById('sleeperAssets');
  if (sleepersContainer) {
    const sleeperList = symbols.filter(s => s.sleeper);
    sleepersContainer.innerHTML = `
      <h4>🌙 Sleeper Assets (High profitability in Fear, low retail interest)</h4>
      <div class="sleeper-grid">
        ${sleeperList.map(s => `
          <div class="sleeper-tag">
            <span class="sleeper-name">${s.name}</span>
            <span class="sleeper-pnl">Fear PnL: +$${s.fearPnL} (Sensitivity: ${s.score})</span>
          </div>
        `).join('')}
      </div>
    `;
  }
}

// Render Golden Hours (Module 3E)
function renderGoldenHours() {
  const container = document.getElementById('goldenHours');
  if (!container) return;

  container.innerHTML = SENTIMENTS.map(sent => {
    const hours = goldenHours[sent];
    return `
      <div class="gh-col">
        <div class="gh-col-head" style="background: ${COLORS[sent]}15; color: ${COLORS[sent]}">${SENT_ABBR[sent]}</div>
        ${hours.map(h => `
          <div class="gh-hour ${h.gold ? 'golden' : ''}">
            <span class="gh-time">${h.h} UTC</span>
            <span class="gh-pnl ${h.pnl > 0 ? 'positive' : 'negative'}">${h.pnl > 0 ? '+' : ''}$${h.pnl}</span>
            <span class="gh-wr">${h.wr}% WR</span>
          </div>
        `).join('')}
      </div>
    `;
  }).join('');
}

// Render Intraday Heatmap grid (Module 3E)
function renderIntradayHeatmap() {
  const container = document.getElementById('intradayHeatmap');
  if (!container) return;

  let headers = `<th>Sentiment \\ Hour (UTC)</th>`;
  for (let h = 0; h < 24; h++) {
    headers += `<th>${String(h).padStart(2, '0')}</th>`;
  }

  let rows = '';
  SENTIMENTS.forEach(sent => {
    rows += `<tr><td class="ih-row-head">${SENT_ABBR[sent]}</td>`;
    const pnlList = intradayHeatmapData[sent];
    pnlList.forEach((pnl, h) => {
      // Color intensity map
      let opacity = Math.min(Math.abs(pnl) / 1000, 1.0) * 0.4 + 0.05;
      let colorClass = pnl > 0 ? `rgba(34, 197, 94, ${opacity})` : `rgba(239, 68, 68, ${opacity})`;
      let isGolden = (sent === 'Extreme Fear' && [2, 8, 14].includes(h)) ||
                     (sent === 'Fear' && [2, 8, 14].includes(h)) ||
                     (sent === 'Neutral' && h === 8);
      
      let cellStyle = `background: ${colorClass}; color: ${Math.abs(pnl) > 500 ? '#ffffff' : '#94a3b8'};`;
      if (isGolden) cellStyle += 'border: 1.5px solid var(--yellow); box-shadow: 0 0 8px var(--yellow);';

      rows += `<td style="${cellStyle}" title="${h}:00 UTC - ${sent}: $${pnl}">${isGolden ? '⭐' : pnl > 0 ? '+' : ''}${Math.round(pnl / 100)}</td>`;
    });
    rows += `</tr>`;
  });

  container.innerHTML = `
    <table class="ih-table">
      <thead><tr>${headers}</tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

// Render Herd table (Module 4C)
function renderHerdTable() {
  const container = document.getElementById('herdTable');
  if (!container) return;

  container.innerHTML = `
    <thead>
      <tr>
        <th>Sentiment Class</th>
        <th>Herd Alignment</th>
        <th class="td-right">Herd Strength (%)</th>
        <th class="td-right">Herd Mistake Rate</th>
      </tr>
    </thead>
    <tbody>
      ${herdBehavior.map(item => `
        <tr>
          <td><span style="color: ${COLORS[item.sent]}">${item.sent}</span></td>
          <td><strong>${item.dominantSide}</strong></td>
          <td class="td-right font-mono">${item.pct}%</td>
          <td class="td-right font-mono text-rose" style="color: var(--rose); font-weight:700;">${item.herdLose}%</td>
        </tr>
      `).join('')}
    </tbody>
  `;
}

// Render Strategy comparison table (Module 5)
function renderStrategyComparison() {
  const container = document.getElementById('strategyCompare');
  if (!container) return;

  container.innerHTML = `
    <thead>
      <tr>
        <th>Strategy Profile</th>
        <th class="td-right">Win Rate</th>
        <th class="td-right">Avg PnL / Trade</th>
        <th class="td-right">Max Drawdown</th>
        <th class="td-right">Profit Factor</th>
        <th class="td-right">Backtested Trades</th>
      </tr>
    </thead>
    <tbody>
      ${strategyCompare.map(strat => {
        let nameColor = 'var(--text-primary)';
        if (strat.name.includes('Sniper')) nameColor = 'var(--purple-light)';
        if (strat.name.includes('Mirror')) nameColor = 'var(--emerald)';
        if (strat.name.includes('Fade')) nameColor = 'var(--yellow)';

        return `
          <tr>
            <td><strong style="color: ${nameColor}">${strat.name}</strong></td>
            <td class="td-right font-mono">${strat.wr}</td>
            <td class="td-right font-mono positive">${strat.avgPnL}</td>
            <td class="td-right font-mono ${strat.maxDD.includes('-1') || strat.maxDD.includes('-2') ? 'positive' : 'negative'}">${strat.maxDD}</td>
            <td class="td-right font-mono">${strat.pf}</td>
            <td class="td-right font-mono">${strat.trades}</td>
          </tr>
        `;
      }).join('')}
    </tbody>
  `;
}

// Render Psychology Report Card (Module 4)
function renderPsychologyReportCard() {
  const container = document.getElementById('reportCard');
  if (!container) return;

  container.innerHTML = reportCard.map(item => `
    <div class="rc-item">
      <div class="rc-label">${item.label}</div>
      <div class="rc-grade ${item.cls}">${item.grade}</div>
      <div class="rc-note">${item.note}</div>
    </div>
  `).join('');
}

// Code library tabs engine
function initCodeTabs() {
  const tabContainer = document.getElementById('codeTabs');
  if (!tabContainer) return;

  const buttons = tabContainer.querySelectorAll('.tab-btn');
  const content = tabContainer.querySelector('#tabContent');

  function loadTab(vizId) {
    const data = vizCode[vizId];
    if (!data) return;

    // Syntax Highlight helper (extremely lightweight markup)
    let highlighted = data.code
      .replace(/(def|import|from|as|for|in|if|elif|else|return|True|False|None)\b/g, '<span class="kw">$1</span>')
      .replace(/(['"].*?['"])/g, '<span class="str">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="num">$1</span>')
      .replace(/(#.*)$/gm, '<span class="cmt">$1</span>')
      .replace(/(\w+)(?=\()/g, '<span class="fn">$1</span>');

    content.innerHTML = `
      <div class="tab-pane active">
        <div class="code-header">
          <div>
            <div class="code-title">${data.title}</div>
            <div class="code-desc">${data.desc}</div>
          </div>
          <button class="code-copy-btn" id="copyBtn">Copy Code</button>
        </div>
        <pre class="code-block"><code>${highlighted}</code></pre>
      </div>
    `;

    // Hook copy button
    const copyBtn = content.querySelector('#copyBtn');
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(data.code).then(() => {
        copyBtn.innerText = 'Copied!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.innerText = 'Copy Code';
          copyBtn.classList.remove('copied');
        }, 2000);
      });
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadTab(btn.getAttribute('data-tab'));
    });
  });

  // Load initial tab
  loadTab('viz1');
}

// Scroll animation observer
function setupScrollAnimations() {
  const modules = document.querySelectorAll('.module');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  modules.forEach(m => observer.observe(m));
}

// Stat counters animations
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current += step;
      if (current >= target) {
        counter.innerText = target.toLocaleString();
      } else {
        counter.innerText = Math.floor(current).toLocaleString();
        requestAnimationFrame(update);
      }
    };
    update();
  });
}
