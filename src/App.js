import AddRememberance from "./pages/AddRememberance";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MyRememberance from "./pages/MyRememberance";

function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<MyRememberance />} />
        <Route path="/add" element={<AddRememberance />} />
      </Routes>
    </div>
  );
}

export default App;
