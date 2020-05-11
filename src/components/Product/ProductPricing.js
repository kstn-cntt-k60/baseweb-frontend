import React, { useState } from "react";

import ProductPricingTable from "./ProductPricingTable";
import EditProductPrice from "./EditProductPrice";

const ProductPricing = () => {
  const [editId, setEditId] = useState(null);

  const onEdit = id => {
    setEditId(id);
  };

  return (
    <div>
      <ProductPricingTable onEdit={onEdit} />
      <EditProductPrice id={editId} />
    </div>
  );
};

export default ProductPricing;
