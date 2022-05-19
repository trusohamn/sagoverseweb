<script>
  import { Router, Route } from "svelte-navigator";
  import Home from "./views/Home.svelte";
  import PrivacyPolicy from "./views/PrivacyPolicy.svelte";
  import Terms from "./views/Terms.svelte";
  import Footer from "./components/Footer.svelte";
</script>

<Router>
  <main>
    <Route path="/">
      <Home />
    </Route>

    <Route path="terms-of-service">
      <Terms />
    </Route>

    <Route path="privacy-policy">
      <PrivacyPolicy />
    </Route>

    <Route>
      <h3>Not found</h3>
      <p>Page not found</p>
    </Route>
    <Footer />
  </main>
</Router>
