use clap::{Args, Subcommand};

#[derive(Debug, Subcommand)]
pub enum GroupCommands {
    #[command(about = "List the available groups. (alias = `ls`)", alias = "ls")]
    List(ListArgs),
}

#[derive(Debug, Args)]
pub struct ListArgs {
    #[arg(short, long, help = "Show the deleted groups.")]
    pub deleted: bool,
}
