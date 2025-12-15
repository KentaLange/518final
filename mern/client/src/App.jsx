import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen w-full p-6">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
