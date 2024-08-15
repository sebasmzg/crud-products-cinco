'use client';
import React, { useState, useEffect } from "react";
import { Product } from "../types/IData";
import { editProduct, deleteProduct } from "../productMethods";
import Swal from 'sweetalert2';

const ProductPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null); // Estado para el producto en edición

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleEdit = async (id: string) => {
        const product = products.find(p => p.id === id);
        if (!product) return;

        try {
            const result = await Swal.fire({
                title: "Edit product",
                html: `
                    <input type="text" id="title" class="swal2-input" placeholder="Title" value="${product.title}">
                    <input type="text" id="description" class="swal2-input" placeholder="Description" value="${product.description}">
                    <input type="number" id="price" class="swal2-input" placeholder="Price" value="${product.price}">
                    <input type="text" id="image" class="swal2-input" placeholder="Image URL" value="${product.image}">
                `,
                showCancelButton: true,
                confirmButtonText: "Save",
                preConfirm: () => {
                    const title = (document.getElementById('title') as HTMLInputElement).value;
                    const description = (document.getElementById('description') as HTMLInputElement).value;
                    const price = Number((document.getElementById('price') as HTMLInputElement).value);
                    const image = (document.getElementById('image') as HTMLInputElement).value;

                    if (!title || !description || isNaN(price) || !image) {
                        Swal.showValidationMessage('Please fill all fields correctly');
                    }

                    return { title, description, price, image };
                }
            });

            if (result.isConfirmed) {
                const { title, description, price, image } = result.value;
                await editProduct(id, title, description, price, image);
                setProducts(products.map(product =>
                    product.id === id
                        ? { ...product, title, description, price, image }
                        : product
                ));
                Swal.fire({
                    title: "Product edited",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error('Error editing product:', error);
            Swal.fire({
                title: "Error",
                text: "There was an error editing the product",
                icon: "error"
            });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                await deleteProduct(id, products, setProducts);
                setProducts(prevProducts => prevProducts.filter(product => product.id !== id));

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <>
            <div className='flex flex-row flex-nowrap w-96 ' >
                <button>
                    <a href="/">Home</a>
                </button>
                <br />
                <button>
                    <a href="/form">Formularios</a>
                </button>
            </div>
          
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>
                                <img src={product.image} alt={product.title} style={{ width: '100px', height: 'auto' }} />
                            </td>
                            <td>
                                <button onClick={() => product.id && handleEdit(product.id)}>Edit</button>
                                <button onClick={() => product.id && handleDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ProductPage;
