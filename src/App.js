import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./components/auth";
import { AuthProvider } from "./contexts/AuthContext";
import { ForgotPassword, Signup, Login } from "./screens/auth";
import { Profile, UpdateProfile } from "./screens/profile";

function App() {
	return (
		<div className="container flex items-center justify-center min-h-screen mx-auto">
			<Router>
				<AuthProvider>
					<Switch>
						{/* PROFILE */}
						<PrivateRoute path="/user" component={Profile} />
						<PrivateRoute path="/update-profile" component={UpdateProfile} />

						{/* AUTH */}
						<Route path="/signup" component={Signup} />
						<Route path="/login" component={Login} />
						<Route path="/forgot-password" component={ForgotPassword} />
					</Switch>
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;
