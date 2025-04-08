
import dynamic from 'next/dynamic';

const PrivacyAndPolicy = dynamic(() => import('@/apppages/Company/PrivacyAndPolicy/PrivacyAndPolicy'), {
  ssr: false,
});

export default function PrivacyPolicyPage() {
  return <PrivacyAndPolicy />;
}