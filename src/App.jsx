import { Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Cart from './Components/Cart/Cart';
import About from './Components/About/About';
import NotFound from './Components/NotFound/NotFound';

import { ThemeProvider } from './Components/Theme/Theme';
import Checkout from './Components/Checkout/Checkout';

function App() {
  return (
    <ThemeProvider>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path='/Checkout' element={<Checkout/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </ThemeProvider>
  );
}

export default App;