import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Link,
  Collapse,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";

import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RememberanceCard({ epitaph }) {
  const {
    firstName,
    lastName,
    birthCity,
    birthCountry,
    birthDate,
    deathDate,
    imageUri,
    notes,
    txHash,
  } = epitaph;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 400,
        minWidth: 300,
        minHeight: 500,
        backgroundColor: "#e1e1e136",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {firstName[0]}
          </Avatar>
        }
        title={`${firstName} ${lastName}`}
        subheader={`Born On: ${birthDate} in ${birthCity}, ${birthCountry} Died On: ${deathDate} `}
      />
      <CardMedia
        component="img"
        width={"auto"}
        height="100%"
        // height={400}
        minHeight={300}
        image={imageUri}
        alt={`${firstName} ${lastName}`}
      />
      <CardContent sx={{}}>
        <Typography variant="body2">{notes}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        {txHash && (
          <Link
            href={`https://testnet.bscscan.com/address/${txHash}`}
            target="_blank"
            rel="noopenner noreferrer"
            underline="none"
          >
            <TravelExploreIcon />
          </Link>
        )}

        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>

        </CardContent>
      </Collapse> */}
    </Card>
  );
}
