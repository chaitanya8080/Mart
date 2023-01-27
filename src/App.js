import './App.css';
import Navbar from './Components/Navbar';
import { Route, Routes } from "react-router-dom";
import Products from './Components/Pages/Products';
import Wishlist from './Components/Pages/Wishlist';

function App() {
  return (
    <div className="App">
        <Navbar/>
     <Routes> 
        <Route path="/" element={<Products/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
      </Routes>
    </div>
  );
}

export default App;
