use crate::models::Todo;
use crate::repository::TodoRepository;
use async_trait::async_trait;
use sqlx::PgPool;

#[derive(Clone)]
pub struct PostgresTodoRepository {
    pool: PgPool,
}

impl PostgresTodoRepository {
    pub fn new(pool: PgPool) -> Self {
        Self { pool }
    }
}

#[async_trait]
impl TodoRepository for PostgresTodoRepository {
    async fn list_todos(&self) -> anyhow::Result<Vec<Todo>> {
        let todos = sqlx::query_as::<_, Todo>("SELECT * FROM todos")
            .fetch_all(&self.pool)
            .await?;
        Ok(todos)
    }

    async fn create_todo(&self, title: String) -> anyhow::Result<Todo> {
        let todo = sqlx::query_as::<_, Todo>(
            "INSERT INTO todos (title) VALUES ($1) RETURNING id, title"
        )
            .bind(title)
            .fetch_one(&self.pool)
            .await?;
        Ok(todo)
    }

    async fn delete_todo(&self, id: i32) -> anyhow::Result<()> {
        sqlx::query("DELETE FROM todos WHERE id = $1")
            .bind(id)
            .execute(&self.pool)
            .await?;
        Ok(())
    }
}
