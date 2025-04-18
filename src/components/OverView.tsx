import { getAuth } from "firebase/auth";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Overview: React.FC = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const getInitials = () => {
    if (user?.displayName === "User") return "U";

    const nameParts = user?.displayName?.split(" ");
    if (nameParts && nameParts.length >= 2) {
      return `${nameParts[0][0]}${
        nameParts[nameParts.length - 1][0]
      }`.toUpperCase();
    }
    return user?.displayName?.[0]?.toUpperCase() || "U";
  };

  return (
    <div className="mb-6">
      <div className="mb-4 flex items-start gap-4">
        <Avatar className="h-16 w-16 border border-gray-200">
          <AvatarImage
            src={user?.photoURL || ""}
            alt={user?.displayName || ""}
          />
          <AvatarFallback className="bg-main text-white text-lg">
            {getInitials()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{user?.displayName}</h1>
          <p className="text-textNormal">{user?.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border rounded-lg px-4 py-4 text-center flex items-center justify-between">
          <h3 className="text-lg font-semibold">Tổng số CV</h3>
          <p className="text-2xl font-bold">4</p>
        </div>
        <div className="bg-white border rounded-lg px-4 py-4 text-center flex items-center justify-between">
          <h3 className="text-lg font-semibold">Điểm trung bình</h3>
          <p className="text-2xl font-bold">86</p>
        </div>
        <div className="bg-white border rounded-lg px-4 py-4 text-center flex items-center justify-between">
          <h3 className="text-lg font-semibold">CV gần nhất</h3>
          <p className="text-2xl font-bold">10:30 04/04/2025</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
