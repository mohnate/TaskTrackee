import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

import Spinner from "../components/PageLoader";

import PropTypes from "prop-types";

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then((result) => {
      if (!result.data.session) {
        setCurrentUser(false);
      } else {
        setCurrentUser(result.data.session.user);
      }
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
