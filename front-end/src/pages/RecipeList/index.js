import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RecipeListComponent from "../../components/RecipeList";

export default function RecipeList() {
  return (
    <section>
      <Header />
      <RecipeListComponent />
      <Footer />
    </section>
  );
}
