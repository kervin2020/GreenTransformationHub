import React from 'react';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <h1 className="text-8xl font-bold text-green-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <div className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-colors cursor-pointer">
          Return to Home
        </div>
      </Link>
    </div>
  );
}