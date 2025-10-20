import React from "react";

import LatestProducts from "../components/LatestProducts";
import FeaturedProducts from "../components/FeaturedProducts";
import HeroSwiper from "../components/HeroSwiper";

import CommonLayout from "../layouts/CommonLayout";

function Home() {
  return (
    <CommonLayout>
      <HeroSwiper />
      <div className="container">
        <section className="section-2 py-5">
          <LatestProducts />
        </section>
        <section className="section-2 py-5">
        </section>
      </div>
    </CommonLayout>
  );
}

export default Home;
