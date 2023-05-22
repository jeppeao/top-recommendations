import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { ENDPOINTS } from "@/libs/spotify";

export default async function handler(
  req: NextApiRequest, res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const token = session.user.accessToken;
  const headers = {"Content-Type": "application/json"};
  const body = `{"uris": ["spotify:track:${req.body}"]}`
  
  let queryString = "?" + new URLSearchParams(req.query as {}).toString();
  const url = ENDPOINTS.play + queryString;

  const fetchParameters = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: body
  }

  try {
    const response = await fetch(url, fetchParameters);
    return res.status(200).end();

  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
