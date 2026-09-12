import type { DayDefinition } from '../types';

export const DAYS: DayDefinition[] = [
  // ─── WEEK 1: Linux + Networking ───────────────────────────────────────────
  {
    day: 1, week: 1, weekName: 'Linux + Networking',
    topic: 'Linux Filesystem, Users & Permissions',
    study: 'Understand the Linux filesystem hierarchy (/etc, /var, /home, /bin, /usr). Learn user management (useradd, passwd, groups), file permissions (chmod, chown, umask), and special bits (SUID, SGID, sticky bit).',
    practical: 'Navigate the entire Linux system using only the terminal. Create users, set permissions, inspect /etc/passwd and /etc/shadow. Understand what each permission bit means in a real context.',
  },
  {
    day: 2, week: 1, weekName: 'Linux + Networking',
    topic: 'Processes, Services & Environment Variables',
    study: 'Learn how Linux processes work (PID, PPID, signals). Understand systemd services, cron jobs, and how environment variables are set and used. Study /proc filesystem.',
    practical: 'Investigate all running processes and services on your lab machine. Kill a process gracefully and forcefully. Set persistent environment variables. Inspect cron jobs and scheduled tasks.',
  },
  {
    day: 3, week: 1, weekName: 'Linux + Networking',
    topic: 'Linux Networking',
    study: 'Understand network interfaces, routing tables, and how Linux handles networking. Learn ip, ss, netstat, curl, dig, nslookup, and how DNS resolution works at the OS level.',
    practical: 'Practice: ip addr, ip route, ss -tulnp, curl -v, dig, nslookup on authorized systems. Map all open ports and listening services on your machine. Trace a DNS query from start to finish.',
  },
  {
    day: 4, week: 1, weekName: 'Linux + Networking',
    topic: 'TCP/IP, Ports & Protocol Fundamentals',
    study: 'Deep-dive into the TCP/IP stack. Understand IP addressing, subnets, CIDR. Learn how TCP handshake works (SYN, SYN-ACK, ACK), stateful vs stateless protocols, and common port numbers.',
    practical: 'Capture and analyze traffic with Wireshark on authorized traffic. Identify TCP three-way handshake. Capture DNS, HTTP, and ICMP packets. Document what you see in each packet layer.',
  },
  {
    day: 5, week: 1, weekName: 'Linux + Networking',
    topic: 'DNS + HTTP/HTTPS',
    study: 'Understand the full DNS resolution chain (recursive, iterative). Learn HTTP request/response structure, status codes, headers, cookies. Understand HTTPS (TLS handshake, certificates, encryption).',
    practical: 'Inspect live DNS queries with dig and Wireshark. Capture HTTP vs HTTPS traffic. Observe TLS certificate exchange. Use curl to craft manual HTTP requests with custom headers.',
  },
  {
    day: 6, week: 1, weekName: 'Linux + Networking',
    topic: 'Nmap Fundamentals',
    study: 'Learn Nmap scan types: TCP SYN (-sS), TCP connect (-sT), UDP (-sU), version detection (-sV), OS detection (-O), and scripting engine (NSE). Understand timing templates and stealth considerations.',
    practical: 'Scan your own authorized lab machines only. Try different scan types and compare results. Use -sV and -sC to enumerate services. Run at least one NSE script. Document findings.',
  },
  {
    day: 7, week: 1, weekName: 'Linux + Networking',
    topic: 'Week 1 Test — Full Enumeration',
    study: 'Review all Week 1 concepts: Linux fundamentals, networking, TCP/IP, DNS, HTTP, Nmap. Consolidate your understanding of how all these pieces fit together.',
    practical: 'Enumerate an authorized lab machine end-to-end without using a tutorial. Document: open ports, running services, OS details, interesting findings. Then answer the checkpoint question.',
    isCheckpoint: true,
    checkpointText: 'CHECKPOINT: Explain the chain: IP → Port → Service → Protocol → Application. Answer: "I found port 80 open. What should I investigate next, and why?"',
  },

  // ─── WEEK 2: Web Application Hacking ──────────────────────────────────────
  {
    day: 8, week: 2, weekName: 'Web Application Hacking',
    topic: 'HTTP Requests & Responses — Burp Suite Proxy',
    study: 'Deeply understand HTTP methods (GET, POST, PUT, DELETE, PATCH, OPTIONS). Study request/response structure: headers, body, cookies, status codes. Set up and understand Burp Suite as a proxy.',
    practical: 'Configure Burp Suite proxy and intercept live HTTP traffic. Browse an authorized web application and analyze every request/response in Burp. Modify a request and observe the result.',
  },
  {
    day: 9, week: 2, weekName: 'Web Application Hacking',
    topic: 'Burp Repeater + Intruder',
    study: 'Learn how Burp Repeater enables manual request modification and how Intruder automates fuzzing. Understand attack types: Sniper, Battering Ram, Pitchfork, Cluster Bomb. Study payload sets.',
    practical: 'Send a captured request to Repeater. Modify parameters manually and observe different responses. Use Intruder to brute-force a parameter with a small wordlist on an authorized target.',
  },
  {
    day: 10, week: 2, weekName: 'Web Application Hacking',
    topic: 'SQL Injection',
    study: 'Understand how SQL injection works at the database query level. Learn in-band SQLi (error-based, union-based), blind SQLi (boolean, time-based), and out-of-band SQLi. Study impact and defenses.',
    practical: 'Complete authorized PortSwigger Web Security Academy SQLi labs. Document each vulnerability: why it exists, how you detected it, what its impact is, and how it should be fixed.',
  },
  {
    day: 11, week: 2, weekName: 'Web Application Hacking',
    topic: 'Authentication Vulnerabilities',
    study: 'Study broken authentication: username enumeration, weak passwords, brute-force protections (lockouts, rate limits), insecure password reset flows, credential stuffing, and session fixation.',
    practical: 'Complete PortSwigger authentication vulnerability labs. Focus on understanding why each vulnerability exists at the application logic level, not just running the exploit.',
  },
  {
    day: 12, week: 2, weekName: 'Web Application Hacking',
    topic: 'Access Control & IDOR',
    study: 'Understand vertical and horizontal privilege escalation. Study IDOR (Insecure Direct Object Reference), broken access control at the function and data level, forced browsing, and RBAC bypass.',
    practical: 'Complete PortSwigger access control labs. Attempt to access resources by manipulating object IDs and parameters. Document the logic flaw in each vulnerability.',
  },
  {
    day: 13, week: 2, weekName: 'Web Application Hacking',
    topic: 'Cross-Site Scripting (XSS)',
    study: 'Understand reflected, stored, and DOM-based XSS. Study how browsers parse HTML/JS, the DOM, and how context matters for payload construction. Study Content-Security-Policy and defenses.',
    practical: 'Complete PortSwigger reflected and stored XSS labs. Understand where the payload goes and why it executes. Test context-aware payloads. Document each lab\'s root cause.',
  },
  {
    day: 14, week: 2, weekName: 'Web Application Hacking',
    topic: 'Week 2 Test — Web Labs',
    study: 'Review all Week 2 vulnerabilities. Understand the web request flow: Request → Application → Input → Backend → Database/Logic → Response. Know why each vulnerability exists.',
    practical: 'Solve 3 web security labs from PortSwigger without reading any walkthrough. Explain in writing why each vulnerability exists and what its real-world impact would be.',
    isCheckpoint: true,
    checkpointText: 'CHECKPOINT: Explain the full web request flow. For each vulnerability you practiced, explain: why it exists, not just how to exploit it.',
  },

  // ─── WEEK 3: Advanced Web + API Security ──────────────────────────────────
  {
    day: 15, week: 3, weekName: 'Advanced Web + API Security',
    topic: 'Server-Side Request Forgery (SSRF)',
    study: 'Understand SSRF — how an application fetches user-controlled URLs. Study internal network access, cloud metadata services (169.254.169.254), bypass techniques, and blind SSRF detection.',
    practical: 'Complete PortSwigger SSRF labs. Test different protocols and targets. Understand what internal resources become accessible and why this is critical in cloud environments.',
  },
  {
    day: 16, week: 3, weekName: 'Advanced Web + API Security',
    topic: 'File Upload Vulnerabilities',
    study: 'Study file upload attack vectors: unrestricted file upload, MIME type bypass, extension bypass, polyglot files, path traversal in filename, and server-side execution. Understand defenses.',
    practical: 'Complete PortSwigger file upload labs. Test different bypass techniques. Understand server-side validation weaknesses and how file execution leads to RCE.',
  },
  {
    day: 17, week: 3, weekName: 'Advanced Web + API Security',
    topic: 'Command Injection',
    study: 'Understand OS command injection: how user input reaches system() or exec() calls. Study injection operators (;, &&, ||, |, backtick), blind command injection, and out-of-band exfiltration.',
    practical: 'Complete PortSwigger command injection labs. Identify injection points, craft payloads using different operators, and verify execution. Document each vulnerability\'s root cause.',
  },
  {
    day: 18, week: 3, weekName: 'Advanced Web + API Security',
    topic: 'JWT Security',
    study: 'Understand JWT structure (header.payload.signature). Study JWT attacks: alg:none, weak secrets (HS256 brute-force), algorithm confusion (RS256→HS256), kid injection, and jwks spoofing.',
    practical: 'Complete PortSwigger JWT labs. Decode and modify JWTs manually. Test algorithm confusion attacks. Understand what happens when signature validation fails.',
  },
  {
    day: 19, week: 3, weekName: 'Advanced Web + API Security',
    topic: 'API Security',
    study: 'Study REST API security: broken object-level authorization, mass assignment, improper function-level authorization, rate limiting bypass, versioning attacks, and GraphQL-specific issues.',
    practical: 'Test APIs in an authorized lab environment using Burp Suite. Map all API endpoints. Test for IDOR, mass assignment, and unauthenticated access. Review API documentation for exposed endpoints.',
  },
  {
    day: 20, week: 3, weekName: 'Advanced Web + API Security',
    topic: 'Business Logic & Race Conditions',
    study: 'Understand business logic vulnerabilities: flawed workflows, multi-step process abuse, and state management issues. Study race conditions: how concurrent requests exploit time-of-check vs time-of-use.',
    practical: 'Complete PortSwigger business logic and race condition labs. Use Burp Turbo Intruder for race conditions. Document the exact timing or logic flaw in each vulnerability.',
  },
  {
    day: 21, week: 3, weekName: 'Advanced Web + API Security',
    topic: 'Week 3 Test — Mixed Web Labs',
    study: 'Review all advanced web vulnerabilities. Create your vulnerability cheat sheet covering each attack: why it exists, detection method, real-world impact, and correct fix.',
    practical: 'Complete 5 mixed web security labs from PortSwigger without walkthroughs. Update your cheat sheet. Be able to explain each vulnerability clearly without referencing notes.',
    isCheckpoint: true,
    checkpointText: 'CHECKPOINT: Create vulnerability cheat sheet — SQLi, XSS, IDOR, SSRF, File Upload, Command Injection. For each: Why → Detection → Impact → Fix.',
  },

  // ─── WEEK 4: Windows + PowerShell + Active Directory ──────────────────────
  {
    day: 22, week: 4, weekName: 'Windows + Active Directory',
    topic: 'Windows Architecture',
    study: 'Understand Windows architecture: NT kernel, user mode vs kernel mode, Windows Registry, SAM database, LSASS, WinLogon, and the security model. Study user accounts, groups, and SIDs.',
    practical: 'Investigate users, groups, processes, and services on a Windows machine. Use Task Manager, Process Monitor, and sc.exe. Examine the Registry and understand key hives.',
  },
  {
    day: 23, week: 4, weekName: 'Windows + Active Directory',
    topic: 'PowerShell Fundamentals',
    study: 'Learn PowerShell: cmdlets, pipelines, objects, variables, conditionals, loops, functions, and modules. Understand PowerShell remoting (WinRM), execution policies, and common red team cmdlets.',
    practical: 'Write 5 small PowerShell scripts: (1) list processes, (2) find files, (3) query services, (4) check network connections, (5) enumerate local users and groups.',
  },
  {
    day: 24, week: 4, weekName: 'Windows + Active Directory',
    topic: 'Windows Networking — SMB, RDP & WinRM',
    study: 'Study Windows networking protocols: SMB (file sharing, authentication, null sessions), RDP (Remote Desktop), WinRM (PowerShell remoting). Understand NetBIOS, LLMNR, and Windows name resolution.',
    practical: 'Understand SMB shares, map drives, test WinRM on authorized systems. Use net use, Get-SmbShare, and Test-NetConnection. Document how each protocol authenticates.',
  },
  {
    day: 25, week: 4, weekName: 'Windows + Active Directory',
    topic: 'Active Directory Fundamentals',
    study: 'Understand Active Directory: Domain, Domain Controller, Forest, Trust relationships. Study AD objects: users, groups, OUs, computers, GPOs. Learn SYSVOL, NETLOGON, and AD replication.',
    practical: 'Explore a lab Domain Controller. Enumerate domain users, groups, computers, and GPOs using PowerShell and RSAT tools. Map the AD structure.',
  },
  {
    day: 26, week: 4, weekName: 'Windows + Active Directory',
    topic: 'LDAP + Kerberos Authentication',
    study: 'Understand LDAP queries and how AD data is structured. Deep-dive into Kerberos: KDC, TGT, TGS, AS-REQ, AS-REP, KRB_TGS_REQ. Understand Kerberoasting, AS-REP Roasting concepts.',
    practical: 'Run LDAP queries against an authorized domain controller using ldp.exe or PowerShell. Trace a Kerberos authentication flow with network capture. Understand each ticket type.',
  },
  {
    day: 27, week: 4, weekName: 'Windows + Active Directory',
    topic: 'AD Enumeration',
    study: 'Study AD enumeration techniques and tools: BloodHound/SharpHound (authorized use), PowerView concepts, net commands, ldapsearch. Understand attack paths from enumeration data.',
    practical: 'Enumerate an authorized lab environment. Map users, groups, ACLs, SPNs, and delegation settings. Identify potentially interesting attack paths for further study.',
  },
  {
    day: 28, week: 4, weekName: 'Windows + Active Directory',
    topic: 'Windows Privilege Escalation Concepts',
    study: 'Study Windows privesc concepts: unquoted service paths, weak service permissions, AlwaysInstallElevated, token impersonation, DLL hijacking, and stored credentials. Use as theory + authorized labs.',
    practical: 'Complete beginner Windows privilege escalation labs on authorized platforms (TryHackMe, HackTheBox). Document each technique: what misconfiguration is exploited and how to fix it.',
  },
  {
    day: 29, week: 4, weekName: 'Windows + Active Directory',
    topic: 'Red Team Mini Test — End-to-End Assessment',
    study: 'Review all Week 4 content. Prepare for a realistic authorized assessment combining enumeration, AD interaction, and privilege escalation concepts into a complete workflow.',
    practical: 'Assess an authorized lab machine from initial enumeration through privilege escalation. No tutorials. Document each step, decision, and finding. Explain your methodology.',
  },
  {
    day: 30, week: 4, weekName: 'Windows + Active Directory',
    topic: 'Month 1 Exam + Complete Review',
    study: 'Complete review of all 30 days. Revise your notes, cheat sheets, and lab findings. Identify gaps. Prepare for Month 2 by understanding your strongest and weakest areas.',
    practical: 'Perform a complete authorized assessment of a fresh lab machine without any tutorial. Apply knowledge from all 4 weeks. Document a full penetration testing report summary.',
    isCheckpoint: true,
    checkpointText: 'MONTH 1 EXAM: Complete the exam checklist on the Month 1 Exam page. Rate your confidence in each domain. Identify topics for Month 2 focus.',
  },
];

export const WEEKS = [
  { week: 1, name: 'Linux + Networking', days: 7 },
  { week: 2, name: 'Web Application Hacking', days: 7 },
  { week: 3, name: 'Advanced Web + API Security', days: 7 },
  { week: 4, name: 'Windows + Active Directory', days: 9 },
];
