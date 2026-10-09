import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './ProductDetails.module.css';
import { useCart } from '../CartContext/CartContext';

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {addToCart} = useCart();

  useEffect(() => {
    async function getProduct() {
      try {
        setLoading(true);
        setError(false);
        setProduct(null);

        const response = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error('Product not found');
        }

        const data = await response.json();

        if (!data || !data.id) {
          throw new Error('Invalid product data');
        }

        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h2>Product not found</h2>
        <p>We couldn't load this product. Please try again.</p>
        <Link to="/products" className="btn btn-dark">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <>
    <main className="container py-5">
      <Link to="/products" className="text-decoration-none">
        ← Back to Products
      </Link>

      <div className={`row g-5 align-items-center mt-3 ${styles.details}`}>
        <div className="col-12 col-md-6">
          <div className={styles.imageBox}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.productImage}
            />
          </div>
        </div>

        <div className="col-12 col-md-6">
          <span className="badge text-bg-light mb-3">
            {product.category}
          </span>

          <h1 className="fw-bold mb-3">{product.title}</h1>

          <p className="text-secondary">
            {product.description}
          </p>

          <p className="fs-3 fw-bold">
            ${Number(product.price).toFixed(2)}
          </p>

          <p>
            ⭐ {product.rating?.rate ?? 'N/A'} / 5
            <span className="text-secondary">
              {' '}({product.rating?.count ?? 0} reviews)
            </span>
          </p>

          <button
            type="button"
            className="btn btn-dark btn-lg mt-3"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
    </>
  );
}