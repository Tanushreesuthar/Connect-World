import { Box } from "@mui/material";
import { styled } from "@mui/system";
//this below syntax is used to reuse css as a component and its  a styled component we have taken from @mui/system and name it as we want {FlexBetween} and you can pass css properties in here by doing this this will allow us to reuse this set of css properties to different areas 
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;