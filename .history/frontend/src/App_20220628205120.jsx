/*
 * @Author: Echooooo-zhn haonanZHONG17@outlook.com
 * @Date: 2022-06-28 20:01:04
 * @LastEditors: Echooooo-zhn haonanZHONG17@outlook.com
 * @LastEditTime: 2022-06-28 20:51:20
 * @FilePath: \Visionaries\frontend\src\App.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
        <Route path="/student_register" element={<StudentRegister />} />
        <Route path="/student_login" element={<StudentLogin />} />
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
