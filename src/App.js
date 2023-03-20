import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/layout/Layout';
import { Departments } from './components/departments/Departments.jsx';

import './App.css';


function App() {

  return (
    <Layout title="Kennsluskráin">
      <Routes>
        <Route exact path="/" element={<Departments />} />
      </Routes>
    </Layout>
  );
}

export default App;
