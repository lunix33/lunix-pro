pub mod clap_parser;

mod list;

pub fn route_command(command: &clap_parser::GroupCommands, db_url: &str) {
    use self::clap_parser::GroupCommands::*;

    match *command {
        List(ref c) => list::handle_command(c, db_url),
    }
}
