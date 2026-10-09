import { Link } from 'react-router-dom';

 export default function NotFound() {
  return (
    <div className="container text-center py-5">
      <h1 className="display-1 fw-bold text-primary">
        404
      </h1>

      <h2 className="mb-3">Page Not Found!</h2>

      <p className="text-muted mb-4">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}