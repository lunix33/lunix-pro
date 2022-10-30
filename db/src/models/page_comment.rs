use chrono::prelude::*;
use diesel::prelude::*;

//use crate::{schema::page_comments, DbConnection};

#[derive(Debug, Clone, Queryable)]
pub struct PageComment {
    pub id: String,
    pub title: Option<String>,
    pub content: String,
    pub identity: String,
    pub page_stub: String,
    pub created_on: NaiveDateTime,
    pub deleted_on: Option<NaiveDateTime>,
}

impl PageComment {}
