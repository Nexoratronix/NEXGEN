
// pages/privacyandpolicy/index.js
import dynamic from 'next/dynamic';

const JobList = dynamic(() => import('@/apppages/Home/JobList/jobList'), {
  ssr: false,
});

export default function JobListPage() {
  return <JobList />;
}