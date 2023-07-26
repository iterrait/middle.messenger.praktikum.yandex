export default `
  <div class="profile">
    <form id="profile-form">
      {{{closeButton}}}
      <div class="form-title">Ваш профиль</div>
      <div class="person">
        <div class="person__avatar">        
          {{#if avatar}} 
          <img src="{{{avatar}}}" alt="" class="avatar">
          {{else}}
           <div class="avatar no-image"></div>
          {{/if}}
        </div>
        <div>
          <div class="person__name">
            {{#if firstname}}
            {{firstname}} 
            {{else}}Имя
            {{/if}}
            {{#if lastname}}
            {{lastname}} 
            {{else}}Фамилия
            {{/if}}
          </div>
          <div class="person__login">@
            {{#if login}}
            {{login}} 
            {{else}}Логин
            {{/if}}
           </div>
          <div class="person__description">
            {{#if description}}
            {{description}} 
            {{else}}Описание
            {{/if}}
           </div>
        </div>
      </div>
      <div class="content">
        {{{avatarInput}}}
        {{{loginInput}}}
        {{{firstnameInput}}}
        {{{lastnameInput}}}
        {{{displayNameInput}}}
        {{{descriptionInput}}}
        {{{phoneInput}}}
        {{{passwordInput}}}
       </div>
        {{{saveButton}}}
    </form>
  </div>
`;
