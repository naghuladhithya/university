import React from 'react';
import { Calendar, FileText, GraduationCap, Award, Clock, CheckCircle, AlertCircle, Download } from 'lucide-react';

interface Application {
  id: string;
  university: string;
  status: 'accepted' | 'applied' | 'rejected';
  appliedOn: string;
  decisionDate: string;
  documents: Document[];
  scholarships?: Scholarship[];
}

interface Document {
  name: string;
  url: string;
  type: 'offer' | 'scholarship' | 'other';
}

interface Scholarship {
  name: string;
  amount: string;
}

const applications: Application[] = [
  {
    id: '1',
    university: 'Florida Institute of Technology',
    status: 'accepted',
    appliedOn: 'June 27, 2025',
    decisionDate: 'July 2, 2025',
    documents: [
      { name: 'Offer Letter', url: 'Florida Tech.pdf', type: 'offer' },
      { name: 'Scholarship Letter', url: 'Florida Tech Scholarship.pdf', type: 'scholarship' }
    ],
    scholarships: [
      { name: 'Merit Scholarship', amount: '$17,500/year' }
    ]
  },
  {
    id: '2',
    university: 'Arizona State University',
    status: 'applied',
    appliedOn: 'July 1, 2025',
    decisionDate: 'Pending',
    documents: []
  },
  {
    id: '3',
    university: 'Iowa State University',
    status: 'applied',
    appliedOn: 'July 1, 2025',
    decisionDate: 'Pending',
    documents: []
  }
];

const StatusBadge: React.FC<{ status: Application['status'] }> = ({ status }) => {
  const statusConfig = {
    accepted: {
      icon: CheckCircle,
      text: 'Accepted',
      classes: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 ring-1'
    },
    applied: {
      icon: Clock,
      text: 'Applied',
      classes: 'bg-amber-50 text-amber-700 ring-amber-600/20 ring-1'
    },
    rejected: {
      icon: AlertCircle,
      text: 'Rejected',
      classes: 'bg-red-50 text-red-700 ring-red-600/20 ring-1'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${config.classes}`}>
      <Icon className="w-4 h-4" />
      {config.text}
    </span>
  );
};

const DocumentLink: React.FC<{ document: Document }> = ({ document }) => {
  const iconConfig = {
    offer: FileText,
    scholarship: Award,
    other: FileText
  };

  const Icon = iconConfig[document.type];

  return (
    <a
      href={document.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors group"
    >
      <Icon className="w-4 h-4 text-slate-500 group-hover:text-slate-700" />
      {document.name}
      <Download className="w-3 h-3 text-slate-400 group-hover:text-slate-600" />
    </a>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent">
              Naghul Adhithya
            </h1>
          </div>
          <p className="text-xl text-slate-600 font-medium">University Admissions Dashboard</p>
          <p className="text-sm text-slate-500 mt-2">Fall 2026 Applications • Status Tracking • Documents & Scholarships</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">1</p>
                <p className="text-sm text-slate-600">Accepted</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">2</p>
                <p className="text-sm text-slate-600">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">$17.5K</p>
                <p className="text-sm text-slate-600">Annual Scholarship</p>
              </div>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200/60">
            <h2 className="text-xl font-semibold text-slate-900">Application Status</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">University</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Applied</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Decision</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Documents</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-6">
                      <div className="font-semibold text-slate-900">{app.university}</div>
                    </td>
                    <td className="px-6 py-6">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4" />
                        {app.appliedOn}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="text-sm text-slate-600">
                        {app.decisionDate === 'Pending' ? (
                          <span className="text-amber-600 font-medium">Pending</span>
                        ) : (
                          app.decisionDate
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="space-y-3">
                        {app.documents.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {app.documents.map((doc, index) => (
                              <DocumentLink key={index} document={doc} />
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-slate-400">—</span>
                        )}
                        
                        {app.scholarships && app.scholarships.length > 0 && (
                          <div className="mt-3">
                            <div className="text-xs font-medium text-slate-700 mb-2">Scholarships:</div>
                            <div className="space-y-1">
                              {app.scholarships.map((scholarship, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm">
                                  <Award className="w-4 h-4 text-amber-500" />
                                  <span className="text-slate-700">{scholarship.name}</span>
                                  <span className="font-semibold text-emerald-600">{scholarship.amount}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
