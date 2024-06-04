import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import GiveClasses from "./pages/GiveClasses/GiveClasses";

const AppRoutes = () => {
return (
  <BrowserRouter>
    <Routes>
        <Route Component={Home} path="/" />
        <Route Component={Home} path="/study" />
        <Route Component={GiveClasses} path="/give-classes" />
      </Routes>
  </BrowserRouter>
)}

export default AppRoutes