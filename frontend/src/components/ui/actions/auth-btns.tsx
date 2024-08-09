// import { LogoutLink as KindeLogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
// import { forwardRef } from "react";

// // import { menv } from "@/lib/utils/menv";
// // import { Button, ButtonProps } from "./button";

// // export function SignInButton(props: ButtonProps) {
// //   return (
// //     <Button
// //       {...props}
// //       href={`api/auth/register?connection_id=${menv.NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE}`}
// //     />
// //   );
// // }

// export const LogoutLink = forwardRef<HTMLAnchorElement,
// React.AnchorHTMLAttributes<HTMLAnchorElement> & {
//   children: React.ReactNode;
//   postLogoutRedirectURL?: string;
// }
// >((props, ref) => (
//   <KindeLogoutLink itemRef={ref} {...props} />
// ))

// ({
//   children,
//   postLogoutRedirectURL,
//   ...props
// }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
//   children: React.ReactNode;
//   postLogoutRedirectURL?: string;
// }): React.JSX.Element {
//   return (
//     <KindeLogoutLink postLogoutRedirectURL={postLogoutRedirectURL}>
//       {children}
//     </KindeLogoutLink>
//   );
// }
