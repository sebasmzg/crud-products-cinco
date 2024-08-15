// productMethods.tsx

import React from "react";
import { Product } from './types/IData';

// Método para añadir un producto
export const addProduct = async (
    products: Product[],
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
    title: string,
    description: string,
    price: number,
    image: string,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setDescription: React.Dispatch<React.SetStateAction<string>>,
    setPrice: React.Dispatch<React.SetStateAction<number>>,
    setImage: React.Dispatch<React.SetStateAction<string>>
) => {
    const newProduct: Product = {// Provide a value for the 'id' property
        title,
        price,
        description,
        image,
    };
    setProducts([...products, newProduct]);

    await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
    });

    // Limpiar los campos después de añadir el producto
    setTitle('');
    setDescription('');
    setPrice(0);
    setImage('');
};

// Método para eliminar un producto
// Método para eliminar un producto
export const deleteProduct = async (
    id: string,
    products: Product[],
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>
) => {
    try {
        // Realiza la solicitud DELETE al servidor
        const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};

// Método para editar un producto
// productMethods.ts
export const editProduct = async (
    id: string,
    title: string,
    description: string,
    price: number,
    image: string
) => {
    const updatedProduct = {
        id,
        title,
        description,
        price,
        image
    };

    try {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error editing product:', error);
        throw error; // Rethrow to handle errors in the component
    }
};

