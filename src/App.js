import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider, NavProvider } from "./util/contexts";
import { PrivateRoute } from "./components/auth";
import { Layout } from "./components/shared/Layout";
import { About } from "./screens/about";
import { ForgotPassword, Signup, Login } from "./screens/auth";
import { Home } from "./screens/home";
import { Profile, UpdateProfile } from "./screens/profile";
import {
  AddRecipe,
  RecipeDetails,
  Recipes,
  EditRecipe,
} from "./screens/recipes";
import { NotFound } from "./screens/404/NotFound";

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavProvider>
          <Layout>
            <Switch>
              {/* HOME */}
              <Route exact path="/" component={Home} />

              {/* ABOUT */}
              <Route path="/about" component={About} />

              {/* RECIPES */}
              <Route exact path="/recipes" component={Recipes} />
              <Route
                exact
                path="/recipes/:recipePath"
                component={RecipeDetails}
              />
              <PrivateRoute path="/new-recipe" component={AddRecipe} />
              <PrivateRoute path="/edit-recipe/:id" component={EditRecipe} />

              {/* PROFILE */}
              <Route exact path="/user/:id" component={Profile} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />

              {/* AUTH */}
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </NavProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
