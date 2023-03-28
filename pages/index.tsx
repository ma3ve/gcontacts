import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Contacts from './Contacts';
export default function Home() {
  const { status } = useSession();
  return (
    <div className="flex justify-center mt-52 flex-col text-center">
      <div>
        <button
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded inline-flex items-center max-w-sm"
          onClick={() =>
            status === 'unauthenticated' ? signIn('google') : signOut()
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google logo"
            className="w-10 h-10 mr-2"
          />
          <span>
            {status === 'unauthenticated'
              ? 'Sign In with Google'
              : 'Sign Out of Google'}
          </span>
        </button>
      </div>
      <Contacts />
    </div>
  );
}
