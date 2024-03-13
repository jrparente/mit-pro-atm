const ATMDeposit = ({ deposit, isDeposit, onChange, isValid }) => {
  const choice = ["Deposit", "Cash Back"];

  return (
    <label>
      <h3> {choice[Number(!isDeposit)]}</h3>
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
            <div className="divider"></div>
            <ATMDeposit
              deposit={deposit}
              onChange={handleChange}
              isDeposit={isDeposit}
              isValid={validTransaction}
            />
          </>
        )}
      </form>
    </div>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
