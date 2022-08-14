import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

import Spinner from "../components/PageLoader";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (!supabase.auth.session()) {
      setCurrentUser(false);
    } else {
      setCurrentUser(supabase.auth.user());
    }
  }, []);

  useEffect(() => {
    if (!supabase.auth.session()) {
      navigate("/");
    }
  }, [currentUser]);

  return currentUser != null && currentUser ? (
    children
  ) : currentUser != null ? (
    <Spinner sz="full" />
  ) : (
    <Spinner sz="full" />
  );
}
