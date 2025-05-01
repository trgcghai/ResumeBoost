import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  title: string;
  uploadTime: string;
  score: number;
  id: string; // For linking to the detailed CV page
}

const Card: React.FC<CardProps> = ({ title, uploadTime, score, id }) => {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-textNormal">{uploadTime}</p>
      <div className="flex justify-between items-center mt-2">
        <p className="text-main font-bold">{score}/100</p>
        <Link
          to={`/details/${id}`}
          className="bg-main text-white px-4 py-2 rounded-lg hover:bg-mainHover"
        >
          Xem kết quả
        </Link>
      </div>
    </div>
  );
};

export default Card;
