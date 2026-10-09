 export default function About() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">About MyStore</h1>
        <p className="text-muted">
          Your favorite place to shop online.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm p-4">
            <h3 className="mb-3">Who We Are</h3>
            <p>
              MyStore is a simple online shopping website built
              with React and Bootstrap. Our goal is to make
              browsing products easy and enjoyable.
            </p>

            <h3 className="mb-3 mt-3">What We Offer</h3>
            <p>
              Explore a variety of products, view product details,
              and add your favorite items to your shopping cart.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

