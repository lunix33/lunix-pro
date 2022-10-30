CREATE TABLE "groups"(
  "name" TEXT NOT NULL,
  "created_on" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_on" DATETIME NULL,
  PRIMARY KEY("name")
);

CREATE TABLE "group_permissions"(
  "group_name" TEXT NOT NULL,
  "permission" TEXT NOT NULL,
  PRIMARY KEY("group_name", "permission"),
  FOREIGN KEY("group_name") REFERENCES "group"("name")
);

CREATE TABLE "users"(
  "username" TEXT NOT NULL,
  "display_name" TEXT NULL,
  "group_name" TEXT NOT NULL,
  "created_on" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_on" DATETIME NULL,
  PRIMARY KEY("username"),
  FOREIGN KEY("group_name") REFERENCES "group"("name")
);

CREATE TABLE "user_tokens"(
  "token" TEXT NOT NULL,
  "user_username" TEXT NOT NULL,
  "created_on" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "expires_on" DATETIME NOT NULL,
  PRIMARY KEY("token"),
  FOREIGN KEY("user_username") REFERENCES "users"("username")
);

CREATE TABLE "pages"(
  "stub" TEXT NOT NULL,
  "kind" TEXT CHECK( "kind" IN ('page', 'blog', 'technology') ) NOT NULL DEFAULT 'page',
  "title" TEXT NOT NULL DEFAULT '',
  "content" TEXT NOT NULL DEFAULT '',
  "created_on" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_on" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_on" DATETIME NULL,
  "publicated_on" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "author_username" TEXT NOT NULL,
  PRIMARY KEY("stub"),
  FOREIGN KEY("author_username") REFERENCES "users"("username")
);

CREATE TABLE "page_relations"(
  "page_stub" TEXT NOT NULL,
  "relation_stub" TEXT NOT NULL,
  PRIMARY KEY("page_stub", "relation_stub"),
  FOREIGN KEY("page_stub") REFERENCES "pages"("stub"),
  FOREIGN KEY("relation_stub") REFERENCES "pages"("stub")
);

CREATE TABLE "page_metas"(
  "page_stub" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "value" TEXT NULL,
  PRIMARY KEY("page_stub", "key"),
  FOREIGN KEY("page_stub") REFERENCES "pages"("stub")
);

CREATE TABLE "page_comments"(
  "id" TEXT NOT NULL,
  "title" TEXT NULL,
  "content" TEXT NOT NULL,
  "identity" TEXT NOT NULL,
  "page_stub" TEXT NOT NULL,
  "created_on" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_on" DATETIME NULL,
  PRIMARY KEY("id"),
  FOREIGN KEY("page_stub") REFERENCES "page"("stub")
);

INSERT INTO "groups"("name") VALUES ("Owner");
