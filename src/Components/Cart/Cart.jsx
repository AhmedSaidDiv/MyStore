import { Link } from 'react-router-dom';
import { useCart } from '../CartContext/CartContext';

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Your Cart Is Empty</h2>
        <p className="text-muted">
          You haven't added any products yet.
        </p>
        <Link to="/products" className="btn btn-dark">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Shopping Cart</h2>

      <div className="row g-4">
        <div className="col-lg-8">
          {cartItems.map((item) => (
            <div
              className="card mb-3 p-3"
              key={item.id}
            >
              <div className="row align-items-center g-3">
                <div className="col-4 col-md-3 text-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      maxWidth: '100px',
                      height: '100px',
                      objectFit: 'contain',
                    }}
                  />
                </div>

                <div className="col-8 col-md-9">
                  <h6>{item.title}</h6>

                  <p className="fw-bold mb-2">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <button
                      className="btn btn-outline-dark btn-sm"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity - 1
                        )
                      }
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      className="btn btn-outline-dark btn-sm"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>

                    <button
                      className="btn btn-danger btn-sm ms-md-2"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-4">
          <div className="card p-4">
            <h4>Order Summary</h4>

            <div className="d-flex justify-content-between my-3">
              <span>Total</span>
              <strong>${cartTotal.toFixed(2)}</strong>
            </div>

            <button
              className="btn btn-dark w-100"
              onClick={() =>
                alert('Checkout will be available soon!')
              }
            >
              Checkout
            </button>

            <Link
              to="/products"
              className="btn btn-outline-dark w-100 mt-2"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}