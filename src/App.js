import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Departments } from "./pages/Departments"
import { Department } from "./pages/Depertment"
import { Courses } from './pages/Courses';
import { Course } from './pages/Course';

import './App.css';
import { Layout } from "./components/layout/Layout";

function App({titleName}) {
  const [department, setDepartment] = useState([])
  return (
    <Layout titleName="Kennsluskrá">
        <Routes>
          <Route exact path="/*" element={<NotFound titleName='Síða fannst ekki :( ' />}  />
          <Route exact path="/" element={<Departments titleName='Deildir' />}  />
          <Route exact path="/departments/:slug" element={<Department titleName='Deild' department={department} setDepartment={setDepartment} />}  />
          <Route exact path="/departments/:slug/courses" element={<Courses titleName='Áfangar' department={department} setDepartment={setDepartment} />}  />

          <Route exact path="/departments/:slug/courses/:courseId" element={<Course titleName='Áfangi' />}  />
        </Routes>
    </Layout>
  );
  
}

export default App;