import { useState } from 'react'

import viteLogo from '/vite.svg'
import './App.css'
import Nav from './components/Nav'
import Home from './components/Home'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import NoPage from './components/NoPage'
import Card from './components/Card'
import Create from './components/Create'
import Update from './components/Update'
import Sample from './components/Sample'
function App() {
  const [count, setCount] = useState(0)
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className='bg-gray-100 h-[100vh] overflow-auto overflow-x-hidden '>
      <BrowserRouter>

      <Nav collapsed={collapsed} setCollapsed={setCollapsed} toggleCollapse={toggleCollapse} />
        <div className='ml-[80px] mt-[120px] '>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/Card/:id" element={<Card />} />

            <Route path="/Create" element={<Create />} />

            <Route path="/Sample" element={<Sample />} />

            <Route path="/Update/:id" element={<Update />} />

            <Route path="*" element={<NoPage />} />

          </Routes>

        </div>
      </BrowserRouter>


    </div>
  )
}

export default App
