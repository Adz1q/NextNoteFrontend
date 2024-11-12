import "./globals.css";
import "@fontsource/roboto";
import SessionWrapper from "@/components/sessionWrapper/SessionWrapper";
import Navigation from "@/components/navigation/Navigation";

export default function RootLayout({ children }) {

    return (
      <SessionWrapper>
          <html lang="en">
              <body>
                <Navigation>
                    { children }
                </Navigation>
              </body>
          </html>
      </SessionWrapper>
  );
}
