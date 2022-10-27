use actix_web::{
    body::BoxBody,
    http::{
        header::{ContentType, TryIntoHeaderValue, CONTENT_TYPE},
        StatusCode,
    },
    HttpResponse, ResponseError,
};
use thiserror::Error;

#[derive(Debug, Error)]
pub enum ApplicationError {
    #[error("Unable to decode or validate the bearer token")]
    TokenDecode(BoxedError),
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
pub type BoxedError = Box<dyn std::error::Error + std::marker::Send + std::marker::Sync>;
