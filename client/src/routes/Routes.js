import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
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

const ProtectedRoute = ({ children, ...rest }) => {
  const { currentUser, isLoading } = useContext(AuthContext);

  return (
    <Route {...rest} render={() => {
      if (isLoading) return <div>loading</div>
      if (!currentUser) return <Redirect to="/" />

      return currentUser.isAdmin ? children : <Redirect to="/" />
    }} />
  )
}

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
            <ProtectedRoute exact path="/admin/brands" >
              <BrandAdmin />
            </ProtectedRoute>
            <Route exact path="/admin/brands/add">
              <BrandAdd />
            </Route>
            <Route path="/admin/brands/edit/:brandId">
              <BrandEdit />
            </Route>
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
