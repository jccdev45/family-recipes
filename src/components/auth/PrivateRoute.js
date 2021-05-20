import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../util/contexts/AuthContext";

export function PrivateRoute({ component: Component, ...rest }) {
	const { currentUser, isAuthenticated } = useAuth();

	return (
		<Route
			{...rest}
			render={(props) => {
				return !isAuthenticated || !currentUser ? (
					<Redirect to="/login" />
				) : (
					<Component {...props} />
				);
			}}
		></Route>
	);
}
