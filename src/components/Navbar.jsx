import React, { useContext } from "react";
import { web3Context } from "../contex/web3Context";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import { formatAddress, formatBalance } from "../utils/helperUtils";
import { ButtonGroup, Button } from "@mui/material";

const pages = ["Add", "Search"];

const Navbar = () => {
  const { networkId, account, isSupportMetaMask, requestAccount, userBalance } =
    useContext(web3Context);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            onClick={() => navigate("/")}
            alt="Metamask"
            src="https://cryogen.life/images/CRYOGEN_smallerTrans.png"
            sx={{
              cursor: "pointer",
              width: 56,
              height: 56,
              display: { xs: "none", md: "flex" },
            }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={() => navigate(`/`)}>
                <Typography textAlign="center">{"Home"}</Typography>
              </MenuItem>
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => navigate(`/${page}`)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* <Avatar
            onClick={() => navigate("/")}
            alt="Metamask"
            src="https://cryogen.life/images/CRYOGEN_smallerTrans.png"
            sx={{
              marginRight: 4,
              cursor: "pointer",
              width: 40,
              height: 50,
              display: { xs: "flex", md: "none" },
            }}
          /> */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => navigate(`/${page}`)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!isSupportMetaMask ? (
              <Link
                href="https://metamask.io"
                target="_blank"
                rel="noopenner noreferrer"
                underline="none"
              >
                <Typography color={"white"} noWrap component="div">
                  Install Metamask
                </Typography>
              </Link>
            ) : !account ? (
              <Tooltip title="Connect">
                <IconButton onClick={requestAccount} sx={{ p: 0 }}>
                  <Avatar
                    alt="Metamask"
                    src={require("../assets/images/metamask.png")}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: { xs: 1, md: 2 },
                    padding: { xs: 1, md: 2 },
                    backgroundColor: "primary.dark",
                    "&:hover": {
                      backgroundColor: "secondary.main",
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                >
                  <Typography color={"white"} noWrap component="div">
                    {formatBalance(userBalance)}
                  </Typography>
                  <Typography color={"white"} noWrap component="div">
                    {formatAddress(account)}
                  </Typography>
                </Box>
              </>
            )}
            {/* <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
