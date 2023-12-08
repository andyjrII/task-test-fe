import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import EditUser from "./pages/EditUser";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/edit' element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
