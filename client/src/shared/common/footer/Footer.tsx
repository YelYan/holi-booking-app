import { Link } from "react-router";
const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-10">
      <div className="container mx-auto flex justify-between">
        <Link to={"/"}>
          <h1 className="text-3xl font-bold tracking-tight">Holi.com</h1>
        </Link>

        <div className="text-white font-bold tracking-tight flex gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
