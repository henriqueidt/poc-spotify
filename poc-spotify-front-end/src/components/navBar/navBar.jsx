import "./navBar.css";
import { Logo } from "../logo/logo";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const links = [
  {
    label: "Início",
    icon: <HomeIcon />,
  },
  {
    label: "Buscar",
    icon: <SearchIcon />,
  },
  {
    label: "Sua Biblioteca",
    icon: <LibraryBooksIcon />,
  },
  {
    label: "Criar playlist",
    icon: <AddBoxIcon />,
  },
  {
    label: "Músicas Curtidas",
    icon: <FavoriteIcon />,
  },
  {
    label: "Seus Episódios",
    icon: <BookmarkIcon />,
  },
];

const playlists = [
  {
    label: "Pop",
  },
  {
    label: "Rock",
  },
  {
    label: "Samba",
  },
  {
    label: "Folk",
  },
  {
    label: "Jazz",
  },
  {
    label: "Liked from Radio",
  },
];

export const NavBar = () => {
  return (
    <nav className="nav-bar">
      <Logo />
      <ul className="nav-bar__list">
        {links.map((link) => (
          <NavItem {...link} key={link.label} />
        ))}
      </ul>
      <hr className="nav-bar__separator" />
      <ul className="nav-bar__list">
        {playlists.map((link) => (
          <NavItem {...link} key={link.label} />
        ))}
      </ul>
    </nav>
  );
};

const NavItem = ({ label, icon }) => {
  return (
    <li className="nav-item">
      <a className="nav-item__link" href="/">
        {icon}
        {label}
      </a>
    </li>
  );
};
