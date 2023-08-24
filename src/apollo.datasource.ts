import { BatchedSQLDataSource } from "@nic-jennings/sql-datasource";

export class ApolloDatasource extends BatchedSQLDataSource {
  constructor(config) {
    super(config);
  }
}