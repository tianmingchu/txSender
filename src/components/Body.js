import '../styles/Header.css';

const Body = ({ burners, useBurner, setUseBurner, balances, base, prio, limit, txs, setTxs }) => {
    const checks = (i) => (e) => {
        useBurner[i] = !useBurner[i];
        setUseBurner(useBurner);
    }

    const changeTx = (i, val) => {
        txs[i] = val;
        const abc = [...txs]
        setTxs(abc)
    }
    
    return (
        <section className="text-center mt-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-1">
                        <h4 className="header-title mb-3">Use?</h4>
                        {useBurner.map((a, i) => (<div className="form-check form-switch body-row-checkbox mx-auto w-50" key={i}><input value={i} className="form-check-input" type="checkbox" onChange={checks(i)} /></div>))}
                    </div>
                    <div className="col-2">
                        <h4 className="header-title mb-3">Wallet</h4>
                        {burners.map((burner, i) => (<div className="body-row" key={i}>{burner.slice(0, 8)} ..... {burner.slice(-4)}</div>))}
                    </div>
                    <div className="col-2">
                        <h4 className="header-title mb-3">Balance</h4>
                        {balances.map((balance, i) => (<div className="body-row" key={i}>{balance.slice(0, 6)}</div>))}
                    </div>
                    <div className="col-2">
                        <h4 className="header-title mb-3">Base/Prio/Limit</h4>
                        {burners.map((a, i) => (<div className="body-row" key={i}>{base ? base : ""}{(base && prio) || (base && limit) ? " / " : ""}{prio ? prio : ""}{(limit && prio) ? " / " : ""}{limit ? limit : ""}</div>))}
                    </div>
                    <div className="col-3">
                        <h4 className="header-title mb-3">Tx</h4>
                        {burners.map((a, i) => (<textarea className="form-control body-row-tx w-50 mx-auto mb-3" placeholder="Tx Data" rows="1" key={i} value={txs[i]} onChange={(e) => {changeTx(i, e.target.value)}}></textarea>))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Body
