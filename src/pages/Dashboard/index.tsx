import { Button } from "@material-ui/core";
import { useAuth } from "../../Provider/Auth";

const Dashboard = () => {
  const { Logout } = useAuth();

  const handleLogout = () => {
    Logout();
  };

  return (
    <>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleLogout}
      >
        Sair
      </Button>
    </>
  );
};
export default Dashboard;
