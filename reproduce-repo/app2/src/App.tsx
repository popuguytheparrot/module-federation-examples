import * as React from "react";


// @ts-ignore
const useUserLogin = await import("CorpCRM/userUserLogin")


console.log(useUserLogin)

const App = () => {
// @ts-ignore
 const login = useUserLogin()
  return <div>
    <h1>Typescript</h1>
    <h2>App 2</h2>
      <pre>{login}</pre>
  </div>
}

export default App;
