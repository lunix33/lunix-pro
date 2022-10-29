use async_graphql::SimpleObject;
use chrono::NaiveDateTime;

use super::Authorization;

/// Representation of a single user token.
#[derive(SimpleObject)]
pub struct UserToken {
    // #[graphql(skip)]
    // db_object: db::user_token::UserToken,
    /// The username of the user associated with the token.
    #[graphql(guard = "Authorization(&[])")]
    pub user_username: String,
    /// Date when the token was created.
    #[graphql(guard = "Authorization(&[])")]
    pub created_on: NaiveDateTime,
    /// Date when the token will expire.
    #[graphql(guard = "Authorization(&[])")]
    pub expires_on: NaiveDateTime,
}

impl From<db::user_token::UserToken> for UserToken {
    fn from(db_token: db::user_token::UserToken) -> Self {
        Self {
            // db_object: db_token.clone(),
            user_username: db_token.user_username,
            created_on: db_token.created_on,
            expires_on: db_token.expires_on,
        }
    }
}
