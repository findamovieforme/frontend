
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { DiscordLogoIcon } from "@radix-ui/react-icons";

const primaryLinks = [
  {
    title: "Discover",
    links: [
      { name: "Home", href: "/" },
      { name: "Trending", href: "/trending" },
      { name: "Most Added", href: "/dashboard" },
      { name: "Browse by genre", href: "#genres" },
    ],
  },
  {
    title: "For you",
    links: [
      { name: "Your profile", href: "/profile" },
      { name: "Favorites", href: "/profile" },
      { name: "AI recommendations", href: "#ai-search" },
    ],
  },
  {
    title: "Roadmap",
    links: [
      { name: "Comments & reviews", href: "#" },
      { name: "Lists & watch parties", href: "#" },
      { name: "Creator tools", href: "#" },
      { name: "Feature requests", href: "mailto:hello@movierec.app" },
    ],
  },
];

const Footer1 = () => {
  const year = new Date().getFullYear();

  return (
    <section className="relative left-1/2 -translate-x-1/2 w-screen max-w-none mt-16 border-t bg-muted/30">
      <div className="container mx-auto min-w-0 py-12">
        <footer>
          <div className="grid gap-10 md:grid-cols-[2fr,3fr] lg:grid-cols-[2fr,4fr]">
            <div className="space-y-4">
              <div className="text-xl font-bold tracking-tight">
                movierec<span className="text-primary">.</span>
              </div>
              <p className="max-w-md text-sm text-muted-foreground">
                Movierec helps you decide what to watch next with
                data‑driven recommendations, smart search, and your friends&apos;
                favorites.
              </p>
              <p className="text-xs text-muted-foreground">
                Movie data is provided by third‑party APIs such as TMDb and
                others. This product is not endorsed or certified by them.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {primaryLinks.map((section) => (
                <div key={section.title}>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    {section.title}
                  </h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        {link.href.startsWith("/") || link.href.startsWith("#") ? (
                          <Link
                            href={link.href}
                            className="font-medium transition-colors hover:text-primary"
                          >
                            {link.name}
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            className="font-medium transition-colors hover:text-primary"
                          >
                            {link.name}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Stay in the loop
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Be the first to know when we ship comments, social features,
                  and new discovery tools.
                </p>
                <a
                  href="mailto:hello@movierec.app?subject=Movierec%20Updates"
                  className="inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                >
                  Get product updates
                </a>

                <div className="mt-8">
                  <h4 className="mb-3 text-sm font-semibold text-muted-foreground">
                    Community
                  </h4>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <a
                      href="#"
                      aria-label="Join the Movierec Discord"
                      className="rounded-full border p-2 transition-colors hover:border-primary hover:text-primary"
                    >
                      <DiscordLogoIcon className="size-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col gap-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>© {year} movierec. All rights reserved.</p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="hover:text-primary">
                Terms
              </a>
              <a href="#" className="hover:text-primary">
                Privacy
              </a>
              <a href="#" className="hover:text-primary">
                Cookies
              </a>
              <span className="text-[11px]">
                Built with ❤️ for movie lovers.
              </span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer1;
