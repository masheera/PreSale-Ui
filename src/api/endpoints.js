import api, { BASE_URL } from "./axiosInstance";

// Keep URLs centralized
export const URLS = {
  // auth
  login: "accounts/login/",
  refresh: "accounts/token/refresh/",

  // setup bundle + scope
  setupBundle: "client/setup-bundle/",
  myScope: "client/my-scope/",
  projectTree: "client/projects/tree/",

  // CRUD
  projects: "client/projects/",
  towers: "client/towers/",
  floors: "client/floors/",
  units: "client/units/",
  floorDocs: "client/floor-docs/",
  paymentPlans: "client/payment-plans/",
  paymentSlabs: "client/payment-slabs/",
  milestonePlans: "client/milestone-plans/",
  milestoneSlabs: "client/milestone-slabs/",

  // bank
  banks: "client/banks/",
  bankBranches: "client/bank-branches/",
  projectBanks: "client/project-banks/",
  bankAllInOne: "client/bank-setup/create-all/",

  // notifications
  notifications: "client/notifications/",
  notifMarkRead: (id) => `client/notifications/${id}/mark_read/`,
};

export const AuthAPI = {
  login: (username, password) =>
    api.post(URLS.login, { username, password }).then((r) => r.data),
};

export const SetupAPI = {
  getBundle: () => api.get(URLS.setupBundle).then((r) => r.data),

  // role-aware scope
  myScope: (params = {}) =>
    api.get(URLS.myScope, { params }).then((r) => r.data),

  // project tree with ?project_id & ?include_units
  projectTree: (project_id, include_units = false) =>
    api
      .get(URLS.projectTree, { params: { project_id, include_units } })
      .then((r) => r.data),
};

export const ProjectAPI = {
  create: (payload) => api.post(URLS.projects, payload).then((r) => r.data),
  list: (params = {}) => api.get(URLS.projects, { params }).then((r) => r.data),
};

export const TowerAPI = {
  create: (payload) => api.post(URLS.towers, payload).then((r) => r.data),
};

export const FloorAPI = {
  create: (payload) => api.post(URLS.floors, payload).then((r) => r.data),
};

export const UnitAPI = {
  create: (payload) => api.post(URLS.units, payload).then((r) => r.data),
};

export const PaymentAPI = {
  createPlan: (payload) =>
    api.post(URLS.paymentPlans, payload).then((r) => r.data),
  createSlab: (payload) =>
    api.post(URLS.paymentSlabs, payload).then((r) => r.data),
};

export const MilestoneAPI = {
  createPlan: (payload) =>
    api.post(URLS.milestonePlans, payload).then((r) => r.data),
  createSlab: (payload) =>
    api.post(URLS.milestoneSlabs, payload).then((r) => r.data),
};

export const BankAPI = {
  createAll: (payload) =>
    api.post(URLS.bankAllInOne, payload).then((r) => r.data),
};

export const NotificationAPI = {
  list: (params = {}) =>
    api.get(URLS.notifications, { params }).then((r) => r.data),
  markRead: (id) => api.post(URLS.notifMarkRead(id)).then((r) => r.data),
};




// Optional: export BASE_URL to build absolute links if needed elsewhere
export { BASE_URL };
