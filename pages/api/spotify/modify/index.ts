import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest, res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const token = session.user.accessToken;
  const body = req.body;
  const endpoint = req.headers["spotify-endpoint"];
  let queryString = "?" + new URLSearchParams(req.query as {}).toString();
  queryString = queryString === "?" ? "" : queryString;
  const url = endpoint + queryString;

  const fetchParameters = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: req.method,
    body: body
  }

  try {
    const response = await fetch(url, fetchParameters);

    if (req.method === "POST") {
      const json = await response.json();
      return res.status(200).json(json);
    }
    
    return res.status(200).end();

  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
