pub mod clap_parser;

mod list;
mod new_token;
mod new_user;

pub fn route_command(command: &clap_parser::UserCommands, db_url: &str) {
    use clap_parser::UserCommands::*;

    match *command {
        List(ref c) => list::handle_command(c, db_url),
        Create(ref c) => new_user::handle_command(c, db_url),
        CreateToken(ref c) => new_token::handle_command(c, db_url),
    }
}
