import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest, res: NextApiResponse
) {

  const session = await getServerSession(req, res, authOptions);
  const token = session.user.accessToken;
  const method = req.method;
  let queryString = "?" + new URLSearchParams(req.query as {}).toString();
  queryString = queryString === "?" ? "" : queryString; 
  const endpoint = req.headers['spotify-endpoint'] as string;
  const url = endpoint + queryString;

  const fetchParameters = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: method
  }

  try {
    const response = await fetch(url, fetchParameters);
    const json = await response.json();
    return res.status(200).json(json);

  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
