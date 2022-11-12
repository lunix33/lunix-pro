use db::models::User;

use super::clap_parser::ListArgs;

pub fn handle_command(args: &ListArgs, db_url: &str) {
    println!("Supplied values: {:#?}", args);

    let pool = db::connect_pool(db_url);
    let mut conn = pool.get().unwrap();

    let with_deleted = args.deleted;
    let users = User::get_users(&mut conn, with_deleted, None).unwrap();

    for user in users {
        println!("{user:?}");
    }
}
