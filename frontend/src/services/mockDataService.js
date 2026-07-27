// SK Smart Insurance CRM - Central Mock Data Store & Persistence Layer

export const INITIAL_USER = {
  id: 1,
  employeeId: 'EMP001',
  name: 'Rajesh Kumar',
  email: 'superadmin@sksmartinsurance.com',
  role: 'SUPER_ADMIN', // SUPER_ADMIN, ADMIN, REGIONAL_MANAGER, BRANCH_MANAGER, TEAM_LEADER, STAFF_ADVISOR
  roleDisplayName: 'Super Admin',
  branch: 'Corporate Headquarters (Mumbai)',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
  permissions: ['ALL']
};

export const MOCK_ROLES = [
  { id: 'SUPER_ADMIN', name: 'Super Admin', desc: 'Full System Control & Configuration' },
  { id: 'ADMIN', name: 'Administrator', desc: 'User Management & Branch Settings' },
  { id: 'REGIONAL_MANAGER', name: 'Regional Manager', desc: 'Multi-branch performance monitoring' },
  { id: 'BRANCH_MANAGER', name: 'Branch Manager', desc: 'Branch operations & lead allocation' },
  { id: 'TEAM_LEADER', name: 'Team Leader', desc: 'Team oversight & followup review' },
  { id: 'STAFF_ADVISOR', name: 'Insurance Advisor', desc: 'Lead management, sales & policy issuance' },
];

export const MOCK_BRANCHES = [
  { id: 1, code: 'BR-HQ-001', name: 'Corporate Headquarters', city: 'Mumbai', state: 'Maharashtra', staffCount: 42, activeLeads: 185 },
  { id: 2, code: 'BR-DL-002', name: 'Delhi NCR Branch', city: 'New Delhi', state: 'Delhi', staffCount: 28, activeLeads: 120 },
  { id: 3, code: 'BR-BLR-003', name: 'Bengaluru Tech Hub', city: 'Bengaluru', state: 'Karnataka', staffCount: 35, activeLeads: 165 },
  { id: 4, code: 'BR-HYD-004', name: 'Hyderabad Cyber Branch', city: 'Hyderabad', state: 'Telangana', staffCount: 22, activeLeads: 95 },
];

export const MOCK_LEADS = [
  {
    id: 'LD-2026-001',
    customerName: 'Rahul Dravid',
    mobileNumber: '+91 98111 22233',
    whatsappNumber: '+91 98111 22233',
    email: 'rahul.d@cricket.in',
    city: 'Bengaluru',
    state: 'Karnataka',
    leadSource: 'WEBSITE',
    insuranceType: 'Health Insurance',
    company: 'Star Health Insurance',
    estimatedPremium: 35000,
    assignedStaff: 'Priya Nair',
    assignedManager: 'Ananya Deshmukh',
    branch: 'Bengaluru Tech Hub',
    priority: 'HIGH',
    status: 'INTERESTED',
    leadScore: 85,
    createdDate: '2026-07-20',
    notes: 'Requested sum insured of 10 Lakhs. Requires maternity cover benefits.'
  },
  {
    id: 'LD-2026-002',
    customerName: 'Kavita Menon',
    mobileNumber: '+91 98222 33344',
    whatsappNumber: '+91 98222 33344',
    email: 'kavita.m@techcorp.com',
    city: 'Mumbai',
    state: 'Maharashtra',
    leadSource: 'REFERRAL',
    insuranceType: 'Life Insurance',
    company: 'ICICI Prudential Life',
    estimatedPremium: 65000,
    assignedStaff: 'Priya Nair',
    assignedManager: 'Ananya Deshmukh',
    branch: 'Corporate Headquarters',
    priority: 'URGENT',
    status: 'QUOTATION_SENT',
    leadScore: 92,
    createdDate: '2026-07-22',
    notes: 'Quotation sent for 1 Crore Term Life cover. Follow-up scheduled for payment.'
  },
  {
    id: 'LD-2026-003',
    customerName: 'Venkatesh Iyer',
    mobileNumber: '+91 98333 44455',
    whatsappNumber: '+91 98333 44455',
    email: 'venky.i@gmail.com',
    city: 'Delhi',
    state: 'Delhi',
    leadSource: 'SOCIAL_MEDIA',
    insuranceType: 'Motor Insurance',
    company: 'Tata AIG General',
    estimatedPremium: 18500,
    assignedStaff: 'Amit Verma',
    assignedManager: 'Vikram Aditya',
    branch: 'Delhi NCR Branch',
    priority: 'MEDIUM',
    status: 'CONTACTED',
    leadScore: 65,
    createdDate: '2026-07-24',
    notes: 'BMW X3 Comprehensive motor insurance quote requested.'
  },
  {
    id: 'LD-2026-004',
    customerName: 'Neha Agarwal',
    mobileNumber: '+91 98444 55566',
    whatsappNumber: '+91 98444 55566',
    email: 'neha.a@fintech.io',
    city: 'Mumbai',
    state: 'Maharashtra',
    leadSource: 'CAMPAIGN',
    insuranceType: 'Health Insurance',
    company: 'HDFC ERGO',
    estimatedPremium: 42000,
    assignedStaff: 'Priya Nair',
    assignedManager: 'Ananya Deshmukh',
    branch: 'Corporate Headquarters',
    priority: 'HIGH',
    status: 'POLICY_ISSUED',
    leadScore: 100,
    createdDate: '2026-07-15',
    notes: 'Policy issued successfully. POL-HDFC-2026-78901 generated.'
  },
  {
    id: 'LD-2026-005',
    customerName: 'Sanjay Malhotra',
    mobileNumber: '+91 98555 66677',
    whatsappNumber: '+91 98555 66677',
    email: 'sanjay.m@exportbiz.com',
    city: 'Hyderabad',
    state: 'Telangana',
    leadSource: 'COLD_CALL',
    insuranceType: 'Corporate Fire & Marine',
    company: 'Bajaj Allianz',
    estimatedPremium: 150000,
    assignedStaff: 'Amit Verma',
    assignedManager: 'Vikram Aditya',
    branch: 'Hyderabad Cyber Branch',
    priority: 'HIGH',
    status: 'NEGOTIATION',
    leadScore: 78,
    createdDate: '2026-07-18',
    notes: 'Commercial warehouse risk policy negotiation for 5 Cr asset valuation.'
  }
];

export const MOCK_FOLLOWUPS = [
  {
    id: 'FL-101',
    leadId: 'LD-2026-002',
    customerName: 'Kavita Menon',
    mobile: '+91 98222 33344',
    type: 'CALL',
    scheduledTime: '2026-07-27 14:30',
    status: 'PENDING',
    priority: 'URGENT',
    remarks: 'Collect signed proposal form and medical consent document.'
  },
  {
    id: 'FL-102',
    leadId: 'LD-2026-001',
    customerName: 'Rahul Dravid',
    mobile: '+91 98111 22233',
    type: 'MEETING',
    scheduledTime: '2026-07-27 16:00',
    status: 'PENDING',
    priority: 'HIGH',
    remarks: 'In-person meeting at client office to explain Star Health family floaters.'
  },
  {
    id: 'FL-103',
    leadId: 'LD-2026-003',
    customerName: 'Venkatesh Iyer',
    mobile: '+91 98333 44455',
    type: 'WHATSAPP',
    scheduledTime: '2026-07-27 11:00',
    status: 'COMPLETED',
    priority: 'MEDIUM',
    remarks: 'Sent updated quotation PDF with 15% NCB discount via WhatsApp.'
  },
  {
    id: 'FL-104',
    leadId: 'LD-2026-005',
    customerName: 'Sanjay Malhotra',
    mobile: '+91 98555 66677',
    type: 'EMAIL',
    scheduledTime: '2026-07-26 10:00',
    status: 'MISSED',
    priority: 'HIGH',
    remarks: 'Followup regarding Fire Risk inspection report submission.'
  }
];

export const MOCK_POLICIES = [
  {
    id: 'POL-HDFC-2026-78901',
    customerName: 'Neha Agarwal',
    customerCode: 'CUST-1004',
    insuranceCompany: 'HDFC ERGO General Insurance',
    type: 'Health Insurance',
    sumInsured: 1000000,
    grossPremium: 42000,
    issueDate: '2026-01-15',
    startDate: '2026-01-15',
    expiryDate: '2027-01-14',
    status: 'ACTIVE',
    staffAssigned: 'Priya Nair',
    branch: 'Corporate Headquarters'
  },
  {
    id: 'POL-STAR-2025-45612',
    customerName: 'Arjun Singhania',
    customerCode: 'CUST-1001',
    insuranceCompany: 'Star Health Insurance',
    type: 'Health Insurance',
    sumInsured: 500000,
    grossPremium: 24500,
    issueDate: '2025-08-10',
    startDate: '2025-08-10',
    expiryDate: '2026-08-09',
    status: 'PENDING_RENEWAL',
    staffAssigned: 'Priya Nair',
    branch: 'Corporate Headquarters'
  },
  {
    id: 'POL-TATA-2025-11223',
    customerName: 'Deepika Padukone',
    customerCode: 'CUST-1002',
    insuranceCompany: 'Tata AIG General',
    type: 'Motor Insurance',
    sumInsured: 850000,
    grossPremium: 28000,
    issueDate: '2025-09-01',
    startDate: '2025-09-01',
    expiryDate: '2026-08-31',
    status: 'ACTIVE',
    staffAssigned: 'Amit Verma',
    branch: 'Bengaluru Tech Hub'
  }
];

export const MOCK_CLAIMS = [
  {
    id: 'CLM-2026-089',
    policyNumber: 'POL-HDFC-2026-78901',
    customerName: 'Neha Agarwal',
    insuranceCompany: 'HDFC ERGO',
    claimAmount: 68000,
    settledAmount: 65000,
    incidentDate: '2026-06-10',
    intimationDate: '2026-06-12',
    hospitalName: 'Apollo Hospital, Navi Mumbai',
    status: 'SETTLED',
    assignedStaff: 'Priya Nair'
  },
  {
    id: 'CLM-2026-094',
    policyNumber: 'POL-TATA-2025-11223',
    customerName: 'Deepika Padukone',
    insuranceCompany: 'Tata AIG General',
    claimAmount: 45000,
    settledAmount: 0,
    incidentDate: '2026-07-02',
    intimationDate: '2026-07-03',
    hospitalName: 'Mahavir Auto Workshop, Bengaluru',
    status: 'UNDER_INVESTIGATION',
    assignedStaff: 'Amit Verma'
  }
];

export const MOCK_STAFF = [
  {
    id: 6,
    employeeId: 'EMP006',
    name: 'Priya Nair',
    role: 'Insurance Advisor',
    branch: 'Corporate Headquarters',
    email: 'priya.advisor@sksmartinsurance.com',
    target: 500000,
    achieved: 485000,
    commissionEarned: 38800,
    activeLeads: 24,
    rating: 4.9
  },
  {
    id: 7,
    employeeId: 'EMP007',
    name: 'Amit Verma',
    role: 'Insurance Advisor',
    branch: 'Delhi NCR Branch',
    email: 'amit.advisor@sksmartinsurance.com',
    target: 500000,
    achieved: 390000,
    commissionEarned: 31200,
    activeLeads: 19,
    rating: 4.7
  },
  {
    id: 5,
    employeeId: 'EMP005',
    name: 'Rohan Mehta',
    role: 'Team Leader',
    branch: 'Corporate Headquarters',
    email: 'tl.health@sksmartinsurance.com',
    target: 1000000,
    achieved: 895000,
    commissionEarned: 71600,
    activeLeads: 42,
    rating: 4.8
  }
];

export const MOCK_AUDIT_LOGS = [
  { id: 1, user: 'Super Admin', action: 'SYSTEM_LOGIN', module: 'Authentication', timestamp: '2026-07-27 10:45:12', ip: '192.168.1.100', details: 'Successful JWT Login' },
  { id: 2, user: 'Priya Nair', action: 'ISSUE_POLICY', module: 'Policy Module', timestamp: '2026-07-27 09:30:22', ip: '192.168.1.105', details: 'Issued policy POL-HDFC-2026-78901' },
  { id: 3, user: 'Ananya Deshmukh', action: 'TRANSFER_LEAD', module: 'Lead Management', timestamp: '2026-07-26 16:15:00', ip: '192.168.1.102', details: 'Re-assigned lead LD-2026-003 to Amit Verma' },
  { id: 4, user: 'Amit Verma', action: 'EXPORT_REPORT', module: 'Analytics & Reports', timestamp: '2026-07-26 14:00:10', ip: '192.168.1.108', details: 'Exported Monthly Lead Summary as PDF' },
];

export const DASHBOARD_ANALYTICS = {
  weeklyLeads: [
    { day: 'Mon', newLeads: 45, converted: 12, revenue: 185000 },
    { day: 'Tue', newLeads: 52, converted: 18, revenue: 240000 },
    { day: 'Wed', newLeads: 61, converted: 22, revenue: 310000 },
    { day: 'Thu', newLeads: 48, converted: 15, revenue: 210000 },
    { day: 'Fri', newLeads: 70, converted: 28, revenue: 420000 },
    { day: 'Sat', newLeads: 38, converted: 14, revenue: 195000 },
    { day: 'Sun', newLeads: 25, converted: 8, revenue: 120000 },
  ],
  insuranceDistribution: [
    { name: 'Health Insurance', value: 42, color: '#0A4DA2' },
    { name: 'Life & Term Insurance', value: 28, color: '#1976D2' },
    { name: 'Motor & Bike Insurance', value: 18, color: '#38BDF8' },
    { name: 'Corporate & Fire', value: 8, color: '#6366F1' },
    { name: 'Travel & Marine', value: 4, color: '#93C5FD' },
  ],
  branchPerformance: [
    { branch: 'HQ Mumbai', leads: 420, policies: 145, revenue: 4850000 },
    { branch: 'Delhi NCR', leads: 280, policies: 92, revenue: 2980000 },
    { branch: 'Bengaluru', leads: 350, policies: 118, revenue: 3820000 },
    { branch: 'Hyderabad', leads: 220, policies: 75, revenue: 2150000 },
  ]
};
