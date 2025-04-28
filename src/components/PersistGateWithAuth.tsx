import { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Persistor } from "redux-persist/es/types";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, functions } from "@/lib/firebase";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { login, logout, persistComplete } from "@/store/slices/userSlice";
import { doc, getDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";

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
          await user.getIdToken(true); // Lấy token mới nhất
          const tokenResult = await user.getIdTokenResult(); // Lấy token result mới nhất

          // Lấy thông tin người dùng từ Firestore (ưu tiên cao hơn)
          const userProfileRef = doc(db, "user_profiles", user.uid);
          const userProfileSnap = await getDoc(userProfileRef);

          let role = "user";
          let isAdmin = false;

          // 1. Đầu tiên, lấy từ token claims (nếu có)
          if (tokenResult.claims.role) {
            role = tokenResult.claims.role as string;
            isAdmin = tokenResult.claims.admin === true;
          }

          // 2. Sau đó, ghi đè bằng dữ liệu từ Firestore nếu có
          if (userProfileSnap.exists()) {
            const userData = userProfileSnap.data();
            if (userData.role) {
              role = userData.role;
              // Giả sử role "admin" đồng nghĩa với isAdmin = true
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

          // Nếu dữ liệu từ Firestore và token không trùng khớp, cần đồng bộ
          if (
            role !== tokenResult.claims.role ||
            isAdmin !== tokenResult.claims.admin
          ) {
            console.log(
              "Phát hiện sự không đồng bộ giữa Firestore và token claims"
            );
            // Gọi cloud function để cập nhật custom claims (triển khai bên dưới)
            try {
              const syncClaims = httpsCallable(functions, "syncUserClaims");
              await syncClaims({ userId: user.uid });
            } catch (syncError) {
              console.error("Không thể đồng bộ custom claims:", syncError);
            }
          }
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
