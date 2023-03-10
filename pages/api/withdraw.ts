// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/packages/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { address, amount } = req.body
    const data = await prisma.withdraw.create({
      data: {
        address,
        amount: Number(amount)
      }
    })
    res.status(200).json(data)
  } catch(e) {
    console.error(e)
    res.status(500).json(e)
  }
}
