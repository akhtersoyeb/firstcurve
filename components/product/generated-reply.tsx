import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { STATIC_GENERATED_REPLY } from "@/lib/statics";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface GeneratedReplyProps {
  reply: string | null;
  containerClassName?: string;
  showGeneratedReply?: boolean;
  isLoading?: boolean;
}

function GeneratedReply({
  reply,
  containerClassName = "",
  showGeneratedReply = false,
  isLoading = false,
}: GeneratedReplyProps) {
  if (isLoading) {
    return (
      <div className={cn(containerClassName)}>
        <Separator className="my-4" />

        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-[#171717] dark:text-white">
            Generating Reply...
          </h4>

          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700 hidden"
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 flex-2/3" />
            <Skeleton className="h-6 w-1/3" />
          </div>
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      </div>
    );
  }

  if (reply) {
    return (
      <div className={cn(containerClassName)}>
        <Separator className="my-4" />

        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-[#171717] dark:text-white">
            Generated Reply
          </h4>

          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </Button>
        </div>

        <p className="text-gray-600 text-sm bg-gray-50 p-4 rounded-md">
          {reply}
        </p>
      </div>
    );
  }

  return <></>;
}

export default GeneratedReply;
