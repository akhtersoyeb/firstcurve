import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { STATIC_GENERATED_REPLY } from "@/lib/statics";
import { cn } from "@/lib/utils";

interface GeneratedReplyProps {
  reply?: string;
  containerClassName?: string;
}

function GeneratedReply({
  reply,
  containerClassName = "",
}: GeneratedReplyProps) {
  if (!reply) {
    return null;
  }

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
        {STATIC_GENERATED_REPLY}
      </p>
    </div>
  );
}

export default GeneratedReply;
