import { FC, ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

interface GoogleSignInButtonProps {
  children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const [Loading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    try {
      await signIn("google", {
        callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/admin`,
        redirect: true,

      });
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={loginWithGoogle} className="w-full">
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
