import React, { useState } from 'react';
import type { Job, JobStatus } from './types';


const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState<JobStatus | "All">("All");
  const [sortBy, setSortBy] = useState<"date" | "company">("date");
  const [darkMode, setDarkMode] = useState(false);

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'Applied' as JobStatus,
    notes: ''
  });

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    document.documentElement.classList.toggle('dark');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: Job = {
      id: Date.now().toString(),
      company: formData.company,
      position: formData.position,
      status: formData.status,
      notes: formData.notes,
      dateApplied: new Date().toISOString()
    };
    setJobs(prev => [newJob, ...prev]);
    setFormData({ company: '', position: '', status: 'Applied', notes: '' });
  };

  const handleDelete = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const filteredJobs = (filter === "All"
    ? jobs
    : jobs.filter(job => job.status === filter)
  ).sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime();
    } else {
      return a.company.localeCompare(b.company);
    }
  });

  return (
    <main className="min-h-screen p-6 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold"> Job Tracker</h1>
        <button
          onClick={toggleDarkMode}
          className="text-sm bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      <form onSubmit={handleSubmit} className="grid gap-4 mb-6 grid-cols-1 md:grid-cols-2">
        <input
          type="text"
          placeholder="Company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Position"
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as JobStatus })}
          className="p-2 border rounded"
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          type="text"
          placeholder="Notes (optional)"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="p-2 border rounded"
        />
        <button type="submit" className="btn col-span-full bg-blue-600 text-white py-2 rounded">
          Add Job
        </button>
      </form>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as JobStatus | "All")}
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "date" | "company")}
          className="p-2 border rounded"
        >
          <option value="date">Sort by Date</option>
          <option value="company">Sort by Company</option>
        </select>
      </div>

      <section className="grid gap-4">
        {filteredJobs.length === 0 && (
          <p className="text-center text-gray-500">No applications yet.</p>
        )}
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow border border-gray-300 dark:border-gray-700"
          >
            <div className="flex justify-between">
              <h2 className="font-bold text-lg">{job.position}</h2>
              <span className="text-sm text-blue-500">{job.status}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Company: {job.company}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Applied on: {new Date(job.dateApplied).toLocaleDateString()}</p>
            {job.notes && <p className="italic mt-1 text-gray-600">{job.notes}</p>}
            <button
              onClick={() => handleDelete(job.id)}
              className="mt-3 text-red-500 text-sm hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </section>
    </main>
  );
};

export default App;
