import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Departments } from "./pages/Departments"
import { Department } from "./pages/Depertment"
import { Courses } from './pages/Courses';
import { Course } from './pages/Course';


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
          <Route exact path="/*" element={<NotFound titleName='Síða fannst ekki :( ' />}  />
          <Route exact path="/" element={<Departments titleName='Deildir' />}  />
          <Route exact path="/departments/:slug" element={<Department titleName='Deild' />}  />
          <Route exact path="/departments/:slug/courses" component={department} element={<Courses titleName='Áfangar' />}  />

          <Route exact path="/departments/:slug/courses/:courseId" element={<Course titleName='Áfangi' />}  />

        </Routes>
      </>
    </>
  );
  
}

export default App;