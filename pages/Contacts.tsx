import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface GoogleContact {
  resourceName: string;
  names?: { displayName: string }[];
  emailAddresses?: { value: string }[];
}

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<GoogleContact[]>([]);
  const { data: session } = useSession();
  const { status } = useSession();
  useEffect(() => {
    try {
      const fetchContacts = async () => {
        if (status === 'authenticated') {
          const response = await fetch('/api/contacts');
          const res = await response.json();
          setContacts(res.data || []);
        }
      };

      fetchContacts();
    } catch (error) {
      console.log({ error });
    }
  }, [status]);

  return (
    <div>
      <ul className="text-lg text-center">
        {contacts.map((contact) => (
          <li key={contact.resourceName}>{contact.names?.[0].displayName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
