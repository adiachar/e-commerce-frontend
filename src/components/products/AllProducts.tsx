import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, updateProduct, addToCart, removeFromCart, updateCartQuantity } from "../../slices/mainSlice.ts";
import type { AppDispatch } from "../../store/store.ts";
import { type RootState } from "../../store/store.ts";
import { useNavigate } from "react-router-dom";

type Product = {
    id: number
    title: string,
    description: string,
    category: string,
    price: number,
    images: string[],
    quantity: number | 0,
}

export default function Products() {
    const [categories, setCategories] = useState(["smartphone", "books", "watch"]);
    
    useEffect(() => {
        const getCategories = async () => {
            const response = await axios.get('https://dummyjson.com/products/category-list');

            if(response.status == 200) {
                const allCategories: string[] = response.data;
                setCategories(allCategories.slice(0, 5));
            }
        }
        getCategories();
    }, []);

    return (
        <div>
            {categories.map((category, idx) => 
            <Category key={idx} category={category}/>)}
        </div>
    );
}

export function Category({category}: {category: string}) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const products: Product[] = useSelector((state: RootState) => state.products);

    useEffect(() => {
        const getProducts = async () => {
            const response = await axios.get(`https://dummyjson.com/products/category/${category}?limit=10`);
            
            if(response.status == 200) {
                dispatch(addProducts(response.data.products));
            }
        }
        products.length == 0 && getProducts();
    }, [category]);

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

    const seeProduct = (id: number) => {
        navigate(`/product/${id}`);
    }

    const buyNow = (p: Product) => {
    }

    return(
        <>
            {products.length > 0 ? (
                <section className="m-4 p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h2 className="text-2xl font-semibold">{category}</h2>
                            <p className="text-xs text-gray-500 mt-1">Popular items in this category</p>
                        </div>
                        <button className="text-sm text-teal-600 hover:text-teal-700">See all</button>
                    </div>
                    <div className="relative">
                        <div className="w-full pb-4 flex overflow-x-auto category-scroll" style={{scrollbarWidth: 'thin', scrollbarColor: 'rgba(100,116,139,0.6) rgba(15,23,42,0.04)'}}>
                        {products.map((product, idx) => product.category == category ? 
                        <div key={product.id ?? idx} className="w-64 flex-shrink-0 mr-4 p-0 bg-white text-gray-800 flex flex-col rounded-lg shadow-sm hover:shadow-md transition">
                            <div onClick={() => seeProduct(product.id)} className="flex items-center justify-center h-40 w-full overflow-hidden bg-gray-100 rounded-t-lg cursor-pointer">
                                <img src={product.images[0]} alt={product.title} className="h-12/12" loading="lazy" />
                            </div>
                            <div className="p-3 flex-1 flex flex-col justify-between">
                                <div onClick={() => seeProduct(product.id)} className="cursor-pointer">
                                    <h2 className="text-sm font-semibold truncate">{product.title}</h2>
                                    <p className="text-xs text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg font-bold text-gray-900">${product.price}</span>
                                        <span className="text-xs text-gray-500">USD</span>
                                    </div>
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
                        </div>: null)}               
                    </div>
                    <style>{`.category-scroll::-webkit-scrollbar{height:10px}.category-scroll::-webkit-scrollbar-track{background:rgba(255,255,255,0.06);border-radius:9999px}.category-scroll::-webkit-scrollbar-thumb{background:rgba(0,0,0,0.25);border-radius:9999px;border:2px solid rgba(255,255,255,0.1)}.category-scroll::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,0.35)}`}</style>
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent"></div>
                    </div>
                </section>                   
            ) : null}
        </>
    );
}