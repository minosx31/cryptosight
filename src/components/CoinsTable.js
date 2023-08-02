import { useState } from "react"
import { CryptoState } from "../CryptoContext";
import { CircularProgress, Container, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { useGetCoinListQuery } from "../api/CryptoApi";
import millify from "millify";
import { format } from "../utils/format";

const CoinsTable = () => {
    const useStyles = makeStyles()(()=> {
        return {
            row: {
                cursor: "pointer",
                "&:hover": {
                    backgroundColor: "#040509"
                },
                fontFamily: "Montserrat"
            }
        }
    })

    const { classes } = useStyles();

    const darkTheme = createTheme({
        palette: {
            mode: "dark"
        }
    });

    const [search, setSearch] = useState("");
    const { currency } = CryptoState();
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
                        style={{ width: "100%"}}
                        onChange={(e) => setSearch(e.target.value)} 
                    />

                    <TableContainer style={{ marginTop: "10px"}}>
                        {
                            isFetching ? (<CircularProgress style={{ margin: "20px" }} />) 
                            : (
                            <Table>
                                <TableHead style={{backgroundColor: "#0b0f1a"}}>
                                    <TableRow>
                                        {["Coin", "Price", "24h Change", "Market Cap"].map((head) => {
                                            return (
                                            <TableCell 
                                                style={{
                                                    color: "white", 
                                                    fontWeight: "700", 
                                                    fontFamily: "Montserrat"
                                                }}
                                                key={head}
                                                align={head === "Coin" ? "left" : "right"}
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
                                                        }}
                                                    >
                                                        <img src={row?.image} alt={row.name} height="50" style={{marginTop: 5, marginBottom: 5}} />
                                                        <div style={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            justifyContent: "center"
                                                        }}>
                                                            <span style={{
                                                                textTransform: "uppercase",
                                                                fontSize: 18,
                                                            }}>
                                                                {row.symbol}
                                                            </span>
                                                            <span style={{ color: "darkgrey"}}>{row.name}</span>
                                                        </div>
                                                    </TableCell>

                                                    <TableCell align="right">
                                                        ${format(row.current_price.toFixed(2))}
                                                    </TableCell>

                                                    <TableCell align="right" style={{ color: profit ? "#00a68c" : "#d9475a", fontWeight: 500}}>
                                                        {profit && "+"}{row.price_change_percentage_24h.toFixed(2)}%
                                                    </TableCell>

                                                    <TableCell align="right">
                                                        ${millify(row.market_cap, {space:true})}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                </TableBody>
                            </Table>
                            )
                        }
                    </TableContainer>

                    <Pagination 
                        style={{
                            padding: 20,
                            width: "100%",
                            display: "flex",
                            justifyContent: "center"
                        }}
                        variant="outlined"
                        shape="rounded"
                        count={Number((handleSearch()?.length/10).toFixed(0))} 
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