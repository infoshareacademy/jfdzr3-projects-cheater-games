import { useItems } from "../../hooks/useItems";
import { useUser } from "../../hooks/useUser";
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';




export const Items = (ref) => {
    const user = useUser();
    const items = useItems(ref);
    console.log(items);
    

  

    return (
        <Container>
        <Grid container>

        {items && items.map((item, index) => (

         <Grid item key={index} xs={12} md={6} lg={3} >
                <h5>{item.key}</h5>
                <h6>gold: {item.val.value}</h6>
            </Grid>
        ))}
        </Grid>
        
        </Container>
    )
}