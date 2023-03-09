// 随机生成一个区块链钱包地址,0x开头,长度为42位
export function generateRandomWalletAddress():string {
  const characters = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += characters[Math.floor(Math.random() * 16)];
  }
  return address;
}
