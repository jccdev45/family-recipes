import React from "react";
import { Footer, Navbar } from "./";

export function Layout({ children }) {
	return (
		<div className="flex flex-col justify-between w-screen min-h-screen">
			<Navbar />
			<main className="flex flex-col flex-grow h-full">{children}</main>
      <Footer />
		</div>
	);
}
