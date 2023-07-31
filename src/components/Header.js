import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { CryptoState } from "../CryptoContext";

const Header = () => {

    const useStyles = makeStyles()(()=> {
        return {
            title: {
                flex: 1,
                color: "#ffffff",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                cursor:"pointer"
            }
        }
    })

    const { classes } = useStyles();
    const history = useNavigate();
    const {currency, setCurrency} = CryptoState();

    const darkTheme = createTheme({
        palette: {
            mode: "dark"
        },
    });

  return (
    <ThemeProvider theme={darkTheme}>

    <AppBar color="transparent" position="static">
        <Container>
            <Toolbar>
                <Typography 
                    onClick={() => history("/")} 
                    className={classes.title}
                    variant="h5"
                >
                    CryptoSight
                </Typography>
            
                <Select 
                    variant="outlined"
                    style={
                        {
                            width: 100,
                            height: 40,
                            marginRight: 15,
                        }
                    }
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                >
                    <MenuItem value={"USD"}>USD</MenuItem>
                    <MenuItem value={"SGD"}>SGD</MenuItem>
                </Select>
            </Toolbar>
        </Container>

    </AppBar>
    </ThemeProvider>
  )
}
export default Header