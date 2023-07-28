export default `
  <div class="settings">
    <form id="profile-form">
      <div class="form-title">Ваш профиль</div>
      <div class="person">
        <div class="person__avatar"> 
          {{{avatarButton}}}
          <div class="hidden">{{{avatarFile}}}</div>
        </div>
        <div>
          <div class="person__name">
            {{#if user.first_name}}{{user.first_name}}{{else}}Имя{{/if}}
            {{user.second_name}} 
          </div>
          <div class="person__login">
            @{{#if user.login}}{{user.login}}{{/if}}
           </div>
           {{{changePasswordLink}}}
        </div>
      </div>
      <div class="content">
        <div class="hidden">{{{avatarInput}}}</div>
        {{{loginInput}}}
        {{{firstnameInput}}}
        {{{lastnameInput}}}
        {{{emailInput}}}
        {{{displayNameInput}}}
        {{{phoneInput}}}
        {{{passwordInput}}}
       </div>
       <div class="footer">
        {{{cancelButton}}}
        {{{saveButton}}}
       </div>
       {{{logoutLink}}}
       <div class="service-message">{{message}}</div>
    </form>
  </div>
`;
