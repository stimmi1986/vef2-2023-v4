import React from "react";
import { Courses } from "../courses/Courses";
import { Departments } from "../departments/Departments";

export function Layout(department) {

  return (
    <>
      <Departments titleName='Deildir' />
      <Courses titleName='Námskeið' title={department.title} description={department.description} />
    </>
  )
};

export default Layout;
