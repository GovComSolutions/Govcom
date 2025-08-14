import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from 'react';
import PageHeader from "@/components/PageHeader";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string;
}

export default function Careers() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('jobs');
    if (stored) setJobs(JSON.parse(stored));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <PageHeader
        title="Careers at GovCom Solutions"
        subtitle="Join our team and help shape the future of government technology"
        description="Explore opportunities to make an impact in government consulting and technology innovation."
        videoSrc="/946146-hd_1920_1080_30fps.mp4"
      />
      <main className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-6xl px-4 py-8">
          <h2 className="text-2xl font-semibold mb-6">Open Positions</h2>
          {jobs.length === 0 ? (
            <div className="text-muted-foreground">We are not hiring at the moment. Please check back later!</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobs.map(job => (
                <div key={job.id} className="bg-card border border-border rounded-xl shadow p-6 flex flex-col h-full text-foreground">
                  <div className="font-bold text-lg mb-1">{job.title}</div>
                  <div className="text-sm text-gray-600 mb-2">{job.department} | {job.location}</div>
                  {job.description && <div className="mb-2 text-sm">{job.description}</div>}
                  {job.requirements && <div className="mb-2 text-xs text-gray-500">Requirements: {job.requirements}</div>}
                  <div className="mt-auto pt-2">
                    <a href="mailto:careers@govcomsolutions.com?subject=Application for "
                      className="inline-block w-full text-center bg-primary text-white rounded-lg px-4 py-2 font-semibold hover:bg-primary/80 transition text-sm">
                      Apply
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
} 