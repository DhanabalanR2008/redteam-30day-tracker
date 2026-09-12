import React from 'react';
import type { AppState } from '../types';

interface ExamChecklistProps {
  examChecklist: AppState['examChecklist'];
  onChange: (key: string, val: boolean) => void;
}

const SECTIONS = [
  {
    title: 'Linux',
    items: [
      { key: 'linux_terminal', label: 'Navigate Linux terminal' },
      { key: 'linux_permissions', label: 'Understand permissions (rwx, SUID, SGID)' },
      { key: 'linux_processes', label: 'Find and manage processes' },
      { key: 'linux_services', label: 'Investigate running services' },
      { key: 'linux_network', label: 'Analyze network connections' },
    ],
  },
  {
    title: 'Networking',
    items: [
      { key: 'net_ip', label: 'IP addresses and subnetting' },
      { key: 'net_ports', label: 'Ports and common services' },
      { key: 'net_tcp_udp', label: 'TCP vs UDP — differences and use cases' },
      { key: 'net_dns', label: 'DNS resolution chain' },
      { key: 'net_http', label: 'HTTP/HTTPS structure and flow' },
      { key: 'net_packets', label: 'Basic packet analysis with Wireshark' },
    ],
  },
  {
    title: 'Enumeration',
    items: [
      { key: 'enum_nmap', label: 'Use Nmap effectively' },
      { key: 'enum_services', label: 'Identify and fingerprint services' },
      { key: 'enum_target', label: 'Enumerate a target end-to-end' },
      { key: 'enum_decision', label: 'Decide next steps from findings' },
    ],
  },
  {
    title: 'Web Security',
    items: [
      { key: 'web_sqli', label: 'SQL Injection — why it exists and how to exploit' },
      { key: 'web_xss', label: 'XSS — reflected, stored, DOM-based' },
      { key: 'web_auth', label: 'Authentication vulnerabilities' },
      { key: 'web_idor', label: 'Authorization / IDOR' },
      { key: 'web_ssrf', label: 'SSRF — internal access and cloud metadata' },
      { key: 'web_upload', label: 'File Upload vulnerabilities → RCE' },
      { key: 'web_cmdi', label: 'Command Injection' },
      { key: 'web_jwt', label: 'JWT attacks (alg:none, confusion)' },
      { key: 'web_api', label: 'API Security (BOLA, mass assignment)' },
    ],
  },
  {
    title: 'Windows & Active Directory',
    items: [
      { key: 'win_navigate', label: 'Navigate Windows effectively' },
      { key: 'win_powershell', label: 'Write basic PowerShell scripts' },
      { key: 'win_users', label: 'Understand users, groups, SIDs' },
      { key: 'win_services', label: 'Understand Windows services' },
      { key: 'win_smb', label: 'Explain SMB and its security implications' },
      { key: 'win_ad', label: 'Explain Active Directory structure' },
      { key: 'win_kerberos', label: 'Explain Kerberos authentication flow' },
    ],
  },
];

export const ExamChecklist: React.FC<ExamChecklistProps> = ({ examChecklist, onChange }) => {
  const total = SECTIONS.reduce((s, sec) => s + sec.items.length, 0);
  const checked = Object.values(examChecklist).filter(Boolean).length;
  const score = checked;

  return (
    <div className="flex flex-col gap-6">
      {/* Score banner */}
      <div className="bg-gray-900 border border-green-500/20 rounded-lg p-4 text-center">
        <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">Month 1 Score</div>
        <div className="text-3xl font-bold font-mono text-green-400">{score} / {total}</div>
        <div className="text-xs text-gray-500 font-mono mt-1">
          {score === total ? '🎉 FOUNDATION COMPLETE' : `${total - score} items remaining`}
        </div>
      </div>

      {SECTIONS.map((section) => {
        const sectionChecked = section.items.filter((i) => examChecklist[i.key]).length;
        return (
          <div key={section.title} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-mono text-white font-bold">{section.title}</h3>
              <span className="text-xs font-mono text-gray-500">{sectionChecked}/{section.items.length}</span>
            </div>
            <div className="flex flex-col gap-2">
              {section.items.map(({ key, label }) => (
                <label key={key} className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!examChecklist[key]}
                    onChange={(e) => onChange(key, e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-green-500 cursor-pointer shrink-0"
                  />
                  <span className={`text-sm font-mono transition-colors leading-snug ${examChecklist[key] ? 'text-green-400 line-through opacity-60' : 'text-gray-400 group-hover:text-gray-200'}`}>
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );
      })}

      <div className="text-xs text-gray-600 font-mono text-center pb-4">
        Score: {score} / {total} — {Math.round((score / total) * 100)}% of Month 1 foundation verified
      </div>
    </div>
  );
};

export { SECTIONS };
