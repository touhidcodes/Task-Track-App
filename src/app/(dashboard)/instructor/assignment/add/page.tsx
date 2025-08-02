"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
// import { useCreateAssignmentMutation } from "@/redux/api/assignmentsApi";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormContainer from "@/components/custom/Forms/FormContainer";
import FormInput from "@/components/custom/Forms/FormInput";
import FormTextarea from "@/components/custom/Forms/FormTextarea";
import FormDateTimePicker from "@/components/custom/Forms/FormDateTimePicker";
import {
  createAssignmentSchema,
  TCreateAssignmentInput,
} from "@/schema/assignmentSchema";

const CreateAssignmentPage = () => {
  const [loading, setLoading] = useState(false);
  //   const [createAssignment] = useCreateAssignmentMutation();
  const router = useRouter();

  const handleCreate = async (values: FieldValues) => {
    console.log(values);
    // try {
    //   setLoading(true);

    //   const payload = {
    //     ...values,
    //     deadline: new Date(values.deadline).toISOString(),
    //   };

    //   const res = await createAssignment(payload);

    //   if (res?.data?.id) {
    //     toast.success("Assignment created successfully!");
    //     router.push("/assignments");
    //   } else {
    //     toast.error("Failed to create assignment");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   toast.error("Something went wrong!");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-center py-10">
        <div className="container px-4">
          <FormContainer<TCreateAssignmentInput>
            onSubmit={handleCreate}
            resolver={zodResolver(createAssignmentSchema)}
            defaultValues={{
              title: "",
              description: "",
              deadline: new Date(),
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Assignment Title"
                name="title"
                placeholder="Enter assignment title"
                required
              />

              <FormDateTimePicker label="Deadline" name="deadline" required />
            </div>

            <div className="mt-6">
              <FormTextarea
                name="description"
                label="Description"
                placeholder="Enter assignment details..."
                required
              />
            </div>

            <div className="flex justify-center pt-6">
              <Button
                disabled={loading}
                type="submit"
                className="bg-[#1C2D37] hover:bg-slate-700 text-white px-6 py-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Create Assignment"
                )}
              </Button>
            </div>
          </FormContainer>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignmentPage;
