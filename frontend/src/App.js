import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar, { SidebarItem } from "./components/sidebar";
import {
  LayoutDashboard,
  BarChart3,
  UserCircle,
  Boxes,
  Package,
  Receipt,
} from "lucide-react";

// Lazy-loaded page components
const Dashboard = React.lazy(() => import("./pages/dashBoard"));
const Statistics = React.lazy(() => import("./pages/statistics"));
const Users = React.lazy(() => import("./pages/users"));
const Inventory = React.lazy(() => import("./pages/inventory"));
const Orders = React.lazy(() => import("./pages/orders"));
const Billings = React.lazy(() => import("./pages/billings"));

function App() {
  return (
    <Router>
      <div className="flex h-screen"> {/* Set full height */}
        {/* Static sidebar */}
        <Sidebar>
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            index={1}
            text="Homepage"
            to="/"
          />
          <SidebarItem
            icon={<BarChart3 size={20} />}
            index={2}
            text="Analytics"
            to="/statistics"
          />
          <SidebarItem
            icon={<Boxes size={20} />}
            index={3}
            text="Overall Data"
            to="/users"
          />
          <SidebarItem
            icon={<UserCircle size={20} />}
            index={4}
            text="Demo 1"
            to="/inventory"
          />
          <SidebarItem
            icon={<Package size={20} />}
            index={5}
            text="Demo 2"
            to="/orders"
          />
          
        </Sidebar>
        <div className="flex-1 p-1 overflow-y-auto" style={{ flex: 1 }}>
          {/* Scrollable content */}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/users" element={<Users />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/billings" element={<Billings />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
