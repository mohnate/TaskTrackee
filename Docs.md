# Documentation

## 1. Component did not reload after save

**Time wasted :** One week

**Behaviour :** The component only does a rerender the first time you save a changes, the second changes onwards will not be updated. When checking the source code in the browser debugger, the code will remained the same as the first changes after you spin up the development server *(via `npm run dev`)*.

**Fix :** Check the file that import the component, if the imported component filename is correct typed, especially ***MISTAKING LOWERCASE AND UPPERCASE LETTER***, as filename is **`CASE SENSITIVE`**.

## 2. Supabase Realtime changes not working

**Behaviour :** The on subscribe function that is inside a `useEffect` hook to invoke when the component first render, does not reflect changes whenever a cloumn of data is update/insert/delete. The callback function inside the `subscribe()` function does return a status of `SUBSCRIBED`, but doesn't called the callback function provided, thus no payload received message will be printed in the console.

```javascript
// File route /src/dashboard/index.js
supabase
    .from("Task")
    .on("*", (payload) => {
        console.log(payload, "payload received");
        const newTodo = payload.new;
        dispatch(updData(newTodo));
    })
    .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
            console.log(status);
        }
    });
```

**Fix :** Remove the **`<React.StrictMode></React.StrictMode>`** tag. The Supabase subscribe has invoked twice under react strict mode which cause problem for supabase.
