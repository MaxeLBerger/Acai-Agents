'use strict';

/**
 * ROI Calculator Logic for AI Agents page
 * Calculates estimated time savings, cost savings, and ROI based on user inputs
 */
document.addEventListener('DOMContentLoaded', () => {
  const hoursSlider = document.getElementById('hours-slider');
  const costSlider = document.getElementById('cost-slider');
  const hoursValue = document.getElementById('hours-value');
  const costValue = document.getElementById('cost-value');
  const timeSaved = document.getElementById('time-saved');
  const costSavings = document.getElementById('cost-savings');
  const annualSavings = document.getElementById('annual-savings');
  const roiPercent = document.getElementById('roi-percent');

  if (
    !hoursSlider ||
    !costSlider ||
    !hoursValue ||
    !costValue ||
    !timeSaved ||
    !costSavings ||
    !annualSavings ||
    !roiPercent
  )
    return;

  /**
   * Calculate and display ROI based on slider values
   */
  function calculateROI() {
    const hours = parseInt(hoursSlider.value, 10);
    const cost = parseInt(costSlider.value, 10);

    // Assume 80% automation rate and 4.33 weeks per month
    const automationRate = 0.8;
    const weeksPerMonth = 4.33;
    const avgAgentCost = 200; // Average monthly agent cost

    const monthlyHoursSaved = Math.round(hours * weeksPerMonth * automationRate);
    const monthlySavings = Math.round(monthlyHoursSaved * cost);
    const yearlySavings = monthlySavings * 12;
    const yearlyAgentCost = avgAgentCost * 12;
    const roi = Math.round(((yearlySavings - yearlyAgentCost) / yearlyAgentCost) * 100);

    hoursValue.textContent = `${hours} hours`;
    costValue.textContent = `€${cost}/hour`;
    timeSaved.textContent = `${monthlyHoursSaved} hours`;
    costSavings.textContent = `€${monthlySavings.toLocaleString()}`;
    annualSavings.textContent = `€${yearlySavings.toLocaleString()}`;
    roiPercent.textContent = `${roi}%`;
  }

  hoursSlider.addEventListener('input', calculateROI);
  costSlider.addEventListener('input', calculateROI);

  // Initial calculation
  calculateROI();
});
