use std::sync::Arc;

use async_graphql::{ComplexObject, Context, SimpleObject};
use chrono::NaiveDateTime;

use crate::{
    result::{ApplicationError, ApplicationResult},
    schema::{field_name, get_db_connection, Authorization},
};

#[derive(SimpleObject)]
#[graphql(complex, guard = "Authorization(&[])")]
pub struct Group {
    #[graphql(skip)]
    db_object: db::models::Group,
    pub name: String,
    pub created_on: NaiveDateTime,
    pub deleted_on: Option<NaiveDateTime>,
}

#[ComplexObject]
impl Group {
    async fn permissions<'a>(&self, ctx: &'a Context<'_>) -> ApplicationResult<Vec<String>> {
        get_db_connection(ctx, |mut conn| {
            self.db_object.permissions(&mut conn).map_err(|err| {
                ApplicationError::Fetch(
                    field_name(ctx),
                    Some(self.name.clone()),
                    Some(Arc::new(err)),
                )
            })
        })
    }
}

impl From<db::models::Group> for Group {
    fn from(db_group: db::models::Group) -> Self {
        Self {
            db_object: db_group.clone(),
            name: db_group.name,
            created_on: db_group.created_on,
            deleted_on: db_group.deleted_on,
        }
    }
}
