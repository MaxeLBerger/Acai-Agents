'use strict';

/**
 * Pricing page functionality
 * Handles pricing toggle between monthly/one-time plans and FAQ accordion
 */
document.addEventListener('DOMContentLoaded', () => {
  // Pricing Toggle Functionality
  const toggle = document.getElementById('pricing-toggle');
  const monthlyLabel = document.getElementById('monthly-label');
  const onetimeLabel = document.getElementById('onetime-label');
  const monthlyPanel = document.getElementById('monthly-panel');
  const onetimePanel = document.getElementById('onetime-panel');

  if (!toggle || !monthlyLabel || !onetimeLabel || !monthlyPanel || !onetimePanel) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('one-time');

    if (toggle.classList.contains('one-time')) {
      monthlyLabel.classList.remove('active');
      onetimeLabel.classList.add('active');
      monthlyPanel.classList.remove('active');
      onetimePanel.classList.add('active');
    } else {
      monthlyLabel.classList.add('active');
      onetimeLabel.classList.remove('active');
      monthlyPanel.classList.add('active');
      onetimePanel.classList.remove('active');
    }
  });

  // FAQ Accordion Functionality
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach((otherItem) => {
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
