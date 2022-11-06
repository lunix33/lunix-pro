use std::sync::{Arc, Mutex};

use async_graphql::{Context, EmptySubscription, Guard, Result, Schema};
use db::{DbConnection, DbPooledConnection};

use crate::{
    result::{ApplicationError, ApplicationResult},
    user_extractor::UserExtractor,
};

mod pagination;
mod roots;

mod groups;
mod users;

pub(crate) type GraphQlSchema = Schema<roots::QueryRoot, roots::MutationRoot, EmptySubscription>;

pub(crate) fn create_schema() -> GraphQlSchema {
    Schema::build(
        roots::QueryRoot::default(),
        roots::MutationRoot::default(),
        EmptySubscription,
    )
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

fn get_db_connection<'a, T>(
    ctx: &'a Context<'_>,
    exec: impl FnOnce(&mut DbConnection) -> ApplicationResult<T>,
) -> ApplicationResult<T> {
    match ctx.data::<Arc<Mutex<DbPooledConnection>>>() {
        Ok(mutex) => match mutex.lock() {
            Ok(mut conn) => exec(&mut conn),
            Err(e) => Err(ApplicationError::DatabaseConnectionLock(format!("{e:#?}"))),
        },
        Err(e) => Err(ApplicationError::GqlContextData(
            "DbConnection".to_string(),
            e,
        )),
    }
}

fn field_name<'a>(ctx: &'a Context<'_>) -> String {
    ctx.field().name().to_string()
}
