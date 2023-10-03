import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import SeparateCoin from "../pages/SeparateCoin";
import Payment from "../pages/Payment";
import PurchaseConfirmation from "../pages/PurchaseConfirmation";
import PrivateRoutes from "./PrivateRoute";
import AccountDetails from "../pages/AccountDetails";
import EditProfile from "../pages/EditProfile";
import SellConfirmation from "../pages/SellConfirmation";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/coin/:coin_id" element={<SeparateCoin />} />
      <Route
        path="/payment"
        element={
          <PrivateRoutes>
            <Payment />
          </PrivateRoutes>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/user_profile"
        element={
          <PrivateRoutes>
            <Profile />
          </PrivateRoutes>
        }
      />
      <Route path="/purchase_confirmation" element={<PurchaseConfirmation />} />
      <Route path="/account_details" element={<AccountDetails />} />
      <Route path="/selling_confirmation" element={<SellConfirmation />} />
      <Route path="/edit_profile" element={<EditProfile />} />
    </Routes>
  );
};

export default AllRoutes;
