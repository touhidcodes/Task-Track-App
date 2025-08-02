import { Suspense } from "react";
import AuthPageContent from "./AuthPageContent";
import AuthPageSkeleton from "@/components/custom/Skeleton/AuthPageSkeleton";

export default function PropertiesPage() {
  return (
    <Suspense fallback={<AuthPageSkeleton />}>
      <AuthPageContent />
    </Suspense>
  );
}
