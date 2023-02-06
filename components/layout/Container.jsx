import Header from "./Header";
import Footer from "./Footer";

export default function Container({ children }) {
  return (
    <>
      <Header />
      { children }
      <Footer />
    </>
  )
}