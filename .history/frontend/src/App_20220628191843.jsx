/*
 * @Author: Echooooo-zhn haonanZHONG17@outlook.com
 * @Date: 2022-06-24 11:37:55
 * @LastEditors: Echooooo-zhn haonanZHONG17@outlook.com
 * @LastEditTime: 2022-06-28 19:18:43
 * @FilePath: \Visionaries\frontend\src\App.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import ExplorerRegister from './page/ExplorerRegister';
import ExplorerLogin from './page/ExplorerLogin';
import ContributorRegister from './page/ContributorRegister';
import ContributorLogin from './page/ContributorLogin';
import HomePage from './page/HomePage.jsx';
import ContributorMainPage from './page/ContributorMainPage';
import ExplorerMainPage from './page/ExplorerMainPage';
import ContributorProfile from './page/ContributorProfile';
import ExplorerProfile from './page/ExplorerProfile';
import RecipeAdd from './page/RecipeAdd';


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
