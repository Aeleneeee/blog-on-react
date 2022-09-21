import "./App.css";
import React, {useState} from "react";
import { Header } from "./components/Headers/Header";
import { BlogContent } from "./container/BlogContent";
import { Footer } from "./components/Footers/Footer";
import LoginPage from "./components/loginPage/LoginPage";


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";




export function App() {

  const [isLog, setIsLog] = useState(() => {
    if (localStorage.getItem('setIsLog') === 'true') return true
    return false
  });

  const [userName,setUserName ] = useState(() => {
    if((localStorage.getItem('UserName'))) return localStorage.getItem('UserName')
    return ''
  })

  
  return (
    <BrowserRouter>
    
        <Header isLog={isLog} setIsLog={setIsLog} userName={userName}/>
        <div className="App">
        <main>
          <Routes>
            <Route path="/"  element={<BlogContent />}/> 
            <Route path="/login" element={<LoginPage isLog={isLog} setIsLog={setIsLog} userName={userName} setUserName={setUserName}/>}/>
          </Routes>
        </main>

        <Footer year={new Date().getFullYear()} />
      </div>
    </BrowserRouter>
  );
}
