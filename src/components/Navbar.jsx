// src/components/Navbar.js
import React, { useContext , useState , useEffect } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";
import { baseURL } from "../lib";

const Navbar = ({ cartItems }) => {
  const { user, Logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [userData , setUserData] = useState({})
  console.log(user)
  useEffect(() => {
    const getUserName = async () => {
      try {
        const response = await fetch(`${baseURL}/api/getUser`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user }),
        });
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          setUserData(data.userData);
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    getUserName();
  }, [user]); // Empty dependency array is fine now
  
  console.log(userData.name)
  
  const handleLogout = () => {
    Logout(); // Clear user data from context
    navigate('/login'); // Redirect to login page after logout
  };

  const cartItemCount = cartItems.length; // Calculate the number of items in the cart

  return (
    <div className="">
      <div className="flex content-center bg-customGreen pb-auto">
        <div className="flex items-center cursor-pointer ml-auto lg:ml-16">
          {/* <h3 className="text-md text-white font-bold opacity-[.70]">Agro Assist</h3> */}
          <img className="h-16 w-auto object-contain" src={logo} alt="Logo" />


        </div>
        <div className="flex-2 w-12/12 mx-auto">
          <ul className="flex m-6 items-around items-center">
            <li
              onClick={() => navigate("/")}
              className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 lg:ml-7 ml-6 mr-1.5"
            >
              Home
            </li>
            <li
              className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 ml-6 mr-1.5"
              onClick={() => navigate("/weatherAlerts")}
            >
              Weather Alerts
            </li>
            <li
              className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 ml-6 mr-1.5"
              onClick={() => navigate("/crop")}
            >
              Crop Recommendation
            </li>
            <li
              onClick={() => navigate("/fertilizer")}
              className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 ml-6 mr-1.5"
            >
              Fertilizer Recommendation
            </li>
            <li
              onClick={() => navigate("/diseaseIdentification")}
              className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 ml-6 mr-1.5"
            >
              Disease Prediction
            </li>
            <li
              onClick={() => navigate("/products")}
              className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 ml-6 mr-1.5"
            >
              Ecommerce Store
            </li>
            <li
              onClick={() => navigate("/RentalPage")}
              className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 ml-6 mr-1.5"
            >
              Rent Here
            </li>
            <li
              onClick={() => navigate("/cart")}
              className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 ml-6 mr-1.5"
            >
              Cart {cartItemCount > 0 && <span className="cart-count">({cartItemCount})</span>}
            </li>
            {!user ? (
              <>
                <li
                    onClick={() => navigate("/login")}
                    className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 ml-6 mr-1.5"
                  >
                    Login
                </li>
              </>
            ) : (
              <>
                <p className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 ml-6 mr-1.5">
                  Welcome, {userData.name}!
                </p>
                <li
                    onClick={handleLogout}
                    className="text-sm cursor-pointer font-semibold text-white hover:opacity-90 ml-6 mr-1.5"
                  >
                    Logout
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
