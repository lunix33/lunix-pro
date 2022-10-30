use clap::{Parser, Subcommand};

use crate::users::clap_parser::UserCommands;

#[derive(Debug, Parser)]
#[command(name = "LunixPro manager")]
#[command(about = "Utility binary for LunixPro blog system.", long_about = None)]
pub struct Cli {
    #[command(subcommand)]
    pub command: Commands,
}

#[derive(Debug, Subcommand)]
pub enum Commands {
    #[command(subcommand, about = "User manipulation oparations.")]
    User(UserCommands),
}
