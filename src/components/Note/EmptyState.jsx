import { GoPlus } from 'react-icons/go'
import { HiOutlineDocumentPlus } from 'react-icons/hi2'

export default function EmptyState() {
  return (
    <div className="text-center flex flex-col items-center justify-center">
      <HiOutlineDocumentPlus size="48" />
      {/* <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="mx-auto size-12 text-gray-400"
      >
        <path
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg> */}
      <h3 className="mt-2 text-sm font-semibold text-gray-900">Empty Note</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by creating a new note.</p>
      <div className="mt-6">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-secondary bg-secondary px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-transparent hover:text-secondary transition-all duration-300 ease-linear focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          <GoPlus aria-hidden="true" className="-ml-0.5 mr-1.5 size-5" />
          New Note
        </button>
      </div>
    </div>
  )
}
