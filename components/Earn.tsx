import { SyncOutlined, UserOutlined } from "@ant-design/icons"
import styles from '@/styles/Earn.module.scss'
import React, { useState } from "react"
import { Button, message, Tooltip } from "antd"
import { Address } from "@prisma/client"
import { request } from "@/lib/request"

const Earn: React.FC<Address> = (props) => {
  const [address, setAddress] = useState(props.address)
  const [money, setMoney] = useState(props.balance)
  const [earnedToken, setEarnedToken] = useState(0)

  const refreshMoney = () => {
    message.success('刷新成功！')
  }

  const earnToken = async () => {
    // 1到5的随机数
    const random = Math.floor(Math.random() * 5 + 1)
    setEarnedToken(random + earnedToken)
    const data = await request('/api/earn', 'POST', { address, score: random })
    console.log(data)
    message.success(`+${random}WD`)
  }

  const TransferOut = () => {

  }

  return (
    <div className={styles.container}>
      <section>
        <div className={styles.addressWrapper}>
          <UserOutlined className={styles.userIcon} style={{ fontSize: 18, color: '#40a9ff' }} />
          <div className={styles.address}>
            <Tooltip title={address}>
              {address}
            </Tooltip>
          </div>
          <div className={styles.money}>
            <span>余额:</span>
            <span>{money}</span>
            <SyncOutlined onClick={refreshMoney} className={styles.refresh} />
          </div>
        </div>
      </section>
      <section className={styles.earnWrapper}>
        <Button type="primary" onClick={earnToken}>Click to Earn</Button>
        <span>赚取金额: {earnedToken} WD</span>
        <div className={styles.transferOut}>
          <Button onClick={TransferOut} disabled={earnedToken < 30}>Transfer out</Button>
        </div>
      </section>
    </div>
  )
}

export default Earn
