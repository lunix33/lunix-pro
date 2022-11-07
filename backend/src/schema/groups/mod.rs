use std::sync::Arc;

use async_graphql::{Context, Object};

use crate::{
    result::{ApplicationError, ApplicationResult},
    schema::{
        field_name, get_db_connection,
        pagination::{PageOptions, PagedResult},
    },
};

pub mod group;

pub struct GroupQuery;

#[Object]
impl GroupQuery {
    async fn get_groups<'a>(
        &self,
        ctx: &'a Context<'_>,
        #[graphql(
            desc = "When true, the deleted groups will also be part of the results.",
            default = false
        )]
        with_deleted: bool,
        #[graphql(desc = "Optional pagination option")] page: Option<PageOptions>,
    ) -> ApplicationResult<PagedResult<group::Group>> {
        get_db_connection(ctx, |mut conn| {
            let data =
                db::models::Group::get_groups(&mut conn, with_deleted, page.map(|o| o.into()))
                    .map_err(|err| {
                        ApplicationError::Fetch(field_name(ctx), None, Some(Arc::new(err)))
                    })?
                    .into_iter()
                    .map(group::Group::from)
                    .collect();
            let count = db::models::Group::count(&mut conn, with_deleted).map_err(|err| {
                ApplicationError::Fetch(field_name(ctx), None, Some(Arc::new(err)))
            })?;

            Ok(PagedResult { data, count })
        })
    }
}
