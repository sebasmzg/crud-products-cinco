"use client"; // Esto hace que el componente sea un Client Component, estos componentes se ejecutan y renderizan en el cliente (el navegador)

// Importación de Librerias de React
import React, { useState, useEffect } from "react";

// Interface (Estructura de los productos por asi decirlo)

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
}

// Definición de estados
const ProductPage: React.FC = () => { // Cuando es React.FC significa que es un componente funcional (los componentes son bloques reutilizables de código que representan una parte de la interfaz de usuario)
    // products Es una variable de estado que almacena una lista de productos
    // Aquí se especifica que el estado products es un array de objetos que se ajustan a la interfaz Product. Se inicia con un array vacío.
    const [products, setProducts] = useState<Product[]>([]); // Cada llamada a useState devuelve el valor actual del estado y una función para actualizar ese estado.
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');

    // El componente me devuelve un JSX
    return (
        // Aquí se renderiza el contenido del componente
    );
};

export default ProductPage;