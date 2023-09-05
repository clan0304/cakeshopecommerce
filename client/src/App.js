import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import ItemDetail from './pages/itemDetail';
import CartMenu from './components/CartMenu';
import CheckoutSuccess from './pages/checkout/CheckoutSuccess';

import Login from './pages/login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/item/:itemId" element={<ItemDetail />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
        </Routes>

        <CartMenu />
      </Router>
    </div>
  );
}

export default App;
