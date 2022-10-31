use db::models::Group;

use super::clap_parser::ListArgs;

pub fn handle_command(args: &ListArgs, db_url: &str) {
    println!("Supplied values: {:#?}", args);

    let pool = db::connect_pool(db_url);
    let mut conn = pool.get().unwrap();

    let with_deleted = args.deleted;
    let groups = Group::get_groups(&mut conn, Some(with_deleted), None).unwrap();

    for group in groups {
        println!("{group:?}");
    }
}
