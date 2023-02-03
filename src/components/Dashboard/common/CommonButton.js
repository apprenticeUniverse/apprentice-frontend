import React from "react";
import { Button } from "@material-ui/core";


const CommonButton = ({children,
                     color,
                     disabled,
                     size,
                     variant,
                     classes,
                     onclick,
                     sx})=>{

    return(
        <Button 
        color={color}
        disabled= {disabled}
        size= {size}
        variant={variant}
        sx={sx}
        className={classes}
        onClick={onclick}> 

                 {children}
        </Button>
    );


}

export default CommonButton;
