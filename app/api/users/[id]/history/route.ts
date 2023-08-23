import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getAccessToken } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

/**
 * GET a list of events for a user
 */
const getHandler = async function handler(
  req: NextApiRequest,
  res: NextApiResponse & { params?: { id: string } }
) {
  try {
    const id = res.params?.id;

    const { accessToken } = await getAccessToken(req, res);

    const response = await fetch(`${process.env.API_URL}/users/${id}/events`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
};
/**
 * POST a new event for a user
 */
const postHandler = async function handler(
  req: NextApiRequest & Request,
  res: NextApiResponse & { params?: { id: string } }
) {
  try {
    const id = res.params?.id;
    const body = await req.json();
    const { accessToken } = await getAccessToken(req, res);

    const response = await fetch(`${process.env.API_URL}/users/${id}/events`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
};

export const GET = withApiAuthRequired(getHandler as NextApiHandler);
export const POST = withApiAuthRequired(postHandler as NextApiHandler);
