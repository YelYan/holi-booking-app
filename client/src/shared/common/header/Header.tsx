import { Button } from "@/components/ui/button";
import { useLogout } from "@/services/auth/auth-api-client";
import { useAuth } from "@/shared/hooks/useAuth";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const logoutMutation = useLogout();
  return (
    <header className="py-4 shadow-xs bg-blue-600 w-full container mx-auto">
      <nav className="flex items-center justify-between">
        <Link to="/">
          <h1 className="font-bold text-3xl text-white">Holi.com</h1>
        </Link>

        {isLoggedIn ? (
          <Button
            variant={"secondary"}
            className="cursor-pointer"
            onClick={() => logoutMutation.mutate()}
          >
            Log Out
          </Button>
        ) : (
          <Button
            variant={"secondary"}
            className="cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
