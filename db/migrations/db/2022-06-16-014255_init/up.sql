CREATE TABLE "users"(
  "username" TEXT NOT NULL,
  "display_name" TEXT NULL DEFAULT NULL,
  "created_on" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_on" DATETIME NULL DEFAULT NULL,
  PRIMARY KEY("username")
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
  "image" TEXT NULL DEFAULT NULL,
  "has_comments" BOOLEAN NOT NULL DEFAULT TRUE,
  "is_hidden" BOOLEAN NOT NULL DEFAULT FALSE,
  "created_on" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_on" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_on" DATETIME NULL DEFAULT NULL,
  "publicated_on" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "author_username" TEXT NOT NULL,
  PRIMARY KEY("stub"),
  FOREIGN KEY("author_username") REFERENCES "users"("username")
);

CREATE TABLE "page_technologies"(
  "page_stub" TEXT NOT NULL,
  "technology_stub" TEXT NOT NULL,
  PRIMARY KEY("page_stub", "technology_stub"),
  FOREIGN KEY("page_stub") REFERENCES "pages"("stub"),
  FOREIGN KEY("technology_stub") REFERENCES "pages"("stub")
);

CREATE TABLE "page_categories"(
  "category_name" TEXT NOT NULL,
  "page_stub" TEXT NOT NULL,
  PRIMARY KEY("category_name", "page_stub"),
  FOREIGN KEY("page_stub") REFERENCES "pages"("stub")
);
