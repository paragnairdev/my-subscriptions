import React from "react";
import { loadCurrencySymbol } from "../../services/dataService";

const Cur = () => {
    const currency = loadCurrencySymbol();
  return <span>{currency}</span>;
}

export default Cur;