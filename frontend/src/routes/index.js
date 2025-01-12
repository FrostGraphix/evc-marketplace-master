import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import ForgotPassword from "../Pages/ForgotPassword";
import SignUp from "../Pages/SignUp";
import AdminPanel from "../Pages/AdminPanel";
import AllUsers from "../Pages/AllUsers";
import AllProducts from "../Pages/AllProducts";
import CategoryProduct from "../Pages/CategoryProduct";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
import SearchProduct from "../Pages/SearchProduct";
import Success from "../Pages/Success";
import Cancel from "../Pages/Cancel";
import OrderPage from "../Pages/OrderPage";
import LikedProducts from "../Pages/LikedProduct";
import BecomeRealtor from "../Pages/BecomeRealtor";
import ResetPassword from "../Pages/ResetPassword"; // Import ResetPassword

// New imports from your snippet
import AdminUploadDocuments from "../Pages/adminUploadDocuments";
import AdminPanelDocuments from "../Pages/AdminPanelDocuments";
import UserDocuments from "../Pages/UserDocuments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset/:bef318c350b0e403025f388ff2fca0ba", // Add route for ResetPassword
        element: <ResetPassword />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "product-category",
        element: <CategoryProduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "search/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path: "cancel",
        element: <Cancel />,
      },
      {
        path: "search",
        element: <SearchProduct />,
      },
      {
        path: "order",
        element: <OrderPage />,
      },
      {
        path: "likedpage",
        element: <LikedProducts />,
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
        ],
      },
      {
        path: "become-realtor",
        element: <BecomeRealtor />,
      },
      // New routes from snippet:
      {
        path: "admin/upload-document",
        element: <AdminUploadDocuments />,
      },
      {
        path: "admin/my-documents",
        element: <AdminPanelDocuments />,
      },
      {
        path: "my-documents",
        element: <UserDocuments />,
      },
      // (Optional) Catch-all route below if needed:
      // {
      //   path: "*",
      //   element: <NotFound />,
      // },
    ],
  },
]);

export default router;