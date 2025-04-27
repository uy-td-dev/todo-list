mod app_state;
mod models;
mod repository;
mod repository_postgres;
mod routes;

use dotenvy::dotenv;
use sqlx::postgres::PgPoolOptions;
use std::env;
use std::sync::Arc;
use app_state::AppState;
use repository::TodoRepository;
use repository_postgres::PostgresTodoRepository;
use routes::build_router;
use tower_http::cors::{Any, CorsLayer};


#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL")?;

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await?;

    let todo_repo = Arc::new(PostgresTodoRepository::new(pool)) as Arc<dyn TodoRepository>;
    let app_state = AppState { todo_repo };

    let app = build_router(app_state);

    println!("🚀 Server running at http://localhost:3000");
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await?;
    axum::serve(listener, app).await?;

    Ok(())
}
