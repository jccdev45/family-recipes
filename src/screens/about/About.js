import { useEffect } from "react";
import { Hero } from "../../components/shared";
import { useNav } from "../../util/contexts";

export function About() {
  const { isOpen, setIsOpen } = useNav();

  useEffect(() => {
    if (isOpen) setIsOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="text-gray-600 ">
      <Hero img="bg-hero-thanksgiving-sm" page="about" name="About" />
      <div className="container flex flex-col items-center px-6 py-16 mx-auto md:flex-row">
        <div className="w-5/6 mb-10 lg:max-w-sm lg:w-full md:w-1/2 md:mb-0">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/family-recipes-prod-aa82d.appspot.com/o/clarsons.png?alt=media&token=48b1904f-bbde-4888-aded-2d7843a62190"
            alt="Clarson Family"
            className="mx-auto bg-yellow-700 bg-opacity-50"
          />
        </div>
        <div className="flex flex-col items-center text-center lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 md:items-start md:text-left">
          <h1 className="mb-4 text-3xl font-medium text-gray-900 title-font sm:text-4xl">
            I dedicate this <br className="hidden lg:inline-block" /> recipe
            collection...
          </h1>
          <p className="mb-8 leading-relaxed">
            to all my loved ones in my family. I would like to thank my husband
            and children for all their unconditional love. It is because of them
            I strive to be the best wife and mom I can be. I'd like to thank my
            grandparents for all their love and support for me and my family. I
            would like to thank my parents who gave me the foundation that I
            have to be a good parent and daughter. I would like to thank all of
            my aunts who mean the world to me. To all my cousins who are true
            and dear to my heart. To all of my aunts and uncles who are very
            special. You all mean so very much to me. I thought it would be a
            great idea to collect the recipes to the delicious food that we each
            know how to make. Food has a way of bringing people together. Our
            culture is tied into all of our recipes, with a nice twist. Enjoy
            them and remember the best is yet to come!
          </p>
          <h2 className="ml-auto text-xl font-bold text-right">- Crystal</h2>
        </div>
      </div>
      <div className="container flex flex-col items-center px-6 py-16 mx-auto md:flex-row">
        <div className="flex flex-col items-center mb-16 text-center lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0">
          <h1 className="mb-4 text-3xl font-medium text-gray-900 title-font sm:text-4xl">
            I had the idea <br className="hidden lg:inline-block" />
            to digitize...
          </h1>
          <p className="mb-8 leading-relaxed">
            the family recipe collection from a project week in school. We made
            a meal delivery service website and at some point the thought just
            crossed my mind to apply something like that to our recipes. It
            would be a lot easier to update and maintain over a paper version -
            like if I wanted to add a recipe, each person with a recipe book
            would need a paper copy. Now, everyone can make a profile, add and
            update their recipes with ease. Thank you to my wonderful cousin
            Crystal for first coming up with the recipe book idea. I hope you
            all enjoy!
          </p>
          <h2 className="ml-auto text-xl font-bold text-right">- Jordan</h2>
        </div>
        <div className="order-first w-5/6 mb-10 md:order-last lg:max-w-lg lg:w-full md:w-1/2 md:mb-0">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/family-recipes-prod-aa82d.appspot.com/o/correas.png?alt=media&token=8a82ec6e-e6de-41f2-ae29-4069ad26f30a"
            alt="Correa Family"
            className="mx-auto bg-gray-700 bg-opacity-50"
          />
        </div>
      </div>
    </section>
  );
}
