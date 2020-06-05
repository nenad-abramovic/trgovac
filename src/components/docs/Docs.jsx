import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import spec from "./spec.json";
import styles from "./Docs.module.css";

const Docs = () => (
  <div className={styles.container}>
    <SwaggerUI spec={spec} />
  </div>
);

export default Docs;
