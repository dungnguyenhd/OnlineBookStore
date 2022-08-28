import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from "./components/login.component";
import Register from "./components/register.component";
import About from "./pages/About";
import Footer from './components/Footer';
import HomeMain from './pages/Home';
import Header from './components/Header';
import Chef from './pages/Chef';
import Cashier from './pages/Cashier';
import Favorite from './pages/Favorite';
import Menu from "./pages/Menu";
import MainCourseMenu from "./pages/MainCourseMenu";
import SideDishMenu from "./pages/SideDishMenu";
import DessertMenu from "./pages/DessertMenu";
import DrinkMenu from "./pages/DrinkMenu";
import Services from "./pages/Services";
import Order from "./pages/Order";
import ManageBill from "./pages/ManageBill";
import Bill from "./pages/Bill"
import TableAddNew from './pages/AddNewTable';
import FoodAddNew from './pages/AddNewFood';
import Branches from './components/Branches';
import EmpDetail from './components/EmpDetail';
import EmpUpdate from './components/EmpUpdate';
import Employee from './components/addition/Employee';
import EmployeeDetail from './components/addition/Employee';
import TableStatusManage from './pages/TableStatusManage';
import ChangeTable from './pages/ChangeTable';
import Success from './pages/Success';
import Profile from './components/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route exact path="/*" element={<HomeMain />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route path="chef" element={<Chef />} />
        <Route path="cashier" element={<Cashier />} />
        <Route path="favorite" element={<Favorite />} />
        <Route path="bill/:id" element={<Bill />} />
        <Route path="addTable" element={<TableAddNew />} />
        <Route path="addFood" element={<FoodAddNew />} />
        <Route path="about" element={<About />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/ManageBill" element={<ManageBill />} />
        <Route path="/MainCourseMenu" element={<MainCourseMenu />} />
        <Route path="/SideDishMenu" element={<SideDishMenu />} />
        <Route path="/DessertMenu" element={<DessertMenu />} />
        <Route path="/DrinkMenu" element={<DrinkMenu />} />
        <Route path="/Services" element={<Services />} />
        <Route path="table/order/:totalPrice" element={<Order />} />
        <Route path="branches" element={<Branches />} />
        <Route path="detail/:branchId" element={<EmpDetail />} />
        <Route path="edit/:branchId" element={<EmpUpdate />} />
        <Route path="employee" element={<Employee />} />
        <Route path="employeedetail/:employeeId" element={<EmployeeDetail />} />
        <Route path="change" element={<TableStatusManage />} />
        <Route path="changetable/:id" element={<ChangeTable />} />
        <Route path="success" element={<Success />} />
      </Routes>
      <Footer />

    </BrowserRouter>
  </React.StrictMode>
);

serviceWorker.unregister();