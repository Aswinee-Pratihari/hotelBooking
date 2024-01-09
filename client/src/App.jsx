import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Layout from "./layouts/Layout";
import RegistrationLayout from "./layouts/RegistrationLayout";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./context/authContext";
import ProtectedLayout from "./layouts/ProtectedLayout";
import ProtectedPage from "./pages/ProtectedPage";
import AddHotel from "./pages/AddHotel";
import { HotelProvider } from "./context/hotelContext";
function App() {
  return (
    <Router>
      <AuthProvider>
        <HotelProvider>
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
            <Route
              path="/addHotel"
              element={
                <ProtectedLayout>
                  <RegistrationLayout>
                    <AddHotel />
                  </RegistrationLayout>
                </ProtectedLayout>
              }
            />
          </Routes>
        </HotelProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
