import React from "react";

export function AuthContainer({ children }) {
  return (
    <section className="container grid w-5/6 h-full m-auto lg:w-1/2 place-items-center">
      {children}
    </section>
  );
}
