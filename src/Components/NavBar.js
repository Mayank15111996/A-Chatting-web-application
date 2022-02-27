import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import {
  ArrowBack,
  Call,
  Delete,
  ForwardOutlined,
  Star,
  VideocamRounded,
} from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import { getDatabase, onValue, remove, ref } from "firebase/database";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    minHeight: theme.spacing(8.1),
  },
  sectionDesktop: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  arrow: {
    marginRight: theme.spacing(1),
  },
}));

export default function PrimarySearchAppBar({
  yourName,
  setYourName,
  change,
  handleDeleteOpen,
  name,
  setChats,
  updateChats,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDeleteAll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // e.stopImmediatePropagation();
    onValue(
      ref(getDatabase(), "chats"),
      (snapshot) => {
        let toDelete = [];
        snapshot.forEach((childSnapshot) => {
          if (
            childSnapshot.val().name === name &&
            childSnapshot.val().sentTo === yourName
          ) {
            toDelete.push(childSnapshot.key);
            remove(ref(getDatabase(), `chats/${childSnapshot.key}`));
          }
        });
        setChats(updateChats(toDelete));
      },
      {
        onlyOnce: true,
      }
    );
    handleMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={(e) => handleDeleteAll(e)}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge color="secondary">
            <Delete />
          </Badge>
        </IconButton>
        <p>Delete All</p>
      </MenuItem>
    </Menu>
  );

  const handleBack = () => {
    setYourName("");
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "#202C33" }}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleBack}
          >
            <ArrowBack className={classes.arrow} />
            {!change && (
              <Avatar
                alt={`${yourName}`}
                src={`/static/images/avatar/${yourName}.jpg`}
              />
            )}
          </IconButton>
          {!change && (
            <Typography className={classes.title} variant="h6" noWrap>
              {yourName}
            </Typography>
          )}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {change ? (
              <>
                <IconButton color="inherit">
                  <Star />
                </IconButton>
                <IconButton color="inherit">
                  <ForwardOutlined style={{ transform: "rotate(180deg)" }} />
                </IconButton>
                <IconButton color="inherit" onClick={() => handleDeleteOpen()}>
                  <Delete />
                </IconButton>
                <IconButton color="inherit">
                  <ForwardOutlined />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton color="inherit">
                  <VideocamRounded />
                </IconButton>
                <IconButton color="inherit">
                  <Call />
                </IconButton>
              </>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton onClick={handleMobileMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
