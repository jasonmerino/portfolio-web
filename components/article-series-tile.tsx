import { FC } from "react";
import Link from "next/link";
import { slugify } from "../utils/string";

interface Props {
  title: string;
}

export const ArticleSeriesTile: FC<Props> = ({ title }) => {
  return (
    <>
      <Link href={`/series/${slugify(title)}`}>
        <div className="link">
          <h3>{title}</h3>
        </div>
      </Link>
      <style jsx>{`
        .link {
          cursor: pointer;
          padding: 0.5rem 1rem;
          width: 100%;
        }
      `}</style>
    </>
  );
};
