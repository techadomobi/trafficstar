import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Trackstart",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-amber-50 px-6 py-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-orange-200 bg-white/90 p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-orange-700">Terms of Service</h1>
        <p className="mt-4 text-slate-600">
          This merged Trackstart and Adomobi build is configured for dashboard access, campaign management, analytics, wallet, billing, and profile workflows after authentication.
        </p>
        <p className="mt-4 text-slate-600">
          Final legal copy still needs to be supplied by the project owner before production release.
        </p>
        <Link href="/signup" className="mt-6 inline-flex text-sm font-semibold text-orange-600 hover:text-orange-700">
          Back to sign up
        </Link>
      </div>
    </main>
  );
}
