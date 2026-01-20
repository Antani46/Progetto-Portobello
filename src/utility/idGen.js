//Genera un ID univoco di 8 caratteri alfanumerici.
export const generateUniqueId = () => {
    return Math.random().toString(36).slice(2, 11);
};
