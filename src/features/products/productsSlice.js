import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

/**
 * Thunk asincrono per il recupero della lista prodotti.
 * Gestisce il caricamento e gli errori di rete.
 */
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/products');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Errore durante il caricamento dei prodotti.');
        }
    }
);

/**
 * Thunk asincrono per l'eliminazione di un prodotto.
 * Implementa una logica di riordino automatico degli ID per mantenere la sequenzialità:
 * 1. Elimina il prodotto target.
 * 2. Recupera la lista aggiornata e la ordina.
 * 3. Identifica i prodotti successivi e decrementa il loro ID di 1.
 * 4. Introduce un ritardo controllato per stabilità del server.
 */
export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (idToDelete, { rejectWithValue }) => {
        try {
            // 1. Eliminazione del prodotto selezionato
            await apiClient.delete(`/products/${idToDelete}`);

            // 2. Recupero e ordinamento della lista prodotti rimanente
            const response = await apiClient.get('/products');
            const allProducts = response.data.sort((a, b) => Number(a.id) - Number(b.id));

            // 3. Filtraggio dei prodotti che necessitano di aggiornamento ID
            const productsToShift = allProducts.filter(p => Number(p.id) > Number(idToDelete));

            // Esecuzione sequenziale del riordino
            for (const product of productsToShift) {
                const currentId = Number(product.id);
                const newId = currentId - 1;

                // A. Rimozione del record con ID obsoleto
                await apiClient.delete(`/products/${currentId}`);

                // B. Creazione del record con ID aggiornato
                const productToFix = { ...product, id: newId };
                await apiClient.post('/products', productToFix);

                // C. Breve pausa per prevenire sovraccarico del server locale
                await new Promise(resolve => setTimeout(resolve, 50));
            }

            // 4. Restituzione della lista definitiva aggiornata
            const finalResponse = await apiClient.get('/products');
            return { id: idToDelete, products: finalResponse.data };

        } catch (error) {
            return rejectWithValue(error.response?.data || 'Errore durante la cancellazione e il riordino.');
        }
    }
);

/**
 * Thunk asincrono per l'aggiunta di un nuovo prodotto.
 */
export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (newProduct, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/products', newProduct);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Errore durante il salvataggio del prodotto.');
        }
    }
);


const initialState = {
    items: [],
    filteredItems: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    // Stato per la paginazione e filtri
    currentPage: 1,
    itemsPerPage: 12,
    searchTerm: '',
    selectedCategory: 'Tutte',
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
            state.currentPage = 1; // Resetta alla prima pagina alla nuova ricerca
        },
        setCategory: (state, action) => {
            state.selectedCategory = action.payload;
            state.currentPage = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            // Gestione Fetch
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Gestione Delete
            .addCase(deleteProduct.fulfilled, (state, action) => {
                if (action.payload.products) {
                    state.items = action.payload.products;
                } else {
                    // Fallback per aggiornamento locale ottimistico
                    state.items = state.items.filter(item => item.id !== action.payload.id);
                }
            })
            // Gestione Add
            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            });
    },
});

export const { setPage, setSearchTerm, setCategory } = productsSlice.actions;

/**
 * Selettore memoizzato (simulato) per filtrare e impaginare i prodotti.
 * Combina logica di ricerca testuale, filtro categoria e paginazione.
 */
/**
 * Selettore memoizzato per filtrare e impaginare i prodotti.
 * Utilizza createSelector per evitare ricalcoli inutili se stato non cambia.
 */
export const selectPaginatedProducts = createSelector(
    [
        (state) => state.products.items,
        (state) => state.products.searchTerm,
        (state) => state.products.selectedCategory,
        (state) => state.products.currentPage,
        (state) => state.products.itemsPerPage
    ],
    (items, searchTerm, selectedCategory, currentPage, itemsPerPage) => {
        // 1. Applicazione Filtri
        let result = items;

        if (selectedCategory !== 'Tutte') {
            result = result.filter(item => item.category === selectedCategory);
        }

        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(item =>
                item.name.toLowerCase().includes(lowerTerm) ||
                item.description.toLowerCase().includes(lowerTerm)
            );
        }

        // 2. Calcolo Paginazione
        const totalItems = result.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedItems = result.slice(startIndex, startIndex + itemsPerPage);

        return {
            items: paginatedItems,
            totalPages,
            totalItems
        };
    }
);

export default productsSlice.reducer;
