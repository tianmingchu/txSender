import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from "./components/Header";
import Body from "./components/Body";
import { useState, useEffect } from 'react';
import { Network, Alchemy, Wallet, Utils } from "alchemy-sdk";

function App() {
  const { REACT_APP_MAINNET_API_KEY, REACT_APP_TO_ADDRESS } = process.env;
  const settings = {
    apiKey: REACT_APP_MAINNET_API_KEY,
    network: Network.ETH_MAINNET
  };
  const alchemy = new Alchemy(settings);
  const burners = JSON.parse(process.env.REACT_APP_BURNERS)
  const keys = JSON.parse(process.env.REACT_APP_KEYS)
  const wallets = keys.map((k) => (new Wallet(k)));
  const len = burners.length;
  const [base, setBase] = useState('');
  const [value, setValue] = useState(0);
  const [to, setTo] = useState('');
  const [prio, setPrio] = useState('');
  const [limit, setLimit] = useState('');
  const [tx, setTx] = useState('');
  const [useBurner, setUseBurner] = useState(Array(len).fill(false));
  const [balances, setBalances] = useState([]);
  const [txs, setTxs] = useState(Array(len));
  const [n1, setN1] = useState([])
  const [n2, setN2] = useState([])
  const [n3, setN3] = useState([])
  const [n4, setN4] = useState([])
  const [n5, setN5] = useState([])

  useEffect(() => {
    const getBalances = async () => {
      const b = await Promise.all(burners.map((burner) => (alchemy.core.getBalance(burner, "latest").then((a) =>  Utils.formatEther(a["_hex"])))))
      setBalances(b)
    }

    const getNonces = async (j, k, l) => {
      const n = [];
      for (var i = j; i < k; i++) {
        const nonce = await alchemy.core.getTransactionCount(wallets[i].address, "latest")
        n.push(nonce)
      }
      switch (l) {
        case 1: setN1(n); break;
        case 2: setN2(n); break;
        case 3: setN3(n); break;
        case 4: setN4(n); break;
        case 5: setN5(n); break;
      }
    }

    getBalances()
    setTimeout(() => {getNonces(0, 5, 1)}, 1500)
    setTimeout(() => {getNonces(5, 10, 2)}, 3000)
    setTimeout(() => {getNonces(10, 15, 3)}, 4500)
    setTimeout(() => {getNonces(15, 20, 4)}, 6000)
    setTimeout(() => {getNonces(20, 25, 5)}, 7500)
  }, [])

  const sendTx = async (id) => {
    if (id === "transfer") await transfer();
    const nonces = n1.concat(n2, n3, n4, n5)
    const use = (id === "sendAll") ? Array(len).fill(true) : useBurner;
    for (var i = 0; i < len; i++) {
      if (use[i]) {
        let transaction = {
          to: to,
          value: Utils.parseEther(value),
          gasLimit: limit,
          maxPriorityFeePerGas: Utils.parseUnits(prio, "gwei"),
          maxFeePerGas: Utils.parseUnits(base, "gwei"),
          nonce: nonces[i],
          chainId: 1,
          type: 2,
          data: txs[i]
        };

        let rawTransaction = await wallets[i].signTransaction(transaction);
        let tx = await alchemy.core.sendTransaction(rawTransaction);
        console.log(`Sent transaction for burner ${i}`, tx);
      }
    }
  }

  const transfer = async () => {
    const toAddress = REACT_APP_TO_ADDRESS;
    console.log(toAddress);
    const a = await Promise.all(burners.map((burner) => (alchemy.nft.getNftsForOwner(burner, {contractAddresses: [to]}).then((b) => (b.ownedNfts)))));
    const tokenIds = await a.map((id) => ((id.length > 0) ? id[0].tokenId : "-1"));
    const line = Array(64).join("0");
    var rawTxs = Array(len).fill("");
    for (let i = 0; i < tokenIds.length; i++) {
      if (tokenIds[i] != "-1") {
        let data = "0x23b872dd"
        const from = line.slice(0, 66 - burners[i].length) + burners[i].slice(2);
        const transferTo = line.slice(0, 66 - toAddress.length) + toAddress.slice(2);
        const id = parseInt(tokenIds[i]).toString(16);
        const tokenId = line.slice(0, 64 - id.length) + id;
        rawTxs[i] = data + from + transferTo + tokenId;
      }
    }
    setTxs(rawTxs);
  }

  return (
    <div className="app">
      <Header sendTx={sendTx} setBase={setBase} setPrio={setPrio} setLimit={setLimit} setTx={setTx} setTxs={setTxs} base={base} prio={prio} 
      limit={limit} tx={tx} len={len} value={value} setValue={setValue} to={to} setTo={setTo} />
      {balances.length > 0 && <Body burners={burners} useBurner={useBurner} setUseBurner={setUseBurner} balances={balances} base={base} prio={prio} 
      txs={txs} setTxs={setTxs} limit={limit} />}
    </div>
  );
}

export default App;
