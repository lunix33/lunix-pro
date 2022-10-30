use clap::Parser;

mod clap_parser;
use clap_parser::{Cli, Commands};

pub mod users;

fn main() {
    let args = Cli::parse();
    let db_url = db::env_url();

    match args.command {
        Commands::User(ref c) => users::route_command(&c, &db_url),
    }
}
