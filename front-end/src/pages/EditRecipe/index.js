import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EditRecipeComponent from "../../components/EditRecipe";

export default function EditRecipe({ match }) {
  return (
    <section>
      <Header />
      <EditRecipeComponent id={match.params.id} />
      <Footer />
    </section>
  );
}
