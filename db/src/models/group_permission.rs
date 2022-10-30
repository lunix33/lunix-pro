use diesel::prelude::*;

use crate::{schema::group_permissions, DbConnection, DbResult};

#[derive(Debug, Clone, Queryable)]
pub struct GroupPermission {
    pub group_name: String,
    pub permission: String,
}

impl GroupPermission {
    /// Get a list of all the permissions of a group.
    ///
    /// # Arguments
    /// * `conn`: The database connection.
    /// * `find_group`: The group for which we want to get the permissions.
    ///
    /// # Returns
    /// The list of permissions of the group.
    pub fn permissions(conn: &mut DbConnection, find_group: &str) -> DbResult<Vec<String>> {
        use self::group_permissions::dsl::*;
        let permissions = group_permissions
            .filter(group_name.eq(find_group))
            .load::<Self>(conn)?;
        Ok(permissions.into_iter().map(|p| p.permission).collect())
    }
}
