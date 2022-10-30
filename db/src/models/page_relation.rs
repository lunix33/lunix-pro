use diesel::{insert_into, prelude::*};

use crate::{schema::page_relations, DbConnection, DbResult};

#[derive(Debug, Clone, Queryable, Insertable)]
pub struct PageRelation {
    pub page_stub: String,
    pub relation_stub: String,
}

impl PageRelation {
    pub fn insert(&self, conn: &mut DbConnection) -> DbResult<usize> {
        use self::page_relations::dsl::*;
        Ok(insert_into(page_relations).values(self).execute(conn)?)
    }
}
