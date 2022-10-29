use async_graphql::{Context, Error, Object, Result};
use log::error;

use super::{get_db_connection, Authorization};

mod user;
mod user_token;

pub struct UsersQuery;

#[Object]
impl UsersQuery {
    /// Get a list of all the users
    #[graphql(guard = "Authorization(&[])")]
    async fn get_users<'a>(
        &self,
        ctx: &'a Context<'_>,
        #[graphql(desc = "When true, the deleted users will also be part of the results.")]
        with_deleted: Option<bool>,
    ) -> Result<Vec<user::User>> {
        let with_deleted = with_deleted.unwrap_or(false);
        let mut conn = get_db_connection(ctx)?;
        let users = db::user::User::get_users(&mut conn, with_deleted).map_err(|err| {
            error!("Failed to fetch user list: {:#?}", err);
            Error::new("Unable to get the list of users.")
        })?;
        Ok(users.into_iter().map(user::User::from).collect())
    }
}
