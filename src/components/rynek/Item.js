import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Paper from "@material-ui/core/Paper";
import { Typography } from '@material-ui/core';

export const Item = ({item}) => {
return (
    <div>
{/* <Card>
    <CardHeader
        title={item.key}
        // subheader={item.type}
         />
         <CardContent>
             <Typography>
                 gold: {item.val.value}
             </Typography>
         </CardContent>
</Card> */}


 <h5>{item.key}</h5>
<h6>gold: {item.val.value}</h6>

    </div>
)
}