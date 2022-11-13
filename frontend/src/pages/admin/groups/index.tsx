import { ReactElement } from "react";

import { GroupsList } from "@f/group_management";

export default function UsersPage(): ReactElement {
  return (
    <div css={{ padding: "1rem" }} className="hello">
      <GroupsList />
    </div>
  );
}
