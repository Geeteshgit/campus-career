import { redirect } from 'next/navigation';
import React from 'react'

const Homepage = (): React.JSX.Element => {
  const isLoggedIn: boolean = false;
  if(!isLoggedIn) redirect("/login");
  else redirect("/home");
}

export default Homepage