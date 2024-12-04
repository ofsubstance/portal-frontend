import { CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import useAuthAction from "@/hooks/useAuthAction";
import { useIsMutating } from "@tanstack/react-query";

const VerifyEmailPage = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const isMutating = useIsMutating();

  const [verified, setVerified] = useState(false);

  const { verifyEmail } = useAuthAction();

  useEffect(() => {
    if (token) {
      verifyEmail.mutate(token, {
        onSuccess: () => {
          setVerified(true);
        },
        onError: () => {
          setVerified(false);
        },
      });
    }
  }, [token]);

  useEffect(() => {
    if (verified)
      setTimeout(() => {
        navigate("/signin", { replace: true });
      }, 3000);
  }, [verified]);

  if (!token)
    return (
      <div className="p-5 h-screen flex flex-col gap-4 items-center justify-center">
        <Typography variant="h5" color="textPrimary">
          Invalid verification link.
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Please check the link and try again.
        </Typography>
      </div>
    );

  return (
    <div className="p-5 h-screen flex flex-col gap-4 items-center justify-center">
      {isMutating ? (
        <CircularProgress size={100} />
      ) : (
        <>
          <Typography variant="h5" color="textPrimary">
            {verified
              ? "Email successfully verified! You can now log in."
              : "Verification failed. Please try again or request a new link."}
          </Typography>

          <Typography variant="body1" color="textSecondary">
            {verified
              ? "You will be redirected to the login page in a few seconds."
              : "Please contact support for further assistance."}
          </Typography>
        </>
      )}
    </div>
  );
};

export default VerifyEmailPage;
