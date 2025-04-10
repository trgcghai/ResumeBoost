import React from 'react';
import { NavLink } from 'react-router-dom';

interface CardProps {
  title: string;
  uploadTime: string;
  score: number;
  id: string; // For linking to the detailed CV page
}

const Card: React.FC<CardProps> = ({ title, uploadTime, score, id }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{uploadTime}</p>
      <div className="flex justify-between items-center mt-2">
        <p className="text-blue-500 font-bold">{score}/100</p>
        <NavLink
          to={`/details/${id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Xem kết quả
        </NavLink>
      </div>
    </div>
  );
};

export default Card;