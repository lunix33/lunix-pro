use chrono::prelude::*;
use diesel::{insert_into, prelude::*};

use crate::{schema::users, user_token::UserToken, DbConnection, DbError, DbResult, Hasher};

#[derive(Debug, Clone, Queryable)]
pub struct User {
    pub username: String,
    pub display_name: Option<String>,
    pub created_on: NaiveDateTime,
    pub deleted_on: Option<NaiveDateTime>,
}

impl User {
    /// Get a list of all the users.
    ///
    /// # Arguments
    /// * `conn`: The database connection.
    /// * `with_deleted`: True if the deleted users should be returnd.
    ///
    /// # Returns
    /// The list of users.
    pub fn get_users(conn: &mut DbConnection, with_deleted: bool) -> DbResult<Vec<User>> {
        use self::users::dsl::*;
        Ok(match with_deleted {
            true => users.order_by(created_on).load::<Self>(conn)?,
            false => users
                .filter(deleted_on.is_null())
                .order_by(created_on)
                .load::<Self>(conn)?,
        })
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
        token: &str,
        hasher: &dyn Hasher<Error = DbError>,
        conn: &mut DbConnection,
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
        hasher: &dyn Hasher<Error = DbError>,
        conn: &mut DbConnection,
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
}

impl NewUser {
    pub fn insert(&self, conn: &mut DbConnection) -> QueryResult<usize> {
        use self::users::dsl::*;
        insert_into(users).values(self).execute(conn)
    }
}
