import { AiFillHome, AiOutlineFlag } from "react-icons/ai";
import { CgMusicNote } from "react-icons/cg";
import {
  FaRegLaughBeam,
  FaTheaterMasks,
  FaTools,
  FaUserFriends,
} from "react-icons/fa";
import { FiFilm, FiHelpCircle, FiSettings } from "react-icons/fi";
import { GiCat, GiSoccerBall } from "react-icons/gi";
import { IoCarSport, IoGameControllerSharp } from "react-icons/io5";
import { MdFlight, MdLibraryBooks, MdSchool, MdScience } from "react-icons/md";
import { RiFeedbackLine } from "react-icons/ri";

export const categories = [
  { id: "0", name: "Home", icon: <AiFillHome />, type: "category" },
  { id: "1", name: "Fiml & Animation", icon: <FiFilm />, type: "category" },
  { id: "2", name: "Autos & Vehicles", icon: <IoCarSport />, type: "category" },
  { id: "10", name: "Music", icon: <CgMusicNote />, type: "category" },
  { id: "15", name: "Pets & Animals", icon: <GiCat />, type: "category" },
  { id: "17", name: "Sports", icon: <GiSoccerBall />, type: "category" },
  { id: "19", name: "Travel & Events", icon: <MdFlight />, type: "category" },
  {
    id: "20",
    name: "Gaming",
    icon: <IoGameControllerSharp />,
    type: "category",
  },
  {
    id: "22",
    name: "People & Blogs",
    icon: <FaUserFriends />,
    type: "category",
  },
  { id: "23", name: "Comedy", icon: <FaRegLaughBeam />, type: "category" },
  {
    id: "24",
    name: "Entertainment",
    icon: <FaTheaterMasks />,
    type: "category",
    divider: true,
  },
  {
    id: "25",
    name: "News & Politics",
    icon: <MdLibraryBooks />,
    type: "category",
  },
  { id: "26", name: "Howto & style", icon: <FaTools />, type: "category" },
  { id: "27", name: "Education", icon: <MdSchool />, type: "category" },
  {
    id: "28",
    name: "Science & Technology",
    icon: <MdScience />,
    type: "category",
  },
];

export const menuItems = [
  { name: "Settings", icon: <FiSettings />, type: "menu" },
  { name: "Report History", icon: <AiOutlineFlag />, type: "menu" },
  { name: "Help", icon: <FiHelpCircle />, type: "menu" },
  { name: "Send Feedback", icon: <RiFeedbackLine />, type: "menu" },
];
