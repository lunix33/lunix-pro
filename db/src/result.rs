macro_rules! err_from {
    ($dest:ty, $from:ty, $to:expr) => {
        impl std::convert::From<$from> for $dest {
            fn from(err: $from) -> $dest {
                $to(err)
            }
        }
    };
}

pub type BoxedError = Box<dyn std::error::Error + std::marker::Send + std::marker::Sync>;

#[derive(Debug)]
pub enum DbError {
    Query(diesel::result::Error),
    Hasher(BoxedError),
    NoTokenMatch,
}

impl std::error::Error for DbError {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        match *self {
            Self::Query(ref err) => Some(err),
            Self::Hasher(ref err) => Some(err.as_ref()),
            Self::NoTokenMatch => None,
        }
    }
}

impl std::fmt::Display for DbError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "Database error: {:#?}", self)
    }
}

unsafe impl std::marker::Send for DbError {}
unsafe impl std::marker::Sync for DbError {}

err_from!(DbError, diesel::result::Error, DbError::Query);

pub type DbResult<T> = core::result::Result<T, DbError>;
