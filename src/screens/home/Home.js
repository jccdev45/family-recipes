import { Hero } from "../../components/shared";

export function Home() {
	return (
		<section className="grid w-full place-items-center">
			<Hero img="bg-hero-family" name="Welcome!" />
			<div className="flex flex-col divide-y-2 divide-black">
				<article className="w-5/6 p-4 m-auto md:p-8 lg:w-2/3">
					<p className="md:text-xl">
						I dedicate this recipe collection to all my loved ones in my family.
						I would like to thank my husband and children for all their
						unconditional love. It is because of them I strive to be the best
						wife and mom I can be. I'd like to thank my grandparents for all
						their love and support for me and my family. I would like to thank
						my parents who gave me the foundation that I have to be a good
						parent and daughter. I would like to thank all of my aunts who mean
						the world to me. To all my cousins who are true and dear to my
						heart. To all of my aunts and uncles who are very special. You all
						mean so very much to me. I thought it would be a great idea to
						collect the recipes to the delicious food that we each know how to
						make. Food has a way of bringing people together. Our culture is
						tied into all of our recipes, with a nice twist. Enjoy them and
						remember the best is yet to come!
					</p>
					<h2 className="text-xl font-bold text-right">- Crystal</h2>
				</article>
				<article className="w-5/6 p-4 m-auto md:p-8 lg:w-2/3">
					<p className="md:text-xl">
						I had the idea to digitize the family recipe collection from a
						project week in school. We made a meal delivery service website and
						at some point the thought just crossed my mind to apply something
						like that to our recipes. It would be a lot easier to update and
						maintain over a paper version - like if I wanted to add a recipe,
						each person with a recipe book would need a paper copy. Now,
						everyone can make a profile, add and update their recipes with ease.
						Thank you to my wonderful cousin Crystal for first coming up with
						the recipe book idea. I hope you all enjoy!
					</p>
					<h2 className="text-xl font-bold text-right">- Jordan</h2>
				</article>
			</div>
		</section>
	);
}
