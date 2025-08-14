import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string;
}

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  article: string;
  industry: string;
  challenge: string;
  technology: string;
}

interface Document {
  id: string;
  title: string;
  description: string;
  kpi: string;
  file: string; // base64 encoded file
  fileName: string;
  fileType: string;
}

interface UseCase {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  technology: string;
  impact: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'jobs' | 'caseStudies' | 'documents' | 'useCases'>('jobs');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  
  // Job form state
  const [jobForm, setJobForm] = useState<Omit<Job, 'id'>>({
    title: '',
    department: '',
    location: '',
    description: '',
    requirements: '',
  });
  const [jobEditId, setJobEditId] = useState<string | null>(null);

  // Case study form state
  const [caseStudyForm, setCaseStudyForm] = useState<Omit<CaseStudy, 'id'>>({
    title: '',
    subtitle: '',
    image: '',
    description: '',
    article: '',
    industry: '',
    challenge: '',
    technology: '',
  });
  const [caseStudyEditId, setCaseStudyEditId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  // Document form state
  const [documentForm, setDocumentForm] = useState<Omit<Document, 'id'>>({
    title: '',
    description: '',
    kpi: '',
    file: '',
    fileName: '',
    fileType: '',
  });
  const [documentEditId, setDocumentEditId] = useState<string | null>(null);
  const [documentPreview, setDocumentPreview] = useState<string>('');
  const [isDocumentUploading, setIsDocumentUploading] = useState(false);

  // Use case form state
  const [useCaseForm, setUseCaseForm] = useState<Omit<UseCase, 'id'>>({
    title: '',
    image: '',
    description: '',
    category: '',
    technology: '',
    impact: '',
  });
  const [useCaseEditId, setUseCaseEditId] = useState<string | null>(null);
  const [useCaseImagePreview, setUseCaseImagePreview] = useState<string>('');
  const [isUseCaseUploading, setIsUseCaseUploading] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin-login');
    }
    const storedJobs = localStorage.getItem('jobs');
    const storedCaseStudies = localStorage.getItem('caseStudies');
    const storedDocuments = localStorage.getItem('documents');
    const storedUseCases = localStorage.getItem('useCases');
    if (storedJobs) setJobs(JSON.parse(storedJobs));
    if (storedCaseStudies) setCaseStudies(JSON.parse(storedCaseStudies));
    if (storedDocuments) setDocuments(JSON.parse(storedDocuments));
    if (storedUseCases) setUseCases(JSON.parse(storedUseCases));
  }, [navigate]);

  // Save jobs to localStorage
  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  // Save case studies to localStorage
  useEffect(() => {
    localStorage.setItem('caseStudies', JSON.stringify(caseStudies));
  }, [caseStudies]);

  // Save documents to localStorage
  useEffect(() => {
    localStorage.setItem('documents', JSON.stringify(documents));
  }, [documents]);

  // Save use cases to localStorage
  useEffect(() => {
    localStorage.setItem('useCases', JSON.stringify(useCases));
  }, [useCases]);

  // Image upload handler
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, GIF, etc.)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image file size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setCaseStudyForm(prev => ({ ...prev, image: result }));
      setImagePreview(result);
      setIsUploading(false);
    };

    reader.onerror = () => {
      alert('Error reading file. Please try again.');
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  // Use case image upload handler
  const handleUseCaseImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, GIF, etc.)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image file size must be less than 5MB');
      return;
    }

    setIsUseCaseUploading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUseCaseForm(prev => ({ ...prev, image: result }));
      setUseCaseImagePreview(result);
      setIsUseCaseUploading(false);
    };

    reader.onerror = () => {
      alert('Error reading file. Please try again.');
      setIsUseCaseUploading(false);
    };

    reader.readAsDataURL(file);
  };

  // Document upload handler
  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type (PDF, DOC, DOCX, etc.)
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a document file (PDF, DOC, DOCX, TXT, XLS, XLSX)');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Document file size must be less than 10MB');
      return;
    }

    setIsDocumentUploading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setDocumentForm(prev => ({ 
        ...prev, 
        file: result,
        fileName: file.name,
        fileType: file.type
      }));
      setDocumentPreview(file.name);
      setIsDocumentUploading(false);
    };

    reader.onerror = () => {
      alert('Error reading file. Please try again.');
      setIsDocumentUploading(false);
    };

    reader.readAsDataURL(file);
  };

  // Remove uploaded image
  const handleRemoveImage = () => {
    setCaseStudyForm(prev => ({ ...prev, image: '' }));
    setImagePreview('');
  };

  // Remove uploaded use case image
  const handleRemoveUseCaseImage = () => {
    setUseCaseForm(prev => ({ ...prev, image: '' }));
    setUseCaseImagePreview('');
  };

  // Remove uploaded document
  const handleRemoveDocument = () => {
    setDocumentForm(prev => ({ 
      ...prev, 
      file: '',
      fileName: '',
      fileType: ''
    }));
    setDocumentPreview('');
  };

  // Job handlers
  const handleJobChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setJobForm({ ...jobForm, [e.target.name]: e.target.value });
  };

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobForm.title || !jobForm.department || !jobForm.location) return;
    if (jobEditId) {
      setJobs(jobs.map(j => j.id === jobEditId ? { ...j, ...jobForm } : j));
      setJobEditId(null);
    } else {
      setJobs([...jobs, { ...jobForm, id: Date.now().toString() }]);
    }
    setJobForm({ title: '', department: '', location: '', description: '', requirements: '' });
  };

  const handleJobEdit = (id: string) => {
    const job = jobs.find(j => j.id === id);
    if (job) {
      setJobForm({
        title: job.title,
        department: job.department,
        location: job.location,
        description: job.description,
        requirements: job.requirements,
      });
      setJobEditId(id);
    }
  };

  const handleJobDelete = (id: string) => {
    setJobs(jobs.filter(j => j.id !== id));
    if (jobEditId === id) setJobEditId(null);
  };

  // Case study handlers
  const handleCaseStudyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCaseStudyForm({ ...caseStudyForm, [e.target.name]: e.target.value });
  };

  const handleCaseStudySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseStudyForm.title || !caseStudyForm.subtitle || !caseStudyForm.description) return;
    if (caseStudyEditId) {
      setCaseStudies(caseStudies.map(cs => cs.id === caseStudyEditId ? { ...cs, ...caseStudyForm } : cs));
      setCaseStudyEditId(null);
    } else {
      setCaseStudies([...caseStudies, { ...caseStudyForm, id: Date.now().toString() }]);
    }
    setCaseStudyForm({
      title: '',
      subtitle: '',
      image: '',
      description: '',
      article: '',
      industry: '',
      challenge: '',
      technology: '',
    });
    setImagePreview('');
  };

  const handleCaseStudyEdit = (id: string) => {
    const caseStudy = caseStudies.find(cs => cs.id === id);
    if (caseStudy) {
      setCaseStudyForm({
        title: caseStudy.title,
        subtitle: caseStudy.subtitle,
        image: caseStudy.image,
        description: caseStudy.description,
        article: caseStudy.article,
        industry: caseStudy.industry,
        challenge: caseStudy.challenge,
        technology: caseStudy.technology,
      });
      setImagePreview(caseStudy.image);
      setCaseStudyEditId(id);
    }
  };

  const handleCaseStudyDelete = (id: string) => {
    setCaseStudies(caseStudies.filter(cs => cs.id !== id));
    if (caseStudyEditId === id) setCaseStudyEditId(null);
  };

  // Document handlers
  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDocumentForm({ ...documentForm, [e.target.name]: e.target.value });
  };

  const handleDocumentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentForm.title || !documentForm.file) return;
    if (documentEditId) {
      setDocuments(documents.map(d => d.id === documentEditId ? { ...d, ...documentForm } : d));
      setDocumentEditId(null);
    } else {
      setDocuments([...documents, { ...documentForm, id: Date.now().toString() }]);
    }
    setDocumentForm({
      title: '',
      description: '',
      kpi: '',
      file: '',
      fileName: '',
      fileType: '',
    });
    setDocumentPreview('');
  };

  const handleDocumentEdit = (id: string) => {
    const document = documents.find(d => d.id === id);
    if (document) {
      setDocumentForm({
        title: document.title,
        description: document.description,
        kpi: document.kpi,
        file: document.file,
        fileName: document.fileName,
        fileType: document.fileType,
      });
      setDocumentPreview(document.fileName);
      setDocumentEditId(id);
    }
  };

  const handleDocumentDelete = (id: string) => {
    setDocuments(documents.filter(d => d.id !== id));
    if (documentEditId === id) setDocumentEditId(null);
  };

  // Use case handlers
  const handleUseCaseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUseCaseForm({ ...useCaseForm, [e.target.name]: e.target.value });
  };

  const handleUseCaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!useCaseForm.title || !useCaseForm.description) return;
    if (useCaseEditId) {
      setUseCases(useCases.map(uc => uc.id === useCaseEditId ? { ...uc, ...useCaseForm } : uc));
      setUseCaseEditId(null);
    } else {
      setUseCases([...useCases, { ...useCaseForm, id: Date.now().toString() }]);
    }
    setUseCaseForm({
      title: '',
      image: '',
      description: '',
      category: '',
      technology: '',
      impact: '',
    });
    setUseCaseImagePreview('');
  };

  const handleUseCaseEdit = (id: string) => {
    const useCase = useCases.find(uc => uc.id === id);
    if (useCase) {
      setUseCaseForm({
        title: useCase.title,
        image: useCase.image,
        description: useCase.description,
        category: useCase.category,
        technology: useCase.technology,
        impact: useCase.impact,
      });
      setUseCaseImagePreview(useCase.image);
      setUseCaseEditId(id);
    }
  };

  const handleUseCaseDelete = (id: string) => {
    setUseCases(useCases.filter(uc => uc.id !== id));
    if (useCaseEditId === id) setUseCaseEditId(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="flex items-center justify-between w-full max-w-6xl mb-6">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300">Admin Dashboard</h1>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          Back to Website
        </button>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex mb-8 bg-white rounded-lg shadow-md">
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-3 rounded-l-lg font-semibold transition-colors ${
            activeTab === 'jobs' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Jobs
        </button>
        <button
          onClick={() => setActiveTab('caseStudies')}
          className={`px-4 py-3 font-semibold transition-colors ${
            activeTab === 'caseStudies' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Case Studies
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`px-4 py-3 font-semibold transition-colors ${
            activeTab === 'documents' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Documents
        </button>
        <button
          onClick={() => setActiveTab('useCases')}
          className={`px-4 py-3 rounded-r-lg font-semibold transition-colors ${
            activeTab === 'useCases' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Use Cases
        </button>
      </div>

      {activeTab === 'jobs' && (
        <>
          {/* Job Form */}
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg mb-8">
            <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">
              {jobEditId ? 'Edit Position' : 'Add New Position'}
            </h2>
            <form onSubmit={handleJobSubmit} className="space-y-4">
              <input 
                className="w-full border rounded p-2 text-blue-700 dark:text-blue-300" 
                name="title" 
                placeholder="Title" 
                value={jobForm.title} 
                onChange={handleJobChange} 
                required 
              />
              <input 
                className="w-full border rounded p-2 text-blue-700 dark:text-blue-300" 
                name="department" 
                placeholder="Department" 
                value={jobForm.department} 
                onChange={handleJobChange} 
                required 
              />
              <input 
                className="w-full border rounded p-2 text-blue-700 dark:text-blue-300" 
                name="location" 
                placeholder="Location" 
                value={jobForm.location} 
                onChange={handleJobChange} 
                required 
              />
              <textarea 
                className="w-full border rounded p-2 text-blue-700 dark:text-blue-300" 
                name="description" 
                placeholder="Description" 
                value={jobForm.description} 
                onChange={handleJobChange} 
              />
              <textarea 
                className="w-full border rounded p-2 text-blue-700 dark:text-blue-300" 
                name="requirements" 
                placeholder="Requirements" 
                value={jobForm.requirements} 
                onChange={handleJobChange} 
              />
              <button className="bg-primary text-white px-4 py-2 rounded" type="submit">
                {jobEditId ? 'Update' : 'Add'} Position
              </button>
              {jobEditId && (
                <button 
                  type="button" 
                  className="ml-2 text-gray-500 underline" 
                  onClick={() => { 
                    setJobEditId(null); 
                    setJobForm({ title: '', department: '', location: '', description: '', requirements: '' }); 
                  }}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>

          {/* Job List */}
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Open Positions</h2>
            {jobs.length === 0 ? (
              <div className="text-muted-foreground">No open positions.</div>
            ) : (
              <ul className="space-y-4">
                {jobs.map(job => (
                  <li key={job.id} className="border rounded p-4 flex flex-col">
                    <div className="font-bold text-lg text-blue-700 dark:text-blue-300">{job.title}</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">{job.department} | {job.location}</div>
                    {job.description && <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">{job.description}</div>}
                    {job.requirements && <div className="mt-1 text-xs text-blue-700 dark:text-blue-300">Requirements: {job.requirements}</div>}
                    <div className="mt-2 flex gap-2">
                      <button className="text-blue-600 underline" onClick={() => handleJobEdit(job.id)}>Edit</button>
                      <button className="text-red-600 underline" onClick={() => handleJobDelete(job.id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}

      {activeTab === 'caseStudies' && (
        <>
          {/* Case Study Form */}
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg mb-8">
            <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">
              {caseStudyEditId ? 'Edit Case Study' : 'Add New Case Study'}
            </h2>
            <form onSubmit={handleCaseStudySubmit} className="space-y-4">
              <input 
                className="w-full border rounded p-2 text-blue-700 dark:text-blue-300" 
                name="title" 
                placeholder="Title (e.g., RPA Transformation in Financial Services)" 
                value={caseStudyForm.title} 
                onChange={handleCaseStudyChange} 
                required 
              />
              <input 
                className="w-full border rounded p-2 text-blue-700 dark:text-blue-300" 
                name="subtitle" 
                placeholder="Subtitle (e.g., Financial Services Efficiency)" 
                value={caseStudyForm.subtitle} 
                onChange={handleCaseStudyChange} 
                required 
              />
              
              {/* Image Upload Section */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-300">
                  Case Study Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {imagePreview ? (
                    <div className="space-y-2">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-w-full h-32 object-cover mx-auto rounded"
                      />
                      <div className="flex gap-2 justify-center">
                        <button
                          type="button"
                          onClick={() => document.getElementById('image-upload')?.click()}
                          className="text-blue-600 underline text-sm"
                        >
                          Change Image
                        </button>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="text-red-600 underline text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-gray-500">
                        {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                      </div>
                      <div className="text-xs text-gray-400">
                        PNG, JPG, GIF up to 5MB
                      </div>
                      <button
                        type="button"
                        onClick={() => document.getElementById('image-upload')?.click()}
                        className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                        disabled={isUploading}
                      >
                        {isUploading ? 'Uploading...' : 'Choose Image'}
                      </button>
                    </div>
                  )}
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </div>
              </div>

              <textarea 
                className="w-full border rounded p-2 text-blue-700 dark:text-blue-300" 
                name="description" 
                placeholder="Short description for the card" 
                value={caseStudyForm.description} 
                onChange={handleCaseStudyChange} 
                required 
              />
              <textarea 
                className="w-full border rounded p-2 text-blue-700 dark:text-blue-300 h-32" 
                name="article" 
                placeholder="Full article content (will appear in popup)" 
                value={caseStudyForm.article} 
                onChange={handleCaseStudyChange} 
                required 
              />
              <div className="grid grid-cols-3 gap-2">
                <input 
                  className="border rounded p-2 text-blue-700 dark:text-blue-300" 
                  name="industry" 
                  placeholder="Industry" 
                  value={caseStudyForm.industry} 
                  onChange={handleCaseStudyChange} 
                />
                <input 
                  className="border rounded p-2 text-blue-700 dark:text-blue-300" 
                  name="challenge" 
                  placeholder="Challenge" 
                  value={caseStudyForm.challenge} 
                  onChange={handleCaseStudyChange} 
                />
                <input 
                  className="border rounded p-2 text-blue-700 dark:text-blue-300" 
                  name="technology" 
                  placeholder="Technology" 
                  value={caseStudyForm.technology} 
                  onChange={handleCaseStudyChange} 
                />
              </div>
              <button className="bg-primary text-white px-4 py-2 rounded" type="submit">
                {caseStudyEditId ? 'Update' : 'Add'} Case Study
              </button>
              {caseStudyEditId && (
                <button 
                  type="button" 
                  className="ml-2 text-gray-500 underline" 
                  onClick={() => { 
                    setCaseStudyEditId(null); 
                    setCaseStudyForm({
                      title: '',
                      subtitle: '',
                      image: '',
                      description: '',
                      article: '',
                      industry: '',
                      challenge: '',
                      technology: '',
                    }); 
                    setImagePreview('');
                  }}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>

          {/* Case Study List */}
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Case Studies</h2>
            {caseStudies.length === 0 ? (
              <div className="text-muted-foreground">No case studies.</div>
            ) : (
              <ul className="space-y-4">
                {caseStudies.map(caseStudy => (
                  <li key={caseStudy.id} className="border rounded p-4 flex flex-col">
                    <div className="font-bold text-lg text-blue-700 dark:text-blue-300">{caseStudy.title}</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">{caseStudy.subtitle}</div>
                    {caseStudy.description && <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">{caseStudy.description}</div>}
                    <div className="mt-2 flex gap-2">
                      <button className="text-blue-600 underline" onClick={() => handleCaseStudyEdit(caseStudy.id)}>Edit</button>
                      <button className="text-red-600 underline" onClick={() => handleCaseStudyDelete(caseStudy.id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}

      {activeTab === 'documents' && (
        <>
          {/* Document Form */}
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg mb-8">
            <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">
              {documentEditId ? 'Edit Document' : 'Add New Document'}
            </h2>
            <form onSubmit={handleDocumentSubmit} className="space-y-4">
              <input 
                className="w-full border rounded p-2 text-blue-700 dark:text-blue-300" 
                name="title" 
                placeholder="Document Title (e.g., Modernization Playbook)" 
                value={documentForm.title} 
                onChange={handleDocumentChange} 
                required 
              />
              <textarea 
                className="w-full border rounded p-2 text-blue-700 dark:text-blue-300" 
                name="description" 
                placeholder="Document Description" 
                value={documentForm.description} 
                onChange={handleDocumentChange} 
              />
              <input 
                className="w-full border rounded p-2 text-blue-700 dark:text-blue-300" 
                name="kpi" 
                placeholder="KPI (e.g., 99.9% Uptime, +30% Efficiency)" 
                value={documentForm.kpi} 
                onChange={handleDocumentChange} 
              />
              
              {/* Document Upload Section */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-300">
                  Document File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {documentPreview ? (
                    <div className="space-y-2">
                      <div className="text-blue-600 font-medium">{documentPreview}</div>
                      <div className="flex gap-2 justify-center">
                        <button
                          type="button"
                          onClick={() => document.getElementById('document-upload')?.click()}
                          className="text-blue-600 underline text-sm"
                        >
                          Change File
                        </button>
                        <button
                          type="button"
                          onClick={handleRemoveDocument}
                          className="text-red-600 underline text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-gray-500">
                        {isDocumentUploading ? 'Uploading...' : 'Click to upload document'}
                      </div>
                      <div className="text-xs text-gray-400">
                        PDF, DOC, DOCX, TXT, XLS, XLSX up to 10MB
                      </div>
                      <button
                        type="button"
                        onClick={() => document.getElementById('document-upload')?.click()}
                        className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                        disabled={isDocumentUploading}
                      >
                        {isDocumentUploading ? 'Uploading...' : 'Choose Document'}
                      </button>
                    </div>
                  )}
                  <input
                    id="document-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
                    onChange={handleDocumentUpload}
                    className="hidden"
                    disabled={isDocumentUploading}
                  />
                </div>
              </div>

              <button className="bg-primary text-white px-4 py-2 rounded" type="submit">
                {documentEditId ? 'Update' : 'Add'} Document
              </button>
              {documentEditId && (
                <button 
                  type="button" 
                  className="ml-2 text-gray-500 underline" 
                  onClick={() => { 
                    setDocumentEditId(null); 
                    setDocumentForm({
                      title: '',
                      description: '',
                      kpi: '',
                      file: '',
                      fileName: '',
                      fileType: '',
                    }); 
                    setDocumentPreview('');
                  }}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>

          {/* Document List */}
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Downloadable Documents</h2>
            {documents.length === 0 ? (
              <div className="text-muted-foreground">No documents.</div>
            ) : (
              <ul className="space-y-4">
                {documents.map(document => (
                  <li key={document.id} className="border rounded p-4 flex flex-col">
                    <div className="font-bold text-lg text-blue-700 dark:text-blue-300">{document.title}</div>
                    {document.description && <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">{document.description}</div>}
                    {document.kpi && <div className="text-sm text-green-600 dark:text-green-400 mt-1">KPI: {document.kpi}</div>}
                    <div className="text-xs text-gray-500 mt-1">{document.fileName}</div>
                    <div className="mt-2 flex gap-2">
                      <button className="text-blue-600 underline" onClick={() => handleDocumentEdit(document.id)}>Edit</button>
                      <button className="text-red-600 underline" onClick={() => handleDocumentDelete(document.id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}

      {activeTab === 'useCases' && (
        <>
          {/* Use Case Form */}
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg mb-8">
            <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">
              {useCaseEditId ? 'Edit Use Case' : 'Add New Use Case'}
            </h2>
            <form onSubmit={handleUseCaseSubmit} className="space-y-4">
              <input 
                className="w-full border rounded p-2 text-blue-700 dark:text-blue-300" 
                name="title" 
                placeholder="Use Case Title (e.g., AI Chatbot for Citizen Services)" 
                value={useCaseForm.title} 
                onChange={handleUseCaseChange} 
                required 
              />
              
              {/* Use Case Image Upload Section */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-700 dark:text-blue-300">
                  Use Case Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {useCaseImagePreview ? (
                    <div className="space-y-2">
                      <img 
                        src={useCaseImagePreview} 
                        alt="Preview" 
                        className="max-w-full h-32 object-cover mx-auto rounded"
                      />
                      <div className="flex gap-2 justify-center">
                        <button
                          type="button"
                          onClick={() => document.getElementById('use-case-image-upload')?.click()}
                          className="text-blue-600 underline text-sm"
                        >
                          Change Image
                        </button>
                        <button
                          type="button"
                          onClick={handleRemoveUseCaseImage}
                          className="text-red-600 underline text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-gray-500">
                        {isUseCaseUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                      </div>
                      <div className="text-xs text-gray-400">
                        PNG, JPG, GIF up to 5MB
                      </div>
                      <button
                        type="button"
                        onClick={() => document.getElementById('use-case-image-upload')?.click()}
                        className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                        disabled={isUseCaseUploading}
                      >
                        {isUseCaseUploading ? 'Uploading...' : 'Choose Image'}
                      </button>
                    </div>
                  )}
                  <input
                    id="use-case-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleUseCaseImageUpload}
                    className="hidden"
                    disabled={isUseCaseUploading}
                  />
                </div>
              </div>

              <textarea 
                className="w-full border rounded p-2 text-blue-700 dark:text-blue-300" 
                name="description" 
                placeholder="Short description of the use case" 
                value={useCaseForm.description} 
                onChange={handleUseCaseChange} 
                required 
              />
              <div className="grid grid-cols-3 gap-2">
                <input 
                  className="border rounded p-2 text-blue-700 dark:text-blue-300" 
                  name="category" 
                  placeholder="Category (e.g., Government, Healthcare)" 
                  value={useCaseForm.category} 
                  onChange={handleUseCaseChange} 
                />
                <input 
                  className="border rounded p-2 text-blue-700 dark:text-blue-300" 
                  name="technology" 
                  placeholder="Technology (e.g., AI, RPA, Cloud)" 
                  value={useCaseForm.technology} 
                  onChange={handleUseCaseChange} 
                />
                <input 
                  className="border rounded p-2 text-blue-700 dark:text-blue-300" 
                  name="impact" 
                  placeholder="Impact (e.g., 80% faster, $1M saved)" 
                  value={useCaseForm.impact} 
                  onChange={handleUseCaseChange} 
                />
              </div>
              <button className="bg-primary text-white px-4 py-2 rounded" type="submit">
                {useCaseEditId ? 'Update' : 'Add'} Use Case
              </button>
              {useCaseEditId && (
                <button 
                  type="button" 
                  className="ml-2 text-gray-500 underline" 
                  onClick={() => { 
                    setUseCaseEditId(null); 
                    setUseCaseForm({
                      title: '',
                      image: '',
                      description: '',
                      category: '',
                      technology: '',
                      impact: '',
                    }); 
                    setUseCaseImagePreview('');
                  }}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>

          {/* Use Case List */}
          <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">AI in Action Use Cases</h2>
            {useCases.length === 0 ? (
              <div className="text-muted-foreground">No use cases.</div>
            ) : (
              <ul className="space-y-4">
                {useCases.map(useCase => (
                  <li key={useCase.id} className="border rounded p-4 flex flex-col">
                    <div className="font-bold text-lg text-blue-700 dark:text-blue-300">{useCase.title}</div>
                    {useCase.description && <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">{useCase.description}</div>}
                    <div className="flex gap-4 text-xs text-gray-500 mt-2">
                      {useCase.category && <span>Category: {useCase.category}</span>}
                      {useCase.technology && <span>Technology: {useCase.technology}</span>}
                      {useCase.impact && <span>Impact: {useCase.impact}</span>}
                    </div>
                    <div className="mt-2 flex gap-2">
                      <button className="text-blue-600 underline" onClick={() => handleUseCaseEdit(useCase.id)}>Edit</button>
                      <button className="text-red-600 underline" onClick={() => handleUseCaseDelete(useCase.id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
} 