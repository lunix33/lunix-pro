use clap::{Args, Subcommand};

#[derive(Debug, Subcommand)]
pub enum UserCommands {
    #[command(about = "Create a new user.")]
    Create(NewUserArgs),
    #[command(about = "Create a new token for a specified user.")]
    CreateToken(NewTokenArgs),
}

#[derive(Debug, Args)]
pub struct NewUserArgs {
    #[arg(short, long, help = "The login name.")]
    pub username: String,
    #[arg(short, long, help = "An optional display name.")]
    pub display_name: Option<String>,
    #[arg(short, long, help = "The name of the group the user is part of.")]
    pub group: String,
}

#[derive(Debug, Args)]
pub struct NewTokenArgs {
    #[arg(short, long, help = "The user to which the token will be attached.")]
    pub username: String,
}
