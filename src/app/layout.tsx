import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Geist } from "next/font/google"
import "./globals.css"
import { AppWindow } from "lucide-react"

export const runtime = "edge"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "NirussVn0 - Developer",
  description: "portfolio website",
  generator: "nirussvn0",
  icons: {
    icon: [
      { url: "/icon.ico", sizes: "16x16", type: "image/png" },
      { url: "/next-icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Script
          id="remove-bis-skin"
          strategy="beforeInteractive"
        >{`(() => {
        try {
          const clean = (root) => {
            if (!root) return;
            if (root.nodeType === 1 && root.hasAttribute && root.hasAttribute('bis_skin_checked')) {
              root.removeAttribute('bis_skin_checked');
            }
            if (root.querySelectorAll) {
              root.querySelectorAll('[bis_skin_checked]').forEach((node) => node.removeAttribute('bis_skin_checked'));
            }
          };

          clean(document);

          const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
              if (mutation.type === 'attributes' && mutation.target instanceof Element) {
                mutation.target.removeAttribute('bis_skin_checked');
              }
              if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                  if (node instanceof Element) {
                    clean(node);
                  }
                });
              }
            }
          });

          observer.observe(document, {
            attributes: true,
            attributeFilter: ['bis_skin_checked'],
            childList: true,
            subtree: true,
          });
        } catch (error) {
          console.warn('Failed to clean bis_skin_checked attributes', error);
        }
      })();`}</Script>
        {children}
      </body>
    </html>
  )
}
