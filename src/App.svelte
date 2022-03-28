<script>
    import { Router, Route, Link } from "svelte-navigator";
    import Home from "./views/Home.svelte";
    import PrivacyPolicy from "./views/PrivacyPolicy.svelte"
  
  </script>
  
  <Router>
    <main>  
      <Route path="/">
        <Home />
      </Route>
  
      <Route path="privacy-policy">
       <PrivacyPolicy/>
      </Route>
  
      <Route>
        <h3>Not found</h3>
        <p>Page not found</p>
      </Route>
    </main>
  </Router>