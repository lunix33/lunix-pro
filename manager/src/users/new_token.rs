use backend::Argon2Hasher;
use db::models::UserToken;

use super::clap_parser::NewTokenArgs;

pub fn handle_command(args: &NewTokenArgs, db_url: &str) {
    println!("Supplied values: {:#?}", args);

    let hasher = Argon2Hasher::default();
    let (db_token, token) = UserToken::new(&args.username, &hasher).unwrap();
    println!(
        "Generated token: {}\nFor: {}\nExpires on: {}",
        token, args.username, db_token.expires_on
    );

    let pool = db::connect_pool(db_url);
    let mut conn = pool.get().unwrap();

    let result = db_token.insert(&mut conn);
    println!("Operation result: {:?}", result);
}
