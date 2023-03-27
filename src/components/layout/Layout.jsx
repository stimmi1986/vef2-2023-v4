import React from "react";
import { Departments } from "../departments/Departments";

export function Layout({ titleName }) {
  return (
    <>
      <section>
          <h2>{titleName}</h2>
          <Departments titleName='Deildir' />
      </section>
    </>
  )
}

export default Layout;
