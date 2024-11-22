import React from "react";
import LoginNavbar from "../../components/navbar/LoginNavbar";
import LoginForm from "./LoginForm";
import Footer from "../../components/footer/Footer";

function LoginPage() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <LoginNavbar />
      </header>
      <main className="flex-grow-1 align-content-center bg-black">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}
export default LoginPage;
