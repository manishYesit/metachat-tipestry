if (!document.getElementById('tip-ext-container')) {
  // Global variables
  var chatRoomOpen = false;
  var speechRecognition;
  var recording = false;
  var emojiOpen = false;
  var micOpen = false;
  var isAdmin = false;
  var joinedSite = [];
  var userId = null;
  var $ = document;
  var homeSiteId;
  var username;
  var roomHost;
  var socket;
  var siteId;
  var token;
  var page;

  // Create HTML Elements
  var metaContainer = $.createElement('metachat-container')
  var container = $.createElement('tip-div');
  var headerBox = $.createElement('tip-div');
  var headerBoxLeft = $.createElement('tip-div');
  var headerBoxRight = $.createElement('tip-div');
  var mainMetaBox = $.createElement('tip-div');
  var leftMetaBox = $.createElement('tip-div');
  var rightMetaBox = $.createElement('tip-div');
  var innerCard = $.createElement('tip-div');
  var checkOuter = $.createElement('tip-div');
  var inputOuter = $.createElement('tip-div');
  var footerBox = $.createElement('tip-div');
  var metaChat = $.createElement('tip-div');
  var userChat = $.createElement('tip-div');
  var tipHome = $.createElement('img');
  var tipUser = $.createElement('img');
  var tipCheckBox = $.createElement('input');
  var tipLabelFor = $.createElement('tip-span');
  var headerInput = $.createElement('input');
  var headerSiteIcon = $.createElement('img');

  // Chat room box start
  var chatRoomFooter = $.createElement('tip-div');
  var chatRoomData = $.createElement('tip-div');
  var chatRoomBody = $.createElement('tip-div');
  var chatLoadMore = $.createElement('tip-span');
  var chatRoomInput = $.createElement('input');
  var chatRoomFile = $.createElement('input');
  var chatEmojiBox = $.createElement('tip-div');
  var chatEmojiInput = $.createElement('input');
  var chatEmojiSearch = $.createElement('img');
  var chatEmojiInner = $.createElement('tip-div');
  var chatEmojiFilter = $.createElement('tip-div');
  var chatRoomEmoji = $.createElement('img');
  var chatRoomMedia = $.createElement('img');
  var chatRoomSend = $.createElement('img');
  var chatRoomBack = $.createElement('tip-div');
  var chatRoomTitle = $.createElement('tip-div');
  var chatRoomName = $.createElement('tip-span');
  var chatRoomJoin = $.createElement('tip-span');
  var chatRoomChat = $.createElement('tip-div');

  var tipChatTab = $.createElement('tip-div');
  var tipChatTabAI = $.createElement('tip-div');
  var tipChatTabRoom = $.createElement('tip-div');

  var chatRoomMyHome = $.createElement('tip-div');
  var chatRoomMyChat = $.createElement('tip-div');
  var chatRoomTrending = $.createElement('tip-div');
  var chatRoomMyHomeBox = $.createElement('tip-div');
  var chatRoomMyChatBox = $.createElement('tip-div');
  var chatRoomTrendingBox = $.createElement('tip-div');
  var chatRoomToggleMyHome = $.createElement('tip-div');
  var chatRoomToggleMyChat = $.createElement('tip-div');
  var chatRoomToggleTrending = $.createElement('tip-div');
  var chatRoomToggleIconMyHome = $.createElement('img');
  var chatRoomToggleIconMyChat = $.createElement('img');
  var chatRoomToggleIconTrending = $.createElement('img');
  var chatRoomToggleTextMyHome = $.createElement('tip-span');
  var chatRoomToggleTextMyChat = $.createElement('tip-span');
  var chatRoomToggleTextTrending = $.createElement('tip-span');

  chatRoomFooter.className = 'tipFooterBox';
  chatRoomData.className = 'chatRoomData';
  chatRoomBody.className = 'tipInnerCard maxHeight';
  chatLoadMore.className = 'loadMore';
  chatRoomInput.className = 'tipInput';
  chatRoomFile.className = 'tipInputFile';
  chatRoomEmoji.className = 'tipMedia';
  chatEmojiBox.className = 'tipEmojiBox';
  chatEmojiInput.className = 'tipEmojiInput';
  chatEmojiSearch.className = 'tipSend';
  chatEmojiInner.className = 'tipEmojiInner';
  chatEmojiFilter.className = 'tipEmojiFilter';
  chatRoomMedia.className = 'tipMedia';
  chatRoomSend.className = 'tipSend';
  chatRoomBack.className = 'chatRoomBack';
  chatRoomTitle.className = 'chatRoomTitle';
  chatRoomName.className = 'chatRoomName';
  chatRoomJoin.className = 'chatRoomJoin';
  chatRoomChat.className = 'tipUserChat';

  tipChatTab.className = 'tipChatTab';
  tipChatTabAI.className = 'tipChatTabBox active';
  tipChatTabRoom.className = 'tipChatTabBox';

  chatRoomMyHome.className = 'chatRoomMyChat';
  chatRoomMyChat.className = 'chatRoomMyChat';
  chatRoomTrending.className = 'chatRoomMyChat';
  chatRoomMyHomeBox.className = 'chatRoomMyChatBox';
  chatRoomMyChatBox.className = 'chatRoomMyChatBox';
  chatRoomTrendingBox.className = 'chatRoomMyChatBox';
  chatRoomToggleMyHome.className = 'chatRoomToggleMyChat';
  chatRoomToggleMyChat.className = 'chatRoomToggleMyChat';
  chatRoomToggleTrending.className = 'chatRoomToggleMyChat';

  chatRoomToggleIconMyHome.src = './assets/image/down-icon.png';
  chatRoomToggleIconMyChat.src = './assets/image/down-icon.png';
  chatRoomToggleIconTrending.src = './assets/image/down-icon.png';
  chatRoomToggleTextMyHome.innerText = 'Current Site';
  chatRoomToggleTextMyChat.innerText = 'My Chats';
  chatRoomToggleTextTrending.innerText = 'Trending';

  tipChatTabRoom.innerText = 'CHAT';
  tipChatTabAI.innerText = 'AI';

  chatRoomEmoji.src = './assets/image/emoji.png';
  chatRoomMedia.src = './assets/image/attachment.png';
  chatRoomSend.src = './assets/image/send.png';
  chatEmojiSearch.src = './assets/image/send.png';
  chatRoomInput.placeholder = 'Type your message...';
  chatRoomInput.setAttribute('autocomplete', 'off');
  chatEmojiInput.placeholder = 'Search emoji...';
  chatEmojiBox.style.cssText = 'display: none';
  chatLoadMore.innerText = 'Load More';
  chatRoomJoin.innerText = 'Join';
  chatRoomFile.multiple = true;
  chatRoomFile.type = 'file';
  // Chat room box end

  // Element For Microphone Access 
  var tipMic = $.createElement('img');
  var tipAISend = $.createElement('img');
  var tipMicBox = $.createElement('tip-div');
  var tipRecord = $.createElement('tip-div');
  var tipPause = $.createElement('tip-div');
  var tipInput = $.createElement('input');

  // Alert Message Element
  var alertParent = $.createElement('tip-div');
  var alertBox = $.createElement('tip-div');

  // User Login Dailog
  var userDialog = $.createElement('tip-div');
  var dialogLabel = $.createElement('tip-span');
  var userEmail = $.createElement('input');
  var userPassword = $.createElement('input');
  var userBtn = $.createElement('button');
  var userLink = $.createElement('tip-div');
  var resetPass = $.createElement('a');
  var newUser = $.createElement('a');
  var userClose = $.createElement('tip-div');

  // User Profile Dialog
  var profileBox = $.createElement('tip-div');
  var closeProfile = $.createElement('img');
  var userProfile = $.createElement('img');
  var userDetails = $.createElement('tip-div');
  var userFullName = $.createElement('tip-span');
  var userSortName = $.createElement('tip-span');
  var otherInfo = $.createElement('tip-div');
  var otherText = $.createElement('tip-span');
  var otherBtn = $.createElement('button');
  var userBtnBox = $.createElement('tip-div');
  var userLogout = $.createElement('button');
  var userVisit = $.createElement('button');

  // Suggested Option
  var chat_1 = $.createElement('tip-div');
  var chat_2 = $.createElement('tip-div');
  var chat_3 = $.createElement('tip-div');
  var chat_4 = $.createElement('tip-div');
  var chat_5 = $.createElement('tip-div');
  var chat_6 = $.createElement('tip-div');
  var chat_7 = $.createElement('tip-div');
  var chat_8 = $.createElement('tip-div');
  var chat_9 = $.createElement('tip-div');
  var chat_10 = $.createElement('tip-div');
  var chat_11 = $.createElement('tip-div');
  var chat_12 = $.createElement('tip-div');

  // Suggested Option Class
  chat_1.className = 'span-left';
  chat_2.className = 'span-right';
  chat_3.className = 'span-right';
  chat_4.className = 'span-right';
  chat_5.className = 'span-right';
  chat_6.className = 'span-right';
  chat_7.className = 'span-right';
  chat_8.className = 'span-right';
  chat_9.className = 'span-right';
  chat_10.className = 'span-right';
  chat_11.className = 'span-right';
  chat_12.className = 'span-right';

  // Suggested Option Content
  chat_1.innerHTML = "Hi, I'm your MetaChat chatbot. To get started, please select from the following topics or enter your question below.";
  chat_2.innerHTML = 'Open a chat room for this site.';
  chat_3.innerHTML = 'Open a comment section for this site.';
  chat_4.innerHTML = 'Is this site currently down?';
  chat_5.innerHTML = 'Show me an archive of this site.';
  chat_6.innerHTML = 'Summarize this site.';
  chat_7.innerHTML = 'Analyze this site.';
  chat_8.innerHTML = 'Remove the paywall from this page.';
  chat_9.innerHTML = 'Is this site a scam?';
  chat_10.innerHTML = 'Translate this site.';
  chat_11.innerHTML = 'Check if there is a Reddit thread for this page.';
  chat_12.innerHTML = 'Show reviews for this site.';

  // Append Suggested Option
  metaChat.appendChild(chat_1);
  metaChat.appendChild(chat_2);
  metaChat.appendChild(chat_3);
  metaChat.appendChild(chat_4);
  metaChat.appendChild(chat_5);
  metaChat.appendChild(chat_6);
  metaChat.appendChild(chat_7);
  metaChat.appendChild(chat_8);
  metaChat.appendChild(chat_9);
  metaChat.appendChild(chat_10);
  metaChat.appendChild(chat_11);
  metaChat.appendChild(chat_12);

  // Append Microphone Element
  tipMicBox.appendChild(tipRecord);
  tipMicBox.appendChild(tipPause);

  // Set attributes & content
  metaContainer.id = 'tip-ext-container';
  container.className = 'tipContainer';
  headerBox.className = 'tipHeaderBox';
  headerBoxLeft.className = 'headerBoxLeft';
  headerBoxRight.className = 'headerBoxRight';
  mainMetaBox.className = 'mainMetaBox';
  leftMetaBox.className = 'leftMetaBox';
  rightMetaBox.className = 'rightMetaBox';
  checkOuter.className = 'tipCheckOuter';
  inputOuter.className = 'tipInputOuter';
  footerBox.className = 'tipFooterBox metaChat';
  innerCard.className = 'tipInnerCard';
  metaChat.className = 'tipMetaChat';
  userChat.className = 'tipUserChat';
  tipHome.className = 'tipHome';
  tipUser.className = 'tipUser';
  headerInput.className = 'tipInput link';
  headerSiteIcon.className = 'headerSiteIcon';

  // Microphone Element Class
  tipMicBox.className = 'tipMicBox';
  tipMic.className = 'tipMedia';
  tipAISend.className = 'tipSend';
  tipInput.className = 'tipInput';
  tipRecord.className = 'tipRecord';
  tipPause.className = 'tipPause tipMicOpacity';

  // Alert Box Element Class
  alertParent.className = 'alertParent';
  alertBox.className = 'alertBox';

  // User Login Dialog Class
  userDialog.className = 'userDialog';
  userLink.className = 'userLink';
  userClose.className = 'userClose';

  // User Profile Dialog Class
  closeProfile.className = 'cross';
  profileBox.className = 'profileBox';
  userDetails.className = 'userDetails';
  userFullName.className = 'name';
  userSortName.className = 'username';
  otherInfo.className = 'otherInfo';
  userBtnBox.className = 'userBtnBox';

  // MetaChat Content
  tipHome.src = './assets/image/top.png';
  tipUser.src = './assets/image/user.png';
  headerSiteIcon.src = './assets/icon/logo_128.png';
  tipLabelFor.innerText = 'Check to discuss the current page';
  tipCheckBox.type = 'checkbox';
  headerInput.setAttribute('autocomplete', 'off');
  headerInput.placeholder = 'Enter a URL to chat about any website';

  // Microphone & Input Content
  tipAISend.src = './assets/image/send.png';
  tipMic.src = './assets/image/microphone.png';
  tipMicBox.style.cssText = 'display: none';
  tipInput.setAttribute('autocomplete', 'off');
  tipInput.placeholder = 'Type your message...';

  // User Login Dailog Content
  userEmail.placeholder = 'Email Address';
  userEmail.setAttribute('autocomplete', 'off');
  userPassword.placeholder = 'Password';
  userPassword.setAttribute('autocomplete', 'off');
  userPassword.style.cssText = '-webkit-text-security: disc';
  dialogLabel.innerText = 'LOGIN';
  userBtn.innerText = 'SIGN IN';
  newUser.target = 'blank';
  resetPass.target = 'blank';
  newUser.innerText = 'New User?';
  resetPass.innerText = 'Forgot Password?';
  resetPass.href = 'https://new.tipestry.com/forgot';
  newUser.href = 'https://new.tipestry.com/register';

  // User Profile Dailog Content
  closeProfile.src = './assets/image/cross.png';
  userProfile.src = './assets/image/profile.png';
  otherText.innerText = 'Subscription : Not Available';
  otherBtn.innerText = 'Buy Now';
  userLogout.innerText = 'Logout';
  userVisit.innerText = 'Visit Profile';

  // Update trending list
  setInterval(() => {
    getTrendingRoom();
  }, 30000);

  // Set Token
  getItem("token").then(function (items) {
    if (Object.entries(items).length) {
      token = items.token;
    }
  });

  getItem("data").then(function (items) {
    window.localStorage.setItem('url', window.location.href);

    getChatListData();
    getUserData(token, true);

    if (Object.entries(items).length) {
      userChat.innerHTML = items.data;
      innerCard.scrollTo(0, innerCard.scrollHeight);
    }
  });

  // Open URL in chat room 
  $.body.onclick = async function (e) {
    if (e.target.getAttribute("class") == "tip-chat-link") {
      let url = isValidUrl(e.target.getAttribute("data-url"));
      if (url) {
        window.localStorage.setItem('url', url);

        const site = await axios.post("https://new.tipestry.com/api/site", {
          url: setURL().host,
        });

        siteId = site.data._id;
        homeSiteId = site.data._id;

        await connectChatRoom(setURL().host, setURL().href);

        tipChatTabRoom.classList.add('active');
        tipChatTabAI.classList.remove('active');
        chatRoomTitle.before(tipChatTab);

        const chatList = $.querySelectorAll(".chatRoomMyChatList");

        for (let i = 0; i < chatList.length; i++) {
          chatList[i].classList.remove("active");
        }

        getHomeChat(true);
      } else {
        showAlertBox('Unable to open URL');
      }
    }
  };

  // Open MetaChat
  tipChatTabAI.onclick = function () {
    tipChatTabAI.classList.add('active');
    tipChatTabRoom.classList.remove('active');
    innerCard.before(tipChatTab);

    leftMetaBox.style.display = 'none';
    chatRoomData.style.display = 'none';
    headerBoxLeft.style.display = 'none';
    rightMetaBox.style.display = 'block';
  }

  // Open Chat Room
  tipChatTabRoom.onclick = function () {
    tipChatTabRoom.classList.add('active');
    tipChatTabAI.classList.remove('active');
    chatRoomTitle.before(tipChatTab);

    if (!chatRoomOpen) {
      chat_2.click();
    } else {
      leftMetaBox.style.display = 'none';
      rightMetaBox.style.display = 'none';
      headerBoxLeft.style.display = 'none';
      chatRoomData.style.display = 'block';
    }
  }

  // Open chats
  chatRoomBack.onclick = function () {
    leftMetaBox.style.display = 'block';
    rightMetaBox.style.display = 'none';
    chatRoomData.style.display = 'none';
    headerBoxLeft.style.display = 'block';
  }

  // Handle scroll event
  chatRoomBody.onscroll = async function (e) {
    if (e.target.scrollTop < 250) {
      chatLoadMore.style.display = 'block';
    } else {
      chatLoadMore.style.display = 'none';
    }
  }

  // Load more chat
  chatLoadMore.onclick = async function () {
    try {
      var previousHeight = chatRoomBody.scrollHeight;

      const extraParam = {
        params: { q: siteId, page: (page++) },
      }

      if (token) {
        extraParam['headers'] = { "x-auth-token": token };
      } else {
        extraParam['headers'] = {};
      }

      const data = await axios.get('https://new.tipestry.com/api/chat/list', extraParam);

      let result = data.data.result;

      result.map((row, index) => {
        if (row.message) {
          textChat(row, userId);
        } else {
          mediaChat(row, userId);
        }
      })

      chatLoadMore.style.display = 'none';
      var currentHeight = chatRoomBody.scrollHeight;
      chatRoomBody.scrollTo(0, (currentHeight - previousHeight));
    } catch (error) {
      console.log(error);
    }
  }

  // Hide more_vert menu
  chatRoomData.onclick = function () {
    const allMenu = $.querySelectorAll(".moreVertMenu");

    for (let i = 0; i < allMenu.length; i++) {
      if (allMenu[i].style.display == 'flex') {
        allMenu[i].style.display = 'none';
      }
    }
  }

  // Set another site
  headerInput.addEventListener("keyup", async function (event) {
    if (event.key === 'Enter') {
      let url = isValidUrl(headerInput.value);
      if (url) {
        headerInput.value = '';
        window.localStorage.setItem('url', url);

        const site = await axios.post("https://new.tipestry.com/api/site", {
          url: setURL().host,
        });

        siteId = site.data._id;
        homeSiteId = site.data._id;

        await connectChatRoom(setURL().host, setURL().href);

        tipChatTabRoom.classList.add('active');
        tipChatTabAI.classList.remove('active');
        chatRoomTitle.before(tipChatTab);

        const chatList = $.querySelectorAll(".chatRoomMyChatList");

        for (let i = 0; i < chatList.length; i++) {
          chatList[i].classList.remove("active");
        }

        getHomeChat(true);
      } else {
        showAlertBox('Please enter a valid URL');
      }
    }
  })

  // Handle input from AI
  tipAISend.onclick = async function () {
    let host = setURL().href;

    try {
      await checkAPIUsage();
      if (tipInput.value) {
        let search = tipInput.value;
        if (tipInput.value.length > 500) {
          showAlertBox('Please enter a shorter message')

          return false;
        }

        var loading = $.createElement('img');
        var chatIcon = $.createElement('img');
        var chatBox = $.createElement('tip-span');
        var chatName = $.createElement('tip-span');
        var chatDate = $.createElement('tip-span');
        var leftMessage = $.createElement('tip-div');
        var rightMessage = $.createElement('tip-div');
        var chatContent = $.createElement('tip-span');

        chatIcon.className = 'chatIcon';
        chatName.className = 'chatName';
        chatDate.className = 'chatDateTime';
        leftMessage.className = 'span-left';
        rightMessage.className = 'span-right';
        chatContent.className = 'message-loading';

        tipInput.value = '';
        chatName.innerText = 'ChatGPT';
        rightMessage.innerHTML = search;
        chatDate.innerText = currentTime();
        loading.src = './assets/image/loading.gif';
        chatIcon.src = './assets/image/Chat-GPT.png';

        leftMessage.appendChild(chatIcon);
        leftMessage.appendChild(chatBox);
        chatBox.appendChild(chatName);
        chatName.appendChild(chatDate);
        chatContent.appendChild(loading);
        chatBox.appendChild(chatContent);
        userChat.appendChild(rightMessage);
        userChat.appendChild(leftMessage);

        innerCard.scrollTo(0, innerCard.scrollHeight);

        if (tipCheckBox.checked) {
          const result = await axios.get('https://new.tipestry.com/api/site/analyze', { params: { q: host } });

          search += '. context: ' + result.data;
        }

        const extraParam = {
          params: { q: search },
        }

        if (token) {
          extraParam['headers'] = { "x-auth-token": token };
        }

        const result = await axios.get('https://new.tipestry.com/api/site/openaiBot', extraParam);

        loading.remove();
        chatContent.className = 'chatContent';
        chatContent.innerHTML = result.data.replace('\n', '');

        setItem("data", userChat.innerHTML)
        innerCard.scrollTo(0, innerCard.scrollHeight);
      }
    } catch (error) {
      loading.remove();
      chatContent.className = 'chatContent';
      chatContent.innerHTML = ':( No data found';

      console.log(error);
    }
  }

  // Handle input from AI on press enter
  tipInput.addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
      tipAISend.click();
    }
  });

  // Handle input from chat room
  chatRoomSend.onclick = function () {
    if (!token) {
      tipUser.click();
      return;
    }

    if (emojiOpen) {
      emojiOpen = false;
      chatRoomEmoji.classList.remove('open');
      chatEmojiBox.style.cssText = 'display: none';
      chatRoomEmoji.src = './assets/image/emoji.png';
    }

    try {
      if (chatRoomInput.value) {
        let chatId;
        var chatBox = $.createElement('tip-span');
        var chatDate = $.createElement('tip-span');
        var chatName = $.createElement('tip-span');
        var messageBox = $.createElement('tip-span');
        var chatContent = $.createElement('tip-span');
        var rightMessage = $.createElement('tip-div');

        chatName.className = 'chatName';
        chatDate.className = 'chatDateTime';
        messageBox.className = 'messageBox';
        chatContent.className = 'chatContent';
        rightMessage.className = 'chat-right';

        chatDate.innerText = currentTime();
        chatContent.innerHTML = markupText(chatRoomInput.value);

        getItem("user").then(function (items) {
          if (Object.entries(items).length) {
            let data = {
              name: items.user.username,
              message: chatRoomInput.value,
              site: siteId,
              profile: items.user.imgOriginal,
              _id: null
            };

            chatRoomInput.value = '';

            saveChat(data).then(response => {
              chatId = response;
              data._id = chatId._id;

              socket.emit('message', data);
            });

            // Update Chat List
            let user = $.getElementsByClassName('user-' + data.site);
            let message = $.getElementsByClassName('message-' + data.site);
            let time = $.getElementsByClassName('time-' + data.site);

            for (let i = 0; i < user.length; i++) {
              user[i].innerText = shortUsername(data.name) + ':';
              message[i].innerHTML = addEllipsis(data);
              time[i].innerText = currentTime('', 'time');

              user[i].closest('.chatRoomMyChatList').setAttribute('data-index', new Date().toISOString());
            }

            SortData('trending');
            SortData('favorite');
          }
        });

        // Menu Item Start
        var chatOption = $.createElement('tip-span');
        var moreVertIcon = $.createElement('img');
        var moreVertMenu = $.createElement('tip-div');
        var deleteMenu = $.createElement('tip-span');

        chatOption.className = 'chatOption';
        moreVertMenu.className = 'moreVertMenu';
        deleteMenu.className = 'menuOption';

        deleteMenu.innerText = 'Delete';
        moreVertIcon.src = './assets/image/more_vert.png';

        moreVertIcon.onclick = function (e) {
          const allMenu = $.querySelectorAll(".moreVertMenu");

          for (let i = 0; i < allMenu.length; i++) {
            allMenu[i].style.display = 'none';
          }

          moreVertMenu.style.display = 'flex';
          e.stopPropagation();
        }

        deleteMenu.onclick = async function () {
          try {
            const headers = {
              "x-auth-token": token
            };

            await axios({
              method: "post",
              headers,
              url: 'https://new.tipestry.com/api/chat/delete',
              data: { id: chatId._id },
            });

            chatOption.remove();
            chatContent.innerHTML = '<i class="deleted">Deleted</i>';

            // Update Chat List
            let message = $.getElementsByClassName('message-' + chatId.siteId);

            for (let i = 0; i < message.length; i++) {
              message[i].innerHTML = '<i class="deleted">Deleted</i>';
            }
          } catch (error) {
            console.log(error);
          }
        }

        moreVertMenu.appendChild(deleteMenu);
        chatOption.appendChild(moreVertIcon);
        chatOption.appendChild(moreVertMenu);
        // Menu Item End

        rightMessage.appendChild(chatBox);
        chatBox.appendChild(chatName);
        chatName.appendChild(chatDate);
        chatBox.appendChild(messageBox);
        messageBox.appendChild(chatOption);
        messageBox.appendChild(chatContent);
        chatRoomChat.appendChild(rightMessage);

        chatRoomBody.scrollTo(0, chatRoomBody.scrollHeight);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Handle input from chat room on press enter
  chatRoomInput.addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
      chatRoomSend.click();
    }
  });

  // Back to top
  tipHome.onclick = function () {
    if (chatRoomData.style.display == 'block') {
      chatRoomBody.scrollTo(0, 0);
    }

    if (rightMetaBox.style.display == 'block') {
      innerCard.scrollTo(0, 0);
    }
  }

  // Choose media file
  chatRoomMedia.onclick = function () {
    if (token) {
      chatRoomFile.click();
    } else {
      tipUser.click();
    }
  }

  // Handle choose media file
  chatRoomFile.onchange = function (input) {
    for (let i = 0; i < input.target.files.length; i++) {
      if (input.target.files && input.target.files[i]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          if (input.target.files[i].size <= (16 * 1024 * 1024)) {
            sendImages(e.target.result, input.target.files[i].name, input.target.files[i].type);
          }
        };

        reader.readAsDataURL(input.target.files[i]);
      }
    }
  }

  // Open Emoji Box
  chatRoomEmoji.onclick = function () {
    if (!emojiOpen) {
      loadEmoji();
      emojiOpen = true;
      chatRoomEmoji.classList.add('open');
      chatRoomEmoji.src = './assets/image/next.png';
      chatEmojiBox.style.cssText = 'display: block';
    } else {
      emojiOpen = false;
      chatRoomEmoji.classList.remove('open');
      chatEmojiBox.style.cssText = 'display: none';
      chatRoomEmoji.src = './assets/image/emoji.png';
    }
  }

  // Search Emoji Input
  chatEmojiInput.addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
      searchEmoji();
    }
  })

  // Search Emoji Click
  chatEmojiSearch.onclick = function () {
    searchEmoji();
  }

  // Open chat room
  chat_2.onclick = async function () {
    await connectChatRoom(setURL().host);

    tipChatTabRoom.classList.add('active');
    tipChatTabAI.classList.remove('active');
    chatRoomTitle.before(tipChatTab);

    const currentSite = $.querySelectorAll(".currentSite");
    const chatList = $.querySelectorAll(".chatRoomMyChatList");

    for (let i = 0; i < chatList.length; i++) {
      chatList[i].classList.remove("active");
    }

    for (let i = 0; i < currentSite.length; i++) {
      currentSite[i].classList.add("active");
    }
  }

  // Open comment section
  chat_3.onclick = function () {
    let host = setURL().host;
    window.open('https://new.tipestry.com/sites?s=' + host, 'blank')
  }

  // Site down report
  chat_4.onclick = function () {
    let host = setURL().host;
    window.open('https://www.isitdownrightnow.com/' + host + '.html', 'blank')
  }

  // Archive site
  chat_5.onclick = function () {
    let host = setURL().href;
    window.open('https://web.archive.org/web/20230000000000*/' + host, 'blank')
  }

  // Summarize site
  chat_6.onclick = async function () {
    try {
      await checkAPIUsage();
      let host = setURL().href;

      var loading = $.createElement('img');
      var chatIcon = $.createElement('img');
      var leftMessage = $.createElement('tip-div');
      var chatBox = $.createElement('tip-span');
      var chatName = $.createElement('tip-span');
      var chatDate = $.createElement('tip-span');
      var chatContent = $.createElement('tip-span');

      chatIcon.className = 'chatIcon';
      chatName.className = 'chatName';
      chatDate.className = 'chatDateTime';
      leftMessage.className = 'span-left';
      chatContent.className = 'message-loading';

      chatName.innerText = 'ChatGPT';
      chatDate.innerText = currentTime();
      loading.src = './assets/image/loading.gif';
      chatIcon.src = './assets/image/Chat-GPT.png';

      leftMessage.appendChild(chatIcon);
      leftMessage.appendChild(chatBox);
      chatBox.appendChild(chatName);
      chatName.appendChild(chatDate);
      chatContent.appendChild(loading);
      chatBox.appendChild(chatContent);
      userChat.appendChild(leftMessage);

      innerCard.scrollTo(0, innerCard.scrollHeight);

      try {
        const result = await axios.get('https://new.tipestry.com/api/site/summary', { params: { q: host } });

        loading.remove();
        chatContent.className = 'chatContent';
        chatContent.innerHTML = result.data;

        setItem("data", userChat.innerHTML);
        innerCard.scrollTo(0, innerCard.scrollHeight);
      } catch (error) {
        loading.remove();
        chatContent.className = 'chatContent';
        chatContent.innerHTML = ':( No data found';
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Analyze site
  chat_7.onclick = async function () {
    let host = setURL().href;

    var loading = $.createElement('img');
    var chatIcon = $.createElement('img');
    var leftMessage = $.createElement('tip-div');
    var rightMessage = $.createElement('tip-div');
    var chatBox = $.createElement('tip-span');
    var chatDate = $.createElement('tip-span');
    var chatName = $.createElement('tip-span');
    var chatContent = $.createElement('tip-span');

    chatIcon.className = 'chatIcon';
    chatName.className = 'chatName';
    chatDate.className = 'chatDateTime';
    leftMessage.className = 'span-left';
    rightMessage.className = 'span-right';
    chatContent.className = 'message-loading';

    chatName.innerText = 'ChatGPT';
    chatDate.innerText = currentTime();
    loading.src = './assets/image/loading.gif';
    chatIcon.src = './assets/image/Chat-GPT.png';

    innerCard.scrollTo(0, innerCard.scrollHeight);

    try {
      const result = await axios.get('https://new.tipestry.com/api/site/analyze', { params: { q: host } });

      let search = 'Analyze this: ' + result.data;
      rightMessage.innerHTML = search;

      userChat.appendChild(rightMessage);
      leftMessage.appendChild(chatIcon);
      leftMessage.appendChild(chatBox);
      chatBox.appendChild(chatName);
      chatName.appendChild(chatDate);
      chatBox.appendChild(chatContent);
      chatContent.appendChild(loading);
      userChat.appendChild(leftMessage);

      innerCard.scrollTo(0, innerCard.scrollHeight);

      const extraParam = {
        params: { q: search },
      }

      if (token) {
        extraParam['headers'] = { "x-auth-token": token };
      }

      const data = await axios.get('https://new.tipestry.com/api/site/openaiBot', extraParam);

      loading.remove();
      chatContent.className = 'chatContent';
      chatContent.innerHTML = data.data.replace('\n', '');

      setItem("data", userChat.innerHTML)
      innerCard.scrollTo(0, innerCard.scrollHeight);
    } catch (error) {
      leftMessage.appendChild(chatIcon);
      leftMessage.appendChild(chatBox);
      chatBox.appendChild(chatName);
      chatName.appendChild(chatDate);
      chatBox.appendChild(chatContent);
      chatContent.appendChild(loading);
      userChat.appendChild(leftMessage);

      loading.remove();
      chatContent.className = 'chatContent';
      chatContent.innerHTML = ':( No data found';

      innerCard.scrollTo(0, innerCard.scrollHeight);
    }
  }

  // Remove the paywall
  chat_8.onclick = function () {
    let host = setURL().href;
    window.open('https://www.removepaywall.com/' + host, 'blank');
  }

  // Is this site a scam
  chat_9.onclick = function () {
    let host = setURL().host;
    window.open('https://www.scamadviser.com/check-website/' + host, 'blank')
  }

  // Translate this site
  chat_10.onclick = function () {
    let host = setURL().href;
    window.open('https://translate.google.com/translate?sl=auto&tl=en&hl=en-US&u=' + host, 'blank')
  }

  // Check Reddit thread
  chat_11.onclick = function () {
    let host = setURL().href;

    window.open('https://metachat.plus/reddit-thread.html?url=' + host, 'blank');
  }

  // Check Trustpilot reviews
  chat_12.onclick = function () {
    let host = setURL().host;

    window.open('https://www.trustpilot.com/review/' + host, 'blank');
  }

  // Open recording option
  tipMic.onclick = async function () {
    if (recording) {
      tipPause.click();
      return;
    }

    if ("webkitSpeechRecognition" in window) {
      speechRecognition = new webkitSpeechRecognition();

      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;

      if (!micOpen) {
        micOpen = true;
        tipMic.src = './assets/image/cross.png';
        tipMicBox.style.cssText = 'display: flex';
      } else {
        micOpen = false;
        tipMicBox.style.cssText = 'display: none';
        tipMic.src = './assets/image/microphone.png';
      }
    } else {
      console.log("Speech Recognition Not Available");
    }
  }

  // Start recording
  tipRecord.onclick = function () {
    if (!recording) {
      recording = true;
      speechRecognition.start();

      tipRecord.className = 'tipRecord tipMicOpacity';
      tipPause.className = 'tipPause';

      speechRecognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            let finalSpeech = event.results[i][0].transcript;

            callVoice(finalSpeech);
          }
        }
      };
    }
  }

  // Pause recording
  tipPause.onclick = async function () {
    if (recording) {
      micOpen = false;
      recording = false;
      tipRecord.className = 'tipRecord';
      tipPause.className = 'tipPause tipMicOpacity';
      tipMicBox.style.cssText = 'display: none';

      speechRecognition.stop();
    }
  }

  // Open login & profile dialog
  tipUser.onclick = function () {
    getItem("token").then(function (items) {
      if (Object.entries(items).length) {
        token = items.token;
        getUserData(items.token);
        getSubscription(items.token);
      } else {
        userDialog.style.visibility = 'visible';
      }
    });
  }

  // Close login dialog
  userClose.onclick = function () {
    userEmail.value = '';
    userPassword.value = '';
    userDialog.style.visibility = 'hidden';
  }

  // Close profile dialog
  closeProfile.onclick = function () {
    profileBox.style.visibility = 'hidden';
  }

  // Handle login event
  userBtn.onclick = async function () {
    if (userEmail.value && userPassword.value) {
      try {
        const login = await axios.post('https://new.tipestry.com/api/auth', { email: userEmail.value, password: userPassword.value });

        setItem("token", login.headers["x-auth-token"]);
        setItem("usage", { new: false, limit: 0, total: 10 });
        userClose.click();
        token = login.headers["x-auth-token"];
        getUserData(login.headers["x-auth-token"], false, true);
      } catch (error) {
        showAlertBox(error.response.data);
      }
    } else {
      showAlertBox('Please fill all input fields');
    }
  }

  // Visit profile
  userVisit.onclick = function () {
    window.open('https://new.tipestry.com/p/' + username, 'blank');
  }

  // User logout
  userLogout.onclick = function () {
    removeItem("token");
    removeItem("user");

    tipUser.src = './assets/image/user.png';
    profileBox.style.visibility = 'hidden';
    profileBox.style.animation = '';
    joinedSite = [];
    tipUser.click();
    token = null;
    getMyChat();

    if (roomHost) {
      connectChatRoom(roomHost);
    }
  }

  // Buy Subscription
  otherBtn.onclick = function () {
    window.open('https://new.tipestry.com/subscription', 'blank');
  }

  // Join Chat Room
  chatRoomJoin.onclick = async function () {
    if (token) {
      const extraParam = {};
      extraParam["headers"] = { "x-auth-token": token };

      try {
        const result = await axios.put("https://new.tipestry.com/api/site/follow",
          { siteId: siteId },
          extraParam
        );

        if (joinedSite.includes(siteId)) {
          const index = joinedSite.indexOf(siteId);
          if (index > -1) {
            joinedSite.splice(index, 1);
          }

          chatRoomJoin.innerText = "Join";
        } else {
          joinedSite.push(siteId);
          chatRoomJoin.innerText = "Leave";
        }

        getMyChat();
      } catch (error) {
        console.log(error);
      }
    } else {
      tipUser.click();
    }
  };

  // Collapse Home List
  chatRoomToggleIconMyHome.onclick = function () {
    let display = chatRoomMyHomeBox.style.display;
    if (display == 'none') {
      chatRoomToggleIconMyHome.style.transform = 'rotate(0deg)';
      chatRoomMyHomeBox.style.display = 'flex';
    } else {
      chatRoomToggleIconMyHome.style.transform = 'rotate(-90deg)';
      chatRoomMyHomeBox.style.display = 'none';
    }
  }

  // Collapse My Chat List
  chatRoomToggleIconMyChat.onclick = function () {
    let display = chatRoomMyChatBox.style.display;
    if (display == 'none') {
      chatRoomToggleIconMyChat.style.transform = 'rotate(0deg)';
      chatRoomMyChatBox.style.display = 'flex';
    } else {
      chatRoomToggleIconMyChat.style.transform = 'rotate(-90deg)';
      chatRoomMyChatBox.style.display = 'none';
    }
  }

  // Collapse Trending Chat List
  chatRoomToggleIconTrending.onclick = function () {
    let display = chatRoomTrendingBox.style.display;
    if (display == 'none') {
      chatRoomToggleIconTrending.style.transform = 'rotate(0deg)';
      chatRoomTrendingBox.style.display = 'flex';
    } else {
      chatRoomToggleIconTrending.style.transform = 'rotate(-90deg)';
      chatRoomTrendingBox.style.display = 'none';
    }
  }

  // Handle voice search
  async function callVoice(voiceText) {
    if (voiceText) {
      try {
        await checkAPIUsage();
        if (voiceText.length > 500) {
          showAlertBox('Please enter a shorter message')
          return false;
        }

        var loading = $.createElement('img');
        var chatIcon = $.createElement('img');
        var leftMessage = $.createElement('tip-div');
        var rightMessage = $.createElement('tip-div');
        var chatBox = $.createElement('tip-span');
        var chatDate = $.createElement('tip-span');
        var chatName = $.createElement('tip-span');
        var chatContent = $.createElement('tip-span');

        chatIcon.className = 'chatIcon';
        chatName.className = 'chatName';
        chatDate.className = 'chatDateTime';
        leftMessage.className = 'span-left';
        rightMessage.className = 'span-right';
        chatContent.className = 'message-loading';

        chatName.innerText = 'ChatGPT';
        rightMessage.innerHTML = voiceText;
        chatDate.innerText = currentTime();
        loading.src = './assets/image/loading.gif';
        chatIcon.src = './assets/image/Chat-GPT.png';

        userChat.appendChild(rightMessage);
        leftMessage.appendChild(chatIcon);
        leftMessage.appendChild(chatBox);
        chatBox.appendChild(chatName);
        chatName.appendChild(chatDate);
        chatBox.appendChild(chatContent);
        chatContent.appendChild(loading);
        userChat.appendChild(leftMessage);

        innerCard.scrollTo(0, innerCard.scrollHeight);

        const extraParam = {
          params: { q: voiceText },
        }

        if (token) {
          extraParam['headers'] = { "x-auth-token": token };
        }

        const result = await axios.get('https://new.tipestry.com/api/site/openaiBot', extraParam);

        loading.remove();
        chatContent.className = 'chatContent';
        chatContent.innerHTML = result.data.replace('\n', '');

        setItem("data", userChat.innerHTML);
        innerCard.scrollTo(0, innerCard.scrollHeight);
      } catch (error) {
        console.log(error);
      }
    }
  }

  // Fetch user profile data
  async function getUserData(token, startup = false, login = false) {
    try {
      if (token) {
        const user = await axios.get('https://new.tipestry.com/api/user', {
          headers: { "x-auth-token": token },
        });

        isAdmin = user.data.isAdmin;
        joinedSite = user.data.siteFollowing;

        // Check if user is banned
        if (user.data.isBanned) {
          userLogout.click();
          showAlertBox("Your account has been banned!");
          return;
        }

        if (login) {
          getMyChat();
        }

        if (chatRoomOpen && login) {
          connectChatRoom(roomHost);
        }

        userId = user.data._id;
        username = user.data.username;
        userFullName.innerText = user.data.name;
        userSortName.innerText = '@' + user.data.username;

        if (user.data.imgOriginal) {
          tipUser.src = 'https://tipestry.com/api/topic/get/img/' + user.data.imgOriginal;
          userProfile.src = 'https://tipestry.com/api/topic/get/img/' + user.data.imgOriginal;
        }

        setItem("user", user.data);
        if (!startup) {
          profileBox.style.visibility = 'visible';
        }
      }
    } catch (error) {
      userLogout.click();
      showAlertBox(error.response.data);
    }
  }

  // Get subscription data
  async function getSubscription(token) {
    try {
      if (token) {
        const plan = await axios.get('https://new.tipestry.com/api/user/get-plan', {
          headers: { "x-auth-token": token },
        });

        let month = { 0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun', 6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec' };

        if (plan.data.result.length > 0) {
          let stringDate = new Date(plan.data.result[0].expiredDate);
          stringDate = month[stringDate.getMonth()] + '-' + stringDate.getDate() + '-' + stringDate.getFullYear();

          otherBtn.style.display = 'none';
          otherText.innerText = 'Plan Name : ' + plan.data.result[0].planId + '\n' + 'Expire Date : ' + stringDate;
        }
      }
    } catch (error) {
      showAlertBox(error.response.data);
    }
  }

  // Send files to server
  function sendImages(fileData, fileName, fileType) {
    let chatId;
    let play = false;

    var chatBox = $.createElement('tip-span');
    var chatDate = $.createElement('tip-span');
    var chatName = $.createElement('tip-span');
    var messageBox = $.createElement('tip-span');
    var chatContent = $.createElement('tip-span');
    var chatDownload = $.createElement('a');
    var chatDownloadImg = $.createElement('img');
    var rightMessage = $.createElement('tip-div');

    if (fileType == 'image/svg' || fileType == 'image/webp' || fileType == 'image/jpeg' || fileType == 'image/png' || fileType == 'image/gif') {
      var chatImage = $.createElement('img');
      chatImage.src = fileData;

      chatContent.appendChild(chatImage);
    } else if (fileType == 'video/mp4' || fileType == 'video/webm' || fileType == 'audio/ogg') {
      var chatVideo = $.createElement('video');
      var videoPlay = $.createElement('img');

      videoPlay.src = './assets/image/play.png';
      videoPlay.className = 'videoPlay';
      chatVideo.controls = false;
      chatVideo.src = fileData;
      chatVideo.muted = false;

      chatContent.appendChild(videoPlay);
      chatContent.appendChild(chatVideo);

      videoPlay.onclick = function () {
        if (!play) {
          play = true;
          chatVideo.play();
          videoPlay.src = './assets/image/pause.png';
        } else {
          play = false;
          chatVideo.pause();
          videoPlay.src = './assets/image/play.png';
        }
      }

      chatVideo.onended = function () {
        play = false;
        videoPlay.src = './assets/image/play.png';
      }
    } else {
      var chatFile = $.createElement('tip-span');
      chatFile.innerText = fileName;
      chatFile.className = 'chatFile';
      chatDownload.className = "chatImage-child-2";

      chatContent.appendChild(chatFile);
    }

    // Menu Item Start
    var chatOption = $.createElement('tip-span');
    var moreVertIcon = $.createElement('img');
    var moreVertMenu = $.createElement('tip-div');
    var deleteMenu = $.createElement('tip-span');

    chatOption.className = 'chatOption';
    moreVertMenu.className = 'moreVertMenu';
    deleteMenu.className = 'menuOption';

    deleteMenu.innerText = 'Delete';
    moreVertIcon.src = './assets/image/more_vert.png';

    moreVertIcon.onclick = function (e) {
      const allMenu = $.querySelectorAll(".moreVertMenu");

      for (let i = 0; i < allMenu.length; i++) {
        allMenu[i].style.display = 'none';
      }

      moreVertMenu.style.display = 'flex';
      e.stopPropagation();
    }

    deleteMenu.onclick = async function () {
      try {
        const headers = {
          "x-auth-token": token
        };

        await axios({
          method: "post",
          headers,
          url: 'https://new.tipestry.com/api/chat/delete',
          data: { id: chatId._id },
        });

        chatOption.remove();
        chatContent.className = 'chatContent';
        chatContent.innerHTML = '<i class="deleted">Deleted</i>';

        // Update Chat List
        let message = $.getElementsByClassName('message-' + chatId.siteId);

        for (let i = 0; i < message.length; i++) {
          message[i].innerHTML = '<i class="deleted">Deleted</i>';
        }
      } catch (error) {
        console.log(error);
      }
    }

    moreVertMenu.appendChild(deleteMenu);
    chatOption.appendChild(moreVertIcon);
    chatOption.appendChild(moreVertMenu);
    // Menu Item End

    chatName.className = 'chatName';
    chatDate.className = 'chatDateTime';
    messageBox.className = 'messageBox';
    chatContent.className = 'chatMedia';
    chatDownloadImg.className = 'chatImage-child-1';
    rightMessage.className = 'chat-right';

    chatDate.innerText = currentTime();
    chatDownload.href = fileData;
    chatDownload.setAttribute('download', fileName);
    chatDownloadImg.src = './assets/image/download.png';

    rightMessage.appendChild(chatBox);
    chatBox.appendChild(chatName);
    chatName.appendChild(chatDate);
    chatBox.appendChild(messageBox);
    messageBox.appendChild(chatOption);
    messageBox.appendChild(chatContent);
    chatContent.appendChild(chatDownload);
    chatDownload.appendChild(chatDownloadImg);
    chatRoomChat.appendChild(rightMessage);

    chatRoomBody.scrollTo(0, chatRoomBody.scrollHeight);

    getItem("user").then(function (items) {
      if (Object.entries(items).length) {
        let data = {
          name: items.user.username,
          fileData: fileData,
          fileName: fileName,
          fileType: fileType,
          site: siteId,
          profile: items.user.imgOriginal,
          _id: null
        };

        saveChat(data).then(response => {
          chatId = response;
          data._id = chatId._id;

          socket.emit("sendFiles", data);
        });

        // Update Chat List
        let user = $.getElementsByClassName('user-' + data.site);
        let message = $.getElementsByClassName('message-' + data.site);
        let time = $.getElementsByClassName('time-' + data.site);

        for (let i = 0; i < user.length; i++) {
          user[i].innerText = shortUsername(data.name) + ':';
          message[i].innerHTML = addEllipsis({ message: null, media: { type: data.fileType } });
          time[i].innerText = currentTime('', 'time');

          user[i].closest('.chatRoomMyChatList').setAttribute('data-index', new Date().toISOString());
        }

        SortData('trending');
        SortData('favorite');
      }
    });
  }

  // Save group chat
  async function saveChat(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = {
          "x-auth-token": token
        };

        const result = await axios({
          method: "post",
          headers,
          url: 'https://new.tipestry.com/api/chat/save',
          data: data,
        });

        resolve(result.data.result);
      } catch (error) {
        reject(error);
      }
    });
  }

  // List group chat
  async function getChat(userId = null) {
    try {
      const extraParam = {
        params: { q: siteId },
      }

      if (token) {
        extraParam['headers'] = { "x-auth-token": token };
      } else {
        extraParam['headers'] = {};
      }

      chatRoomChat.innerHTML = "";
      const data = await axios.get('https://new.tipestry.com/api/chat/list', extraParam);

      let result = data.data.result;

      result.map((row, index) => {
        if (row.message) {
          textChat(row, userId);
        } else {
          mediaChat(row, userId);
        }
      })

      chatRoomBody.scrollTo(0, chatRoomBody.scrollHeight);
    } catch (error) {
      console.log(error);
    }
  }

  // Display text chat
  function textChat(data, userId) {
    if (userId != data.userId._id) {
      var chatIcon = $.createElement('img');
      var chatBox = $.createElement('tip-span');
      var chatName = $.createElement('tip-span');
      var chatDate = $.createElement('tip-span');
      var messageBox = $.createElement('tip-span');
      var chatContent = $.createElement('tip-span');
      var leftMessage = $.createElement('tip-div');

      // Menu Item Start
      var chatOption = $.createElement('tip-span');
      var moreVertIcon = $.createElement('img');
      var moreVertMenu = $.createElement('tip-div');
      var deleteMenu = $.createElement('tip-span');
      var reportMenu = $.createElement('tip-span');

      chatOption.className = 'chatOption';
      moreVertMenu.className = 'moreVertMenu';
      deleteMenu.className = 'menuOption';
      reportMenu.className = 'menuOption';

      deleteMenu.innerText = 'Delete';
      reportMenu.innerText = 'Report';
      moreVertIcon.src = './assets/image/more_vert.png';

      moreVertIcon.onclick = function (e) {
        if (!token) {
          return;
        }

        const allMenu = $.querySelectorAll(".moreVertMenu");

        for (let i = 0; i < allMenu.length; i++) {
          allMenu[i].style.display = 'none';
        }

        if ((chatRoomChat.clientWidth - messageBox.clientWidth) < 115) {
          moreVertMenu.classList.add('right');
        } else {
          moreVertMenu.classList.remove('right');
        }

        moreVertMenu.style.display = 'flex';
        e.stopPropagation();
      }

      // Report Message
      reportMenu.onclick = async function () {
        showReportOpt(data._id);
      }

      // Admin Delete Message
      if (isAdmin) {
        deleteMenu.onclick = async function () {
          showDeleteOpt(data, chatOption, chatContent);
        }

        moreVertMenu.appendChild(deleteMenu);
      }

      moreVertMenu.appendChild(reportMenu);
      chatOption.appendChild(moreVertIcon);
      chatOption.appendChild(moreVertMenu);

      if (!data.deleted) {
        messageBox.appendChild(chatOption);
      }
      // Menu Item End

      chatIcon.className = 'chatIcon';
      chatName.className = 'chatName';
      chatDate.className = 'chatDateTime';
      messageBox.className = 'messageBox';
      chatContent.className = 'chatContent';
      leftMessage.className = 'chat-left';

      chatName.innerText = data.userId.username;
      chatDate.innerText = currentTime(data.createdAt);
      chatContent.innerHTML = data.deleted ? '<i class="deleted">Deleted</i>' : markupText(data.message);
      chatIcon.src = data.userId.img ? 'https://tipestry.com/api/topic/get/img/' + data.userId.img : './assets/image/profile.png';

      leftMessage.appendChild(chatIcon);
      leftMessage.appendChild(chatBox);
      chatBox.appendChild(chatName);
      chatName.appendChild(chatDate);

      chatBox.appendChild(messageBox);
      messageBox.appendChild(chatContent);
      chatRoomChat.prepend(leftMessage);
    } else {
      var chatBox = $.createElement('tip-span');
      var chatName = $.createElement('tip-span');
      var chatDate = $.createElement('tip-span');
      var messageBox = $.createElement('tip-span');
      var chatContent = $.createElement('tip-span');
      var rightMessage = $.createElement('tip-div');

      // Menu Item Start
      var chatOption = $.createElement('tip-span');
      var moreVertIcon = $.createElement('img');
      var moreVertMenu = $.createElement('tip-div');
      var deleteMenu = $.createElement('tip-span');

      chatOption.className = 'chatOption';
      moreVertMenu.className = 'moreVertMenu';
      deleteMenu.className = 'menuOption';

      deleteMenu.innerText = 'Delete';
      moreVertIcon.src = './assets/image/more_vert.png';

      moreVertIcon.onclick = function (e) {
        const allMenu = $.querySelectorAll(".moreVertMenu");

        for (let i = 0; i < allMenu.length; i++) {
          allMenu[i].style.display = 'none';
        }

        moreVertMenu.style.display = 'flex';
        e.stopPropagation();
      }

      // Delete Own Message
      deleteMenu.onclick = async function () {
        try {
          const headers = {
            "x-auth-token": token
          };

          await axios({
            method: "post",
            headers,
            url: 'https://new.tipestry.com/api/chat/delete',
            data: { id: data._id },
          });

          chatOption.remove();
          chatContent.innerHTML = '<i class="deleted">Deleted</i>';

          // Update Chat List
          let message = $.getElementsByClassName('message-' + data.siteId);

          for (let i = 0; i < message.length; i++) {
            message[i].innerHTML = '<i class="deleted">Deleted</i>';
          }
        } catch (error) {
          console.log(error);
        }
      }

      moreVertMenu.appendChild(deleteMenu);
      chatOption.appendChild(moreVertIcon);
      chatOption.appendChild(moreVertMenu);

      if (!data.deleted) {
        messageBox.appendChild(chatOption);
      }
      // Menu Item End

      chatName.className = 'chatName';
      chatDate.className = 'chatDateTime';
      messageBox.className = 'messageBox';
      chatContent.className = 'chatContent';
      rightMessage.className = 'chat-right';

      chatDate.innerText = currentTime(data.createdAt);
      chatContent.innerHTML = data.deleted ? '<i class="deleted">Deleted</i>' : markupText(data.message);

      rightMessage.appendChild(chatBox);
      chatBox.appendChild(chatName);
      chatName.appendChild(chatDate);

      chatBox.appendChild(messageBox);
      messageBox.appendChild(chatContent);
      chatRoomChat.prepend(rightMessage);
    }
  }

  // Display media chat
  function mediaChat(data, userId) {
    let play = false;

    if (userId != data.userId._id) {
      var chatIcon = $.createElement('img');
      var chatBox = $.createElement('tip-span');
      var chatName = $.createElement('tip-span');
      var chatDate = $.createElement('tip-span');
      var messageBox = $.createElement('tip-span');
      var chatContent = $.createElement('tip-span');
      var chatDownload = $.createElement('a');
      var chatDownloadImg = $.createElement('img');
      var leftMessage = $.createElement('tip-div');

      if (data.media.type == 'image/svg' || data.media.type == 'image/webp' || data.media.type == 'image/jpeg' || data.media.type == 'image/png' || data.media.type == 'image/gif') {
        if (!data.deleted) {
          var chatImage = $.createElement('img');
          chatImage.src = data.media.data;

          chatContent.appendChild(chatImage);
        } else {
          chatContent.innerHTML = '<i class="deleted">Deleted</i>';
        }
      } else if (data.media.type == 'video/mp4' || data.media.type == 'video/webm' || data.media.type == 'audio/ogg') {
        if (!data.deleted) {
          var chatVideo = $.createElement('video');
          var videoPlay = $.createElement('img');

          videoPlay.src = './assets/image/play.png';
          videoPlay.className = 'videoPlay';
          chatVideo.src = data.media.data;
          chatVideo.controls = false;
          chatVideo.muted = false;

          chatContent.appendChild(videoPlay);
          chatContent.appendChild(chatVideo);

          videoPlay.onclick = function () {
            if (!play) {
              play = true;
              chatVideo.play();
              videoPlay.src = './assets/image/pause.png';
            } else {
              play = false;
              chatVideo.pause();
              videoPlay.src = './assets/image/play.png';
            }
          }

          chatVideo.onended = function () {
            play = false;
            videoPlay.src = './assets/image/play.png';
          }
        } else {
          chatContent.innerHTML = '<i class="deleted">Deleted</i>';
        }
      } else {
        if (!data.deleted) {
          var chatFile = $.createElement('tip-span');
          chatFile.innerText = data.media.name;
          chatFile.className = 'chatFile';
          chatDownload.className = "chatImage-child-2";

          chatContent.appendChild(chatFile);
        } else {
          chatContent.innerHTML = '<i class="deleted">Deleted</i>';
        }
      }

      // Menu Item Start
      var chatOption = $.createElement('tip-span');
      var moreVertIcon = $.createElement('img');
      var moreVertMenu = $.createElement('tip-div');
      var deleteMenu = $.createElement('tip-span');
      var reportMenu = $.createElement('tip-span');

      chatOption.className = 'chatOption';
      moreVertMenu.className = 'moreVertMenu';
      deleteMenu.className = 'menuOption';
      reportMenu.className = 'menuOption';

      deleteMenu.innerText = 'Delete';
      reportMenu.innerText = 'Report';
      moreVertIcon.src = './assets/image/more_vert.png';

      moreVertIcon.onclick = function (e) {
        if (!token) {
          return;
        }

        const allMenu = $.querySelectorAll(".moreVertMenu");

        for (let i = 0; i < allMenu.length; i++) {
          allMenu[i].style.display = 'none';
        }

        if ((chatRoomChat.clientWidth - messageBox.clientWidth) < 115) {
          moreVertMenu.classList.add('right');
        } else {
          moreVertMenu.classList.remove('right');
        }

        moreVertMenu.style.display = 'flex';
        e.stopPropagation();
      }

      // Report Message
      reportMenu.onclick = async function () {
        showReportOpt(data._id);
      }

      // Admin Delete Message
      if (isAdmin) {
        deleteMenu.onclick = async function () {
          showDeleteOpt(data, chatOption, chatContent);
        }

        moreVertMenu.appendChild(deleteMenu);
      }

      moreVertMenu.appendChild(reportMenu);
      chatOption.appendChild(moreVertIcon);
      chatOption.appendChild(moreVertMenu);

      if (!data.deleted) {
        messageBox.appendChild(chatOption);
      }
      // Menu Item End

      chatIcon.className = 'chatIcon';
      chatName.className = 'chatName';
      chatDate.className = 'chatDateTime';
      messageBox.className = 'messageBox';
      chatContent.className = data.deleted ? 'chatContent' : 'chatMedia';
      chatDownloadImg.className = 'chatImage-child-1';
      leftMessage.className = 'chat-left';

      chatName.innerText = data.userId.username;
      chatDate.innerText = currentTime(data.createdAt);

      if (!data.deleted) {
        chatDownload.href = data.media.data;
        chatDownload.setAttribute('download', data.media.name);
        chatDownloadImg.src = './assets/image/download.png';
      }

      chatIcon.src = data.userId.img ? 'https://tipestry.com/api/topic/get/img/' + data.userId.img : './assets/image/profile.png';

      leftMessage.appendChild(chatIcon);
      leftMessage.appendChild(chatBox);
      chatBox.appendChild(chatName);
      chatName.appendChild(chatDate);
      chatBox.appendChild(messageBox);
      messageBox.appendChild(chatContent);

      if (!data.deleted) {
        chatContent.appendChild(chatDownload);
        chatDownload.appendChild(chatDownloadImg);
      }

      chatRoomChat.prepend(leftMessage);
    } else {
      var chatBox = $.createElement('tip-span');
      var chatName = $.createElement('tip-span');
      var chatDate = $.createElement('tip-span');
      var messageBox = $.createElement('tip-span');
      var chatContent = $.createElement('tip-span');
      var chatDownload = $.createElement('a');
      var chatDownloadImg = $.createElement('img');
      var rightMessage = $.createElement('tip-div');

      if (data.media.type == 'image/svg' || data.media.type == 'image/webp' || data.media.type == 'image/jpeg' || data.media.type == 'image/png' || data.media.type == 'image/gif') {
        if (!data.deleted) {
          var chatImage = $.createElement('img');
          chatImage.src = data.media.data;

          chatContent.appendChild(chatImage);
        } else {
          chatContent.innerHTML = '<i class="deleted">Deleted</i>';
        }

      } else if (data.media.type == 'video/mp4' || data.media.type == 'video/webm' || data.media.type == 'audio/ogg') {
        if (!data.deleted) {
          var chatVideo = $.createElement('video');
          var videoPlay = $.createElement('img');

          videoPlay.src = './assets/image/play.png';
          videoPlay.className = 'videoPlay';
          chatVideo.src = data.media.data;
          chatVideo.controls = false;
          chatVideo.muted = false;

          chatContent.appendChild(videoPlay);
          chatContent.appendChild(chatVideo);

          videoPlay.onclick = function () {
            if (!play) {
              play = true;
              chatVideo.play();
              videoPlay.src = './assets/image/pause.png';
            } else {
              play = false;
              chatVideo.pause();
              videoPlay.src = './assets/image/play.png';
            }
          }

          chatVideo.onended = function () {
            play = false;
            videoPlay.src = './assets/image/play.png';
          }
        } else {
          chatContent.innerHTML = '<i class="deleted">Deleted</i>';
        }
      } else {
        if (!data.deleted) {
          var chatFile = $.createElement('tip-span');
          chatFile.className = 'chatFile';
          chatFile.innerText = data.media.name;
          chatDownload.className = "chatImage-child-2";

          chatContent.appendChild(chatFile);
        } else {
          chatContent.innerHTML = '<i class="deleted">Deleted</i>';
        }
      }

      // Menu Item Start
      var chatOption = $.createElement('tip-span');
      var moreVertIcon = $.createElement('img');
      var moreVertMenu = $.createElement('tip-div');
      var deleteMenu = $.createElement('tip-span');

      chatOption.className = 'chatOption';
      moreVertMenu.className = 'moreVertMenu';
      deleteMenu.className = 'menuOption';

      deleteMenu.innerText = 'Delete';
      moreVertIcon.src = './assets/image/more_vert.png';

      moreVertIcon.onclick = function (e) {
        const allMenu = $.querySelectorAll(".moreVertMenu");

        for (let i = 0; i < allMenu.length; i++) {
          allMenu[i].style.display = 'none';
        }

        moreVertMenu.style.display = 'flex';
        e.stopPropagation();
      }

      deleteMenu.onclick = async function () {
        try {
          const headers = {
            "x-auth-token": token
          };

          await axios({
            method: "post",
            headers,
            url: 'https://new.tipestry.com/api/chat/delete',
            data: { id: data._id },
          });

          chatOption.remove();
          chatContent.className = 'chatContent';
          chatContent.innerHTML = '<i class="deleted">Deleted</i>';

          // Update Chat List
          let message = $.getElementsByClassName('message-' + data.siteId);

          for (let i = 0; i < message.length; i++) {
            message[i].innerHTML = '<i class="deleted">Deleted</i>';
          }
        } catch (error) {
          console.log(error);
        }
      }

      moreVertMenu.appendChild(deleteMenu);
      chatOption.appendChild(moreVertIcon);
      chatOption.appendChild(moreVertMenu);

      if (!data.deleted) {
        messageBox.appendChild(chatOption);
      }
      // Menu Item End

      chatName.className = 'chatName';
      chatDate.className = 'chatDateTime';
      messageBox.className = 'messageBox';
      chatContent.className = data.deleted ? 'chatContent' : 'chatMedia';
      chatDownloadImg.className = 'chatImage-child-1';
      rightMessage.className = 'chat-right';

      chatDate.innerText = currentTime(data.createdAt);

      if (!data.deleted) {
        chatDownload.href = data.media.data;
        chatDownload.setAttribute('download', data.media.name);
        chatDownloadImg.src = './assets/image/download.png';
      }

      rightMessage.appendChild(chatBox);
      chatBox.appendChild(chatName);
      chatName.appendChild(chatDate);
      chatBox.appendChild(messageBox);
      messageBox.appendChild(chatContent);

      if (!data.deleted) {
        chatContent.appendChild(chatDownload);
        chatDownload.appendChild(chatDownloadImg);
      }

      chatRoomChat.prepend(rightMessage);
    }
  }

  // Load Emoji
  async function loadEmoji() {
    try {
      const icon = await axios.get('https://emoji-api.com/categories/smileys-emotion?access_key=b5e8d6e29b6b255bfe6c2eac7c4e216e5dc43953');

      if (icon.data) {
        chatEmojiInner.innerHTML = "";

        icon.data.map((item) => {
          var emoji = $.createElement('tip-span');
          emoji.className = "tipEmojiIcon";
          emoji.innerHTML = "&#x" + item.codePoint.split(' ')[0];

          emoji.onclick = function () {
            chatRoomInput.value = chatRoomInput.value + emoji.innerHTML;
          }

          chatEmojiInner.appendChild(emoji);
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Search Emoji Function
  async function searchEmoji() {
    let search = chatEmojiInput.value;
    if (search) {
      try {
        const data = await axios.get('https://emoji-api.com/emojis?search=' + search + '&access_key=b5e8d6e29b6b255bfe6c2eac7c4e216e5dc43953');

        if (!data.data.status) {
          if (data.data) {
            chatEmojiInput.value = '';
            chatEmojiInner.innerHTML = '';

            data.data.map((item) => {
              var emoji = $.createElement('tip-span');
              emoji.className = "tipEmojiIcon";
              emoji.innerHTML = "&#x" + item.codePoint.split(' ')[0];

              emoji.onclick = function () {
                chatRoomInput.value = chatRoomInput.value + emoji.innerHTML;
              }

              chatEmojiInner.appendChild(emoji);
            })
          }
        } else {
          chatEmojiInput.value = '';
          chatEmojiInner.innerHTML = '';

          var noEmojiBox = $.createElement('tip-span');
          var emoji = $.createElement('tip-span');
          var text = $.createElement('tip-span');

          noEmojiBox.className = "tipNoEmojiBox";
          text.className = "tipNoTextEmoji";
          text.innerText = "No Emoji Found";
          emoji.className = "tipNoEmoji";
          emoji.innerHTML = "&#x2639";

          noEmojiBox.appendChild(emoji);
          noEmojiBox.appendChild(text);
          chatEmojiInner.appendChild(noEmojiBox);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  // Get left box list
  async function getChatListData() {
    try {
      getMyChat();
      connectSocket();
      getTrendingRoom();

      let host = setURL().host;

      const site = await axios.post("https://new.tipestry.com/api/site", {
        url: host,
      });

      siteId = site.data._id;
      homeSiteId = site.data._id;

      getHomeChat();
    } catch (error) {
      console.log(error);
    }
  }

  // Get Home chat
  async function getHomeChat(current = false) {
    function getMetaChat(data) {
      let host = setURL().hostname;

      var chatRoomMyChatList = $.createElement('tip-div');
      var chatRoomMyChatListProfile = $.createElement('img');
      var chatRoomMyChatListContent = $.createElement('tip-span');
      var chatRoomMyChatListRoom = $.createElement('tip-span');
      var chatRoomMyChatListData = $.createElement('tip-div');
      var chatRoomMyChatListUser = $.createElement('tip-span');
      var chatRoomMyChatListMessage = $.createElement('tip-span');
      var chatRoomMyChatListTime = $.createElement('tip-span');

      chatRoomMyChatList.className = 'chatRoomMyChatList currentSite ' + (current ? 'active' : '');
      chatRoomMyChatListProfile.className = 'chatRoomMyChatListProfile';
      chatRoomMyChatListContent.className = 'chatRoomMyChatListContent';
      chatRoomMyChatListRoom.className = 'chatRoomMyChatListRoom';
      chatRoomMyChatListData.className = 'chatRoomMyChatListData';
      chatRoomMyChatListUser.className = 'chatRoomMyChatListUser user-' + homeSiteId;
      chatRoomMyChatListMessage.className = 'chatRoomMyChatListMessage message-' + homeSiteId;
      chatRoomMyChatListTime.className = 'chatRoomMyChatListTime time-' + homeSiteId;

      chatRoomMyChatListRoom.innerText = host;
      chatRoomMyChatListProfile.src = 'https://www.google.com/s2/favicons?sz=32&domain_url=https://' + host;
      chatRoomMyChatListUser.innerText = data.result.length ? shortUsername(data.result[0].userId.username) + ':' : '';
      chatRoomMyChatListMessage.innerHTML = data.result.length ? addEllipsis(data.result[0]) : '';
      chatRoomMyChatListTime.innerText = data.result.length ? timeAgo(data.result[0].createdAt) : '';

      chatRoomMyChatListData.appendChild(chatRoomMyChatListUser);
      chatRoomMyChatListData.appendChild(chatRoomMyChatListMessage);
      chatRoomMyChatListContent.appendChild(chatRoomMyChatListRoom);
      chatRoomMyChatListContent.appendChild(chatRoomMyChatListData);
      chatRoomMyChatList.appendChild(chatRoomMyChatListProfile);
      chatRoomMyChatList.appendChild(chatRoomMyChatListContent);
      chatRoomMyChatList.appendChild(chatRoomMyChatListTime);
      chatRoomMyHomeBox.appendChild(chatRoomMyChatList);

      chatRoomMyChatList.onclick = async function () {
        siteId = homeSiteId;
        await connectChatRoom(host);

        tipChatTabRoom.classList.add('active');
        tipChatTabAI.classList.remove('active');
        chatRoomTitle.before(tipChatTab);

        const reportBox = $.getElementsByClassName('reportBox');
        const chatList = $.querySelectorAll(".chatRoomMyChatList");

        reportBox.length ? reportBox[0].remove() : null;

        for (let i = 0; i < chatList.length; i++) {
          chatList[i].classList.remove("active");
        }

        chatRoomMyChatList.classList.add('active');
        chatRoomMyChatList.classList.remove("unread");
      }
    }

    try {
      const extraParam = {
        params: { q: homeSiteId, type: 'last' },
      }

      if (token) {
        extraParam['headers'] = { "x-auth-token": token };
      } else {
        extraParam['headers'] = {};
      }

      const chatData = await axios.get('https://new.tipestry.com/api/chat/list', extraParam);

      chatRoomMyHomeBox.innerHTML = "";
      getMetaChat(chatData.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Get favorite chat
  async function getMyChat() {
    try {
      chatRoomMyChatBox.innerHTML = "";

      if (token) {
        const extraParam = {
          headers: { "x-auth-token": token }
        };

        const data = await axios.get('https://new.tipestry.com/api/chat/favorite-chat', extraParam);

        data.data.result.map((item) => {
          getLastChat(item, 'favorite');
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Get trending room
  async function getTrendingRoom() {
    try {
      const data = await axios.get('https://new.tipestry.com/api/chat/trending-room');

      chatRoomTrendingBox.innerHTML = "";
      data.data.result.map((item) => {
        getLastChat(item, 'trending');
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Get Last Chat
  async function getLastChat(data, type) {
    var chatRoomMyChatList = $.createElement('tip-div');
    var chatRoomMyChatListProfile = $.createElement('img');
    var chatRoomMyChatListContent = $.createElement('tip-span');
    var chatRoomMyChatListRoom = $.createElement('tip-span');
    var chatRoomMyChatListData = $.createElement('tip-div');
    var chatRoomMyChatListUser = $.createElement('tip-span');
    var chatRoomMyChatListMessage = $.createElement('tip-span');
    var chatRoomMyChatListTime = $.createElement('tip-span');

    chatRoomMyChatList.className = 'chatRoomMyChatList ' + type;
    chatRoomMyChatListProfile.className = 'chatRoomMyChatListProfile';
    chatRoomMyChatListContent.className = 'chatRoomMyChatListContent';
    chatRoomMyChatListRoom.className = 'chatRoomMyChatListRoom';
    chatRoomMyChatListData.className = 'chatRoomMyChatListData';
    chatRoomMyChatListUser.className = 'chatRoomMyChatListUser user-' + data._id;
    chatRoomMyChatListMessage.className = 'chatRoomMyChatListMessage message-' + data._id;
    chatRoomMyChatListTime.className = 'chatRoomMyChatListTime time-' + data._id;

    if (siteId == data._id) {
      chatRoomMyChatList.classList.add("active");
    }

    if (type == 'favorite') {
      chatRoomMyChatListRoom.innerText = data.url;
      chatRoomMyChatListProfile.src = 'https://www.google.com/s2/favicons?sz=32&domain_url=https://' + data.url;
    } else {
      chatRoomMyChatListRoom.innerText = data.chat.siteId.url;
      chatRoomMyChatListProfile.src = 'https://www.google.com/s2/favicons?sz=32&domain_url=https://' + data.chat.siteId.url;
    }

    chatRoomMyChatListUser.innerText = data.chat ? shortUsername(data.chat.userId.username) + ':' : ''
    chatRoomMyChatListMessage.innerHTML = data.chat ? addEllipsis(data.chat) : '';
    chatRoomMyChatListTime.innerText = data.chat ? timeAgo(data.chat.createdAt) : '';
    chatRoomMyChatList.setAttribute('data-index', data.chat ? data.chat.createdAt : new Date());

    chatRoomMyChatListData.appendChild(chatRoomMyChatListUser);
    chatRoomMyChatListData.appendChild(chatRoomMyChatListMessage);
    chatRoomMyChatListContent.appendChild(chatRoomMyChatListRoom);
    chatRoomMyChatListContent.appendChild(chatRoomMyChatListData);
    chatRoomMyChatList.appendChild(chatRoomMyChatListProfile);
    chatRoomMyChatList.appendChild(chatRoomMyChatListContent);
    chatRoomMyChatList.appendChild(chatRoomMyChatListTime);

    if (type == 'favorite') {
      chatRoomMyChatBox.appendChild(chatRoomMyChatList);
    } else {
      chatRoomTrendingBox.appendChild(chatRoomMyChatList);
    }

    chatRoomMyChatList.onclick = async function () {
      siteId = data._id;
      homeSiteId = data._id;

      if (type == 'favorite') {
        let url = isValidUrl(data.url);
        if (url) {
          window.localStorage.setItem('url', url);

          await connectChatRoom(data.url);

          getHomeChat();
        } else {
          showAlertBox('Unable to open URL');
        }
      } else {
        let url = isValidUrl(data.chat.siteId.url);
        if (url) {
          window.localStorage.setItem('url', url);

          await connectChatRoom(data.chat.siteId.url);

          getHomeChat();
        } else {
          showAlertBox('Unable to open URL');
        }
      }

      tipChatTabRoom.classList.add('active');
      tipChatTabAI.classList.remove('active');
      chatRoomTitle.before(tipChatTab);

      const reportBox = $.getElementsByClassName('reportBox');
      const chatList = $.querySelectorAll(".chatRoomMyChatList");

      reportBox.length ? reportBox[0].remove() : null;

      for (let i = 0; i < chatList.length; i++) {
        chatList[i].classList.remove("active");
      }

      chatRoomMyChatList.classList.add("active");
      chatRoomMyChatList.classList.remove("unread");
    }
  }

  // Connect with ChatRoom
  async function connectChatRoom(host, href = null) {
    try {
      page = 2;
      roomHost = host;
      chatRoomOpen = true;
      var joinedUser = [];

      if (joinedSite.includes(siteId)) {
        chatRoomJoin.innerText = "Leave";
      } else {
        chatRoomJoin.innerText = "Join";
      }

      chatRoomName.innerText = host;

      if (socket) {
        socket.disconnect();
      }

      socket = io.connect('https://new.tipestry.com', {
        path: "/socket/",
        withCredentials: true
      });

      socket.on('connect', () => {
        getItem("user").then(function (items) {
          if (Object.entries(items).length) {
            socket.emit("join", { id: items.user._id, name: items.user.username, site: siteId }, (error) => {
              console.log(error)
            });

            getChat(items.user._id);
          } else {
            getChat();
          }
        });
      })

      socket.on('joined', (data) => {
        if (!joinedUser.includes(data.id)) {
          joinedUser.push(data.id);
          var centerMessage = $.createElement('tip-div');

          centerMessage.className = 'chat-center';
          centerMessage.innerHTML = data.content;
          chatRoomChat.appendChild(centerMessage);

          chatRoomBody.scrollTo(0, chatRoomBody.scrollHeight);
        }
      });

      socket.on('response', (data) => {
        var chatIcon = $.createElement('img');
        var chatBox = $.createElement('tip-span');
        var chatName = $.createElement('tip-span');
        var chatDate = $.createElement('tip-span');
        var messageBox = $.createElement('tip-span');
        var chatContent = $.createElement('tip-span');
        var leftMessage = $.createElement('tip-div');

        // Menu Item Start
        var chatOption = $.createElement('tip-span');
        var moreVertIcon = $.createElement('img');
        var moreVertMenu = $.createElement('tip-div');
        var deleteMenu = $.createElement('tip-span');
        var reportMenu = $.createElement('tip-span');

        chatOption.className = 'chatOption';
        moreVertMenu.className = 'moreVertMenu';
        deleteMenu.className = 'menuOption';
        reportMenu.className = 'menuOption';

        deleteMenu.innerText = 'Delete';
        reportMenu.innerText = 'Report';
        moreVertIcon.src = './assets/image/more_vert.png';

        moreVertIcon.onclick = function (e) {
          if (!token) {
            return;
          }

          const allMenu = $.querySelectorAll(".moreVertMenu");

          for (let i = 0; i < allMenu.length; i++) {
            allMenu[i].style.display = 'none';
          }

          if ((chatRoomChat.clientWidth - messageBox.clientWidth) < 115) {
            moreVertMenu.classList.add('right');
          } else {
            moreVertMenu.classList.remove('right');
          }

          moreVertMenu.style.display = 'flex';
          e.stopPropagation();
        }

        // Report Message
        reportMenu.onclick = async function () {
          showReportOpt(data._id);
        }

        // Admin Delete Message
        if (isAdmin) {
          deleteMenu.onclick = async function () {
            showDeleteOpt(data, chatOption, chatContent);
          }

          moreVertMenu.appendChild(deleteMenu);
        }

        moreVertMenu.appendChild(reportMenu);
        chatOption.appendChild(moreVertIcon);
        chatOption.appendChild(moreVertMenu);
        messageBox.appendChild(chatOption);
        // Menu Item End

        chatIcon.className = 'chatIcon';
        chatName.className = 'chatName';
        chatDate.className = 'chatDateTime';
        messageBox.className = 'messageBox';
        chatContent.className = 'chatContent';
        leftMessage.className = 'chat-left';

        chatName.innerText = data.name;
        chatDate.innerText = currentTime();
        chatContent.innerHTML = markupText(data.message);
        chatIcon.src = data.profile ? 'https://tipestry.com/api/topic/get/img/' + data.profile : './assets/image/profile.png';

        leftMessage.appendChild(chatIcon);
        leftMessage.appendChild(chatBox);
        chatBox.appendChild(chatName);
        chatName.appendChild(chatDate);
        chatBox.appendChild(messageBox);
        messageBox.appendChild(chatContent);
        chatRoomChat.appendChild(leftMessage);

        chatRoomBody.scrollTo(0, chatRoomBody.scrollHeight);
      });

      socket.on('responseFile', (data) => {
        let play = false;

        var chatIcon = $.createElement('img');
        var chatBox = $.createElement('tip-span');
        var chatName = $.createElement('tip-span');
        var chatDate = $.createElement('tip-span');
        var messageBox = $.createElement('tip-span');
        var chatContent = $.createElement('tip-span');
        var chatDownload = $.createElement('a');
        var chatDownloadImg = $.createElement('img');
        var leftMessage = $.createElement('tip-div');

        if (data.fileType == 'image/svg' || data.fileType == 'image/webp' || data.fileType == 'image/jpeg' || data.fileType == 'image/png' || data.fileType == 'image/gif') {
          var chatImage = $.createElement('img');
          chatImage.src = data.fileData;

          chatContent.appendChild(chatImage);
        } else if (data.fileType == 'video/mp4' || data.fileType == 'video/webm' || data.fileType == 'audio/ogg') {
          var chatVideo = $.createElement('video');
          var videoPlay = $.createElement('img');

          videoPlay.src = './assets/image/play.png';
          videoPlay.className = 'videoPlay';
          chatVideo.src = data.fileData;
          chatVideo.controls = false;
          chatVideo.muted = false;

          chatContent.appendChild(videoPlay);
          chatContent.appendChild(chatVideo);

          videoPlay.onclick = function () {
            if (!play) {
              play = true;
              chatVideo.play();
              videoPlay.src = './assets/image/pause.png';
            } else {
              play = false;
              chatVideo.pause();
              videoPlay.src = './assets/image/play.png';
            }
          }

          chatVideo.onended = function () {
            play = false;
            videoPlay.src = './assets/image/play.png';
          }
        } else {
          var chatFile = $.createElement('tip-span');
          chatFile.innerText = data.fileName;
          chatFile.className = 'chatFile';
          chatDownload.className = "chatImage-child-2";

          chatContent.appendChild(chatFile);
        }

        // Menu Item Start
        var chatOption = $.createElement('tip-span');
        var moreVertIcon = $.createElement('img');
        var moreVertMenu = $.createElement('tip-div');
        var deleteMenu = $.createElement('tip-span');
        var reportMenu = $.createElement('tip-span');

        chatOption.className = 'chatOption';
        moreVertMenu.className = 'moreVertMenu';
        deleteMenu.className = 'menuOption';
        reportMenu.className = 'menuOption';

        deleteMenu.innerText = 'Delete';
        reportMenu.innerText = 'Report';
        moreVertIcon.src = './assets/image/more_vert.png';

        moreVertIcon.onclick = function (e) {
          if (!token) {
            return;
          }

          const allMenu = $.querySelectorAll(".moreVertMenu");

          for (let i = 0; i < allMenu.length; i++) {
            allMenu[i].style.display = 'none';
          }

          if ((chatRoomChat.clientWidth - messageBox.clientWidth) < 115) {
            moreVertMenu.classList.add('right');
          } else {
            moreVertMenu.classList.remove('right');
          }

          moreVertMenu.style.display = 'flex';
          e.stopPropagation();
        }

        // Report Message
        reportMenu.onclick = async function () {
          showReportOpt(data._id);
        }

        // Admin Delete Message
        if (isAdmin) {
          deleteMenu.onclick = async function () {
            showDeleteOpt(data, chatOption, chatContent);
          }

          moreVertMenu.appendChild(deleteMenu);
        }

        moreVertMenu.appendChild(reportMenu);
        chatOption.appendChild(moreVertIcon);
        chatOption.appendChild(moreVertMenu);
        messageBox.appendChild(chatOption);
        // Menu Item End

        chatIcon.className = 'chatIcon';
        chatName.className = 'chatName';
        chatDate.className = 'chatDateTime';
        messageBox.className = 'messageBox';
        chatContent.className = 'chatMedia';
        chatDownloadImg.className = 'chatImage-child-1';
        leftMessage.className = 'chat-left';

        chatName.innerText = data.name;
        chatDate.innerText = currentTime();
        chatDownload.href = data.fileData;
        chatDownload.setAttribute('download', data.fileName);
        chatDownloadImg.src = './assets/image/download.png';
        chatIcon.src = data.profile ? 'https://tipestry.com/api/topic/get/img/' + data.profile : './assets/image/profile.png';

        leftMessage.appendChild(chatIcon);
        leftMessage.appendChild(chatBox);
        chatBox.appendChild(chatName);
        chatName.appendChild(chatDate);
        chatBox.appendChild(messageBox);
        messageBox.appendChild(chatContent);
        chatContent.appendChild(chatDownload);
        chatDownload.appendChild(chatDownloadImg);
        chatRoomChat.appendChild(leftMessage);

        chatRoomBody.scrollTo(0, chatRoomBody.scrollHeight);
      });

      socket.on('responseAll', (data) => {
        let user = $.getElementsByClassName('user-' + data.siteId);
        let message = $.getElementsByClassName('message-' + data.siteId);
        let time = $.getElementsByClassName('time-' + data.siteId);

        for (let i = 0; i < user.length; i++) {
          user[i].innerText = shortUsername(data.name) + ':';
          message[i].innerHTML = addEllipsis(data);
          time[i].innerText = currentTime('', 'time');

          user[i].closest('.chatRoomMyChatList').classList.add('unread');
          user[i].closest('.chatRoomMyChatList').setAttribute('data-index', new Date().toISOString());
        }

        SortData('trending');
        SortData('favorite');
      });

      leftMetaBox.style.display = 'none';
      rightMetaBox.style.display = 'none';
      headerBoxLeft.style.display = 'none';
      chatRoomData.style.display = 'block';
    } catch (error) {
      console.log(error);
    }
  }

  // Connect with socket
  async function connectSocket() {
    try {
      if (!socket) {
        socket = io.connect('https://new.tipestry.com', {
          path: "/socket/",
          withCredentials: true
        });
      }

      socket.on('responseAll', (data) => {
        let user = $.getElementsByClassName('user-' + data.siteId);
        let message = $.getElementsByClassName('message-' + data.siteId);
        let time = $.getElementsByClassName('time-' + data.siteId);

        for (let i = 0; i < user.length; i++) {
          user[i].innerText = shortUsername(data.name) + ':';
          message[i].innerHTML = addEllipsis(data);
          time[i].innerText = currentTime('', 'time');

          user[i].closest('.chatRoomMyChatList').classList.add('unread');
          user[i].closest('.chatRoomMyChatList').setAttribute('data-index', new Date().toISOString());
        }

        SortData('trending');
        SortData('favorite');
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Check API Usage
  async function checkAPIUsage() {
    return new Promise((resolve, reject) => {
      getItem("usage").then(function (items) {
        if (Object.entries(items).length) {
          if (items.usage.new) {
            if (items.usage.total <= items.usage.limit) {
              reject('Not logged-in');
            } else {
              setItem("usage", { new: true, limit: (items.usage.limit + 1), total: 10 });
              resolve(true);
            }
          } else {
            resolve(true);
          }
        } else {
          setItem("usage", { new: true, limit: 0, total: 10 });
          resolve(true);
        }
      });
    });
  }

  // Show alert message
  function showAlertBox(message) {
    alertBox.innerHTML = message;
    alertParent.className = "alertParent show";

    setTimeout(function () {
      alertParent.className = "alertParent";
    }, 2500);
  }

  // Show report option
  function showReportOpt(id) {
    var reportBox = $.createElement('tip-div');
    var label = $.createElement('tip-span');
    var optLabel = $.createElement('tip-span');
    var reportBtnBox = $.createElement('tip-div');
    var reportCancelBtn = $.createElement('tip-span');
    var reportSubmitBtn = $.createElement('tip-span');

    reportBox.className = 'reportBox';
    label.className = 'reportBoxLabel';
    optLabel.className = 'reportOptLabel';
    reportBtnBox.className = 'reportBtnBox';
    reportCancelBtn.className = 'reportBtn cancel';
    reportSubmitBtn.className = 'reportBtn submit';

    label.innerText = "Report this message";
    optLabel.innerText = "Why are you reporting this chat?";
    reportCancelBtn.innerText = 'Cancel';
    reportSubmitBtn.innerText = 'Report';

    reportBox.appendChild(label);
    reportBox.appendChild(optLabel);

    let reason;
    let optionArray = ["It's Violent", "It's Abusive", "It's Inappropriate", "It's Spam", "Others"];
    for (let i = 0; i < optionArray.length; i++) {
      var reportOptBox = $.createElement('tip-div');
      var reportOpt = $.createElement('input');
      var reportOptLabel = $.createElement('tip-span');

      reportOptBox.className = 'reportOptBox';

      reportOpt.type = 'radio';
      reportOpt.name = 'reason';
      reportOpt.value = optionArray[i];
      reportOptLabel.innerText = optionArray[i];

      reportOpt.onchange = function (e) {
        if (e.target.checked) {
          reason = e.target.value;
        }
      }

      reportBox.appendChild(reportOptBox);
      reportOptBox.appendChild(reportOpt);
      reportOptBox.appendChild(reportOptLabel);
    }

    reportCancelBtn.onclick = function () {
      reportBox.remove();
    }

    reportSubmitBtn.onclick = async function () {
      try {
        if (reason) {
          const headers = {
            "x-auth-token": token
          };

          const result = await axios({
            method: "post",
            headers,
            url: 'https://new.tipestry.com/api/chat/report',
            data: { id, reason, message: 'Report Message' },
          });

          reportBox.remove();
          showAlertBox(result.data);
        } else {
          showAlertBox('Please select any reason');
        }
      } catch (error) {
        console.log(error);
      }
    }

    reportBtnBox.appendChild(reportCancelBtn);
    reportBtnBox.appendChild(reportSubmitBtn);
    reportBox.appendChild(reportBtnBox);
    chatRoomData.appendChild(reportBox);
  }

  // Show delete option
  function showDeleteOpt(data, node1, node2) {
    var deleteBox = $.createElement('tip-div');
    var label = $.createElement('tip-span');
    var deleteBtnBox = $.createElement('tip-div');
    var deleteCancelBtn = $.createElement('tip-span');
    var deleteSubmitBtn = $.createElement('tip-span');

    deleteBox.className = 'reportBox';
    label.className = 'reportBoxLabel';
    deleteBtnBox.className = 'reportBtnBox';
    deleteCancelBtn.className = 'reportBtn cancel';
    deleteSubmitBtn.className = 'reportBtn submit';

    label.innerText = "Delete message";
    deleteCancelBtn.innerText = 'Cancel';
    deleteSubmitBtn.innerText = 'Delete';

    deleteBox.appendChild(label);

    let selectedItem = [];
    let optionArray = { delete: 'Delete this message', all: 'Delete all messages', ban: 'Ban this user' };
    Object.keys(optionArray).map((item) => {
      var deleteOptBox = $.createElement('tip-div');
      var deleteOpt = $.createElement('input');
      var deleteOptLabel = $.createElement('tip-span');

      deleteOptBox.className = 'reportOptBox';

      deleteOpt.type = 'checkbox';
      deleteOpt.value = item;
      deleteOptLabel.innerText = optionArray[item];

      deleteOpt.onchange = function (e) {
        if (e.target.checked) {
          selectedItem.push(e.target.value);
        } else {
          const index = selectedItem.indexOf(e.target.value);
          if (index > -1) {
            selectedItem.splice(index, 1);
          }
        }
      }

      deleteBox.appendChild(deleteOptBox);
      deleteOptBox.appendChild(deleteOpt);
      deleteOptBox.appendChild(deleteOptLabel);
    })

    deleteCancelBtn.onclick = function () {
      deleteBox.remove();
    }

    deleteSubmitBtn.onclick = async function () {
      try {
        if (selectedItem.length) {
          const headers = {
            "x-auth-token": token
          };

          await axios({
            method: "post",
            headers,
            url: 'https://new.tipestry.com/api/chat/admin-delete',
            data: { id: data._id, action: selectedItem.toString() },
          });

          node1.remove();
          deleteBox.remove();
          node2.className = 'chatContent';
          node2.innerHTML = '<i class="deleted">Deleted</i>';

          getItem("user").then(function (items) {
            if (Object.entries(items).length) {
              getChat(items.user._id);
            }
          });

          // Update Chat List
          let message = $.getElementsByClassName('message-' + data.siteId);

          for (let i = 0; i < message.length; i++) {
            message[i].innerHTML = '<i class="deleted">Deleted</i>';
          }
        } else {
          showAlertBox('Please select any option');
        }
      } catch (error) {
        console.log(error);
      }
    }

    deleteBtnBox.appendChild(deleteCancelBtn);
    deleteBtnBox.appendChild(deleteSubmitBtn);
    deleteBox.appendChild(deleteBtnBox);
    chatRoomData.appendChild(deleteBox);
  }

  // Get current TimeStamp
  function currentTime(dateTime = null, type = 'datetime') {
    var currentdate = dateTime ? new Date(dateTime) : new Date();

    var strDate = (currentdate.getMonth() + 1) + "/"
      + currentdate.getDate() + "/"
      + currentdate.getFullYear();

    var hours = currentdate.getHours();
    var minutes = currentdate.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    if (type == 'date') {
      return strDate;
    } else if (type == 'time') {
      return strTime;
    }

    return strDate + ' ' + strTime;
  }

  // Calculate time units
  function timeAgo(timestamp) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    const lastChat = new Date(timestamp);

    yesterday.setDate(today.getDate() - 1);

    if (lastChat >= today) {
      var hours = lastChat.getHours();
      var minutes = lastChat.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12;
      hours = hours ? hours : 12;

      const timeString = `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;

      return timeString;
    } else if (lastChat >= yesterday) {
      return "Yesterday";
    } else {
      const options = { year: "numeric", month: "short", day: "numeric" };
      const dateString = lastChat.toLocaleDateString(
        "en-US",
        options
      );

      return dateString;
    }
  }

  // Add ellipsis in username
  function shortUsername(data) {
    if (data.length > 10) {
      return data.slice(0, 10 - 2) + "..";
    } else {
      return data;
    }
  }

  // Add ellipsis in message
  function addEllipsis(data, url = false) {
    if (url) {
      if (data.length > 50) {
        return data.slice(0, 50 - 3) + "...";
      } else {
        return data;
      }
    }

    if (("deleted" in data)) {
      if (data.deleted) {
        return '<i class="deleted">Deleted</i>';
      }
    }

    if (data.message) {
      if (data.message.length > 30) {
        return data.message.split('<br/>').join(' ').slice(0, 30 - 3) + "...";
      } else {
        return data.message;
      }
    } else {
      if (
        data.media.type == "image/svg" ||
        data.media.type == "image/webp" ||
        data.media.type == "image/jpeg" ||
        data.media.type == "image/png" ||
        data.media.type == "image/gif"
      ) {
        return "&#x1F4F7; Photo";
      } else if (
        data.media.type == "video/mp4" ||
        data.media.type == "video/webm" ||
        data.media.type == "audio/ogg"
      ) {
        return "&#x25B6; Video";
      } else {
        return "&#x1F4C4; Document";
      }
    }
  }

  // Markup text messages
  function markupText(data) {
    data = data.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    data = data.replace(/\__(.*?)\__/g, '<i>$1</i>');
    data = data.replace(/\~~(.*?)\~~/g, '<strike>$1</strike>');
    data = data.replace(/\```(.*?)\```/g, '<code>$1</code>');
    data = data.replace(/((http:|https:)[^\s]+[\w])/g, '<a data-url="$1" class="tip-chat-link">$1</a>');

    return data;
  }

  // Store local data
  function setItem(key, value) {
    var data = {};
    data[key] = value;

    window.localStorage.setItem(key, JSON.stringify(data));
  }

  // Read local data
  function getItem(key) {
    return new Promise(function (resolve, reject) {
      var data = window.localStorage.getItem(key);
      if (data) {
        resolve(JSON.parse(data));
      }

      resolve({});
    })
  }

  // Delete local Data
  function removeItem(key) {
    window.localStorage.removeItem(key);
  }

  // Validate URL
  function isValidUrl(url) {
    try {
      if (url.indexOf("http://") == -1) {
        if (url.indexOf("https://") == -1) {
          url = 'https://' + url;
        }
      }

      new URL(url);
      return url;
    } catch (error) {
      return false;
    }
  }

  // Set URL
  function setURL() {
    let url = window.localStorage.getItem('url');
    if (url) {
      var match = url.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);

      return match && {
        href: url,
        protocol: match[1],
        host: match[2],
        hostname: match[3],
      };
    }
  }

  // Function to sort Data 
  function SortData(type) {
    function comparator(a, b) {
      if (a.dataset.index < b.dataset.index) {
        return 1;
      } else {
        return -1;
      }
    }

    if (type == 'trending') {
      var chatList = document.querySelectorAll(".trending");
      var chatArray = Array.from(chatList);
      let sortedChat = chatArray.sort(comparator);

      sortedChat.forEach(chat => chatRoomTrendingBox.appendChild(chat));
    } else if (type == 'favorite') {
      var chatList = document.querySelectorAll(".favorite");
      var chatArray = Array.from(chatList);
      let sortedChat = chatArray.sort(comparator);

      sortedChat.forEach(chat => chatRoomMyChatBox.appendChild(chat));
    }
  }

  // Append User Login Dailog
  userDialog.appendChild(userClose);
  userDialog.appendChild(dialogLabel);
  userDialog.appendChild(userEmail);
  userDialog.appendChild(userPassword);
  userDialog.appendChild(userBtn);
  userLink.appendChild(resetPass);
  userLink.appendChild(newUser);
  userDialog.appendChild(userLink);

  // Append User Profile Dailog
  userDetails.appendChild(userFullName);
  userDetails.appendChild(userSortName);
  otherInfo.appendChild(otherText);
  otherInfo.appendChild(otherBtn)
  userBtnBox.appendChild(userLogout);
  userBtnBox.appendChild(userVisit);
  profileBox.appendChild(closeProfile);
  profileBox.appendChild(userProfile);
  profileBox.appendChild(userDetails);
  profileBox.appendChild(otherInfo);
  profileBox.appendChild(userBtnBox);

  // Chat Box
  innerCard.appendChild(metaChat);
  innerCard.appendChild(userChat);

  // Append Body Content
  alertParent.appendChild(alertBox);
  container.appendChild(headerBox);
  container.appendChild(mainMetaBox);

  mainMetaBox.appendChild(leftMetaBox);
  mainMetaBox.appendChild(rightMetaBox);
  mainMetaBox.appendChild(chatRoomData);
  mainMetaBox.appendChild(userDialog);
  mainMetaBox.appendChild(profileBox);
  mainMetaBox.appendChild(alertParent);

  tipChatTab.appendChild(tipChatTabRoom);
  tipChatTab.appendChild(tipChatTabAI);
  rightMetaBox.appendChild(tipChatTab);

  leftMetaBox.appendChild(chatRoomMyHome);
  leftMetaBox.appendChild(chatRoomMyChat);
  leftMetaBox.appendChild(chatRoomTrending);
  rightMetaBox.appendChild(innerCard);
  rightMetaBox.appendChild(footerBox);
  rightMetaBox.appendChild(tipMicBox);

  headerBoxLeft.appendChild(headerInput);
  headerBoxRight.appendChild(headerSiteIcon);
  headerBoxRight.appendChild(tipHome);
  headerBoxRight.appendChild(tipUser);
  headerBox.appendChild(headerBoxLeft);
  headerBox.appendChild(headerBoxRight);

  footerBox.appendChild(checkOuter);
  footerBox.appendChild(inputOuter);
  inputOuter.appendChild(tipMic);
  inputOuter.appendChild(tipInput);
  inputOuter.appendChild(tipAISend);
  checkOuter.appendChild(tipCheckBox);
  checkOuter.appendChild(tipLabelFor);

  // Append Chat room
  chatEmojiFilter.appendChild(chatEmojiInput);
  chatEmojiFilter.appendChild(chatEmojiSearch);
  chatEmojiBox.appendChild(chatEmojiInner);
  chatEmojiBox.appendChild(chatEmojiFilter);

  chatRoomData.appendChild(chatRoomTitle);
  chatRoomTitle.appendChild(chatRoomBack);
  chatRoomTitle.appendChild(chatRoomName);
  chatRoomTitle.appendChild(chatRoomJoin);
  chatRoomData.appendChild(chatRoomBody);
  chatRoomBody.appendChild(chatLoadMore);
  chatRoomBody.appendChild(chatRoomChat);
  chatRoomData.appendChild(chatRoomFooter);
  chatRoomData.appendChild(chatEmojiBox);

  chatRoomMyHome.appendChild(chatRoomToggleMyHome);
  chatRoomMyHome.appendChild(chatRoomMyHomeBox);
  chatRoomMyChat.appendChild(chatRoomToggleMyChat);
  chatRoomMyChat.appendChild(chatRoomMyChatBox);
  chatRoomTrending.appendChild(chatRoomToggleTrending);
  chatRoomTrending.appendChild(chatRoomTrendingBox);
  chatRoomToggleMyHome.appendChild(chatRoomToggleIconMyHome);
  chatRoomToggleMyHome.appendChild(chatRoomToggleTextMyHome);
  chatRoomToggleMyChat.appendChild(chatRoomToggleIconMyChat);
  chatRoomToggleMyChat.appendChild(chatRoomToggleTextMyChat);
  chatRoomToggleTrending.appendChild(chatRoomToggleIconTrending);
  chatRoomToggleTrending.appendChild(chatRoomToggleTextTrending);

  chatRoomFooter.appendChild(chatRoomEmoji);
  chatRoomFooter.appendChild(chatRoomInput);
  chatRoomFooter.appendChild(chatRoomFile);
  chatRoomFooter.appendChild(chatRoomMedia);
  chatRoomFooter.appendChild(chatRoomSend);

  // Add Elements in Container
  metaContainer.appendChild(container);

  $.getElementById('containerBox').appendChild(metaContainer);
}
