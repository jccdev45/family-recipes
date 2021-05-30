import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Hero } from "../../components/shared";
import Cook from "../../data/img/cooking.svg";
import { useAuth, useNav } from "../../util/contexts";

export function Home() {
  const { currentUser } = useAuth();
  const { isOpen, setIsOpen } = useNav();

  useEffect(() => {
    if (isOpen) setIsOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="grid w-full place-items-center">
      <Hero page="home" name="Welcome!" />
      <div className="flex flex-col lg:flex-row">
        <div className="order-1 w-full p-8 mx-auto text-lg lg:order-2 md:text-xl md:w-5/6 lg:w-1/2">
          <h2 className="p-4 mx-auto text-4xl font-bold text-center text-red-400 bg-gray-100 rounded-lg">
            Quickstart Guide
          </h2>
          <ul className="px-2 list-disc list-outside divide-y-2 lg:px-8">
            <li className="custom-list-item">
              <span>
                You can view all recipes through the Recipes link in the menu or
              </span>
              <Link to="/recipes" className="link">
                here.
              </Link>
            </li>
            <li className="custom-list-item">
              <span>To add a recipe, you'll first need</span>
              <Link
                to={`${currentUser ? `/recipes` : `/signup`}`}
                className="link"
              >
                an account.
              </Link>
              <span>
                If you're already signed in, the link will take you straight to
                the Recipes page.
              </span>
            </li>
            <li className="custom-list-item">
              To sign up, enter a valid email and password, after which you'll
              be prompted to enter some more info.
            </li>
            <li className="custom-list-item">
              <span>
                You may edit your profile info at any point by going to your
              </span>
              <Link
                to={currentUser ? `/user/${currentUser.uid}` : "/login"}
                className="link"
              >
                Profile
              </Link>
              <span>and clicking</span>
              <Link className="link" to="/update-profile">
                Update Profile
              </Link>
              <span>
                <span>at the bottom of the page.</span>
                <div className="p-2 text-center bg-gray-100 rounded-lg">
                  <span className="block font-bold text-red-400">Note:</span>
                  If you are not currently signed in, you will be redirected to
                  the Login page.
                </div>
              </span>
            </li>
            <li className="custom-list-item">
              Once you create a recipe, you may edit it through the "Edit
              Recipe" button at the bottom of its recipe detail page.
            </li>
            <li className="custom-list-item">
              <span>Questions?</span>
              <a href="mailto:jccdev45@gmail.com" className="link">
                Email me
              </a>
              <span>
                or call/text, should you have my telephonetic number. Thanks for
                reading 💖
              </span>
            </li>
          </ul>
        </div>
        <img
          src={Cook}
          alt="cooking person"
          className="order-2 w-5/6 mx-auto md:w-1/2 lg:w-1/3 xl:w-1/4 lg:order-1"
        />
      </div>
    </section>
  );
}
