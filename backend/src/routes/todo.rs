use axum::{
    extract::{State, Path},
    routing::{get, post, delete},
    Json, Router
};
use serde::Serialize;
use crate::{app_state::AppState, models::Todo};
#[derive(Serialize)]
struct SuccessResponse {
    success: bool,
}
pub fn router() -> Router<AppState> {
    Router::new()
        .route("/", get(list_todos).post(create_todo))
        .route("/{id}", delete(delete_todo))
}

async fn list_todos(
    State(state): State<AppState>,
) -> Json<Vec<Todo>> {
    let todos = state.todo_repo.list_todos().await.unwrap();
    Json(todos)
}

async fn create_todo(
    State(state): State<AppState>,
    Json(payload): Json<Todo>,
) -> Json<Todo> {
    let todo = state.todo_repo.create_todo(payload.title).await.unwrap();
    Json(todo)
}

async fn delete_todo(
    State(state): State<AppState>,
    Path(id): Path<i32>,
)-> Json<SuccessResponse> {
     state.todo_repo.delete_todo(id).await.unwrap();
     Json(SuccessResponse { success: true })
}
