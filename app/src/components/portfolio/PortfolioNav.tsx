import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS, PROFILE } from "@/data/portfolio";
import ThemeToggle from "./ThemeToggle";

const toAnchor = (item: string) => `#${item.toLowerCase()}`;

const PortfolioNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl" aria-label="Primary navigation">
      <div className="container flex h-16 items-center justify-between px-4">
        <a href="#home" className="flex items-center gap-3" aria-label={`${PROFILE.name}, home`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary font-bold text-primary-foreground shadow-md">
            {PROFILE.initials}
          </span>
          <span className="hidden font-semibold sm:block">{PROFILE.name}</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
            <a key={item} href={toAnchor(item)} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button className="hidden md:inline-flex" asChild>
            <a href="#contact">Let’s talk <ArrowUpRight /></a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a key={item} href={toAnchor(item)} onClick={() => setMenuOpen(false)} className="py-3 font-medium text-muted-foreground">
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default PortfolioNav;
