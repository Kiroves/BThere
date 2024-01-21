import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { useState } from "react";

export default function Navbar({ setToken, setUser, setEmail, isAuthenticated, onSignIn, onSignOut }) {
  const storedIdToken = localStorage.getItem('firebaseIdToken');
  const handleGoogle = async (e) => {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);

        // Call the provided callback from props
        onSignIn(result.user);

        console.log(result);
      } catch (error) {
        console.error("Google sign-in error:", error);
      }
    };

    const handleSignOut = async () => {
      try {
        await signOut(auth);

        // Call the provided callback from props
        onSignOut();
      } catch (error) {
        console.error("Sign out error:", error);
      }
    };
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList className="flex">
          <NavigationMenuItem>
            <Link href="/#home" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/#friends" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Friends
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <div className="flex-grow" />
          <NavigationMenuItem>
            {/* Conditionally render "Sign in with Google" or "Sign out" button */}
            {isAuthenticated ? (
              <Button onClick={handleSignOut} variant="ghost" className="">
                Sign Out
              </Button>
            ) : (
              <Button onClick={handleGoogle} variant="ghost" className="">
                Sign in with Google
              </Button>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Separator className="bg-primary" />
    </>
  );
}
