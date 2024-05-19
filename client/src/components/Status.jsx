import { useContext } from 'react';

import { StatusContext } from '../context/status.context';

export default function Status() {
  const context = useContext(StatusContext);

  if (context === undefined) throw new Error('useStatus must be used within a StatusProvider');

  const { loading, isConnected } = context;

  return (
    <>
      {!isConnected && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4 rounded-md bg-[#f0f0f0] shadow-lg p-10">
            {loading && (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 8a8 8 0 018-8h8c0 6.627-5.373 12-12 12V20z"
                  ></path>
                </svg>
                <span className="text-xl">Waiting for server response...</span>
              </>
            )}

            {!loading && (
              <>
                <svg
                  className="h-12 w-12 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 14c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zM12 2C6.486 2 2 6.486 2 12c0 3.309 1.29 6.369 3.414 8.636l1.293-1.293C5.978 16.332 5 14.246 5 12c0-4.418 3.582-8 8-8s8 3.582 8 8c0 2.246-.978 4.332-2.707 5.343l1.293 1.293C20.71 18.369 22 15.309 22 12c0-5.514-4.486-10-10-10z"
                  ></path>
                </svg>
                <span className="text-xl">Server is not reachable</span>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
