import { redirect } from 'next/navigation';

export default function Page() {
  // Redirect users to the dashboard route
  redirect('/dashboard');

  return null; 
}
