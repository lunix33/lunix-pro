use chrono::prelude::*;
use diesel::prelude::*;

use crate::DbConnection;

#[derive(Debug, Clone, Queryable)]
pub struct Page {
    pub stub: String,
    pub kind: String,
    pub title: String,
    pub content: String,
    pub image: Option<String>,
    pub has_comments: bool,
    pub is_hidden: bool,
    pub created_on: NaiveDateTime,
    pub updated_on: NaiveDateTime,
    pub deleted_on: Option<NaiveDateTime>,
    pub publicated_on: NaiveDateTime,
    pub author_username: String,
}

impl Page {
    pub fn get_pages(conn: &mut DbConnection, filter_kind: &str) -> QueryResult<Vec<Page>> {
        use crate::schema::pages::dsl::*;
        pages.filter(kind.eq(filter_kind)).load::<Page>(conn)
    }
}
