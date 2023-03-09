// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 接收两个参数，一个是地址，一个是收益
  // 将收益写入数据库
  const { address, score } = req.body
  const newEarn = await prisma.earnRecord.create({
    data: {
      address,
      score,
    },
  })
  res.status(200).json(newEarn)
}
