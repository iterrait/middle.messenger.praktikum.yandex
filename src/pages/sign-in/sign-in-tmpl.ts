export default `
  <div class="sign-in">
    <form id="sign-in-form">
      <div class="form-title">Вход</div>
      {{{loginInput}}}
      {{{passwordInput}}}
      {{{signInButton}}}
      {{{noAccountLink}}}
      {{#if error}}<div class="error">{{error}}</div>{{/if}}
    </form>
  </div>
`;
