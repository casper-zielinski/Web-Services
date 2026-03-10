'use strict';

/**
 * Escapes input strings to prevent XSS attacks.
 * @param {string} str - The input string to escape.
 * @returns {string} - The escaped string.
 */
const htmlEntities = (str) => {
  if (typeof str !== 'string') return ''; // Ensure valid string input
  return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
};

/**
 * Generates a shuffled array of colors.
 * Uses the Fisher-Yates shuffle algorithm for better randomness.
 * @returns {string[]} - A new shuffled array of colors.
 */
const getShuffledColors = () => {
  const colors = ['red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange'];
  for (let i = colors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colors[i], colors[j]] = [colors[j], colors[i]];
  }
  return colors;
};

// Exporting utility functions
module.exports = {
  htmlEntities,
  getShuffledColors
};
