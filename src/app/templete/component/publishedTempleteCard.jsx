import React, { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { removeTemplateData, getTemplateData } from "@/redux/templateSlice";
import { Eye, Edit, Trash2 } from "lucide-react"; // Import Lucide icons
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"; // Import shadcn/ui Dialog components
import { Button } from "@/components/ui/button"; // Import shadcn/ui Button component

const PublishedTemplateCard = ({ data }) => {
  const template = data?.details?.home;
  const templateId = data?._id;
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    dispatch(removeTemplateData(templateId)).then(() => {
      dispatch(getTemplateData());
      setIsDeleteModalOpen(false); // Close the modal after deletion
    });
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 rounded-xl ring-2 ring-[#1B94A6] shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="relative w-64 h-80 overflow-hidden rounded-lg shadow-lg group">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-center transition-opacity duration-300 group-hover:opacity-60 bg-contain bg-no-repeat"
          style={{ backgroundImage: `url(${template?.logoImage})` }}
        />

        {/* Overlay with buttons */}
        <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
          <h2 className="text-white font-bold text-lg mb-2">
            {template?.name || "No Name"}
          </h2>
          <p className="text-white text-sm mb-4 text-center">
            {template?.tagLine || "No Description"}
          </p>
          <div className="flex gap-4">
            <Link
              href={`/templete/${data?._id}`}
              className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors duration-300"
              title="View"
            >
              <Eye className="w-5 h-5" />
            </Link>
            <Link
              href={`/templete/editor/?templateId=${templateId}`}
              className="p-3 bg-green-600 text-white rounded-full hover:bg-green-500 transition-colors duration-300"
              title="Update"
            >
              <Edit className="w-5 h-5" />
            </Link>

            {/* Delete Button with Modal */}
            <Dialog
              open={isDeleteModalOpen}
              onOpenChange={setIsDeleteModalOpen}
            >
              <DialogTrigger asChild>
                <button
                  className="p-3 bg-red-600 text-white rounded-full hover:bg-red-500 transition-colors duration-300"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Template</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this template? This action
                    cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button variant="destructive" onClick={handleDelete}>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishedTemplateCard;
