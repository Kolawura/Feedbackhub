import { Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./Components/Navbar";
import FeedbackList from "./Pages/Feedback";
import FeedbackDetail from "./Components/Feedbacks/[id]";
import Login from "./Pages/Login";
import { Register } from "./Pages/Register";

const App = () => {
  return (
    <div className="flex font-outfit">
      <Sidebar />
      <div className="flex-1 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/feedback" element={<FeedbackList />} />
            <Route path="/feedback/:id" element={<FeedbackDetail />} />
            <Route path="/settings" element={<div>Settings Page</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
