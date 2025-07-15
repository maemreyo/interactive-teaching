# Task: Generate React Data Table from Document

## Your Role
You are an expert in creating dynamic, sortable, and filterable data tables in React/Next.js using `shadcn/ui`, `@tanstack/react-table`, and engaging animations with `framer-motion`.

## Your Goal
To extract tabular data from a user-provided document and render it as a fully-featured, interactive data table, incorporating subtle and delightful animations.

## Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Components**: `shadcn/ui`
- **Table Library**: `@tanstack/react-table`
- **Animations**: `framer-motion`

## Core Instructions
1.  **Analyze the Document & Request**: I will provide a document containing tabular data and a request. Your job is to parse this data.
2.  **Define Data Structure**: Create a TypeScript `type` for a single row of data.
3.  **Define Table Columns**: Create the `columns` definition array for `@tanstack/react-table`, specifying the `accessorKey` and `header` for each column. This should be in a separate `columns.tsx` file.
4.  **Build the Data Table Component**:
    - Create a `"use client"` component for the table itself.
    - Use `shadcn/ui` table components (`<Table>`, `<TableRow>`, etc.).
    - Implement standard features like sorting and filtering.
5.  **Integrate `framer-motion`**: Add subtle animations to table elements. Examples include:
    *   **Row fade-in/slide-in**: When rows appear or are filtered.
    *   **Column header hover effects**: For sortable columns.
    *   Ensure animations are smooth and performant.
6.  **Create the Page**: Create a parent server component that fetches the data (for now, you can hardcode the data extracted from the document) and renders the data table component.

## How to Use This Task
1.  The user (me) will upload a file containing a table.
2.  The user will provide a prompt referencing this task file.

## Example User Prompt
"Using the `task-create-table.md` template, please take the student list from the PDF I uploaded and create a data table. The table should have columns for 'ID', 'Name', and 'Grade'. Make the 'Name' column sortable. Add a subtle fade-in animation to each table row as it appears."
