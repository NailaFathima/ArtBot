import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import { Home, CreatePost } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
    <div className="animated-gradient min-h-screen">
      <header className="w-full flex justify-between place-items-center sm:px-8 px-4 py-4 hover:bg-[#a865b5] hover:shadow-lg transition duration-300">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <Link
          to="/createPost"
          className="font-inter font-large text-white px-4 py-2 rounded-md hover:bg-black hover:shadow-lg transition duration-300"
        >
          Create
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full ">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/createPost" element={<CreatePost />} />
        </Routes>
      </main>
      </div>
      <footer className="bg-[#703e7f] text-white text-center py-4">
      <div className="container mx-auto">
        <p>&copy; 2024 ArtBot. All rights reserved.</p>
      </div>
    </footer>
    </BrowserRouter>
  );
};

export default App;
