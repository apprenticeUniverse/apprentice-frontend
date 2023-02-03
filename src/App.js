import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUserID, addUserInfo } from "./store/actions";

// import { i } from "mathjs";
import jwtDecode from "jwt-decode";
import api from "./API/baseURL";
import * as url from "./API/urls";

import Stakeholder from "./pages/DashboarStakeholder/Stakeholder";
import DashboardAdmin from "./pages/DashboardAdmin/DashboardAdmin";
import DashboardApprentice from "./pages/DashboardApprentice/DashboardApprentice";
import Login from "./pages/Login";
import Navbar from "./components/Dashboard/Navbar";
import "./styles/App.css";
import Loader from "./components/Loader";

//const useStyles = makeStyles(()=>({}));
const userID = "1";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useSelector((state) => state.userData);
  const userId = useSelector((state) => state.userId);
  const isLogged = useSelector((state) => state.isLogged);
  const tokenData = useSelector((state) => state.tokenData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = userInfo.role;

  useEffect(() => {
    if (!localStorage.getItem("SavedToken")) {
      navigate("/login");
    } else {
      setIsLoading(true);
      const logginData = jwtDecode(localStorage.getItem("SavedToken"));
      if (Date.now() >= logginData.exp * 1000) {
        localStorage.removeItem("SavedToken");
        navigate("/login");
      }
      api
        .get(url.getUserIdByEmail(logginData.sub))
        .then((response) => {
          dispatch(addUserID(response.data));
          api
            .get(url.getUserByID(response.data))
            .then((response) => {
              dispatch(addUserInfo(response.data));
              setIsLoading(false);
            })
            .catch((err) => {
              localStorage.removeItem("SavedToken");
              console.error(err);
            });
        })
        .catch((err) => {
          localStorage.removeItem("SavedToken");
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      <Navbar></Navbar>

      {role === "APPRENTICE" ? (
        <DashboardApprentice />
      ) : role === "ADMIN" || role === "SUPER_ADMIN" ? (
        <DashboardAdmin />
      ) : role === "STAKEHOLDER" ? (
        <Stakeholder></Stakeholder>
      ) : (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Login />} />
            </Routes>
          )}
        </>
      )}
    </>
  );
}

export default App;
