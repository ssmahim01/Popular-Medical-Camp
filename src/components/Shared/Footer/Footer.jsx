import { Link, NavLink } from "react-router-dom";
import PopularMedicalLogo from "../../../assets/images/popular-medical-camp-logo.png";
import { BsLinkedin } from "react-icons/bs";
import { SiGithub } from "react-icons/si";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import useOrganizer from "../../../hooks/useOrganizer";

const Footer = () => {
  const [organizer] = useOrganizer();
  
  return (
    <footer className="footer gap-6 footer-center bg-violet-100 rounded p-10">
      <div className="flex gap-x-2 items-center">
        <img className="w-10 h-10 rounded-lg object-cover" src={PopularMedicalLogo} alt="Logo of Popular Medical" />

        <h4 className="text-2xl text-gray-800 font-extrabold">Popular Medical</h4>
      </div>

      <nav className="flex gap-4 items-center text-gray-800 *:font-bold">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/available-camps">Available Camps</NavLink>
        <NavLink to={`${organizer ? "/dashboard/organizer-profile" : "/dashboard/analytics"}`}>Dashboard</NavLink>
      </nav>

      <nav>
        <div className="flex gap-3 items-center">
          <Link to="https://www.linkedin.com/in/sayman-shakil-mahim" target="_blank"><BsLinkedin className="text-indigo-600 text-2xl" /></Link>

          <Link to="https://github.com/ssmahim01" target="_blank"><SiGithub className="text-2xl" /></Link>

          <Link to="https://www.facebook.com/ssmahim" target="_blank"><FaFacebook className="text-cyan-600 text-2xl" /></Link>

          <Link to="https://www.instagram.com/iammz01" target="_blank"><FaInstagram className="text-rose-500 text-2xl" /></Link>
        </div>
      </nav>
      <aside>
        <p className="text-gray-600 font-bold">
          Copyright © {new Date().getFullYear()} - All right reserved by Popular Medical Ltd.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
