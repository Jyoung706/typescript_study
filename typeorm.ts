import { DataSource } from "typeorm";

const myDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "qwer1234!@",
  database: "typescript_practice",
});

myDataSource
  .initialize()
  .then(() => {
    console.log("begin");
  })
  .catch((err) => {
    console.log(err);
  });

export default myDataSource;
