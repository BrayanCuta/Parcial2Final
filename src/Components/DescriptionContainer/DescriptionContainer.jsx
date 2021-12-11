import React from "react";
import { Card } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

const DescriptionContainer = ({selected }) => {
  return (
      <>
      {
          selected && 
          <div>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={selected ? selected.poster : <FormattedMessage id="Error" />} />
          <Card.Body>
            <Card.Title>{selected.name}</Card.Title>
            <Card.Text>
              {selected.description}
            </Card.Text>
           
          </Card.Body>
        </Card>
        </div>
      }
      </>
  );
};

export default DescriptionContainer;
