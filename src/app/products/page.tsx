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

    // El useEffect lo que hace es que después de que muestre la interfaz de usuario me hace algo más
    useEffect(() => {
        // Cargar productos desde el localStorage
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        }
    }, []);

    useEffect(() => {
        // Guardar productos en el localStorage
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    // Función para Crear los productos
    const addProduct = () => {
        const newProduct: Product = {
            id: Date.now(),
            title,
            price,
            description,
            image,
        };
        // Añado el nuevo producto al array de productos y resetea los campos del formulario (Actualiza)
        setProducts([...products, newProduct]); // El nuevo producto se añade al final del Array
        setTitle('');
        setDescription('');
        setPrice(0); 
        setImage('');
    };

    // Función para Eliminar productos
    const deleteProduct = (id: number) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
    };

    // El componente me devuelve un JSX
    return (
        // Aquí se renderiza el contenido del componente
        <div>
            <h1>Products</h1>
            {/* Formulario con los inputs para guardar el producto */}
            <form onSubmit={(e) => { e.preventDefault(); addProduct(); }}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))}/>
                <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)}/>
                <button type="submit">Add Product</button>
            </form>
            {/* Tabla donde se muestran los productos */}
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        // La función map itera sobre cada objeto del array
                        // La propiedad key es importante en React para identificar de manera única cada elemento
                        <tr key={product.id}> 
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>
                                <img src={product.image} alt={product.title} style={{ width: '50px' }}/>
                            </td>
                            <td>
                                <button onClick={() => deleteProduct(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductPage;
