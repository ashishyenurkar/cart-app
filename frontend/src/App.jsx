import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from "./components/Header";
import Home from "./components/Home";
import LoginSignup from "./components/Register";
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Payment from './components/Payment';
import Succes from './components/Succes';
import UserOrders from './components/UserOrders';
import Admin from './components/Admin';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Orders from './components/Orders';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log('user', user)

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {/* Redirect to the home page if the user is authenticated */}
          <Route
            path="/login-signup"
            element={isAuthenticated ? <Navigate to="/" /> : <LoginSignup />}
          />
          {/* Private route for checkout and payment - only accessible if user is authenticated */}
          <Route
            path="/checkout"
            element={isAuthenticated ? <Checkout /> : <Navigate to="/login-signup" />}
          />
          <Route
            path="/payment"
            element={isAuthenticated ? <Payment /> : <Navigate to="/login-signup" />}
          />
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Succes />} />
          <Route path="/myorders" element={isAuthenticated ? <UserOrders /> : <Navigate to="/login-signup" />} />
          <Route path="/admin" element={isAuthenticated && user.role == "admin" ? <Admin /> : <Navigate to="/" />} />
          <Route path="/addproduct" element={isAuthenticated && user.role == "admin" ? <AddProduct /> : <Navigate to="/" />} />
          <Route path="/editproduct/:productId" element={isAuthenticated && user.role == "admin" ? <EditProduct /> : <Navigate to="/" />} />
          <Route path="/orders" element={isAuthenticated && user.role == "admin" ? <Orders /> : <Navigate to="/" />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
