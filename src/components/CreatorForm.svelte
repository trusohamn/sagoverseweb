<script>
  import { fly, fade } from "svelte/transition";
  import Spacer from "../ui/Spacer.svelte";

  let hasError = false;
  let isSuccessVisible = false;
  let submitted = false;

  let description = "";
  let email = "";

  const errMessage = "All the fields are mandatory";

  function handleSubmit(e) {
    console.log("submit", e);
  }
</script>

<h2>Send your sago trail</h2>
<p>We will validate it and add to the app during nearest 48h!</p>
<Spacer height="20" />
{#if hasError == true}
  <p class="error-alert">{errMessage}</p>
  <Spacer height="10" />
{:else if isSuccessVisible}
  <p class="error-alert" transition:fade={{ duration: 150 }}>
    Data updated successfully
  </p>
{/if}

<div class="container">
  <form
    id="surveyForm"
    class="mt-4"
    class:submitted
    on:submit|preventDefault={handleSubmit}
  >
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        placeholder="email"
        required
        bind:value={email}
      />
    </div>

    <div class="form-group">
      <textarea
        class="form-control"
        placeholder="Is there something we should know about this trail?"
        bind:value={description}
        cols="25"
        rows="10"
      />
    </div>

    <button class="btn btn-full" on:click={() => (submitted = true)}
      >Continue</button
    >
  </form>
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
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  h2 {
    margin-top: 0;
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
  }
</style>
