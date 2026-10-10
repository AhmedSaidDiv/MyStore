import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 export default function Checkout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    // عرض تأكيد مبدئي للطلب
    alert('Your order has been placed successfully!');
    navigate('/');
  }
  return (
    <div className="container py-5">
      <h2 className="mb-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '600px' }}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label">City</label>
          <input
            type="text"
            name="city"
            className="form-control"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-dark w-100">
          Place Order
        </button>
      </form>
    </div>
  );
}
