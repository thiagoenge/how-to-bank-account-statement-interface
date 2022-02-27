import { HttpClient } from "src/utils/HttpClient";
import { AccountStatement } from "src/interfaces";

export class InternalApiService extends HttpClient {
  public constructor() {
    super("http://localhost:3000/api");
  }

  public getStatementAccount = () =>
    this.instance.get<AccountStatement>("/statement");
}
