import { Button } from "../ui/button.jsx";
import { LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

export function Logout() {
  const navigate = useNavigate();

  function handleClick() {
    Cookies.remove("token");
    navigate("/");
  }

  return (
    <div className="flex justify-end">
      <Button onClick={handleClick} variant="outline" size="icon">
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
