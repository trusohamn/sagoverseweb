<script>
  let src = "/assets/sagoverse-banner.jpeg";
</script>

<container>
  <div class="img-gradient">
    <img {src} alt="Sagoverse banner" />
  </div>
  <buttonContainer>
    <a href="https://testflight.apple.com/join/0jOyrOUT" class="button"
      >Download test version for iOS</a
    >
    <a
      href="https://play.google.com/store/apps/details?id=com.sagoverse"
      class="button">Download test version for Android</a
    >
  </buttonContainer>
</container>

<style>
  container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: #009d9d;
    overflow: hidden;
  }
  a.button {
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    appearance: button;
    text-decoration: none;
    color: initial;
    background-color: rgba(192, 228, 217, 0.8);
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
  .img-gradient {
    top: 0;
    width: 100%;
    height: 80%;
  }

  .img-gradient::after {
    display: block;
    position: relative;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(0, 157, 157, 0.6),
      rgba(0, 157, 157, 0.9),
      rgba(0, 157, 157, 0.95),
      rgb(0, 157, 157)
    );
    margin-top: -50px;
    height: 50px;
    width: 100%;
    content: "";
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  @media (min-width: 640px) {
    container {
      max-width: none;
    }
  }
</style>
