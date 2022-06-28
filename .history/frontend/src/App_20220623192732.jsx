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
        <Route path="/explorer_register" element={<ExplorerRegister />} />
        <Route path="/explorer_login" element={<ExplorerLogin />} />
        <Route path="/contributor_register" element={<ContributorRegister />} />
        <Route path="/contributor_login" element={<ContributorLogin />} />
        <Route path="/contributor_main" element={<ContributorMainPage />} />
        <Route path="/explorer_main" element={<ExplorerMainPage />} />
        <Route path="/contributor_profile" element={<ContributorProfile />} />
        <Route path="/explorer_profile" element={<ExplorerProfile />} />
        <Route path="/add_recipe/:cid" element={<RecipeAdd />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
