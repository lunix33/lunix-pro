import { NextMiddleware } from "next/server";

import { configuration } from "@i18n/config";
import i18n from "@i18n/middleware";

export const middleware: NextMiddleware = i18n(configuration);
