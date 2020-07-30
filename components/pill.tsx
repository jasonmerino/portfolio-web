import React, { FC } from "react";
import { dark1, light1 } from "../theme/colors";
import { space1Px, space2Px, space3Px } from "../theme/space";

export const Pill: FC = ({ children }) => {
  return (
    <>
      <span>{children}</span>
      <style jsx>
        {`
          span {
            background-color: ${light1};
            color: ${dark1};
            padding: ${space1Px} ${space2Px};
            border-radius: ${space3Px};
            font-size: 0.7rem;
          }
        `}
      </style>
    </>
  );
};
