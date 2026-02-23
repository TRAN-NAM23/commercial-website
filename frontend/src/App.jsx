 import {useState} from 'react'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Category from './pages/Category.jsx';
import LogIn from './pages/Account/LogIn.jsx';
import Register from './pages/Account/Register.jsx';
import ProductDetail  from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx"
// import Admin from "./pages/Admin.jsx"
import FloatingButtons from './components/FloatingButtons.jsx';
import PopUp from './components/PopUp.jsx'; 
import './App.css'

function App() {

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [PopUpTab, setPopUpTab] = useState('login'); 

  const openPopUpModal = (tab) => {
    console.log("Đã click nút! Tab:", tab);
    setPopUpTab(tab);
    setIsPopUpOpen(true);
  };

  return (
    <>
      <Header openPopUp={openPopUpModal}/>
      
      <div className="container">
          {/* Routes chỉ chứa Route */}
          <Routes>
            <Route path='/' element ={<Home />}/> 
            <Route path='/Category' element = {<Category/>} />
            <Route path='/ProductDetail/:id' element = {<ProductDetail />} />   
            <Route path='/LogIn' element = {<LogIn />} />   
            <Route path='/Register' element = {<Register />} />   
            <Route path='/Cart' element = {<Cart />} />   
          </Routes>
      </div>

      {/* PopUp nằm ngoài Routes */}
      <PopUp 
          isOpen={isPopUpOpen}
          onClose={() => setIsPopUpOpen(false)}
          initialTab={PopUpTab} 
      />

      <FloatingButtons />
      <Footer />
    </>
  )
} 

export default App

