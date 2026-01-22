//Genera un ID univoco di 8 caratteri alfanumerici e la data corrente.
export const generateUniqueId = () => {
    return Math.random().toString(36).slice(2, 11);
};

export const generateProductMeta = () => {
    return {
        id: generateUniqueId(),
        createdAt: new Date().toISOString()
    };
};
