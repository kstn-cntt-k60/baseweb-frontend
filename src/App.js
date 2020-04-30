import React from "react";
import MainLayout from "./components/MainLayout";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import SecurityGroup from "./components/SecurityGroup";
import SecurityPermission from "./components/SecurityPermission";
import Notifications from "./components/Notifications";
import Party from "./components/Party";
import UserLogin from "./components/UserLogin";
import Product from "./components/Product";
import ProductPricing from "./components/Product/ProductPricing";
import Warehouse from "./components/Facility/Warehouse";
import CustomerStore from "./components/Facility/CustomerStore";
import Import from "./components/Import";
import ImportWarehouse from "./components/Import/ImportWarehouse";
import ImportWarehouseProduct from "./components/Import/ImportWarehouseProduct";
import AddOrder from "./components/Order/AddOrder";
import ViewOrders from "./components/Order/ViewOrders";
import ViewOrder from "./components/Order/ViewOrder";

const App = () => (
  <React.Fragment>
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <PublicRoute exact path="/">
          <MainLayout>
            <h2>HOME PAGE</h2>
          </MainLayout>
        </PublicRoute>

        <PrivateRoute path="/account/party">
          <MainLayout>
            <Party />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute path="/account/user-login">
          <MainLayout>
            <UserLogin />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute path="/security/group">
          <MainLayout>
            <SecurityGroup />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute path="/security/permission">
          <MainLayout>
            <SecurityPermission />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute path="/order/add">
          <MainLayout>
            <AddOrder />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute path="/order/view">
          <MainLayout>
            <ViewOrders />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute noPreviousUrl path="/order/view-order/:orderId">
          <MainLayout>
            <ViewOrder />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute path="/product/view-edit">
          <MainLayout>
            <Product />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute path="/product/pricing">
          <MainLayout>
            <ProductPricing />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute path="/facility/warehouse">
          <MainLayout>
            <Warehouse />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute path="/facility/customer-store">
          <MainLayout>
            <CustomerStore />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute path="/import-export/import">
          <MainLayout>
            <Import />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute noPreviousUrl path="/import-export/import-warehouse/:id">
          <MainLayout>
            <ImportWarehouse />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute
          noPreviousUrl
          path="/import-export/import-warehouse-product/:warehouseId/:productId"
        >
          <MainLayout>
            <ImportWarehouseProduct />
          </MainLayout>
        </PrivateRoute>

        <Route path="/error">
          <h1>ERROR</h1>
        </Route>

        <Redirect to="/error" />
      </Switch>
    </BrowserRouter>

    <Notifications />
  </React.Fragment>
);

export default App;
