import React, { FC } from "react";
import Link from "next/link";
import moment from "moment";

interface IBlogEntryTile {
  date: string;
  title: string;
  href: string;
}

export const BlogEntryTile: FC<IBlogEntryTile> = ({ title, date, href }) => {
  return (
    <div className="w-100">
      <Link href={href}>
        <div className="entry-shadow mv2 pv2 ph3 cf pointer">
          <div>
            <h3 className="f4 mv2">{title}</h3>
          </div>
          <div>
            <span className="f6 i dark1">
              {moment(date, "YYYY-MM-DD").format("MMM D, YYYY")}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};
