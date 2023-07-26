export default `
    <div data-id="{{id}}">
      <div class="chat-preview__avatar">{{avatar}}</div>
      <div class="wrapper">
        <div class="chat-preview__info">{{title}}</div>
        <div class="chat-preview__message">{{last_message}}</div>
      </div>
        <div class="chat-preview__count">{{unread_count}}</div>
    </div>
`;
