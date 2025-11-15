import React, { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SalesSubnav from "../components/SalesSubnav";
import axiosInstance from "../api/axiosInstance";
import "./Setup.css";
import {
  SetupAPI,
  ProjectAPI,
  TowerAPI,
  FloorAPI,
  UnitAPI,
  PaymentAPI,
  MilestoneAPI,
  BankAPI,
  NotificationAPI,
} from "../api/endpoints";

export default function Setup() {
  const [section, setSection] = useState("pre");
  const [activeItem, setActiveItem] = useState("master-setup");

  const [openSections, setOpenSections] = useState({
    project: true,
    tower: false,
    floor: false,
    unit: false,
    payment: false,
    milestone: false,
    bank: false,
    notification: false,
  });
  const toggleSection = (key) =>
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));

  /* -------------- state: lookups / scope -------------- */
  const [setup, setSetup] = useState(null); // setup-bundle: statuses + lookups + user (+ users list)
  const [scope, setScope] = useState(null); // my-scope: admin_id + projects -> towers -> floors (units optional)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Staff helper: adminId for scope filtering
  const isStaff = !!setup?.user?.is_staff;
  const role = setup?.user?.role || null;
  const [adminIdForScope, setAdminIdForScope] = useState("");

  // Users for selects (Responsible/Verified by)

  // Load Setup + Scope
  const loadAll = async (opts = {}) => {
    setLoading(true);
    setError("");
    try {
      const s = await SetupAPI.getBundle();
      setSetup(s);
      // default admin filter for staff: keep previous if set
      const params =
        s?.user?.is_staff && (opts.admin_id || adminIdForScope)
          ? { admin_id: Number(opts.admin_id || adminIdForScope) }
          : {};
      const sc = await SetupAPI.myScope(params);
      setScope(sc);
    } catch (e) {
      console.error(e);
      setError("Failed to load setup or scope");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If staff enters admin id, reload scope
  const handleLoadScopeForAdmin = async () => {
    if (!adminIdForScope) return;
    await loadAll({ admin_id: adminIdForScope });
  };

  /* -------------- helpers: lists / derived -------------- */
  const projects = useMemo(() => scope?.projects ?? [], [scope]);
  const towersByProject = useMemo(() => {
    const map = {};
    projects.forEach((p) => (map[p.id] = p.towers ?? []));
    return map;
  }, [projects]);
  const floorsByTower = useMemo(() => {
    const map = {};
    projects.forEach((p) =>
      (p.towers ?? []).forEach((t) => (map[t.id] = t.floors ?? []))
    );
    return map;
  }, [projects]);

  // Map towerId -> projectId (used for Floor Excel import)
  const projectIdByTowerId = useMemo(() => {
    const map = {};
    projects.forEach((p) => {
      (p.towers ?? []).forEach((t) => {
        map[t.id] = p.id;
      });
    });
    return map;
  }, [projects]);

  /* -------------- PROJECT form -------------- */
  const [projectForm, setProjectForm] = useState({
    name: "",
    location: "",
    developer: "",
    rera_no: "",
    start_date: "",
    end_date: "",
    possession_date: "",
    project_type: "", // id
    status: "", // code
    approval_status: "", // code
    notes: "",
    admin_id: "", // staff only
  });

  const handleAddProject = async () => {
    try {
      const payload = {
        name: projectForm.name,
        location: projectForm.location || "",
        developer: projectForm.developer || "",
        rera_no: projectForm.rera_no || "",
        start_date: projectForm.start_date || null,
        end_date: projectForm.end_date || null,
        possession_date: projectForm.possession_date || null,
        project_type: projectForm.project_type
          ? Number(projectForm.project_type)
          : null,
        status: projectForm.status || "DRAFT",
        approval_status: projectForm.approval_status || "PENDING",
        notes: projectForm.notes || "",
      };
      if (isStaff) {
        if (!projectForm.admin_id) {
          alert("admin_id is required for staff");
          return;
        }
        payload.admin_id = Number(projectForm.admin_id);
      }
      await ProjectAPI.create(payload);
      alert("Project created");
      setProjectForm({
        name: "",
        location: "",
        developer: "",
        rera_no: "",
        start_date: "",
        end_date: "",
        possession_date: "",
        project_type: "",
        status: "",
        approval_status: "",
        notes: "",
        admin_id: isStaff ? projectForm.admin_id : "",
      });
      await loadAll({ admin_id: isStaff ? projectForm.admin_id : undefined });
    } catch (e) {
      console.error(e);
      alert("Failed to create project");
    }
  };

  const handleProjectExcelClick = () => {
    if (projectExcelUploading) return;
    projectExcelInputRef.current?.click();
  };

  const handleProjectExcelChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // For staff we need admin_id
    if (isStaff && !projectForm.admin_id && !adminIdForScope) {
      alert(
        "For staff import, please enter Admin ID either in Project form or in the 'Admin ID for scope' box."
      );
      e.target.value = "";
      return;
    }

    const fd = new FormData();
    fd.append("file", file);
    if (isStaff) {
      fd.append("admin_id", projectForm.admin_id || adminIdForScope);
    }

    try {
      setProjectExcelUploading(true);
      const res = await axiosInstance.post(
        "client/projects/upload-excel/",
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const data = res.data || {};
      let msg = `Projects import done.
Created: ${data.created_projects || 0}
Updated: ${data.updated_projects || 0}`;
      if (Array.isArray(data.errors) && data.errors.length) {
        const first = data.errors[0];
        msg += `\nSome rows had errors. Example (row ${
          first.row
        }): ${first.errors.join(", ")}`;
      }
      alert(msg);
      await loadAll({
        admin_id: isStaff ? projectForm.admin_id || adminIdForScope : undefined,
      });
    } catch (err) {
      console.error(err);
      const apiMsg =
        err.response?.data?.detail ||
        err.response?.data?.error ||
        JSON.stringify(err.response?.data) ||
        "Failed to import projects from Excel.";
      alert(apiMsg);
    } finally {
      setProjectExcelUploading(false);
      e.target.value = "";
    }
  };


  /* -------------- TOWER form -------------- */
  const [towerForm, setTowerForm] = useState({
    project: "",
    name: "",
    tower_type: "",
    total_floors: "",
    status: "",
    notes: "",
  });

  const handleAddTower = async () => {
    try {
      const payload = {
        project: Number(towerForm.project),
        name: towerForm.name,
        tower_type: towerForm.tower_type ? Number(towerForm.tower_type) : null,
        total_floors: towerForm.total_floors
          ? Number(towerForm.total_floors)
          : 0,
        status: towerForm.status || "DRAFT",
        notes: towerForm.notes || "",
      };
      if (!payload.project || !payload.name) {
        alert("Project and Tower Name are required");
        return;
      }
      await TowerAPI.create(payload);
      alert("Tower created");
      setTowerForm({
        project: towerForm.project,
        name: "",
        tower_type: "",
        total_floors: "",
        status: "",
        notes: "",
      });
      await loadAll({ admin_id: isStaff ? adminIdForScope : undefined });
    } catch (e) {
      console.error(e);
      alert("Failed to create tower");
    }
  };

  const handleTowerExcelClick = () => {
    if (towerExcelUploading) return;
    if (!towerForm.project) {
      alert(
        "Please select the Project (in Tower Setup) for which you want to import towers."
      );
      return;
    }
    towerExcelInputRef.current?.click();
  };

  const handleTowerExcelChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const projectId = towerForm.project;
    if (!projectId) {
      alert("Project is required to import towers.");
      e.target.value = "";
      return;
    }

    const fd = new FormData();
    fd.append("file", file);
    fd.append("project_id", projectId);

    try {
      setTowerExcelUploading(true);
      const res = await axiosInstance.post("client/towers/upload-excel/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const data = res.data || {};
      let msg = `Towers import done.
Created: ${data.created_towers || 0}
Updated: ${data.updated_towers || 0}`;
      if (Array.isArray(data.errors) && data.errors.length) {
        const first = data.errors[0];
        msg += `\nSome rows had errors. Example (row ${
          first.row
        }): ${first.errors.join(", ")}`;
      }
      alert(msg);
      await loadAll({ admin_id: isStaff ? adminIdForScope : undefined });
    } catch (err) {
      console.error(err);
      const apiMsg =
        err.response?.data?.detail ||
        err.response?.data?.error ||
        JSON.stringify(err.response?.data) ||
        "Failed to import towers from Excel.";
      alert(apiMsg);
    } finally {
      setTowerExcelUploading(false);
      e.target.value = "";
    }
  };


  /* -------------- FLOOR form (+document) -------------- */
  const [floorForm, setFloorForm] = useState({
    tower: "",
    number: "",
    total_units: "",
    status: "",
    notes: "",
  });
  const [floorDocFile, setFloorDocFile] = useState(null);
  const fileInputRef = useRef(null);
  // Excel upload refs
  const projectExcelInputRef = useRef(null);
  const towerExcelInputRef = useRef(null);
  const floorExcelInputRef = useRef(null);

  const unitExcelInputRef = useRef(null);

  // Excel upload loading flags
  const [projectExcelUploading, setProjectExcelUploading] = useState(false);
  const [towerExcelUploading, setTowerExcelUploading] = useState(false);
  const [floorExcelUploading, setFloorExcelUploading] = useState(false);
const [unitExcelUploading, setUnitExcelUploading] = useState(false);

  const handleAddFloor = async () => {
    try {
      const payload = {
        tower: Number(floorForm.tower),
        number: String(floorForm.number),
        total_units: floorForm.total_units ? Number(floorForm.total_units) : 0,
        status: floorForm.status || "DRAFT",
        notes: floorForm.notes || "",
      };
      if (!payload.tower || !payload.number) {
        alert("Tower and Floor Number are required");
        return;
      }

      const floor = await FloorAPI.create(payload);

      // Upload doc (axiosInstance handles baseURL + token)
      if (floorDocFile) {
        const fd = new FormData();
        fd.append("floor", floor.id);
        fd.append("file", floorDocFile);
        await axiosInstance.post("client/floor-docs/", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Floor created");
      setFloorForm({
        tower: floorForm.tower,
        number: "",
        total_units: "",
        status: "",
        notes: "",
      });
      setFloorDocFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      await loadAll({ admin_id: isStaff ? adminIdForScope : undefined });
    } catch (e) {
      console.error(e);
      alert("Failed to create floor");
    }
  };

  const handleFloorExcelClick = () => {
    if (floorExcelUploading) return;
    if (!floorForm.tower) {
      alert(
        "Please select any Tower (Floor Setup) for the project you want to import floors for."
      );
      return;
    }
    floorExcelInputRef.current?.click();
  };

  const handleFloorExcelChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const towerId = floorForm.tower;
    const projectId = towerId ? projectIdByTowerId[Number(towerId)] : null;

    if (!projectId) {
      alert(
        "Could not detect project for the selected tower. Please ensure the tower belongs to a project."
      );
      e.target.value = "";
      return;
    }

    const fd = new FormData();
    fd.append("file", file);
    fd.append("project_id", projectId);

    try {
      setFloorExcelUploading(true);
      const res = await axiosInstance.post("client/floors/upload-excel/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const data = res.data || {};
      let msg = `Floors import done.
Created: ${data.created_floors || 0}
Updated: ${data.updated_floors || 0}`;
      if (Array.isArray(data.errors) && data.errors.length) {
        const first = data.errors[0];
        msg += `\nSome rows had errors. Example (row ${
          first.row
        }): ${first.errors.join(", ")}`;
      }
      alert(msg);
      await loadAll({ admin_id: isStaff ? adminIdForScope : undefined });
    } catch (err) {
      console.error(err);
      const apiMsg =
        err.response?.data?.detail ||
        err.response?.data?.error ||
        JSON.stringify(err.response?.data) ||
        "Failed to import floors from Excel.";
      alert(apiMsg);
    } finally {
      setFloorExcelUploading(false);
      e.target.value = "";
    }
  };


  /* -------------- UNIT form -------------- */
  const [unitForm, setUnitForm] = useState({
    project: "",
    tower: "",
    floor: "",
    unit_no: "",
    unit_type: "",
    carpet_sqft: "",
    builtup_sqft: "",
    rera_sqft: "",
    facing: "",
    parking_type: "",
    agreement_value: "",
    construction_start: "",
    completion_date: "",
    status: "",
    notes: "",
  });

  // keep tower/floor in sync with selected project
  const projectTowers = useMemo(
    () =>
      unitForm.project ? towersByProject[Number(unitForm.project)] || [] : [],
    [unitForm.project, towersByProject]
  );
  const towerFloors = useMemo(
    () => (unitForm.tower ? floorsByTower[Number(unitForm.tower)] || [] : []),
    [unitForm.tower, floorsByTower]
  );

  const handleAddUnit = async () => {
    try {
      const payload = {
        project: Number(unitForm.project),
        tower: Number(unitForm.tower),
        floor: Number(unitForm.floor),
        unit_no: unitForm.unit_no,
        unit_type: unitForm.unit_type ? Number(unitForm.unit_type) : null,
        carpet_sqft: unitForm.carpet_sqft ? Number(unitForm.carpet_sqft) : null,
        builtup_sqft: unitForm.builtup_sqft
          ? Number(unitForm.builtup_sqft)
          : null,
        rera_sqft: unitForm.rera_sqft ? Number(unitForm.rera_sqft) : null,
        facing: unitForm.facing ? Number(unitForm.facing) : null,
        parking_type: unitForm.parking_type
          ? Number(unitForm.parking_type)
          : null,
        agreement_value: unitForm.agreement_value
          ? Number(unitForm.agreement_value)
          : null,
        construction_start: unitForm.construction_start || null,
        completion_date: unitForm.completion_date || null,
        status: unitForm.status || "NOT_RELEASED",
        notes: unitForm.notes || "",
      };
      const required = ["project", "tower", "floor", "unit_no"];
      for (const k of required) {
        if (!payload[k])
          return alert("Project, Tower, Floor, Unit Number are required");
      }
      await UnitAPI.create(payload);
      alert("Unit created");
      setUnitForm((u) => ({
        ...u,
        unit_no: "",
        unit_type: "",
        carpet_sqft: "",
        builtup_sqft: "",
        rera_sqft: "",
        facing: "",
        parking_type: "",
        agreement_value: "",
        construction_start: "",
        completion_date: "",
        status: "",
        notes: "",
      }));
    } catch (e) {
      console.error(e);
      alert("Failed to create unit");
    }
  };


  const handleUnitExcelClick = () => {
    if (unitExcelUploading) return;
    if (!unitForm.project) {
      alert("Please select Project in Unit Setup before importing Excel.");
      return;
    }
    unitExcelInputRef.current?.click();
  };

  const handleUnitExcelChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const projectId = unitForm.project;
    if (!projectId) {
      alert("Project is required to import units.");
      e.target.value = "";
      return;
    }

    const fd = new FormData();
    fd.append("file", file);
    fd.append("project_id", projectId);

    try {
      setUnitExcelUploading(true);
      const res = await axiosInstance.post("client/units/upload-excel/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = res.data || {};
      let msg = `Units import done.
Created: ${data.created_units || 0}
Updated: ${data.updated_units || 0}`;

      if (Array.isArray(data.errors) && data.errors.length) {
        const first = data.errors[0];
        msg += `\nSome rows had errors. Example (row ${
          first.row
        }): ${first.errors.join(", ")}`;
      }

      alert(msg);

      // reload tree so project/tower/floor/unit lists get updated
      await loadAll({ admin_id: isStaff ? adminIdForScope : undefined });
    } catch (err) {
      console.error(err);
      const apiMsg =
        err.response?.data?.detail ||
        err.response?.data?.error ||
        JSON.stringify(err.response?.data) ||
        "Failed to import units from Excel.";
      alert(apiMsg);
    } finally {
      setUnitExcelUploading(false);
      e.target.value = "";
    }
  };

  /* -------------- PAYMENT form -------------- */
  const [paymentPlanForm, setPaymentPlanForm] = useState({
    code: "",
    name: "",
    project: "",
  });
  const [paymentSlabs, setPaymentSlabs] = useState([
    { name: "", percentage: "" },
  ]);

  const addPaymentSlab = () =>
    setPaymentSlabs((s) => [...s, { name: "", percentage: "" }]);
  const delPaymentSlab = (i) =>
    setPaymentSlabs((s) => s.filter((_, idx) => idx !== i));

  const handleSavePayment = async () => {
    try {
      if (
        !paymentPlanForm.code ||
        !paymentPlanForm.name ||
        !paymentPlanForm.project
      ) {
        alert("Plan ID, Plan Name and Project are required");
        return;
      }
      const sum = paymentSlabs.reduce(
        (acc, s) => acc + (s.percentage ? Number(s.percentage) : 0),
        0
      );
      if (sum > 100.0001) {
        alert("Total percentage cannot exceed 100");
        return;
      }
      const plan = await PaymentAPI.createPlan({
        code: paymentPlanForm.code,
        name: paymentPlanForm.name,
        project: Number(paymentPlanForm.project),
      });
      for (let i = 0; i < paymentSlabs.length; i++) {
        const s = paymentSlabs[i];
        if (!s.name || !s.percentage) continue;
        await PaymentAPI.createSlab({
          plan: plan.id,
          order_index: i + 1,
          name: s.name,
          percentage: Number(s.percentage),
        });
      }
      alert("Payment plan saved");
      setPaymentPlanForm({ code: "", name: "", project: "" });
      setPaymentSlabs([{ name: "", percentage: "" }]);
    } catch (e) {
      console.error(e);
      alert("Failed to save payment plan");
    }
  };

  /* -------------- MILESTONE form + list -------------- */
  const [milestoneForm, setMilestoneForm] = useState({
    name: "",
    project: "",
    tower: "",
    start_date: "",
    end_date: "",
    responsible_user: "", // user id
    amount: "",
    calc_mode: "PERCENTAGE",
    enable_pg_integration: false,
    verified_by: "",
    verified_date: "",
    status: "DRAFT",
    notes: "",
  });
  const [milestoneSlabs, setMilestoneSlabs] = useState([
    { name: "", percentage: "", amount: "", remarks: "" },
  ]);

  const addMilestoneSlab = () =>
    setMilestoneSlabs((s) => [
      ...s,
      { name: "", percentage: "", amount: "", remarks: "" },
    ]);
  const delMilestoneSlab = (i) =>
    setMilestoneSlabs((s) => s.filter((_, idx) => idx !== i));

  // Existing milestone plans from API
  const [milestonePlans, setMilestonePlans] = useState([]);
  const loadMilestonePlans = async () => {
    try {
      // adapt to your endpoints; most backends return {results: []} or []
      const d = await MilestoneAPI.list?.();
      setMilestonePlans(Array.isArray(d) ? d : d?.results || []);
    } catch (e) {
      console.warn("Could not load milestone plans", e);
    }
  };
  useEffect(() => {
    if (openSections.milestone) loadMilestonePlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSections.milestone]);

  const handleSaveMilestone = async () => {
    try {
      if (
        !milestoneForm.name ||
        !milestoneForm.project ||
        !milestoneForm.responsible_user
      ) {
        alert("Milestone Name, Project, Responsible User are required");
        return;
      }
      const usingPct = milestoneForm.calc_mode === "PERCENTAGE";
      if (usingPct) {
        const sum = milestoneSlabs.reduce(
          (acc, s) => acc + (s.percentage ? Number(s.percentage) : 0),
          0
        );
        if (sum > 100.0001) {
          alert("Total percentage cannot exceed 100");
          return;
        }
      }

      const plan = await MilestoneAPI.createPlan({
        name: milestoneForm.name,
        project: Number(milestoneForm.project),
        tower: milestoneForm.tower ? Number(milestoneForm.tower) : null,
        start_date: milestoneForm.start_date || null,
        end_date: milestoneForm.end_date || null,
        responsible_user: Number(milestoneForm.responsible_user),
        calc_mode: milestoneForm.calc_mode,
        amount: usingPct ? null : Number(milestoneForm.amount || 0),
        enable_pg_integration: !!milestoneForm.enable_pg_integration,
        verified_by: milestoneForm.verified_by
          ? Number(milestoneForm.verified_by)
          : null,
        verified_date: milestoneForm.verified_date || null,
        status: milestoneForm.status || "DRAFT",
        notes: milestoneForm.notes || "",
      });

      for (let i = 0; i < milestoneSlabs.length; i++) {
        const s = milestoneSlabs[i];
        if (!s.name) continue;
        const payload = {
          plan: plan.id,
          order_index: i + 1,
          name: s.name,
          remarks: s.remarks || "",
        };
        if (usingPct) {
          if (!s.percentage) continue;
          payload.percentage = Number(s.percentage);
        } else {
          if (!s.amount) continue;
          payload.amount = Number(s.amount);
        }
        await MilestoneAPI.createSlab(payload);
      }

      alert("Milestone plan saved");
      setMilestoneForm({
        name: "",
        project: "",
        tower: "",
        start_date: "",
        end_date: "",
        responsible_user: "",
        amount: "",
        calc_mode: "PERCENTAGE",
        enable_pg_integration: false,
        verified_by: "",
        verified_date: "",
        status: "DRAFT",
        notes: "",
      });
      setMilestoneSlabs([
        { name: "", percentage: "", amount: "", remarks: "" },
      ]);
      await loadMilestonePlans();
    } catch (e) {
      console.error(e);
      alert("Failed to save milestone");
    }
  };

  /* -------------- BANK create-all form -------------- */
  const [bankForm, setBankForm] = useState({
    // project link
    project: "",
    apf_number: "",
    project_bank_status: "ACTIVE",

    // bank master
    bank_code: "",
    bank_name: "",
    bank_type: "",
    bank_category: "",

    // branch
    branch_name: "",
    branch_code: "",
    ifsc: "",
    micr: "",
    address: "",
    contact_name: "",
    contact_phone: "",
    contact_email: "",

    // loan products
    productIds: [],
  });

  const loanProducts = setup?.lookups?.loan_products || [];
  const users = useMemo(() => {
    const u = setup?.users;
    if (!u) return [];
    if (Array.isArray(u)) return u;
    if (Array.isArray(u.items)) return u.items;
    return [];
  }, [setup]);
  const toggleProduct = (id) =>
    setBankForm((b) => {
      const exists = b.productIds.includes(id);
      return {
        ...b,
        productIds: exists
          ? b.productIds.filter((x) => x !== id)
          : [...b.productIds, id],
      };
    });

  const handleSaveBankAll = async () => {
    try {
      if (!bankForm.project || !bankForm.bank_code || !bankForm.bank_name) {
        alert("Project, Bank ID, Bank Name are required");
        return;
      }
      const payload = {
        bank: {
          code: bankForm.bank_code,
          name: bankForm.bank_name,
          bank_type: bankForm.bank_type ? Number(bankForm.bank_type) : null,
          bank_category: bankForm.bank_category
            ? Number(bankForm.bank_category)
            : null,
        },
        branch: {
          branch_name: bankForm.branch_name || "",
          branch_code: bankForm.branch_code || "",
          ifsc: bankForm.ifsc || "",
          micr: bankForm.micr || "",
          address: bankForm.address || "",
          contact_name: bankForm.contact_name || "",
          contact_phone: bankForm.contact_phone || "",
          contact_email: bankForm.contact_email || "",
        },
        project_link: {
          project: Number(bankForm.project),
          apf_number: bankForm.apf_number || "",
          status: bankForm.project_bank_status || "ACTIVE",
          product_ids: bankForm.productIds,
        },
      };
      await BankAPI.createAll(payload);
      alert("Bank + Branch + Project Link created");
      setBankForm({
        project: "",
        apf_number: "",
        project_bank_status: "ACTIVE",
        bank_code: "",
        bank_name: "",
        bank_type: "",
        bank_category: "",
        branch_name: "",
        branch_code: "",
        ifsc: "",
        micr: "",
        address: "",
        contact_name: "",
        contact_phone: "",
        contact_email: "",
        productIds: [],
      });
    } catch (e) {
      console.error(e);
      alert("Failed to save bank");
    }
  };

  /* -------------- NOTIFICATIONS (optional list) -------------- */
  const [notifications, setNotifications] = useState([]);
  const loadNotifications = async () => {
    try {
      const d = await NotificationAPI.list();
      setNotifications(Array.isArray(d) ? d : d?.results || []);
    } catch (e) {
      /* ignore for now */
    }
  };
  useEffect(() => {
    if (openSections.notification) loadNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSections.notification]);

  if (loading) {
    return (
      <div className="setup-page">
        <div className="setup-container">Loading...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="setup-page">
        <div className="setup-container" style={{ color: "crimson" }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="setup-page">
      <div className="setup-container">
        <SalesSubnav
          section={section}
          active={activeItem}
          onSectionChange={(s) => {
            setSection(s);
            // optional: navigate by router
            // navigate(s === "pre" ? "/pre" : "/post");
          }}
          onNavigate={(key) => {
            setActiveItem(key);
            // optional: navigate by router based on key
            // navigate(`/pre/${key}`);
          }}
        />
        {/* Staff helper to load scope by admin_id */}
        {isStaff && (
          <div
            style={{
              marginBottom: 16,
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <input
              className="form-input"
              placeholder="Admin ID for scope"
              value={adminIdForScope}
              onChange={(e) => setAdminIdForScope(e.target.value)}
              style={{ maxWidth: 220 }}
            />
            <button className="btn-secondary" onClick={handleLoadScopeForAdmin}>
              Load Admin Scope
            </button>
          </div>
        )}

        {/* ---------- Project Setup ---------- */}
        <div className="setup-section">
          <button
            onClick={() => toggleSection("project")}
            className="section-header"
          >
            <h2 className="section-title">Project Setup</h2>
            <svg
              className={`chevron-icon ${
                openSections.project ? "rotated" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {openSections.project && (
            <div className="section-content">
              <div className="content-header">
                <h3 className="content-title">Add Projects</h3>
                <div className="header-actions">
                  <a
                    href="/api/client/projects/sample-excel/"
                    className="sample-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download Sample
                  </a>

                  <button
                    type="button"
                    className="import-btn"
                    onClick={handleProjectExcelClick}
                    disabled={projectExcelUploading}
                  >
                    <svg
                      className="btn-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    {projectExcelUploading ? "IMPORTING..." : "IMPORT EXCEL"}
                  </button>

                  <input
                    ref={projectExcelInputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    style={{ display: "none" }}
                    onChange={handleProjectExcelChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Project ID</label>
                  <input
                    type="text"
                    placeholder="(auto / your choice)"
                    className="form-input"
                    disabled
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">
                    Project Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter project name"
                    className="form-input"
                    value={projectForm.name}
                    onChange={(e) =>
                      setProjectForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="form-input"
                    value={projectForm.location}
                    onChange={(e) =>
                      setProjectForm((f) => ({
                        ...f,
                        location: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Project Type</label>
                  <select
                    className="form-input"
                    value={projectForm.project_type}
                    onChange={(e) =>
                      setProjectForm((f) => ({
                        ...f,
                        project_type: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select</option>
                    {setup?.lookups?.project_types?.map((pt) => (
                      <option key={pt.id} value={pt.id}>
                        {pt.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Developer</label>
                  <input
                    type="text"
                    placeholder="Enter developer name"
                    className="form-input"
                    value={projectForm.developer}
                    onChange={(e) =>
                      setProjectForm((f) => ({
                        ...f,
                        developer: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">RERA No</label>
                  <input
                    type="text"
                    placeholder="Enter RERA number"
                    className="form-input"
                    value={projectForm.rera_no}
                    onChange={(e) =>
                      setProjectForm((f) => ({ ...f, rera_no: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={projectForm.start_date}
                    onChange={(e) =>
                      setProjectForm((f) => ({
                        ...f,
                        start_date: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={projectForm.end_date}
                    onChange={(e) =>
                      setProjectForm((f) => ({
                        ...f,
                        end_date: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Possession Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={projectForm.possession_date}
                    onChange={(e) =>
                      setProjectForm((f) => ({
                        ...f,
                        possession_date: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="form-row form-row-2">
                <div className="form-field">
                  <label className="form-label">Project Status</label>
                  <select
                    className="form-input"
                    value={projectForm.status}
                    onChange={(e) =>
                      setProjectForm((f) => ({ ...f, status: e.target.value }))
                    }
                  >
                    <option value="">Select</option>
                    {setup?.statuses?.project?.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Approval Status</label>
                  <select
                    className="form-input"
                    value={projectForm.approval_status}
                    onChange={(e) =>
                      setProjectForm((f) => ({
                        ...f,
                        approval_status: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select</option>
                    {setup?.statuses?.approval?.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {isStaff && (
                <div className="form-row form-row-2">
                  <div className="form-field">
                    <label className="form-label">
                      Admin ID (Owner) <span className="required">*</span>
                    </label>
                    <input
                      className="form-input"
                      placeholder="Admin user id"
                      value={projectForm.admin_id}
                      onChange={(e) =>
                        setProjectForm((f) => ({
                          ...f,
                          admin_id: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              )}

              <div className="form-field-full">
                <label className="form-label">Note</label>
                <textarea
                  rows="3"
                  placeholder="Add notes"
                  className="form-textarea"
                  value={projectForm.notes}
                  onChange={(e) =>
                    setProjectForm((f) => ({ ...f, notes: e.target.value }))
                  }
                />
              </div>

              <div className="form-actions">
                <button className="btn-primary" onClick={handleAddProject}>
                  ADD PROJECT
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ---------- Tower Setup ---------- */}
        <div className="setup-section">
          <button
            onClick={() => toggleSection("tower")}
            className="section-header"
          >
            <h2 className="section-title">Tower Setup</h2>
            <svg
              className={`chevron-icon ${openSections.tower ? "rotated" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {openSections.tower && (
            <div className="section-content">
              <div className="content-header">
                <h3 className="content-title">Add Tower</h3>
                <div className="header-actions">
                  <a
                    href="/api/client/towers/sample-excel/"
                    className="sample-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download Sample
                  </a>

                  <button
                    type="button"
                    className="import-btn"
                    onClick={handleTowerExcelClick}
                    disabled={towerExcelUploading}
                  >
                    <svg
                      className="btn-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    {towerExcelUploading ? "IMPORTING..." : "IMPORT EXCEL"}
                  </button>

                  <input
                    ref={towerExcelInputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    style={{ display: "none" }}
                    onChange={handleTowerExcelChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Tower ID</label>
                  <input
                    type="text"
                    placeholder="(auto / your choice)"
                    className="form-input"
                    disabled
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">
                    Tower Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter tower name"
                    className="form-input"
                    value={towerForm.name}
                    onChange={(e) =>
                      setTowerForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Tower Type</label>
                  <select
                    className="form-input"
                    value={towerForm.tower_type}
                    onChange={(e) =>
                      setTowerForm((f) => ({
                        ...f,
                        tower_type: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select</option>
                    {setup?.lookups?.tower_types?.map((tt) => (
                      <option key={tt.id} value={tt.id}>
                        {tt.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">
                    Select Project <span className="required">*</span>
                  </label>
                  <select
                    className="form-input"
                    value={towerForm.project}
                    onChange={(e) =>
                      setTowerForm((f) => ({ ...f, project: e.target.value }))
                    }
                  >
                    <option value="">Select Project</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Total Floors</label>
                  <input
                    type="number"
                    placeholder="Enter total floors"
                    className="form-input"
                    value={towerForm.total_floors}
                    onChange={(e) =>
                      setTowerForm((f) => ({
                        ...f,
                        total_floors: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Status</label>
                  <select
                    className="form-input"
                    value={towerForm.status}
                    onChange={(e) =>
                      setTowerForm((f) => ({ ...f, status: e.target.value }))
                    }
                  >
                    <option value="">Select</option>
                    {setup?.statuses?.floor?.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-field-full">
                <label className="form-label">Note</label>
                <textarea
                  rows="3"
                  placeholder="Add notes"
                  className="form-textarea"
                  value={towerForm.notes}
                  onChange={(e) =>
                    setTowerForm((f) => ({ ...f, notes: e.target.value }))
                  }
                />
              </div>

              <div className="form-actions">
                <button className="btn-primary" onClick={handleAddTower}>
                  ADD TOWER
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ---------- Floor Setup ---------- */}
        <div className="setup-section">
          <button
            onClick={() => toggleSection("floor")}
            className="section-header"
          >
            <h2 className="section-title">Floor Setup</h2>
            <svg
              className={`chevron-icon ${openSections.floor ? "rotated" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {openSections.floor && (
            <div className="section-content">
              <div className="content-header">
                <h3 className="content-title">Add Floor</h3>
                <div className="header-actions">
                  <a
                    href="/api/client/floors/sample-excel/"
                    className="sample-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download Sample
                  </a>

                  <button
                    type="button"
                    className="import-btn"
                    onClick={handleFloorExcelClick}
                    disabled={floorExcelUploading}
                  >
                    <svg
                      className="btn-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    {floorExcelUploading ? "IMPORTING..." : "IMPORT EXCEL"}
                  </button>

                  <input
                    ref={floorExcelInputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    style={{ display: "none" }}
                    onChange={handleFloorExcelChange}
                  />
                </div>
                <button
                  type="button"
                  className="import-btn"
                  onClick={handleFloorExcelClick}
                  disabled={floorExcelUploading}
                >
                  <svg
                    className="btn-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  {floorExcelUploading ? "IMPORTING..." : "IMPORT EXCEL"}
                </button>
                <input
                  type="file"
                  ref={floorExcelInputRef}
                  accept=".xlsx,.xls"
                  style={{ display: "none" }}
                  onChange={handleFloorExcelChange}
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Floor ID</label>
                  <input
                    type="text"
                    placeholder="(auto / your choice)"
                    className="form-input"
                    disabled
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">
                    Select Tower <span className="required">*</span>
                  </label>
                  <select
                    className="form-input"
                    value={floorForm.tower}
                    onChange={(e) =>
                      setFloorForm((f) => ({ ...f, tower: e.target.value }))
                    }
                  >
                    <option value="">Select Tower</option>
                    {projects.flatMap((p) =>
                      (p.towers || []).map((t) => (
                        <option key={t.id} value={t.id}>
                          {p.name} - {t.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">
                    Floor Number <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., G, 1, 12A"
                    className="form-input"
                    value={floorForm.number}
                    onChange={(e) =>
                      setFloorForm((f) => ({ ...f, number: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Total Units (on Floor)</label>
                  <input
                    type="number"
                    placeholder="Enter total units"
                    className="form-input"
                    value={floorForm.total_units}
                    onChange={(e) =>
                      setFloorForm((f) => ({
                        ...f,
                        total_units: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Status</label>
                  <select
                    className="form-input"
                    value={floorForm.status}
                    onChange={(e) =>
                      setFloorForm((f) => ({ ...f, status: e.target.value }))
                    }
                  >
                    <option value="">Select</option>
                    {setup?.statuses?.floor?.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Floor Plan Document</label>
                  <div
                    className="file-upload-box"
                    onClick={() => fileInputRef.current?.click()}
                    title="Click to choose file"
                  >
                    <svg
                      className="upload-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="upload-text">
                      {floorDocFile
                        ? floorDocFile.name
                        : "Click to browse file"}
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf,image/*"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      setFloorDocFile(e.target.files?.[0] || null)
                    }
                  />
                </div>
              </div>

              <div className="form-field-full">
                <label className="form-label">Note</label>
                <textarea
                  rows="3"
                  placeholder="Add notes"
                  className="form-textarea"
                  value={floorForm.notes}
                  onChange={(e) =>
                    setFloorForm((f) => ({ ...f, notes: e.target.value }))
                  }
                />
              </div>

              <div className="form-actions">
                <button className="btn-primary" onClick={handleAddFloor}>
                  ADD FLOOR
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ---------- Unit Setup ---------- */}
        <div className="setup-section">
          <button
            onClick={() => toggleSection("unit")}
            className="section-header"
          >
            <h2 className="section-title">Flats/ Unit Setup</h2>
            <svg
              className={`chevron-icon ${openSections.unit ? "rotated" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {openSections.unit && (
            <div className="section-content">
              <div className="content-header">
                <h3 className="content-title">Add Unit</h3>
                <div className="header-actions">
                  <a
                    href="/api/client/units/sample-excel/"
                    className="sample-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download Sample
                  </a>

                  <button
                    type="button"
                    className="import-btn"
                    onClick={handleUnitExcelClick}
                    disabled={unitExcelUploading}
                  >
                    <svg
                      className="btn-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    {unitExcelUploading ? "IMPORTING..." : "IMPORT EXCEL"}
                  </button>

                  <input
                    ref={unitExcelInputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    style={{ display: "none" }}
                    onChange={handleUnitExcelChange}
                  />
                </div>
                <button
                  type="button"
                  className="import-btn"
                  onClick={handleUnitExcelClick}
                  disabled={unitExcelUploading}
                >
                  <svg
                    className="btn-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  {unitExcelUploading ? "IMPORTING..." : "IMPORT EXCEL"}
                </button>

                <input
                  type="file"
                  ref={unitExcelInputRef}
                  accept=".xlsx,.xls"
                  style={{ display: "none" }}
                  onChange={handleUnitExcelChange}
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Unit ID</label>
                  <input
                    type="text"
                    placeholder="(auto / your choice)"
                    className="form-input"
                    disabled
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">
                    Select Project <span className="required">*</span>
                  </label>
                  <select
                    className="form-input"
                    value={unitForm.project}
                    onChange={(e) =>
                      setUnitForm((f) => ({
                        ...f,
                        project: e.target.value,
                        tower: "",
                        floor: "",
                      }))
                    }
                  >
                    <option value="">Select Project</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">
                    Select Tower <span className="required">*</span>
                  </label>
                  <select
                    className="form-input"
                    value={unitForm.tower}
                    onChange={(e) =>
                      setUnitForm((f) => ({
                        ...f,
                        tower: e.target.value,
                        floor: "",
                      }))
                    }
                  >
                    <option value="">Select Tower</option>
                    {projectTowers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">
                    Select Floor <span className="required">*</span>
                  </label>
                  <select
                    className="form-input"
                    value={unitForm.floor}
                    onChange={(e) =>
                      setUnitForm((f) => ({ ...f, floor: e.target.value }))
                    }
                  >
                    <option value="">Select Floor</option>
                    {towerFloors.map((fl) => (
                      <option key={fl.id} value={fl.id}>
                        {fl.number}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Unit Number</label>
                  <input
                    type="text"
                    placeholder="Enter unit number"
                    className="form-input"
                    value={unitForm.unit_no}
                    onChange={(e) =>
                      setUnitForm((f) => ({ ...f, unit_no: e.target.value }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Unit Type</label>
                  <select
                    className="form-input"
                    value={unitForm.unit_type}
                    onChange={(e) =>
                      setUnitForm((f) => ({ ...f, unit_type: e.target.value }))
                    }
                  >
                    <option value="">Select</option>
                    {setup?.lookups?.unit_types?.map((ut) => (
                      <option key={ut.id} value={ut.id}>
                        {ut.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Carpet Area (sq. ft.)</label>
                  <input
                    type="number"
                    placeholder="Enter carpet area"
                    className="form-input"
                    value={unitForm.carpet_sqft}
                    onChange={(e) =>
                      setUnitForm((f) => ({
                        ...f,
                        carpet_sqft: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Built Up Area (sq. ft.)</label>
                  <input
                    type="number"
                    placeholder="Enter built-up area"
                    className="form-input"
                    value={unitForm.builtup_sqft}
                    onChange={(e) =>
                      setUnitForm((f) => ({
                        ...f,
                        builtup_sqft: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">RERA Area (sq. ft.)</label>
                  <input
                    type="number"
                    placeholder="Enter RERA area"
                    className="form-input"
                    value={unitForm.rera_sqft}
                    onChange={(e) =>
                      setUnitForm((f) => ({ ...f, rera_sqft: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Facing</label>
                  <select
                    className="form-input"
                    value={unitForm.facing}
                    onChange={(e) =>
                      setUnitForm((f) => ({ ...f, facing: e.target.value }))
                    }
                  >
                    <option value="">Select</option>
                    {setup?.lookups?.facings?.map((fc) => (
                      <option key={fc.id} value={fc.id}>
                        {fc.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Parking Type</label>
                  <select
                    className="form-input"
                    value={unitForm.parking_type}
                    onChange={(e) =>
                      setUnitForm((f) => ({
                        ...f,
                        parking_type: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select</option>
                    {setup?.lookups?.parking_types?.map((pk) => (
                      <option key={pk.id} value={pk.id}>
                        {pk.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Agreement Value</label>
                  <input
                    type="number"
                    placeholder="Enter value"
                    className="form-input"
                    value={unitForm.agreement_value}
                    onChange={(e) =>
                      setUnitForm((f) => ({
                        ...f,
                        agreement_value: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Construction Start Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={unitForm.construction_start}
                    onChange={(e) =>
                      setUnitForm((f) => ({
                        ...f,
                        construction_start: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Completion Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={unitForm.completion_date}
                    onChange={(e) =>
                      setUnitForm((f) => ({
                        ...f,
                        completion_date: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Status</label>
                  <select
                    className="form-input"
                    value={unitForm.status}
                    onChange={(e) =>
                      setUnitForm((f) => ({ ...f, status: e.target.value }))
                    }
                  >
                    <option value="">Select</option>
                    {setup?.statuses?.unit?.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-field-full">
                <label className="form-label">Note</label>
                <textarea
                  rows="3"
                  placeholder="Add notes"
                  className="form-textarea"
                  value={unitForm.notes}
                  onChange={(e) =>
                    setUnitForm((f) => ({ ...f, notes: e.target.value }))
                  }
                />
              </div>

              <div className="form-actions">
                <button className="btn-primary" onClick={handleAddUnit}>
                  SAVE UNIT
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ---------- Payment Setup ---------- */}
        <div className="setup-section">
          <button
            onClick={() => toggleSection("payment")}
            className="section-header"
          >
            <h2 className="section-title">Payment Setup</h2>
            <svg
              className={`chevron-icon ${
                openSections.payment ? "rotated" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {openSections.payment && (
            <div className="section-content">
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">
                    Payment Plan ID <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., PPL001"
                    className="form-input"
                    value={paymentPlanForm.code}
                    onChange={(e) =>
                      setPaymentPlanForm((p) => ({
                        ...p,
                        code: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">
                    Payment Plan Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter plan name"
                    className="form-input"
                    value={paymentPlanForm.name}
                    onChange={(e) =>
                      setPaymentPlanForm((p) => ({
                        ...p,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">
                    Select Project <span className="required">*</span>
                  </label>
                  <select
                    className="form-input"
                    value={paymentPlanForm.project}
                    onChange={(e) =>
                      setPaymentPlanForm((p) => ({
                        ...p,
                        project: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-field-full">
                <label className="form-label">Slabs</label>
                {paymentSlabs.map((s, idx) => (
                  <div className="slab-inputs" key={idx}>
                    <input
                      type="text"
                      placeholder="Name"
                      className="form-input"
                      value={s.name}
                      onChange={(e) =>
                        setPaymentSlabs((all) =>
                          all.map((x, i) =>
                            i === idx ? { ...x, name: e.target.value } : x
                          )
                        )
                      }
                    />
                    <input
                      type="number"
                      placeholder="Percentage"
                      className="form-input"
                      value={s.percentage}
                      onChange={(e) =>
                        setPaymentSlabs((all) =>
                          all.map((x, i) =>
                            i === idx ? { ...x, percentage: e.target.value } : x
                          )
                        )
                      }
                    />
                    <button
                      className="btn-delete-slab"
                      onClick={() => delPaymentSlab(idx)}
                    >
                      DELETE
                    </button>
                  </div>
                ))}
                <button className="btn-add-slab" onClick={addPaymentSlab}>
                  ADD SLAB
                </button>
              </div>

              <div className="form-actions-group">
                <button className="btn-primary" onClick={handleSavePayment}>
                  ADD
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setPaymentPlanForm({ code: "", name: "", project: "" });
                    setPaymentSlabs([{ name: "", percentage: "" }]);
                  }}
                >
                  CANCEL
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ---------- Milestone Plan Creation ---------- */}
        <div className="setup-section">
          <button
            onClick={() => toggleSection("milestone")}
            className="section-header"
          >
            <h2 className="section-title">Milestone Plan Creation</h2>
            <svg
              className={`chevron-icon ${
                openSections.milestone ? "rotated" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {openSections.milestone && (
            <div className="section-content">
              {/* Existing milestone plans */}
              <div className="table-wrapper" style={{ marginBottom: 16 }}>
                <h4 className="content-title" style={{ marginBottom: 8 }}>
                  Existing Milestone Plans
                </h4>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Project</th>
                      <th>Tower</th>
                      <th>Mode</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {milestonePlans.length ? (
                      milestonePlans.map((m) => (
                        <tr key={m.id}>
                          <td>{m.id}</td>
                          <td>{m.name}</td>
                          <td>{m.project_name || m.project}</td>
                          <td>{m.tower_name || m.tower || "-"}</td>
                          <td>{m.calc_mode}</td>
                          <td>{m.amount ?? "-"}</td>
                          <td>{m.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7}>No plans found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Create / edit form */}
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">
                    Milestone Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter milestone name"
                    className="form-input"
                    value={milestoneForm.name}
                    onChange={(e) =>
                      setMilestoneForm((m) => ({ ...m, name: e.target.value }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">
                    Select Project <span className="required">*</span>
                  </label>
                  <select
                    className="form-input"
                    value={milestoneForm.project}
                    onChange={(e) =>
                      setMilestoneForm((m) => ({
                        ...m,
                        project: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Select Tower</label>
                  <select
                    className="form-input"
                    value={milestoneForm.tower}
                    onChange={(e) =>
                      setMilestoneForm((m) => ({ ...m, tower: e.target.value }))
                    }
                  >
                    <option value="">All Towers</option>
                    {projects
                      .find(
                        (p) => String(p.id) === String(milestoneForm.project)
                      )
                      ?.towers?.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={milestoneForm.start_date}
                    onChange={(e) =>
                      setMilestoneForm((m) => ({
                        ...m,
                        start_date: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={milestoneForm.end_date}
                    onChange={(e) =>
                      setMilestoneForm((m) => ({
                        ...m,
                        end_date: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Responsible User</label>
                  <select
                    className="form-input"
                    value={milestoneForm.responsible_user}
                    onChange={(e) =>
                      setMilestoneForm((m) => ({
                        ...m,
                        responsible_user: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select User</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.username} {u.role ? `(${u.role})` : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Total amount when calc_mode = AMOUNT */}
              {milestoneForm.calc_mode === "AMOUNT" && (
                <div className="form-row">
                  <div className="form-field" style={{ maxWidth: 320 }}>
                    <label className="form-label">Total Amount</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="Enter total amount"
                      value={milestoneForm.amount}
                      onChange={(e) =>
                        setMilestoneForm((m) => ({
                          ...m,
                          amount: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              )}

              <div className="form-field-full">
                <label className="form-label">Milestone Slabs</label>
                {milestoneSlabs.map((s, idx) => (
                  <div className="milestone-slab-inputs" key={idx}>
                    <input
                      type="text"
                      placeholder="Name"
                      className="form-input"
                      value={s.name}
                      onChange={(e) =>
                        setMilestoneSlabs((all) =>
                          all.map((x, i) =>
                            i === idx ? { ...x, name: e.target.value } : x
                          )
                        )
                      }
                    />
                    <input
                      type="number"
                      placeholder="Percentage (%)"
                      className="form-input"
                      value={s.percentage}
                      onChange={(e) =>
                        setMilestoneSlabs((all) =>
                          all.map((x, i) =>
                            i === idx ? { ...x, percentage: e.target.value } : x
                          )
                        )
                      }
                      disabled={milestoneForm.calc_mode === "AMOUNT"}
                    />
                    <input
                      type="number"
                      placeholder="Amount"
                      className="form-input"
                      value={s.amount}
                      onChange={(e) =>
                        setMilestoneSlabs((all) =>
                          all.map((x, i) =>
                            i === idx ? { ...x, amount: e.target.value } : x
                          )
                        )
                      }
                      disabled={milestoneForm.calc_mode === "PERCENTAGE"}
                    />
                    <input
                      type="text"
                      placeholder="Remarks"
                      className="form-input"
                      value={s.remarks}
                      onChange={(e) =>
                        setMilestoneSlabs((all) =>
                          all.map((x, i) =>
                            i === idx ? { ...x, remarks: e.target.value } : x
                          )
                        )
                      }
                    />
                    <button
                      className="btn-delete-slab"
                      onClick={() => delMilestoneSlab(idx)}
                    >
                      DELETE
                    </button>
                  </div>
                ))}
                <button className="btn-add-slab" onClick={addMilestoneSlab}>
                  + Add Slab
                </button>
              </div>

              <div className="form-row form-row-2">
                <div className="form-field">
                  <label className="form-label">Verified By</label>
                  <select
                    className="form-input"
                    value={milestoneForm.verified_by}
                    onChange={(e) =>
                      setMilestoneForm((m) => ({
                        ...m,
                        verified_by: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select User</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.username} {u.role ? `(${u.role})` : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Verified Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={milestoneForm.verified_date}
                    onChange={(e) =>
                      setMilestoneForm((m) => ({
                        ...m,
                        verified_date: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="checkbox-wrapper">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={!!milestoneForm.enable_pg_integration}
                    onChange={(e) =>
                      setMilestoneForm((m) => ({
                        ...m,
                        enable_pg_integration: e.target.checked,
                      }))
                    }
                  />
                  <span>Enable Payment Gateway Integration</span>
                </label>
              </div>

              <div className="form-row form-row-2">
                <div className="form-field">
                  <label className="form-label">Calculation Mode</label>
                  <select
                    className="form-input"
                    value={milestoneForm.calc_mode}
                    onChange={(e) =>
                      setMilestoneForm((m) => ({
                        ...m,
                        calc_mode: e.target.value,
                      }))
                    }
                  >
                    {setup?.statuses?.calc_mode?.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Status</label>
                  <select
                    className="form-input"
                    value={milestoneForm.status}
                    onChange={(e) =>
                      setMilestoneForm((m) => ({
                        ...m,
                        status: e.target.value,
                      }))
                    }
                  >
                    {(
                      setup?.statuses?.milestone_plan ||
                      setup?.statuses?.milestone ||
                      []
                    ).map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-field-full">
                <label className="form-label">Notes</label>
                <textarea
                  rows="3"
                  placeholder="Add notes"
                  className="form-textarea"
                  value={milestoneForm.notes}
                  onChange={(e) =>
                    setMilestoneForm((m) => ({ ...m, notes: e.target.value }))
                  }
                />
              </div>

              <div className="form-actions-group">
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setMilestoneForm({
                      name: "",
                      project: "",
                      tower: "",
                      start_date: "",
                      end_date: "",
                      responsible_user: "",
                      amount: "",
                      calc_mode: "PERCENTAGE",
                      enable_pg_integration: false,
                      verified_by: "",
                      verified_date: "",
                      status: "DRAFT",
                      notes: "",
                    });
                    setMilestoneSlabs([
                      { name: "", percentage: "", amount: "", remarks: "" },
                    ]);
                  }}
                >
                  CANCEL
                </button>
                <button className="btn-primary" onClick={handleSaveMilestone}>
                  SAVE MILESTONE
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ---------- Bank Setup ---------- */}
        <div className="setup-section">
          <button
            onClick={() => toggleSection("bank")}
            className="section-header"
          >
            <h2 className="section-title">Bank Setup</h2>
            <svg
              className={`chevron-icon ${openSections.bank ? "rotated" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {openSections.bank && (
            <div className="section-content">
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Project</label>
                  <select
                    className="form-input"
                    value={bankForm.project}
                    onChange={(e) =>
                      setBankForm((b) => ({ ...b, project: e.target.value }))
                    }
                  >
                    <option value="">Select Project</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Bank ID</label>
                  <input
                    className="form-input"
                    placeholder="e.g., BNK001"
                    value={bankForm.bank_code}
                    onChange={(e) =>
                      setBankForm((b) => ({ ...b, bank_code: e.target.value }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Bank Type</label>
                  <select
                    className="form-input"
                    value={bankForm.bank_type}
                    onChange={(e) =>
                      setBankForm((b) => ({ ...b, bank_type: e.target.value }))
                    }
                  >
                    <option value="">Select</option>
                    {setup?.lookups?.bank_types?.map((x) => (
                      <option key={x.id} value={x.id}>
                        {x.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Bank Category</label>
                  <select
                    className="form-input"
                    value={bankForm.bank_category}
                    onChange={(e) =>
                      setBankForm((b) => ({
                        ...b,
                        bank_category: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select</option>
                    {setup?.lookups?.bank_categories?.map((x) => (
                      <option key={x.id} value={x.id}>
                        {x.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Bank Name</label>
                  <input
                    className="form-input"
                    placeholder="Enter bank name"
                    value={bankForm.bank_name}
                    onChange={(e) =>
                      setBankForm((b) => ({ ...b, bank_name: e.target.value }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Branch Name</label>
                  <input
                    className="form-input"
                    placeholder="Enter branch name"
                    value={bankForm.branch_name}
                    onChange={(e) =>
                      setBankForm((b) => ({
                        ...b,
                        branch_name: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Branch Code</label>
                  <input
                    className="form-input"
                    placeholder="Enter branch code"
                    value={bankForm.branch_code}
                    onChange={(e) =>
                      setBankForm((b) => ({
                        ...b,
                        branch_code: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">IFSC Code</label>
                  <input
                    className="form-input"
                    placeholder="Enter IFSC code"
                    value={bankForm.ifsc}
                    onChange={(e) =>
                      setBankForm((b) => ({ ...b, ifsc: e.target.value }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">MICR Code</label>
                  <input
                    className="form-input"
                    placeholder="Enter MICR code"
                    value={bankForm.micr}
                    onChange={(e) =>
                      setBankForm((b) => ({ ...b, micr: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Contact Person</label>
                  <input
                    className="form-input"
                    placeholder="Enter contact name"
                    value={bankForm.contact_name}
                    onChange={(e) =>
                      setBankForm((b) => ({
                        ...b,
                        contact_name: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Contact Phone</label>
                  <input
                    className="form-input"
                    placeholder="Enter phone"
                    value={bankForm.contact_phone}
                    onChange={(e) =>
                      setBankForm((b) => ({
                        ...b,
                        contact_phone: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Contact Email</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Enter email"
                    value={bankForm.contact_email}
                    onChange={(e) =>
                      setBankForm((b) => ({
                        ...b,
                        contact_email: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="form-field-full">
                <label className="form-label">Address</label>
                <textarea
                  rows="2"
                  placeholder="Enter address"
                  className="form-textarea"
                  value={bankForm.address}
                  onChange={(e) =>
                    setBankForm((b) => ({ ...b, address: e.target.value }))
                  }
                />
              </div>

              <div className="loan-tabs">
                <button className="loan-tab loan-tab-active">
                  CUSTOMER LOAN DETAILS
                </button>
                <button className="loan-tab" disabled>
                  PROJECT LOAN DETAILS
                </button>
              </div>

              <div className="loan-content">
                <div className="form-field-full">
                  <label className="form-label">APF Number</label>
                  <input
                    type="text"
                    placeholder="Enter APF number"
                    className="form-input"
                    style={{ maxWidth: "400px" }}
                    value={bankForm.apf_number}
                    onChange={(e) =>
                      setBankForm((b) => ({ ...b, apf_number: e.target.value }))
                    }
                  />
                </div>

                <div className="form-field-full">
                  <label className="form-label">Loan Products Available</label>
                  <div className="checkbox-grid">
                    {loanProducts.map((lp) => (
                      <label className="checkbox-label" key={lp.id}>
                        <input
                          type="checkbox"
                          checked={bankForm.productIds.includes(lp.id)}
                          onChange={() => toggleProduct(lp.id)}
                        />
                        <span>{lp.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* HIDE created/update dates in customer loan details */}
                {/*
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">Created On</label>
                    <input type="date" className="form-input" disabled />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Update On</label>
                    <input type="date" className="form-input" disabled />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Status</label>
                    <select
                      className="form-input"
                      value={bankForm.project_bank_status}
                      onChange={(e) =>
                        setBankForm((b) => ({
                          ...b,
                          project_bank_status: e.target.value,
                        }))
                      }
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>
                </div>
                */}
              </div>

              <div className="form-actions">
                <button className="btn-primary" onClick={handleSaveBankAll}>
                  SAVE
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ---------- Notification / Alerts ---------- */}
        <div className="setup-section">
          <button
            onClick={() => toggleSection("notification")}
            className="section-header"
          >
            <h2 className="section-title">Notification / Alerts</h2>
            <svg
              className={`chevron-icon ${
                openSections.notification ? "rotated" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {openSections.notification && (
            <div className="section-content">
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>User</th>
                      <th>Type</th>
                      <th>Message</th>
                      <th>Priority</th>
                      <th>Method</th>
                      <th>Scheduled</th>
                      <th>Read</th>
                      <th>Expiry</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.length ? (
                      notifications.map((n) => (
                        <tr key={n.id}>
                          <td>{n.code || n.id}</td>
                          <td>{n.user}</td>
                          <td>{n.notif_type}</td>
                          <td>{n.message}</td>
                          <td>{n.priority}</td>
                          <td>{n.delivery_method}</td>
                          <td>{n.scheduled_at || "-"}</td>
                          <td>{n.read_status || "-"}</td>
                          <td>{n.expires_on || "-"}</td>
                          <td>{n.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={10}>No notifications</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="form-actions-group">
                <button className="btn-secondary" onClick={loadNotifications}>
                  REFRESH
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

