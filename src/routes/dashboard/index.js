import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <h1
      onClick={async () => {
        const { error } = await supabase.auth.signOut();
        console.log(error);
        navigate("/");
      }}
    >
      dashboard
    </h1>
  );
}
