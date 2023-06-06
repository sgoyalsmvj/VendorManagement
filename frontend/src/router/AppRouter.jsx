import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import PageLoader from "@/components/PageLoader";

const auth = JSON.parse(localStorage.getItem("auth"));
const permissions = auth ? auth.permissions : null;

const Dashboard = lazy(() =>
  import(/*webpackChunkName:'DashboardPage'*/ "@/pages/Dashboard")
);
const Admin = lazy(() =>
  import(/*webpackChunkName:'AdminPage'*/ "@/pages/Admin")
);

const Customer = lazy(() =>
  import(/*webpackChunkName:'CustomerPage'*/ "@/pages/Customer")
);

const SelectCustomer = lazy(() =>
  import(/*webpackChunkName:'SelectCustomerPage'*/ "@/pages/SelectCustomer")
);

const Lead = lazy(() => import(/*webpackChunkName:'LeadPage'*/ "@/pages/Jobs"));
const Role = lazy(() => import(/*webpackChunkName:'LeadPage'*/ "@/pages/Role"));
const Product = lazy(() =>
  import(/*webpackChunkName:'ProductPage'*/ "@/pages/Product")
);

const Report = lazy(() => import(/*webpackChunkName:'ReportPage'*/ "@/pages/Report"));

const Logout = lazy(() =>
  import(/*webpackChunkName:'LogoutPage'*/ "@/pages/Logout")
);
const NotFound = lazy(() =>
  import(/*webpackChunkName:'NotFoundPage'*/ "@/pages/NotFound")
);

export default function AppRouter() {
  const location = useLocation();
  const superadmin = permissions === "superadmin";
  const permissionsArray = Array.isArray(permissions) ? permissions : [];

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch location={location} key={location.pathname}>
          <PrivateRoute path="/" component={Dashboard} exact />
          {(superadmin ||
            permissionsArray.includes("vendor")) && (
            <PrivateRoute component={Customer} path="/vendor" exact />
          )}
          <PrivateRoute component={SelectCustomer} path="/selectcustomer" exact />
          {(superadmin ||
            permissionsArray.includes("job")) && (
            <PrivateRoute component={Lead} path="/lead" exact />
          )}
          {(superadmin ||
            permissionsArray.includes("role")) && (
            <PrivateRoute component={Role} path="/role" exact />
          )}
          {(superadmin ||
            permissionsArray.includes("service")) && (
            <PrivateRoute component={Product} path="/product" exact />
          )}
          {(superadmin ||
            permissionsArray.includes("admin")) && (
            <PrivateRoute component={Admin} path="/admin" exact />
          )}
          {superadmin && (
            <PrivateRoute component={Report} path="/report" exact />
          )}
          <PrivateRoute component={Logout} path="/logout" exact />
          <PublicRoute
            path="/login"
            render={() => <Redirect to="/" />}
          />
          <Route
            path="*"
            component={NotFound}
            render={() => <Redirect to="/notfound" />}
          />
        </Switch>
      </AnimatePresence>
    </Suspense>
  );
}