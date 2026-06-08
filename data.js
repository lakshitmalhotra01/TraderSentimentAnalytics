// ============================================================
// DATA.JS — Synthetic Research Dataset
// Dr. Aria Voss | Fear, Greed & The Ghost in the Machine
// ============================================================

const SENTIMENTS = ['Extreme Fear', 'Fear', 'Neutral', 'Greed', 'Extreme Greed'];
const COLORS = {
  'Extreme Fear': '#ef4444',
  'Fear':         '#f97316',
  'Neutral':      '#94a3b8',
  'Greed':        '#84cc16',
  'Extreme Greed':'#22c55e'
};
const SENT_ABBR = { 'Extreme Fear':'EFear', 'Fear':'Fear', 'Neutral':'Neut', 'Greed':'Greed', 'Extreme Greed':'EGreed' };

// ── Classification Distribution (1,461 days) ─────────────────
const sentimentDist = [
  { label: 'Extreme Fear', days: 287, pct: 19.6, color: '#ef4444' },
  { label: 'Fear',         days: 342, pct: 23.4, color: '#f97316' },
  { label: 'Neutral',      days: 218, pct: 14.9, color: '#94a3b8' },
  { label: 'Greed',        days: 381, pct: 26.1, color: '#84cc16' },
  { label: 'Extreme Greed',days: 233, pct: 15.9, color: '#22c55e' },
];

// ── Extreme Sentiment Streaks ────────────────────────────────
const streaks = [
  { class: 'Extreme Greed', len: 47, start: 'Oct 2021', avgPnL: -423, color: '#22c55e' },
  { class: 'Extreme Fear',  len: 31, start: 'Jun 2022', avgPnL: +891, color: '#ef4444' },
  { class: 'Greed',         len: 28, start: 'Mar 2024', avgPnL: +312, color: '#84cc16' },
  { class: 'Fear',          len: 24, start: 'Jan 2023', avgPnL: +187, color: '#f97316' },
  { class: 'Extreme Greed', len: 19, start: 'Jan 2021', avgPnL: -311, color: '#22c55e' },
  { class: 'Extreme Fear',  len: 18, start: 'Nov 2022', avgPnL: +743, color: '#ef4444' },
  { class: 'Greed',         len: 14, start: 'Aug 2023', avgPnL: +201, color: '#84cc16' },
  { class: 'Fear',          len: 12, start: 'Sep 2023', avgPnL: +156, color: '#f97316' },
  { class: 'Neutral',       len: 9,  start: 'Dec 2023', avgPnL: +67,  color: '#94a3b8' },
  { class: 'Extreme Greed', len: 8,  start: 'Apr 2024', avgPnL: -289, color: '#22c55e' },
];

// ── Module 2: Performance Matrix ─────────────────────────────
const perfMatrix = [
  { sent: 'Extreme Fear',  trades: 1847, meanPnL: 312,  medPnL: 187,  stdPnL: 2341, wr: 58.4, pf: 1.84, lev: 7.2,  risk: 'LOW' },
  { sent: 'Fear',          trades: 2134, meanPnL: 143,  medPnL: 87,   stdPnL: 1876, wr: 54.1, pf: 1.42, lev: 9.1,  risk: 'MEDIUM' },
  { sent: 'Neutral',       trades: 1456, meanPnL: 34,   medPnL: 12,   stdPnL: 1654, wr: 50.7, pf: 1.09, lev: 11.4, risk: 'MEDIUM' },
  { sent: 'Greed',         trades: 2891, meanPnL: -187, medPnL: -143, stdPnL: 2123, wr: 38.2, pf: 0.78, lev: 14.8, risk: 'HIGH' },
  { sent: 'Extreme Greed', trades: 1919, meanPnL: -847, medPnL: -612, stdPnL: 3287, wr: 26.8, pf: 0.47, lev: 18.4, risk: 'VERY HIGH' },
];

// ── LONG vs SHORT ────────────────────────────────────────────
const longPerf = [
  { sent: 'Extreme Fear',   meanPnL: 743,  wr: 71.3, trades: 834  },
  { sent: 'Fear',           meanPnL: 287,  wr: 61.2, trades: 1021 },
  { sent: 'Neutral',        meanPnL: 89,   wr: 52.1, trades: 743  },
  { sent: 'Greed',          meanPnL: -124, wr: 41.8, trades: 1847 },
  { sent: 'Extreme Greed',  meanPnL: -912, wr: 24.3, trades: 1634 },
];

const shortPerf = [
  { sent: 'Extreme Fear',   meanPnL: -287, wr: 38.2, trades: 1013 },
  { sent: 'Fear',           meanPnL: -89,  wr: 43.7, trades: 1113 },
  { sent: 'Neutral',        meanPnL: -12,  wr: 48.9, trades: 713  },
  { sent: 'Greed',          meanPnL: 487,  wr: 62.4, trades: 1044 },
  { sent: 'Extreme Greed',  meanPnL: 891,  wr: 74.1, trades: 285  },
];

// ── Crowd Mistake Rate ───────────────────────────────────────
const crowdMistake = [
  { sent: 'Extreme Fear',  rate: 41.6, dominant: 'SHORT', follow_lose: 41.6 },
  { sent: 'Fear',          rate: 45.9, dominant: 'SHORT', follow_lose: 38.8 },
  { sent: 'Neutral',       rate: 49.3, dominant: 'MIXED', follow_lose: 49.3 },
  { sent: 'Greed',         rate: 61.8, dominant: 'LONG',  follow_lose: 58.2 },
  { sent: 'Extreme Greed', rate: 73.2, dominant: 'LONG',  follow_lose: 75.7 },
];

// ── Whale vs Retail ──────────────────────────────────────────
const whaleRetail = {
  'Extreme Fear':  { whale: { pnl: +2140, wr: 71.2 }, retail: { pnl: +187, wr: 52.1 } },
  'Fear':          { whale: { pnl: +943,  wr: 64.7 }, retail: { pnl: +89,  wr: 48.3 } },
  'Neutral':       { whale: { pnl: +312,  wr: 55.1 }, retail: { pnl: +12,  wr: 49.2 } },
  'Greed':         { whale: { pnl: +187,  wr: 48.3 }, retail: { pnl: -312, wr: 34.7 } },
  'Extreme Greed': { whale: { pnl: -89,   wr: 38.4 }, retail: { pnl: -1143,wr: 21.4 } },
};

// ── Module 3A: Transition Matrix (FROM → TO), avgPnL and winRate ──
const transitionData = {
  'Extreme Fear': {
    'Extreme Fear': { pnl: 189,  wr: 57.3 },
    'Fear':         { pnl: 1847, wr: 71.3 },
    'Neutral':      { pnl: 743,  wr: 63.2 },
    'Greed':        { pnl: 412,  wr: 58.9 },
    'Extreme Greed':{ pnl: 234,  wr: 54.1 },
  },
  'Fear': {
    'Extreme Fear': { pnl: -287, wr: 38.7 },
    'Fear':         { pnl: 143,  wr: 54.1 },
    'Neutral':      { pnl: 387,  wr: 59.4 },
    'Greed':        { pnl: 189,  wr: 54.8 },
    'Extreme Greed':{ pnl: 67,   wr: 51.2 },
  },
  'Neutral': {
    'Extreme Fear': { pnl: -123, wr: 42.1 },
    'Fear':         { pnl: -89,  wr: 44.7 },
    'Neutral':      { pnl: 34,   wr: 50.7 },
    'Greed':        { pnl: -623, wr: 35.8 },
    'Extreme Greed':{ pnl: -234, wr: 41.3 },
  },
  'Greed': {
    'Extreme Fear': { pnl: 1243, wr: 68.4 },
    'Fear':         { pnl: 743,  wr: 63.1 },
    'Neutral':      { pnl: 234,  wr: 54.9 },
    'Greed':        { pnl: -187, wr: 38.2 },
    'Extreme Greed':{ pnl: -412, wr: 33.7 },
  },
  'Extreme Greed': {
    'Extreme Fear': { pnl: 1891, wr: 73.4 },
    'Fear':         { pnl: 1124, wr: 67.8 },
    'Neutral':      { pnl: 487,  wr: 57.2 },
    'Greed':        { pnl: 143,  wr: 52.1 },
    'Extreme Greed':{ pnl: -847, wr: 26.8 },
  },
};

// ── Module 3B: Fatigue Data ──────────────────────────────────
const fatigueData = [
  { days: 1,  winRate: 58.4, label: 'Day 1' },
  { days: 2,  winRate: 57.1, label: 'Day 2' },
  { days: 3,  winRate: 56.2, label: 'Day 3' },
  { days: 4,  winRate: 55.3, label: 'Day 4' },
  { days: 5,  winRate: 53.8, label: 'Day 5' },
  { days: 6,  winRate: 51.4, label: 'Day 6' },
  { days: 7,  winRate: 47.8, label: 'Day 7' },
  { days: 8,  winRate: 44.2, label: 'Day 8' },
  { days: 9,  winRate: 41.7, label: 'Day 9' },
  { days: 10, winRate: 39.3, label: 'Day 10' },
  { days: 11, winRate: 37.1, label: 'Day 11' },
  { days: 12, winRate: 36.4, label: 'Day 12' },
  { days: 14, winRate: 34.8, label: 'Day 14' },
  { days: 21, winRate: 32.1, label: 'Day 21' },
];

// ── Module 3C: Smart Money Profile ───────────────────────────
const smartMoneyProfile = [
  { icon: '📅', name: 'Trade Frequency',   val: '3.2×/week',  type: 'neu', desc: 'vs 14.7×/week for average retail' },
  { icon: '⚖️', name: 'Avg Leverage',       val: '4.2×',       type: 'pos', desc: '76% lower than Extreme Greed retail' },
  { icon: '🏆', name: 'Win Rate (all)',      val: '68.4%',      type: 'pos', desc: 'Profitable in ALL 5 sentiment classes' },
  { icon: '⏰', name: 'Entry Delay',         val: '4.3 hours',  type: 'neu', desc: 'After sentiment shift before entry' },
  { icon: '💰', name: 'Avg PnL / trade',    val: '+$1,247',    type: 'pos', desc: 'vs -$187 for retail average' },
  { icon: '🛡️', name: 'Max Drawdown',        val: '-12.3%',     type: 'neg', desc: 'Tightest stop discipline in dataset' },
  { icon: '🎯', name: 'Preferred Hours',     val: '02, 08, 14', type: 'neu', desc: 'UTC — low noise, high signal windows' },
  { icon: '🔄', name: 'Transition Trades',   val: '71.8%',      type: 'pos', desc: 'Of their trades on Day-1 of transition' },
];

const smartMoneyStats = [
  { num: '42',     label: 'Accounts identified as Smart Money' },
  { num: '5/5',    label: 'Profitable in all sentiment classes' },
  { num: '+$1,247',label: 'Average PnL per trade' },
  { num: '68.4%',  label: 'Overall win rate' },
];

// ── Module 3D: Symbol Sensitivity ────────────────────────────
const symbols = [
  { name: 'BTC',   score: 94, fearPnL: +743,  rank: 1,  color: '#f7931a', sleeper: false },
  { name: 'ETH',   score: 91, fearPnL: +612,  rank: 2,  color: '#627eea', sleeper: false },
  { name: 'SOL',   score: 88, fearPnL: +891,  rank: 3,  color: '#9945ff', sleeper: false },
  { name: 'AVAX',  score: 82, fearPnL: +487,  rank: 4,  color: '#e84142', sleeper: false },
  { name: 'LINK',  score: 79, fearPnL: +934,  rank: 5,  color: '#2a5ada', sleeper: true  },
  { name: 'DOGE',  score: 77, fearPnL: +287,  rank: 6,  color: '#c3a634', sleeper: false },
  { name: 'ARB',   score: 74, fearPnL: +1123, rank: 7,  color: '#12aaff', sleeper: true  },
  { name: 'OP',    score: 71, fearPnL: +987,  rank: 8,  color: '#ff0420', sleeper: true  },
  { name: 'MATIC', score: 68, fearPnL: +643,  rank: 9,  color: '#8247e5', sleeper: false },
  { name: 'WIF',   score: 65, fearPnL: +1347, rank: 10, color: '#9945ff', sleeper: true  },
  { name: 'BNB',   score: 63, fearPnL: +312,  rank: 11, color: '#f0b90b', sleeper: false },
  { name: 'TIA',   score: 61, fearPnL: +1521, rank: 12, color: '#7b2bf9', sleeper: true  },
];

// ── Module 3E: Golden Hours ───────────────────────────────────
const goldenHours = {
  'Extreme Fear':  [
    { h: '02:00', pnl: +1247, wr: 71.3, gold: true  },
    { h: '08:00', pnl: +987,  wr: 67.8, gold: true  },
    { h: '14:00', pnl: +743,  wr: 64.2, gold: true  },
    { h: '20:00', pnl: +187,  wr: 54.1, gold: false },
  ],
  'Fear': [
    { h: '02:00', pnl: +743,  wr: 63.2, gold: true  },
    { h: '08:00', pnl: +612,  wr: 61.4, gold: true  },
    { h: '14:00', pnl: +487,  wr: 59.7, gold: true  },
    { h: '20:00', pnl: +89,   wr: 51.2, gold: false },
  ],
  'Neutral': [
    { h: '02:00', pnl: +89,   wr: 52.3, gold: false },
    { h: '08:00', pnl: +123,  wr: 53.7, gold: true  },
    { h: '14:00', pnl: +67,   wr: 51.9, gold: false },
    { h: '20:00', pnl: -34,   wr: 48.7, gold: false },
  ],
  'Greed': [
    { h: '02:00', pnl: -89,   wr: 42.3, gold: false },
    { h: '08:00', pnl: -234,  wr: 37.4, gold: false },
    { h: '14:00', pnl: -187,  wr: 38.9, gold: false },
    { h: '20:00', pnl: -312,  wr: 34.2, gold: false },
  ],
  'Extreme Greed': [
    { h: '02:00', pnl: -487,  wr: 29.4, gold: false },
    { h: '08:00', pnl: -743,  wr: 24.8, gold: false },
    { h: '14:00', pnl: -612,  wr: 26.1, gold: false },
    { h: '20:00', pnl: -1243, wr: 19.7, gold: false },
  ],
};

// Intraday Heatmap (hour 0-23 × sentiment) — avg PnL
const intradayHeatmapData = (() => {
  const base = {
    'Extreme Fear':  [900,850,1100,780,640,590,720,980,870,760,680,590,520,610,730,690,580,520,470,380,290,340,420,680],
    'Fear':          [520,490,650,430,380,360,410,580,520,480,420,380,330,380,440,410,360,310,290,230,190,220,280,420],
    'Neutral':       [80,70,90,60,50,40,60,90,80,70,60,50,40,50,70,60,50,40,30,20,10,20,40,70],
    'Greed':         [-120,-140,-90,-160,-180,-200,-170,-130,-140,-150,-160,-180,-200,-180,-160,-170,-180,-200,-210,-220,-230,-210,-190,-150],
    'Extreme Greed': [-340,-380,-290,-420,-490,-540,-480,-360,-390,-420,-460,-490,-530,-500,-470,-480,-510,-540,-560,-580,-600,-570,-530,-420],
  };
  return base;
})();

// ── Module 4A: Loss Aversion Ratios ──────────────────────────
const lossAversion = [
  { tier: 'Smart Money',  ratio: 1.8,  avgGain: 1247, avgLoss: -2244 },
  { tier: 'Median Retail',ratio: 3.1,  avgGain: 423,  avgLoss: -1311 },
  { tier: 'Bottom 10%',  ratio: 4.7,  avgGain: 187,  avgLoss: -879  },
  { tier: 'Greed Phase',  ratio: 3.8,  avgGain: 312,  avgLoss: -1186 },
  { tier: 'Fear Phase',   ratio: 2.2,  avgGain: 743,  avgLoss: -1634 },
];

// ── Module 4C: Herd Behavior ─────────────────────────────────
const herdBehavior = [
  { sent: 'Extreme Fear',  dominantSide: 'SHORT', pct: 78.4, herdLose: 41.6 },
  { sent: 'Fear',          dominantSide: 'SHORT', pct: 63.2, herdLose: 38.8 },
  { sent: 'Neutral',       dominantSide: 'MIXED', pct: 51.3, herdLose: 49.3 },
  { sent: 'Greed',         dominantSide: 'LONG',  pct: 74.7, herdLose: 58.2 },
  { sent: 'Extreme Greed', dominantSide: 'LONG',  pct: 89.1, herdLose: 73.2 },
];

// ── Module 5: Strategy Compare ────────────────────────────────
const strategyCompare = [
  { name: 'BTC Buy & Hold',         wr: '—',    avgPnL: '+$1,247',  maxDD: '-72.3%', pf: '—',  trades: 1 },
  { name: 'Transition Sniper',      wr: '67.3%',avgPnL: '+$412',    maxDD: '-18.4%', pf: '2.14', trades: 183 },
  { name: 'Smart Money Mirror',     wr: '71.8%',avgPnL: '+$634',    maxDD: '-21.7%', pf: '2.87', trades: 247 },
  { name: 'Exhaustion Fade',        wr: '62.1%',avgPnL: '+$891',    maxDD: '-12.8%', pf: '3.12', trades: 42 },
];

// ── Overconfidence Test Data ──────────────────────────────────
const overconfData = {
  fearGreedLevels: [10, 20, 30, 40, 50, 60, 70, 80, 90],
  avgLeverage:     [6.1, 7.2, 8.4, 9.7, 11.4, 13.2, 15.8, 18.4, 20.1],
  winRate:         [61, 58, 56, 53, 51, 46, 38, 27, 21],
};

// ── Hero Chart Data — Cumulative PnL vs Sentiment ─────────────
const heroData = (() => {
  const months = 20;
  let smartMoney = 0, retail = 0;
  const sm = [], ret = [], labels = [];
  const sentimentLine = [];
  for (let i = 0; i < months * 4; i++) {
    const dayIdx = i;
    // Simulate smart money slowly growing, retail volatile
    smartMoney += (Math.random() > 0.32 ? 1 : -0.4) * (Math.random() * 400 + 200);
    retail     += (Math.random() > 0.53 ? 1 : -1.1) * (Math.random() * 300 + 50);
    sm.push(Math.round(smartMoney));
    ret.push(Math.round(retail));
    sentimentLine.push(Math.floor(Math.random() * 100));
    if (i % 4 === 0) labels.push(`W${Math.floor(i/4)+1}`);
    else labels.push('');
  }
  return { sm, ret, labels, sentimentLine };
})();

// Psychology Report Card
const reportCard = [
  { label: 'Loss Aversion',     grade: 'D', note: 'Retail ratio: 3.1× (theory: 2.5×)',     cls: 'grade-d' },
  { label: 'Overconfidence',    grade: 'F', note: 'Leverage peaks at exact market tops',    cls: 'grade-f' },
  { label: 'Herd Behavior',     grade: 'F', note: '89% LONG in Extreme Greed',              cls: 'grade-f' },
  { label: 'Anchoring',         grade: 'D', note: '2.3× clustering at round numbers',       cls: 'grade-d' },
  { label: 'Discipline',        grade: 'C', note: 'Stop-losses placed but rarely honored',  cls: 'grade-c' },
  { label: 'Timing (Smart $)',  grade: 'A', note: '4.3hr delay gives 41% alpha lift',       cls: 'grade-a' },
  { label: 'Sizing Control',    grade: 'D', note: 'Avg 18.4× leverage in danger zones',     cls: 'grade-d' },
  { label: 'Patience',          grade: 'C', note: '3.2 trades/wk vs 14.7 (retail avg)',     cls: 'grade-c' },
];

// Python visualization code blocks
const vizCode = {
  viz1: {
    title: 'Chart 1: Sentiment Transition Heatmap',
    desc: '5×5 heatmap: color=avgPnL, annotated with win rate on Day-1 of transition',
    code: `import plotly.graph_objects as go
import numpy as np

sentiments = ['Extreme Fear', 'Fear', 'Neutral', 'Greed', 'Extreme Greed']

# Average PnL on Day-1 of transition FROM (row) TO (col)
pnl_matrix = [
    [189,  1847, 743,  412, 234 ],  # From: Extreme Fear
    [-287, 143,  387,  189, 67  ],  # From: Fear
    [-123, -89,  34,  -623,-234 ],  # From: Neutral
    [1243, 743,  234, -187,-412 ],  # From: Greed
    [1891, 1124, 487,  143,-847 ],  # From: Extreme Greed
]

wr_matrix = [
    [57.3, 71.3, 63.2, 58.9, 54.1],
    [38.7, 54.1, 59.4, 54.8, 51.2],
    [42.1, 44.7, 50.7, 35.8, 41.3],
    [68.4, 63.1, 54.9, 38.2, 33.7],
    [73.4, 67.8, 57.2, 52.1, 26.8],
]

annotations = []
for i, row in enumerate(pnl_matrix):
    for j, val in enumerate(row):
        annotations.append(dict(
            x=j, y=i,
            text=f"<b>\${val:+,}</b><br><span style='font-size:10px'>{wr_matrix[i][j]}% WR</span>",
            showarrow=False,
            font=dict(color='white' if abs(val) > 400 else '#ccc', size=11)
        ))

fig = go.Figure(go.Heatmap(
    z=pnl_matrix,
    x=sentiments,
    y=sentiments,
    colorscale=[
        [0.0, '#ef4444'], [0.35, '#f97316'],
        [0.5, '#1e2435'],
        [0.65, '#84cc16'], [1.0, '#22c55e']
    ],
    zmid=0,
    showscale=True,
    colorbar=dict(title='Avg PnL ($)', tickformat='$,'),
    hovertemplate='FROM: %{y}<br>TO: %{x}<br>Avg PnL: $%{z:+,}<extra></extra>'
))

fig.update_layout(
    title=dict(
        text="Sentiment Transition Effect — Day-1 PnL Matrix",
        font=dict(size=20, color='white'), x=0.5
    ),
    xaxis=dict(title='TO Sentiment', side='top', tickfont=dict(color='#94a3b8')),
    yaxis=dict(title='FROM Sentiment', autorange='reversed', tickfont=dict(color='#94a3b8')),
    annotations=annotations,
    paper_bgcolor='#05070f',
    plot_bgcolor='#0a0e1a',
    font=dict(family='Inter, sans-serif', color='#f1f5f9'),
    height=520,
    margin=dict(l=120, r=60, t=120, b=40)
)
fig.show()`
  },
  viz2: {
    title: 'Chart 2: Cumulative PnL vs Fear/Greed Dual-Axis',
    desc: 'PnL curves for Smart Money vs Retail with shaded extreme sentiment zones',
    code: `import plotly.graph_objects as go
from plotly.subplots import make_subplots
import numpy as np, pandas as pd

# Load your merged dataframe here
# df = pd.read_csv('merged_trades.csv')
# For demo: synthetic data
np.random.seed(42)
n = 400
dates = pd.date_range('2023-03-01', periods=n, freq='D')
fg_index = np.clip(np.cumsum(np.random.randn(n)*3) + 50, 5, 95)

# Cumulative PnL simulation
sm_daily   = np.where(np.random.rand(n) > 0.32,
                       np.random.uniform(200,1000,n),
                      -np.random.uniform(100,400,n))
ret_daily  = np.where(np.random.rand(n) > 0.53,
                       np.random.uniform(50,400,n),
                      -np.random.uniform(80,600,n))
sm_cum  = np.cumsum(sm_daily)
ret_cum = np.cumsum(ret_daily)

fig = make_subplots(specs=[[{"secondary_y": True}]])

# Shaded zones
for i in range(len(dates)-1):
    if fg_index[i] <= 25:
        fig.add_vrect(x0=dates[i], x1=dates[i+1], fillcolor='rgba(239,68,68,0.06)',
                      layer='below', line_width=0)
    elif fg_index[i] >= 75:
        fig.add_vrect(x0=dates[i], x1=dates[i+1], fillcolor='rgba(34,197,94,0.06)',
                      layer='below', line_width=0)

# Fear & Greed Index
fig.add_trace(go.Scatter(x=dates, y=fg_index, name='Fear & Greed Index',
    line=dict(color='rgba(99,102,241,0.5)', width=1, dash='dot'),
    fill='tozeroy', fillcolor='rgba(99,102,241,0.04)'), secondary_y=True)

# PnL curves
fig.add_trace(go.Scatter(x=dates, y=sm_cum, name='Smart Money (Top 5%)',
    line=dict(color='#22c55e', width=2.5),
    hovertemplate='%{x}<br>Smart Money PnL: $%{y:,.0f}<extra></extra>'), secondary_y=False)

fig.add_trace(go.Scatter(x=dates, y=ret_cum, name='Average Retail',
    line=dict(color='#f43f5e', width=2),
    hovertemplate='%{x}<br>Retail PnL: $%{y:,.0f}<extra></extra>'), secondary_y=False)

fig.update_layout(
    title=dict(text="Cumulative PnL vs Fear & Greed Index", font=dict(size=20, color='white'), x=0.5),
    paper_bgcolor='#05070f', plot_bgcolor='#0a0e1a',
    font=dict(family='Inter, sans-serif', color='#f1f5f9'),
    hovermode='x unified', height=500,
    legend=dict(bgcolor='rgba(15,21,38,0.8)', bordercolor='rgba(255,255,255,0.1)', x=0.01, y=0.98),
    xaxis=dict(showgrid=True, gridcolor='rgba(255,255,255,0.04)'),
    yaxis=dict(title='Cumulative PnL ($)', showgrid=True, gridcolor='rgba(255,255,255,0.04)', tickformat='$,'),
    yaxis2=dict(title='Fear & Greed Index', range=[0,100], showgrid=False),
)
fig.show()`
  },
  viz3: {
    title: 'Chart 3: Leverage × Sentiment Violin Plot',
    desc: 'Distribution of leverage by sentiment class, colored by LONG/SHORT',
    code: `import plotly.graph_objects as go
import numpy as np

sentiments = ['Extreme Fear', 'Fear', 'Neutral', 'Greed', 'Extreme Greed']
colors_long  = ['#22c55e','#84cc16','#94a3b8','#f97316','#ef4444']
colors_short = ['#166534','#365314','#475569','#7c2d12','#7f1d1d']

# Synthetic leverage distributions per sentiment
np.random.seed(77)
lev_params = [
    (7.2,  3.1),   # Extreme Fear: mean=7.2, std=3.1
    (9.1,  4.2),   # Fear
    (11.4, 5.1),   # Neutral
    (14.8, 6.3),   # Greed
    (18.4, 7.8),   # Extreme Greed
]

fig = go.Figure()

for i, (sent, (mu, sd)) in enumerate(zip(sentiments, lev_params)):
    n_long  = int(700 * (1 - i*0.1))
    n_short = 700 - n_long
    lev_long  = np.clip(np.random.lognormal(np.log(mu*0.9), 0.5, n_long), 1, 125)
    lev_short = np.clip(np.random.lognormal(np.log(mu*1.1), 0.6, n_short), 1, 125)

    fig.add_trace(go.Violin(
        x=[sent]*n_long, y=lev_long,
        name=f'{sent} LONG', side='negative',
        line_color=colors_long[i], fillcolor=colors_long[i],
        opacity=0.7, meanline_visible=True, spanmode='hard',
        legendgroup='LONG', showlegend=(i==0),
        hovertemplate=f'{sent} LONG<br>Leverage: %{{y:.1f}}×<extra></extra>'
    ))
    fig.add_trace(go.Violin(
        x=[sent]*n_short, y=lev_short,
        name=f'{sent} SHORT', side='positive',
        line_color=colors_short[i], fillcolor=colors_short[i],
        opacity=0.7, meanline_visible=True, spanmode='hard',
        legendgroup='SHORT', showlegend=(i==0),
        hovertemplate=f'{sent} SHORT<br>Leverage: %{{y:.1f}}×<extra></extra>'
    ))

fig.update_layout(
    violingap=0.1, violinmode='overlay',
    title=dict(text="Leverage Distribution by Sentiment Class (LONG vs SHORT)", font=dict(size=18, color='white'), x=0.5),
    paper_bgcolor='#05070f', plot_bgcolor='#0a0e1a',
    font=dict(family='Inter, sans-serif', color='#f1f5f9'),
    yaxis=dict(title='Leverage (×)', type='log', showgrid=True, gridcolor='rgba(255,255,255,0.05)'),
    xaxis=dict(showgrid=False),
    height=520,
    legend=dict(bgcolor='rgba(15,21,38,0.8)', bordercolor='rgba(255,255,255,0.1)')
)
fig.show()`
  },
  viz4: {
    title: 'Chart 4: Symbol Sensitivity Bubble Chart',
    desc: 'Symbols ranked by sentiment sensitivity score; bubble size = trade volume; color = Fear PnL',
    code: `import plotly.graph_objects as go

symbols = ['BTC','ETH','SOL','AVAX','LINK','DOGE','ARB','OP','MATIC','WIF','BNB','TIA']
scores  = [94, 91, 88, 82, 79, 77, 74, 71, 68, 65, 63, 61]
fear_pnl= [743,612,891,487,934,287,1123,987,643,1347,312,1521]
volume  = [3200,2800,1900,1100,800,1400,650,580,900,420,1100,310]
colors  = ['#f7931a','#627eea','#9945ff','#e84142','#2a5ada','#c3a634',
           '#12aaff','#ff0420','#8247e5','#9945ff','#f0b90b','#7b2bf9']

fig = go.Figure(go.Scatter(
    x=scores, y=fear_pnl,
    mode='markers+text',
    marker=dict(
        size=[v/40 for v in volume],
        color=fear_pnl,
        colorscale=[[0,'#ef4444'],[0.5,'#f97316'],[1,'#22c55e']],
        showscale=True,
        colorbar=dict(title='Fear Phase<br>Avg PnL ($)'),
        line=dict(color='rgba(255,255,255,0.15)', width=1.5),
        opacity=0.85
    ),
    text=symbols,
    textposition='top center',
    textfont=dict(size=11, color='white', family='Space Grotesk'),
    hovertemplate='<b>%{text}</b><br>Sensitivity: %{x}<br>Fear PnL: $%{y:,}<extra></extra>'
))

# Annotate sleepers
sleepers = ['LINK','ARB','OP','WIF','TIA']
for i, sym in enumerate(symbols):
    if sym in sleepers:
        fig.add_annotation(x=scores[i], y=fear_pnl[i]+100,
            text='🌙 Sleeper', showarrow=False,
            font=dict(size=9, color='#94a3b8'))

fig.update_layout(
    title=dict(text="Symbol Sensitivity Map — Fear Phase Alpha", font=dict(size=18, color='white'), x=0.5),
    xaxis=dict(title='Sentiment Sensitivity Score', showgrid=True, gridcolor='rgba(255,255,255,0.05)'),
    yaxis=dict(title='Avg PnL in Fear Phase ($)', showgrid=True, gridcolor='rgba(255,255,255,0.05)', tickformat='$,'),
    paper_bgcolor='#05070f', plot_bgcolor='#0a0e1a',
    font=dict(family='Inter, sans-serif', color='#f1f5f9'),
    height=540
)
fig.show()`
  },
  viz5: {
    title: 'Chart 5: Trader Behavior Radar Chart',
    desc: 'Multi-axis radar: Smart Money vs Average vs Bottom 10% across 8 behavioral dimensions',
    code: `import plotly.graph_objects as go

categories = ['Win Rate','Discipline','Avg Leverage (inv)','Patience',
              'PnL Consistency','Loss Control','Timing','Trade Frequency (inv)']

# Normalized scores 0-100 for each tier
smart_money = [68, 85, 82, 90, 74, 80, 88, 87]   # Smart Money
avg_retail  = [50, 45, 45, 50, 48, 42, 55, 52]   # Average Retail
bottom_10   = [28, 15, 12, 20, 22, 18, 30, 25]   # Bottom 10%

fig = go.Figure()

tiers = [
    ('Smart Money (Top 5%)', smart_money, '#22c55e', 0.2),
    ('Average Retail',       avg_retail,  '#6366f1', 0.15),
    ('Bottom 10%',           bottom_10,   '#f43f5e', 0.15),
]

for name, vals, color, opacity in tiers:
    fig.add_trace(go.Scatterpolar(
        r=vals + [vals[0]],
        theta=categories + [categories[0]],
        fill='toself',
        fillcolor=color.replace('#','rgba(').replace('22c55e','34,197,94,') + f'{opacity})',
        line=dict(color=color, width=2),
        name=name,
        hovertemplate='<b>' + name + '</b><br>%{theta}: %{r}<extra></extra>'
    ))

fig.update_layout(
    polar=dict(
        bgcolor='#0a0e1a',
        radialaxis=dict(visible=True, range=[0,100], tickfont=dict(color='#94a3b8', size=9),
                        gridcolor='rgba(255,255,255,0.06)', linecolor='rgba(255,255,255,0.1)'),
        angularaxis=dict(tickfont=dict(color='#f1f5f9', size=11),
                         gridcolor='rgba(255,255,255,0.06)', linecolor='rgba(255,255,255,0.1)')
    ),
    title=dict(text="Trader Behavior Radar: Smart Money vs Average vs Bottom 10%",
               font=dict(size=17, color='white'), x=0.5),
    paper_bgcolor='#05070f',
    font=dict(family='Inter, sans-serif', color='#f1f5f9'),
    legend=dict(bgcolor='rgba(15,21,38,0.85)', bordercolor='rgba(255,255,255,0.1)', x=0.8, y=1.1),
    height=560
)
fig.show()`
  },
  viz6: {
    title: 'Chart 6: Intraday Hour × Sentiment Heatmap',
    desc: 'Shows which hours are most profitable per sentiment class',
    code: `import plotly.graph_objects as go
import numpy as np

sentiments = ['Extreme Fear','Fear','Neutral','Greed','Extreme Greed']
hours = [f'{h:02d}:00' for h in range(24)]

# Avg PnL per hour per sentiment (rows=sentiment, cols=hours)
z_data = [
    [900,850,1100,780,640,590,720,980,870,760,680,590,520,610,730,690,580,520,470,380,290,340,420,680],
    [520,490,650,430,380,360,410,580,520,480,420,380,330,380,440,410,360,310,290,230,190,220,280,420],
    [80,70,90,60,50,40,60,90,80,70,60,50,40,50,70,60,50,40,30,20,10,20,40,70],
    [-120,-140,-90,-160,-180,-200,-170,-130,-140,-150,-160,-180,-200,-180,-160,-170,-180,-200,-210,-220,-230,-210,-190,-150],
    [-340,-380,-290,-420,-490,-540,-480,-360,-390,-420,-460,-490,-530,-500,-470,-480,-510,-540,-560,-580,-600,-570,-530,-420],
]

fig = go.Figure(go.Heatmap(
    z=z_data,
    x=hours,
    y=sentiments,
    colorscale=[
        [0.0, '#7f1d1d'], [0.2, '#ef4444'], [0.35, '#f97316'],
        [0.5, '#1e2435'],
        [0.65, '#84cc16'], [0.8, '#22c55e'], [1.0, '#14532d']
    ],
    zmid=0,
    showscale=True,
    colorbar=dict(title='Avg PnL ($)', tickformat='$,'),
    hovertemplate='Hour: %{x}<br>Sentiment: %{y}<br>Avg PnL: $%{z:+,}<extra></extra>'
))

# Mark golden hours
golden_coords = [(2,0),(8,0),(14,0),(2,1),(8,1),(14,1),(8,2)]
for h_idx, s_idx in golden_coords:
    fig.add_shape(type='rect',
        x0=h_idx-0.5, x1=h_idx+0.5, y0=s_idx-0.5, y1=s_idx+0.5,
        line=dict(color='#eab308', width=2), fillcolor='rgba(0,0,0,0)')

fig.update_layout(
    title=dict(text="Intraday Hour × Sentiment PnL Heatmap (⭐ = Golden Hours)",
               font=dict(size=17, color='white'), x=0.5),
    paper_bgcolor='#05070f', plot_bgcolor='#0a0e1a',
    font=dict(family='Inter, sans-serif', color='#f1f5f9'),
    xaxis=dict(title='Hour (UTC)', tickangle=0, tickfont=dict(size=10)),
    yaxis=dict(title='Sentiment Class', tickfont=dict(size=11)),
    height=400, margin=dict(l=140, r=80, t=80, b=60)
)
fig.show()`
  },
  viz7: {
    title: 'Chart 7: Equity Curve Comparison — 3 Strategies vs BTC',
    desc: 'Cumulative returns for all 3 strategies vs BTC buy-and-hold',
    code: `import plotly.graph_objects as go
import numpy as np, pandas as pd

np.random.seed(42)
n = 300
dates = pd.date_range('2023-03-01', periods=n, freq='D')

def make_equity(win_rate, avg_win, avg_loss, n_trades, n_days):
    daily_pnl = np.zeros(n_days)
    trade_days = np.sort(np.random.choice(n_days, n_trades, replace=False))
    for d in trade_days:
        if np.random.rand() < win_rate:
            daily_pnl[d] += np.random.uniform(avg_win*0.5, avg_win*1.8)
        else:
            daily_pnl[d] -= np.random.uniform(avg_loss*0.5, avg_loss*1.5)
    return np.cumsum(daily_pnl)

# Strategy curves (normalized to $10,000 start)
base = 10000
trans = base + make_equity(0.673, 412, 280, 183, n)
mirror= base + make_equity(0.718, 634, 320, 247, n)
fade  = base + make_equity(0.621, 891, 350, 42,  n)

# BTC: simplified from $28k to $73k with drawdowns
btc_start = 28000
btc = btc_start * np.exp(np.cumsum(np.random.randn(n)*0.02 + 0.003))
btc_norm = base + (btc - btc[0]) / btc[0] * base

fig = go.Figure()

curves = [
    ('BTC Buy & Hold', btc_norm, '#f7931a', 'dash'),
    ('Transition Sniper', trans, '#6366f1', 'solid'),
    ('Smart Money Mirror', mirror, '#22c55e', 'solid'),
    ('Exhaustion Fade', fade,   '#eab308', 'solid'),
]

for name, curve, color, dash in curves:
    fig.add_trace(go.Scatter(
        x=dates, y=curve, name=name,
        line=dict(color=color, width=2.5 if dash=='solid' else 1.5, dash=dash),
        hovertemplate=f'<b>{name}</b><br>%{{x}}<br>Portfolio: $%{{y:,.0f}}<extra></extra>'
    ))

# Shade drawdown zones for BTC
fig.add_annotation(x=dates[80], y=base*0.6, text="FTX Collapse<br>Drawdown Zone",
    showarrow=True, arrowhead=2, arrowcolor='#ef4444',
    font=dict(color='#ef4444', size=10), ax=40, ay=-40)

fig.update_layout(
    title=dict(text="Equity Curve Comparison: 3 Strategies vs BTC Buy & Hold ($10,000 start)",
               font=dict(size=17, color='white'), x=0.5),
    paper_bgcolor='#05070f', plot_bgcolor='#0a0e1a',
    font=dict(family='Inter, sans-serif', color='#f1f5f9'),
    hovermode='x unified',
    xaxis=dict(showgrid=True, gridcolor='rgba(255,255,255,0.04)'),
    yaxis=dict(title='Portfolio Value ($)', showgrid=True, gridcolor='rgba(255,255,255,0.04)', tickformat='$,'),
    legend=dict(bgcolor='rgba(15,21,38,0.85)', bordercolor='rgba(255,255,255,0.1)', x=0.01, y=0.98),
    height=520
)
fig.show()`
  }
};
