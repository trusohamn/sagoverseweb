<script>
  import { Router, Route } from "svelte-navigator";
  import Home from "./views/Home.svelte";
  import PrivacyPolicy from "./views/PrivacyPolicy.svelte";
  import PrivacyPolicyWeb from "./views/PrivacyPolicyWeb.svelte";
  import Terms from "./views/Terms.svelte";
  import Creator from "./views/Creator.svelte";
  import NotFound from "./views/NotFound.svelte";
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

    <Route path="privacy-policy-web">
      <PrivacyPolicyWeb />
    </Route>

    <Route path="creator">
      <Creator />
    </Route>

    <Route>
      <NotFound />
    </Route>
    <Footer />
  </main>
</Router>
