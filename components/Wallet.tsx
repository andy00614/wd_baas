import { Button, message, Spin, Tag } from "antd"
import { useMemo, useState } from "react"
import { walletGenerate, walletAddress, walletPKey } from '@/packages/web3'
import styles from '@/styles/Wallet.module.scss'
import { request } from "@/packages/lib/request"

const colors = ['#F8B195', '#F67280', '#C06C84', '#6C5B7B', '#355C7D', '#2A363B', '#A2D5C6', '#E9D78E', '#EFEA5A', '#C5BC8E', '#F8B195', '#F67280', '#E9D78E', '#C06C84', '#A2D5C6']



function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

const Wallet = (props: {gencallBack: () => void}) => {
  const [wallet, setWallet] = useState({ public: '', private: '' })
  const [loading, setLoading] = useState(false)
  const [MnemonicWords, setMnemonicWords] = useState<string[]>([])

  const generateWallet = async () => {
    try {
      setLoading(true)
      const pubkey = await walletGenerate();
      const [address, privkey] = await Promise.all(
        [
          walletAddress(pubkey.xpub),
          walletPKey(pubkey.mnemonic)
        ]
      )
      const publicAdress = address.address
      const privateKey = privkey.key
      await request('/api/address', 'POST', { mnemonic: pubkey.mnemonic, address: publicAdress, privateKey: privateKey, balance: 0 })
      setWallet({
        public: publicAdress,
        private: privkey.key,
      })
      setMnemonicWords(pubkey.mnemonic.split(' '))
      message.success('钱包生成成功')
      props.gencallBack()
    } finally {
      setLoading(false)
    }
  }

  const words = useMemo(() => MnemonicWords.map(
    item => <Tag className={styles.tag} key={item} color={getRandomColor()}>{item}</Tag>),
    [MnemonicWords]
  ) 

  return <div className={styles.container}>
    <Spin spinning={loading}>
      <Button type="primary" onClick={generateWallet} className={styles.btnWallet}>造钱包</Button>
      <Button>记住了</Button>
      <div className={styles.address}>
        <div>助记词：
          {words}
        </div>
        <span>Address地址: {wallet.public}</span>
        <span>Private Key秘钥: {wallet.private}</span>
      </div>
    </Spin>
  </div>
}

export default Wallet
