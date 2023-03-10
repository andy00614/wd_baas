import styles from '@/styles/Earn.module.scss'
import React, { useEffect, useState, useRef } from "react"
import { Button, Input, InputNumber, InputRef, message, Spin, Tooltip } from "antd"
import { Address } from "@prisma/client"
import { balanceBSC, balanceWDT, getScore, withdrawal, updateScore } from '@/packages/web3'
import Web3 from 'web3'
import useLoading from '@/hooks/useLoading'
import { request } from '@/packages/lib/request'
import Image from 'next/image'


const Earn: React.FC = () => {
  const [canCheck, setCanCheck] = useState(false)
  const web3Instance = useRef<any>()
  const key = useRef<any>(null)
  const addressRef = useRef<InputRef>(null)
  const withdrawRef = useRef<HTMLInputElement>(null)
  const scoreRef = useRef<HTMLInputElement>(null)
  const [score, setScore] = useState(0)
  const [wdt, setWdt] = useState(0)
  const [bsc, setBsc] = useState(0)
  const { LoadingHoc, loading } = useLoading()

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
      message.success('查询成功！')
    }
  }
  const checkAllWithLoading = LoadingHoc(checkAll)

  const handleInputChange = (val: string) => {
    if (val.length === 64) {
      setCanCheck(true)
      key.current = (web3Instance).current.eth.accounts.privateKeyToAccount(val);
    } else {
      setCanCheck(false)
    }
  }

  const uploadGameScore = async () => {
    const address = addressRef.current?.input?.value
    const score = scoreRef.current?.value
    if (address && score) {
      const _score = await updateScore(score, address);
      if (_score.txId) {
        await request('/api/score', 'POST', { address, score })
        message.success('upload success!')
      } else {
        message.error('upload failed')
      }
    } else {
      message.error('please check input!')
    }
  }

  const withdraw = async () => {
    const address = addressRef.current?.input?.value
    const amount = withdrawRef.current?.value
    if (amount && address) {
      const _out = await withdrawal(Number(amount), address);
      if (_out.txId) {
        await request('/api/withdraw', 'POST', { address, amount })
        message.success('withdraw success!')
      } else {
        message.error('withdraw failed!')
      }
    } else {
      withdrawRef.current?.checked && (withdrawRef.current.checked = true);
      message.error('please check input!')
    }
  }
  return (
    <div className={styles.container}>
      <Spin spinning={loading}>
        <section>
          <div className={styles.inputWrapper}>
            <Input ref={addressRef} onChange={(e) => handleInputChange(e.target.value)} placeholder="请输入私钥" />
            <Button className={styles.checkBtn} disabled={!canCheck} onClick={checkAllWithLoading} type="primary">Check All</Button>
          </div>
          <div className={styles.moneyType}>
            <div className={styles.coinWrapper}>
              <Image height={24} width={24} src="/binance.png" alt="bsc" />
              <div className={styles.value}>
                <span>BSC:</span> <span>{bsc}</span>
              </div>
            </div>
            <div className={styles.coinWrapper}>
              <Image height={24} width={24} src="/dollar.png" alt="wdt" />
              <div className={styles.value}>
                <span>WDT:</span> <span>{wdt}</span>
              </div>
            </div>
            <div className={styles.coinWrapper}>
              <Image height={24} width={24} src="/coins.png" alt="score" />
              <div className={styles.value}>
                <span>Score:</span> <span>{score}</span>
              </div>
            </div>
          </div>
        </section>
        <section>
          <InputNumber min={0} ref={scoreRef} style={{ width: '200px' }} placeholder="Enter score输入积分" />
          <Button onClick={LoadingHoc(uploadGameScore)} type="primary" className={styles.btnConfirm}>Upload game score</Button>
        </section>
        <section>
          <InputNumber min={0} ref={withdrawRef} style={{ width: '200px' }} placeholder="Enter amount 输入数" />
          <Button onClick={LoadingHoc(withdraw)} type="primary" className={styles.btnConfirm}>Withdraw</Button>
        </section>
      </Spin>
    </div>
  )
}

export default Earn
