export type UserRole = 'supervisor' | 'operational-manager' | 'client';

export const roleLabels: Record<UserRole, string> = {
  supervisor: 'Supervisor',
  'operational-manager': 'Operational manager',
  client: 'Client',
};

export const routeByRole: Record<UserRole, string> = {
  supervisor: '/supervisor',
  'operational-manager': '/admin',
  client: '/client',
};

export const AUTH_STORAGE_KEY = 'silverlinetech-user-role';
const CURRENT_USER_KEY = 'silverlinetech-current-user';
const USER_ACCOUNT_STORAGE_KEY = 'silverlinetech-user-accounts';
const INCIDENTS_STORAGE_KEY = 'silverlinetech-incidents';

export type CurrentUserSession = {
  email: string;
  role: UserRole;
  name?: string;
};

export type StoredUser = CurrentUserSession & {
  password: string;
  approved: boolean;
  requestedAt: string;
};

export type IncidentStatus = 'Pending' | 'Resolved';

export type Incident = {
  id: string;
  type: string;
  category: string;
  summary: string;
  location: string;
  reporter: string;
  status: IncidentStatus;
  createdAt: string;
  updatedAt: string;
};

export function isValidRole(value: string | null): value is UserRole {
  return value === 'supervisor' || value === 'operational-manager' || value === 'client';
}

export function saveUserRole(role: UserRole) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(AUTH_STORAGE_KEY, role);
  }
}

export function getUserRole(): UserRole | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
  return isValidRole(stored) ? stored : null;
}

export function saveCurrentUser(user: CurrentUserSession) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function getCurrentUser(): CurrentUserSession | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = window.localStorage.getItem(CURRENT_USER_KEY);
  if (!stored) {
    return null;
  }

  try {
    const parsed = JSON.parse(stored) as CurrentUserSession;
    if (parsed?.email && parsed?.role && isValidRole(parsed.role)) {
      return parsed;
    }
  } catch {
    return null;
  }

  return null;
}

export function clearCurrentUser() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(CURRENT_USER_KEY);
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

function parseStoredJson<T>(raw: string | null, fallback: T): T {
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function getStoredUsers(): StoredUser[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const data = parseStoredJson<StoredUser[]>(window.localStorage.getItem(USER_ACCOUNT_STORAGE_KEY), []);
  return Array.isArray(data) ? data : [];
}

function saveStoredUsers(users: StoredUser[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(USER_ACCOUNT_STORAGE_KEY, JSON.stringify(users));
}

export function registerSupervisorAccount({ name, email, password }: { name: string; email: string; password: string }) {
  if (typeof window === 'undefined') {
    return { success: false, message: 'Registration is only available in the browser.' };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existing = getStoredUsers().find((user) => user.email === normalizedEmail && user.role === 'supervisor');

  if (existing) {
    if (existing.approved) {
      return { success: false, message: 'An approved supervisor account already exists for this email.' };
    }
    return { success: false, message: 'A supervisor registration already exists and is pending approval.' };
  }

  const newUser: StoredUser = {
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: 'supervisor',
    approved: false,
    requestedAt: new Date().toISOString(),
  };

  saveStoredUsers([...getStoredUsers(), newUser]);
  return { success: true, message: 'Supervisor account created. It will be approved by the operational manager before your first login.' };
}

export function authenticateUser({ email, password, role }: { email: string; password: string; role: UserRole }) {
  if (typeof window === 'undefined') {
    return { success: false, message: 'Authentication is only available in the browser.' };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const users = getStoredUsers();

  if (role === 'supervisor') {
    const existing = users.find((user) => user.email === normalizedEmail && user.role === 'supervisor');
    if (!existing) {
      return { success: false, message: 'No supervisor account found for that email. Please register first.' };
    }

    if (existing.password !== password) {
      return { success: false, message: 'Invalid credentials for supervisor account.' };
    }

    if (!existing.approved) {
      return { success: false, message: 'Your supervisor account is still pending approval from the operational manager.' };
    }

    return { success: true, message: 'Supervisor authenticated.', user: existing };
  }

  return { success: true, message: 'Authenticated.', user: { email: normalizedEmail, role, name: '', password: '', approved: true, requestedAt: new Date().toISOString() } as StoredUser };
}

export function getPendingSupervisorRequests() {
  return getStoredUsers().filter((user) => user.role === 'supervisor' && !user.approved);
}

export function approveSupervisor(email: string) {
  if (typeof window === 'undefined') {
    return false;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const users = getStoredUsers();
  const updated = users.map((user) => {
    if (user.role === 'supervisor' && user.email === normalizedEmail) {
      return { ...user, approved: true };
    }
    return user;
  });

  const changed = updated.some((user, index) => users[index]?.approved !== user.approved);
  if (!changed) {
    return false;
  }

  saveStoredUsers(updated);
  return true;
}

export function getIncidents(): Incident[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const data = parseStoredJson<Incident[]>(window.localStorage.getItem(INCIDENTS_STORAGE_KEY), []);
  return Array.isArray(data) ? data : [];
}

function saveIncidents(incidents: Incident[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(INCIDENTS_STORAGE_KEY, JSON.stringify(incidents));
}

export function addIncident(newIncident: Omit<Incident, 'id' | 'status' | 'createdAt' | 'updatedAt'>) {
  const now = new Date().toISOString();
  const incident: Incident = {
    ...newIncident,
    id: `OB-${Date.now()}`,
    status: 'Pending',
    createdAt: now,
    updatedAt: now,
  };

  const incidents = getIncidents();
  saveIncidents([incident, ...incidents]);
  return incident;
}

export function updateIncidentStatus(incidentId: string, status: IncidentStatus) {
  const incidents = getIncidents();
  let updatedIncident: Incident | undefined;

  const updated = incidents.map((incident) => {
    if (incident.id === incidentId) {
      updatedIncident = { ...incident, status, updatedAt: new Date().toISOString() };
      return updatedIncident;
    }
    return incident;
  });

  if (!updatedIncident) {
    return undefined;
  }

  saveIncidents(updated);
  return updatedIncident;
}
