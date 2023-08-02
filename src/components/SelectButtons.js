import { makeStyles } from "tss-react/mui";

const SelectButtons = ({children, selected, onClick}) => {
    const useStyles = makeStyles()((theme)=> {
        return {
            selectbuttons: {
                border: "1px solid #818aa6",
                borderRadius: 5,
                padding: 10,
                fontFamily: "Montserrat",
                cursor: "pointer",
                backgroundColor: selected ? "#919cbb" : "",
                color: selected ? "black" : "",
                fontWeight: "700",
                "&:hover": {
                  backgroundColor: "#a1add0",
                  color: "black",
                },
                width: "20%",
                textAlign: "center",
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