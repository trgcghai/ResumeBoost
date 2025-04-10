import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import DetailCV from '../pages/DetailCV';
import SkillsTab from '../components/SkillsTab';
import AnalysisTab from '../components/AnalysisTab';
import SuggestionsTab from '../components/SuggestionsTab';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      
      {/* Route cha cho DetailCV */}
      <Route path="/details" element={<DetailCV />}>
        {/* Các route con sẽ tự động được render vào <Outlet /> trong DetailCV */}
        <Route index element={<SkillsTab />} />
        <Route path="skills" element={<SkillsTab />} />
        <Route path="analysis" element={<AnalysisTab />} />
        <Route path="suggestions" element={<SuggestionsTab />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
