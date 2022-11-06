use async_graphql::{InputObject, OutputType, SimpleObject};

use super::{groups::group::Group, users::user::User};

#[derive(SimpleObject)]
#[graphql(concrete(name = "PagedUsers", params(User)))]
#[graphql(concrete(name = "PagedGroups", params(Group)))]
pub struct PagedResult<T: OutputType> {
    pub data: Vec<T>,
    pub count: i64,
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
