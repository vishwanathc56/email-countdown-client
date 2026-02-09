import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountdownApp from "./components/CountdownApp";
import Login from "./Pages/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/countdown"
          element={
            <PrivateRoute>
              <CountdownApp />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
