/**
 * Genera un ID univoco di 8 caratteri alfanumerici.
 * Combina Math.random e Date.now per unicità.
 * @returns {string} ID univoco (es. "a7fb921z")
 */
export const generateUniqueId = () => {
    return Math.random().toString(36).slice(2, 11);
};
