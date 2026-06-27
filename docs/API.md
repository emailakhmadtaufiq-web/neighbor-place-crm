# Neighbor Place CRM
# Backend API Specification v1.0

---

# MEMBER API

## getMembers()

Description

Mengambil seluruh data member.

Return

Array

---

## getMember(memberId)

Description

Mengambil satu member berdasarkan MemberID.

Parameter

memberId

Return

Object

---

## createMember(data)

Description

Membuat member baru.

Parameter

Nama

NoHP

Plat

Jenis

Return

Success / Error

---

## updateMember(memberId,data)

Description

Update data member.

Return

Success

---

## deactivateMember(memberId)

Description

Mengubah status member menjadi Inactive.

Return

Success

---

## searchMember(keyword)

Description

Cari berdasarkan:

Nama

Plat

NoHP

Return

Array

---

# VISIT API

## getVisits()

Return

Array

---

## createVisit(memberId)

Description

Menambahkan visit baru.

Process

Generate Visit ID

Save Visit

Update Last Visit

Update Level

Check Reward

Create Log

Return

Success

---

## getVisitCount(memberId)

Return

Integer

---

## getVisitHistory(memberId)

Return

Array

---

# REWARD API

## getRewards()

Return

Array

---

## checkReward(memberId)

Return

Boolean

---

## claimReward(rewardId)

Return

Success

---

## getRewardHistory(memberId)

Return

Array

---

# DASHBOARD API

## getDashboard()

Return

Object

Property

totalMember

totalVehicle

silver

gold

platinum

rewardReady

visitToday

visitMonth

newMemberMonth

---

# SETTINGS API

## getSettings()

Return

Object

---

## updateSettings()

Return

Success

---

# LOG API

## createLog()

Return

Success

---

## getLogs()

Return

Array

---

# UTILS API

## generateMemberID()

Return

NP-26-000001

---

## generateVisitID()

Return

VS-26-000001

---

## generateRewardID()

Return

RW-26-000001

---

## generateLogID()

Return

LG-26-000001

---

## validatePlate()

Return

Boolean

---

## validatePhone()

Return

Boolean

---

## formatPlate()

Return

Uppercase

---

## formatPhone()

Return

08xxxxxxxxxx

---

## currentTimestamp()

Return

DateTime

---

## currentAdmin()

Return

String

---

END OF DOCUMENT
