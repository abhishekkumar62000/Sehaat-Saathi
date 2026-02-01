import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Routers from "../routes/Routers";
import FloatingAIWidget from "../components/FloatingAIWidget";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Routers />
      </main>
      <FloatingAIWidget />
      <Footer />
    </>
  );
};

export default Layout;
