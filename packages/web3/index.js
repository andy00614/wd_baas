const API = {
  'Content-Type': 'application/json',
  'x-api-key': process.env.X_API_KEY || process.env.NEXT_PUBLIC_X_API_KEY
};
const WDT = process.env.WDT || process.env.NEXT_PUBLIC_WDT
const CONTRACT_GAME = process.env.CONTRACT_GAME || process.env.NEXT_PUBLIC_CONTRACT_GAME

console.log({API,WDT,CONTRACT_GAME})
/*
Below are the wallet functions
以下都是钱包功能
*/
export async function walletGenerate() {
  return JSON.parse(
    await (
      await fetch(`https://api.tatum.io/v3/bsc/wallet`, {
        method: 'GET',
        headers: API,
      })
    ).text()
  );
}
export async function walletAddress(_addr) {
  return JSON.parse(
    await (
      await fetch(`https://api.tatum.io/v3/bsc/address/${_addr}/1`, {
        method: 'GET',
        headers: API,
      })
    ).text()
  );
}
export async function walletPKey(_mne) {
  return await (
    await fetch(`https://api.tatum.io/v3/bsc/wallet/priv`, {
      method: 'POST',
      headers: API,
      body: JSON.stringify({
        index: 0,
        mnemonic: _mne,
      }),
    })
  ).json();
}
/*
Check balance functions
查余额功能
*/
export async function balanceBSC(_addr) {
  return JSON.parse(
    await (
      await fetch(`https://api.tatum.io/v3/bsc/account/balance/${_addr}`, {
        method: 'GET',
        headers: API,
      })
    ).text()
  );
}
export async function balanceWDT(_addr) {
  return JSON.parse(
    await (
      await fetch(
        `https://api.tatum.io/v3/blockchain/token/balance/BSC/${WDT}/${_addr}`,
        {
          method: 'GET',
          headers: API,
        }
      )
    ).text()
  );
}
/*
Update custom blockchain variable - update score
更新自定区块链变量 - 更新积分
*/
export async function updateScore(_score, _privKey) {
  return await (
    await fetch(`https://api.tatum.io/v3/bsc/smartcontract`, {
      method: 'POST',
      headers: API,
      body: JSON.stringify({
        contractAddress: CONTRACT_GAME,
        methodName: 'setScore',
        methodABI: {
          inputs: [
            {
              internalType: 'uint256',
              name: 'amt',
              type: 'uint256',
            },
          ],
          name: 'setScore',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        params: [_score],
        fromPrivateKey: _privKey,
      }),
    })
  ).json();
}
/*
Update custom blockchain variable - withdrawal
更新自定区块链变量 - 提币
*/
export async function withdrawal(_amt, _privKey) {
  return await (
    await fetch(`https://api.tatum.io/v3/bsc/smartcontract`, {
      method: 'POST',
      headers: API,
      body: JSON.stringify({
        contractAddress: CONTRACT_GAME,
        methodName: 'withdrawal',
        methodABI: {
          inputs: [{ internalType: 'uint256', name: 'amt', type: 'uint256' }],
          name: 'withdrawal',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        params: [_amt],
        fromPrivateKey: _privKey,
      }),
    })
  ).json();
}
/*
Fetch custom blockchain variable
取自定区块链变量
*/
export async function getScore(_addr) {
  return await (
    await fetch(`https://api.tatum.io/v3/bsc/smartcontract`, {
      method: 'POST',
      headers: API,
      body: JSON.stringify({
        contractAddress: CONTRACT_GAME,
        methodName: 'score',
        methodABI: {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          name: 'score',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        params: [_addr],
      }),
    })
  ).json();
}
