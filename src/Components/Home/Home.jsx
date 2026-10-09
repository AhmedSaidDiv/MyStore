import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
export default function Home() {
  const [products, setProducts] = useState([]);
  const sliderRef = useRef(null);
  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          'https://fakestoreapi.com/products'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    getProducts();
  }, []);
  function moveSlider(direction) {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction * 280,
        behavior: 'smooth',
      });
    }
  }
  return (
  <>
    <main className={styles.home}>
      <section className="container py-5">
        <div className={`p-5 rounded-4 ${styles.hero}`}>
          <p className={styles.subtitle}>
            WELCOME TO MYSTORE
          </p>
          <h1 className="display-4 fw-bold">
            Find Your Next Favorite
          </h1>
          <p className="lead mt-3">
            Discover amazing products at great prices.
          </p>
          <Link to="/products" className="btn btn-dark">
            Shop Now
          </Link>
        </div>
      </section>
      <section className="container pb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1">Featured Products</h2>
            <p className="text-secondary mb-0">
              Discover our popular products
            </p>
          </div>
          <div className="d-flex gap-2">
            <button
              className={styles.sliderButton}
              onClick={() => moveSlider(-1)}
              aria-label="Scroll products left"
            >
              &#8249;
            </button>
            <button
              className={styles.sliderButton}
              onClick={() => moveSlider(1)}
              aria-label="Scroll products right"
            >
              &#8250;
            </button>
          </div>
        </div>
        <div className={styles.slider} ref={sliderRef}>
          {products.map((product) => (
            <Link
              to={`/products/${product.id}`}
              className={styles.productLink}
              key={product.id}
            >
              <div className={`card h-100 ${styles.productCard}`}>
                <div className={styles.imageBox}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className={styles.productImage}
                    loading="lazy"
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h3 className="h6 fw-bold">
                    {product.title}
                  </h3>
                  <p className="text-secondary small">
                    ⭐ {product.rating?.rate ?? 'N/A'} (
                    {product.rating?.count ?? 0} reviews)
                  </p>
                  <p className="fw-bold fs-5 mt-auto mb-0">
                    ${Number(product.price).toFixed(2)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  </>
  );
}