import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserProfile } from "@/type";

const Overview: React.FC = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const userProfileCollectionRef = collection(db, "user_profiles");

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const getInitials = () => {
    return (
      user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()
    );
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        const userId = user?.uid || "";
        const q = query(
          userProfileCollectionRef,
          where("userId", "==", userId)
        );

        const dataSnap = await getDocs(q);
        if (dataSnap.empty) {
          return;
        } else {
          setUserProfile({
            ...(dataSnap.docs[0].data() as UserProfile),
            id: dataSnap.docs[0].id,
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    getProfile();
  }, [user?.uid, userProfileCollectionRef]);

  return (
    <div className="mb-6">
      <div
        className={`mb-4 flex ${
          user?.displayName ? "items-start" : "items-center"
        } gap-4`}
      >
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
          {user?.displayName ? (
            <>
              <h1 className="text-2xl font-bold">{user?.displayName}</h1>
              <p className="text-textNormal">{user?.email}</p>
            </>
          ) : (
            <>
              <p className="text-xl font-bold">{user?.email}</p>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border rounded-lg px-4 py-4 text-center flex items-center justify-between">
          <h3 className="text-lg font-semibold">Tổng số CV</h3>
          <p className="text-2xl font-bold">{userProfile?.cvCount}</p>
        </div>
        <div className="bg-white border rounded-lg px-4 py-4 text-center flex items-center justify-between">
          <h3 className="text-lg font-semibold">Điểm trung bình</h3>
          <p className="text-2xl font-bold">{userProfile?.avgScore}</p>
        </div>
        <div className="bg-white border rounded-lg px-4 py-4 text-center flex items-center justify-between">
          <h3 className="text-lg font-semibold">CV gần nhất</h3>
          <p className="text-2xl font-bold">
            {userProfile?.lastUploadTime
              ? userProfile.lastUploadTime.toDate().toLocaleString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "Chưa có CV"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
