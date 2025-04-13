import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow px-4 py-6 bg-gray-100">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
};

export default App;
