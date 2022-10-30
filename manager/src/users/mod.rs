pub mod clap_parser;

pub mod new_token;
pub mod new_user;

pub fn route_command(command: &clap_parser::UserCommands, db_url: &str) {
    use clap_parser::UserCommands;

    match *command {
        UserCommands::Create(ref c) => new_user::handle_command(c, &db_url),
        UserCommands::CreateToken(ref c) => new_token::handle_command(c, &db_url),
    }
}
