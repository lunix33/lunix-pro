use clap::Parser;

mod clap_parser;
use clap_parser::{Cli, Commands};

mod new_token;
mod new_user;

fn main() {
    let args = Cli::parse();
    let db_url = std::env::var("DATABASE_URL").unwrap_or(String::from("./db.sqlite3"));

    match args.command {
        Commands::NewUser(ref c) => new_user::handle_command(c, &db_url),
        Commands::NewToken(ref c) => new_token::handle_command(c, &db_url),
    }
}
