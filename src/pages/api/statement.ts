import type { NextApiRequest, NextApiResponse } from "next";
import { AccountStatement } from "src/interfaces";
import { sampleAccountData } from "src/utils/sample-data";

type Error = {
  error: string;
};

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<AccountStatement | Error>
) => {
  if (req.method === "GET") {
    res.status(200).json(sampleAccountData);
  } else {
    res.status(403).send({ error: "method not allowed" });
  }
};

export default handler;
