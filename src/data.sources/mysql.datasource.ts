import { BatchedSQLDataSource } from "@nic-jennings/sql-datasource";

export class MySqlDatasource extends BatchedSQLDataSource {

  constructor(config) {
    super(config);
  }
}