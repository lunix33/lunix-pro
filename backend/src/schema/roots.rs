use async_graphql::SimpleObject;

use super::{groups::GroupQuery, users::UsersQuery};

#[derive(SimpleObject)]
pub struct QueryRoot {
    users: UsersQuery,
    groups: GroupQuery,
}

impl Default for QueryRoot {
    fn default() -> Self {
        Self {
            users: UsersQuery,
            groups: GroupQuery,
        }
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
