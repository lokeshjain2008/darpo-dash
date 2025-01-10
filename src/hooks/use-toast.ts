import { useToast as useToastOriginal } from "@/components/ui/use-toast";

export function useToast() {
  const { toast } = useToastOriginal();

  return {
    toast,
    success: (message: string) => {
      toast({
        title: "Success",
        description: message,
      });
    },
    error: (message: string) => {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    },
  };
}