import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme } from '@material-ui/core/styles';
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications"; // deleteFile
import { mainListItems, secondaryListItems } from "./listItems";
import PropTypes from "prop-types";
import { Banner } from "./banner";
import Transactions from "./Transactions";
import WalletButton from "./buttons/WalletButton";
import Logo from "../../logo.png";
import ConnectToWallet from "./ConnectToWallet";
import { BigNumber } from "ethers";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        AdMonkey
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#1b1b1b',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "black",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  logo: {
    maxWidth: "50px",
    width: "100%",
    marginRight: "10px",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: "100%",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 10,
    color: "black",
    display: "flex !important",
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    color: "white",
    fontFamily: 'Rubik',
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 300,
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const {
    initialized,
    reward,
    onClaimReward,
    isClaimButtonDisabled,
    balance,
    nextAvailableClaimDate,
    transactions,
    invalidChain,
    provider,
    loadWeb3Modal,
    logoutOfWeb3Modal,
    loading,
    claimedRewardTransaction,
  } = props;

  let rfiReward = 0;


  if (invalidChain || !initialized) {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>


            <img src={Logo} className={clsx(classes.logo)} />
            <Typography
              component="h1"
              variant="h6"
              color="white"
              noWrap
              className={classes.title}
            >
              <b style={{ color: "#ffc20d" }}>Ad</b>Monkey
            </Typography>
            <WalletButton
              provider={provider}
              loadWeb3Modal={loadWeb3Modal}
              logoutOfWeb3Modal={logoutOfWeb3Modal}
            />
          </Toolbar>
        </AppBar>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <ConnectToWallet isInvalidChain={invalidChain} provider={provider}/>
        </main>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
      >
        <Toolbar className={classes.toolbar}>

          <img src={Logo} className={clsx(classes.logo)} />
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <b style={{ color: "#e67e22" }}>Ad</b>Monkey
          </Typography>
          <WalletButton
            provider={provider}
            loadWeb3Modal={loadWeb3Modal}
            logoutOfWeb3Modal={logoutOfWeb3Modal}
          />
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {!claimedRewardTransaction ? null : (
          <div
            style={{
              backgroundColor: "#e67e22",
              color: "white",
              height: "80px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: "1.5rem" }}>
              Congratulations! Your reward is on its way. Track it on{" "}
              <a
                href={`${process.env.REACT_APP_BSCSCAN_BASE_URL}/tx/${claimedRewardTransaction}`}
              >
                BSSCAN.
              </a>
            </div>
          </div>
        )}
        <Banner balance={balance} reward={reward} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} lg={4}>
              <Paper className={fixedHeightPaper}>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  reward: PropTypes.number,
  nextAvailableClaimDate: PropTypes.instanceOf(Date),
  balance: PropTypes.number,
  transactions: PropTypes.array,
};
