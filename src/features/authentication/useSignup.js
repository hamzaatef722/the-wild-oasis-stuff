import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signupApi({ fullName, email, password }),
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "new account successfully created check the user email to verify the email",
      );
    },
    onError: (err) => toast.error(err.message),
  });
  return { isLoading, signup };
}
