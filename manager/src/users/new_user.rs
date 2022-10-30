use super::clap_parser::NewUserArgs;

use db::models::NewUser;

pub fn handle_command(args: &NewUserArgs, db_url: &str) {
    println!("Supplied values: {:#?}", args);

    let pool = db::connect_pool(db_url);
    let mut conn = pool.get().unwrap();

    let user = NewUser {
        username: args.username.clone(),
        display_name: args.display_name.clone(),
        group_name: args.group.clone(),
    };

    let result = user.insert(&mut conn);
    println!("Operation result: {:?}", result);
}
