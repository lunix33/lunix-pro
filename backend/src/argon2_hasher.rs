use argon2::{
    password_hash::{rand_core::OsRng, SaltString},
    Argon2, PasswordHash, PasswordHasher, PasswordVerifier,
};
use db::DbError;

pub struct Argon2Hasher();

impl db::Hasher for Argon2Hasher {
    type Error = DbError;

    fn hash(&self, chunk: &[u8]) -> Result<String, Self::Error> {
        let salt = SaltString::generate(&mut OsRng);
        let argon2 = Argon2::default();
        Ok(argon2
            .hash_password(chunk, &salt)
            .map_err(|e| DbError::Hasher(Box::new(e)))?
            .to_string())
    }

    fn validate(&self, chunk: &[u8], hash: &str) -> Result<(), Self::Error> {
        let hash = PasswordHash::new(hash).map_err(|e| DbError::Hasher(Box::new(e)))?;
        Ok(Argon2::default()
            .verify_password(chunk, &hash)
            .map_err(|e| DbError::Hasher(Box::new(e)))?)
    }
}

impl std::default::Default for Argon2Hasher {
    fn default() -> Self {
        Self()
    }
}
