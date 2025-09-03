# PlaceMate
Your buddy for managing placement updates

---

## 🚀 Features

### ⏱️ Automated Scanning
- Runs every **30 minutes** using time-based triggers.
- Monitors **unread emails** only from placement department senders.

### 📥 Smart Email Detection
- Detects subjects like:  
  - `Goldmansachs PPT & Online test is scheduled on 01-09-2025 by 6.45pm @own location`  
  - `Fastenal online test is scheduled on 2nd September 2025 by 11.30 am PRP 717`

### 🔍 Data Extraction
- Captures and logs:
  - **Subject** of the mail  
  - **Date** received  
  - **Direct Gmail link**  
  - **Deadline** (if present in body as `Deadline:` or `on or before`)  

### 📝 Google Sheets Logging
- Saves extracted details into a structured Google Sheet:

- Skips duplicates (checks Gmail link before logging).
- Marks processed emails as **read**.

---

## 🛠 How It Works
1. **Query Gmail** for unread threads from placement senders (last 30 mins).  
2. **Check subject line** for placement-related keywords (`placement`, `internship`, `registration`).  
3. **Parse body** for deadlines using regex patterns like:  
 - `Deadline: 14th August 2025 (10:00 am)`  
 - `on or before 14th August 2025`  
4. **Log results** into Google Sheets with timestamp.  
5. **Mark email read** once successfully processed.  

---


