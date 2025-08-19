import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// aysnc thunk to fetch prod ut by collection and optional filter
export const fetchProductByFilter = createAsyncThunk(
    "products/fetchByFilters",
    async ({
        collection,
        size,
        color,
        gender,
        minPrice,
        maxPrice,
        sortBy,
        search,
        category,
        material,
        brand,
        limit,
    }) => {
        const query = new URLSearchParams();
        if (collection) query.append("collection", collection);
        if (color) query.append("color", color);
        if (size) query.append("size", size);
        if (gender) query.append("gender", gender);
        if (minPrice) query.append("minPrice", minPrice);
        if (maxPrice) query.append("maxPrice", maxPrice);
        if (sortBy) query.append("sortBy", sortBy);
        if (search) query.append("search", search);
        if (category) query.append("category", category);
        if (material) query.append("material", material);
        if (brand) query.append("brand", brand);
        if (limit) query.append("limit", limit);

        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
        );
        return response.data;
    }
);

// async thunk for a single Product by id
export const fetchProductById = createAsyncThunk(
    "products/fetchById",
    async (id) => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
        );
        return response.data;
    }
);

// async thunk for fetch update Product by admin
export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async ({ id, productData }) => {
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
            productData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        return response.data;
    }
);

// async thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
  "product/fetchSimilarProducts",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}` // Fixed typo
      );
    //   console.log("fetchSimilarProducts Response:", response.data); // Debug API response
      return response.data;
    } catch (error) {
    //   console.error("fetchSimilarProducts Error:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

//product slice

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        selectedProduct: null,
        similarProduct: [],
        loading: false,
        error: null,
        filters: {
            category: "",
            size: "",
            color: "",
            gender: "",
            maxPrice: "",
            minPrice: "",
            brand: "",
            sortBy: "",
            search: "",
            material: "",
            collection: "",
        },
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = {
                category: "",
                size: "",
                color: "",
                gender: "",
                maxPrice: "",
                minPrice: "",
                brand: "",
                sortBy: "",
                search: "",
                material: "",
                collection: "",
            };
        },
    },
    extraReducers: (builder) => {
        builder

            //handel fetching products with filter
            .addCase(fetchProductByFilter.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductByFilter.fulfilled, (state, action) => {
                state.loading = false;
                state.products = Array.isArray(action.payload)
                    ? action.payload
                    : [];
            })
            .addCase(fetchProductByFilter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


            //handel fetching single product details
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


            //handel updating product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const updatedProduct = action.payload;
                const index = state.products.findIndex(
                    (product) => product._id === updatedProduct._id
                );
                if (index !== -1) {
                    state.products[index] = updatedProduct;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


            //fetching similar Products
            .addCase(fetchSimilarProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.similarProduct  = action.payload;
            })
            .addCase(fetchSimilarProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
