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
        {/* <Route path="/" element={<HomePage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
