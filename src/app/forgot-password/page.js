import Link from "next/link";

export const metadata = {
  title: "Forgot Password | Trackstart",
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-amber-50 px-6 py-16">
      <div className="mx-auto max-w-xl rounded-3xl border border-orange-200 bg-white/90 p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-orange-700">Reset your password</h1>
        <p className="mt-4 text-slate-600">
          Password reset is not wired yet in this merged build. Use your administrator flow or contact support to reset access.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-orange-600 px-5 py-3 font-semibold text-white transition hover:bg-orange-700"
        >
          Back to sign in
        </Link>
      </div>
    </main>
  );
}
