import React from "react";

import { Link } from "react-router-dom";

const ProductInfoLink = ({ id, name }) => (
  <Link to={`/product/info/${id}`}>{name}</Link>
);

export default ProductInfoLink;
