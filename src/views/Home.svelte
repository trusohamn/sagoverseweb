<script>
  let src = "/assets/sagoverse-banner.jpeg";
</script>

<main>
  <img {src} alt="Sagoverse banner" />
  <buttonContainer>
    <a href="https://testflight.apple.com/join/0jOyrOUT" class="button"
      >Download test version for iOS</a
    >
    <a
      href="https://play.google.com/store/apps/details?id=com.sagoverse"
      class="button">Download test version for Android</a
    >
  </buttonContainer>
</main>

<style>
  main {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #009d9d;
  }
  a.button {
    padding: 8px;
    margin: 5px;
    border-radius: 5px;
    appearance: button;
    text-decoration: none;
    color: initial;
    background-color: rgba(192, 228, 217, 0.7);
    text-align: center;
    font-weight: 200;
  }
  buttonContainer {
    position: absolute;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    top: 70%;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 100;
  }

  img {
    max-height: 100%;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
