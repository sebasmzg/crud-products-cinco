"use client"; // Esto hace que el componente sea un Client Component, estos componentes se ejecutan y renderizan en el cliente (el navegador)

// Importación de Librerias de React
import React, { useState, useEffect } from "react";
import { Product } from "../types/IData";

// Interface (Estructura de los productos por asi decirlo)



// Definición de estados
const ProductPage: React.FC = () => { // Cuando es React.FC significa que es un componente funcional (los componentes son bloques reutilizables de código que representan una parte de la interfaz de usuario)
    // products Es una variable de estado que almacena una lista de productos
    // Aquí se especifica que el estado products es un array de objetos que se ajustan a la interfaz Product. Se inicia con un array vacío.
    const [products, setProducts] = useState<Product[]>([]); // Cada llamada a useState devuelve el valor actual del estado y una función para actualizar ese estado.
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');

    // Primero se intentan cargar los datos desde el localStorage, si no hay datos se cargan desde el JSON y luego se guardan en el localStorage

    // El useEffect lo que hace es que después de que muestre la interfaz de usuario me hace algo más
    useEffect(() => {
        // Cargar productos desde el localStorage
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        } else {
            // Si no hay productos en el localStorage, se cargan desde JSON Server
            const fetchProducts = async () => {
                const response = await fetch('http://localhost:3000/products');
                const data = await response.json();
                setProducts(data);
                localStorage.setItem('products', JSON.stringify(data));
            };
            fetchProducts();
        }
    }, []);

    useEffect(() => {
        // Guardar productos en el localStorage
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    // Cuando se agrega un nuevo producto se actualiza tanto en local, localStorage, y JSON Server

    // Función para Crear los productos
    const addProduct = async () => {
        const newProduct: Product = {
            id: Date.now(),
            title,
            price,
            description,
            image,
        };
        // Añade el nuevo producto al array de productos y resetea los campos del formulario (Actualiza)
        setProducts([...products, newProduct]); // El nuevo producto se añade al final del Array

        // Añade el nuevo producto al JSON Server
        await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });
        // Resetea los campos del formulario
        setTitle('');
        setDescription('');
        setPrice(0);
        setImage('');
    };

    // Al eliminar un producto se actualizas el estado local, el localStorage y también se elimina en el JSON 

    // Función para Eliminar productos
    const deleteProduct = async (id: number) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);

        // Eliminar el producto en JSON Server
        await fetch(`http://localhost:3000/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    // El componente me devuelve un JSX
    return (
        // Aquí se renderiza el contenido del componente

        // El Formulario y la tabla que hay aca son temporaneas para poder hacer pruebas a las funciones del crud

        <div>
            <a href="/">Home</a>
            <a href="/table">tablas</a>
            <h1>Products</h1>
            {/* Formulario con los inputs para guardar el producto */}
            <form onSubmit={(e) => { e.preventDefault(); addProduct(); }}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default ProductPage;
