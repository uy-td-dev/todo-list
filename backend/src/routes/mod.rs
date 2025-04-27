use axum::Router;
use crate::app_state::AppState;
use tower_http::cors::{Any, CorsLayer};


mod todo;

pub fn build_router(app_state: AppState) -> Router {
    let cors = CorsLayer::new()
        .allow_origin(Any)             // Cho phép tất cả origin, hoặc bạn có thể chỉ cho "http://localhost:5173"
        .allow_methods(Any)             // Cho phép GET, POST, DELETE,...
        .allow_headers(Any);
    Router::new()
        .nest("/todos", todo::router())
        .layer(cors)
        .with_state(app_state)
}
