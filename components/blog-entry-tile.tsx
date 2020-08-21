import React, { FC } from "react";
import Link from "next/link";
import moment from "moment";
import { screenWidthSmall, space1Px } from "../theme/space";
import { primary } from "../theme/colors";
import { Pill } from "./pill";

interface IBlogEntryTile {
  date: string;
  title: string;
  href: string;
  tags?: string[];
}

export const BlogEntryTile: FC<IBlogEntryTile> = ({
  title,
  date,
  href,
  tags,
}) => {
  return (
    <>
      <Link href={href}>
        <div className="article-container">
          <div>
            <h3 className="heading">{title}</h3>
          </div>
          <div>
            <span className="f6 i dark1 pr2">
              {moment(date, "YYYY-MM-DD").format("MMM D, YYYY")}
            </span>
            {(tags || []).map((tag) => {
              return (
                <span className="tag" key={tag}>
                  <Pill>{tag}</Pill>
                </span>
              );
            })}
          </div>
        </div>
      </Link>
      <style jsx>{`
        .tag {
          margin: 0 ${space1Px};
        }
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
