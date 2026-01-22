//Genera un ID univoco di 8 caratteri alfanumerici.
export const generateUniqueId = () => {
    return Math.random().toString(36).slice(2, 11);
};

//Genera la data corrente
export const generateProductMeta = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return {
        id: generateUniqueId(),
        createdAt: `${year}-${month}-${day}`
    };
};
