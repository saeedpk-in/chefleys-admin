import { LoginForm } from "@/components/forms/LoginForm";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";

const page = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense
          fallback={
            <div className="w-full h-full justify-center items-center">
              <Spinner />
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
