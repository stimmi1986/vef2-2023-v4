import { Route, Routes } from "react-router-dom";
import { Departments } from './components/departments/Departments.jsx';
import { Courses } from './components/courses/Courses';
import { Layout } from "./components/layout/Layout.jsx";

import './App.css';

function App() {
  return (
    <>
    <Layout title='Kennsluskrá' />
    <Routes>
      <Route path="/" element={<Departments titles='Deildir' />} />
      <Route path="/departments/:slug/courses" element={<Courses titles='Námskeið' />} />
    </Routes>
    </>
  );
}

export default App;