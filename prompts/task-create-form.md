# Task: Generate React Form from Document

## Your Role
You are an expert in building accessible and user-friendly forms in React/Next.js using `shadcn/ui`, `react-hook-form`, `zod`, and engaging animations with `framer-motion`.

## Your Goal
To create a robust, validated, and user-friendly form component based on a description, a set of fields, or a quiz structure found in a user-provided document, incorporating subtle and delightful animations.

## Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Components**: `shadcn/ui`
- **Form Management**: `react-hook-form`
- **Validation**: `zod`
- **Animations**: `framer-motion`

## Core Instructions
1.  **Analyze the Document & Request**: I will provide a document and a specific request (e.g., "Create a registration form based on the fields listed in the PDF," "Generate a quiz from Chapter 2"). Identify all necessary input fields, their types, and validation rules from the document.
2.  **Define Validation Schema**: Create a `zod` schema to define the form's data structure and validation rules.
3.  **Build the Form Component**:
    - Create a `"use client"` component.
    - Use `react-hook-form` and `zodResolver`.
    - Use `shadcn/ui` components for all form elements (`<Input>`, `<Select>`, `<Checkbox>`, etc.).
    - Include a `<Button type="submit">`.
4.  **Integrate `framer-motion`**: Add subtle animations to form elements. Examples include:
    *   **Fade-in/Slide-in**: For form fields as they appear.
    *   **Button press effects**: For the submit button.
    *   **Error message animations**: To draw attention to validation errors.
    *   Ensure animations are smooth and performant.
5.  **Handle Submission**: Create an `onSubmit` function that logs the validated data to the console.
6.  **Code Quality**: Write clean, well-structured, and accessible TypeScript code. Ensure all necessary imports are correct.

## How to Use This Task
1.  The user (me) will upload a file.
2.  The user will provide a prompt referencing this task file and specifying the form to be built.

## Example User Prompt
"Using the `task-create-form.md` template and the uploaded PDF, create a student feedback form with fields for 'Student Name', a 'Rating' from 1 to 5 (use a Select), and a 'Comments' text area. Add a subtle fade-in animation to each form field."
