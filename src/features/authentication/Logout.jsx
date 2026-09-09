import { CiLogin } from "react-icons/ci";

import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogout } from "./useLogout";

function Logout() {
  const { isLoading, logout } = useLogout();
  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      {!isLoading ? <CiLogin /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
