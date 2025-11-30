-- Invitations table (each wedding pair)
CREATE TABLE invitations (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(50) UNIQUE NOT NULL,
    groom_name VARCHAR(100) NOT NULL,
    bride_name VARCHAR(100) NOT NULL,
    wedding_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wishes table
CREATE TABLE wishes (
    id SERIAL PRIMARY KEY,
    invitation_uid VARCHAR(50) NOT NULL REFERENCES invitations(uid) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    attendance VARCHAR(20) DEFAULT 'MAYBE' CHECK (attendance IN ('ATTENDING', 'NOT_ATTENDING', 'MAYBE')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster queries
CREATE INDEX idx_wishes_invitation_uid ON wishes(invitation_uid);
CREATE INDEX idx_wishes_created_at ON wishes(created_at DESC);

-- Example: Insert a wedding invitation
-- INSERT INTO invitations (uid, groom_name, bride_name, wedding_date) 
-- VALUES ('rofi-sarah-2025', 'Abdur Rofi', 'Sarah', '2025-06-15 09:00:00');