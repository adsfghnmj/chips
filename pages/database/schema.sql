-- Users Table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- VPN Requests Table
CREATE TABLE vpn_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    vpn_link TEXT,
    tutorial_link TEXT,
    reject_reason TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
);

-- Optional indexes (recommended)
CREATE INDEX idx_users_email
ON users(email);

CREATE INDEX idx_vpn_user
ON vpn_requests(user_id);

CREATE INDEX idx_vpn_status
ON vpn_requests(status);