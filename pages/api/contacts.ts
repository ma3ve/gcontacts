// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { APIResType } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken, JWT } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';

async function fetchGoogleContacts(accessToken: string) {
  const response = await fetch(
    'https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const data = await response.json();
  return data.connections;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResType>
) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({
      error: {
        name: 'Unauthorized',
        message: 'Unauthorized'
      },
    },
    );
  }
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return res.status(401).json({
      error: {
        name: 'Unauthorized',
        message: 'Unauthorized'
      },
    },
    );
  }
  const contacts = await fetchGoogleContacts(token.accessToken as string);
  res.status(200).json({ data: contacts });
}
