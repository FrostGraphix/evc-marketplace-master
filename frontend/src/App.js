import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import ScrollToTop from './components/ScrollTop';

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const [likedProductCount, setLikedProductCount] = useState(0);
  const location = useLocation(); // Get current location from router
  const isAuthRoute = ['/login', '/sign-up'].includes(location.pathname); // Determine if it's an auth route

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();
    setCartProductCount(dataApi?.data?.count);
  };

  const fetchUserLikedProduct = async () => {
    const dataResponse = await fetch(SummaryApi.likedProductCount.url, {
      method: SummaryApi.likedProductCount.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();
    setLikedProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
    fetchUserLikedProduct();
  }, []);

  return (
    <Context.Provider
      value={{
        fetchUserDetails,
        cartProductCount,
        fetchUserAddToCart,
        likedProductCount,
        fetchUserLikedProduct,
      }}
    >
      <ToastContainer position="top-center" /> {/* Make sure Toastify is visible on all pages */}
      {isAuthRoute ? (
        <Outlet /> // Auth pages don't show header/footer, just the outlet
      ) : (
        <>
          <ScrollToTop />
          <Header />
          <main className="min-h-[calc(100vh-120px)]">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </Context.Provider>
  );
}

export default App;
