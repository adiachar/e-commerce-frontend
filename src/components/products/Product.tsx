import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import {updateProduct, addToCart, removeFromCart, updateCartQuantity } from "../../slices/mainSlice.ts";
import {Category} from './AllProducts.tsx';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  quantity: number;
}

const Product: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const productId = Number(id);
    const dispatch = useDispatch();

    const product: Product | undefined = useSelector((state: RootState) =>
        state.products.find((p: Product) => p.id === productId)
    );

    const [currentImage, setCurrentImage] = useState(0);

    if (!product) {
        return <div className="container mx-auto p-4">Product not found</div>;
    }

    const handlePrevImage = () => {
        setCurrentImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setCurrentImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
    };

    const updateCartQuantityForProduct = (p: Product, qty: number) => {
        p = {...p, quantity: qty};

        if(qty == 0) {
            dispatch(removeFromCart(p));
        } else {
            dispatch(updateProduct(p));
            dispatch(updateCartQuantity(p));
        }
    };

    const addThisToCart = (p: Product) => {
        p = {...p, quantity: 1};
        dispatch(updateProduct(p));
        dispatch(addToCart(p));
    };

    const buyNow = (p: Product) => {
        
    };

    return (
        <div className="container mx-auto p-4">
        <div className="bg-white shadow rounded p-4 flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
            <div className="relative">
                <img
                src={product.images[currentImage]}
                alt={product.title}
                className="w-full h-96 object-cover rounded"
                />
                {product.images.length > 1 && (
                <>
                    <button
                    onClick={handlePrevImage}
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full opacity-75 hover:opacity-100"
                    >
                    &larr;
                    </button>
                    <button
                    onClick={handleNextImage}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full opacity-75 hover:opacity-100"
                    >
                    &rarr;
                    </button>
                </>
                )}
            </div>
            </div>
            <div className="w-full md:w-1/2 md:pl-6 mt-4 md:mt-0">
                <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <div className="text-xl font-semibold mb-4">${product.price}</div>
                    <div className="flex items-center gap-2">
                        {product.quantity > 0 ? (
                            <div className="flex items-center gap-1">
                                <button aria-label="decrease" onClick={() => updateCartQuantityForProduct(product, (product.quantity || 1) - 1)} className="w-7 h-6 cursor-pointer flex items-center justify-center rounded-full border border-teal-600 text-teal-600 hover:bg-teal-50 text-xs transition">-</button>
                                <div className="px-2 py-0.5 text-xs bg-white/5 text-gray-900 rounded-md font-medium">{product.quantity}</div>
                                <button aria-label="increase" onClick={() => updateCartQuantityForProduct(product, (product.quantity || 0) + 1)} className="w-7 h-6 cursor-pointer flex items-center justify-center rounded-full border border-teal-600 text-teal-600 hover:bg-teal-50 text-xs transition">+</button>
                            </div>
                        ) : (
                            <button aria-label="add-to-cart" onClick={() => addThisToCart(product)} className="cursor-pointer inline-flex items-center gap-1 border border-teal-600 text-teal-600 text-xs px-2 py-1 rounded-md hover:bg-teal-50">
                                <span className="text-xs">🛒</span>
                                <span className="font-medium">Add</span>
                            </button>
                        )}
                        <button aria-label="buy-now" onClick={() => buyNow(product)} className="cursor-pointer inline-flex items-center gap-1 border border-teal-600 text-teal-600 text-xs px-2 py-1 rounded-md hover:bg-teal-50">
                            <span className="font-medium">Buy</span>
                        </button>
                    </div>
                </div>
            </div>
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Related Category: {product.category}</h2>
            <Category category={product.category}/>
        </div>
        </div>
    );
};

export default Product;
