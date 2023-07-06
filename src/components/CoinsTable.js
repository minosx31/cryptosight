import { useState } from "react"
import { CryptoState } from "../CryptoContext";
import { CircularProgress, Container, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Carousel";
import { makeStyles } from "tss-react/mui";
import { useGetCoinListQuery } from "../api/CryptoApi";

const CoinsTable = () => {

    const useStyles = makeStyles()(()=> {
        return {
            title: {
                flex: 1,
                color: "gold",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                cursor:"pointer"
            },
            row: {
                cursor: "pointer",
                "&:hover": {
                    backgroundColor: "#62656e"
                },
                fontFamily: "Montserrat"
            }/*,
            pagination: {
                "& .MuiPaginationItem-root": {
                    color: "gold"
                }
            }*/
        }
    })

    const { classes } = useStyles();

    const darkTheme = createTheme({
        palette: {
            mode: "dark"
        }
    });

    const [search, setSearch] = useState("");
    const { currency, symbol } = CryptoState();
    const [page, setPage] = useState(1)
    const history = useNavigate();

    const { data: coins, isFetching } = useGetCoinListQuery(currency)

    const handleSearch = () => {
        return coins?.filter((coin) => {
            return coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search);
        })
    }

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center"}}>
            <Typography variant="h4" style={{ margin: 18, fontFamily: "Montserrat"}}>
                Cryptocurrency Prices by Market Cap
            </Typography>
                    <TextField 
                    label="Search for a cryptocurrency" 
                    variant="outlined" 
                    style={{ marginTop: 20, marginBottom: 20, width: "100%"}}
                    onChange={(e) => setSearch(e.target.value)} 
                    />

                    <TableContainer>
                        {
                            isFetching ? (<CircularProgress />) 
                            : (
                            <Table>
                                <TableHead style={{backgroundColor: "grey"}}>
                                    <TableRow>
                                        {["Coin", "Price", "24h Change", "Market Cap"].map((head) => {
                                            return (
                                            <TableCell 
                                            style={{color: "white", fontWeight: "700", fontFamily: "Montserrat"}}
                                            key={head}
                                            align={head === "Coin" ? "" : "right"}
                                            >
                                                {head}
                                            </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                        {handleSearch()
                                        .slice((page-1)*10, (page-1)*10 + 10)
                                        .map((row) => {
                                            const profit = row.price_change_percentage_24h > 0;

                                            return (
                                                <TableRow 
                                                onClick={() => history(`/coins/${row.id}`)}
                                                className={classes.row}
                                                key={row.name}
                                                >
                                                    <TableCell
                                                    component="th"
                                                    scope="row"
                                                    style={{
                                                        display: "flex",
                                                        gap: 15
                                                    }}>
                                                        <img src={row?.image} alt={row.name} height="50" style={{marginBottom:10}} />
                                                        <div style={{
                                                            display: "flex",
                                                            flexDirection: "column"
                                                        }}>
                                                            <span style={{
                                                                textTransform: "uppercase",
                                                                fontSize: 22,
                                                            }}>
                                                                {row.symbol}
                                                            </span>
                                                            <span style={{ color: "darkgrey"}}>{row.name}</span>
                                                        </div>
                                                    </TableCell>

                                                    <TableCell align="right">
                                                        {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                                                    </TableCell>

                                                    <TableCell align="right" style={{ color: profit >= 0 ? "green" : "red", fontWeight: 500}}>
                                                        {profit && "+"}{row.price_change_percentage_24h.toFixed(2)}%
                                                    </TableCell>

                                                    <TableCell align="right">
                                                        {symbol} {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                </TableBody>
                            </Table>
                            )
                        }
                    </TableContainer>

                    <Pagination style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center"
                    }} 
                    variant="outlined" 
                    count={(handleSearch()?.length/10).toFixed(0)} 
                    onChange={(_, value) => {
                        setPage(value)
                        window.scroll( {top: 0, left: 0, behavior: "smooth"})
                    }}
                    />
        </Container>
    </ThemeProvider>
  )
}
export default CoinsTable