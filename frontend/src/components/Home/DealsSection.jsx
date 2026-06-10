import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DealProductCard from "./DealProductCard.jsx";

import { fetchFeaturedProducts } from "../../features/productSlice.js";

import Container from "../common/Container.jsx";

function DealsSection() {
  const dispatch = useDispatch();

  const { featuredProducts, loading, error } = useSelector(
    (state) => state.products,
  );

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <Container>
        <p>Loading featured products...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p>{error}</p>
      </Container>
    );
  }

  return (
    <section className="mt-8">
      <Container>
        <div className="grid grid-cols-6 border">
          {/* Left Side */}

          <div className="border-r p-6">
            <h2 className="font-bold">Deals & Offers</h2>

            <p className="text-sm text-gray-500">Featured Products</p>
          </div>

          {/* Products */}

          {featuredProducts.map((product) => (
            <DealProductCard key={product._id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default DealsSection;
