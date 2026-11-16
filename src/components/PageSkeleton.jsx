export default function PageSkeleton() {
  return (
    <div className="container-editorial pb-24 pt-32" role="status" aria-label="Loading page">
      <span className="sr-only">Loading page</span>
      <div className="skeleton h-3 w-24 rounded-full" />
      <div className="skeleton mt-6 h-16 w-2/3 max-w-2xl rounded-2xl sm:h-24" />
      <div className="skeleton mt-5 h-4 w-full max-w-xl rounded-full" />
      <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <div className="skeleton aspect-[4/5] w-full rounded-[1.5rem]" />
            <div className="skeleton h-3 w-1/3 rounded-full" />
            <div className="skeleton h-4 w-3/4 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
