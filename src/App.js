import AddRememberance from "./pages/AddRememberance";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MyRememberance from "./pages/MyRememberance";
import SearchRememberance from "./pages/SearchRememberance";
import { createBrowserHistory } from 'history';


export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL
});


function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<MyRememberance />} />
        <Route path="/add" element={<AddRememberance />} />
        <Route path="/search" element={<SearchRememberance />} />
      </Routes>
    </div>
  );
}

export default App;
