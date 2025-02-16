import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [
        { id: 1, name: "Stainless Steel 304 Pipe", material: "Stainless Steel", unitLength: "6-12 meter", shape: "Round", price: 350 },
        { id: 2, name: "Carbon Steel A105 Tubing", material: "Carbon Steel", unitLength: "6-12 meter", shape: "Round", price: 320 },
        { id: 3, name: "Duplex Steel 2205 Flanges", material: "Duplex Steel", unitLength: "6-12 meter", shape: "Round", price: 450 },
        { id: 4, name: "Hastelloy C22 Valves", material: "Hastelloy", unitLength: "6-12 meter", shape: "Round", price: 500 },
        { id: 5, name: "Incoloy 800 Gasket", material: "Incoloy", unitLength: "6-12 meter", shape: "Round", price: 550 }
    ],
    filteredProducts: [
        { id: 1, name: "Stainless Steel 304 Pipe", material: "Stainless Steel", unitLength: "6-12 meter", shape: "Round", price: 350 },
        { id: 2, name: "Carbon Steel A105 Tubing", material: "Carbon Steel", unitLength: "6-12 meter", shape: "Round", price: 320 },
        { id: 3, name: "Duplex Steel 2205 Flanges", material: "Duplex Steel", unitLength: "6-12 meter", shape: "Round", price: 450 },
        { id: 4, name: "Hastelloy C22 Valves", material: "Hastelloy", unitLength: "6-12 meter", shape: "Round", price: 500 },
        { id: 5, name: "Incoloy 800 Gasket", material: "Incoloy", unitLength: "6-12 meter", shape: "Round", price: 550 }
    ],
    selectedMaterial: "",
    searchTerm: "", 
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
            state.filteredProducts = action.payload;
        },
        addProduct: (state, action) => {
            state.products.push(action.payload);
            state.filteredProducts.push(action.payload);
        },
        setSelectedMaterial: (state, action) => {
            state.selectedMaterial = action.payload.material; 
        },
        setSearchTerm: (state, action) => { 
            state.searchTerm = action.payload;
        },
        applyFilters: (state) => {
            state.filteredProducts = state.products.filter((product) => {
                const matchesMaterial = state.selectedMaterial === "" || product.material === state.selectedMaterial;
                const matchesSearch = state.searchTerm === "" || product.name.toLowerCase().includes(state.searchTerm.toLowerCase());
                return matchesMaterial && matchesSearch;
            });
        },
        updateProduct: (state, action) => {
            const updatedProduct = action.payload;
            const index = state.products.findIndex(product => product.id === updatedProduct.id);
            if (index !== -1) {
                state.products[index] = updatedProduct;
                state.filteredProducts = [...state.products];
            }
        },
    },
});

export const {
    setProducts,
    addProduct,
    setSelectedMaterial,
    setSearchTerm, 
    applyFilters,
    updateProduct,
} = productSlice.actions;

export default productSlice.reducer;
