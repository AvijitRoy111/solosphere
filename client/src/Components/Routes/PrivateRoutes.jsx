import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";


const PrivateRoutes = ({children}) => {
     const {user, loading} =useContext(AuthContext);
     
     return (
          <div>
               
          </div>
     );
};

export default PrivateRoutes;