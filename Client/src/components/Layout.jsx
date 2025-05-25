import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "64px" }}>{children}</main>
    </>
  );
};

export default Layout;
