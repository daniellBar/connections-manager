import { Dialog, DialogContent, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ConnectionForm } from "../ConnectionForm/ConnectionForm";

export interface ConnectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateConnectionSuccess: () => void;
}

export const ConnectionDialog = ({
  isOpen,
  onClose,
  onCreateConnectionSuccess,
}: ConnectionDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      sx={{ "&.MuiDialog-root": { zIndex: 1000 } }}
      PaperProps={{
        sx: { minWidth: "600px" },
      }}
      onClose={onClose}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="my-4 ml-12 mr-6 flex justify-between">
        <div className="font-bold text-xl">Create a connection</div>
        <CloseIcon className="cursor-pointer" onClick={onClose} />
      </div>

      <div className="mx-12">
        <Divider />
      </div>

      <DialogContent
        className="mx-12"
        sx={{ "&.MuiDialogContent-root": { padding: "24px 0px" } }}
      >
        <ConnectionForm onCreateConnectionSuccess={onCreateConnectionSuccess} />
      </DialogContent>
    </Dialog>
  );
};
