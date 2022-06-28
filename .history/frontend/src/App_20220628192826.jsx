import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import HomePage from './page/HomePage.jsx';
import StudentMain from './page/StudentMain';
import ExpertMain from './page/ExpertMain';
import StudentProfile from './page/StudentProfile';
import ExpertProfile from './page/ExpertProfile';
import StudentLogin from './page/StudentLogin';
import ExpertLogin from './page/ExpertLogin.jsx';
import StudentRegister from './page/StudentRegister.jsx';
import ExpertRegister from './page/ExpertRegister.jsx';

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explorer_register" element={<StudentRegister />} />
        <Route path="/explorer_login" element={<StudentLogin />} />
        <Route path="/contributor_register" element={<ExpertRegister />} />
        <Route path="/contributor_login" element={<ExpertLogin />} />
        <Route path="/student_main" element={<StudentMain />} />
        <Route path="/expert_main" element={<ExpertMain />} />
        <Route path="/student_profile" element={<StudentProfile />} />
        <Route path="/expert_profile" element={<ExpertProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
