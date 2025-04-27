use async_trait::async_trait;
use crate::models::Todo;

#[async_trait]
pub trait TodoRepository: Send + Sync + 'static {
    async fn list_todos(&self) -> anyhow::Result<Vec<Todo>>;
    async fn create_todo(&self, title: String) -> anyhow::Result<Todo>;
    async fn delete_todo(&self, id: i32) -> anyhow::Result<()>;
}