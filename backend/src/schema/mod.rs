use std::sync::Arc;

use async_graphql::{Context, EmptySubscription, Guard, InputObject, Result, Schema};
use db::DbPool;

use crate::{
    result::{ApplicationError, ApplicationResult},
    user_extractor::UserExtractor,
};

mod roots;
mod users;

pub(crate) type GraphQlSchema = Schema<roots::QueryRoot, roots::MutationRoot, EmptySubscription>;

pub(crate) fn create_schema(conn: DbPool) -> GraphQlSchema {
    Schema::build(
        roots::QueryRoot::default(),
        roots::MutationRoot::default(),
        EmptySubscription,
    )
    .data(conn)
    .finish()
}

struct Authorization<'a>(&'a [&'a str]);

#[async_trait::async_trait]
impl<'a> Guard for Authorization<'a> {
    async fn check(&self, ctx: &Context<'_>) -> Result<()> {
        let req_user = ctx
            .data::<UserExtractor>()
            .map_err(|err| ApplicationError::GqlContextData("UserExtractor".to_string(), err))?;
        let _user = req_user.user.as_ref().ok_or(ApplicationError::Forbidden(
            req_user.ip.clone(),
            req_user.user.clone(),
            field_name(ctx),
        ))?;
        Ok(())
    }
}

#[derive(InputObject)]
pub struct PageOptions {
    /// The number of item to skip before the first result.
    offset: i64,
    /// The number of item to be returned by the query.
    limit: i64,
}

impl Into<db::PageOptions> for PageOptions {
    fn into(self) -> db::PageOptions {
        db::PageOptions::new(self.offset, self.limit)
    }
}

fn get_db_connection<'a>(ctx: &'a Context<'_>) -> ApplicationResult<db::DbPooledConnection> {
    match ctx.data::<DbPool>() {
        Ok(ref pool) => match pool.get() {
            Ok(conn) => Ok(conn),
            Err(e) => Err(ApplicationError::Database(Arc::new(e))),
        },
        Err(e) => Err(ApplicationError::GqlContextData("DbPool".to_string(), e)),
    }
}

fn field_name<'a>(ctx: &'a Context<'_>) -> String {
    ctx.field().name().to_string()
}
