
//import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar.jsx'
///import Footer from '../Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext.jsx'



export default function Layout() {


  return <>
    <Navbar />
    <div className="container md:pt-12">

      <Outlet></Outlet>
    </div>
   
  </>
}
