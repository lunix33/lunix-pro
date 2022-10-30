use std::sync::Arc;

use actix_web::{
    body::BoxBody,
    http::{
        header::{ContentType, TryIntoHeaderValue, CONTENT_TYPE},
        StatusCode,
    },
    HttpResponse, ResponseError,
};
use log::{error, warn};

#[derive(Debug, Clone)]
pub enum ApplicationError {
    /// Error returned when there's a database/connection pool issue.
    ///
    /// # Elements
    /// * The error thrown by the database or the the connection pool.
    Database(DynError),
    /// Error returned when there's an issue with the GraphQL context data.
    ///
    /// # Elements
    /// * The name of the type we tried to get.
    /// * The error returned by the GraphQL runtime.
    GqlContextData(String, async_graphql::Error),
    /// Error returned when the user token can't be validated properly.
    ///
    /// # Elements
    /// * The ip address
    /// * The username
    /// * The error returned during the validation.
    TokenValidation(String, Option<String>, DynError),
    /// Error returned if a data fetch request fails.
    ///
    /// # Elements
    /// * The name of the field we tried to fetch.
    /// * The specific element we tried to fetch.
    /// * Any error returned by the fetch process.
    Fetch(String, Option<String>, Option<DynError>),
    /// Error returned when a user tries to access data its not allowed to.
    ///
    /// # Elements
    /// * The ip address
    /// * The user
    /// * The field the user tried to access.
    Forbidden(String, Option<db::models::User>, String),
}

impl std::fmt::Display for ApplicationError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        use ApplicationError::*;
        match *self {
            Database(ref err) => {
                error!("A database error occured: {err:#?}");
                write!(f, "internal_error")
            }
            GqlContextData(ref element, _) => {
                error!("Unable to retrive data '{element}' from the GraphQL context");
                write!(f, "request_error")
            }
            TokenValidation(ref ip, ref user, ref err) => {
                let mut msg = "Unable to decode or validate token".to_string();
                if let Some(user) = user {
                    msg.push_str(&format!("of user {user}"));
                }
                msg.push_str(&format!(" ({ip})"));

                warn!("{msg}: {err:#?}");
                write!(f, "token_validation_error")
            }
            Fetch(ref item_type, ref item, ref inner_error) => {
                let mut msg = format!("Unable to fetch {item_type}");
                if let Some(i) = item {
                    msg.push_str(&format!(" for '{i}'"));
                }

                warn!("{msg}: {inner_error:#?}");
                write!(f, "fetch_error")
            }
            Forbidden(ref ip, ref user, ref field) => {
                let mut msg = format!("Forbidden data access to '{field}'");
                if let Some(user) = user {
                    let username = &user.username;
                    msg.push_str(&format!(" by {username}"));
                }
                msg.push_str(&format!(" ({ip})"));

                warn!("{msg}");
                write!(f, "forbidden_error")
            }
        }
    }
}

impl std::error::Error for ApplicationError {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        use ApplicationError::*;
        match *self {
            Database(ref err) => Some(err.as_ref()),
            GqlContextData(_, _) => None,
            TokenValidation(_, _, ref err) => Some(err.as_ref()),
            Fetch(_, _, ref inner_error) => match inner_error {
                None => None,
                Some(err) => Some(err.as_ref()),
            },
            Forbidden(_, _, _) => None,
        }
    }
}

impl ResponseError for ApplicationError {
    fn status_code(&self) -> StatusCode {
        StatusCode::INTERNAL_SERVER_ERROR
    }

    fn error_response(&self) -> HttpResponse<BoxBody> {
        let mut res = HttpResponse::new(self.status_code());

        res.headers_mut().insert(
            CONTENT_TYPE,
            ContentType::plaintext().try_into_value().unwrap(),
        );

        res.set_body(BoxBody::new(format!("{}", self)))
    }
}

pub type ApplicationResult<T> = Result<T, ApplicationError>;
pub type DynError = Arc<dyn std::error::Error + std::marker::Send + std::marker::Sync>;
