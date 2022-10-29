use async_graphql::{Context, EmptySubscription, Error, Guard, Result, Schema};
use db::{group::Permissions, DbPool};
use log::error;

use crate::user_extractor::UserExtractor;

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

struct Authorization<'a>(&'a [Permissions]);

#[async_trait::async_trait]
impl<'a> Guard for Authorization<'a> {
    async fn check(&self, ctx: &Context<'_>) -> Result<()> {
        match ctx.data::<UserExtractor>() {
            Ok(req_user) => match req_user.user {
                Some(ref _user) => Ok(()),
                None => Err(Error::new("Forbidden")),
            },
            Err(_) => Err(Error::new("Forbidden")),
        }
    }
}

fn get_db_connection<'a>(ctx: &'a Context<'_>) -> Result<db::DbPooledConnection> {
    match ctx.data::<DbPool>() {
        Ok(ref pool) => match pool.get() {
            Ok(conn) => Ok(conn),
            Err(e) => {
                error!("Unable to get database connection instance: {:#?}", e);
                Err(Error::new("Unable to retrive data"))
            }
        },
        Err(e) => {
            error!("Unable to get database connection pool: {:#?}", e);
            Err(Error::new("Unable to retrive data"))
        }
    }
}
