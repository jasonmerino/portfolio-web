import React, { FC } from "react"

interface IProps {
  url: string
  text: string
  theme?: "light" | "dark"
  className?: string
}

export const Button: FC<IProps> = ({ url, text, theme, className }) => {
  const styles = theme === "light" ? "white" : "black"
  return (
    <a
      href={url}
      className={`f5 grow no-underline br-pill ba ph3 pv2 mb2 dib ${styles} ${className}`}
    >
      {text}
    </a>
  )
}
