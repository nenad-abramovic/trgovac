import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import styles from "./Docs.module.css";

export default () => (
  <div className={styles.container}>
    <SwaggerUI url="https://trgovac.herokuapp.com" />
  </div>
);
