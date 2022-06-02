<script>
  const banner = "/assets/sagoverse-banner.jpeg";
  const photo1 = "/assets/sagoverse1.jpeg";
</script>

<container>
  <headerContainer>
    <div class="img-gradient">
      <img src={banner} alt="Sagoverse banner" />
    </div>
    <buttonContainer>
      <button
        onclick="window.location.href='https://testflight.apple.com/join/0jOyrOUT'"
        >Download test version for iOS</button
      >
      <button
        onclick="window.location.href='https://play.google.com/store/apps/details?id=com.sagoverse'"
        >Download test version for Android</button
      >
    </buttonContainer>
  </headerContainer>
  <div class="spacer" />
  <section>
    <h2>Take your kids for a walk with Sagas!</h2>
    <div class="spacer" />
    <img id="photo1" src={photo1} alt="Kid with Sagoverse app" />
  </section>
  <div class="spacer" />
</container>

<style>
  section {
    background-color: rgba(192, 228, 217, 0.5);
    margin: 10px;
    padding-top: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 80%;
    max-width: 400px;
    overflow: hidden;
  }

  h2 {
    font-size: 1.3em;
    text-align: center;
    font-weight: 400;
  }
  #photo1 {
    width: 100%;
  }
  container {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #009d9d;
    overflow: hidden;
    flex-direction: column;
  }

  headerContainer {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    flex-direction: column;
  }
  button {
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    appearance: button;
    text-decoration: none;
    color: initial;
    background-color: rgba(192, 228, 217, 0.8);
    text-align: center;
    font-weight: 400;
    font-size: 1.1em;
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
    width: 1200px;
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

  .spacer {
    height: 30px;
  }
  @media (min-width: 1000px) {
    .img-gradient {
      width: 100vw;
    }
  }
</style>
