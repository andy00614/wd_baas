// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/packages/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export const getAddressInDB = async() => {
  const address = await prisma.address.findMany({
    orderBy: {
      createTime: 'desc'
    }
  })
  const serializedData = JSON.parse(JSON.stringify(address, (key, value) => {
    if (key === 'createTime') {
      return new Date(value).toISOString();
    }
    return value;
  }));
  return serializedData
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if(req.method === 'GET') {
      const serializedData  = await getAddressInDB()
      res.status(200).json(serializedData)
      return;
    }
    const { balance, address, privateKey, mnemonic } = req.body
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
    res.status(502).json({ error: e })
  }
}
