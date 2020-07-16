import React, { FC } from "react";

interface IProps {
  url: string;
  text: string;
  theme?: "light" | "dark";
  className?: string;
}

export const Button: FC<IProps> = ({ url, text, theme, className }) => {
  return (
    <>
      <a href={url} className={`button grow ${theme} ${className}`}>
        {text}
      </a>
      <style jsx>{`
        .button {
          display: inline-block;
          padding: 0.5rem 1rem;
          background-color: white;
          color: #60c1a9;
          font-weight: bold;
          text-decoration: none;
          border-radius: 3rem;
        }
        .button.dark {
          background-color: #60c1a9;
          color: white;
        }
      `}</style>
    </>
  );
};
