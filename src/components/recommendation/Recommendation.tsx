import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Recommendation() {
    type Product = {
        id: number
        title: string,
        description: string
        category: string,
        images: string[],
        quantity: number,
        price: number
    }
    const category: string = "fragrance";
    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const getProducts = async () => {
            const response = await axios.get(`https://dummyjson.com/products?limit=7`);

            if(response.status == 200) {
                setProducts(response.data.products);
            }
        }
        getProducts();
    }, []);

    const seeProduct = (id: number) => {
        navigate(`/product/${id}`);
    }

    return (
        <section className="relative bg-white">
            <div className='recommendation h-[75vh] w-full flex overflow-x-scroll snap-x snap-mandatory scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300'>
                {products.map((product, idx) => 
                    <div 
                        key={idx} 
                        className='h-full min-w-full flex items-center justify-between bg-white snap-start snap-always relative overflow-hidden'
                    >
                        <div className='lg:max-w-4/6 z-10 p-8 md:p-12 lg:p-16 flex flex-col '>
                            <div className="flex items-start gap-2 mb-4">
                                <span className="px-3 py-1 text-xs font-medium bg-teal-50 text-teal-600 rounded-full">Featured</span>
                                <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">{product.category}</span>
                            </div>
                            <h1 className='m-0 mb-4 text-3xl md:text-4xl lg:text-5xl text-gray-900 font-bold tracking-tight leading-tight'>
                                {product.title}
                            </h1>
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                                <span className="text-sm text-gray-500">USD</span>
                            </div>
                            <p className='text-base text-gray-600 mb-8 line-clamp-3'>
                                {product.description}
                            </p>
                            <div className="flex items-center gap-4">
                                <Link 
                                    to={`/product/${product.id}`}
                                    className='group inline-flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white rounded-lg transition-all duration-300 hover:bg-teal-700 active:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
                                >
                                    <span className='text-sm font-medium' onClick={() => seeProduct(product.id)}>View Details</span>
                                    <span className='text-lg transition-transform duration-300 group-hover:translate-x-0.5'>→</span>
                                </Link>
                                <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                                    Learn more
                                </button>
                            </div>
                        </div>

                        
                        <div className="relative hidden md:block w-1/2 h-full">
                            <div className="h-full w-full p-0 flex items-center justify-center ">
                                <img 
                                    className='h-full w-full object-contain object-center drop-shadow-xl' 
                                    src={product.images[0]} 
                                    alt={product.title}
                                />
                            </div>
                        </div>

                        
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            {products.map((_, i) => (
                                <div 
                                    key={i} 
                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? 'w-8 bg-teal-600' : 'w-1.5 bg-gray-200'}`}
                                />
                            ))}
                        </div>
                    </div>                
                )}
            </div>
            
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent"></div>
            
            <style>{`
                .recommendation::-webkit-scrollbar {
                    height: 0px;
                }
                .recommendation {
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}