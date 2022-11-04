import { ReactElement } from "react";

import Users from "@c/pages/admin/users";

export default function UsersPage(): ReactElement {
  return (
    <div
      css={{ padding: "1rem", backgroundColor: "hsla(55deg, 100%, 75%, 1)" }}
      className="hello"
    >
      <Users />
    </div>
  );
}
