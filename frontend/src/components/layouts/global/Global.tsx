import { ReactElement } from "react";
import { Global as EmotionGlobal } from "@emotion/react";

import { GlobalProps } from "./types";

export function Global({ children }: GlobalProps): ReactElement {
  return (
    <>
      <EmotionGlobal styles={(_theme) => ({})} />
      {children}
    </>
  );
}
