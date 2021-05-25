import { useEffect } from "react";
import { Hero } from "../../components/shared";
import { useNav } from "../../util/contexts";

export function About() {
  const { isOpen, setIsOpen } = useNav();

  useEffect(() => {
    return () => {
      if (isOpen) setIsOpen();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="grid w-full place-items-center">
      <Hero img="bg-hero-thanksgiving-sm" page="about" name="About" />
      <div className="flex flex-col p-2 divide-y-2 divide-black lg:p-8">
        <article className="grid w-full grid-cols-1 p-4 mx-auto md:w-5/6 lg:grid-cols-2">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/family-recipes-prod-aa82d.appspot.com/o/clarsons.png?alt=media&token=48b1904f-bbde-4888-aded-2d7843a62190"
            alt="Clarson Family"
            className="mx-auto bg-yellow-700 bg-opacity-50"
          />
          <div className="flex flex-col w-full p-8 bg-gray-100">
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
        </article>
        <article className="grid w-full grid-cols-1 p-4 mx-auto md:w-5/6 lg:grid-cols-2">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/family-recipes-prod-aa82d.appspot.com/o/correas.png?alt=media&token=8a82ec6e-e6de-41f2-ae29-4069ad26f30a"
            alt="Correa Family"
            className="mx-auto bg-gray-700 bg-opacity-50"
          />
          <div className="flex flex-col w-full p-8 bg-gray-100">
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
