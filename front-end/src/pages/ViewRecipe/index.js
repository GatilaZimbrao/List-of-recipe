import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ViewRecipeComponent from "../../components/ViewRecipe";
export default function ViewRecipe({ match }) {
  return (
    <section>
      <Header />
      <ViewRecipeComponent id={match.params.id} />
      <Footer />
    </section>
  );
}
