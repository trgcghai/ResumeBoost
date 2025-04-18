import { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Persistor } from "redux-persist/es/types";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { login, logout, persistComplete } from "@/store/slices/userSlice";

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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Có user đăng nhập, cập nhật redux
        dispatch(
          login({
            id: user.uid,
            email: user.email || "",
            avatar: user.photoURL || "",
          })
        );
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
