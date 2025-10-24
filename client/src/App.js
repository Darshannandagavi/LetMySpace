
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';
import React from 'react'; 
import { Route, Routes } from 'react-router-dom';
import { GuestLayout } from './components/guestLayout/GuestLayout';
import Home from './components/guestLayout/Home';
import About from './components/guestLayout/About';
import Contact from './components/guestLayout/Contact';
import Register from './components/guestLayout/Register';
import Login from './components/guestLayout/Login';
import UserLayout from './components/userLayout/UserLayout';
import ChangePassword from './components/userLayout/ChangePassword';
import AdminLay from './components/adminLayout/AdminLay';
import Services from './components/guestLayout/Services';
import Categories from './components/userLayout/Categories';
import PropertyUploader from './components/userLayout/PropertyUploader';
import SubCategories from './components/userLayout/SubCategories';
import UserHome from './components/userLayout/UserHome';
import ContentManagement from './components/adminLayout/ContentManagement';
import Dashboard from './components/adminLayout/Dashboard';
import MyProperties from './components/userLayout/MyProperties';
import Feedback from './components/adminLayout/Feedback';
import AllUsers from './components/adminLayout/AllUsers';
import AllAdmins from './components/adminLayout/AllAdmins';
import PageNotFound from './components/PageNotFound';
import FluidAnimation from './components/CustomStyles/FluidAnimation';

function App() {
  return (
    <div>
      <Routes>

        <Route path='/' element={<GuestLayout/>}>
        <Route path='home' element={<Home/>}></Route>
        <Route index element={<Home/>}></Route>
        <Route path='about' element={<About/>}></Route>
        <Route path='contact' element={<Contact/>}></Route>;
        <Route path='register' element={<Register/>}></Route>
        <Route path='login' element={<Login/>}></Route>
        <Route path='services' element={<Services/>}></Route>
        </Route>


        
        <Route path='/User' element={<UserLayout/>}>
        <Route path='userhome' element={<UserHome/>}></Route>
        <Route path='propertyUploader' element={<PropertyUploader/>}/>
        <Route path='uploadedProperties' element={<MyProperties/>}/>
        <Route path='category' element={<Categories/>}></Route>
        <Route path='subcategory' element={<SubCategories/>}></Route>
        <Route path='changepassword' element={<ChangePassword/>}></Route>
        </Route>



        <Route path='/admin' element={<AdminLay/>}>
        <Route path='feedback' element={<Feedback/>}/>
        <Route path='dashboard' element={<Dashboard/>}></Route>    
        <Route path='contentmanagement' element={<ContentManagement/>}></Route> 
        <Route path='users' element={<AllUsers/>}></Route>        
        <Route path='admins' element={<AllAdmins/>}></Route>               
        </Route>
        <Route path='*' element={<PageNotFound/>}></Route>
      </Routes>
    </div>
  );
}


export default App;