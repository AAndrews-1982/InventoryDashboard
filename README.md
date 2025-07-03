# Ruth's Inventory Dashboard™

This is a custom-built Inventory Management Dashboard for **Ruth’s Chicken**.  
It allows **Team Members** to submit stock counts, and **Managers** to review, order, and generate professional PDF reports.

---

## Built With

- **React 17** (for stability and wide device compatibility)
- **TypeScript**
- **Tailwind CSS**
- **Vite**
- **jsPDF + AutoTable** (for PDF generation)

---

## Features

### Team Member Dashboard

- Input current stock levels via dropdown
- Fields auto-fill with required amount to identify unupdated rows
- Enter **staff notes** per item
- View filterable sections:
  - Refrigerator
  - Freezer
  - Dry Storage
- Two-step confirmation:
  - Warns if items are unchanged
  - Second click confirms all is reviewed
- Sends report to manager view with notes
- No access to ordering links

---

### Manager Dashboard

- PIN-protected access from shared app
- View all inventory submitted by team
- Read-only **stock** and **staff notes**
- Separate **manager notes**
- Items that are low/out-of-stock and not clicked:
  - Get highlighted
  - Trigger warning popup
- Each item name links directly to a supplier site
- Two-step confirmation:
  - First click checks for missed orders
  - Item fields are highlighted if missed
  - Second click confirms submission
- Generates and downloads a **styled PDF report**

---

## PDF Report Includes

- Header: "Inventory Report"
- Timestamp
- Role view ("Team Member" or "Manager View")
- Manager Confirmation line (if manager)
- Full inventory table:
  - Item, Stock, Required, Order, Notes
- Both Staff and Manager notes included
  - Notes section format:
    ```
    Staff Notes:
    [text]

    Manager Note:
    [text]
    ```

---

## Role Switching

- Accessible via the "Manager Dashboard" button
- Requires a secure PIN (e.g. `5555`)
- PIN stored securely in state; resets on refresh

---

## 📂 Project Structure

src/
├── components/
│ ├── Header.tsx
│ └── InventoryDashboard.tsx
├── data/
│ └── inventoryData.ts
├── utils/
│ └── generatePdf.ts
├── App.tsx
└── main.tsx


---

## Deployment

- App is compatible with GitHub Pages
- Assets (images, logos) loaded using `import.meta.env.BASE_URL`
- PDF downloads locally upon submission

---

## Future Ideas

- Email PDF to company inbox
- LocalStorage persistence for staff entries
- Dashboard summary counts (e.g. “4 items low”)
- Optional vendor select dropdowns
- Dark mode toggle 🌙

---

## Created for Ruth's Chicken™

This system was custom designed to support the unique operations of a fast casual chicken restaurant.

> “If you fail to prepare, you're preparing to fail.” – Ruth

---

## Built With ❤️ by Alton Andrews
