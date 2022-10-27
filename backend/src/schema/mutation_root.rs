use async_graphql::{Context, Object};

pub(crate) struct MutationRoot;

#[Object]
impl MutationRoot {
    async fn hello<'a>(&self, ctx: &Context<'a>) -> String {
        String::from("Query World")
    }
}
