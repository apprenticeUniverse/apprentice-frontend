import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Container } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(4),
    }
}));

const PageContainer =({children})=>{
    const classes = useStyles();
    return(
        <Container className={classes.container}> 
            {children}
        </Container>
        

    );
}

export default PageContainer;