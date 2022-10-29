use actix_web::{
    http::header::{ContentType, TryIntoHeaderValue},
    web::{self, Data, ServiceConfig},
    HttpResponse, Responder,
};
use async_graphql::http::GraphiQLSource;
use async_graphql_actix_web::{GraphQLRequest, GraphQLResponse};

use crate::{schema::GraphQlSchema, user_extractor::UserExtractor};

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
    token_user: UserExtractor,
) -> GraphQLResponse {
    schema
        .execute(gql_req.into_inner().data(token_user))
        .await
        .into()
}
