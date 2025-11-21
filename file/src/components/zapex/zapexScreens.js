const categoryOrder = [
  "Authentication",
  "Dashboard",
  "Profile",
  "KYC",
  "Wallet",
  "Trading",
  "Admin",
  "Common",
];

const zapexScreens = [
  {
    id: "auth-login",
    category: "Authentication",
    order: 1,
    title: "Login Page",
    description:
      "Password-first entry point that enforces verified email, KYC approval, and suspension checks before granting a JWT session.",
    status: { label: "Email verification required", variant: "warning" },
    actions: ["Trigger MFA", "Lock account"],
    blocks: [
      {
        id: "login-form",
        type: "form",
        title: "Sign In",
        subtitle: "RS256 JWT session issued on success",
        columns: 1,
        fields: [
          { label: "Email", type: "email", placeholder: "founder@zapex.io", required: true },
          { label: "Password", type: "password", placeholder: "••••••••", required: true },
          {
            label: "Remember this device",
            type: "checkbox",
            helper: "Stores refresh token fingerprint",
          },
        ],
        footerActions: [
          { label: "Forgot password?", variant: "link" },
          { label: "Create account", variant: "outline-primary" },
        ],
      },
      {
        id: "login-safeguards",
        type: "stats",
        title: "Session Safeguards",
        items: [
          { label: "Rate limit", value: "5 tries / 15 min", variant: "danger" },
          { label: "Refresh TTL", value: "30 days", variant: "info" },
          { label: "Device trust", value: "2 active", variant: "success" },
        ],
      },
    ],
  },
  {
    id: "auth-register",
    category: "Authentication",
    order: 2,
    title: "Register Page",
    description:
      "Collects contact data, enforces strong password policy, blocks disposable mailboxes, and provisions wallets instantly.",
    status: { label: "Auto wallet creation", variant: "info" },
    actions: ["Send verification email"],
    blocks: [
      {
        id: "registration-form",
        type: "form",
        title: "Create ZapEx Account",
        subtitle: "Personal info + credential capture",
        columns: 2,
        fields: [
          { label: "First name", type: "text", placeholder: "Ava", required: true },
          { label: "Last name", type: "text", placeholder: "Stein", required: true },
          { label: "Email", type: "email", placeholder: "ava@zapex.io", required: true },
          { label: "Phone", type: "tel", placeholder: "+1 555 010 203", required: true },
          {
            label: "Password",
            type: "password",
            placeholder: "Strong+Key1",
            helper: "Min 8 chars, upper/lower/digit/symbol",
            required: true,
          },
          {
            label: "Confirm password",
            type: "password",
            placeholder: "Strong+Key1",
            required: true,
          },
        ],
        footerActions: [{ label: "Register", variant: "primary" }],
      },
      {
        id: "registration-audit",
        type: "list",
        title: "Provisioning steps",
        items: [
          { label: "Create user + assign role User", badge: "Done" },
          { label: "Encrypt Sepolia private key", badge: "Done" },
          { label: "Queue verification email", badge: "Pending" },
        ],
      },
    ],
  },
  {
    id: "auth-verify",
    category: "Authentication",
    order: 3,
    title: "Verify Email Page",
    description:
      "Displays verification message, resend control, and polling panel that activates account on successful token exchange.",
    status: { label: "Token expires in 24h", variant: "secondary" },
    actions: ["Resend link"],
    blocks: [
      {
        id: "verify-status",
        type: "cards",
        title: "Verification state",
        columns: 2,
        cards: [
          {
            title: "Status",
            body: "Awaiting click on secure link.",
            footer: "Refresh to check again",
          },
          {
            title: "Security",
            body: "Magic link bound to device + expires after first use.",
            footer: "Audit event recorded",
          },
        ],
      },
      {
        id: "verify-timeline",
        type: "timeline",
        title: "Activation timeline",
        steps: [
          { label: "Email issued", description: "Token stored server-side" },
          { label: "User clicks link", description: "Endpoint validates + clears token" },
          { label: "Account unlocked", description: "Login permitted + audit log" },
        ],
      },
    ],
  },
  {
    id: "auth-forgot",
    category: "Authentication",
    order: 4,
    title: "Forgot Password Page",
    description:
      "Collects email, issues reset token with 30 minute TTL, and blocks brute-force through rate limiting.",
    status: { label: "Token lifetime 30 min", variant: "warning" },
    actions: ["Send reset link"],
    blocks: [
      {
        id: "forgot-form",
        type: "form",
        title: "Request reset link",
        fields: [
          {
            label: "Account email",
            type: "email",
            placeholder: "security@zapex.io",
            required: true,
          },
        ],
        footerActions: [{ label: "Send link", variant: "primary" }],
      },
      {
        id: "forgot-info",
        type: "list",
        title: "Safeguards",
        items: [
          { label: "Lockout after 3 failed attempts", badge: "Active" },
          { label: "Reset link single-use", badge: "Active" },
          { label: "Audit trail captured", badge: "Immutable" },
        ],
      },
    ],
  },
  {
    id: "auth-reset",
    category: "Authentication",
    order: 5,
    title: "Reset Password Page",
    description:
      "Validates reset token, enforces password policy, and invalidates refresh tokens after completion.",
    status: { label: "Requires valid token", variant: "danger" },
    actions: ["Rotate refresh tokens"],
    blocks: [
      {
        id: "reset-form",
        type: "form",
        title: "Choose a new password",
        columns: 1,
        fields: [
          { label: "New password", type: "password", placeholder: "Strong+Key1", required: true },
          { label: "Confirm password", type: "password", placeholder: "Strong+Key1", required: true },
        ],
        footerActions: [{ label: "Save password", variant: "primary" }],
      },
      {
        id: "reset-timeline",
        type: "timeline",
        title: "Post-reset workflow",
        steps: [
          { label: "Token validated", description: "Signature + TTL" },
          { label: "Password updated", description: "Bcrypt 12 rounds" },
          { label: "Sessions revoked", description: "Refresh table cleared" },
        ],
      },
    ],
  },
  {
    id: "dashboard-main",
    category: "Dashboard",
    order: 6,
    title: "Main Dashboard",
    description:
      "Holistic snapshot of balances, compliance gates, and quick actions to start deposits, KYC, or trading.",
    status: { label: "Blocks UI if KYC pending", variant: "danger" },
    actions: ["Deposit", "Complete KYC", "Start trading"],
    blocks: [
      {
        id: "dashboard-stats",
        type: "stats",
        title: "Wallet health",
        items: [
          { label: "Total Balance", value: "$12,400", variant: "success" },
          { label: "ETH Testnet", value: "18.4 ETH", variant: "info" },
          { label: "Locked", value: "2.1 ETH", variant: "warning" },
        ],
      },
      {
        id: "dashboard-actions",
        type: "actions",
        title: "Quick actions",
        actions: [
          { label: "Deposit", variant: "primary" },
          { label: "Withdraw", variant: "outline-primary" },
          { label: "KYC status", variant: "outline-secondary" },
        ],
      },
      {
        id: "dashboard-table",
        type: "table",
        title: "Recent activity",
        columns: ["Type", "Amount", "Status", "Timestamp"],
        rows: [
          { Type: "Deposit", Amount: "2 ETH", Status: "Confirmed", Timestamp: "Today 10:14" },
          { Type: "Withdraw", Amount: "0.4 ETH", Status: "Pending", Timestamp: "Yesterday" },
          { Type: "Trade", Amount: "BUY 1.2 ETH", Status: "Filled", Timestamp: "Mon" },
        ],
      },
    ],
  },
  {
    id: "profile-main",
    category: "Profile",
    order: 7,
    title: "Profile Page",
    description:
      "Editable card for personal data while locking immutable identifiers and recording audit entries per update.",
    status: { label: "Audit logging enabled", variant: "info" },
    actions: ["Update profile"],
    blocks: [
      {
        id: "profile-form",
        type: "form",
        title: "Personal information",
        columns: 2,
        fields: [
          { label: "First name", type: "text", placeholder: "Ava" },
          { label: "Last name", type: "text", placeholder: "Stein" },
          { label: "Phone", type: "tel", placeholder: "+44 7700 900123" },
          { label: "Role", type: "text", placeholder: "User", readOnly: true },
          { label: "Email", type: "email", placeholder: "ava@zapex.io", readOnly: true },
        ],
        footerActions: [{ label: "Save changes", variant: "primary" }],
      },
      {
        id: "profile-audit",
        type: "log",
        title: "Recent profile events",
        events: [
          { title: "Name updated", meta: "By user", time: "Today 09:15" },
          { title: "Phone verified", meta: "OTP", time: "Yesterday" },
        ],
      },
    ],
  },
  {
    id: "profile-password",
    category: "Profile",
    order: 8,
    title: "Change Password Page",
    description:
      "Inline policy reminder plus zero-trust workflow requiring old password before creating a new one.",
    status: { label: "Password policy active", variant: "secondary" },
    actions: ["Save"],
    blocks: [
      {
        id: "password-form",
        type: "form",
        title: "Update password",
        columns: 1,
        fields: [
          { label: "Current password", type: "password", placeholder: "••••••••" },
          { label: "New password", type: "password", placeholder: "Strong+Key1" },
          { label: "Confirm new password", type: "password", placeholder: "Strong+Key1" },
        ],
        footerActions: [{ label: "Update", variant: "primary" }],
      },
      {
        id: "password-hints",
        type: "list",
        title: "Policy requirements",
        items: [
          { label: "Min 8 characters", badge: "OK" },
          { label: "Include symbol", badge: "OK" },
          { label: "Checked against breaches", badge: "HIBP" },
        ],
      },
    ],
  },
  {
    id: "kyc-submit",
    category: "KYC",
    order: 9,
    title: "KYC Submission Page",
    description:
      "Guides users through personal info, document uploads, and selfie capture before sending data for review.",
    status: { label: "Status: Draft", variant: "warning" },
    actions: ["Submit"],
    blocks: [
      {
        id: "kyc-form",
        type: "form",
        title: "Identity details",
        columns: 2,
        fields: [
          { label: "Document type", type: "select", options: ["Passport", "National ID", "Driver's License"] },
          { label: "Document number", type: "text", placeholder: "AA1234567" },
          { label: "Date of birth", type: "date" },
          { label: "Address line 1", type: "text", placeholder: "221B Baker St" },
          { label: "Address line 2", type: "text", placeholder: "Suite 4" },
          { label: "City", type: "text", placeholder: "London" },
          { label: "Country", type: "text", placeholder: "United Kingdom" },
          { label: "ID front", type: "file" },
          { label: "ID back", type: "file" },
          { label: "Selfie with ID", type: "file" },
          { label: "Proof of address", type: "file" },
        ],
        footerActions: [{ label: "Submit for review", variant: "primary" }],
      },
      {
        id: "kyc-steps",
        type: "timeline",
        title: "Submission journey",
        steps: [
          { label: "Upload", description: "User completes form" },
          { label: "Compliance queue", description: "Auto assignment" },
          { label: "Decision", description: "Approve/Reject" },
        ],
      },
    ],
  },
  {
    id: "kyc-status",
    category: "KYC",
    order: 10,
    title: "KYC Status Page",
    description:
      "Communicates pending, approved, or rejected states plus reviewer remarks and re-submit actions.",
    status: { label: "Awaiting reviewer", variant: "warning" },
    actions: ["Resubmit"],
    blocks: [
      {
        id: "kyc-status-grid",
        type: "statusGrid",
        title: "Current status",
        statuses: [
          { label: "Pending", value: "In review", variant: "warning" },
          { label: "Reviewer", value: "Elena Shaw", variant: "info" },
          { label: "Remarks", value: "Need clearer selfie", variant: "danger" },
        ],
      },
      {
        id: "kyc-history",
        type: "table",
        title: "Submission history",
        columns: ["Version", "Date", "Status", "Reviewer"],
        rows: [
          { Version: "#2", Date: "Mar 04", Status: "Pending", Reviewer: "Elena Shaw" },
          { Version: "#1", Date: "Feb 18", Status: "Rejected", Reviewer: "Nate Cole" },
        ],
      },
    ],
  },
  {
    id: "wallet-overview",
    category: "Wallet",
    order: 11,
    title: "Wallet Overview",
    description:
      "Shows Sepolia wallet metrics, platform balance, locked funds, and ledger summary.",
    status: { label: "Live RPC", variant: "success" },
    actions: ["Deposit", "Withdraw"],
    blocks: [
      {
        id: "wallet-stats",
        type: "stats",
        title: "Balances",
        items: [
          { label: "On-chain", value: "14.3 ETH", variant: "primary" },
          { label: "Platform", value: "10.0 ETH", variant: "success" },
          { label: "Locked", value: "1.7 ETH", variant: "warning" },
        ],
      },
      {
        id: "wallet-ledger",
        type: "table",
        title: "Ledger snapshot",
        columns: ["Asset", "Available", "Locked", "Address"],
        rows: [
          {
            Asset: "ETH_TEST",
            Available: "10.0",
            Locked: "1.7",
            Address: "0x8a1...92E",
          },
        ],
      },
    ],
  },
  {
    id: "wallet-deposit",
    category: "Wallet",
    order: 12,
    title: "Deposit Screen",
    description:
      "Provides Sepolia deposit address, QR, and faucet guidance before crediting ledger.",
    status: { label: "Monitoring 12 blocks", variant: "info" },
    actions: ["Copy address", "Open faucet"],
    blocks: [
      {
        id: "deposit-cards",
        type: "cards",
        title: "Deposit details",
        columns: 2,
        cards: [
          {
            title: "Wallet address",
            body: "0x81C3...b02F",
            footer: "Copy & share",
          },
          {
            title: "Network",
            body: "Sepolia Testnet",
            footer: "Min 12 confirmations",
          },
        ],
      },
      {
        id: "deposit-list",
        type: "list",
        title: "How to deposit",
        items: [
          { label: "Use faucet or MetaMask send", badge: "Tip" },
          { label: "ZapEx auto credits after confirmations", badge: "Automation" },
          { label: "Ledger entry created", badge: "Audit" },
        ],
      },
    ],
  },
  {
    id: "wallet-withdraw",
    category: "Wallet",
    order: 13,
    title: "Withdraw Screen",
    description:
      "Validates destination addresses, balance, and logs transaction hash to the ledger.",
    status: { label: "Manual compliance hold", variant: "warning" },
    actions: ["Submit withdrawal"],
    blocks: [
      {
        id: "withdraw-form",
        type: "form",
        title: "Send funds",
        columns: 2,
        fields: [
          { label: "Destination address", type: "text", placeholder: "0x92f..." },
          { label: "Asset", type: "select", options: ["ETH_TEST"] },
          { label: "Amount", type: "number", placeholder: "0.8" },
          { label: "Network", type: "text", placeholder: "Sepolia" },
          { label: "Memo", type: "text", placeholder: "Optional" },
        ],
        footerActions: [{ label: "Submit", variant: "danger" }],
      },
      {
        id: "withdraw-status",
        type: "statusGrid",
        title: "Workflow",
        statuses: [
          { label: "Balance check", value: "Pass", variant: "success" },
          { label: "Compliance", value: "Manual", variant: "warning" },
          { label: "Broadcast", value: "Tx pending", variant: "info" },
        ],
      },
    ],
  },
  {
    id: "wallet-transfer",
    category: "Wallet",
    order: 14,
    title: "Transfer Screen",
    description:
      "Peer-to-peer ZapEx transfers with off-chain ledger entries and optional memo field.",
    status: { label: "Fee free", variant: "success" },
    actions: ["Send"],
    blocks: [
      {
        id: "transfer-form",
        type: "form",
        title: "Transfer funds",
        columns: 2,
        fields: [
          { label: "Recipient email", type: "email", placeholder: "user@zapex.io" },
          { label: "Asset", type: "select", options: ["ETH_TEST"] },
          { label: "Amount", type: "number", placeholder: "1.0" },
          { label: "Memo", type: "text", placeholder: "Optional message" },
        ],
        footerActions: [{ label: "Transfer", variant: "primary" }],
      },
      {
        id: "transfer-steps",
        type: "timeline",
        title: "Transfer flow",
        steps: [
          { label: "Balance hold", description: "Funds reserved" },
          { label: "Ledger write", description: "Sender/Receiver entries" },
          { label: "Notification", description: "Email + in-app" },
        ],
      },
    ],
  },
  {
    id: "wallet-history",
    category: "Wallet",
    order: 15,
    title: "Transaction History",
    description:
      "Unified view of deposits, withdrawals, and transfers with filters for compliance tracing.",
    status: { label: "Immutable ledger", variant: "dark" },
    actions: ["Export CSV"],
    blocks: [
      {
        id: "history-table",
        type: "table",
        title: "Transactions",
        columns: ["Tx ID", "Type", "Amount", "Status", "Timestamp"],
        rows: [
          { "Tx ID": "0x92a", Type: "Deposit", Amount: "+1.4 ETH", Status: "Confirmed", Timestamp: "Mar 5" },
          { "Tx ID": "0x77b", Type: "Withdraw", Amount: "-0.8 ETH", Status: "Pending", Timestamp: "Mar 4" },
          { "Tx ID": "0x55c", Type: "Transfer", Amount: "-0.3 ETH", Status: "Cleared", Timestamp: "Mar 3" },
        ],
      },
      {
        id: "history-filters",
        type: "actions",
        title: "Filters",
        actions: [
          { label: "Deposits", variant: "outline-primary" },
          { label: "Withdrawals", variant: "outline-primary" },
          { label: "Transfers", variant: "outline-primary" },
        ],
      },
    ],
  },
  {
    id: "trading-market",
    category: "Trading",
    order: 16,
    title: "Market Overview",
    description:
      "Displays synthetic tickers, prices, and health badges for ETH_TEST markets.",
    status: { label: "Real-time via polling", variant: "info" },
    actions: ["Open trading"],
    blocks: [
      {
        id: "market-cards",
        type: "cards",
        title: "Markets",
        columns: 3,
        cards: [
          { title: "ETH/USDC", body: "$3,282", footer: "+2.4%" },
          { title: "ZEX/ETH", body: "0.0021", footer: "-0.4%" },
          { title: "ETH/BTC", body: "0.053", footer: "+0.8%" },
        ],
      },
      {
        id: "market-status",
        type: "statusGrid",
        title: "Connectivity",
        statuses: [
          { label: "Price feed", value: "Healthy", variant: "success" },
          { label: "Order book", value: "Synced", variant: "success" },
          { label: "Matching", value: "FIFO", variant: "info" },
        ],
      },
    ],
  },
  {
    id: "trading-screen",
    category: "Trading",
    order: 17,
    title: "Trading Screen",
    description:
      "Side-by-side order form, open orders, and fills to simulate ZapEx trading engine.",
    status: { label: "Simulation", variant: "secondary" },
    actions: ["Submit order"],
    blocks: [
      {
        id: "trade-form",
        type: "form",
        title: "Buy / Sell",
        columns: 2,
        fields: [
          { label: "Side", type: "select", options: ["Buy", "Sell"] },
          { label: "Order type", type: "select", options: ["Market", "Limit"] },
          { label: "Price", type: "number", placeholder: "3280" },
          { label: "Amount", type: "number", placeholder: "1.25" },
          { label: "Total", type: "text", placeholder: "$4,100" },
        ],
        footerActions: [{ label: "Place order", variant: "success" }],
      },
      {
        id: "trade-table",
        type: "table",
        title: "Open orders",
        columns: ["Side", "Price", "Amount", "Status"],
        rows: [
          { Side: "Buy", Price: "$3,270", Amount: "1.00", Status: "Queued" },
          { Side: "Sell", Price: "$3,320", Amount: "0.5", Status: "Partial" },
        ],
      },
    ],
  },
  {
    id: "trading-history",
    category: "Trading",
    order: 18,
    title: "Trade History",
    description:
      "Chronological list of executed fills including price, quantity, and fee.",
    status: { label: "Immutable", variant: "dark" },
    actions: ["Export"],
    blocks: [
      {
        id: "trade-history-table",
        type: "table",
        title: "Fills",
        columns: ["Market", "Side", "Price", "Quantity", "Fee", "Timestamp"],
        rows: [
          { Market: "ETH/USDC", Side: "Buy", Price: "$3,260", Quantity: "0.8", Fee: "0.0008", Timestamp: "09:20" },
          { Market: "ETH/USDC", Side: "Sell", Price: "$3,310", Quantity: "0.5", Fee: "0.0005", Timestamp: "08:44" },
        ],
      },
      {
        id: "trade-history-list",
        type: "list",
        title: "Highlights",
        items: [
          { label: "FIFO engine", badge: "Enabled" },
          { label: "Maker fee 0.1%", badge: "Config" },
        ],
      },
    ],
  },
  {
    id: "admin-login",
    category: "Admin",
    order: 19,
    title: "Admin Login",
    description:
      "Same credential form with enforced MFA + IP restrictions for staff accounts.",
    status: { label: "Restricted", variant: "danger" },
    actions: ["Send OTP"],
    blocks: [
      {
        id: "admin-login-form",
        type: "form",
        title: "Admin authentication",
        columns: 1,
        fields: [
          { label: "Admin email", type: "email", placeholder: "admin@zapex.io" },
          { label: "Password", type: "password", placeholder: "••••••" },
          { label: "OTP", type: "text", placeholder: "123456", helper: "Required on trusted devices" },
        ],
        footerActions: [{ label: "Log in", variant: "primary" }],
      },
      {
        id: "admin-login-log",
        type: "log",
        title: "Security events",
        events: [
          { title: "IP allow list check", meta: "Passed", time: "Instant" },
          { title: "Admin login", meta: "Audit recorded", time: "Every attempt" },
        ],
      },
    ],
  },
  {
    id: "admin-dashboard",
    category: "Admin",
    order: 20,
    title: "Admin Dashboard",
    description:
      "Gives staff overview of users, KYCs, wallets, and alerts.",
    status: { label: "Live monitoring", variant: "success" },
    actions: ["View alerts"],
    blocks: [
      {
        id: "admin-stats",
        type: "stats",
        title: "Key metrics",
        items: [
          { label: "Users", value: "4,812", variant: "primary" },
          { label: "Pending KYC", value: "32", variant: "warning" },
          { label: "Alerts", value: "5", variant: "danger" },
        ],
      },
      {
        id: "admin-alerts",
        type: "list",
        title: "Open alerts",
        items: [
          { label: "Large withdrawal flagged", badge: "High" },
          { label: "KYC backlog", badge: "Medium" },
        ],
      },
    ],
  },
  {
    id: "admin-users",
    category: "Admin",
    order: 21,
    title: "User Management",
    description:
      "Table-driven module to suspend, reactivate, or promote users with direct wallet/KYC shortcuts.",
    status: { label: "RBAC aware", variant: "info" },
    actions: ["Suspend", "Promote"],
    blocks: [
      {
        id: "users-table",
        type: "table",
        title: "Users",
        columns: ["Name", "Email", "Role", "KYC", "Status"],
        rows: [
          { Name: "Ava Stein", Email: "ava@zapex.io", Role: "User", KYC: "Approved", Status: "Active" },
          { Name: "Miles Lee", Email: "miles@zapex.io", Role: "Compliance", KYC: "Approved", Status: "Active" },
          { Name: "Ravi Jain", Email: "ravi@zapex.io", Role: "User", KYC: "Pending", Status: "Locked" },
        ],
      },
    ],
  },
  {
    id: "admin-kyc-review",
    category: "Admin",
    order: 22,
    title: "Admin KYC Review",
    description:
      "Queue of submissions with evidence preview and approve/reject controls.",
    status: { label: "Compliance only", variant: "warning" },
    actions: ["Approve", "Reject"],
    blocks: [
      {
        id: "kyc-review-table",
        type: "table",
        title: "Pending submissions",
        columns: ["User", "Country", "Submitted", "Status"],
        rows: [
          { User: "Ravi Jain", Country: "IN", Submitted: "2h ago", Status: "Pending" },
          { User: "Sara Kim", Country: "KR", Submitted: "4h ago", Status: "Pending" },
        ],
      },
      {
        id: "kyc-review-cards",
        type: "cards",
        title: "Decision notes",
        columns: 2,
        cards: [
          { title: "Approve", body: "Unlocks trading + withdrawals" },
          { title: "Reject", body: "Requires reviewer remarks" },
        ],
      },
    ],
  },
  {
    id: "admin-compliance",
    category: "Admin",
    order: 23,
    title: "Admin Compliance Cases",
    description:
      "Kanban-style triage board for suspicious activity investigations.",
    status: { label: "Escalations", variant: "danger" },
    actions: ["Assign", "Resolve"],
    blocks: [
      {
        id: "compliance-kanban",
        type: "kanban",
        title: "Cases",
        columns: [
          {
            title: "New",
            items: ["High withdrawal velocity", "Login from new country"],
          },
          {
            title: "Investigating",
            items: ["24h trading spike"],
          },
          {
            title: "Resolved",
            items: ["False positive flagged"]
          },
        ],
      },
    ],
  },
  {
    id: "admin-wallet",
    category: "Admin",
    order: 24,
    title: "Admin Wallet Monitor",
    description:
      "Visibility into all user wallets, balances, and ability to freeze accounts.",
    status: { label: "Hot wallet linked", variant: "info" },
    actions: ["Freeze", "Unfreeze"],
    blocks: [
      {
        id: "wallet-monitor-table",
        type: "table",
        title: "Wallets",
        columns: ["User", "Address", "Balance", "Locked", "Status"],
        rows: [
          { User: "Ava Stein", Address: "0x8a1...92E", Balance: "12 ETH", Locked: "1.2", Status: "Active" },
          { User: "Ravi Jain", Address: "0x4b2...aa9", Balance: "0.5 ETH", Locked: "0.0", Status: "Frozen" },
        ],
      },
    ],
  },
  {
    id: "admin-transactions",
    category: "Admin",
    order: 25,
    title: "Admin Transaction Monitor",
    description:
      "Filterable ledger to review deposits, withdrawals, and internal transfers.",
    status: { label: "AML patterns", variant: "secondary" },
    actions: ["Filter"],
    blocks: [
      {
        id: "admin-tx-filters",
        type: "actions",
        title: "Views",
        actions: [
          { label: "Deposits", variant: "outline-secondary" },
          { label: "Withdrawals", variant: "outline-secondary" },
          { label: "Transfers", variant: "outline-secondary" },
        ],
      },
      {
        id: "admin-tx-table",
        type: "table",
        title: "Transactions",
        columns: ["User", "Type", "Amount", "Status", "Flags"],
        rows: [
          { User: "Ava", Type: "Deposit", Amount: "1.0 ETH", Status: "Confirmed", Flags: "" },
          { User: "Ravi", Type: "Withdraw", Amount: "0.3 ETH", Status: "Hold", Flags: "Velocity" },
        ],
      },
    ],
  },
  {
    id: "admin-trades",
    category: "Admin",
    order: 26,
    title: "Admin Trade Monitor",
    description:
      "Shows all open orders and fills to detect manipulation.",
    status: { label: "Market surveillance", variant: "info" },
    actions: ["Cancel order"],
    blocks: [
      {
        id: "trade-monitor-table",
        type: "table",
        title: "Orders",
        columns: ["User", "Market", "Side", "Amount", "Status"],
        rows: [
          { User: "Ava", Market: "ETH/USDC", Side: "Buy", Amount: "2", Status: "Open" },
          { User: "Miles", Market: "ZEX/ETH", Side: "Sell", Amount: "5", Status: "Partially filled" },
        ],
      },
    ],
  },
  {
    id: "admin-audit",
    category: "Admin",
    order: 27,
    title: "Admin Audit Logs",
    description:
      "Immutable event log searchable by user, IP, and module with 90-day retention.",
    status: { label: "Immutable", variant: "dark" },
    actions: ["Export"],
    blocks: [
      {
        id: "audit-log",
        type: "log",
        title: "Latest events",
        events: [
          { title: "User login", meta: "ava@zapex.io • 10.24.15.2", time: "09:22" },
          { title: "KYC approved", meta: "miles@zapex.io", time: "09:10" },
          { title: "Withdrawal initiated", meta: "ravi@zapex.io", time: "08:55" },
        ],
      },
    ],
  },
  {
    id: "admin-settings",
    category: "Admin",
    order: 28,
    title: "System Settings",
    description:
      "Global configuration for maintenance mode, fees, email templates, and RPC endpoints.",
    status: { label: "Configurable", variant: "primary" },
    actions: ["Save"],
    blocks: [
      {
        id: "settings-panel",
        type: "settings",
        title: "Platform toggles",
        items: [
          { label: "Maintenance mode", description: "Take UI offline", enabled: false },
          { label: "Trading fee", description: "0.15%", enabled: true },
          { label: "Withdrawal fee", description: "0.002 ETH", enabled: true },
          { label: "Email templates", description: "Preview + edit", enabled: true },
        ],
      },
    ],
  },
  {
    id: "common-notifications",
    category: "Common",
    order: 29,
    title: "Notifications Center",
    description:
      "Central feed for security alerts, KYC updates, and admin announcements.",
    status: { label: "Real-time", variant: "success" },
    actions: ["Mark all read"],
    blocks: [
      {
        id: "notifications-list",
        type: "notification",
        title: "Inbox",
        notifications: [
          { title: "KYC approved", body: "You can now trade.", time: "2m ago", variant: "success" },
          { title: "Withdrawal confirmed", body: "0.5 ETH broadcasted.", time: "1h ago", variant: "info" },
          { title: "Admin alert", body: "System maintenance tonight.", time: "4h ago", variant: "warning" },
        ],
      },
    ],
  },
  {
    id: "common-errors",
    category: "Common",
    order: 30,
    title: "Error Screens",
    description:
      "Reusable UI slices for 403, 404, and 500 responses.",
    status: { label: "Edge cases", variant: "secondary" },
    actions: ["Return home"],
    blocks: [
      {
        id: "error-cards",
        type: "error",
        title: "Error catalog",
        errors: [
          { code: 403, label: "Forbidden", message: "You lack permissions." },
          { code: 404, label: "Not found", message: "We couldn't locate that page." },
          { code: 500, label: "Server error", message: "Something went wrong." },
        ],
      },
    ],
  },
  {
    id: "common-maintenance",
    category: "Common",
    order: 31,
    title: "Maintenance Mode",
    description:
      "Screen displayed when admins enable read-only mode for upgrades.",
    status: { label: "Planned outage", variant: "warning" },
    actions: ["Notify users"],
    blocks: [
      {
        id: "maintenance-panel",
        type: "maintenance",
        title: "Scheduled downtime",
        schedule: "Tonight • 22:00 - 23:00 UTC",
        details: "Wallets stay paused while trading + withdrawals resume automatically once maintenance ends.",
      },
    ],
  },
];

export { categoryOrder };
export default zapexScreens;
