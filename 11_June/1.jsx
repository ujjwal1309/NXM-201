import { Routes, Route } from "react-router-dom";

import About from "../pages/About";
import NotFound from "../pages/NotFound";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AllRoutes;

import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  
	// maintain isAuth state
	// login,logout function which updates isAuth state


  return (
    <AuthContext.Provider value={/*pass the values here*/}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;