import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ff-black text-ff-white flex flex-col items-center justify-center px-4 text-center">
      <span className="font-display font-black text-8xl md:text-9xl text-ff-red mb-2">
        404
      </span>
      <h1 className="font-display text-3xl md:text-5xl font-bold mb-4 text-ff-white">
        Page Not Found
      </h1>
      <p className="font-body text-ff-grey-on-black max-w-md text-base leading-relaxed mb-8">
        The table you requested does not exist or has been relocated.
      </p>
      <Link 
        href="/" 
        className="bg-ff-red hover:bg-ff-red-deep text-ff-black hover:text-ff-white wordmark text-xs py-3.5 px-8 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
