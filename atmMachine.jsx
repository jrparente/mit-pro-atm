const ATMDeposit = ({ deposit, onChange, isValid }) => {
  const choice = ["Deposit", "Cash Back"];

  return (
    <label>
      <div className="atm-input">
        <input
          type="number"
          width="200"
          onChange={onChange}
          value={deposit}
        ></input>
        <input
          type="submit"
          width="200"
          value="Submit"
          disabled={!isValid}
        ></input>
      </div>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState("");
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState(null);
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [history, setHistory] = React.useState([]);

  let status = `Account Balance $ ${totalState} `;

  const handleChange = (event) => {
    if (event.target.value <= 0) {
      setValidTransaction(false);
      return;
    }
    if (atmMode === "Cash Back" && event.target.value > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setHistory([
      ...history,
      {
        date: new Date().toLocaleString(),
        transaction: isDeposit ? `+$${deposit}` : `-$${deposit}`,
        balance: newTotal,
      },
    ]);
    setValidTransaction(false);
    setDeposit("");
  };

  const handleModeSelect = (event) => {
    setAtmMode(event.target.value);
    if (event.target.value === "Deposit") setIsDeposit(true);
    if (event.target.value === "Cash Back") setIsDeposit(false);
  };

  return (
    <div className="d-flex flex-sm-column p-2">
      <h1 className="text-center">ATM Machine</h1>
      <form onSubmit={handleSubmit} className="form">
        <h2 id="total">{status}</h2>
        <select
          onChange={(e) => handleModeSelect(e)}
          name="mode"
          id="mode-select"
        >
          <option id="no-selection" value="">
            Select Transaction Type
          </option>
          <option id="deposit-selection" value="Deposit">
            Deposit
          </option>
          <option id="cashback-selection" value="Cash Back">
            Cash Back
          </option>
        </select>

        {atmMode !== null && (
          <>
            <ATMDeposit
              deposit={deposit}
              onChange={handleChange}
              isValid={validTransaction}
            />
          </>
        )}

        {history && history.length > 0 && (
          <div className="d-flex flex-column justify-content-center w-100">
            <div className="divider"></div>
            <h3>Transaction History</h3>
            <ul className="transaction-list">
              <li className="transaction">
                <h5>Date</h5>
                <div className="transaction-values">
                  <h5>Amount</h5>
                  <h5>Balance</h5>
                </div>
              </li>
              {history.map((transaction, index) => (
                <li key={index} className="transaction">
                  <span>{transaction.date}</span>
                  <div className="transaction-values">
                    <span>{transaction.transaction}</span>
                    <span>{` $${transaction.balance}`}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
