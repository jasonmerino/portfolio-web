import Highlight from "react-highlight";
import { FC } from "react";

interface Props {
  value: any;
}

export const Code: FC<Props> = ({ value }) => {
  return <Highlight className="code">{value}</Highlight>;
};
