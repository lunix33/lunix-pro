use clap::Parser;

mod clap_parser;
mod groups;
mod users;

use clap_parser::{Cli, Commands};

fn main() {
    use Commands::*;

    let args = Cli::parse();
    let db_url = db::env_url();
    println!("Using DB: {db_url}");

    match args.command {
        User(ref c) => users::route_command(&c, &db_url),
        Group(ref c) => groups::route_command(&c, &db_url),
    }
}
