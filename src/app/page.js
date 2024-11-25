import { redirect } from 'next/navigation';

export default function Page() {
  // Redirect users to the dashboard route
  redirect('/login');

  return null; 
}
