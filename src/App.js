import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./components/auth";
import { Layout } from "./components/shared/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { ForgotPassword, Signup, Login } from "./screens/auth";
import { Home } from "./screens/home";
import { Profile, UpdateProfile } from "./screens/profile";

function App() {
  return (
    <div className="flex items-center justify-center mx-auto">
      <Router>
        <AuthProvider>
          <Layout>
            <Switch>
              {/* HOME */}
              <Route path="/" component={Home} />
              {/* PROFILE */}
              <PrivateRoute path="/user" component={Profile} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              {/* AUTH */}
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </Layout>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
