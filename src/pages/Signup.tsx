import { SignUpForm } from "@/components/SignUpForm";

const Signup = () => {
  return (
    <div className="h-screen w-full bg-bgLight">
      <div className="w-full p-4 h-16 text-lg font-semibold bg-white text-gray-800 border-b border-gray-200 flex items-center">
        Logo
      </div>

      <div className="flex mt-[100px] w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
