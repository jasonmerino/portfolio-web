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
        <div className="pa3 tile br3 pointer w-50">
          <h3>{title}</h3>
        </div>
      </Link>
      <style jsx>{`
        .tile {
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </>
  );
};
