import { StatusType } from "@/lib/types";
import { toast } from "sonner";

export function useShowToast(
  status: StatusType = StatusType.DEFAULT,
  message: string,
) {
  const styleMap: Record<StatusType, React.CSSProperties> = {
    [StatusType.SUCCESS]: {
      background: "oklch(62.7% 0.194 149.214)",
      color: "white",
    },
    [StatusType.ERROR]: {
      background: "oklch(57.7% 0.245 27.325)",
      color: "white",
    },
    [StatusType.INFO]: {
      background: "oklch(58.8% 0.158 241.966)",
      color: "white",
    },
    [StatusType.WARNING]: {
      background: "oklch(66.6% 0.179 58.318)",
      color: "white",
    },
    [StatusType.DEFAULT]: {
      background: "oklch(44.6% 0.03 256.802)",
      color: "white",
    },
  };

  switch (status) {
    case StatusType.SUCCESS:
      toast.success(message, { style: styleMap[StatusType.SUCCESS] });
      break;
    case StatusType.INFO:
      toast.info(message, { style: styleMap[StatusType.INFO] });
      break;
    case StatusType.WARNING:
      toast.warning(message, { style: styleMap[StatusType.WARNING] });
      break;
    case StatusType.ERROR:
      toast.error(message, { style: styleMap[StatusType.ERROR] });
      break;
    default:
      toast(message);
      break;
  }
}
