import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../util/contexts/AuthContext";

export function PrivateRoute({ component: Component, ...rest }) {
	const { currentUser, isAuthenticated } = useAuth();

	return (
		<Route
			{...rest}
			render={(props) => {
				return currentUser || isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				);
			}}
		></Route>
	);
}
