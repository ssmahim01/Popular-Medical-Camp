import { Link, NavLink } from "react-router-dom";
import PopularMedicalLogo from "../../../assets/images/popular-medical-camp-logo.png";
import { BsLinkedin } from "react-icons/bs";
import { SiGithub } from "react-icons/si";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import useOrganizer from "../../../hooks/useOrganizer";

const Footer = () => {
  const [organizer] = useOrganizer();

  return (
    <footer className="bg-purple-100">
      <div className="flex gap-8 flex-row justify-between flex-wrap p-10 lg:w-[86%] w-11/12 mx-auto">
        <div className="space-y-2 flex-1">
          <div className="flex gap-x-2 items-center">
            <img
              className="w-10 h-10 rounded-lg object-cover"
              src={PopularMedicalLogo}
              alt="Logo of Popular Medical"
            />

            <h4 className="text-2xl text-gray-800 font-extrabold">
              Popular Medical
            </h4>
          </div>

          <div>
            <p className="text-gray-600 leading-relaxed text-sm">
              Popular Medical Camp is a comprehensive medical camp management
              system designed to provide essential healthcare services to
              participants. Users can register for preferred camps via an online
              form, process secure payments through Stripe via a dedicated
              dashboard, and benefit from AI-powered image generation for both
              participants and organizers. Organizers can efficiently manage,
              update, and add camps to ensure seamless operations.
            </p>
          </div>

           {/* Connect With Me Section */}
        <div className="w-full pt-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Connect With Me
          </h3>
          <div className="flex justify-center md:justify-start gap-4">
            <Link
              to="https://www.linkedin.com/in/sayman-shakil-mahim"
              target="_blank"
              className="text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <BsLinkedin className="text-2xl" />
            </Link>
            <Link
              to="https://github.com/ssmahim01"
              target="_blank"
              className="hover:text-gray-900 transition-colors"
            >
              <SiGithub className="text-2xl" />
            </Link>
            <Link
              to="https://www.facebook.com/ssmahim"
              target="_blank"
              className="text-cyan-600 hover:text-cyan-800 transition-colors"
            >
              <FaFacebook className="text-2xl" />
            </Link>
            <Link
              to="https://www.instagram.com/iammz01"
              target="_blank"
              className="text-rose-500 hover:text-rose-700 transition-colors"
            >
              <FaInstagram className="text-2xl" />
            </Link>
          </div>
        </div>
        </div>

        <div className="lg:px-32 md:px-20 px-6 flex flex-row flex-wrap gap-10">
          {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Quick Links
          </h3>
          <nav className="flex flex-col gap-2">
            <NavLink
              to="/"
              className="text-gray-700 hover:text-purple-600 w-3/5 transition-colors"
            >
              Home
            </NavLink>
            <NavLink
              to="/available-camps"
              className="text-gray-700 hover:text-purple-600 w-3/5 transition-colors"
            >
              Available Camps
            </NavLink>
            <NavLink
              to="/feedbacks"
              className="text-gray-700 hover:text-purple-600 w-3/5 transition-colors"
            >
              Feedbacks
            </NavLink>
            <NavLink
              to={`${
                organizer
                  ? "/dashboard/organizer-home"
                  : "/dashboard/participant-home"
              }`}
              className="text-gray-700 hover:text-purple-600 w-3/5 transition-colors"
            >
              Dashboard
            </NavLink>
          </nav>
        </div>

        {/* Services Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Provided Services
          </h3>
          <nav className="flex flex-col gap-2">
            <NavLink
              to="/services"
              className="text-gray-700 hover:text-purple-600 w-3/5 transition-colors"
            >
              Services
            </NavLink>
            <NavLink
              to="/generate-image"
              className="text-gray-700 hover:text-purple-600 w-3/5 transition-colors"
            >
              Generate Image
            </NavLink>
          </nav>
        </div>
        </div>
      </div>

      <aside className="text-center py-2 px-4 bg-neutral-900">
        <p className="text-white/90 font-bold">
          Copyright © {new Date().getFullYear()} - All right reserved by Popular
          Medical Ltd.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
