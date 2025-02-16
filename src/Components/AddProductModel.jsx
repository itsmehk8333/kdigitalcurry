import React, { useState, useEffect } from 'react';
import { Modal, Button, Box, Typography, List, ListItem, ListItemText, ListItemButton, Checkbox } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addProduct } from '../ReduxToolkit/productSlice';

const gradeData = [
    { product: 'Pipes', material: 'Aluminium', grades: ['Aluminium F11 Pipes', 'Aluminium F22 Pipes', 'Aluminium F5 Pipes', 'Aluminium F9 Pipes', 'Aluminium F91 Pipes'] },
    { product: 'Pipes', material: 'Steel', grades: ['Steel F11 Pipes', 'Steel F22 Pipes', 'Steel F5 Pipes', 'Steel F9 Pipes', 'Steel F91 Pipes'] },
    { product: 'Tubing', material: 'Aluminium', grades: ['Aluminium F12 Tubing', 'Aluminium F22 Tubing'] },
    { product: 'Tubing', material: 'Steel', grades: ['Steel F12 Tubing', 'Steel F22 Tubing'] },
    { product: 'Flanges', material: 'Carbon Steel', grades: ['Carbon Steel F11 Flanges', 'Carbon Steel F22 Flanges'] },
    { product: 'Valves', material: 'Stainless Steel', grades: ['Stainless Steel F5 Valves', 'Stainless Steel F9 Valves'] },
    { product: 'Gaskets', material: 'Nickel Alloy', grades: ['Nickel Alloy F91 Gaskets', 'Nickel Alloy F22 Gaskets'] },
    { product: 'Bars', material: 'Titanium', grades: ['Titanium F5 Bars', 'Titanium F9 Bars'] },
    { product: 'Fasteners', material: 'Inconel', grades: ['Inconel F12 Fasteners', 'Inconel F22 Fasteners'] },
    { product: 'Bolts', material: 'Duplex Steel', grades: ['Duplex Steel F11 Bolts', 'Duplex Steel F22 Bolts'] }
];

const AddProductModal = ({ visible, onClose }) => {
    const dispatch = useDispatch();
    
    const [selectedProduct, setSelectedProduct] = useState(gradeData[0].product);
    const [selectedMaterial, setSelectedMaterial] = useState(gradeData[0].material);
    const [selectedGrades, setSelectedGrades] = useState([gradeData[0].grades[0]]);

    const uniqueProducts = [...new Set(gradeData.map(item => item.product))];
    const materialsForProduct = gradeData.filter(item => item.product === selectedProduct);
    const gradesForMaterial = materialsForProduct.find(item => item.material === selectedMaterial)?.grades || [];

    useEffect(() => {
        setSelectedMaterial(materialsForProduct[0]?.material || "");
        setSelectedGrades(materialsForProduct[0]?.grades.slice(0, 1) || []);
    }, [selectedProduct]);

    useEffect(() => {
        setSelectedGrades(gradesForMaterial.slice(0, 1) || []);
    }, [selectedMaterial]);

    const handleGradeToggle = (grade) => {
        setSelectedGrades(prevGrades =>
            prevGrades.includes(grade) ? prevGrades.filter(g => g !== grade) : [...prevGrades, grade]
        );
    };

  const handleSubmit = () => {
    if (!selectedProduct || !selectedMaterial || selectedGrades.length === 0) {
        alert("Please select a product, material, and at least one grade.");
        return;
    }

    console.log("Submitting:", { selectedProduct, selectedMaterial, selectedGrades });

    selectedGrades.forEach(grade => {
        const structuredData = {
            id: Date.now(),  
            name: grade,  
            material: selectedMaterial,
            unitLength: "6-12 meter",  
            shape: "Round",  
            price: 350,  
        };

       console.log(structuredData , "sdsf")

        dispatch(addProduct(structuredData));  
    });

    onClose();
};


    return (
        <Modal open={visible} onClose={onClose}>
            <Box sx={{ p: 4, bgcolor: 'background.paper', margin: 'auto', maxWidth: '90%', minWidth: 400, borderRadius: 2, boxShadow: 24, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6">Add Products</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <List sx={{ width: '30%', borderRight: '1px solid #ddd' }}>
                        <Typography variant="subtitle1">Products</Typography>
                        {uniqueProducts.map(product => (
                            <ListItemButton key={product} selected={selectedProduct === product} onClick={() => setSelectedProduct(product)}>
                                <ListItemText primary={product} />
                            </ListItemButton>
                        ))}
                    </List>
                    <List sx={{ width: '30%', borderRight: '1px solid #ddd' }}>
                        <Typography variant="subtitle1">Material</Typography>
                        {materialsForProduct.map(({ material }) => (
                            <ListItemButton key={material} selected={selectedMaterial === material} onClick={() => setSelectedMaterial(material)}>
                                <ListItemText primary={material} />
                            </ListItemButton>
                        ))}
                    </List>
                    <List sx={{ width: '40%' }}>
                        <Typography variant="subtitle1">Grades</Typography>
                        {gradesForMaterial.map(grade => (
                            <ListItem key={grade}>
                                <Checkbox checked={selectedGrades.includes(grade)} onChange={() => handleGradeToggle(grade)} />
                                <ListItemText primary={grade} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddProductModal;
