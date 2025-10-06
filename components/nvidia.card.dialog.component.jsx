import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NvidiaCardDialogComponent() {
  const instructors = [
    {
      name: "Dr. R.R. Karwa",
      role: "NVIDIA Instructor & Ambassador",
      image: "https://mitra.ac.in/MitraFaculty/public/upload/roshan.jpg",
      span: "col-span-2",
    },
    {
      name: "Tejas Nikose",
      role: "NVIDIA Teaching Assistant",
      image: "/nvidia/TA/tejas-nikose.jpg",
      span: "",
    },
    {
      name: "Prathmesh Yende",
      role: "NVIDIA Teaching Assistant",
      image: "/nvidia/TA/prathamesh-yende.jpg",
      span: "",
    },
  ];

return (
    <div>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="bg-nvidia-green rounded hover:bg-nvidia-green/80 cursor-pointer">View Details</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <Image
                            src="/logo/logo-nvidia.jpg"
                            height={45}
                            width={45}
                            alt="Nvidia"
                        />
                    </DialogTitle>
                </DialogHeader>
                <main className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-y-12">
                        {instructors.map((instructor) => (
                            <div
                                key={instructor.name}
                                className={cn(
                                    instructor.span,
                                    "flex flex-col justify-center items-center"
                                )}
                            >
                                <div className="size-28 overflow-hidden rounded-xl mb-2 ">
                                    <Image
                                    src={instructor.image || "/placeholder.jpg"}
                                    height={130}
                                    width={130}
                                    alt={instructor.name}
                                    className="object-cover w-full"
                                />
                                </div>
                                <h2 className="text-md text-nvidia-green font-bold">
                                    {instructor.name}
                                </h2>
                                <h6 className="text-sm text-black/60">{instructor.role}</h6>
                            </div>
                        ))}
                    </div>
                   
                </main>
            </DialogContent>
        </Dialog>
    </div>
);
}


