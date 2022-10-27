use db::{user::User, DbPool};

pub(crate) struct GraphQlContext {
    pub db: DbPool,
    pub user: Option<User>,
}

impl juniper::Context for GraphQlContext {}
