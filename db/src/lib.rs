use diesel::{
    r2d2::{ConnectionManager, Pool, PooledConnection},
    sqlite::Sqlite,
    SqliteConnection,
};
use diesel_migrations::{
    embed_migrations, EmbeddedMigrations, HarnessWithOutput, MigrationHarness,
};

mod hasher;
pub mod models;
mod result;
mod schema;
pub use hasher::*;
pub use result::*;

const MIGRATION: EmbeddedMigrations = embed_migrations!("./migrations/db");

pub type DbConnection = SqliteConnection;
pub type DbConnectionManager = ConnectionManager<DbConnection>;
pub type DbPooledConnection = PooledConnection<DbConnectionManager>;
pub type DbPool = Pool<DbConnectionManager>;
pub type DbBackend = Sqlite;

pub struct PageOptions {
    /// The number of item to skip before the first fetched item.
    pub offset: i64,
    /// The number of element to be returned by the query.
    pub limit: i64,
}

impl PageOptions {
    pub fn new(offset: i64, limit: i64) -> Self {
        Self { offset, limit }
    }
}

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
