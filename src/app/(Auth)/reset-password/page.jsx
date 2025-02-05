import ResetPasswordForm from "./_components/ResetPasswordForm";

export const metadata = {
  title: "Reset Password",
  description:
    "Just type in new password and confirm the password to reset your account password",
};

export default function ResetPassword() {
  return <ResetPasswordForm />;
}
