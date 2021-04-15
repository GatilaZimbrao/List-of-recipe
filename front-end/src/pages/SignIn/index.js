import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SignInComponent from "../../components/SignIn";
import UserHelper from "../../Helpers/UserHelper";

export default function SignIn() {
  const user = UserHelper.getSession();
  if (user) window.location.href = "/recipe-list";

  return (
    <section>
      <Header />
      <SignInComponent />
      <Footer />
    </section>
  );
}
