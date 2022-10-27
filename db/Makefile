SHELL = /bin/bash
HERE := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))
DATABASE_URL := $(HERE)../backend/db.sqlite3

DIESEL_DB_ARGS = --migration-dir "$(HERE)migrations/db" --database-url "$(DATABASE_URL)"
DIESEL_SEED_ARGS = --migration-dir "$(HERE)migrations/seed" --database-url "$(DATABASE_URL)"

new-migration:
	@[ "$(NAME)" == "" ] && echo "NAME argument required" && exit 1 || true
	diesel migration generate $(DIESEL_DB_ARGS) $(NAME)
	diesel migration generate $(DIESEL_SEED_ARGS) $(NAME)

db:
	rm -f $(DATABASE_URL)
	diesel migration run $(DIESEL_DB_ARGS)

dev-db: db
	diesel migration run $(DIESEL_SEED_ARGS)
