use diesel::prelude::*;

//use crate::{schema::page_metas, DbConnection};

#[derive(Debug, Clone, Queryable)]
pub struct PageMeta {
    pub page_stub: String,
    pub key: String,
    pub value: Option<String>,
}

impl PageMeta {}
