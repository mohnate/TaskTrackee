import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

import Spinner from "../components/PageLoader";

import PropTypes from "prop-types";

NoAuthenticateuser.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function NoAuthenticateuser({ children }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then((result) => {
      if (result.data.session) {
        setCurrentUser(false);
      } else {
        setCurrentUser(true);
      }
    });
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then((result) => {
      if (result.data.session) {
        navigate("/dashboard/alltask");
      }
    });
  }, [currentUser]);

  return currentUser ? children : <Spinner sz="full" pos="full" />;
}
