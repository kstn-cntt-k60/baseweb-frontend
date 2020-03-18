import React from "react";
import MainLayout from "./components/MainLayout";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import SecurityGroup from "./components/SecurityGroup";
import SecurityPermission from "./components/SecurityPermission";
import AddSecurityGroupDialog from "./components/AddSecurityGroupDialog";
import Notifications from "./components/Notifications";
import Party from "./components/Party";
import AddPartyDialog from "./components/AddPartyDialog";
import EditPersonDialog from "./components/EditPersonDialog";
import EditCustomerDialog from "./components/EditCustomerDialog";
import YesNoDialog from "./components/YesNoDialog";

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

        <PrivateRoute path="/order/view-edit">
          <MainLayout>
            <h2>Orders</h2>
          </MainLayout>
        </PrivateRoute>

        <Route path="/error">
          <h1>ERROR</h1>
        </Route>

        <Redirect to="/error" />
      </Switch>
    </BrowserRouter>

    <AddPartyDialog />
    <AddSecurityGroupDialog />
    <EditPersonDialog />
    <EditCustomerDialog />
    <YesNoDialog />
    <Notifications />
  </React.Fragment>
);

export default App;
