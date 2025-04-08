// pages/services.js
import dynamic from 'next/dynamic';

const Services = dynamic(() => import('@/apppages/Company/Services/Services'), { ssr: false });

export default Services;