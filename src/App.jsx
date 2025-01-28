import { BrowserRouter, Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import './App.css'
import Main from './Components/Main/Main'
import Home from './Components/Layouts/HomeLayouts/Home/Home'
import Menus from './Components/Layouts/MenuLayouts/Menus/Menus'
import OurShop from './Components/Layouts/OurShop/OurShop'
import Login from './Components/Layouts/Authentications/Login/Login'
import Register from './Components/Layouts/Authentications/Register/Register'
import AuthProvider from './Providers/AuthProvider'
import PrivetRoute from './PrivetRoute/PrivetRoute'
import Cart from './Components/Layouts/Cart/Cart';
import Dashboard from './Components/Layouts/Dashboard/Dashboard/Dashboard';
import DashboardHome from './Components/Layouts/Dashboard/DashboardHome/DashboardHome';
import Reservation from './Components/Layouts/Dashboard/Reservation/Reservation';
import PaymentHistory from './Components/Layouts/Dashboard/PaymentHistory/PaymentHistory';
import Review from './Components/Layouts/Dashboard/Review/Review';
import Bookings from './Components/Layouts/Dashboard/Bookings/Bookings';

function App() {
  const queryClient = new QueryClient();


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ToastContainer />
          <HelmetProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Main />}>
                  <Route path='/' element={<Home />}></Route>
                  <Route path='/menus' element={<PrivetRoute><Menus /></PrivetRoute>}></Route>
                  <Route path='/our-shop' element={<OurShop />}></Route>
                  <Route path='/our-shop/:category' element={<OurShop />}></Route>
                </Route>
                <Route path='/dashboard' element={<Dashboard />}>
                  <Route path='/dashboard/home' element={<DashboardHome />}></Route>
                  <Route path='/dashboard/reservation' element={<Reservation />}></Route>
                  <Route path='/dashboard/payment-history' element={<PaymentHistory />}></Route>
                  <Route path='/dashboard/cart' element={<Cart />}></Route>
                  <Route path='/dashboard/review' element={<Review />}></Route>
                  <Route path='/dashboard/booking' element={<Bookings />}></Route>
                </Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
              </Routes>
            </BrowserRouter>
          </HelmetProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
