import React from "react";

export function AuthContainer({ children }) {
  return (
    <section className="container grid w-5/6 h-full m-auto place-items-center">
      {children}
    </section>
  );
}
