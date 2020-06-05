import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { logoutAction } from "../actions";
import { connect } from "react-redux";

import NavBar, { navBarWidth, drawerHeader } from "./NavBar";
import { STATE_INIT } from "../reducers/auth";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${navBarWidth}px)`,
    marginLeft: navBarWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -navBarWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  right: {
    marginLeft: "auto",
    textDecoration: "none"
  },
  loginButton: {
    background: theme.palette.warning.light
  },
  drawerHeader: drawerHeader(theme)
}));

const MainLayout = ({ loginEnabled, children, onClickLogout }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleNavBarOpen = () => {
    setOpen(true);
  };

  const handleNavBarClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleNavBarOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            DMS
          </Typography>

          <Link to="/login" className={classes.right}>
            {loginEnabled ? (
              <Button
                variant="contained"
                color="secondary"
                style={{ marginRight: "5px" }}
              >
                Login
              </Button>
            ) : (
              ""
            )}
          </Link>
          <Button onClick={onClickLogout} variant="contained" color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <NavBar open={open} handleNavBarClose={handleNavBarClose} />

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
};

const mapState = state => ({
  loginEnabled: state.auth.state === STATE_INIT
});

const mapDispatch = dispatch => ({
  onClickLogout: () => dispatch(logoutAction())
});

export default connect(mapState, mapDispatch)(MainLayout);
