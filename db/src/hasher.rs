pub trait Hasher {
    type Error: std::error::Error + std::marker::Send + std::marker::Sync;

    fn hash(&self, chunk: &[u8]) -> Result<String, Self::Error>;
    fn validate(&self, chunk: &[u8], hash: &str) -> Result<(), Self::Error>;
}
