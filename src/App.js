import "./App.css";
import React from "react";
import { Header } from "./components/Headers/Header";
import { BlogContent } from "./container/BlogContent";
import { Footer } from "./components/Footers/Footer";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import  LoginPage  from "./container/loginPage/LoginPage";

export function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/"  element={<BlogContent />}/> 
            <Route path="/login" element={<LoginPage/>}/>
          </Routes>
        </main>

        <Footer year={new Date().getFullYear()} />
      </div>
    </BrowserRouter>
  );
}
