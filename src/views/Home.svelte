<script>
  import Spacer from "../ui/Spacer.svelte";

  const banner = "/assets/sagoverse-banner.png";
  const bannerLowRes = "/assets/sagoverse-banner-low-res.png";
  const sagoverse = "/assets/sagoverse.png";
  const photo1 = "/assets/sagoverse1.jpeg";
  const sagostigar = "/assets/sagostigar.jpeg";
  const exploration = "/assets/exploration.jpeg";
  const tomtestigen = "/assets/tomtestigen.png";
  const bjornstigen = "/assets/bjornstigen.png";
  const founders = "/assets/founders.jpg";
  const ps = "/assets/ps.jpg";
  const pl = "/assets/pl.png";
  const sv = "/assets/sv.png";
  const googlePlay = "assets/googlePlay.png";
  const applePlay = "assets/appleStore.svg";
</script>

<container>
  <headerContainer>
    <div class="header">
      <img src={sagoverse} alt="Sagoverse name" />
      <h3>Take your kids for a fairytale walk!</h3>
    </div>
    <div class="img-gradient">
      <img src={banner} alt="Sagoverse banner" class="img-banner" />
    </div>
    <buttonContainer>
      <a href="https://apps.apple.com/se/app/sagoverse/id1610944481">
        <img
          src={applePlay}
          alt="apple play store"
          style="width: 153px; margin: 14px; cursor: pointer"
        />
      </a>
      <a href="https://play.google.com/store/apps/details?id=com.sagoverse">
        <img
          src={googlePlay}
          alt="google play store"
          style="width: 200px; cursor: pointer"
        />
      </a>
    </buttonContainer>

    <p style="margin: 20px; max-width: 700px; font-size: 0.8em">
      * If Sagoverse App is not available in your country, please use the beta
      testing version for <a href="https://testflight.apple.com/join/0jOyrOUT"
        >iOS</a
      >
      and
      <a href="https://play.google.com/store/apps/details?id=com.sagoverse"
        >Android</a
      >
    </p>
  </headerContainer>
  <Spacer height={15} />
  <div class="bigContainer">
    <div class="pitch">
      <h2>Sagoverse is a storytelling app for the whole family</h2>
      <Spacer height={20} />
      <ul>
        <li>Fairytales audio experience in Swedish and Polish</li>
        <li>Interactive tasks</li>
        <li>Augmented Reality</li>
        <li>Orienteering for children</li>
      </ul>
    </div>
    <Spacer height={48} />
    <img class="photoBig" src={photo1} alt="Kid with Sagoverse app" />
    <Spacer height={48} />
  </div>

  <rowColumnContainer>
    <card>
      <div class="cardText">
        <h3>Select one of the storytrails</h3>
        <p>
          Children need to follow the trail in order to discover the whole
          story. You can send us proposal of a new trails as well!
        </p>
        <Spacer height={48} />
      </div>
      <img class="photo" src={sagostigar} alt="Sagostigar" />
    </card>
    <card>
      <div class="cardText">
        <h3>Try the exploration mode</h3>
        <p>
          The exploration mode can be used anywhere you want- new parts of saga
          will be unlocked along your walk. And if for any reason you don't want
          to get out today, press the sofa button to enjoy sagas from your home.
        </p>
      </div>
      <img class="photo" src={exploration} alt="Exploration mode" />
    </card>
  </rowColumnContainer>
  <Spacer height={60} />
  <h2 id="sagas">Our sagas</h2>
  <rowColumnContainer>
    <card>
      <div class="cardText">
        <div class="flagContainer">
          <img class="flag" src={sv} alt="Swedish flag" />
          <h3>Tomtestigen</h3>
        </div>

        <div class="flagContainer">
          <img class="flag" src={pl} alt="Swedish flag" />
          <h3>Szlak krasnoludkowy</h3>
        </div>
        <p>
          This is Sagoverse's very first story. The main character - a gnome,
          finds a baby dragon that has lost its mom. Along the way they meet
          plenty of helpful creatures from Nordic folklore. Will you help them
          to find the dragon's mother before the evil bunny gets them?
        </p>
        <Spacer height={30} />
      </div>

      <img class="photo" src={tomtestigen} alt="Sagostigar" />
    </card>
    <card>
      <div class="cardText">
        <div class="flagContainer">
          <img class="flag" src={sv} alt="Swedish flag" />
          <h3>Björnstigen</h3>
        </div>

        <div class="flagContainer">
          <img class="flag" src={pl} alt="Swedish flag" />
          <h3>Szlak misiowy</h3>
        </div>

        <p>
          Follow the magical, full of challanges path with Bear Lesio. <br />A
          perfect saga for kids who need to burn some energy.
        </p>
        <Spacer height={30} />
      </div>
      <img class="photo" src={bjornstigen} alt="Exploration mode" />
    </card>
  </rowColumnContainer>

  <Spacer height={30} />
  <h2 id="sagas">About us</h2>
  <rowColumnContainer>
    <card>
      <div class="cardText">
        <h3>Founders</h3>
        <p>
          We are a Polish-Swedish family living in Stockholm, passionate about
          travels, cycling and Dungeons & Dragons. Sagoverse is our third
          'baby', which we create when the other two are asleep. 😀 <br />
          <b>Marta Trusohamn</b>
          is a software developer, coding whenever and wherever she can. She obviously
          takes care of everything related to our App. <br />
          <b>Fredrik Trusohamn</b> has a background in archeology and makes use
          of it as a host of
          <a href="https://diggingupancientaliens.com/"
            >Digging Up Ancient Aliens podcast</a
          >. He records and engineers the stories and sounds for the Sagoverse.
        </p>
        <Spacer height={30} />
      </div>

      <img class="photo" src={founders} alt="Sagostigar" />
    </card>
  </rowColumnContainer>
  <Spacer height={30} />

  <h3>Contributors</h3>
  <rowColumnContainer>
    <card>
      <div class="cardText">
        <h4>Paulina Smolinska</h4>
        <p>
          Happy mother of 2 active boys, travel lover & optimistic owner of the
          <a href="https://youtube.com/channel/UCgdjbvw7RINj-RARx6nMhIgand"
            >vlog</a
          >
          & blog <a href="https://www.okrokblizej.pl">www.okrokblizej.pl</a>,
          established on the 7month's family trip around the Europe. Currently
          living in Sweden, but feeling as the citizen of the world. With the
          enthusiasm for change and smart living ahse is also the owner of
          children friendly place made from containers
          <a href="https://www.kazielnik.pl"> www.kazielnik.pl</a> and co-owner
          of <a href="https://momocontainers.se">momocontainers.se</a>. She
          strongly feels that reading and stories develop the children. And time
          well spend is to move with your kids and let your family discover
          little miracles of the world.
        </p>
        <Spacer height={30} />
      </div>

      <img class="photo" src={ps} alt="Sagostigar" />
    </card>
  </rowColumnContainer>
  <Spacer height={30} />
</container>

<style>
  .flag {
    margin-right: 5px;
    width: 30px;
  }

  card {
    background-color: rgba(192, 228, 217, 0.8);
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
    box-shadow: 0.5px 0.5px 2px 0px rgba(0, 0, 0, 1);
  }

  .cardText {
    font-weight: 400;
    padding: 12px;
  }

  h3 {
    font-size: 1.3em;
    text-align: center;
  }
  h2 {
    font-size: 1.9em;
  }
  .photo {
    width: 100%;
  }

  .photoBig {
    width: 100%;
    max-width: 700px;
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

  rowColumnContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .bigContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .flagContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
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

  buttonContainer {
    position: absolute;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    top: 60%;
  }

  .header {
    position: absolute;
    display: block;
    margin-left: auto;
    margin-right: auto;
    top: 0;
  }

  .img-gradient {
    width: 1200px;
    height: 676px;
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

  .img-banner {
    background: url(/assets/sagoverse-banner-low-res.png) no-repeat;
    background-size: 1200px 676px;
  }
  .pitch {
    margin: 0 25px;
  }
  .pitch > ul {
    font-size: 1.3em;
    font-weight: 500;
  }
  .pitch > h2 {
    font-size: 1.4em;
  }

  @media (min-width: 1000px) {
    .img-gradient {
      width: 100vw;
      height: auto;
    }
    .img-banner {
      background: url(/assets/sagoverse-banner-low-res.png) no-repeat;
      background-size: 100vw auto;
    }

    .photoBig {
      width: 100%;
      max-width: 700px;
      border-radius: 10px;
      box-shadow: 0.5px 0.5px 2px 0px rgba(0, 0, 0, 1);
    }
  }
</style>
