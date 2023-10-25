import Navbar from "./components/Navbar";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/inscription" element={<SignUp />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
