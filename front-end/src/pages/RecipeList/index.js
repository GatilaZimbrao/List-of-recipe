import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RecipeListComponent from "../../components/RecipeList";

// import UserHelper from "../../Helpers/UserHelper";

export default function RecipeList() {
  //   const user = UserHelper.getSession();
  //   if (user) window.location.href = "/";

  return (
    <section>
      <Header />
      <RecipeListComponent />
      <Footer />
    </section>
  );
}
