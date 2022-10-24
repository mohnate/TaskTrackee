import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

import Spinner from "../components/PageLoader";

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
    <Spinner sz="full" />
  ) : (
    <Spinner sz="full" />
  );
}
