import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

// createEntityAdapter simplifies an items collection management
const productsAdapter = createEntityAdapter({
  // Assume a `id` field is the unique identifier
  selectId: (product) => product.id,
  // Keep the "all IDs" array sorted based on product name
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

// Thunks for async operations
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await apiClient.get('/products');
  return response.data;
});

export const addNewProduct = createAsyncThunk('products/addNewProduct', async (initialProduct) => {
  const response = await apiClient.post('/products', initialProduct);
  return response.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (initialProduct) => {
    const { id } = initialProduct;
    const response = await apiClient.patch(`/products/${id}`, initialProduct);
    return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
  await apiClient.delete(`/products/${productId}`);
  return productId;
});


const productsSlice = createSlice({
  name: 'products',
  initialState: productsAdapter.getInitialState({
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        productsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add New Product
      .addCase(addNewProduct.fulfilled, productsAdapter.addOne)
      // Update Product
      .addCase(updateProduct.fulfilled, productsAdapter.upsertOne)
      // Delete Product
      .addCase(deleteProduct.fulfilled, productsAdapter.removeOne);
  },
});

export default productsSlice.reducer;

// Export the customized selectors for this adapter
export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors((state) => state.products);

export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
