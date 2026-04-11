'use strict';

/**
 * Portfolio page filter functionality
 * Handles filtering portfolio cards by category (all, website, ai-agent)
 */
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card-new');

  if (!filterBtns.length || !portfolioCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      // Update active state
      filterBtns.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.dataset.filter;

      // Filter cards
      portfolioCards.forEach((card) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
});
