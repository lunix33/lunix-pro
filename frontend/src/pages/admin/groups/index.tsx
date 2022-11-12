import { ReactElement } from "react";

import Groups from "@c/pages/admin/groups";

export default function UsersPage(): ReactElement {
  return (
    <div css={{ padding: "1rem" }} className="hello">
      <Groups />
    </div>
  );
}
