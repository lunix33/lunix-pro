use std::sync::Arc;

use async_graphql::{Context, Object};

use crate::{
    result::{ApplicationError, ApplicationResult},
    schema::{
        field_name, get_db_connection,
        pagination::{PageOptions, PagedResult},
        Authorization,
    },
    user_extractor::UserExtractor,
};

pub mod user;
pub mod user_token;

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
        #[graphql(desc = "Optional pagination option")] page: Option<PageOptions>,
    ) -> ApplicationResult<PagedResult<user::User>> {
        get_db_connection(ctx, move |mut conn| {
            let data = db::models::User::get_users(&mut conn, with_deleted, page.map(|o| o.into()))
                .map_err(|err| ApplicationError::Fetch(field_name(ctx), None, Some(Arc::new(err))))?
                .into_iter()
                .map(user::User::from)
                .collect();
            let count = db::models::User::count(&mut conn).map_err(|err| {
                ApplicationError::Fetch(field_name(ctx), None, Some(Arc::new(err)))
            })?;

            Ok(PagedResult { data, count })
        })
    }

    /// Get the detail of the currently logged in user.
    #[graphql(name = "self")]
    async fn self_user<'a>(&self, ctx: &'a Context<'_>) -> ApplicationResult<Option<user::User>> {
        match ctx.data::<UserExtractor>() {
            Ok(ref req_user) => Ok(req_user.user.clone().map(|u| u.into())),
            Err(err) => Err(ApplicationError::GqlContextData(
                "UserExtractor".to_string(),
                err,
            )),
        }
    }
}
