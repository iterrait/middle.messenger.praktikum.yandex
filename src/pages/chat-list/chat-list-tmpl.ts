export default `
<div class="chat">
  <div class="chat__sidebar">
    <div class="info">
      <div class="owner-info">
        <div>{{first_name}} {{second_name}}</div>
      </div>
      {{{profileLink}}}
      {{{addChat}}}
    </div>
    <div class="chats">
      {{#each chats}}
         {{{this}}}
      {{/each}}
    </div>
  </div>
  <div class="content">
    <div class="participant">
      <div class="participant__info"></div>
      <div class="participant__status">Был(а) в сети недавно</div>
    </div>
    <div class="chat__feed"></div>    
    <form id="chat-form">  
      <div class="choose-file"></div>
      {{{fileInput}}}
      {{{messageInput}}}
      {{{sendMessageButton}}}  
    </form>
  </div>
  {{#if isOpenedAddChatPopup}}
    {{{addChatPopup}}}
  {{/if}}
 </div>
`;
