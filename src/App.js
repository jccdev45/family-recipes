import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./util/contexts/AuthContext";
import { PrivateRoute } from "./components/auth";
import { Layout } from "./components/shared/Layout";
import { ForgotPassword, Signup, Login } from "./screens/auth";
import { Home } from "./screens/home";
import { Profile, UpdateProfile } from "./screens/profile";
import { RecipeDetails, Recipes } from "./screens/recipes";

function App() {
	return (
		<Router>
			<AuthProvider>
				<Layout>
					<Switch>
						{/* HOME */}
						<Route exact path="/" component={Home} />
            {/* RECIPES */}
            <Route exact path="/recipes" component={Recipes} />
            <Route exact path="/recipes/:recipePath" component={RecipeDetails} />
						{/* PROFILE */}
						<PrivateRoute path="/user" component={Profile} />
						<PrivateRoute path="/update-profile" component={UpdateProfile} />
						{/* AUTH */}
						<Route path="/signup" component={Signup} />
						<Route path="/login" component={Login} />
						<Route path="/forgot-password" component={ForgotPassword} />
					</Switch>
				</Layout>
			</AuthProvider>
		</Router>
	);
}

export default App;
