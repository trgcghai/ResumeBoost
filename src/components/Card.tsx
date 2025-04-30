import { Timestamp } from "firebase/firestore";
import React from "react";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";

interface CardProps {
  title: string;
  uploadTime: Timestamp;
  score: number;
  id: string; // For linking to the detailed CV page
}

const Card: React.FC<CardProps> = ({ title, uploadTime, score, id }) => {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-textNormal">
        {format(uploadTime.toDate(), "HH:mm dd/MM/yyyy")}
      </p>
      <div className="flex justify-between items-center mt-2">
        <p className="text-main font-bold">{score} / 100</p>
        <NavLink
          to={`/details/${id}`}
          className="bg-main text-white px-4 py-2 rounded-lg hover:bg-main"
        >
          Xem kết quả
        </NavLink>
      </div>
    </div>
  );
};

export default Card;
