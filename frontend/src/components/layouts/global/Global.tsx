import { Global as EmotionGlobal } from "@emotion/react";
import type { ReactElement } from "react";
import type { GlobalProps } from "./types";

export function Global({ children }: GlobalProps): ReactElement {
  return (
    <>
      <EmotionGlobal
        styles={(_theme) => ({
          "html, body": {
            padding: 0,
            margin: 0,
          },
        })}
      />
      {children}
    </>
  );
}
