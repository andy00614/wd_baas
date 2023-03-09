// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/packages/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { balance, address } = req.body
  const newAddress = await prisma.address.create({
    data: {
      address,
      balance: balance || 0
    },
  })
  res.status(200).json(newAddress)
}
