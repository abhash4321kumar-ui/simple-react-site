import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Productpage from './pages/Productpage'
import Productdetailpage from './pages/Productdetailpage'
import Cartdrawer from './components/Cartdrawer'
 
const App = () => {
  return (
    <div>
      <Navbar />
     <Cartdrawer />
 
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/products' element={<Productpage />} />
        <Route path='/products/:urlvalue' element={<Productdetailpage />} />
      </Routes>
 
      <Footer />
    </div>
  )
}
 

export default App