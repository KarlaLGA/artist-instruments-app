import React from "react";
import { useQuery } from "@apollo/react-hooks";
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import { GET_ARTISTS } from "../../queries/index";
import Artist from "../listItems/Artist";

const Contacts = () => {
  const { loading, error, data } = useQuery(GET_ARTISTS);

  return (
    <ul>
      {!loading &&
        data.artists.map(({ id, firstName, lastName }) => (
          <Container key={id}>
            <List>
              <Artist id={id} firstName={firstName} lastName={lastName} key={id} />
            </List>
          </Container>
        ))}
    </ul>
  );
};

export default Contacts;
