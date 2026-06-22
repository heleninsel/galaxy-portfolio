import linkedinIcon from "../assets/linkedin.png";
import youtubeIcon from "../assets/youtube.png";
import githubIcon from "../assets/github.png";

const LINKS = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/helen-insel", icon: linkedinIcon },
  { label: "YouTube", url: "https://www.youtube.com/@heleninsel", icon: youtubeIcon },
  { label: "GitHub", url: "https://github.com/heleninsel", icon: githubIcon },
];

export default function Links() {
  return (
    <div className="stack">
      <p style={{ color: "var(--text-muted)" }}>Beni buralarda bulabilirsin:</p>
      {LINKS.map((l) => (
        <a key={l.label} className="link-row" href={l.url} target="_blank" rel="noopener noreferrer">
          <img className="link-icon" src={l.icon} alt="" aria-hidden="true" />
          <span>{l.label}</span>
          <span className="link-arrow">↗</span>
        </a>
      ))}
    </div>
  );
}