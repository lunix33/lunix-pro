use std::sync::{Arc, Mutex};

use actix_web::{
    http::header::{ContentType, TryIntoHeaderValue},
    web::{self, Data, ServiceConfig},
    HttpResponse, Responder,
};
use async_graphql::http::GraphiQLSource;
use async_graphql_actix_web::{GraphQLRequest, GraphQLResponse};
use db::DbPool;

use crate::{
    result::{ApplicationError, ApplicationResult},
    schema::GraphQlSchema,
    user_extractor::UserExtractor,
};

pub(crate) fn configure_endpoints(config: &mut ServiceConfig) {
    let mut scope = web::scope("/api").service(
        web::resource("/")
            .route(web::get().to(graphql_route))
            .route(web::post().to(graphql_route)),
    );

    if cfg!(debug_assertions) {
        scope = scope.service(web::resource("/graphiql").route(web::get().to(graphiql_route)));
    }

    config.service(scope);
}

// Handles requests to GET /api/graphiql2
async fn graphiql_route() -> impl Responder {
    HttpResponse::Ok()
        .content_type(ContentType::html().try_into_value().unwrap())
        .body(GraphiQLSource::build().endpoint("/api/").finish())
}

// Handles requests to GET;POST /api/
async fn graphql_route(
    gql_req: GraphQLRequest,
    schema: Data<GraphQlSchema>,
    db_pool: Data<DbPool>,
    token_user: UserExtractor,
) -> ApplicationResult<GraphQLResponse> {
    let conn = Arc::new(Mutex::new(
        db_pool
            .get()
            .map_err(|err| ApplicationError::Database(Arc::new(err)))?,
    ));

    Ok(GraphQLResponse::from(
        schema
            .execute(gql_req.into_inner().data(token_user).data(conn))
            .await,
    ))
}
