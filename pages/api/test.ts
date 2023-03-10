// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/packages/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.status(200).send({content: 'hello'})
  } catch(e:any) {
    res.status(502).json({ error: 'xixi' })
  }
}
