import React, { Fragment } from "react";
import { Container, Row, Col } from "reactstrap";
import { Breadcrumbs } from "../../../../AbstractElements";
import UserDetails3 from "./UserDetails3";
import UserDetail4 from "./UserDetail4";

const UsersProfileContain = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle="User Profile" parent="Users" title="User Profile" />
      <Container fluid={true}>
        <Row className="g-0">
          <Col xs="12" sm="4" md="3" className="p-3 d-flex justify-content-center align-items-center">
            <UserDetails3 />
          </Col>
          <Col xs="12" sm="8" md="9" className="p-3">
            <UserDetail4 />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default UsersProfileContain;
