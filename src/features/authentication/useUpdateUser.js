import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: ({ password, fullName, avatar }) =>
      updateCurrentUser({ password, fullName, avatar }),
    onSuccess: ({ user }) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      queryClient.setQueryData(["user"], user);
      console.log(user);
      toast.success("account successfully updated");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateUser };
}
