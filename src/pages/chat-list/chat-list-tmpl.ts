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
   {{{activeChatWithStore}}}
   {{#if activeChat}}
   <form id="message-form">  
     {{{messageInput}}}
     {{{sendMessageButton}}}  
   </form>
   {{/if}} 
  </div>
  {{{addChatPopup}}}
 </div>
`;
