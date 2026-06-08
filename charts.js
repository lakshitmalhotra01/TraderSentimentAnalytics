// ============================================================
// CHARTS.JS — Premium SVG and Canvas Visualizations
// Dr. Aria Voss | Fear, Greed & The Ghost in the Machine
// ============================================================

window.addEventListener('DOMContentLoaded', () => {
  initHeroChart();
  initFatigueChart();
  initLossAversionChart();
  initOverconfidenceChart();
  initHerdChart();
  initAnchorChart();
});

// Helper for High DPI Canvas
function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return { ctx, width: rect.width, height: rect.height };
}

// 1. HERO CHART — Dual Axis (PnL vs Sentiment)
function initHeroChart() {
  const canvas = document.getElementById('heroChart');
  if (!canvas) return;
  const { ctx, width, height } = setupCanvas(canvas);

  const { sm, ret, labels } = heroData;
  const maxVal = Math.max(...sm, ...ret);
  const minVal = Math.min(...sm, ...ret);
  const range = maxVal - minVal;

  // Draw background grids
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i++) {
    const y = 50 + (i / 5) * (height - 100);
    ctx.beginPath();
    ctx.moveTo(50, y);
    ctx.lineTo(width - 50, y);
    ctx.stroke();
  }

  // Draw Fear/Greed Shaded Background (Extreme zones)
  ctx.fillStyle = 'rgba(239, 68, 68, 0.03)'; // Extreme Fear zone
  ctx.fillRect(50, 50, (width - 100) * 0.25, height - 100);
  ctx.fillStyle = 'rgba(34, 197, 94, 0.03)'; // Extreme Greed zone
  ctx.fillRect(50 + (width - 100) * 0.75, 50, (width - 100) * 0.25, height - 100);

  // Function to map data to pixel coordinates
  const getX = (index) => 50 + (index / (sm.length - 1)) * (width - 100);
  const getY = (val) => height - 50 - ((val - minVal) / range) * (height - 100);

  // Draw Retail Line (Rose)
  ctx.beginPath();
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 2;
  ctx.shadowColor = 'rgba(244, 63, 94, 0.4)';
  ctx.shadowBlur = 8;
  ret.forEach((val, idx) => {
    const x = getX(idx);
    const y = getY(val);
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Reset shadow
  ctx.shadowBlur = 0;

  // Draw Smart Money Line (Green/Cyan Glow)
  ctx.beginPath();
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 3;
  ctx.shadowColor = 'rgba(6, 182, 212, 0.5)';
  ctx.shadowBlur = 12;
  sm.forEach((val, idx) => {
    const x = getX(idx);
    const y = getY(val);
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Reset shadow
  ctx.shadowBlur = 0;

  // Y-Axis Labels
  ctx.fillStyle = '#94a3b8';
  ctx.font = '10px JetBrains Mono';
  ctx.textAlign = 'right';
  ctx.fillText('+$15k', 42, 55);
  ctx.fillText('$0', 42, height / 2 + 5);
  ctx.fillText('-$5k', 42, height - 45);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#06b6d4';
  ctx.fillText('Smart Money', 60, 40);
  ctx.fillStyle = '#f43f5e';
  ctx.fillText('Retail PnL', 160, 40);
}

// 2. FATIGUE CHART — Win Rate Decay
function initFatigueChart() {
  const container = document.getElementById('fatigueChart');
  if (!container) return;

  const points = fatigueData.map((d, i) => {
    const x = (i / (fatigueData.length - 1)) * 100;
    const y = 100 - ((d.winRate - 30) / 30) * 100; // range 30% to 60%
    return `${x},${y}`;
  }).join(' ');

  let dots = '';
  fatigueData.forEach((d, i) => {
    const x = (i / (fatigueData.length - 1)) * 100;
    const y = 100 - ((d.winRate - 30) / 30) * 100;
    dots += `<circle cx="${x}%" cy="${y}%" r="4" fill="${d.days >= 7 ? '#f43f5e' : '#6366f1'}" stroke="#05070f" stroke-width="1.5">
              <title>${d.label}: ${d.winRate}% WR</title>
             </circle>`;
  });

  container.innerHTML = `
    <svg class="fatigue-svg" viewBox="0 0 600 200" preserveAspectRatio="none" style="overflow: visible; width: 100%; height: 100%;">
      <!-- Grid lines -->
      <line x1="0" y1="0%" x2="100%" y2="0%" stroke="rgba(255,255,255,0.03)" />
      <line x1="0" y1="33.3%" x2="100%" y2="33.3%" stroke="rgba(255,255,255,0.03)" />
      <line x1="0" y1="66.6%" x2="100%" y2="66.6%" stroke="rgba(255,255,255,0.03)" />
      <line x1="0" y1="100%" x2="100%" y2="100%" stroke="rgba(255,255,255,0.03)" />
      
      <!-- Decay Line -->
      <polyline fill="none" stroke="url(#fatigueGrad)" stroke-width="3" points="${points.replace(/,/g, ' ')}" style="vector-effect: non-scaling-stroke; stroke-dasharray: 1000; stroke-dashoffset: 0; animation: drawLine 2s ease-out;" />
      
      <!-- Dots -->
      ${dots}
      
      <!-- Gradients -->
      <defs>
        <linearGradient id="fatigueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#6366f1" />
          <stop offset="50%" stop-color="#818cf8" />
          <stop offset="100%" stop-color="#f43f5e" />
        </linearGradient>
      </defs>
    </svg>
  `;
}

// 3. LOSS AVERSION CHART
function initLossAversionChart() {
  const canvas = document.getElementById('lossAversionChart');
  if (!canvas) return;
  const { ctx, width, height } = setupCanvas(canvas);

  const padding = 40;
  const barHeight = 24;
  const chartHeight = height - padding * 2;
  const step = chartHeight / lossAversion.length;

  lossAversion.forEach((item, idx) => {
    const y = padding + idx * step;
    
    // Draw background tracks
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.fillRect(100, y, width - 150, barHeight);

    // Draw value bar (Ratio scale, max is 5.0)
    const barWidth = ((item.ratio / 5) * (width - 150));
    const isHigh = item.ratio > 3;
    ctx.fillStyle = isHigh ? 'rgba(244, 63, 94, 0.85)' : 'rgba(99, 102, 241, 0.85)';
    ctx.fillRect(100, y, barWidth, barHeight);

    // Labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px Inter';
    ctx.textAlign = 'left';
    ctx.fillText(item.tier, 10, y + 16);

    ctx.fillStyle = '#f1f5f9';
    ctx.font = '11px JetBrains Mono';
    ctx.fillText(`${item.ratio}x`, 110 + barWidth, y + 16);
  });
}

// 4. OVERCONFIDENCE CHART
function initOverconfidenceChart() {
  const canvas = document.getElementById('overconfidenceChart');
  if (!canvas) return;
  const { ctx, width, height } = setupCanvas(canvas);

  const { fearGreedLevels, avgLeverage, winRate } = overconfData;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Draw X axis
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.beginPath();
  ctx.moveTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  const getX = (idx) => padding + (idx / (fearGreedLevels.length - 1)) * chartWidth;
  
  // Draw Win Rate Line (Cyan, descending)
  ctx.beginPath();
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 2;
  winRate.forEach((wr, idx) => {
    const x = getX(idx);
    const y = height - padding - (wr / 100) * chartHeight;
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Draw Leverage Line (Orange, ascending)
  ctx.beginPath();
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 2;
  avgLeverage.forEach((lev, idx) => {
    const x = getX(idx);
    // Leverage scale 0-25
    const y = height - padding - (lev / 25) * chartHeight;
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Text details
  ctx.fillStyle = '#06b6d4';
  ctx.font = '10px Inter';
  ctx.fillText('Win Rate (Falling)', padding, 20);
  ctx.fillStyle = '#f97316';
  ctx.fillText('Avg Leverage (Spiking)', width - 140, 20);
}

// 5. HERD CHART
function initHerdChart() {
  const canvas = document.getElementById('herdChart');
  if (!canvas) return;
  const { ctx, width, height } = setupCanvas(canvas);

  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) / 2 - 30;

  // Draw concentric alignment rings
  ctx.strokeStyle = 'rgba(255,255,255,0.03)';
  for (let r = 0.3; r <= 1.0; r += 0.3) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, maxRadius * r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Draw sheep/trades clustered around a herd vector
  // Under Extreme Greed (89% Long)
  const angle = -Math.PI / 4; // Dominant direction
  ctx.fillStyle = 'rgba(34, 197, 94, 0.6)';
  
  for (let i = 0; i < 60; i++) {
    // Generate particles clustered along the dominant angle
    const spread = (Math.random() - 0.5) * 0.8;
    const dist = (0.2 + Math.random() * 0.8) * maxRadius;
    const a = angle + spread;
    const px = centerX + Math.cos(a) * dist;
    const py = centerY + Math.sin(a) * dist;

    ctx.beginPath();
    ctx.arc(px, py, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw minority side (Sellers in Greed)
  ctx.fillStyle = 'rgba(244, 63, 94, 0.4)';
  for (let i = 0; i < 10; i++) {
    const a = angle + Math.PI + (Math.random() - 0.5) * 1.5;
    const dist = (0.4 + Math.random() * 0.5) * maxRadius;
    const px = centerX + Math.cos(a) * dist;
    const py = centerY + Math.sin(a) * dist;
    ctx.beginPath();
    ctx.arc(px, py, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#94a3b8';
  ctx.font = '10px JetBrains Mono';
  ctx.textAlign = 'center';
  ctx.fillText('Dominant Herd Vector (89% Long)', centerX, height - 10);
}

// 6. PRICE ANCHORING CHART
function initAnchorChart() {
  const canvas = document.getElementById('anchorChart');
  if (!canvas) return;
  const { ctx, width, height } = setupCanvas(canvas);

  const padding = 30;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Draw horizontal lines representing round numbers
  const roundLevels = [10000, 20000, 30000, 40000, 50000];
  ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
  ctx.lineWidth = 1;
  
  roundLevels.forEach((level, idx) => {
    const y = padding + (idx / (roundLevels.length - 1)) * chartHeight;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();

    ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
    ctx.font = '9px JetBrains Mono';
    ctx.fillText(`$${level / 1000}k Axis`, padding + 5, y - 4);
  });

  // Plot density of trade points (Anchoring clustering signature)
  ctx.fillStyle = 'rgba(6, 182, 212, 0.35)';
  for (let i = 0; i < 180; i++) {
    const x = padding + Math.random() * chartWidth;
    
    // Create clusters near the round levels
    let y;
    if (Math.random() < 0.75) {
      const targetLevel = roundLevels[Math.floor(Math.random() * roundLevels.length)];
      const targetY = padding + (roundLevels.indexOf(targetLevel) / (roundLevels.length - 1)) * chartHeight;
      // Normal distribution around targetY
      const offset = (Math.random() + Math.random() + Math.random() - 1.5) * 8;
      y = targetY + offset;
    } else {
      y = padding + Math.random() * chartHeight;
    }

    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}
