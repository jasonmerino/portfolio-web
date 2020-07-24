import React, { FC } from "react";
import Link from "next/link";
import moment from "moment";
import { screenWidthSmall } from "../theme/space";
import { primary } from "../theme/colors";

interface IBlogEntryTile {
  date: string;
  title: string;
  href: string;
}

export const BlogEntryTile: FC<IBlogEntryTile> = ({ title, date, href }) => {
  return (
    <>
      <Link href={href}>
        <div className="article-container">
          <div>
            <h3 className="heading">{title}</h3>
          </div>
          <div>
            <span className="f6 i dark1">
              {moment(date, "YYYY-MM-DD").format("MMM D, YYYY")}
            </span>
          </div>
        </div>
      </Link>
      <style jsx>{`
        .article-container {
          width: 100%;
          float: left;
          cursor: pointer;
          margin: 1rem 0;
          padding: 0 1rem;
        }
        .heading {
          color: ${primary};
          margin: 0.7rem 0 0;
        }
        .heading:hover {
          text-decoration: underline;
        }
        @media screen and (min-width: ${screenWidthSmall}) {
          .article-container {
            width: 50%;
          }
        }
      `}</style>
    </>
  );
};
