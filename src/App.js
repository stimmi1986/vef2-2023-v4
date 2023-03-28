import React from "react";
import { Route, Routes } from "react-router-dom";
import { Departments } from "./components/departments/Departments"
import { Courses } from './components/courses/Courses';
import { NotFound } from "./pages/NotFound";
import { Department } from "./pages/Depertment"
import { DepartmentForm } from "./components/departments/DepartmentForm";


import './App.css';

function App({titleName, department}) {

  return (
    <>
      <>
        <section>
          <h2>
            {titleName}
          </h2>
        </section>
      </>
      <>
        <Routes>
          <Route exact path="/" element={<Departments titleName='Deildir' />}  />
          <Route exact path="/" element={<DepartmentForm />}  />
          <Route exact path="/Stimmi" element={<Department titleName='Deildir' />}  />
          <Route exact path="/:slug/" component={department} element={<Courses titleName='Námskeið' />}  />
          <Route exact path="/*" element={<NotFound titleName='Síða fannst ekki :( ' />}  />
        </Routes>
      </>
    </>
  );
  
}

export default App;