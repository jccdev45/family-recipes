import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Hero } from "../../components/shared";
import Cook from "../../data/img/cooking.svg";
import { ReactComponent as Book } from "../../data/img/open-book.svg";
import { ReactComponent as Edit } from "../../data/img/edit.svg";
import { ReactComponent as Plus } from "../../data/img/plus.svg";
import { useAuth, useNav } from "../../util/contexts";
import Image from "rc-image";

export function Home() {
  const { currentUser } = useAuth();
  const { isOpen, setIsOpen } = useNav();

  useEffect(() => {
    if (isOpen) setIsOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="text-gray-600">
      <Hero page="home" name="Welcome!" />
      <div className="container flex flex-wrap px-5 py-12 mx-auto">
        <div className="flex flex-wrap w-full">
          <Image
            placeholder
            src={Cook}
            alt="cooking person"
            className="order-last w-5/6 mx-auto mt-10 md:w-1/3 lg:w-1/2 lg:max-w-md md:mt-0 lg:order-first"
          />
          <div className="md:w-1/2 md:pr-10 md:py-6">
            <div className="relative flex pb-12">
              <div className="absolute inset-0 flex items-center justify-center w-10 h-full">
                <div className="w-1 h-full bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="relative z-10 inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-white bg-indigo-500 rounded-full">
                <Book className="transform scale-[.65] fill-white" />
              </div>
              <div className="flex-grow pl-4">
                <h2 className="mb-1 text-sm font-medium tracking-wider text-gray-900 uppercase title-font">
                  You can
                </h2>
                <p className="leading-relaxed">
                  view the Recipes page through the menu link up top or{" "}
                  <Link to="/recipes" className="mx-0 link">
                    here
                  </Link>{" "}
                  if you're lazy.
                </p>
              </div>
            </div>
            <div className="relative flex pb-12">
              <div className="absolute inset-0 flex items-center justify-center w-10 h-full">
                <div className="w-1 h-full bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="relative z-10 inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-white bg-indigo-500 rounded-full">
                <Plus className="transform scale-50 fill-white" />
              </div>
              <div className="flex-grow pl-4">
                <h2 className="mb-1 text-sm font-medium tracking-wider text-gray-900 uppercase title-font">
                  To add
                </h2>
                <p className="leading-relaxed">
                  a recipe, you'll need to create an{" "}
                  <Link
                    to={`${currentUser ? `/recipes` : `/signup`}`}
                    className="mx-0 link"
                  >
                    an account
                  </Link>{" "}
                  or{" "}
                  <Link
                    to={`${currentUser ? `/recipes` : `/login`}`}
                    className="mx-0 link"
                  >
                    login
                  </Link>{" "}
                  if you have one already.
                </p>
              </div>
            </div>
            <div className="relative flex pb-12">
              <div className="absolute inset-0 flex items-center justify-center w-10 h-full">
                <div className="w-1 h-full bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="relative z-10 inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-white bg-indigo-500 rounded-full">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="flex-grow pl-4">
                <h2 className="mb-1 text-sm font-medium tracking-wider text-gray-900 uppercase title-font">
                  On sign up,
                </h2>
                <p className="leading-relaxed">
                  first enter a valid email/password and then on the following
                  screen, you'll add some more profile info. In case you need to
                  change anything, click{" "}
                  <Link to="/update-profile" className="mx-0 link">
                    Update Profile
                  </Link>{" "}
                  at the bottom of your{" "}
                  <Link
                    to={currentUser ? `/user/${currentUser.uid}` : "/login"}
                    className="mx-0 link"
                  >
                    Profile
                  </Link>{" "}
                  page.
                </p>
              </div>
            </div>
            <div className="relative flex pb-12">
              <div className="absolute inset-0 flex items-center justify-center w-10 h-full">
                <div className="w-1 h-full bg-gray-200 pointer-events-none"></div>
              </div>
              <div className="relative z-10 inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-white bg-indigo-500 rounded-full">
                <Edit className="transform scale-50 fill-white" />
              </div>
              <div className="flex-grow pl-4">
                <h2 className="mb-1 text-sm font-medium tracking-wider text-gray-900 uppercase title-font">
                  Once you add
                </h2>
                <p className="leading-relaxed">
                  a recipe, you can edit any part of it by clicking "Edit
                  Recipe" on the recipe page.
                </p>
              </div>
            </div>
            <div className="relative flex">
              <div className="relative z-10 inline-flex items-center justify-center flex-shrink-0 w-10 h-10 text-white bg-indigo-500 rounded-full">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
              </div>
              <div className="flex-grow pl-4">
                <h2 className="mb-1 text-sm font-medium tracking-wider text-gray-900 uppercase title-font">
                  Questions?
                </h2>
                <p className="leading-relaxed">
                  Comments? Concerns? Well wishes?{" "}
                  <a href="mailto:jccdev45@gmail.com" className="mx-0 link">
                    Email
                  </a>{" "}
                  or call/text me, should you have my number. Thanks for reading
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
