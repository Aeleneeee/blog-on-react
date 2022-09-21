import "./Footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
export const Footer = ({ year }) => {
  return (
    <footer>
      <nav>
        <a href="https://github.com/Aeleneeee" target="_blank">
          <GitHubIcon className="myContact" />
        </a>
        <a >
          <InstagramIcon className="myContact" />
        </a>
      </nav>
      <span>React blog - {year}</span>
    </footer>
  );
};
