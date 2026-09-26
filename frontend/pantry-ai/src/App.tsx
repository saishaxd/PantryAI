import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pantry from "./pages/Pantry";
import SavedRecipes from "./pages/SavedRecipes";
import Recipe from "./pages/Recipe";
import RecipeSuggestions from "./pages/recipeSuggestions";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/pantry" element={<Pantry />} />
          <Route path="/suggestions" element={<RecipeSuggestions />} />
          <Route path="/saved" element={<SavedRecipes />} />
          <Route path="/recipe" element={<Recipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
