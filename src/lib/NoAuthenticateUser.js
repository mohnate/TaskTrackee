import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

import Spinner from "../components/PageLoader";

export default function NoAuthenticateuser({ children }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (supabase.auth.session()) {
      setCurrentUser(false);
    } else {
      setCurrentUser(true);
    }
  }, []);

  useEffect(() => {
    if (supabase.auth.session()) {
      navigate("/dashboard/alltask");
    }
  }, [currentUser]);

  return currentUser ? children : <Spinner sz="full" />;
}
