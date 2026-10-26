import "./HackathonBanner.css";

export default function HackathonBanner() {
  return (
    <aside className="hackathon-banner" aria-label="Hackathon demo information">
      <div className="hackathon-banner__content">
        <span>
          <strong>Marketplace Guardian</strong>
          <span className="hackathon-banner__divider" aria-hidden="true"> / </span>
          GitLab Transcend · October 2026 hackathon demo
        </span>
        <span className="hackathon-banner__details">
          <span>Demo by Hamza Nadeem</span>
          <a
            href="https://gitlab.com/gitlab-ai-hackathon/transcend-october-2026/43060293/showcase"
            target="_blank"
            rel="noopener noreferrer"
          >
            View project <span aria-hidden="true">↗</span>
          </a>
        </span>
      </div>
    </aside>
  );
}
