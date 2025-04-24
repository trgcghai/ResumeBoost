import { signInWithPopup } from "firebase/auth";
import { Button } from "../ui/button";
import { auth, functions, googleProvider } from "@/lib/firebase";
import { useAppDispatch } from "@/hooks/redux";
import { httpsCallable } from "firebase/functions";
import { login } from "@/store/slices/userSlice";
import { useNavigate } from "react-router-dom";

interface responeType {
  success: boolean;
  message: string;
  error?: object;
}

const GoogleAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const { email, uid, photoURL } = result.user;

      dispatch(login({ email: email || "", id: uid, avatar: photoURL || "" }));

      const createUserProfile = httpsCallable(functions, "createUserProfile");
      const res = await createUserProfile({ userId: uid });
      const data = res.data as responeType;
      if (data.success) {
        console.log("User profile created successfully");
        navigate("/");
      } else {
        console.log(
          "User profile already exists or error occurred",
          data.message
        );
      }
    } catch (error) {
      console.log("Error signing in:", error);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full bg-bgNormal text-textDark hover:bg-bgNormal cursor-pointer"
      onClick={handleGoogleAuth}
    >
      <svg
        className="mr-2 h-4 w-4"
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="google"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 488 512"
      >
        <path
          fill="currentColor"
          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
        ></path>
      </svg>
      Tiếp tục với Google
    </Button>
  );
};
export default GoogleAuth;
