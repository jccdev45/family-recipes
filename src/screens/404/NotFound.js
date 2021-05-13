import { Link } from "react-router-dom";
import FourOhFour from "../../data/img/404.svg";
import { AuthContainer } from "../../components/auth";

export function NotFound() {
	return (
		<AuthContainer>
			<h1 className="text-3xl font-bold">w h o o p s</h1>
			<img
				src={FourOhFour}
				className="w-2/3 mx-auto"
				alt="404 page not found"
			/>
			<h2 className="text-xl">what are you doing here, beat it kid</h2>
			<Link to="/" className="text-blue-400 hover:underline">
				return from whence you came
			</Link>
		</AuthContainer>
	);
}