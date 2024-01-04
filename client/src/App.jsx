import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Layout from "./layouts/Layout";
import RegistrationLayout from "./layouts/RegistrationLayout";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./context/authContext";
function App() {
  return (
    <Router>
      <AuthProvider>
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
          <Route
            path="/signIn"
            element={
              <RegistrationLayout>
                {" "}
                <SignIn />
              </RegistrationLayout>
            }
          />
          <Route
            path="/signUp"
            element={
              <RegistrationLayout>
                {" "}
                <SignUp />
              </RegistrationLayout>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
