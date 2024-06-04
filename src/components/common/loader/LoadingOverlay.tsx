import { useIsFetching, useIsMutating } from "@tanstack/react-query";

import { LinearProgress } from "@mui/material";
import { createPortal } from "react-dom";

function LoadingOverlay() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const skipLoading = useIsMutating({ mutationKey: ["skipLoading"] });

  if (skipLoading) return null;

  if (!isFetching && !isMutating) return null;

  return createPortal(
    <LinearProgress
      color="primary"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
      }}
    />,
    document.body
  );
}

export default LoadingOverlay;
