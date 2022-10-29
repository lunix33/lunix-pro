use std::sync::Arc;

use async_graphql::{ComplexObject, Context, SimpleObject};
use chrono::NaiveDateTime;

use crate::{
    result::{ApplicationError, ApplicationResult},
    schema::{field_name, get_db_connection, users::user_token::UserToken, Authorization},
};

/// Representation of a single user.
#[derive(SimpleObject)]
#[graphql(complex)]
pub struct User {
    #[graphql(skip)]
    db_object: db::user::User,
    /// The username of the user.
    pub username: String,
    /// The public display name of the user, if one is available.
    pub display_name: Option<String>,
    /// The date when the user was created.
    #[graphql(guard = "Authorization(&[])")]
    pub created_on: NaiveDateTime,
    /// The date when the user was deleted.
    #[graphql(guard = "Authorization(&[])")]
    pub deleted_on: Option<NaiveDateTime>,
}

#[ComplexObject]
impl User {
    /// List of unexpired token of the user.
    #[graphql(guard = "Authorization(&[])")]
    async fn tokens<'a>(&self, ctx: &'a Context<'_>) -> ApplicationResult<Vec<UserToken>> {
        let mut conn = get_db_connection(ctx)?;
        let tokens = self.db_object.tokens(&mut conn).map_err(|err| {
            ApplicationError::Fetch(
                field_name(ctx),
                Some(self.username.clone()),
                Some(Arc::new(err)),
            )
        })?;
        Ok(tokens.into_iter().map(UserToken::from).collect())
    }
}

impl From<db::user::User> for User {
    fn from(db_user: db::user::User) -> Self {
        Self {
            db_object: db_user.clone(),
            username: db_user.username,
            display_name: db_user.display_name,
            created_on: db_user.created_on,
            deleted_on: db_user.deleted_on,
        }
    }
}
