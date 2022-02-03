import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContainer } from "../../components/auth";
import { Hero, Loading } from "../../components/shared";
import { useAuth, useNav } from "../../util/contexts";
import { useRecipe } from "../../util/hooks/useRecipe";
import { firestore } from "../../util/firebase/firebase";
import { ReactComponent as Email } from "../../data/img/email.svg";
import { ReactComponent as Book } from "../../data/img/open-book.svg";

const blankUser = {
  uid: 0,
  displayName: "N/A",
  email: "N/A",
  photoURL:
    "https://riverlegacy.org/wp-content/uploads/2021/07/blank-profile-photo.jpeg",
};

export function Profile() {
  const { id } = useParams();
  const { isOpen, setIsOpen } = useNav();
  const { currentUser, isLoading } = useAuth();
  const { recipes } = useRecipe();
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    if (isOpen) setIsOpen();

    const userRef = doc(firestore, "users", id);
    getDoc(userRef)
      .then((data) => {
        if (data.exists()) {
          setUser(data.data());
        } else {
          setUser(blankUser);
        }
      })
      .catch((error) => console.log(error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, currentUser]);

  const renderRecipes = () => {
    return recipes
      .filter((recipe) => recipe.userId === id)
      .map((item) => (
        <Link key={item.id} to={`${item.path}`} className="mx-0 link">
          {item.recipeName}
        </Link>
      ));
  };

  if (!user) return;
  return (
    <AuthContainer>
      <Loading isLoading={isLoading} />

      <Hero page="profile" name="Profile" />

      <div className="container flex flex-wrap px-5 py-12 mx-auto">
        <div className="flex flex-col justify-center w-full lg:w-1/2">
          <div className="w-full">
            <div className="w-full overflow-hidden rounded-lg lg:mb-0">
              <img
                alt={(user && user.displayName) || "User profile"}
                src={user ? user.photoURL : "http://placekitten.com/500/500"}
                className="object-cover object-center w-full h-full"
              />
            </div>
          </div>
          {currentUser && id === currentUser.uid && (
            <Link
              to="/update-profile"
              className="w-2/3 p-4 mx-auto my-4 mt-3 text-lg font-bold text-center text-white bg-blue-500 btn md:w-1/3"
            >
              Update Profile
            </Link>
          )}
        </div>
        <div className="flex flex-col flex-wrap justify-start w-full mb-12 text-center divide-y-2 gap-14 lg:py-6 lg:w-1/2 lg:pl-8 lg:text-left">
          <div className="flex flex-col items-center lg:items-start md:flex-row">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-5 text-indigo-500 bg-indigo-100 rounded-full md:mr-4">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-7 h-7"
                viewBox="0 0 24 24"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="flex-grow">
              <h2 className="text-lg font-medium text-gray-900 md:mr-3 title-font">
                Name:
              </h2>
              <p className="text-base leading-relaxed">
                {user ? user.displayName : "No name found"}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-start md:flex-row">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-5 text-indigo-500 bg-indigo-100 rounded-full md:mr-4">
              <Email className="transform scale-[.6] fill-indigo-400" />
            </div>
            <div className="flex-grow">
              <h2 className="mb-3 text-lg font-medium text-gray-900 title-font">
                Email
              </h2>
              <p className="text-base leading-relaxed">
                {user ? user.email : "No email found"}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center lg:items-start md:flex-row">
            <div className="inline-flex items-center justify-center w-[3.25rem] h-12 mb-5 md:mr-3 text-indigo-500 bg-indigo-100 rounded-full">
              <Book className="transform scale-[.6] md:scale-75 fill-indigo-400" />
            </div>
            <div className="flex-grow">
              <h2 className="mb-3 text-lg font-medium text-gray-900 title-font">
                Recipes
              </h2>
              <p className="text-base leading-relaxed">{renderRecipes()}</p>
            </div>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
}
