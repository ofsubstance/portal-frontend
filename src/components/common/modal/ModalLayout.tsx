import {
  Breakpoint,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";

interface ModalLayoutProps {
  title: React.ReactNode;
  maxWidth?: false | Breakpoint;
  children: React.ReactNode;
  dialogActions?: {
    confirmButtonProps?: {
      text: string;
      error?: boolean;
      onClick: () => any;
    };
    cancelButtonProps?: {
      text: string;
      onClick?: () => any;
    };
  };
  externalControl?: { open: boolean; onClose: () => any };
  targetComponent?: React.ReactElement<React.HTMLAttributes<HTMLElement>, any>;
}

export default function ModalLayout({
  title,
  maxWidth,
  externalControl,
  children,
  dialogActions,
  targetComponent: TargetComponent,
}: ModalLayoutProps) {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (externalControl) {
      setOpenModal(externalControl.open);
    }
  }, [externalControl]);

  const handleClose = () => {
    if (externalControl) {
      externalControl.onClose();
    } else {
      setOpenModal(false);
    }
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleCancelButtonClick = () => {
    dialogActions?.cancelButtonProps?.onClick?.();
    handleClose();
  };

  const handleConfirmButtonClick = () => {
    dialogActions?.confirmButtonProps?.onClick?.();

    if (dialogActions?.confirmButtonProps?.error) return;

    handleClose();
  };

  const renderOpenModalComponent = () => {
    if (!TargetComponent) return null;
    return (
      <TargetComponent.type
        {...TargetComponent.props}
        onClick={TargetComponent.props.onClick || handleOpen}
      />
    );
  };

  return (
    <>
      {renderOpenModalComponent()}
      <Dialog
        maxWidth={maxWidth}
        scroll="paper"
        open={openModal}
        onClose={handleClose}
      >
        <DialogTitle>
          <div className="flex w-full items-center justify-between">
            <Typography variant="h6">{title}</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
        {dialogActions && (
          <DialogActions>
            {dialogActions.cancelButtonProps && (
              <Button
                fullWidth
                variant="outlined"
                onClick={handleCancelButtonClick}
              >
                {dialogActions.cancelButtonProps.text}
              </Button>
            )}

            {dialogActions.confirmButtonProps && (
              <Button
                fullWidth
                variant="contained"
                autoFocus
                onClick={handleConfirmButtonClick}
              >
                {dialogActions.confirmButtonProps.text}
              </Button>
            )}
          </DialogActions>
        )}
      </Dialog>
    </>
  );
}
