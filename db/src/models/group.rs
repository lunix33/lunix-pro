use chrono::prelude::*;
use diesel::{dsl::count_star, prelude::*};

use crate::{models::GroupPermission, schema::groups, DbConnection, DbResult, PageOptions};

#[derive(Debug, Clone, Queryable)]
pub struct Group {
    pub name: String,
    pub created_on: NaiveDateTime,
    pub deleted_on: Option<NaiveDateTime>,
}

impl Group {
    pub fn count(conn: &mut DbConnection) -> DbResult<i64> {
        use self::groups::dsl::*;
        Ok(groups.select(count_star()).first(conn)?)
    }

    /// Get a list of all groups
    ///
    /// # Arguments
    /// * `conn`: The database connection.
    /// * `with_deleted`: True if the deleted groups should be returned.
    /// * `page`: Optional pagination options for the query.
    ///
    /// # Returns
    /// The list of groups.
    pub fn get_groups(
        conn: &mut DbConnection,
        with_deleted: Option<bool>,
        page: Option<PageOptions>,
    ) -> DbResult<Vec<Self>> {
        use self::groups::dsl::*;

        let with_deleted = with_deleted.unwrap_or(false);

        let mut query = groups.into_boxed().order_by(created_on);
        if with_deleted == false {
            query = query.filter(deleted_on.is_null())
        }
        if let Some(page_option) = page {
            query = query.limit(page_option.limit);
            query = query.offset(page_option.offset);
        }

        Ok(query.load::<Self>(conn)?)
    }

    /// Get a single group from the database.
    ///
    /// # Arguments
    /// * `conn`: The database connection.
    /// * `find_username`: The name of the group to find.
    ///
    /// # Returns
    /// The group found.
    pub fn get_group(conn: &mut DbConnection, find_group: &str) -> DbResult<Self> {
        use self::groups::dsl::*;
        Ok(groups.find(find_group).first::<Self>(conn)?)
    }

    /// Get a list of all the permission of the group.
    ///
    /// # Arguments
    /// * `conn`: The database connection.
    ///
    /// # Returns
    /// The list of permissions of the group.
    pub fn permissions(&self, conn: &mut DbConnection) -> DbResult<Vec<String>> {
        GroupPermission::permissions(conn, &self.name)
    }
}
