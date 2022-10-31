use clap::{Parser, Subcommand};

use crate::{groups::clap_parser::GroupCommands, users::clap_parser::UserCommands};

#[derive(Debug, Parser)]
#[command(name = "LunixPro manager", about = "Utility binary for LunixPro blog system.", long_about = None)]
pub struct Cli {
    #[command(subcommand)]
    pub command: Commands,
}

#[derive(Debug, Subcommand)]
pub enum Commands {
    #[command(
        subcommand,
        about = "User manipulation oparations. (alias: `u`)",
        alias = "u"
    )]
    User(UserCommands),
    #[command(
        subcommand,
        about = "Group manipulation oparations. (alias: `g`)",
        alias = "g"
    )]
    Group(GroupCommands),
}
