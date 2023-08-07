export default `
  <div data-id="{{chat.id}}" class="chat-preview {{#iff activeChat.id chat.id}}active-chat{{/iff}}">
    <div class="chat-preview__avatar"></div>
    <div class="wrapper">
      <div class="chat-preview__info">{{chat.title}}</div>
      <div class="chat-preview__message">
        {{#if chat.last_message}}
        {{chat.last_message.user.first_name}}: {{chat.last_message.content}}
        {{else}}Нет сообщений
        {{/if}}    
      </div>
    </div>
   {{#if chat.unread_count}}
      <div class="chat-preview__count">{{chat.unread_count}}</div>
   {{/if}}    
  </div>
`;
