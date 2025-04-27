use std::sync::Arc;
use crate::repository::TodoRepository;

#[derive(Clone)]
pub struct AppState {
    pub todo_repo: Arc<dyn TodoRepository>,
}
