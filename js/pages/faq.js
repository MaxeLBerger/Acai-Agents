'use strict';

/**
 * FAQ page accordion functionality
 * Handles expanding/collapsing FAQ items within each accordion group
 */
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items in the same accordion
      const accordion = item.closest('.faq-accordion');
      accordion.querySelectorAll('.faq-item').forEach((otherItem) => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
});
