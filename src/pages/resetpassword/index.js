
// import ResetPassword from "@/apppages/ExtraPages/ResetPassword";


// export default function ResetPasswordPage() {
//   return <ResetPassword/>;
// }
// E:\nex\nexgen\src\pages\resetpassword\index.js
import dynamic from 'next/dynamic';

const ResetPasswordPage = dynamic(() => import('@/apppages/ExtraPages/ResetPassword'), {
  ssr: false, // Disable SSR
});

export default ResetPasswordPage;