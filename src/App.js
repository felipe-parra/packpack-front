import "./App.css";
import Layout from "./components/Layout";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/Home";
import FormSign from "./pages/FormSign";
import FormUser from "./pages/FormUser";
import NotFound from "./components/NotFound";
import PrivateComponent from "./components/PrivateComponent";
import AccountPage from "./pages/Account";

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/login" component={FormSign} />
        <Route exact path="/register" component={FormSign} />
        <PrivateComponent exact path="/" component={HomePage} />
        <PrivateComponent exact path="/account" component={AccountPage} />
        <PrivateComponent exact path="/users/create" component={FormUser} />
        <PrivateComponent exact path="/users/edit/:userId" component={FormUser} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
