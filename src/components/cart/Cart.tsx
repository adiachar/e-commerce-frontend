import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../../store/store.ts";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../../slices/mainSlice.ts";
import { useDispatch } from "react-redux";

export default function Cart() {
    type Product = {
        id: number
        title: string,
        description: string,
        category: string,
        price: number,
        images: string[],
        quantity: number | 0,
    }

    const cart: Product[] = useSelector((state :RootState) => state.cart);
    const [total, setTotal] = useState<number>(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!cart) return;
        let currPrice : number = 0;
        cart.map((prod) => {currPrice += prod.price * (prod.quantity || 1)});
        setTotal(currPrice);
    }, [cart]);

    const removeProduct = (prod: Product) => {
        dispatch(removeFromCart(prod));
    }

    const seeProduct = (id: number) => {
        navigate(`/product/${id}`);
    }

    return (
        <div className="p-6">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold mb-4">Your cart</h1>
                {cart.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {cart.map((prod, idx) => (
                            <div key={idx} className="p-3 flex items-center gap-4  rounded border">
                                <img onClick={() => seeProduct(prod.id)} src={prod.images?.[0]} alt={prod.title} className="w-24 h-24 object-cover rounded cursor-pointer" />
                                <div className="flex-1">
                                    <h2 className="font-semibold">{prod.title}</h2>
                                    <p className="text-sm text-gray-500">Qty: {prod.quantity}</p>
                                </div>
                                <div>
                                   <button onClick={() => removeProduct(prod)} aria-label="add-to-cart" className="cursor-pointer inline-flex items-center gap-1 border border-red-600 text-red-600 text-xs px-2 py-1 rounded-md hover:bg-teal-50">
                                        <span className="text-xs">🛒</span>
                                        <span className="font-medium">Remove</span>
                                    </button>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold">${(Number(prod.price) || 0) * (prod.quantity || 1)}</div>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-end items-center gap-4 mt-6">
                            <div className="text-lg font-semibold">Total:</div>
                            <div className="text-2xl font-bold text-indigo-600">${total.toFixed(2)}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
