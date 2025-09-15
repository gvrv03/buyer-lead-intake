import { Loader2 } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="fixed  bg-white w-full h-full grid place-items-center left-0 top-0">
      <Loader2 className="animate-spin w-14  blue-500 h-14" />
    </div>
  );
};

export default loading;
