"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";

const adminAccount = {
  id: "admin-1",
  firstName: "Nadia",
  lastName: "Rivière",
  email: "admin@zapex.com",
  password: "Admin@123",
  role: "Admin",
  phone: "+23057880000",
  kycStatus: "Verified",
  lastLogin: "2024-12-08T08:00:00Z",
  isActive: true,
};

const defaultUser = {
  id: "user-1",
  firstName: "Maya",
  lastName: "Bhujun",
  email: "user@zapex.com",
  password: "User@123",
  role: "User",
  phone: "+23059890000",
  kycStatus: "Pending",
  lastLogin: "2024-12-06T15:12:00Z",
  isActive: true,
};

const additionalUsers = [
  {
    id: "user-2",
    firstName: "Liam",
    lastName: "Gopal",
    email: "liam@zapex.com",
    role: "Compliance",
    phone: "+23059880001",
    kycStatus: "Verified",
    lastLogin: "2024-12-05T11:02:00Z",
    isActive: true,
  },
  {
    id: "user-3",
    firstName: "Soraya",
    lastName: "Peerbocus",
    email: "soraya@zapex.com",
    role: "User",
    phone: "+23052000002",
    kycStatus: "Rejected",
    lastLogin: "2024-12-02T09:42:00Z",
    isActive: false,
  },
];

const initialUsers = [adminAccount, defaultUser, ...additionalUsers];

const initialWallets = [
  { id: "w1", userId: "user-1", asset: "BTC", balance: 0.45, locked: 0.02, network: "Bitcoin", currency: "BTC" },
  { id: "w2", userId: "user-1", asset: "ETH", balance: 5.2, locked: 1.1, network: "Ethereum Sepolia", currency: "ETH" },
  { id: "w3", userId: "user-1", asset: "MUR", balance: 125000, locked: 5000, network: "Off-chain", currency: "MUR" },
  { id: "w4", userId: "user-1", asset: "USDT", balance: 3200, locked: 200, network: "Ethereum Sepolia", currency: "USDT" },
];

const mockTransactions = [
  {
    id: "tx-1",
    walletId: "w2",
    type: "Deposit",
    asset: "ETH",
    amount: 1.8,
    status: "Completed",
    timestamp: "2024-12-02T11:30:00Z",
  },
  {
    id: "tx-2",
    walletId: "w3",
    type: "Withdraw",
    asset: "MUR",
    amount: 7500,
    status: "Completed",
    timestamp: "2024-12-03T09:15:00Z",
  },
  {
    id: "tx-3",
    walletId: "w1",
    type: "Transfer",
    asset: "BTC",
    amount: 0.05,
    status: "Pending",
    timestamp: "2024-12-05T18:42:00Z",
  },
];

const initialOrders = [
  {
    id: "ord-1",
    market: "ETH/MUR",
    side: "Buy",
    type: "Limit",
    price: 72000,
    quantity: 0.8,
    filled: 0.2,
    status: "Open",
    createdAt: "2024-12-05T09:20:00Z",
  },
  {
    id: "ord-2",
    market: "BTC/MUR",
    side: "Sell",
    type: "Market",
    price: 0,
    quantity: 0.12,
    filled: 0.12,
    status: "Filled",
    createdAt: "2024-12-04T17:10:00Z",
  },
];

const initialTrades = [
  {
    id: "tr-1",
    market: "BTC/MUR",
    side: "Buy",
    price: 1285000,
    quantity: 0.1,
    fee: 12.5,
    total: 128500,
    timestamp: "2024-12-04T17:12:00Z",
  },
  {
    id: "tr-2",
    market: "ETH/MUR",
    side: "Sell",
    price: 68000,
    quantity: 1.2,
    fee: 8.1,
    total: 81600,
    timestamp: "2024-12-03T10:05:00Z",
  },
];

const kycQueueSeed = [
  {
    id: "kyc-1",
    user: "user@zapex.com",
    name: "Maya Bhujun",
    documentType: "Passport",
    country: "Mauritius",
    status: "Pending",
    submittedAt: "2024-12-05T07:55:00Z",
    remarks: "",
  },
  {
    id: "kyc-2",
    user: "alice@zapex.com",
    name: "Alice Jhuboo",
    documentType: "National ID",
    country: "Mauritius",
    status: "Under Review",
    submittedAt: "2024-12-04T13:20:00Z",
    remarks: "Clarify residential address",
  },
];

const auditLogSeed = [
  {
    id: "audit-1",
    user: "user@zapex.com",
    action: "Login",
    description: "Successful login from Port Louis",
    ip: "102.23.10.5",
    timestamp: "2024-12-06T15:12:00Z",
  },
  {
    id: "audit-2",
    user: "user@zapex.com",
    action: "KYC Submitted",
    description: "Identity verification submitted",
    ip: "102.23.10.5",
    timestamp: "2024-12-05T07:55:00Z",
  },
];

const marketsSeed = [
  { id: "BTC/MUR", lastPrice: 1298000, change: 2.4, volume: 32.1, status: "Active" },
  { id: "ETH/MUR", lastPrice: 72000, change: -1.2, volume: 210.2, status: "Active" },
  { id: "BTC/USDT", lastPrice: 26000, change: 0.9, volume: 640.5, status: "Active" },
  { id: "ZEX/MUR", lastPrice: 18.4, change: 12.8, volume: 98000, status: "Beta" },
];

const depositsSeed = [
  { id: "dep-1", time: "2024-12-05T09:22:00Z", user: "user@zapex.com", asset: "ETH", amount: 1.5, status: "Completed", reference: "0x9b...e23" },
  { id: "dep-2", time: "2024-12-04T13:10:00Z", user: "liam@zapex.com", asset: "BTC", amount: 0.08, status: "Pending", reference: "0xa3...1aa" },
];

const withdrawalsSeed = [
  { id: "with-1", time: "2024-12-03T10:45:00Z", user: "user@zapex.com", asset: "MUR", amount: 5000, status: "Completed", destination: "MCB-****1290", txHash: "bank-1290" },
  { id: "with-2", time: "2024-12-02T18:03:00Z", user: "soraya@zapex.com", asset: "ETH", amount: 0.4, status: "Review", destination: "0x8f...ac2", txHash: "0x8fac" },
];

const settingsSeed = {
  makerFee: 0.1,
  takerFee: 0.2,
  minAmounts: {
    BTC: 0.001,
    ETH: 0.01,
    MUR: 500,
  },
  maintenanceMode: false,
  maintenanceMessage: "We are upgrading the Sepolia RPC",
  kycThreshold: 50000,
};

const ZapexContext = createContext();

export const ZapexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(initialUsers);
  const [wallets, setWallets] = useState(initialWallets);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [orders, setOrders] = useState(initialOrders);
  const [trades, setTrades] = useState(initialTrades);
  const [kycQueue, setKycQueue] = useState(kycQueueSeed);
  const [auditLogs, setAuditLogs] = useState(auditLogSeed);
  const [markets] = useState(marketsSeed);
  const [payments, setPayments] = useState({ deposits: depositsSeed, withdrawals: withdrawalsSeed });
  const [settings, setSettings] = useState(settingsSeed);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("zapexUser") : null;
    if (stored) {
      setCurrentUser(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (currentUser) {
        localStorage.setItem("zapexUser", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("zapexUser");
      }
    }
  }, [currentUser]);

  const updateAudit = useCallback((entry) => {
    setAuditLogs((prev) => [
      {
        id: uuid(),
        ...entry,
        timestamp: entry.timestamp ?? new Date().toISOString(),
      },
      ...prev,
    ]);
  }, []);

  const login = useCallback((email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const normalized = email.trim().toLowerCase();
        if (normalized === adminAccount.email && password === adminAccount.password) {
          setCurrentUser({ ...adminAccount, isAuthenticated: true });
          updateAudit({ user: adminAccount.email, action: "Admin Login", description: "Console login", ip: "10.10.1.1" });
          resolve({ ...adminAccount, isAuthenticated: true });
          return;
        }
        if (normalized === defaultUser.email && password === defaultUser.password) {
          setCurrentUser({ ...defaultUser, isAuthenticated: true });
          updateAudit({ user: defaultUser.email, action: "User Login", description: "Dashboard login", ip: "10.10.1.2" });
          resolve({ ...defaultUser, isAuthenticated: true });
          return;
        }
        reject(new Error("Invalid credentials"));
      }, 800);
    });
  }, [updateAudit]);

  const logout = useCallback(() => {
    if (currentUser) {
      updateAudit({ user: currentUser.email, action: "Logout", description: "Manual logout", ip: "10.10.1.2" });
    }
    setCurrentUser(null);
  }, [currentUser, updateAudit]);

  const register = useCallback((payload) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: uuid(),
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email.toLowerCase(),
          role: "User",
          phone: payload.phone,
          kycStatus: "Pending",
          lastLogin: new Date().toISOString(),
          isActive: true,
        };
        setUsers((prev) => [...prev, newUser]);
        updateAudit({
          user: payload.email,
          action: "Registration",
          description: "New account created",
          ip: "10.10.1.20",
        });
        resolve(true);
      }, 900);
    });
  }, [updateAudit]);

  const submitKyc = useCallback(
    (formData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newSubmission = {
            id: uuid(),
            user: currentUser?.email ?? formData.email ?? "",
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            documentType: formData.documentType,
            country: formData.country,
            status: "Pending",
            submittedAt: new Date().toISOString(),
            remarks: "Awaiting review",
            payload: formData,
          };
          setKycQueue((prev) => [newSubmission, ...prev]);
          if (currentUser) {
            setCurrentUser({ ...currentUser, kycStatus: "Pending" });
          }
          updateAudit({
            user: newSubmission.user,
            action: "KYC Submitted",
            description: `KYC submitted for ${newSubmission.documentType}`,
            ip: "10.10.1.5",
          });
          resolve(newSubmission);
        }, 1000);
      });
    },
    [currentUser, updateAudit]
  );

  const updateKycStatus = useCallback((submissionId, status, remarks) => {
    setKycQueue((prev) =>
      prev.map((submission) =>
        submission.id === submissionId
          ? { ...submission, status, remarks: remarks ?? submission.remarks }
          : submission
      )
    );
    updateAudit({
      user: currentUser?.email ?? "admin@zapex.com",
      action: "KYC Updated",
      description: `KYC ${status}`,
      ip: "10.10.1.9",
    });
  }, [currentUser, updateAudit]);

  const updateProfile = useCallback((changes) => {
    setCurrentUser((prev) => (prev ? { ...prev, ...changes } : prev));
    setUsers((prev) => prev.map((user) => (user.id === currentUser?.id ? { ...user, ...changes } : user)));
    updateAudit({
      user: currentUser?.email ?? defaultUser.email,
      action: "Profile Updated",
      description: "User profile updated",
      ip: "10.10.1.5",
    });
  }, [currentUser, updateAudit]);

  const setUserRole = useCallback((userId, role) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, role } : user)));
    updateAudit({
      user: currentUser?.email ?? adminAccount.email,
      action: "Role Updated",
      description: `${userId} role -> ${role}`,
      ip: "10.10.1.9",
    });
  }, [currentUser, updateAudit]);

  const toggleUserStatus = useCallback((userId) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
    updateAudit({
      user: currentUser?.email ?? adminAccount.email,
      action: "User Status",
      description: `${userId} status toggled`,
      ip: "10.10.1.9",
    });
  }, [currentUser, updateAudit]);

  const recordTransaction = useCallback((tx) => {
    const newTx = {
      id: uuid(),
      ...tx,
      status: tx.status ?? "Pending",
      timestamp: tx.timestamp ?? new Date().toISOString(),
    };
    setTransactions((prev) => [newTx, ...prev]);
    updateAudit({
      user: currentUser?.email ?? defaultUser.email,
      action: tx.type,
      description: `${tx.type} ${tx.amount} ${tx.asset}`,
      ip: "10.10.1.5",
    });
    return newTx;
  }, [currentUser, updateAudit]);

  const placeOrder = useCallback((order) => {
    const newOrder = {
      id: uuid(),
      ...order,
      status: "Open",
      filled: 0,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    updateAudit({
      user: currentUser?.email ?? defaultUser.email,
      action: "Order Placed",
      description: `${order.side} ${order.quantity} on ${order.market}`,
      ip: "10.10.1.5",
    });
    return newOrder;
  }, [currentUser, updateAudit]);

  const cancelOrder = useCallback((id) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status: "Cancelled" } : order))
    );
    updateAudit({
      user: currentUser?.email ?? defaultUser.email,
      action: "Order Cancelled",
      description: `Order ${id} cancelled`,
      ip: "10.10.1.5",
    });
  }, [currentUser, updateAudit]);

  const addTrade = useCallback((trade) => {
    const newTrade = {
      id: uuid(),
      ...trade,
      timestamp: new Date().toISOString(),
    };
    setTrades((prev) => [newTrade, ...prev]);
    updateAudit({
      user: currentUser?.email ?? defaultUser.email,
      action: "Trade Executed",
      description: `${trade.side} ${trade.quantity} ${trade.market}`,
      ip: "10.10.1.5",
    });
    return newTrade;
  }, [currentUser, updateAudit]);

  const updateSettings = useCallback((nextSettings) => {
    setSettings(nextSettings);
    updateAudit({
      user: currentUser?.email ?? adminAccount.email,
      action: "Settings Updated",
      description: "Platform settings changed",
      ip: "10.10.1.11",
    });
  }, [currentUser, updateAudit]);

  const userTransactions = useMemo(
    () => transactions.filter((tx) => tx.userId === currentUser?.id || !tx.userId),
    [transactions, currentUser]
  );

  const value = {
    currentUser,
    users,
    wallets,
    transactions: userTransactions,
    orders,
    trades,
    markets,
    kycQueue,
    auditLogs,
    payments,
    settings,
    login,
    logout,
    register,
    updateProfile,
    submitKyc,
    updateKycStatus,
    setUserRole,
    toggleUserStatus,
    recordTransaction,
    placeOrder,
    cancelOrder,
    addTrade,
    updateSettings,
    setPayments,
  };

  return <ZapexContext.Provider value={value}>{children}</ZapexContext.Provider>;
};

export const useZapex = () => {
  const ctx = useContext(ZapexContext);
  if (!ctx) {
    throw new Error("useZapex must be used within ZapexProvider");
  }
  return ctx;
};
