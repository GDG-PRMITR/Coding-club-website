"use client";

import React, { useState , useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
} from "./ui/dialog";

function PopupAlert({ url }) {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasShown = localStorage.getItem("popupShown");
      if (!hasShown) {
        setIsOpen(true);
        localStorage.setItem("popupShown", "true");
      }
    }
  }, []);
  
  return (
    <Dialog className="overflow-hidden" onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className="w-80">
        <div className="flex justify-center text-center max-w-lg">
          <Image src={url} alt="Notice Image" width={400} height={300} className="w-80"/> 
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PopupAlert;
