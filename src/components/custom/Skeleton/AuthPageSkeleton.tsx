// AuthPageSkeleton.tsx
export default function AuthPageSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm space-y-5 animate-pulse">
        {/* Header Title Skeleton */}
        <div className="text-left space-y-3">
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>

        {/* Form Container Skeleton */}
        <div className="space-y-4">
          {/* Email/Username Input Skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-10 bg-gray-200 rounded-md"></div>
          </div>

          {/* Password Input Skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded-md"></div>
          </div>
        </div>

        {/* Remember Me & Forgot Password Skeleton */}
        <div className="flex items-center justify-between mt-3 mb-2">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>

        {/* Login Button Skeleton */}
        <div className="h-10 bg-gray-200 rounded-md"></div>

        {/* Test Login Buttons Skeleton */}
        <div className="flex justify-between space-x-3">
          <div className="h-10 bg-gray-200 rounded-full flex-1"></div>
          <div className="h-10 bg-gray-200 rounded-full flex-1"></div>
        </div>

        {/* Register Link Skeleton */}
        <div className="text-center space-y-1">
          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
