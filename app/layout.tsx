import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";

import { SiteProviders } from "@/components/providers/site-providers";
import { THEME_BOOT_SCRIPT } from "@/lib/theme/boot-script";

// Sora is the logo typeface, so headings sound like the brand.
const heading = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const body = Inter({ variable: "--font-inter", subsets: ["latin"] });
// Mono is for small labels and the scene's map only.
const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400"],
});

const DESCRIPTION =
  "Ambrace learns how each student learns, and teaches them that way. Take a viva, discover how you learn best, and get a plan that fits you.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ambrace.in"),
  title: { default: "Ambrace · Learn differently", template: "%s · Ambrace" },
  description: DESCRIPTION,
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Ambrace",
    title: "Ambrace · Learn differently",
    description: DESCRIPTION,
    url: "https://ambrace.in",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ECEBF2" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B10" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} ${mono.variable} antialiased`}
      // The theme script sets a class and colour-scheme on <html> before React
      // loads, so this element differs from the static HTML on purpose.
      suppressHydrationWarning
    >
      <head>
        {/* Runs before anything is drawn, so a night choice never flashes day. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body>
        <SiteProviders>{children}</SiteProviders>
      </body>
    </html>
  );
}
