import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";


const AuthLayout = () => {
     return (
          <div>
               <Navbar></Navbar>
               <div className="">
                    <Outlet></Outlet>
               </div>
          </div>
     );
};

export default AuthLayout;