import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import GiveClasses from "./pages/GiveClasses/GiveClasses";
import HaveClasses from "./pages/HaveClasses/HaveClasses";
import EditProfile from "./pages/EditProfile/EditProfile";
import Home from "./pages/Home/Home";

const AppRoutes = () => {
return (
  <BrowserRouter>
    <Routes>
        <Route Component={LandingPage} path="/" />
        <Route Component={GiveClasses} path="/give-classes" />
        <Route Component={HaveClasses} path="/have-classes" />
        <Route Component={EditProfile} path="/edit-profile" />
        <Route Component={Home} path="/home" />
      </Routes>
  </BrowserRouter>
)}

export default AppRoutes