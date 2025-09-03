//Version-1
// function checkPlacementEmails() {
//   // Replace with your placement team email
//   //const senderEmail = "students.cdc2026@vitap.ac.in"|| "jaladiyaswanth2005@gmail.com";
//   const senderEmail = 'from:students.cdc2026@vitap.ac.in OR from:jaladiyaswanth2005@gmail.com is:unread';
//   // Search for unread emails from placement sender
//   const threads = GmailApp.search(`from:${senderEmail} is:unread`);
//   if (threads.length === 0) return; // No new emails
  
//   const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("sheet1");
  
//   threads.forEach(thread => {
//     const messages = thread.getMessages();
    
//     messages.forEach(msg => {
//       // Extract email subject, date, and link
//       const subject = msg.getSubject();
//       const date = msg.getDate();
//       const link = "https://mail.google.com/mail/u/0/#search/rfc822msgid:" + msg.getId();
      
//       // Append to Google Sheet
//       sheet.appendRow([new Date(), subject, date, link]);
      
//       // Mark email as read to avoid duplicates
//       msg.markRead();
//     });
//   });
// }

//Version-2
// function checkPlacementEmails() {
//   const senderEmail = "jaladiyaswanth2005@gmail.com";

//   const now = new Date();
//   const thirtyMinutesAgo = new Date(now.getTime() - 30*60*1000);

//   const query = `from:${senderEmail} is:unread after:${formatDateForSearch(thirtyMinutesAgo)}`;
//   const threads = GmailApp.search(query);
//   if (threads.length === 0) return;
//   Logger.log("Hi");
//   Logger.log(`Query: ${query}`);
// Logger.log(`Threads found: ${threads.length}`);


//   let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("sheet1");
//   if (!sheet) {
//     sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("sheet2");
//     sheet.appendRow(["Timestamp","Subject","Email Date","Email Link","Deadline","Registered","Notified"]);
//   }

//   const loggedLinks = sheet.getRange(2,4,sheet.getLastRow()-1,1).getValues().flat();

//   threads.forEach(thread => {
//     thread.getMessages().forEach(msg => {
//       const subject = msg.getSubject();
      
//       // Only placement/internship AND registration
//       if (!(/placement|internship/i.test(subject) && /registration/i.test(subject))) return;

//       const date = msg.getDate();
//       const body = msg.getPlainBody();
//       const link = "https://mail.google.com/mail/u/0/#search/rfc822msgid:" + msg.getId();
//       const deadline = extractDeadline(body);

//       if (!loggedLinks.includes(link)) {
//         sheet.appendRow([new Date(), subject, date, link, deadline, "No", "No"]);
//       }
//     });
//   });
// }

// // Helpers
// function formatDateForSearch(date){
//   const y = date.getFullYear();
//   const m = ("0" + (date.getMonth()+1)).slice(-2);
//   const d = ("0" + date.getDate()).slice(-2);
//   return `${y}/${m}/${d}`;
// }

// function extractDeadline(text){
//   const regex1 = /Deadline[:\s]*([0-9]{1,2}(?:st|nd|rd|th)?\s\w+\s[0-9]{4}(?:\s*\([0-9:.apmAPM ]+\))?)/i;
//   const regex2 = /on or before\s*([0-9]{1,2}(?:st|nd|rd|th)?\s\w+\s[0-9]{4}(?:\s*\([0-9:.apmAPM ]+\))?)/i;
//   let match = text.match(regex1) || text.match(regex2);
//   return match ? match[1].trim() : "Not found";
// }


//Version-3
function checkPlacementEmails() {
  // Build Gmail query for multiple senders, unread, and last 30 mins
  const now = new Date();
   const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);
  // const query = `from:students.cdc2026@vitap.ac.in OR from:jaladiyaswanth2005@gmail.com is:unread after:${formatDateForSearch(thirtyMinutesAgo) }`;

  const query = "(from:students.cdc2026@vitap.ac.in OR from:jaladiyaswanth2005@gmail.com) is:unread";
const threads = GmailApp.search(query);
const recentThreads = threads.filter(thread => thread.getLastMessageDate() >= thirtyMinutesAgo);


  Logger.log("Search Query: " + query);

  
  Logger.log("Threads found: " + threads.length);
   Logger.log("Threads found: " + threads.length);
  if (recentThreads.length === 0) return;

  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("sheet3");
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("sheet3");
    sheet.appendRow(["Timestamp", "Subject", "Email Date", "Email Link", "Deadline", "Registered", "Notified"]);
  }

  //const loggedLinks = sheet.getRange(2, 4, Math.max(sheet.getLastRow() - 1, 0), 1).getValues().flat();
  let loggedLinks = [];
if (sheet.getLastRow() > 1) {
  loggedLinks = sheet
    .getRange(2, 4, sheet.getLastRow() - 1, 1)
    .getValues()
    .flat();
}


  recentThreads.forEach(thread => {
    thread.getMessages().forEach(msg => {
      const subject = msg.getSubject();

      // Only placement/internship AND registration
      if (!(/placement|internship/i.test(subject) && /registration/i.test(subject))) {
        Logger.log("Skipped email: " + subject);
        return;
      }

      const date = msg.getDate();
      const body = msg.getPlainBody();
      const link = "https://mail.google.com/mail/u/0/#search/rfc822msgid:" + msg.getId();
      const deadline = extractDeadline(body);
       Logger.log("Email subject: " + subject);
Logger.log("Email body:\n" + body);
Logger.log("Extracted deadline: " + deadline);

      if (!loggedLinks.includes(link)) {
        Logger.log("Adding new row for: " + subject);
        Logger.log([new Date(), subject, date, link, deadline, "No", "No"]);
        sheet.appendRow([new Date(), subject, date, link, deadline, "No", "No"]);
      } else {
        Logger.log("Already logged: " + subject);
      }

      msg.markRead();
    });
  });
}

// Helpers
function formatDateForSearch(date) {
  const y = date.getFullYear();
  const m = ("0" + (date.getMonth() + 1)).slice(-2);
  const d = ("0" + date.getDate()).slice(-2);
  return `${y}/${m}/${d}`;
}

//function extractDeadline(text) {
  // const regex1 = /Deadline[:\s]*([0-9]{1,2}(?:st|nd|rd|th)?\s\w+\s[0-9]{4}(?:\s*\([0-9:.apmAPM ]+\))?)/i;
  // const regex2 = /on or before\s*([0-9]{1,2}(?:st|nd|rd|th)?\s\w+\s[0-9]{4}(?:\s*\([0-9:.apmAPM ]+\))?)/i;
  // let match = text.match(regex1) || text.match(regex2);
  // return match ? match[1].trim() : "Not found";}

 /* function extractDeadline(text) {
  // Matches "Deadline: 14th August 2025 (10.00 am)"
  // or "on or before 14th August 2025 10:00 am"
  // or just "14th August 2025"
  // const regex = /(?:Deadline[:\s]*|on or before\s*)?([0-9]{1,2}(?:st|nd|rd|th)?\s\w+\s[0-9]{4}(?:\s*\(?[0-9:.apmAPM ]+\)?)?)/i;
  
  // const match = text.match(regex);
  
 

  return match ? match[1].trim() : "Not found";
}*/

/*function extractDeadline(text) {
  // i = case-insensitive, s = dot matches newline
  const regex = /(?:Deadline[:\s]*|on or before\s*[\r\n]*)?([0-9]{1,2}(?:st|nd|rd|th)?\s\w+\s[0-9]{4}(?:\s*\(?[0-9:.apmAPM ]+\)?)?)/is;
  const match = text.match(regex);
  return match ? match[1].trim() : "Not found";
}*/

// function extractDeadline(text) {
//   // Flexible regex to match various date and time patterns
//   // Captures: day + month + optional year + optional time
//   const regex = /(?:apply\s+on\s+or\s+before\s+|deadline:\s*|due\s+(?:by|on)\s*|submit\s+(?:by|before)\s*)?(\d{1,2}\s*(?:st|nd|rd|th)?\s+[a-zA-Z]+(?:\s+\d{2,4})?)(?:\s*[\(]?\s*(\d{1,2}[\.:]\d{2}\s*(?:am|pm|AM|PM)?)\s*[\)]?)?/gi;
  
//   const matches = text.match(regex);
  
//   if (matches && matches.length > 0) {
//     // Get the last match (in case there are multiple)
//     const lastMatch = matches[matches.length - 1];
    
//     // Clean up the result
//     return lastMatch
//       .replace(/^(apply\s+on\s+or\s+before\s+|deadline:\s*|due\s+(?:by|on)\s*|submit\s+(?:by|before)\s*)/i, '') // Remove prefix
//       .replace(/[\(\)]/g, '') // Remove parentheses
//       .replace(/\s+/g, ' ') // Normalize spaces
//       .trim();
//   }
  
//   return "Not found";
// }



function extractDeadline(text) {
  // Check for "on or before" first
  const onOrBeforeRegex = /on\s+or\s+before\s+(.{1,20})/i;
  const onOrBeforeMatch = text.match(onOrBeforeRegex);
  
  if (onOrBeforeMatch) {
    return onOrBeforeMatch[1].trim();
  }
  
  // Check for "Deadline:" if "on or before" not found
  //const deadlineRegex = /deadline:\s*(.{1,20})/i;
    const deadlineRegex = /deadline\s*:\s*(.{1,20})/i;
  const deadlineMatch = text.match(deadlineRegex);
  
  if (deadlineMatch) {
    return deadlineMatch[1].trim();
  }
  
  return "Not found";
}

