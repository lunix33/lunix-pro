use async_graphql::SimpleObject;

use super::users::UsersQuery;

#[derive(SimpleObject)]
pub struct QueryRoot {
    users: UsersQuery,
}

impl Default for QueryRoot {
    fn default() -> Self {
        Self { users: UsersQuery }
    }
}

#[derive(SimpleObject)]
pub struct MutationRoot {
    hello: String,
}

impl Default for MutationRoot {
    fn default() -> Self {
        Self {
            hello: String::from("Hello world"),
        }
    }
}
