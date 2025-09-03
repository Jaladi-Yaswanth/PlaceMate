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

