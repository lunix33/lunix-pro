use async_graphql::{Context, Object};

pub(crate) struct QueryRoot;

#[Object]
impl QueryRoot {
    async fn hello<'a>(&self, ctx: &Context<'a>) -> String {
        String::from("Query World")
    }
}
