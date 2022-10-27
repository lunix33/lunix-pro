use async_graphql::{EmptySubscription, Schema};
use db::DbPool;

mod mutation_root;
mod query_root;

pub(crate) type GraphQlSchema =
    Schema<query_root::QueryRoot, mutation_root::MutationRoot, EmptySubscription>;

pub(crate) fn create_schema(conn: DbPool) -> GraphQlSchema {
    Schema::build(
        query_root::QueryRoot,
        mutation_root::MutationRoot,
        EmptySubscription,
    )
    .data(conn)
    .finish()
}
