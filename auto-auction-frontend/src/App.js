import AppRouter from "components/AppRouter";
import Footer from "components/Footer";
import { NavBar } from "components/NavBar";
import { AuthContext } from "context/context";
import "index.css";
import "styles/image-gallery.css";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [authUser, setAuthUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  return (
    <div className="bg-gray-50 !font-raleway">
      <AuthContext.Provider
        value={{
          authUser,
          setAuthUser,
        }}
      >
        <BrowserRouter>
          <NavBar />
          <div className="px-5 min-h-[75vh]">
            <AppRouter />
          </div>
          <Footer />
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
