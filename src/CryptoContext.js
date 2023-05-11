import { createContext, useContext, useState, useEffect} from "react"

const crypto = createContext()

const CryptoContext = ({children}) => {
    const [currency, setCurrency] = useState("USD")
    const [symbol, setSymbol] = useState("US$")

    useEffect(() => {
        if (currency==="USD") setSymbol("US$")
        else if (currency==="SGD") setSymbol("S$");
    }, [currency])

  return (
    <crypto.Provider value={{currency, symbol, setCurrency}}>
        {children}
    </crypto.Provider>
  )
}
export default CryptoContext;

export const CryptoState = () => {
    return useContext(crypto);
}