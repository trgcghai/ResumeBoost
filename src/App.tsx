import React from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow px-4 py-6 bg-gray-100"></main>
      <Footer />
    </div>
  );
};

export default App;
