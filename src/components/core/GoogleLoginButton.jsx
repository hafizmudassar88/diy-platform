import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axiosInstance from "@/lib/axios"; // Adjust this path if necessary
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import toast from "react-hot-toast";

function GoogleLoginButton() {
  const { saveUserData } = useUser(); // Destructure saveUserData from the context
  const router = useRouter();

  const handleLoginSuccess = async (response) => {
    const idToken = response.credential; // Get the ID token from the response

    try {
      // Send the token to the backend for verification
      const res = await axiosInstance.post("/auth/google-login", {
        token: idToken,
      });

      if (res.status === 200) {
        console.log("Login/Signup successful:", res.data);

        // Assuming the response contains user data and token
        const { user, token } = res.data; // Adjust this line based on your backend response structure

        // Save user data and token in the context
        saveUserData(user, token);

        router.push("/");

        toast.success("Login successful!");
      } else {
        console.error("Error:", res.data.message);

        toast({
          title: "Error",
          description:
            res.data.message ||
            "An error occurred during login. Please try again.",
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);

      toast.error("An error occurred during login. Please try again.");
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Login failed:", error);

    toast.error("An error occurred during login. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleLoginButton;
