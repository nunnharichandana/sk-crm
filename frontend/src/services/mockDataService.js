// SK SMART INVESTMENTS - Central Mock Data Store
// Company Name: SK SMART INVESTMENTS
// Tagline: INSURANCE AND INVESTMENTS SPECIALIST
// Managing Director: Prakash Gajendran
// Location: Kanchipuram, Tamil Nadu

export const COMPANY_INFO = {
  name: 'SK SMART INVESTMENTS',
  tagline: 'INSURANCE AND INVESTMENTS SPECIALIST',
  mdName: 'Prakash Gajendran',
  title: 'Managing Director (MD)',
  location: 'Kanchipuram, Tamil Nadu',
  address: 'No. 14, Gandhi Road, Near Kamakshi Amman Temple, Kanchipuram, Tamil Nadu - 631501',
  phone: '+91 98423 11223',
  email: 'prakash.md@sksmartinvestments.com',
  irdaLicense: 'IRDAI / KNM / 2021 / 9042'
};

export const INITIAL_USER = {
  id: 1,
  employeeId: 'EMP001',
  name: 'Prakash Gajendran',
  email: 'prakash.md@sksmartinvestments.com',
  role: 'ADMIN', // ADMIN (Managing Director), MANAGER, TEAM_LEADER, STAFF
  roleDisplayName: 'Managing Director (MD)',
  branch: 'Kanchipuram Office',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
  permissions: ['ALL']
};

export const MOCK_ROLES = [
  { id: 'ADMIN', name: 'Managing Director (MD)', desc: 'Full System Control & Master Configurations' },
  { id: 'MANAGER', name: 'Manager', desc: 'Kanchipuram Operations & Client Allocation' },
  { id: 'TEAM_LEADER', name: 'Team Leader', desc: 'Team Oversight & Policy Review' },
  { id: 'STAFF', name: 'Staff Advisor', desc: 'Client Lead Management & Policy Issuance' },
];

export const INITIAL_COMPANIES = [
  { 
    id: 1, 
    code: 'STAR_HEALTH', 
    name: 'Star Health and Allied Insurance', 
    supportEmail: 'support@starhealth.in', 
    tollFree: '1800-425-2255',
    products: ['Comprehensive Optima Health', 'Star Family Health Optima', 'Senior Citizens Red Carpet']
  },
  { 
    id: 2, 
    code: 'HDFC_ERGO', 
    name: 'HDFC ERGO General Insurance', 
    supportEmail: 'care@hdfcergo.com', 
    tollFree: '1800-266-6444',
    products: ['My:Optima Secure Health Plan', 'Motor Comprehensive Private Car', 'Home Protect Plan']
  },
  { 
    id: 3, 
    code: 'TATA_AIG', 
    name: 'Tata AIG General Insurance', 
    supportEmail: 'customersupport@tataaig.com', 
    tollFree: '1800-266-7780',
    products: ['Auto Secure Private Car Package', 'MediCare Premier Health', 'Travel Guard Shield']
  },
  { 
    id: 4, 
    code: 'ICICI_PRUDENTIAL', 
    name: 'ICICI Prudential Life Insurance', 
    supportEmail: 'support@icicipru.com', 
    tollFree: '1800-222-666',
    products: ['iProtect Smart Term Plan', 'GIFT Pro Investment Plan', 'Future Perfect Savings']
  }
];

export const MOCK_LEADS = [
  {
    id: 'LD-2026-001',
    customerName: 'Rahul Dravid',
    mobileNumber: '+91 98111 22233',
    whatsappNumber: '+91 98111 22233',
    email: 'rahul.d@cricket.in',
    city: 'Kanchipuram',
    state: 'Tamil Nadu',
    leadSource: 'WEBSITE',
    insuranceType: 'Health Insurance',
    company: 'Star Health Insurance',
    estimatedPremium: 35000,
    assignedStaff: 'Priya Nair',
    assignedManager: 'Prakash Gajendran',
    branch: 'Kanchipuram Office',
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
    city: 'Kanchipuram',
    state: 'Tamil Nadu',
    leadSource: 'REFERRAL',
    insuranceType: 'Life Insurance',
    company: 'ICICI Prudential Life',
    estimatedPremium: 65000,
    assignedStaff: 'Priya Nair',
    assignedManager: 'Prakash Gajendran',
    branch: 'Kanchipuram Office',
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
    city: 'Kanchipuram',
    state: 'Tamil Nadu',
    leadSource: 'SOCIAL_MEDIA',
    insuranceType: 'Motor Insurance',
    company: 'Tata AIG General',
    estimatedPremium: 18500,
    assignedStaff: 'Amit Verma',
    assignedManager: 'Prakash Gajendran',
    branch: 'Kanchipuram Office',
    priority: 'MEDIUM',
    status: 'CONTACTED',
    leadScore: 65,
    createdDate: '2026-07-24',
    notes: 'Hyundai Alcazar Comprehensive motor insurance quote requested.'
  },
  {
    id: 'LD-2026-004',
    customerName: 'Neha Agarwal',
    mobileNumber: '+91 98444 55566',
    whatsappNumber: '+91 98444 55566',
    email: 'neha.a@fintech.io',
    city: 'Kanchipuram',
    state: 'Tamil Nadu',
    leadSource: 'CAMPAIGN',
    insuranceType: 'Health Insurance',
    company: 'HDFC ERGO',
    estimatedPremium: 42000,
    assignedStaff: 'Priya Nair',
    assignedManager: 'Prakash Gajendran',
    branch: 'Kanchipuram Office',
    priority: 'HIGH',
    status: 'POLICY_ISSUED',
    leadScore: 100,
    createdDate: '2026-07-15',
    notes: 'Policy issued successfully. POL-HDFC-2026-78901 generated.'
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
    remarks: 'In-person meeting at client residence in Kanchipuram to explain Star Health family floaters.'
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
    branch: 'Kanchipuram Office'
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
    branch: 'Kanchipuram Office'
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
    branch: 'Kanchipuram Office'
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
    hospitalName: 'Kanchipuram Government Hospital & Research Center',
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
    hospitalName: 'Sri Sanjeevani Auto Works, Kanchipuram',
    status: 'UNDER_INVESTIGATION',
    assignedStaff: 'Amit Verma'
  }
];

// MOCK STAFF WITH FULL LOGIN CREDENTIALS STORE (MD Accessible)
export const MOCK_STAFF = [
  {
    id: 1,
    employeeId: 'EMP001',
    name: 'Prakash Gajendran',
    role: 'Managing Director (MD)',
    roleCode: 'ADMIN',
    branch: 'Kanchipuram Office',
    email: 'prakash.md@sksmartinvestments.com',
    password: 'Password@123',
    phone: '+91 98423 11223',
    target: 2500000,
    achieved: 2350000,
    commissionEarned: 188000,
    activeLeads: 45,
    rating: 5.0,
    status: 'ACTIVE'
  },
  {
    id: 2,
    employeeId: 'EMP002',
    name: 'Ramesh K. (Manager)',
    role: 'Manager',
    roleCode: 'MANAGER',
    branch: 'Kanchipuram Office',
    email: 'manager.kanchipuram@sksmartinvestments.com',
    password: 'Manager@123',
    phone: '+91 98423 22334',
    target: 1500000,
    achieved: 1320000,
    commissionEarned: 105600,
    activeLeads: 32,
    rating: 4.8,
    status: 'ACTIVE'
  },
  {
    id: 3,
    employeeId: 'EMP003',
    name: 'Rohan Mehta',
    role: 'Team Leader',
    roleCode: 'TEAM_LEADER',
    branch: 'Kanchipuram Office',
    email: 'tl.health@sksmartinvestments.com',
    password: 'Leader@123',
    phone: '+91 98423 33445',
    target: 1000000,
    achieved: 895000,
    commissionEarned: 71600,
    activeLeads: 28,
    rating: 4.8,
    status: 'ACTIVE'
  },
  {
    id: 4,
    employeeId: 'EMP004',
    name: 'Priya Nair',
    role: 'Staff Advisor',
    roleCode: 'STAFF',
    branch: 'Kanchipuram Office',
    email: 'priya.advisor@sksmartinvestments.com',
    password: 'Advisor@123',
    phone: '+91 98423 44556',
    target: 500000,
    achieved: 485000,
    commissionEarned: 38800,
    activeLeads: 24,
    rating: 4.9,
    status: 'ACTIVE'
  },
  {
    id: 5,
    employeeId: 'EMP005',
    name: 'Amit Verma',
    role: 'Staff Advisor',
    roleCode: 'STAFF',
    branch: 'Kanchipuram Office',
    email: 'amit.advisor@sksmartinvestments.com',
    password: 'Advisor@123',
    phone: '+91 98423 55667',
    target: 500000,
    achieved: 390000,
    commissionEarned: 31200,
    activeLeads: 19,
    rating: 4.7,
    status: 'ACTIVE'
  }
];

export const MOCK_AUDIT_LOGS = [
  { id: 1, user: 'Prakash Gajendran (MD)', action: 'SYSTEM_LOGIN', module: 'Authentication', timestamp: '2026-07-27 10:45:12', ip: '192.168.1.100', details: 'MD Prakash Gajendran logged into CRM' },
  { id: 2, user: 'Priya Nair', action: 'ISSUE_POLICY', module: 'Policy Module', timestamp: '2026-07-27 09:30:22', ip: '192.168.1.105', details: 'Issued policy POL-HDFC-2026-78901' },
  { id: 3, user: 'Prakash Gajendran (MD)', action: 'PROVISION_STAFF', module: 'Staff Management', timestamp: '2026-07-26 16:15:00', ip: '192.168.1.102', details: 'MD provisioned login credentials for Amit Verma' },
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
    { name: 'Health Insurance', value: 42, color: '#1E6091' },
    { name: 'Life & Term Insurance', value: 28, color: '#1A759F' },
    { name: 'Motor & Bike Insurance', value: 18, color: '#52B69A' },
    { name: 'Corporate & Fire', value: 8, color: '#34A0A4' },
    { name: 'Mutual Funds & Investments', value: 4, color: '#76C893' },
  ]
};
