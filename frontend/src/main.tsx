import ReactDOM from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.tsx'
import Home from './pages/Home.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter >
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}/>
    </Routes>


  </BrowserRouter>  



  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
)
