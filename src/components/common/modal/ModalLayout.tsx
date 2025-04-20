import {
  Breakpoint,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import React, { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';

interface ModalLayoutProps {
  title: React.ReactNode;
  maxWidth?: false | Breakpoint;
  fullWidth?: boolean;
  children: React.ReactNode;
  dialogActions?: {
    confirmButtonProps?: {
      text: string;
      color?:
        | 'primary'
        | 'secondary'
        | 'inherit'
        | 'success'
        | 'error'
        | 'info'
        | 'warning';
      error?: boolean;
      onClick: () => any;
      disabled?: boolean;
    };
    cancelButtonProps?: {
      text: string;
      onClick?: () => any;
    };
  };
  externalControl?: { open: boolean; onClose: () => any };
  targetComponent?: React.ReactElement<React.HTMLAttributes<HTMLElement>, any>;
  darkMode?: boolean;
}

export default function ModalLayout({
  title,
  maxWidth,
  fullWidth = true,
  externalControl,
  children,
  dialogActions,
  targetComponent: TargetComponent,
  darkMode = false,
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
        fullWidth={fullWidth}
        scroll="paper"
        open={openModal}
        onClose={handleClose}
        PaperProps={{
          sx: darkMode
            ? {
                backgroundColor: '#121212',
                color: 'white',
              }
            : {},
        }}
      >
        <DialogTitle
          sx={darkMode ? { backgroundColor: '#1e1e1e', color: 'white' } : {}}
        >
          <div className="flex w-full items-center justify-between">
            <Typography variant="h6">{title}</Typography>
            <IconButton
              onClick={handleClose}
              sx={darkMode ? { color: 'white' } : {}}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent
          dividers
          sx={darkMode ? { backgroundColor: '#121212', color: 'white' } : {}}
        >
          {children}
        </DialogContent>
        {dialogActions && (
          <DialogActions sx={darkMode ? { backgroundColor: '#1e1e1e' } : {}}>
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
                color={dialogActions.confirmButtonProps.color}
                autoFocus
                onClick={handleConfirmButtonClick}
                disabled={dialogActions.confirmButtonProps.disabled}
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

export const ModalHookLayout = NiceModal.create((props: ModalLayoutProps) => {
  const modal = useModal();

  return (
    <ModalLayout
      {...props}
      externalControl={{
        open: modal.visible,
        onClose: modal.hide,
      }}
    >
      {props.children}
    </ModalLayout>
  );
});
