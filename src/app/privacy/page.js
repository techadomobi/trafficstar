import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Trackstart",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-amber-50 px-6 py-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-orange-200 bg-white/90 p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-orange-700">Privacy Policy</h1>
        <p className="mt-4 text-slate-600">
          Trackstart stores authentication and advertiser session data in the browser to power the merged Adomobi dashboard experience after login.
        </p>
        <p className="mt-4 text-slate-600">
          Final privacy disclosures and retention policy text still need to be added before deployment.
        </p>
        <Link href="/signup" className="mt-6 inline-flex text-sm font-semibold text-orange-600 hover:text-orange-700">
          Back to sign up
        </Link>
      </div>
    </main>
  );
}
