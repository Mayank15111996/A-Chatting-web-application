import { Avatar, Card, CardActionArea, makeStyles } from "@material-ui/core";
import React from "react";

const useStyle = makeStyles((theme) => ({
  contact: {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  contactName: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(3),
    color: "#fff",
    fontSize: 19,
  },
  card: {
    backgroundColor: "#0f181e",
    maxWidth: 500,
  },
}));

const ContactList = ({ name, handleName }) => {
  const { contactName, contact, card, avatar } = useStyle();
  return (
    <Card className={card} onClick={() => handleName(name)}>
      <CardActionArea>
        <div className={contact}>
          <Avatar
            className={avatar}
            alt={`${name}`}
            src={`/static/images/avatar/${name}.jpg`}
          />
          <div className={contactName}>{name}</div>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default ContactList;
