import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./components/SignIn";
import Layout from "./layouts/Layout";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              {" "}
              <Home />{" "}
            </Layout>
          }
        />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
