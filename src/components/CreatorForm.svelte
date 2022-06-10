<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import Spacer from "../ui/Spacer.svelte";
  import type { Place } from "../types";
  const dragon = "/assets/dragonIcon.png";

  import { service } from "../constants";

  let isSuccessVisible = false;
  let isErrorVisible = false;
  let submitted = false;
  let isErrorEmail = false;
  let isLoading = false;

  let description = "";
  let email = "";
  export let places: Place[] = [];

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  async function handleSubmit(e) {
    isSuccessVisible = false;
    isErrorVisible = false;
    isErrorEmail = false;

    email = email.toLowerCase();
    if (!validateEmail(email)) {
      isErrorEmail = true;
      return;
    }
    isLoading = true;

    const response = await fetch(`${service}/stigs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, description, places }),
    });
    isLoading = false;
    if (response.status === 200) isSuccessVisible = true;
    else {
      isErrorVisible = true;
    }
  }
</script>

<h2>Send your sago trail</h2>
<p>We will validate it and add to the app during nearest 48h!</p>
<Spacer height="15" />
<div class="container">
  <form id="surveyForm" class:submitted on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        placeholder="your email"
        required
        bind:value={email}
      />
    </div>
    {#if isErrorEmail}
      <p class="error-alert">Check again if this is a valid email address</p>
      <Spacer height="10" />
    {/if}

    <div class="form-group">
      <textarea
        class="form-control"
        placeholder="Is there something we should know about this trail?"
        bind:value={description}
        cols="25"
        rows="10"
      />
    </div>
    <p class="smallText">
      by continuing you agree to our <a
        href="/privacy-policy-web"
        target="_blank"
        rel="noopener noreferrer">Privacy Policy</a
      >
    </p>

    <button
      class="btn btn-full"
      on:click={() => (submitted = true)}
      disabled={isLoading}
    >
      {#if isLoading}
        <img
          class="loader"
          src={dragon}
          alt="Loader"
          in:fade={{ duration: 150 }}
        />
      {:else}
        Continue
      {/if}
    </button>
  </form>

  <Spacer height="20" />
  {#if isErrorVisible}
    <p class="error-alert">Something went wrong</p>
    <Spacer height="10" />
  {:else if isSuccessVisible}
    <p class="success-alert" in:fade={{ duration: 150 }}>
      We have received your request!
    </p>
  {/if}
</div>

<link
  href="https://gist.githubusercontent.com/Ajax30/08899d40e16069cd517b9756dc900acc/raw/04e4f9997245df079fa8500690d1878311115b20/global.css"
  rel="stylesheet"
  crossorigin="anonymous"
/>

<style>
  p {
    text-align: center;
  }

  .loader {
    height: 20px;
    animation: rotation 2s infinite ease-in;
  }

  .smallText {
    font-size: 0.8em;
  }
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: 300px;
  }

  h2 {
    margin-top: 0;
  }

  .btn {
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-group > *,
  .btn-full {
    width: 100%;
  }

  .form-control,
  .btn-full {
    border-radius: 3px;
  }

  .submitted input:invalid {
    border: 1px solid #c00;
  }

  .submitted input:focus:invalid {
    outline: 1px solid #c00;
  }

  .error-alert {
    border: 1px solid #c00 !important;
    padding: 6px;
    text-align: center;
    color: #c00;
    border-radius: 3px;
    width: 100%;
  }

  .success-alert {
    border: 1px solid rgb(9, 98, 56) !important;
    padding: 6px;
    text-align: center;
    color: rgb(9, 98, 56);
    border-radius: 3px;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
</style>
