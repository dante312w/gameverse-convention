import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import Videojuegos from "../pages/Videojuegos";
import Torneos from "../pages/Torneos";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/videojuegos" element={<Videojuegos />} />
        <Route path="/torneos" element={<Torneos />} />
      </Route>
    </Routes>
  );
}
