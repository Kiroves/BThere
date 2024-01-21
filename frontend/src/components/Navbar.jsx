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

export default function Navbar({ setToken, setUser }) {
  const handleGoogle = async (e) => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      window.localStorage.setItem("token", token);
      setToken(token);
      setUser(result.user);
    } catch (error) {
      console.log(error.code, error.message);
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
            <Button onClick={handleGoogle} variant="ghost" className="">
              Sign in with Google
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Separator className="bg-primary" />
    </>
  );
}
