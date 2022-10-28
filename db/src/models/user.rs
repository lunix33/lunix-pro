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
    pub fn get_user(conn: &mut DbConnection, find_username: &str) -> DbResult<User> {
        use self::users::dsl::*;
        Ok(users.find(find_username).first::<User>(conn)?)
    }

    pub fn tokens(&self, conn: &mut DbConnection) -> DbResult<Vec<UserToken>> {
        UserToken::get_user_tokens(&self.username, conn)
    }

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
