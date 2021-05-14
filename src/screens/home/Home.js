import { Link } from "react-router-dom";
import { Hero } from "../../components/shared";
import { LINK_BASE, LIST_ITEM } from "../../data/constants/general_const";
import Cook from "../../data/img/cooking.svg";
import { useAuth } from "../../util/contexts/AuthContext";

export function Home() {
	const { currentUser } = useAuth();

	return (
		<section className="grid w-full place-items-center">
			<Hero img="bg-hero-family-sm" page="home" name="Welcome!" />
			<div className="flex flex-col lg:flex-row">
				<div className="order-1 w-full p-8 mx-auto text-lg lg:order-2 md:text-xl md:w-5/6 lg:w-1/2">
					<h2 className="p-4 mx-auto text-4xl font-bold text-center text-red-400 bg-gray-100 rounded-lg">
						Quickstart Guide
					</h2>
					<ul className="px-2 list-disc list-outside divide-y-2 lg:px-8">
						<li className={LIST_ITEM}>
							<span>
								You can view all recipes through the Recipes link in the menu or
							</span>
							<Link to="/recipes" className={LINK_BASE}>
								here.
							</Link>
						</li>
						<li className={LIST_ITEM}>
							<span>To add a recipe, you'll first need</span>
							<Link
								to={`${currentUser ? `/recipes` : `/signup`}`}
								className={LINK_BASE}
							>
								an account.
							</Link>
							<span>
								If you're already signed in, the link will take you straight to
								the Recipes page.
							</span>
						</li>
						<li className={LIST_ITEM}>
							To sign up, enter a valid email and password, after which you'll
							be prompted to enter some more info.
						</li>
						<li className={LIST_ITEM}>
							<span>
								You may edit your profile info at any point by going to your
							</span>
							<Link
								to={currentUser ? `/user/${currentUser.uid}` : "/login"}
								className={LINK_BASE}
							>
								Profile
							</Link>
							<span>and clicking</span>
							<Link className={LINK_BASE} to="/update-profile">
								Update Profile
							</Link>
							<span>
								<span>at the bottom of the page.</span>
								<div className="p-2 text-center bg-gray-100 rounded-lg">
									<span className="block font-bold text-red-400 lg:inline">
										Note:
									</span>
									If you are not currently signed in, you will be redirected to
									the Login page.
								</div>
							</span>
						</li>
						<li className={LIST_ITEM}>
							Once you create a recipe, you may edit it through the "Edit
							Recipe" button at the bottom of its recipe detail page.
						</li>
						<li className={LIST_ITEM}>
							Questions? Get in touch with me
							<a href="mailto:jccdev45@gmail.com" className={LINK_BASE}>
								here.
							</a>
						</li>
					</ul>
				</div>
				<img
					src={Cook}
					alt="cooking person"
					className="order-2 w-5/6 mx-auto md:w-1/2 lg:w-1/3 lg:order-1"
				/>
			</div>
		</section>
	);
}
