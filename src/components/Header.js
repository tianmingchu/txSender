import '../styles/Header.css';
import PropTypes from 'prop-types';

const Header = ({ sendTx, setBase, setPrio, setLimit, setTx, setTxs, base, prio, limit, tx, len, to, setTo, value, setValue }) => {
    const onSubmit = (e) => {
        e.preventDefault();
        sendTx(e.nativeEvent.submitter.id);
    }

    const changeTx = (val) => {
        setTx(val)
        setTxs(Array(len).fill(val));
    }

    return (
        <section className="text-center mt-3">
            <div className="container">
                <form onSubmit={onSubmit}>
                    <div className="row justify-content-center">
                        <div className="col-2">
                            <h3 className="header-title">To</h3>
                            <div className="form-group">
                                <input type="text" placeholder="Addr" className="form-control w-50 text-center mx-auto" id="toAddr" value={to} onChange={(e) => {
                                    setTo(e.target.value)
                                }} />
                            </div>
                        </div>
                        <div className="col-2">
                            <h3 className="header-title">Value</h3>
                            <div className="form-group">
                                <input type="text" placeholder="ETH" className="form-control w-50 text-center mx-auto" id="ethValue" value={value} onChange={(e) => {
                                    setValue(e.target.value)
                                }} />
                            </div>
                        </div>
                        <div className="col-2">
                            <h3 className="header-title">Base</h3>
                            <div className="form-group">
                                <input type="text" placeholder="GWEI" className="form-control w-50 text-center mx-auto" id="baseFee" value={base} onChange={(e) => {
                                    setBase(e.target.value)
                                }} />
                            </div>
                        </div>
                        <div className="col-2">
                            <h3 className="header-title">Prio</h3>
                            <div className="form-group">
                                <input type="text" placeholder="GWEI" className="form-control w-50 text-center mx-auto" id="priorityFee" value={prio} onChange={(e) => {
                                    setPrio(e.target.value)
                                }} />
                            </div>
                        </div>
                        <div className="col-2">
                            <h3 className="header-title">Limit</h3>
                            <div className="form-group">
                                <input type="text" placeholder="Gas" className="form-control w-50 text-center mx-auto" id="gasLimit" value={limit} onChange={(e) => {
                                    setLimit(e.target.value)
                                }} />
                            </div>
                        </div>
                        <div className="col-2">
                            <h3 className="header-title">Tx</h3>
                            <div className="form-group">
                                <textarea className="form-control" placeholder="Tx Data" rows="5" id="rawTx" value={tx} onChange={(e) => {
                                    changeTx(e.target.value)
                                }}></textarea>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-info mt-3 mx-2" type="submit" id="transfer">Transfer</button>
                    <button className="btn btn-info mt-3 mx-2" type="submit" id="send">Send</button>
                    <button className="btn btn-info mt-3 mx-2" type="submit" id="sendAll">Send All</button>
                </form>
            </div>
        </section>
    )
}

Header.propTypes = {
    onClick: PropTypes.func
}

export default Header
