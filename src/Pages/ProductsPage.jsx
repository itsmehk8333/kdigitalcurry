import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button, Box, TextField, MenuItem, Select, FormControl, InputLabel, Typography } from "@mui/material";
import AddProductModal from "../Components/AddProductModel";
import { updateProduct, applyFilters, setSelectedMaterial, setSearchTerm } from "../ReduxToolkit/productSlice"; // ✅ Updated imports

const ProductsPage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const filteredProducts = useSelector((state) => state.products.filteredProducts); // ✅ Ensure using filtered products
    const [searchTerm, setSearchTermState] = useState("");
    const [visible, setVisible] = useState(false);
    const [filterMaterial, setFilterMaterial] = useState("");
    const [filterProduct, setFilterProduct] = useState("");
    const [editingProductId, setEditingProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchTermState(event.target.value);
    };

    // Handle filter changes
    const handleFilterMaterialChange = (event) => {
        setFilterMaterial(event.target.value);
    };

    const handleFilterProductChange = (event) => {
        setFilterProduct(event.target.value);
    };

    // Apply filters
    const applyFiltersHandler = () => {
        dispatch(setSelectedMaterial({ material: filterMaterial, product: filterProduct })); // ✅ Send both filters
        dispatch(applyFilters());
    };

    // Apply search functionality
    const applySearch = () => {
        dispatch(setSearchTerm(searchTerm)); // ✅ Dispatch action to update search term in Redux
    };

    const handleQuickEdit = (product) => {
        setEditingProductId(product.id);
        setEditedProduct(product);
    };

    const handleEditChange = (e) => {
        setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        dispatch(updateProduct(editedProduct));
        setEditingProductId(null);
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: "#f0f4f8" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <Button variant="contained" color="primary" onClick={() => setVisible(true)} sx={{ borderRadius: 5, padding: "10px 20px" }}>+ Add Products</Button>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>280/400 Products</Typography>
            </Box>
            
            {/* Search Input */}
            <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
                <TextField
                    label="Search Products..."
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ flex: 1 }}
                />
                <Button variant="contained" color="primary" onClick={applySearch}>Search</Button>
            </Box>

            {/* Filters */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}>
                <FormControl sx={{ width: "20%" }} size="small">
                    <InputLabel>Materials</InputLabel>
                    <Select value={filterMaterial} onChange={handleFilterMaterialChange} label="Materials">
                        <MenuItem value="">All</MenuItem>
                        {[...new Set(products.map(product => product.material))].map((material) => (
                            <MenuItem key={material} value={material}>{material}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ width: "20%" }} size="small">
                    <InputLabel>Products</InputLabel>
                    <Select value={filterProduct} onChange={handleFilterProductChange} label="Products">
                        <MenuItem value="">All</MenuItem>
                        {[...new Set(products.map(product => product.name))].map((name) => (
                            <MenuItem key={name} value={name}>{name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={applyFiltersHandler}>Filter</Button>
            </Box>

            {/* Table */}
            <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#d6e4ff" }}>
                            <TableCell sx={{ padding: 2 }}>
                                <Checkbox />
                            </TableCell>
                            <TableCell sx={{ padding: 2, fontWeight: "bold" }}>Products</TableCell>
                            <TableCell sx={{ padding: 2, fontWeight: "bold" }}>Action</TableCell>
                            <TableCell sx={{ padding: 2, fontWeight: "bold" }}>Product Details</TableCell>
                            <TableCell sx={{ padding: 2, fontWeight: "bold" }}>Price in Unit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.map((product) => ( // ✅ Use filteredProducts for search & filter results
                            <React.Fragment key={product.id}>
                                <TableRow sx={{ "&:nth-of-type(even)": { backgroundColor: "#fafafa" } }}>
                                    <TableCell sx={{ padding: 2 }}>
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell sx={{ padding: 2 }}>
                                        {product.name}
                                    </TableCell>
                                    <TableCell sx={{ padding: 2 }}>
                                        <Button size="small" onClick={() => handleQuickEdit(product)}>Quick Edit</Button> | 
                                        <Button size="small">Add Product Details</Button>
                                    </TableCell>
                                    <TableCell sx={{ padding: 2 }}>
                                        Material: {product.material} <br />
                                        Unit Length: {product.unitLength} <br />
                                        Shape: {product.shape}
                                    </TableCell>
                                    <TableCell sx={{ padding: 2 }}>{product.price} / KG</TableCell>
                                </TableRow>
                                {editingProductId === product.id && (
                                    <TableRow>
                                        <TableCell colSpan={5} sx={{ backgroundColor: "#f0f8ff", padding: 3 }}>
                                            <TextField label="Title" name="name" value={editedProduct.name} onChange={handleEditChange} fullWidth sx={{ mb: 2 }} />
                                            <TextField label="Price" name="price" value={editedProduct.price} onChange={handleEditChange} fullWidth sx={{ mb: 2 }} />
                                            <TextField label="Material" name="material" value={editedProduct.material} onChange={handleEditChange} fullWidth sx={{ mb: 2 }} />
                                            <TextField label="Shape" name="shape" value={editedProduct.shape} onChange={handleEditChange} fullWidth sx={{ mb: 2 }} />
                                            <Box sx={{ display: "flex", gap: 2 }}>
                                                <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
                                                <Button variant="outlined" color="secondary" onClick={() => setEditingProductId(null)}>Cancel</Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddProductModal {...{ visible, onClose: () => setVisible(false) }} />
        </Box>
    );
};

export default ProductsPage;
