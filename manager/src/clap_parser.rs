use clap::{Args, Parser, Subcommand};

#[derive(Debug, Parser)]
#[command(name = "LunixPro manager")]
#[command(about = "Utility binary for LunixPro blog system.", long_about = None)]
pub struct Cli {
    #[command(subcommand)]
    pub command: Commands,
}

#[derive(Debug, Subcommand)]
pub enum Commands {
    #[command(about = "Create a new user.")]
    NewUser(NewUserArgs),
    #[command(about = "Create a new token for a specified user.")]
    NewToken(NewTokenArgs),
}

#[derive(Debug, Args)]
pub struct NewUserArgs {
    #[arg(short, long, help = "The login name")]
    pub username: String,
    #[arg(short, long, help = "An optional display name")]
    pub display_name: Option<String>,
}

#[derive(Debug, Args)]
pub struct NewTokenArgs {
    #[arg(short, long, help = "The user to which the token will be attached.")]
    pub username: String,
}
