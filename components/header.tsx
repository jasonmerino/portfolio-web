import React, { useEffect, useState } from "react";
import { HeaderLink } from "./header-link";
import { useTrail, animated, useTransition } from "react-spring";

const items = [
  {
    to: "/",
    text: "Home",
  },
  {
    to: "/about-me",
    text: "About",
  },
  {
    to: "/projects",
    text: "Projects",
  },
  {
    to: "/resources",
    text: "Resources",
  },
  {
    to: "/resume.pdf",
    text: "Resume",
  },
];

export const Header = () => {
  const [show, setShow] = useState(false);
  const transitions = useTransition(show, null, {
    from: { opacity: 0, backgroundColor: "#fff" },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const [trail, set] = useTrail<{ opacity: number; transform: string }>(
    items.length,
    () => ({
      opacity: 0,
      transform: "translateY(-20px)",
    })
  );

  useEffect(() => {
    set({ opacity: 1, transform: "translateY(0)" });
  }, []);

  return (
    <>
      <header className="bg-white header-nav">
        <nav className="mw8 center">
          {/* mobile menu */}
          <div
            className="dn-ns dib white pointer pt3 pl3"
            onClick={() => {
              setShow(!show);
            }}
          >
            <img
              src="/menu.svg"
              alt="navigation menu icon"
              height="26"
              width="26"
            />
          </div>
          <div className="dn db-ns">
            {trail.map((props, index) => (
              <animated.div
                className="dib"
                style={props}
                key={items[index].text}
              >
                {items[index].to.includes(".") ? (
                  <a
                    href={items[index].to}
                    className="pa3 dib dark1 no-underline grow"
                  >
                    {items[index].text}
                  </a>
                ) : (
                  <HeaderLink to={items[index].to}>
                    {items[index].text}
                  </HeaderLink>
                )}
              </animated.div>
            ))}
          </div>
        </nav>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div
                key={key}
                style={props}
                className="header-mobile-menu"
              >
                <div onClick={() => setShow(false)} className="pointer pa3">
                  <img src="/close.svg" height="26" width="26" />
                </div>
                {trail.map((props, index) => (
                  <div className="db tc" key={items[index].to}>
                    <HeaderLink to={items[index].to}>
                      {items[index].text}
                    </HeaderLink>
                  </div>
                ))}
              </animated.div>
            )
        )}
      </header>

      <style jsx>{`
        .header-nav {
          position: relative;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
          z-index: 2;
        }

        .header-mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 10;
        }
      `}</style>
    </>
  );
};
