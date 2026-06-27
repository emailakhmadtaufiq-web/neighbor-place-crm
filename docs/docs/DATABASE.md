# Neighbor Place CRM
# Database Design v1.0

---

# MEMBERS

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| MemberID | Text | Yes | Primary Key |
| Nama | Text | Yes | Customer Name |
| NoHP | Text | Yes | Phone Number |
| Plat | Text | Yes | Vehicle Plate |
| Jenis | Text | Yes | Mobil / Motor |
| JoinDate | Date | Yes | Join Date |
| Status | Text | Yes | Active / Inactive |
| Level | Text | Yes | Silver / Gold / Platinum |
| QRCode | Text | No | QR Code URL |
| LastVisit | Date | No | Last Visit |

---

# VISITS

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| VisitID | Text | Yes | Primary Key |
| MemberID | Text | Yes | Reference Members |
| VisitDate | DateTime | Yes | Visit Time |
| Admin | Text | Yes | Operator |

---

# REWARDS

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| RewardID | Text | Yes | Primary Key |
| MemberID | Text | Yes | Reference Members |
| RewardDate | DateTime | Yes | Reward Created |
| Status | Text | Yes | Ready / Claimed / Expired |

---

# LOGS

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| LogID | Text | Yes | Primary Key |
| Tanggal | DateTime | Yes | Timestamp |
| Admin | Text | Yes | Operator |
| Aktivitas | Text | Yes | Activity |
| MemberID | Text | No | Reference Member |
| Keterangan | Text | No | Detail Activity |

---

# SETTINGS

| Key | Value |
|-----|-------|
| BusinessName | Neighbor Place |
| RewardTarget | 8 |
| GoldTarget | 20 |
| PlatinumTarget | 40 |
| MembershipActive | TRUE |

---

# RELATIONSHIP

Members

↓

Visits

↓

Rewards

↓

Logs

---

# INDEX

Primary Key

MemberID

VisitID

RewardID

LogID

Unique Key

Plat

---

END OF DOCUMENT
