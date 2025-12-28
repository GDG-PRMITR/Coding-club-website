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
      <DialogContent>
        <div className="overflow-hidden rounded-lg">
          <Image 
            src={url} 
            alt="Notice Image" 
            width={500} 
            height={400} 
            className="w-full h-auto object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          /> 
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PopupAlert;
