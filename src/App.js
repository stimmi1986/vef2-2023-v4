import React from "react";
import { DepartmentsProvider } from './components/departments/DepartmentsContext';
import { Route, Routes } from "react-router-dom";
import { Courses } from './components/courses/Courses';
import { Layout } from './components/layout/Layout'


import './App.css';

function App(department) {

  return (
    <>
      <DepartmentsProvider>
        <Routes>
          <Route  path="/" element={<Layout titleName='Kennsluskrá' />}  />
          <Route  path="/:slug/" element={<Courses titleName='Námskeið' title={department.title} description={department.description} />}  />
        </Routes>
      </DepartmentsProvider>  

    </>  
  );
  
}

export default App;