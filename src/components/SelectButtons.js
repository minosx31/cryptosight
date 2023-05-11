import { makeStyles } from "tss-react/mui";

const SelectButtons = ({children, selected, onClick}) => {
    const useStyles = makeStyles()((theme)=> {
        return {
            selectbuttons: {
                border: "1px solid gold",
                borderRadius: 5,
                padding: 10,
                paddingLeft: 20,
                paddingRight: 20,
                fontFamily: "Montserrat",
                cursor: "pointer",
                backgroundColor: selected ? "gold" : "",
                color: selected ? "black" : "",
                fontWeight: selected ? 700 : 500,
                "&:hover": {
                  backgroundColor: "gold",
                  color: "black",
                },
                width: "20%",
                textAlign: "center"
              },
        }
      })
      
      const { classes } = useStyles();

  return (
    <span onClick={onClick} className={classes.selectbuttons}>
        {children}
    </span>
  )
}
export default SelectButtons