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
import { useEffect } from 'react';
import AdminHome from './Components/Layouts/Dashboard/AdminHome/AdminHome';
import AddItem from './Components/Layouts/Dashboard/AddItem/AddItem';
import ManageItem from './Components/Layouts/Dashboard/ManageItem/ManageItem';
import ManageBooking from './Components/Layouts/Dashboard/ManageBooking/ManageBooking';
import AllUsers from './Components/Layouts/Dashboard/AllUsers/AllUsers';
import AdminRoute from './AdminRoute/AdminRoute';
import UpdateItem from './Components/Layouts/Dashboard/UpdateItem/UpdateItem';
import Payment from './Components/Layouts/Dashboard/Payment/Payment';
import Invoice from './Components/Layouts/Dashboard/Invoice/Invoice';

function App() {
  const queryClient = new QueryClient();


  // Monitor Dark Mode.
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }, []);



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
                  <Route path='/menus' element={<Menus />}></Route>
                  <Route path='/our-shop' element={<OurShop />}></Route>
                  <Route path='/our-shop/:category' element={<OurShop />}></Route>
                </Route>
                <Route path='/dashboard' element={<Dashboard />}>
                  <Route path='/dashboard/admin-home' element={<AdminRoute><AdminHome /></AdminRoute>}></Route>
                  <Route path='/dashboard/add-item' element={<AdminRoute><AddItem /></AdminRoute>}></Route>
                  <Route path='/dashboard/manage-item' element={<AdminRoute><ManageItem /></AdminRoute>}></Route>
                  <Route path='/dashboard/manage-item/update-item/:title/:id' element={<AdminRoute><UpdateItem /></AdminRoute>}></Route>
                  <Route path='/dashboard/manage-booking' element={<AdminRoute><ManageBooking /></AdminRoute>}></Route>
                  <Route path='/dashboard/all-users' element={<AdminRoute><AllUsers /></AdminRoute>}></Route>
                  <Route path='/dashboard/home' element={<PrivetRoute><DashboardHome /></PrivetRoute>}></Route>
                  <Route path='/dashboard/reservation' element={<PrivetRoute><Reservation /></PrivetRoute>}></Route>
                  <Route path='/dashboard/payment-history' element={<PrivetRoute><PaymentHistory /></PrivetRoute>}></Route>
                  <Route path='/dashboard/cart' element={<PrivetRoute><Cart /></PrivetRoute>}></Route>
                  <Route path='/dashboard/review' element={<PrivetRoute><Review /></PrivetRoute>}></Route>
                  <Route path='/dashboard/booking' element={<PrivetRoute><Bookings /></PrivetRoute>}></Route>
                  <Route path='/dashboard/cart/payment' element={<PrivetRoute><Payment /></PrivetRoute>}></Route>
                  <Route path='/dashboard/invoice/:email/:trId' element={<PrivetRoute><Invoice /></PrivetRoute>}></Route>
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
