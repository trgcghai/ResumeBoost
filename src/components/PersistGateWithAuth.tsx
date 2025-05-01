import { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Persistor } from "redux-persist/es/types";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { login, logout, persistComplete } from "@/store/slices/userSlice";
import { collection, getDocs, query, where } from "firebase/firestore";

// Component tải trang
const LoadingScreen = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <div className="h-16 w-16 animate-spin rounded-full border-4 border-main border-t-transparent"></div>
  </div>
);

interface PersistGateWithAuthProps {
  children: React.ReactNode;
  persistor: Persistor;
}

export const PersistGateWithAuth = ({
  children,
  persistor,
}: PersistGateWithAuthProps) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.user);

  // Xử lý trạng thái auth và persistence
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Lấy thông tin người dùng từ Firestore
          const userProfileCollectionRef = collection(db, "user_profiles");
          const q = query(
            userProfileCollectionRef,
            where("userId", "==", user.uid)
          );

          const dataSnap = await getDocs(q);
          let role = "user";
          let isAdmin = false;

          // Ghi bằng dữ liệu từ Firestore
          if (!dataSnap.empty) {
            const userData = dataSnap.docs[0].data();
            if (userData.role) {
              role = userData.role;
              isAdmin = role === "admin";
            }
          }

          // Cập nhật Redux store
          dispatch(
            login({
              id: user.uid,
              email: user.email || "",
              avatar: user.photoURL || "",
              role: role,
              isAdmin: isAdmin,
            })
          );
        } catch (error) {
          console.error("Lỗi khi lấy thông tin người dùng:", error);
          // Dùng thông tin cơ bản nếu có lỗi
          dispatch(
            login({
              id: user.uid,
              email: user.email || "",
              avatar: user.photoURL || "",
              role: "user",
              isAdmin: false,
            })
          );
        }
      } else {
        // Không có user đăng nhập
        dispatch(logout());
      }

      // Đánh dấu đã hoàn tất việc tải dữ liệu
      dispatch(persistComplete());
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [dispatch]);

  // Hiển thị loading screen khi đang tải dữ liệu
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PersistGate loading={<LoadingScreen />} persistor={persistor}>
      {children}
    </PersistGate>
  );
};
