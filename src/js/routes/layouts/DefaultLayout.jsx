import { Outlet } from "react-router";
import { Link } from "react-router-dom";

import { Icon } from "../../components/Icon";
import { Container } from "../../components/Container";
import { Logo } from "../../components/Illustrations/Logo";
import { ToggleThemeButton } from "../../components/ToggleThemeButton";
import { NavLink } from "../../components/NavLink";

export function DefaultLayout() {
  return (
    <div className="app-layout">
      <div>
        <header>
          <Container>
            <div className="header-items">
              <div className="left hidden sm:block">
                <Link to="/">
                  <Logo />
                </Link>
              </div>
              <div className="right">
                <NavLink to="/" className="navlink">
                  <Icon icon="home" /> Home
                </NavLink>
                <NavLink className="navlink" to="/search">
                  <Icon icon="search" /> Search
                </NavLink>
                <ToggleThemeButton />
              </div>
            </div>
          </Container>
        </header>

        <Container className="mt-4">
          <Outlet />
        </Container>
      </div>

      <footer>
        My Reads {new Date().getFullYear()} |{" "}
        <Link to="/credits" className="link">
          Credits
        </Link>
      </footer>
    </div>
  );
}
