import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Departments } from "./pages/Departments"
import { Department } from "./pages/Depertment"
import { Courses } from './pages/Courses';
import { Course } from './pages/Course';
import { MakeCourse } from './pages/MakeCourse';

import './App.css';
import { Layout } from "./components/layout/Layout";

function App() {
  const [deild, setDeild] = useState([])
  const [deildir, setDeildir] = useState([])
  return (
    <Layout titleName="Kennsluskrá">
        <Routes>
          <Route exact path="/*" element={<NotFound titleName='Síða fannst ekki :( ' />}  />
          <Route exact path="/" element={<Departments titleName='Deildir' deildir={deildir} setDeildir={setDeildir} deild={deild} setDeild={setDeild} />}  />
          <Route exact path="/departments/:slug" element={<Department titleName='Deild' deild={deild} />}  />
          <Route exact path="/departments/:slug/courses" element={<Courses titleName='Áfangar' deild={deild} />}  />
          <Route exact path="/departments/:slug/courses/:courseId" element={<Course titleName='Áfangi' deild={deild} setDeild={setDeild} />}  />
          <Route exact path="/courses/mkcourse" element={<MakeCourse titleName='Búa til áfanga' deild={deild} setDeild={setDeild} />}  />
        </Routes>
    </Layout>
  );
  
}

export default App;