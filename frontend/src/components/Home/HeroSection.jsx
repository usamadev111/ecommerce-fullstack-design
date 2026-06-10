import React from "react";
import Container from "../common/Container";
import HeroBanner from "./HeroBanner";
import CategorySidebar from "./CategorySidebar";
import PromoCards from "./PromoCards";

const HeroSection = () => {
  return (
    <section className="mt-6 bg-gray-100 pt-6">
      <Container>
        <div className="grid grid-cols-12 gap-4 bg-white rounded-2xl border-2 border-gray-300 py-8 px-4 ">
          <CategorySidebar />

          <HeroBanner />

          <PromoCards />
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
