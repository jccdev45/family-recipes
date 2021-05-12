const INPUT_BASE_CLASS = "w-full p-4 mx-auto my-2 border-2 rounded-lg";
const SMALL_CLASS =
	"absolute z-10 top-0 font-bold tracking-wider bg-white left-4";
const ADD_VALUE_BTN_CLASS =
	"absolute pb-1 px-1 text-3xl text-white transition-colors duration-100 ease-in-out bg-blue-300 rounded-full right-3 hover:bg-blue-400";
const LIST_BADGE_CLASS = "px-4 my-1 mx-3 text-lg bg-gray-300 rounded-xl";
const REMOVE_BADGE_CLASS =
	"absolute top-0 px-1.5 bg-red-300 text-white rounded-full right-0 cursor-pointer hover:bg-red-400 transition-colors duration-100 ease-in-out";
const CHECKMARK_CLASS =
	"absolute text-2xl -right-6 transition-opacity duration-100 ease-in-out";

const naInputs = [
	{
		keyName: "recipeName",
		displayName: "Recipe Name",
		placeholder: "Lasagna, soup, etc",
	},
	{
		keyName: "quote",
		displayName: "Quote",
		placeholder: `"My specialty!"`,
	},
	{
		keyName: "img",
		displayName: "Picture",
		placeholder: "Image URL",
	},
];

const types = ["image/png", "image/jpg", "image/jpeg"];

export {
	INPUT_BASE_CLASS,
	SMALL_CLASS,
	ADD_VALUE_BTN_CLASS,
	LIST_BADGE_CLASS,
	REMOVE_BADGE_CLASS,
	CHECKMARK_CLASS,
	naInputs,
	types,
};
