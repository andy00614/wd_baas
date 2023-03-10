import styles from '@/styles/Earn.module.scss'
import React, { useEffect, useState, useRef } from "react"
import { Button, Input, InputNumber, InputRef, message, Tooltip } from "antd"
import { Address } from "@prisma/client"
import { balanceBSC, balanceWDT, getScore, withdrawal } from '@/packages/web3'
import Web3 from 'web3'

const Earn: React.FC<Address> = (props) => {
  const [canCheck, setCanCheck] = useState(false)
  const web3Instance = useRef<any>()
  const key = useRef<any>(null)
  const addressRef = useRef<InputRef>(null)
  const withdrawRef = useRef<HTMLInputElement>(null)
  const [score, setScore] = useState(0)
  const [wdt, setWdt] = useState(0)
  const [bsc, setBsc] = useState(0)

  useEffect(() => {
    // @ts-ignore
    web3Instance.current = new Web3(window.ethereum);
  }, [])


  const checkAll = async () => {
    if (key.current) {
      const bsc = (await balanceBSC(key.current.address)).balance;
      const wdt = (await balanceWDT(key.current.address)).balance
      const score = (await getScore(key.current.address)).data
      setBsc(bsc)
      setWdt(wdt)
      setScore(score)
    }
  }

  const handleInputChange = (val: string) => {
    if (val.length === 64) {
      setCanCheck(true)
      key.current = (web3Instance).current.eth.accounts.privateKeyToAccount(val);
    } else {
      setCanCheck(false)
    }
  }

  const uploadGameScore = () => {

  }

  const withdraw = async () => {
    if(withdrawRef.current?.value && addressRef.current?.input?.value) {
      const _out = await withdrawal(Number(withdrawRef.current.value), addressRef.current.input.value);
    } else {
      message.error('please check input!')
    }
  }
  return (
    <div className={styles.container}>
      <section>
        <div className={styles.inputWrapper}>
          <Input ref={addressRef} onChange={(e) => handleInputChange(e.target.value)} placeholder="请输入私钥" />
          <Button className={styles.checkBtn} disabled={!canCheck} onClick={checkAll} type="primary">Check All</Button>
        </div>
        <div className={styles.moneyType}>
          <div>
            <span>BSC:</span> <span>{bsc}</span>
          </div>
          <div>
            <span>WDT:</span> <span>{wdt}</span>
          </div>
          <div>
            <span>Score:</span> <span>{score}</span>
          </div>
        </div>
      </section>
      <section>
        <InputNumber style={{ width: '200px' }} placeholder="Enter score输入积分" />
        <Button onClick={uploadGameScore} type="primary" className={styles.btnConfirm}>Upload game score</Button>
      </section>
      <section>
        <InputNumber ref={withdrawRef} style={{ width: '200px' }} placeholder="Enter amount 输入数" />
        <Button onClick={withdraw} type="primary" className={styles.btnConfirm}>Withdraw</Button>
      </section>
    </div>
  )
}

export default Earn
