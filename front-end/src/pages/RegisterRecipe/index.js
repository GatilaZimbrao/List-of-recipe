import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RegisterRecipeComponent from "../../components/RegisterRecipe";

export default function RegisterRecipe() {
  return (
    <section>
      <Header />
      <RegisterRecipeComponent />
      <Footer />
    </section>
  );
}
