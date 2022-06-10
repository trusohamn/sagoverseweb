<script>
  import { Link } from "svelte-navigator";
</script>

<container>
  <Link to="/">
    <img src="/assets/dragonIcon.png" alt="Go Home" />
  </Link>
</container>

<style>
  img {
    height: 50px;
    width: 50px;
    padding: 5px;
    background-color: rgba(192, 228, 217, 0.8);
    border-radius: 100%;
    box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.3),
      inset 0px 0px 3px 2px rgb(0, 97, 97, 0.3);
  }
</style>
