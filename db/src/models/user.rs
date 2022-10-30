use chrono::prelude::*;
use diesel::{insert_into, prelude::*};

use crate::{
    models::{Group, UserToken},
    schema::users,
    DbConnection, DbError, DbResult, Hasher, PageOptions,
};

#[derive(Debug, Clone, Queryable)]
pub struct User {
    pub username: String,
    pub display_name: Option<String>,
    pub group_name: String,
    pub created_on: NaiveDateTime,
    pub deleted_on: Option<NaiveDateTime>,
}

impl User {
    /// Get a list of all the users.
    ///
    /// # Arguments
    /// * `conn`: The database connection.
    /// * `with_deleted`: True if the deleted users should be returned.
    /// * `page`: Optional pagination options for the query.
    ///
    /// # Returns
    /// The list of users.
    pub fn get_users(
        conn: &mut DbConnection,
        with_deleted: Option<bool>,
        page: Option<PageOptions>,
    ) -> DbResult<Vec<User>> {
        use self::users::dsl::*;

        let with_deleted = with_deleted.unwrap_or(false);

        let mut query = users.into_boxed().order_by(created_on);
        if with_deleted == false {
            query = query.filter(deleted_on.is_null())
        }
        if let Some(page_option) = page {
            query = query.limit(page_option.limit);
            query = query.offset(page_option.offset);
        }

        Ok(query.load::<Self>(conn)?)
    }

    /// Get a single user from the database.
    ///
    /// # Arguments
    /// * `conn`: The database connection.
    /// * `find_username`: The username of the user to find.
    ///
    /// # Returns
    /// The user found.
    pub fn get_user(conn: &mut DbConnection, find_username: &str) -> DbResult<User> {
        use self::users::dsl::*;
        Ok(users.find(find_username).first::<User>(conn)?)
    }

    /// Get the group of the user,
    ///
    /// # Arguments
    /// * `conn`: The database connection.
    pub fn group(&self, conn: &mut DbConnection) -> DbResult<Group> {
        Group::get_group(conn, &self.group_name)
    }

    /// List the user's tokens
    ///
    /// # Arguments
    /// * `conn`: The database connection.
    ///
    /// # Returns
    /// The list of tokens.
    pub fn tokens(&self, conn: &mut DbConnection) -> DbResult<Vec<UserToken>> {
        UserToken::get_user_tokens(&self.username, conn)
    }

    /// Verify a given token against the user's generated tokens.
    ///
    /// # Arguments
    /// * `token`: The token to be validated.
    /// * `hasher`: The validation haser for the token.
    /// * `conn` The database connection.
    ///
    /// # Returns
    /// `Ok` if the token validates properly.
    pub fn verify_token(
        &self,
        conn: &mut DbConnection,
        token: &str,
        hasher: &dyn Hasher<Error = DbError>,
    ) -> DbResult<()> {
        for user_token in self.tokens(conn)? {
            if let Ok(_) = user_token.verify_token(token, hasher) {
                return Ok(());
            }
        }

        Err(DbError::NoTokenMatch)
    }

    /// Add a new token to the user.
    ///
    /// # Arguments
    /// * `hasher`: The encryption hasher for the token.
    /// * `conn`: The database connection.
    ///
    /// # Returns
    /// The string token added.
    pub fn add_token(
        &self,
        conn: &mut DbConnection,
        hasher: &dyn Hasher<Error = DbError>,
    ) -> DbResult<String> {
        let (user_token, str_token) = UserToken::new(&self.username, hasher)?;
        user_token.insert(conn)?;

        Ok(str_token)
    }
}

#[derive(Debug, Clone, Insertable)]
#[diesel(table_name = users)]
pub struct NewUser {
    pub username: String,
    pub display_name: Option<String>,
    pub group_name: String,
}

impl NewUser {
    pub fn insert(&self, conn: &mut DbConnection) -> DbResult<usize> {
        use self::users::dsl::*;
        Ok(insert_into(users).values(self).execute(conn)?)
    }
}
