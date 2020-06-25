import React, { FC } from "react";
import Link from "next/link";

interface IHeaderLinkOwnProps {
  to: string;
  children: string;
}

export const HeaderLink: FC<IHeaderLinkOwnProps> = ({ to, children }) => (
  <Link href={to}>
    <span className="pa3 dib dark1 no-underline pointer">{children}</span>
  </Link>
);
