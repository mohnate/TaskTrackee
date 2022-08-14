# Documentation

## 1. Component did not reload after save

**Time wasted :** One week

**Behaviour :** The component only does a rerender the first time you save a changes, the second changes onwards will not be updated. When checking the source code in the browser debugger, the code will remained the same as the first changes after you spin up the development server *(via `npm run dev`)*.

**Fix :** Check the file that import the component, if the imported component filename is correct typed, especially ***MISTAKING LOWERCASE AND UPPERCASE LETTER***, as filename is **`CASE SENSITIVE`**.
