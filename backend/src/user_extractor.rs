use std::pin::Pin;

use actix_web::{dev::Payload, rt::task, web::Data, FromRequest, HttpRequest};
use backend::Argon2Hasher;
use db::{user::User, DbPool};

use crate::{ApplicationError, ApplicationResult};

#[derive(Debug)]
pub struct UserExtractor {
    pub user: Option<User>,
}

impl FromRequest for UserExtractor {
    type Error = ApplicationError;

    type Future = Pin<Box<dyn std::future::Future<Output = ApplicationResult<Self>>>>;

    fn from_request(req: &HttpRequest, _payload: &mut Payload) -> Self::Future {
        let req = req.clone();
        Box::pin(async move {
            match req.headers().get("Authorization") {
                None => return Ok(Self { user: None }),
                Some(encoded_token) => {
                    let encoded_token = encoded_token
                        .to_str()
                        .map_err(|e| ApplicationError::TokenDecode(Box::new(e)))?
                        .split(" ")
                        .collect::<Vec<&str>>()
                        .get(1)
                        .unwrap_or(&"")
                        .to_string();
                    let decoded_token = base64::decode(encoded_token)
                        .map_err(|e| ApplicationError::TokenDecode(Box::new(e)))?;
                    let composed_token = String::from_utf8_lossy(&decoded_token);

                    let split_token = composed_token.split(":").collect::<Vec<&str>>();
                    let username = split_token.get(0).unwrap_or(&"").to_string();
                    let token = split_token.get(1).unwrap_or(&"").to_string();

                    let pool = req.app_data::<Data<DbPool>>().unwrap();
                    let mut conn = pool
                        .get()
                        .map_err(|e| ApplicationError::TokenDecode(Box::new(e)))?;

                    let rst =
                        task::spawn_blocking(move || match User::get_user(&mut conn, &username) {
                            Ok(user) => {
                                match user.verify_token(&token, &Argon2Hasher::default(), &mut conn)
                                {
                                    Ok(_) => Ok(Self { user: Some(user) }),
                                    Err(e) => Err(ApplicationError::TokenDecode(Box::new(e))),
                                }
                            }
                            Err(e) => Err(ApplicationError::TokenDecode(Box::new(e))),
                        })
                        .await
                        .map_err(|e| ApplicationError::TokenDecode(Box::new(e)))??;

                    Ok(rst)
                }
            }
        })
    }
}
