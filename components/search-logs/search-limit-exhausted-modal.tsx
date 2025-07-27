import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import useSearchLogsStore from "@/stores/useSearchLogsStore";

export default function SearchLimitExhaustedModal() {
  const { resetTime, isLimitExhaustedModalOpen, setIsLimitExhaustedModalOpen } =
    useSearchLogsStore();

  return (
    <Dialog
      open={isLimitExhaustedModalOpen}
      onOpenChange={() => setIsLimitExhaustedModalOpen(false)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <DialogTitle className="text-xl font-semibold text-gray-900 text-center">
            Daily Search Limit Reached
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Limit Info */}
          <div className="text-center space-y-2">
            <p className="text-gray-600">
              You've used all{" "}
              <Badge variant="secondary" className="mx-1">
                10 searches
              </Badge>{" "}
              for today.
            </p>
            <p className="text-sm text-gray-500">
              Your searches will reset at:
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            {/* <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Time until reset
              </span>
            </div> */}
            <div className="text-2xl font-bold text-gray-900 font-mono">
              {resetTime?.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">Resets daily</p>
          </div>

          {/* Upgrade Option */}
          {/* <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Crown className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Need more searches?
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Upgrade to Pro for unlimited daily searches and advanced
                  features.
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Zap className="w-3 h-3" />
                  <span>Unlimited searches</span>
                  <span>•</span>
                  <span>Priority support</span>
                  <span>•</span>
                  <span>Advanced filters</span>
                </div>
                <Button
                  onClick={() => {}}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  size="sm"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </div>
            </div>
          </div> */}

          {/* Alternative Actions */}
          {/* <div className="space-y-3">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-3">
                Or try these alternatives:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="sm"
                className="text-xs bg-transparent"
                onClick={() => {
                  // Handle browse saved searches
                  console.log("Browse saved searches");
                }}
              >
                Browse Saved
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs bg-transparent"
                onClick={() => {
                  // Handle view search history
                  console.log("View search history");
                }}
              >
                Search History
              </Button>
            </div>
          </div> */}
        </div>

        {/* Footer */}
        <div className="flex justify-center pt-4 border-t">
          <Button
            variant="ghost"
            onClick={() => setIsLimitExhaustedModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            I'll wait for reset
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
