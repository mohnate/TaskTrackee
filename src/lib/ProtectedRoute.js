import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

import Spinner from "../components/PageLoader";

import PropTypes from "prop-types";

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
  forgetPass: PropTypes.bool,
};

export default function ProtectedRoute({ children, forgetPass }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then((result) => {
      // if user session is not found
      if (!result.data.session) {
        // navigate user to homepage for login and set user to false
        navigate("/");
        setCurrentUser(false);
        // else if this is forget-password route
      } else if (forgetPass) {
        // check if recovery mail is sent
        if (!result.data.session.user.recovery_sent_at) {
          // if not, navigate user back to previous page
          navigate(-1);
          // check if user has updated his password
        } else if (
          result.data.session.user.user_metadata.hasOwnProperty("passUpd")
        ) {
          const withinTime =
            new Date(result.data.session.user.recovery_sent_at) <
            new Date(result.data.session.user.user_metadata.passUpd);
          // if user has updated his password, access to forget-password route is denied
          // and is directed back to user's previous page
          if (withinTime) navigate(-1);
          // else allow user to access forget-password route
        } else setCurrentUser(result.data.session.user);
        // if this isn't forget-password route and user session is found,
        // allow user to access protected page
      } else setCurrentUser(result.data.session.user);
    });
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then((result) => {
      if (!result.data.session) {
        navigate("/");
      }
    });
  }, [currentUser]);

  return currentUser != null && currentUser ? (
    children
  ) : currentUser != null ? (
    <Spinner sz="full" pos="full" />
  ) : (
    <Spinner sz="full" pos="full" />
  );
}
