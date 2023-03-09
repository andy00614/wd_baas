// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/packages/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { balance, address, privateKey, mnemonic } = req.body
    console.log(balance, address, privateKey)
    const newAddress = await prisma.address.create({
      data: {
        publicKey: address,
        privateKey: privateKey,
        balance: balance,
        mnemonic: mnemonic
      }
    })
    res.status(200).json(newAddress)
  } catch(e:any) {
    res.status(500).json({ error: e.message })
  }
}
