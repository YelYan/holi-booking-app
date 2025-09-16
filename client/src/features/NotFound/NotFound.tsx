import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen grid place-items-center">
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-2xl font-bold">
          Error 404 : We do not found the page you search!
        </h3>
        <Button
          variant={"default"}
          className="cursor-pointer bg-blue-700"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
