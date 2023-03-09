import { SyncOutlined, UserOutlined } from "@ant-design/icons"
import styles from '@/styles/Earn.module.scss'
import React, { useEffect, useState } from "react"
import { Button, message } from "antd"
import { generateRandomWalletAddress } from "@/lib/address"
import prisma from "@/lib/prisma"
import { GetServerSideProps } from "next"
import { Address } from "@prisma/client"

const Earn:React.FC<Address> = (props) => {
  console.log(props)
  const [address, setAddress] = useState(props.address)
  const [money, setMoney] = useState(props.balance)
  console.log(props)

  const refreshMoney = () => {
    message.success('刷新成功！')
  }

  const earnToken = () => {
    
  }

  return (
    <div>
      <section>
        <UserOutlined className={styles.userIcon} style={{ fontSize: 18, color: '#40a9ff' }} />
        <span>{address}</span>
        <div className={styles.money}>
          <span>余额:</span>
          <span>{money}</span>
          <SyncOutlined onClick={refreshMoney} className={styles.refresh} />
        </div>
      </section>
      <section className={styles.earnWrapper}>
        <Button onClick={earnToken}>Click to Earn</Button>
      </section>
    </div>
  )
}

export default Earn
