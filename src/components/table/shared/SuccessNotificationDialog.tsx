// src/components/CvManagementTable/SuccessNotificationDialog.tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";

interface SuccessNotificationDialogProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export function SuccessNotificationDialog({
  isOpen,
  message,
  onClose,
}: SuccessNotificationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-greenText">
            <Check className="h-5 w-5" /> Thành công
          </DialogTitle>
          <DialogDescription className="text-textDark">
            {message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button
            variant="default"
            className="bg-main hover:bg-mainHover text-white"
            onClick={onClose}
          >
            Đồng ý
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
