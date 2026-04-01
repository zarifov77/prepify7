// SAT Score Predictor — based on College Board raw-to-scaled scoring model
export function predictSATScore(mathCorrect, ebwCorrect, mathTotal = 10, ebwTotal = 10) {
  const mathPct = mathCorrect / mathTotal
  const ebwPct = ebwCorrect / ebwTotal

  // Approximate scaling curve
  const mathScaled = Math.min(800, Math.max(200, Math.round(200 + mathPct * 600)))
  const ebwScaled = Math.min(800, Math.max(200, Math.round(200 + ebwPct * 600)))
  const total = mathScaled + ebwScaled

  return {
    math: mathScaled,
    ebrw: ebwScaled,
    total,
    range: [Math.max(400, total - 50), Math.min(1600, total + 50)],
    percentile: getPercentile(total),
  }
}

function getPercentile(score) {
  if (score >= 1550) return 99
  if (score >= 1500) return 98
  if (score >= 1450) return 96
  if (score >= 1400) return 94
  if (score >= 1350) return 91
  if (score >= 1300) return 87
  if (score >= 1250) return 82
  if (score >= 1200) return 74
  if (score >= 1150) return 67
  if (score >= 1100) return 58
  if (score >= 1050) return 49
  if (score >= 1000) return 40
  return 30
}

export function getBandLabel(band) {
  if (band >= 8.5) return 'Expert'
  if (band >= 7.5) return 'Very Good'
  if (band >= 6.5) return 'Good'
  if (band >= 5.5) return 'Competent'
  if (band >= 4.5) return 'Modest'
  return 'Limited'
}