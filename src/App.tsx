import { Profiler, useState } from 'react';
import './App.css';
import Recommendation from './components/recommendation/Recommendation';
import store from "./store/store.ts";
import { Provider } from 'react-redux';
import AllProducts from './components/products/AllProducts.tsx';
import Product from './components/products/Product.tsx';
import Cart from './components/cart/Cart';
import { Route, Routes, Link } from 'react-router-dom';

function App() {
  const [search, setSearch] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Provider store={store}>
      <div className='App'>
        <div className='nav-bar flex flex-col justify-between h-auto shadow-sm bg-white sticky top-0 z-50'>
          <div className='h-1 bg-gradient-to-r from-teal-600 via-teal-400 to-teal-600'></div>
          <div className='py-3 px-4 flex items-center justify-between relative bg-white'>
            
            <Link to='/' className='flex items-center gap-3 group relative p-2 rounded-lg overflow-hidden'>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-100 to-teal-50 rounded-full blur-md transition-all duration-300 scale-90 group-hover:scale-125 opacity-0 group-hover:opacity-100"></div>
                <img 
                  src="/vite.svg" 
                  alt="Logo" 
                  className="h-8 w-8 relative transform transition-all duration-300 ease-out group-hover:scale-110" 
                />
              </div>
              <span className='text-xl font-bold text-gray-900 relative transition-all duration-300'>
                ShopSmart
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </span>
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-all duration-300'
            >
              <div className="flex flex-col gap-1.5">
                <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2 bg-gray-800' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2 bg-gray-800' : ''}`}></span>
              </div>
            </button>

            <div className='hidden lg:flex items-center gap-6 me-6'>
              <nav className='flex items-center gap-6'>
                {[
                  { name: 'Home', path: '/' },
                  { name: 'About', path: '/about' },
                  { name: 'Trending', path: '/trending' }
                ].map((item) => (
                  <Link 
                    key={item.name}
                    to={item.path}
                    className='group relative px-3 py-2 text-gray-600 font-medium transition-all duration-300 hover:text-gray-900'
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                  </Link>
                ))}
              </nav>

              <div className='relative group'>
                <div className='h-10 px-4 flex items-center bg-gray-50 rounded-lg border border-transparent transition-all duration-300 ease-out focus-within:border-teal-200 focus-within:bg-white focus-within:shadow-sm'>
                  <span className="material-symbols-outlined cursor-pointer text-gray-400 group-hover:text-gray-500">search</span>
                  <input 
                    className='h-full w-48 md:w-64 ms-3 outline-none text-sm text-gray-800 bg-transparent placeholder-gray-400 transition-all duration-300' 
                    value={search} 
                    onChange={e => setSearch(e.target.value)} 
                    type="text"
                    placeholder="Search products..."
                  />
                </div>
              </div>

              
              <Link 
                to='/cart' 
                className='group flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:border-teal-500 hover:text-teal-600 transition-all duration-200'
              >
                <div className="relative">
                  <span className='text-base'>🛒</span>
                  <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-teal-500 text-[11px] font-medium text-white rounded-full">3</span>
                </div>
                <span className='text-sm font-medium'>Cart</span>
              </Link>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-all duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div 
                className={`absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                onClick={e => e.stopPropagation()}
              >
                <div className="h-full flex flex-col">
                  <div className="p-6 space-y-6 flex-grow">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">Menu</h2>
                      <button 
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Mobile Navigation Links */}
                    <nav className='flex flex-col gap-2'>
                      {[
                        { name: 'Home', path: '/', icon: '🏠' },
                        { name: 'About', path: '/about', icon: 'ℹ️' },
                        { name: 'Trending', path: '/trending', icon: '🔥' }
                      ].map((item) => (
                        <Link 
                          key={item.name}
                          to={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className='flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200'
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      ))}
                    </nav>

                    {/* Mobile Search Bar */}
                    <div className='mt-6'>
                      <div className='flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-transparent transition-all duration-300 focus-within:border-teal-200 focus-within:bg-white focus-within:shadow-sm'>
                        <span className="material-symbols-outlined text-gray-400">search</span>
                        <input 
                          className='w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400' 
                          value={search} 
                          onChange={e => setSearch(e.target.value)} 
                          type="text"
                          placeholder="Search products..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mobile Cart Button */}
                  <div className="p-6 border-t border-gray-100">
                    <Link 
                      to='/cart'
                      onClick={() => setIsMenuOpen(false)}
                      className='flex items-center justify-center gap-2 w-full px-4 py-3 bg-white text-gray-700 rounded-lg border border-gray-200 hover:border-teal-500 hover:text-teal-600 transition-all duration-200'
                    >
                      <div className="relative">
                        <span className='text-lg'>🛒</span>
                        <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-teal-500 text-[11px] font-medium text-white rounded-full">3</span>
                      </div>
                      <span className='font-medium'>View Cart</span>
                    </Link>
                    <p className="mt-4 text-xs text-center text-gray-500">© 2025 ShopSmart. All rights reserved.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Routes>
          <Route path='/*' element={<><Recommendation/><AllProducts/></>}/>
          <Route path='/product/:id' element={<Product/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </div>
    </Provider>

  )
}

export default App;
