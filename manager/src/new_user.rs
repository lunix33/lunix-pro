use crate::clap_parser::NewUserArgs;

pub fn handle_command(args: &NewUserArgs, db_url: &str) {
    println!("Supplied values: {:#?}", args);

    let pool = db::connect_pool(db_url);
    let mut conn = pool.get().unwrap();

    let user = db::user::NewUser {
        username: args.username.clone(),
        display_name: args.display_name.clone(),
    };

    let result = user.insert(&mut conn);
    println!("Operation result: {:?}", result);
}
