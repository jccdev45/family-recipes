import { Hero } from "../../components/shared";
import Clarsons from "../../assets/img/clarsons.png";
import Correas from "../../assets/img/correas.png";

export function Home() {
	return (
		<section className="grid w-full place-items-center">
			<Hero img="bg-hero-family" name="Welcome!" />
			<div className="flex flex-col p-2 divide-y-2 divide-black lg:p-8">
				<article className="flex flex-col w-full p-4 lg:flex-row">
					<div className="flex flex-col w-full p-8 bg-gray-100 rounded-lg lg:rounded-br-none lg:rounded-tr-none lg:rounded-tl-lg lg:rounded-bl-lg lg:w-3/4">
						<p className="my-auto text-justify md:text-xl">
							I dedicate this recipe collection to all my loved ones in my
							family. I would like to thank my husband and children for all
							their unconditional love. It is because of them I strive to be the
							best wife and mom I can be. I'd like to thank my grandparents for
							all their love and support for me and my family. I would like to
							thank my parents who gave me the foundation that I have to be a
							good parent and daughter. I would like to thank all of my aunts
							who mean the world to me. To all my cousins who are true and dear
							to my heart. To all of my aunts and uncles who are very special.
							You all mean so very much to me. I thought it would be a great
							idea to collect the recipes to the delicious food that we each
							know how to make. Food has a way of bringing people together. Our
							culture is tied into all of our recipes, with a nice twist. Enjoy
							them and remember the best is yet to come!
						</p>
						<h2 className="text-xl font-bold text-right">- Crystal</h2>
					</div>
					{Clarsons ? (
						<img
							src={Clarsons}
							alt=""
							className="w-full mx-auto my-2 rounded-lg lg:my-0 md:w-1/2 lg:w-1/4 lg:rounded-tl-none lg:rounded-bl-none lg:rounded-br-lg lg:rounded-tr-lg"
						/>
					) : (
						<div className="w-1/4 bg-gray-200"></div>
					)}
				</article>
				<article className="flex flex-col w-full p-4 lg:flex-row">
					<img
						src={Correas}
						alt=""
						className="order-2 w-full mx-auto my-2 rounded-lg md:w-2/3 lg:w-1/3 lg:my-0 lg:rounded-bl-lg lg:rounded-br-none lg:rounded-tr-none lg:rounded-tl-lg"
					/>
					<div className="flex flex-col order-1 w-full p-8 bg-gray-100 rounded-lg lg:rounded-tl-none lg:rounded-bl-none lg:rounded-tr-lg lg:rounded-br-lg lg:w-3/4 lg:order-2">
						<p className="my-auto text-justify md:text-xl">
							I had the idea to digitize the family recipe collection from a
							project week in school. We made a meal delivery service website
							and at some point the thought just crossed my mind to apply
							something like that to our recipes. It would be a lot easier to
							update and maintain over a paper version - like if I wanted to add
							a recipe, each person with a recipe book would need a paper copy.
							Now, everyone can make a profile, add and update their recipes
							with ease. Thank you to my wonderful cousin Crystal for first
							coming up with the recipe book idea. I hope you all enjoy!
						</p>
						<h2 className="text-xl font-bold text-right">- Jordan</h2>
					</div>
				</article>
			</div>
		</section>
	);
}
