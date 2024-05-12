import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/headers/Navbar'
import Footer from './components/headers/Footer'

import Profile from './pages/Profile'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

import { TaskProvider } from './context/TaskContext'

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="task-list" element={<TaskList />} /> */}
        </Routes>

        <Footer />
      </BrowserRouter>
    </TaskProvider>
  )
}

export default App
