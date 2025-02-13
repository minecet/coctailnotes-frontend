
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import AnonymousRoute from "./components/AnonymousRoute";
// core styles are required for all packages
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import RandomCocktails from "./pages/RandomCocktails";
import CocktailDetailsPage from "./pages/CocktailDetailsPage";
//import NotesComponent from "./components/NotesComponent";




function App() {
  return (
    <>

      {/* Spacer for Navbar */}
      <div className="h-20"></div>
      <div className="appContainer">
        <div className="mainAppContent">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
              path="/signup"
              element={
                <AnonymousRoute>
                  <SignupPage />
                </AnonymousRoute>
              }
            />
            <Route
              path="/login"
              element={
                <AnonymousRoute>
                  <LoginPage />
                </AnonymousRoute>
              }
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/cocktails"
              element={
                <PrivateRoute>
                  <RandomCocktails />
                </PrivateRoute>
              }
            />
            <Route
              path="/cocktails/:cocktailId"
              element={
                <PrivateRoute>
                  <CocktailDetailsPage />
                </PrivateRoute>
              }
            />


            <Route path="*" element={<h1>404 Page</h1>} />
          </Routes>

        </div>
        <Sidebar />
      </div>

    </>
  );
}

export default App;
