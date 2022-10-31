use clap::{Args, Subcommand};

#[derive(Debug, Subcommand)]
pub enum UserCommands {
    #[command(about = "List the users (alias: `ls`)", alias = "ls")]
    List(ListArgs),
    #[command(about = "Create a new user. (alias: `mk`)", alias = "mk")]
    Create(NewUserArgs),
    #[command(
        about = "Create a new token for a specified user. (alias: `mktok`)",
        alias = "mktok"
    )]
    CreateToken(NewTokenArgs),
}

#[derive(Debug, Args)]
pub struct ListArgs {
    #[arg(short, long, help = "Show the deleted users.")]
    pub deleted: bool,
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
