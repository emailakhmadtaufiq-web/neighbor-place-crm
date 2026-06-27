# Neighbor Place CRM
## System Design v1.0

---

# 1. PROJECT

Project Name : Neighbor Place CRM

Version : 1.0

Platform : Google Apps Script

Database : Google Spreadsheet

Frontend : HTML + CSS + JavaScript

---

# 2. OBJECTIVE

Membangun Customer Loyalty Management System untuk Neighbor Place.

Fitur utama:

- Member Management
- Vehicle Management
- Visit Management
- Reward Management
- Dashboard
- QR Member Card
- Loyalty Card
- Activity Log

---

# 3. BUSINESS RULE

- 1 Kendaraan = 1 Member
- Plat Nomor Tidak Boleh Duplikat
- Reward Setiap 8 Visit
- Gold Member = 20 Visit
- Platinum Member = 40 Visit
- Semua Aktivitas Masuk Log
- Semua Rule Dibaca Dari Sheet Settings

---

# 4. MEMBER ID

Format

NP-26-000001

Prefix

NP

Year

26

Running Number

000001

---

# 5. VISIT ID

VS-26-000001

---

# 6. REWARD ID

RW-26-000001

---

# 7. LOG ID

LG-26-000001

---

# 8. DATABASE

## members

MemberID

Nama

NoHP

Plat

Jenis

JoinDate

Status

Level

QRCode

LastVisit

---

## visits

VisitID

MemberID

VisitDate

Admin

---

## rewards

RewardID

MemberID

RewardDate

Status

---

## logs

LogID

Tanggal

Admin

Aktivitas

MemberID

Keterangan

---

## settings

RewardTarget

GoldTarget

PlatinumTarget

BusinessName

BusinessPhone

BusinessAddress

---

# 9. MEMBER STATUS

Active

Inactive

---

# 10. MEMBER LEVEL

Silver

Gold

Platinum

---

# 11. REWARD STATUS

Ready

Claimed

Expired

---

# 12. VISIT FLOW

Cari Member

↓

Tambah Visit

↓

Simpan Visit

↓

Update Last Visit

↓

Hitung Total Visit

↓

Update Level

↓

Cek Reward

↓

Simpan Log

↓

Refresh Dashboard

---

# 13. MEMBER FLOW

Tambah Member

↓

Validasi Plat

↓

Generate Member ID

↓

Generate QR

↓

Simpan Member

↓

Simpan Log

↓

Refresh Dashboard

---

# 14. REWARD FLOW

Hitung Visit

↓

Visit % RewardTarget

↓

Reward Ready

↓

Claim Reward

↓

Simpan Log

---

# 15. DASHBOARD

Total Member

Total Kendaraan

Silver Member

Gold Member

Platinum Member

Reward Ready

Visit Hari Ini

Visit Bulan Ini

Member Baru Bulan Ini

---

# 16. SIDEBAR

Dashboard

Members

Visits

Rewards

Settings

---

# 17. BACKEND

Code.gs

Config.gs

Database.gs

Utils.gs

LogService.gs

MemberService.gs

VisitService.gs

RewardService.gs

DashboardService.gs

SettingsService.gs

---

# 18. FRONTEND

index.html

dashboard.html

members.html

visits.html

rewards.html

settings.html

style.html

script.html

---

# 19. UTILITIES

Generate ID

Generate QR

Format Date

Format Phone

Format Plate

Validate Phone

Validate Plate

Current Admin

Timestamp

---

# 20. SECURITY

Hidden Spreadsheet ID

Server Side Validation

Unique Plate Validation

No Duplicate MemberID

No Duplicate VisitID

No Duplicate RewardID

---

# 21. ROADMAP

Sprint 1

Backend

Sprint 2

Frontend

Sprint 3

Dashboard

Sprint 4

Visit

Sprint 5

Reward

Sprint 6

QR Card

Sprint 7

Testing

Sprint 8

Production

---

END OF DOCUMENT
