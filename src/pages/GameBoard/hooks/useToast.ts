import { useRef } from "react";
import { Toast } from "primereact/toast";

type ToastSeverity =
  | "error"
  | "success"
  | "info"
  | "warn"
  | "secondary"
  | "contrast"
  | undefined;

export const useToast = () => {
  const toastRef = useRef<Toast>(null);

  const showToast = (
    severity: ToastSeverity,
    summary: string,
    detail: string,
    life: number = 6000
  ) => {
    if (toastRef.current) {
      toastRef.current.show({
        severity,
        summary,
        detail,
        life,
      });
    }
  };

  const showSuccess = (summary: string, detail: string) => {
    showToast("success", summary, detail);
  };

  const showError = (summary: string, detail: string) => {
    showToast("error", summary, detail);
  };

  return { toastRef, showSuccess, showError };
};
