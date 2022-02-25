import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import { green } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import ContactList from "./ContactList";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 1,
    width: 384,
    minHeight: 200,
    "&.MuiAppBar-root": {
      backgroundColor: "red",
    },
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: green[600],
    },
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 10,
    color: "#c4c4c4",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  swipeable: {
    marginTop: theme.spacing(13),
  },
}));

const tabStyle = {
  default_tab: {
    fontFamily: `"PT Sans", sans-serif`,
    color: "#c4c4c4",
    fontSize: 20,
  },
  active_tab: {
    color: "#68C222",
    fontFamily: `"PT Sans", sans-serif`,
    fontSize: 20,
  },
};

export default function FrontPage({
  contactList,
  handleName,
  handleAdd,
  AppName,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: "primary",
      className: classes.fab,
      icon: <AddIcon />,
      label: "Add",
    },
    {
      color: "secondary",
      className: classes.fab,
      icon: <EditIcon />,
      label: "Edit",
    },
    {
      color: "inherit",
      className: clsx(classes.fab, classes.fabGreen),
      icon: <UpIcon />,
      label: "Expand",
    },
  ];

  const getStyle = (isActive) => {
    return isActive ? tabStyle.active_tab : tabStyle.default_tab;
  };

  return (
    <div className={classes.root}>
      <AppBar style={{ background: "#202C33" }}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h5" noWrap>
            {AppName} Chat App
          </Typography>
          <IconButton aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton
            aria-label="display more actions"
            edge="end"
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Toolbar>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab style={getStyle(value === 0)} label="CHATS" {...a11yProps(0)} />
          <Tab style={getStyle(value === 1)} label="STATUS" {...a11yProps(1)} />
          <Tab style={getStyle(value === 2)} label="CALLS" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
        className={classes.swipeable}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {contactList.map((val) => {
            return <ContactList key={val} name={val} handleName={handleName} />;
          })}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {contactList.map((val) => {
            return <ContactList key={val} name={val} handleName={handleName} />;
          })}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          {contactList.map((val) => {
            return <ContactList key={val} name={val} handleName={handleName} />;
          })}
        </TabPanel>
      </SwipeableViews>
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${
              value === index ? transitionDuration.exit : 0
            }ms`,
          }}
          unmountOnExit
        >
          <Fab
            aria-label={fab.label}
            className={fab.className}
            color={fab.color}
            style={{ position: "fixed", bottom: 20, right: 20 }}
            onClick={handleAdd}
          >
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </div>
  );
}
