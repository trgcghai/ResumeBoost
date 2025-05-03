import { Outlet } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import IntroduceHeader from "@/components/layout/IntroduceHeader";

const IntroduceLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <IntroduceHeader />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default IntroduceLayout;
