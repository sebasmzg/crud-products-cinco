// ProductPage.tsx

"use client"; // Esto hace que el componente sea un Client Component, estos componentes se ejecutan y renderizan en el cliente (el navegador)

// Importación de Librerías de React
import React, { useState, useEffect } from "react";
import { Product } from "../types/IData"; // Importa la función desde el archivo
import { addProduct,deleteProduct } from "../productMethods";
import Swal from 'sweetalert2';

const ProductPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');

    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        } else {
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
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    return (
        <div>
            <div className="flex flex-row flex-nowrap w-96 ">
                <button >
                    <a href="/" className=" no-underline focus:outline-none">Home</a>
                </button>
                <br />
                <button>
                    <a href="/table">tablas</a>
                </button>
            </div>
            
            <h1>Products</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                addProduct(
                    products,
                    setProducts,
                    title,
                    description,
                    price,
                    image,
                    setTitle,
                    setDescription,
                    setPrice,
                    setImage
                );
                Swal.fire({
                    icon: 'success',
                    title: 'Product added successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
            }}>
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
