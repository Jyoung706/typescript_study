import myDataSource from "../typeorm";

export class Post {
  private readonly id?: string;
  private name?: string;
  private content?: string;

  constructor(id?: string, name?: string, content?: string) {
    this.id = id;
    this.name = name;
    this.content = content;
  }

  create<T>(name: string, content: string): Promise<T> {
    myDataSource.query(
      `INSERT INTO posts (name, content) 
        VALUES (?,?);
      `,
      [name, content]
    );

    return myDataSource.query(
      `SELECT * FROM posts order by created_at desc limit 1;
      `
    );
  }

  read(id: string) {
    return myDataSource.query(
      `SELECT * FROM posts WHERE id = ?;
      `,
      [id]
    );
  }

  update(id: string, name?: string, content?: string) {
    if (!content) {
      myDataSource.query(
        `UPDATE posts SET name = ? 
          WHERE id = ?;
        `,
        [name, id]
      );
    } else if (!name) {
      myDataSource.query(
        `UPDATE posts SET content = ?
          WHERE id = ?;
        `,
        [content, id]
      );
    } else {
      myDataSource.query(
        `UPDATE posts SET name = ?, content =?
          WHERE id = ?;
        `,
        [name, content, id]
      );
    }
  }

  delete(id: string) {
    myDataSource.query(
      `DELETE FROM posts WHERE id = ?;
      `,
      [id]
    );
  }
}
