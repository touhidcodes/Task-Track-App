// app/(public)/auth/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Branding / Illustration */}
      <div className="hidden md:flex w-1/2 bg-primary text-white items-center justify-center p-10">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome Back!</h1>
          <p className="text-lg opacity-80">
            Manage assignments, track progress, and collaborate with ease.
          </p>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
