import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Main from './Components/Main/Main'
import Home from './Components/Layouts/HomeLayouts/Home/Home'
import { HelmetProvider } from 'react-helmet-async'
import Menus from './Components/Layouts/MenuLayouts/Menus/Menus'
import OurShop from './Components/Layouts/OurShop/OurShop'
import Login from './Components/Layouts/Authentications/Login/Login'
import Register from './Components/Layouts/Authentications/Register/Register'
import AuthProvider from './Providers/AuthProvider'

function App() {

  return (
    <>
      <AuthProvider>
        <HelmetProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Main />}>
                <Route path='/' element={<Home />}></Route>
                <Route path='/menus' element={<Menus />}></Route>
                <Route path='/our-shop' element={<OurShop />}></Route>
                <Route path='/our-shop/:category' element={<OurShop />}></Route>
              </Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </AuthProvider>
    </>
  )
}

export default App
