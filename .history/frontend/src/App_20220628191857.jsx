import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import HomePage from './page/HomePage.jsx';


function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/student_main" element={<StudentMainPage />} />
        <Route path="/expert_main" element={<ExpertMainPage />} />
        <Route path="/student_profile" element={<StudentProfilePage />} />
        <Route path="/expert_profile" element={<ExpertProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
