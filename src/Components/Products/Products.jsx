import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Products.module.css';
export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        setError(false);
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
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading products...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container py-5 text-center">
        <h3>Couldn't load products</h3>
        <p>Please check your internet connection and try again.</p>
        <button
          className="btn btn-dark"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }
  return (
   <>
    <main className="container py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Our Products</h1>
        <p className="text-secondary">
          Discover products selected for you.
        </p>
      </div>
  <div className="d-flex justify-content-center align-items-center gap-2 mb-4">
  <div style={{ width: '300px', maxWidth: '65%' }}>
    <input
      type="search"
      className="form-control"
      placeholder="Search products..."
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      aria-label="Search products"
    />
  </div>
  <div style={{ width: '110px' }}>
    <select
      className="form-select form-select-sm"
      value={category}
      onChange={(event) => setCategory(event.target.value)}
      aria-label="Filter by category"
    >
      <option value="all">All</option>
      <option value="electronics">Electronics</option>
      <option value="jewelery">Jewelery</option>
      <option value="men's clothing">Men</option>
      <option value="women's clothing">Women</option>
    </select>
  </div>
</div>
      <p className="text-secondary mb-3">
        Showing {filteredProducts.length} products
      </p>
      <div className="row g-4">
        {filteredProducts.map((product) => (
          <div
            className="col-12 col-sm-6 col-lg-4 col-xl-3"
            key={product.id}
          >
            <div className={`card h-100 ${styles.productCard}`}>
              <div className={styles.imageBox}>
                <img
                  src={product.image}
                  className={styles.productImage}
                  alt={product.title}
                  loading="lazy"
                />
              </div>
              <div className="card-body d-flex flex-column">
                <h2 className="h6 fw-bold">{product.title}</h2>
                <p className="text-secondary small">
                  ⭐ {product.rating?.rate ?? 'N/A'} (
                  {product.rating?.count ?? 0} reviews)
                </p>
                <p className="fs-5 fw-bold mt-auto">
                  ${Number(product.price).toFixed(2)}
                </p>
                <Link
                  to={`/products/${product.id}`}
                  className="btn btn-dark w-100"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p className="text-center py-5">
          No products found.
        </p>
      )}
    </main>
   </>
  );
}