import { PROFILE } from "@/data/portfolio";

const PortfolioFooter = () => (
  <footer className="border-t border-border py-7">
    <div className="container flex flex-col justify-between gap-2 px-4 text-sm text-muted-foreground sm:flex-row">
      <p>© 2026 {PROFILE.name}</p>
      <p>Developer · Designer · Educator</p>
    </div>
  </footer>
);

export default PortfolioFooter;
