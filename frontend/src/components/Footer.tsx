import React, { useState } from "react";
import { AppBar, Toolbar, Typography,  } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "./LanguageDropdown";



const Footer: React.FC = () => {
  const { t } = useTranslation();
const [score, setScore] = useState(0);

const handlePlayGame = () => {
// Add your game logic here
setScore(score + 10);
};

return (
<StyledAppBar position="static">
<Toolbar
  sx={{
      display: "flex",
      justifyContent: "space-between",
    }}
  >
<Typography variant="body1" sx={{ flexGrow: 1 }}>
© 2023 {t("footer.rights")}
</Typography>
<>
<LanguageDropdown/>
</>
</StyledToolbar>
</StyledAppBar>
);
};

const StyledAppBar = styled(AppBar)({
backgroundColor: "#333",
top: "auto",
bottom: 0,
});


export default Footer;

