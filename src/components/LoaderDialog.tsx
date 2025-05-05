import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { hideLoaderDialog } from "@/store/slices/loaderDialogSlice";
import { Loader2, XCircle } from "lucide-react";
import { Button } from "./ui/button";

export function LoaderDialog() {
  const dispatch = useAppDispatch();
  const { isError, isOpen, message } = useAppSelector(
    (state) => state.loaderDialog
  );

  return (
    <Dialog open={isOpen} onOpenChange={() => {}} modal={true}>
      <DialogContent className="sm:max-w-md flex flex-col items-center p-6 [&>button]:hidden">
        {isError ? (
          <div className="flex flex-col items-center gap-4 w-full">
            <XCircle className="h-12 w-12 text-destructive" />
            <h3 className="text-xl font-semibold">Đã xảy ra lỗi</h3>
            <p className="text-center text-muted-foreground">{message}</p>
            <Button
              variant="outline"
              className="text-white bg-main hover:bg-mainHover hover:text-white w-full cursor-pointer"
              onClick={() => dispatch(hideLoaderDialog())}
            >
              Đóng
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 text-main animate-spin" />
            <p className="text-center text-muted-foreground">{message}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default LoaderDialog;
