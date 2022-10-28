#[macro_use]
extern crate diesel;

use diesel::{
    r2d2::{ConnectionManager, Pool},
    sqlite::Sqlite,
    SqliteConnection,
};
use diesel_migrations::{
    embed_migrations, EmbeddedMigrations, HarnessWithOutput, MigrationHarness,
};

mod hasher;
mod models;
mod result;
mod schema;
pub use hasher::*;
pub use models::*;
pub use result::*;

const MIGRATION: EmbeddedMigrations = embed_migrations!("./migrations/db");

pub type DbConnection = SqliteConnection;
pub type DbBackend = Sqlite;
pub type DbPool = Pool<ConnectionManager<DbConnection>>;

pub fn connect_pool(database_url: &str) -> DbPool {
    let manager = ConnectionManager::<DbConnection>::new(database_url);
    let pool = Pool::builder()
        .build(manager)
        .expect(&format!("Unable to open database: {}", database_url));

    let mut connection = pool.get().unwrap();
    run_migrations(&mut connection).expect("Migrations failed.");

    pool
}

pub fn env_url() -> String {
    std::env::var("LP_DATABASE_URL").unwrap_or(String::from("./db.sqlite3"))
}

fn run_migrations(
    connection: &mut impl MigrationHarness<DbBackend>,
) -> diesel::migration::Result<()> {
    HarnessWithOutput::write_to_stdout(connection).run_pending_migrations(MIGRATION)?;

    Ok(())
}
