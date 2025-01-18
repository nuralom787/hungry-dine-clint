import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Main from './Components/Main/Main'
import Home from './Components/Layouts/HomeLayouts/Home/Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />}>
            <Route path='/' element={<Home />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
