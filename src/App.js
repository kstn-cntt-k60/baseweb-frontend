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
import Export from "./components/Export";
import ExportOrderItem from "./components/Export/OrderItem";
import Salesman from "./components/SalesRoute/Salesman/Salesman";
import SalesRoute from "./components/SalesRoute";
import PlanningPeriodDetail from "./components/SalesRoute/PlanningPeriodDetail";
import ConfigIndex from "./components/SalesRoute/ConfigIndex";
import Schedule from "./components/SalesRoute/Schedule";
import ScheduleInfoIndex from "./components/SalesRoute/Schedule/ScheduleInfoIndex";
import ScheduleInfo from "./components/SalesRoute/Schedule/ScheduleInfo";
import AddSalesman from "./components/SalesRoute/Salesman/AddSalesman";
import SalesmanChecking from "./components/SalesRoute/Salesman/SalesmanChecking";
import ScheduleIndex from "./components/SalesRoute/Salesman/ScheduleIndex";
import AddCustomerStore from "./components/Facility/AddCustomerStore";

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

        <PrivateRoute path="/order/view-order/:orderId">
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

        <PrivateRoute path="/facility/add-facility">
          <MainLayout>
            <AddCustomerStore />
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

        <PrivateRoute path="/import-export/import-warehouse/:id">
          <MainLayout>
            <ImportWarehouse />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute path="/import-export/import-warehouse-product/:warehouseId/:productId">
          <MainLayout>
            <ImportWarehouseProduct />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute path="/import-export/export">
          <MainLayout>
            <Export />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute path="/import-export/export-order-item/:orderId">
          <MainLayout>
            <ExportOrderItem />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute path="/sales-route/salesman">
          <MainLayout>
            <Salesman />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute path="/sales-route/config">
          <MainLayout>
            <ConfigIndex />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute path="/sales-route/planning">
          <MainLayout>
            <SalesRoute />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute path="/sales-route/planning-period-detail/:id">
          <MainLayout>
            <PlanningPeriodDetail />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute path="/sales-route/schedule">
          <MainLayout>
            <Schedule />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute path="/sales-route/view-schedules">
          <MainLayout>
            <ScheduleInfoIndex />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute path="/sales-route/add-salesman">
          <MainLayout>
            <AddSalesman />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute path="/schedule/schedule-detail/:id">
          <MainLayout>
            <ScheduleInfo />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute path="/salesman/schedule">
          <MainLayout>
            <ScheduleIndex />
          </MainLayout>
        </PrivateRoute>

        <PrivateRoute path="/salesman/checkin">
          <MainLayout>
            <SalesmanChecking />
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
