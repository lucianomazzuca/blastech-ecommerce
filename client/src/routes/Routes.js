import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import BrandEdit from "../pages/BrandEdit";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import BrandAdd from "../pages/BrandAdd";
import BrandAdmin from "../pages/BrandAdmin";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Product from "../pages/Product";
import Register from "../pages/Register";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ProductAdmin from "../pages/ProductAdmin";
import ProductAdd from "../pages/ProductAdd";
import ProductEdit from "../pages/ProductEdit";
import CategoryAdmin from "../pages/CategoryAdmin";
import CategoryAdd from "../pages/CategoryAdd";
import CategoryEdit from "../pages/CategoryEdit";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";

const ProtectedRoute = ({ children, ...rest }) => {
  const { currentUser, isLoading } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={() => {
        if (isLoading) return <div>loading</div>;
        if (!currentUser) return <Redirect to="/" />;

        return currentUser.isAdmin ? children : <Redirect to="/" />;
      }}
    />
  );
};

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <div className="flex-1">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/products">
            <Product />
          </Route>
          <Route path="/products/:productId">
            <ProductDetail />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <ProtectedRoute exact path="/admin/brands">
            <BrandAdmin />
          </ProtectedRoute>
          <ProtectedRoute exact path="/admin/brands/add">
            <BrandAdd />
          </ProtectedRoute>
          <ProtectedRoute path="/admin/brands/edit/:brandId">
            <BrandEdit />
          </ProtectedRoute>
          <ProtectedRoute exact path="/admin/products">
            <ProductAdmin />
          </ProtectedRoute>
          <ProtectedRoute exact path="/admin/products/add">
            <ProductAdd />
          </ProtectedRoute>
          <ProtectedRoute path="/admin/products/edit/:productId">
            <ProductEdit />
          </ProtectedRoute>
          <ProtectedRoute exact path="/admin/categories">
            <CategoryAdmin />
          </ProtectedRoute>
          <ProtectedRoute exact path="/admin/categories/add">
            <CategoryAdd />
          </ProtectedRoute>
          <ProtectedRoute path="/admin/categories/edit/:categoryId">
            <CategoryEdit />
          </ProtectedRoute>
          <Route path="/*">
            <NotFound />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default Routes;
