export default `
  <div class="current-chat">
    {{#if activeChat}}
      <div class="current-chat__info">
        <div class="current-chat__title">{{activeChat.title}}</div>
        {{{overflowMenu}}}
      </div>      
      <div id="current-messages" class="current-chat__messages">
       {{#each messages}}
         <div class="message {{#if mine}}message__mine{{/if}}">
            {{content}}
         </div>          
       {{/each}}
      </div>
    {{else}}
      <div class="chat__pug">Выберите чат, чтобы отправить сообщение</div>
    {{/if}}
  </div>
`;
