use chrono::{prelude::*, Duration};
use diesel::{insert_into, prelude::*};
use rand::{distributions::Alphanumeric, thread_rng, Rng};

use super::user::User;
use crate::{schema::user_tokens, DbConnection, DbError, DbResult, Hasher};

const EXPIRE_DURATION: i64 = 31_556_952; // 1 year in seconds

#[derive(Debug, Clone, Queryable, Insertable)]
pub struct UserToken {
    pub token: String,
    pub user_username: String,
    pub created_on: NaiveDateTime,
    pub expires_on: NaiveDateTime,
}

impl UserToken {
    pub fn new(username: &str, hasher: &dyn Hasher<Error = DbError>) -> DbResult<(Self, String)> {
        let token: String = thread_rng()
            .sample_iter(&Alphanumeric)
            .take(30)
            .map(char::from)
            .collect();

        Ok((
            Self {
                token: hasher.hash(token.as_bytes())?,
                user_username: String::from(username),
                created_on: Utc::now().naive_utc(),
                expires_on: (Utc::now() + Duration::seconds(EXPIRE_DURATION)).naive_utc(),
            },
            token,
        ))
    }

    pub fn verify_token(self, token: &str, hasher: &dyn Hasher<Error = DbError>) -> DbResult<()> {
        Ok(hasher.validate(token.as_bytes(), &self.token)?)
    }

    pub fn insert(&self, conn: &mut DbConnection) -> DbResult<usize> {
        use self::user_tokens::dsl::*;
        Ok(insert_into(user_tokens).values(self).execute(conn)?)
    }

    pub fn get_user_tokens(username: &str, conn: &mut DbConnection) -> DbResult<Vec<UserToken>> {
        use crate::schema::user_tokens::dsl::*;
        Ok(user_tokens
            .filter(user_username.eq(username))
            .filter(expires_on.gt(Utc::now().naive_utc()))
            .order_by(created_on)
            .load::<UserToken>(conn)?)
    }

    pub fn get_user(&self, conn: &mut DbConnection) -> DbResult<User> {
        Ok(User::get_user(conn, &self.user_username)?)
    }
}
