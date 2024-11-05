if (!document.getElementById('tip-ext-container')) {
  // Global variables
  var prohibitedWords = [];
  var chatRoomOpen = false;
  var emojiOpen = false;
  var conversation = [];
  var isAdmin = false;
  var joinedSite = [];
  var captchaData = {
    url: null,
    validated: false
  };
  var replyData = {
    type: 'chat',
    chatId: null,
    username: null,
    datetime: null,
    is_media: false,
    chatContent: null,
  };
  var userId = null;
  var $ = document;
  var homeSiteId;
  var username;
  var roomHost;
  var topicId;
  var aiModel;
  var socket;
  var siteId;
  var token;
  var page;

  const defaultCoin = [
    {
      is_admin: false,
      ticker: 'bitcoin',
      tokenName: 'btc',
      icon: '/static/tipcoins/bit.svg',
    },
    {
      is_admin: false,
      ticker: 'dogecoin',
      tokenName: 'doge',
      icon: '/static/tipcoins/doge.svg',
    },
    {
      is_admin: false,
      ticker: 'superdog',
      tokenName: 'superdog',
      icon: '/static/tipcoins/superdog.png',
    },
    {
      is_admin: false,
      ticker: 'pres',
      tokenName: 'pres',
      icon: '/static/tipcoins/pres.png',
    },
    {
      is_admin: false,
      ticker: 'joe',
      tokenName: 'joe',
      icon: '/static/tipcoins/joe.png',
    },
    {
      is_admin: false,
      ticker: 'ye',
      tokenName: 'ye',
      icon: '/static/tipcoins/ye.png',
    },
    {
      is_admin: false,
      ticker: 'dogecoincash',
      tokenName: 'dogecoincash',
      icon: '/static/tipcoins/dogecoincash-small.png',
    },
    {
      is_admin: true,
      ticker: 'ethcoin',
      tokenName: 'tipcoin',
      icon: '/static/tipcoins/eth.svg',
    },
    {
      is_admin: true,
      ticker: 'ethtipc',
      tokenName: 'tipcoin',
      icon: '/static/tipcoins/tipc-small.png',
    },
    {
      is_admin: true,
      ticker: 'ethxrtcoin',
      tokenName: 'tipcoin',
      icon: '/static/tipcoins/xrt-small.png',
    },
    {
      is_admin: true,
      ticker: 'ethtipcoin',
      tokenName: 'tipcoin',
      icon: '/static/tipcoins/tip-small.png',
    }
  ];

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
  var checkDiscuss = $.createElement('tip-div');
  var checkHighLight = $.createElement('tip-div');
  var inputOuter = $.createElement('tip-div');
  var footerBox = $.createElement('tip-div');
  var metaChat = $.createElement('tip-div');
  var userChat = $.createElement('tip-div');
  var tipBottom = $.createElement('img');
  var tipHome = $.createElement('img');
  var tipUser = $.createElement('img');
  var tipDiscussCheck = $.createElement('input');
  var tipDiscussLabel = $.createElement('tip-span');
  var tipHighLightCheck = $.createElement('input');
  var tipHighLightLabel = $.createElement('tip-span');
  var headerInput = $.createElement('input');
  var headerLabel = $.createElement('tip-span');
  var headerSiteIcon = $.createElement('img');
  var headerSiteURL = $.createElement('tip-span');

  var imgPreview = $.createElement('tip-div');
  var previewClose = $.createElement('img');
  var previewBox = $.createElement('tip-div');
  var previewImage = $.createElement('img');

  imgPreview.className = 'imgPreview';
  previewBox.className = 'previewBox';
  previewClose.className = 'cross';

  // Chat room box start
  var chatRoomFooter = $.createElement('tip-div');
  var chatRoomFooterTool = $.createElement('tip-div');
  var chatRoomFooterReply = $.createElement('tip-div');
  var chatRoomFooterInput = $.createElement('tip-div');
  var chatRoomData = $.createElement('tip-div');
  var chatRoomBody = $.createElement('tip-div');
  var chatLoadMore = $.createElement('tip-span');
  var chatRoomInput = $.createElement('textarea');
  var chatRoomFile = $.createElement('input');
  var chatEmojiBox = $.createElement('tip-div');
  var chatEmojiInput = $.createElement('input');
  var chatEmojiSearch = $.createElement('img');
  var chatEmojiInner = $.createElement('tip-div');
  var chatEmojiFilter = $.createElement('tip-div');
  var chatRoomEditor = $.createElement('tip-span');
  var chatRoomEmoji = $.createElement('tip-span');
  var chatRoomMedia = $.createElement('tip-span');
  var chatRoomSend = $.createElement('tip-span');
  var chatEditClose = $.createElement('tip-span');
  var chatRoomTitle = $.createElement('tip-div');
  var chatRoomVoteBox = $.createElement('tip-div');
  var chatRoomVoteUp = $.createElement('img');
  var chatRoomVoteCount = $.createElement('tip-span');
  var chatRoomVoteDown = $.createElement('img');
  var chatRoomName = $.createElement('tip-span');
  var chatRoomJoin = $.createElement('tip-span');
  var chatRoomChat = $.createElement('tip-div');
  var dropBox = $.createElement('tip-div');

  var chatToolBold = $.createElement('tip-span');
  var chatToolItalic = $.createElement('tip-span');
  var chatToolStrike = $.createElement('tip-span');
  var chatToolCode = $.createElement('tip-span');

  var tipChatTab = $.createElement('tip-div');
  var tipChatTabRoomBox = $.createElement('tip-div');
  var tipChatTabAIBox = $.createElement('tip-div');
  var tipChatTabCommentBox = $.createElement('tip-div');
  var tipChatTabPresets = $.createElement('tip-div');

  var tipChatTabRoom = $.createElement('tip-div');
  var tipChatTabRoomCount = $.createElement('tip-span');
  var tipChatTabAI = $.createElement('tip-div');
  var tipTabAIIcon = $.createElement('img');
  var tipTabAIMenu = $.createElement('tip-div');
  var tipTabAIOpt_1 = $.createElement('tip-span');
  var tipTabAIOpt_2 = $.createElement('tip-span');
  var tipTabAIOpt_3 = $.createElement('tip-span');
  var tipChatTabComment = $.createElement('tip-div');
  var tipChatTabCommentCount = $.createElement('tip-span');

  var tipReplyClose = $.createElement('img');
  var tipReplyContainer = $.createElement('tip-div');
  var tipReplyMessage = $.createElement('tip-div');
  var tipReplyUser = $.createElement('tip-div');

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
  chatRoomFooterTool.className = 'chatRoomFooterTool';
  chatRoomFooterReply.className = 'chatRoomFooterReply only';
  chatRoomFooterInput.className = 'chatRoomFooterInput';
  chatRoomData.className = 'chatRoomData';
  chatRoomBody.className = 'tipInnerCard maxHeight';
  chatLoadMore.className = 'loadMore';
  chatRoomInput.className = 'tipInput';
  chatRoomFile.className = 'tipInputFile';
  chatRoomEditor.className = 'tipEditor';
  chatRoomEmoji.className = 'tipEmoji';
  chatEmojiBox.className = 'tipEmojiBox';
  chatEmojiInput.className = 'tipEmojiInput';
  chatEmojiSearch.className = 'tipEmojiSearch';
  chatEmojiInner.className = 'tipEmojiInner';
  chatEmojiFilter.className = 'tipEmojiFilter';
  chatRoomMedia.className = 'tipMedia';
  chatRoomSend.className = 'tipSend';
  chatEditClose.className = 'tipEditClose';
  chatRoomTitle.className = 'chatRoomTitle';
  chatRoomVoteBox.className = 'VoteBox';
  chatRoomVoteUp.className = 'upVote';
  chatRoomVoteDown.className = 'downVote';
  chatRoomName.className = 'chatRoomName';
  chatRoomJoin.className = 'chatRoomJoin';
  chatRoomChat.className = 'tipUserChat';
  dropBox.className = 'dragDropBox';

  tipChatTab.className = 'tipChatTab';
  tipChatTabRoomBox.className = 'tipChatTabAIBox';
  tipChatTabRoom.className = 'tipChatTabBox';
  tipChatTabRoomCount.className = 'tipChatTabRoomCount';
  tipChatTabAIBox.className = 'tipChatTabAIBox';
  tipChatTabAI.className = 'tipChatTabBox active';
  tipTabAIIcon.className = 'tipTabAIIcon';
  tipTabAIMenu.className = 'tipTabAIMenu';
  tipChatTabCommentBox.className = 'tipChatTabAIBox';
  tipChatTabComment.className = 'tipChatTabBox';
  tipChatTabCommentCount.className = 'tipChatTabRoomCount comment';
  tipChatTabPresets.className = 'tipChatTabBox';

  tipReplyContainer.className = 'tipReplyContainer';
  tipReplyMessage.className = 'tipReplyMessage';
  tipReplyUser.className = 'tipReplyUser';

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

  chatToolBold.innerText = 'B';
  chatToolItalic.innerText = 'I';
  chatToolStrike.innerText = 'S';
  chatToolCode.innerText = '</>';

  chatToolBold.title = 'Bold';
  chatToolItalic.title = 'Italic';
  chatToolStrike.title = 'Strike through';
  chatToolCode.title = 'Code';

  chatToolBold.setAttribute('data-value', '**');
  chatToolItalic.setAttribute('data-value', '__');
  chatToolStrike.setAttribute('data-value', '~~');
  chatToolCode.setAttribute('data-value', '```');

  tipChatTabRoom.innerText = 'CHAT';
  tipChatTabAI.innerText = 'AI';
  tipTabAIIcon.src = './assets/image/ai_menu.png';
  tipChatTabComment.innerText = 'COMMENTS';
  tipChatTabPresets.innerText = 'PRESETS';
  tipTabAIOpt_1.innerText = 'GPT-4o mini';
  tipTabAIOpt_2.innerText = 'GPT-4o';
  tipTabAIOpt_3.innerText = 'Images';

  chatRoomVoteUp.src = './assets/image/up-arrow-orange.png';
  chatRoomVoteDown.src = './assets/image/down-arrow-blue.png';
  tipReplyClose.src = './assets/image/cross.png';
  chatEmojiSearch.src = './assets/image/next.png';
  chatRoomInput.placeholder = 'Type your message...';
  chatRoomInput.setAttribute('autocomplete', 'off');
  chatEmojiBox.style.setProperty('display', 'none');
  chatEmojiInput.placeholder = 'Search emoji...';
  chatLoadMore.innerText = 'Load More';
  chatRoomVoteCount.innerText = '0';
  chatRoomJoin.innerText = 'Join';
  chatRoomFile.multiple = true;
  chatRoomFile.type = 'file';
  // Chat room box end

  // Comments box start
  var commentBox = $.createElement('tip-div');
  var commentBody = $.createElement('tip-div');
  var commentChat = $.createElement('tip-div');
  var commentHeader = $.createElement('tip-div');
  var commentVoteBox = $.createElement('tip-div');
  var commentVoteUp = $.createElement('img');
  var commentVoteCount = $.createElement('tip-span');
  var commentVoteDown = $.createElement('img');
  var commentCount = $.createElement('tip-span');
  var commentSortBox = $.createElement('tip-div');
  var commentSortText = $.createElement('tip-div');
  var commentSortImg = $.createElement('img');
  var commentSortTop = $.createElement('img');
  var commentSortNew = $.createElement('img');
  var commentSortOld = $.createElement('img');

  commentBox.className = 'chatRoomData';
  commentBody.className = 'tipInnerCard CommentMaxHeight';
  commentChat.className = 'tipUserChat';
  commentSortTop.className = 'sort-icon';
  commentSortNew.className = 'sort-icon';
  commentSortOld.className = 'sort-icon';
  commentHeader.className = 'commentTitle';
  commentVoteBox.className = 'VoteBox';
  commentVoteUp.className = 'upVote';
  commentVoteDown.className = 'downVote';
  commentSortBox.className = 'commentSort';
  commentSortText.className = 'commentSortText';

  commentSortTop.title = 'Top';
  commentSortNew.title = 'Newest';
  commentSortOld.title = 'Oldest';
  commentVoteCount.innerText = '0';
  commentCount.innerText = '0 Comments';
  commentSortText.innerText = 'Sort By';
  commentSortNew.src = './assets/image/new.png';
  commentSortImg.src = './assets/image/sort.png';
  commentSortOld.src = './assets/image/recent.png';
  commentSortTop.src = './assets/image/trending.png';
  commentVoteUp.src = './assets/image/up-arrow-orange.png';
  commentVoteDown.src = './assets/image/down-arrow-blue.png';
  // Comments box end

  // Presets box start
  var presetsBox = $.createElement('tip-div');
  var presetsBody = $.createElement('tip-div');
  var presetsChat = $.createElement('tip-div');
  var presetsUserChat = $.createElement('tip-div');

  presetsBox.className = 'presetsBox';
  presetsBody.className = 'tipInnerCard PresetsMaxHeight';
  presetsChat.className = 'tipMetaChat';
  presetsUserChat.className = 'tipUserChat';
  // Presets box end

  // Input Element AI tab 
  var tipAISend = $.createElement('tip-span');
  var tipInput = $.createElement('textarea');

  // Alert Message Element
  var alertParent = $.createElement('tip-div');
  var alertBox = $.createElement('tip-div');

  // User Login Dailog
  var userDialog = $.createElement('tip-div');
  var dialogLabel = $.createElement('tip-span');
  var userEmail = $.createElement('input');
  var userPassword = $.createElement('input');
  var userBtn = $.createElement('button');
  var googleLogin = $.createElement('tip-div');
  var userLink = $.createElement('tip-div');
  var captchaBox = $.createElement('tip-div');
  var captchaQuizBox = $.createElement('tip-div');
  var captchaValidateBox = $.createElement('tip-div');
  var captchaImage = $.createElement('img');
  var captchaReload = $.createElement('img');
  var captchaInput = $.createElement('input');
  var captchaValidatedImg = $.createElement('img');
  var captchaValidatedTxt = $.createElement('tip-span');
  var rememberBox = $.createElement('tip-div');
  var rememberInput = $.createElement('input');
  var rememberText = $.createElement('tip-span');
  var resetPass = $.createElement('a');
  var newUser = $.createElement('a');
  var userClose = $.createElement('tip-div');
  var emailLabel = $.createElement('tip-span');
  var passLabel = $.createElement('tip-span');

  // User Sign Up Dailog
  var signUpDialog = $.createElement('tip-div');
  var signUpLabel = $.createElement('tip-span');
  var signUpUserName = $.createElement('input');
  var signUpName = $.createElement('input');
  var signUpEmail = $.createElement('input');
  var signUpPassword = $.createElement('input');
  var signUpBtn = $.createElement('button');
  var loginLink = $.createElement('tip-div');
  var alreadyUser = $.createElement('a');
  var signUpClose = $.createElement('tip-div');
  var termsBox = $.createElement('tip-div');
  var termsInput = $.createElement('input');
  var termsText = $.createElement('tip-span');
  var signUpCaptchaBox = $.createElement('tip-div');
  var signUpCaptchaValidateBox = $.createElement('tip-div');
  var signUpCaptchaQuizBox = $.createElement('tip-div');
  var signUpCaptchaImage = $.createElement('img');
  var signUpCaptchaReload = $.createElement('img');
  var signUpCaptchaInput = $.createElement('input');
  var signUpCaptchaValidatedImg = $.createElement('img');
  var signUpCaptchaValidatedTxt = $.createElement('tip-span');

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

  // User Profile Menu
  var userMenu = $.createElement('tip-div');
  var userDialogList = $.createElement('ul');
  var dialogItem_1 = $.createElement('li');
  var dialogItem_2 = $.createElement('li');
  var dialogItem_3 = $.createElement('li');
  var img_1 = $.createElement('img');
  var img_2 = $.createElement('img');
  var img_3 = $.createElement('img');
  var text_1 = $.createElement('tip-span');
  var text_2 = $.createElement('tip-span');
  var text_3 = $.createElement('tip-span');

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
  var chat_13 = $.createElement('tip-div');
  var chat_14 = $.createElement('tip-div');
  var chat_15 = $.createElement('tip-div');
  var chat_16 = $.createElement('tip-div');
  var chat_17 = $.createElement('tip-div');
  var chat_18 = $.createElement('tip-div');
  var chat_19 = $.createElement('tip-div');
  var chat_20 = $.createElement('tip-div');

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
  chat_13.className = 'span-right';
  chat_14.className = 'span-right';
  chat_15.className = 'span-right';
  chat_16.className = 'span-right';
  chat_17.className = 'span-right';
  chat_18.className = 'span-right';
  chat_19.className = 'span-right';
  chat_20.className = 'span-right';

  // Suggested Option Content
  chat_1.innerHTML = "Hi, I'm your MetaChat copilot for the web. To get started, enter a message or select from the following topics. To discuss the web page you are currently on, check the box below.";
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
  chat_13.innerHTML = 'Summarize the main point of this page.';
  chat_14.innerHTML = 'Write a reply to this.';
  chat_15.innerHTML = "Answer the question in this article's title.";
  chat_16.innerHTML = 'Identify and explain any complex terms or jargon on this page.';
  chat_17.innerHTML = 'List the key takeaways from this page.';
  chat_18.innerHTML = 'Analyze the tone and style of this writing. Is it biased, or neutral?';
  chat_19.innerHTML = 'Suggest a useful question to ask as about this page, and then answer it.';
  chat_20.innerHTML = 'How popular is this site?';

  // Append Suggested Option
  metaChat.appendChild(chat_1);
  presetsChat.appendChild(chat_2);
  presetsChat.appendChild(chat_3);
  presetsChat.appendChild(chat_4);
  presetsChat.appendChild(chat_5);
  presetsChat.appendChild(chat_6);
  metaChat.appendChild(chat_7);
  presetsChat.appendChild(chat_8);
  presetsChat.appendChild(chat_9);
  presetsChat.appendChild(chat_10);
  presetsChat.appendChild(chat_11);
  presetsChat.appendChild(chat_12);
  metaChat.appendChild(chat_13);
  metaChat.appendChild(chat_14);
  metaChat.appendChild(chat_15);
  metaChat.appendChild(chat_16);
  metaChat.appendChild(chat_17);
  metaChat.appendChild(chat_18);
  metaChat.appendChild(chat_19);
  presetsChat.appendChild(chat_20);

  // Set attributes & content
  metaContainer.id = 'tip-ext-container';
  container.className = 'tipContainer';
  headerBox.className = 'tipHeaderBox';
  headerBoxLeft.className = 'headerBoxLeft';
  headerBoxRight.className = 'headerBoxRight';
  mainMetaBox.className = 'mainMetaBox';
  leftMetaBox.className = 'leftMetaBox';
  rightMetaBox.className = 'rightMetaBox';
  checkDiscuss.className = 'tipCheckOuter';
  checkHighLight.className = 'tipCheckOuter';
  inputOuter.className = 'tipInputOuter';
  footerBox.className = 'tipFooterBox metaChat';
  innerCard.className = 'tipInnerCard';
  metaChat.className = 'tipMetaChat';
  userChat.className = 'tipUserChat';
  tipBottom.className = 'tipBottom';
  tipHome.className = 'tipHome';
  tipUser.className = 'tipUser';
  headerInput.className = 'tipInput';
  headerLabel.className = 'headerLabel';
  headerSiteURL.className = 'headerSiteURL';
  headerSiteIcon.className = 'headerSiteIcon';

  // AI Tab Input Class
  tipAISend.className = 'tipAISend';
  tipInput.className = 'tipInput';

  // Alert Box Element Class
  alertParent.className = 'alertParent';
  alertBox.className = 'alertBox';

  // User Login Dialog Class
  emailLabel.className = 'inputLabel';
  passLabel.className = 'inputLabel';
  dialogLabel.className = 'dialogLabel';
  userDialog.className = 'userDialog';
  googleLogin.className = 'google-btn';
  userLink.className = 'userLink';
  userClose.className = 'userClose';
  captchaBox.className = 'captchaBox';
  captchaQuizBox.className = 'quizBox';
  captchaValidateBox.className = 'validated';
  captchaReload.className = 'reload';
  rememberBox.className = 'rememberBox';

  // User Sign Up Dialog Class
  signUpLabel.className = 'dialogLabel';
  signUpDialog.className = 'userDialog inputMargin';
  loginLink.className = 'userLoginLink';
  signUpClose.className = 'userClose';
  signUpCaptchaBox.className = 'captchaBox';
  signUpCaptchaQuizBox.className = 'quizBox';
  signUpCaptchaValidateBox.className = 'validated';
  signUpCaptchaReload.className = 'reload';
  termsBox.className = 'rememberBox';

  // User Profile Dialog Class
  closeProfile.className = 'cross';
  profileBox.className = 'profileBox';
  userDetails.className = 'userDetails';
  userFullName.className = 'name';
  userSortName.className = 'username';
  otherInfo.className = 'otherInfo';
  userBtnBox.className = 'userBtnBox';

  // User drop down Menu class
  userMenu.className = 'profileMenu';

  // MetaChat Content
  tipHome.title = 'Back to top';
  tipBottom.title = 'Back to bottom';
  tipHome.src = './assets/image/top.png';
  tipUser.src = './assets/image/user.png';
  tipBottom.src = './assets/image/top.png';
  tipDiscussCheck.type = 'checkbox';
  tipHighLightCheck.type = 'checkbox';
  tipDiscussLabel.innerText = 'Discuss the current page';
  tipHighLightLabel.innerText = 'Discuss highlighted text';
  headerInput.setAttribute('autocomplete', 'off');
  headerInput.placeholder = 'Enter a URL to chat about any website';
  headerLabel.innerText = 'Current Site:';

  // AI & Input Content
  tipInput.placeholder = 'Type your message...';
  tipInput.setAttribute('autocomplete', 'off');
  tipInput.setAttribute('autofocus', true);

  // User Login Dailog Content
  emailLabel.innerText = 'Email Address';
  passLabel.innerText = 'Password';
  dialogLabel.innerText = 'LOGIN';
  userEmail.setAttribute('autocomplete', 'off');
  userPassword.setAttribute('autocomplete', 'off');
  userPassword.style.setProperty('-webkit-text-security', 'disc');
  userBtn.innerText = 'LOGIN';
  resetPass.target = 'blank';
  rememberInput.setAttribute('type', 'checkbox');
  rememberText.innerText = 'Remember me';
  userLink.innerText = 'Not a member? ';
  newUser.innerText = 'Sign up now';
  resetPass.innerText = 'Forgot Password?';
  resetPass.href = 'https://tipestry.com/forgot';
  captchaReload.src = '../assets/image/refresh.png';
  captchaValidatedTxt.innerText = 'Captcha Validated';
  captchaValidatedImg.src = '../assets/image/checked.png';

  // User Sign Up Dailog Content
  signUpLabel.innerText = 'SIGN UP';
  signUpUserName.setAttribute('autocomplete', 'off');
  signUpName.setAttribute('autocomplete', 'off');
  signUpEmail.setAttribute('autocomplete', 'off');
  signUpPassword.setAttribute('autocomplete', 'off');
  signUpPassword.style.setProperty('-webkit-text-security', 'disc');
  signUpBtn.innerText = 'SIGN UP';
  alreadyUser.target = 'blank';
  loginLink.innerText = 'Already have an account? ';
  alreadyUser.innerText = 'Log In';
  termsInput.setAttribute('type', 'checkbox');
  signUpUserName.placeholder = '@username';
  signUpName.placeholder = 'Name';
  signUpEmail.placeholder = 'Email Address';
  signUpPassword.placeholder = 'Password';
  termsText.innerHTML = 'I agree to the <a target="_blank" href="https://metachat.plus/terms">Terms of Service</a>';
  signUpCaptchaReload.src = '../assets/image/refresh.png';
  signUpCaptchaValidatedTxt.innerText = 'Captcha Validated';
  signUpCaptchaValidatedImg.src = '../assets/image/checked.png';

  // User Profile Dailog Content
  closeProfile.src = './assets/image/cross.png';
  userProfile.src = './assets/image/profile.png';
  otherText.innerText = 'Subscription : Not Available';
  otherBtn.innerText = 'Buy Now';
  userLogout.innerText = 'Logout';
  userVisit.innerText = 'Visit Profile';

  // User Profile Menu Content
  img_1.src = './assets/image/profile.png';
  img_2.src = './assets/image/subscription.png';
  img_3.src = './assets/image/logout.png';
  text_1.innerHTML = 'My Profile';
  text_2.innerHTML = 'Subscription';
  text_3.innerHTML = 'Logout';

  // Update trending list
  setInterval(() => {
    getTrendingRoom();
  }, 30000);

  // Set token
  getItem("token").then(function (items) {
    let params = new URLSearchParams(window.location.search);
    let url = params.get('url');

    if (url) {
      changeSite(url);
    } else {
      window.localStorage.setItem('url', window.location.href);

      headerSiteURL.setAttribute('data-url', setURL().href);
      headerSiteURL.innerText = addEllipsis(setURL().href, true);
      headerSiteIcon.src = 'https://www.google.com/s2/favicons?sz=32&domain_url=https://' + setURL().host;
    }

    if (Object.entries(items).length) {
      token = items.token;
    } else {
      getTempUser();
    }

    IndexedDB('read');
    getSubscription();
    getChatListData();
    loadRestrictedWords();
    getUserData(token, true);
  });

  // Set AI Model
  getItem("AI_Model").then(function (items) {
    if (Object.entries(items).length) {
      aiModel = items.AI_Model;

      if (aiModel == 'gpt-4o-mini') {
        tipTabAIOpt_1.classList.add('active');
      }

      if (aiModel == 'gpt-4o') {
        tipTabAIOpt_2.classList.add('active');
      }

      if (aiModel == 'dall-e-3') {
        tipTabAIOpt_3.classList.add('active');
      }
    } else {
      aiModel = 'gpt-4o-mini';
      tipTabAIOpt_1.classList.add('active');

      setItem('AI_Model', 'gpt-4o-mini');
    }
  });

  // Set checkbox
  getItem("checkbox").then(function (items) {
    if (Object.entries(items).length) {
      if (items.checkbox) {
        tipDiscussCheck.setAttribute('checked', true);
      }
    } else {
      tipDiscussCheck.setAttribute('checked', true);
    }
  });

  // Open URL of chat room 
  $.body.onclick = async function (e) {
    if (!userMenu.contains(e.target)) {
      userMenu.style.visibility = 'hidden';
    }

    if (e.target.getAttribute("class") == "tip-chat-link") {
      let url = isValidUrl(e.target.getAttribute("data-url"));

      if (url) {
        window.open(url, "blank");
      } else {
        showAlertBox('Unable to open URL');
      }
    }

    // Hide more_vert menu
    const allMenu = $.querySelectorAll(".moreVertMenu");

    for (let i = 0; i < allMenu.length; i++) {
      if (allMenu[i].style.display == 'flex') {
        allMenu[i].style.display = 'none';
      }
    }

    tipTabAIMenu.style.setProperty('display', 'none');
  };

  // Open AI Images
  userChat.onclick = function (e) {
    if (e.target.getAttribute('class') == 'ai_image') {
      previewImage.src = e.target.src;
      imgPreview.style.setProperty('display', 'block');
      previewClose.src = './assets/image/cross.png';

      previewClose.onclick = function () {
        previewImage.src = '';
        imgPreview.style.setProperty('display', 'none');
      }
    }
  }

  // Open MetaChat
  tipChatTabAI.onclick = function () {
    tipChatTabAI.classList.add('active');
    tipChatTabRoom.classList.remove('active');
    tipChatTabComment.classList.remove('active');
    tipChatTabPresets.classList.remove('active');

    innerCard.before(tipChatTab);

    presetsBox.style.setProperty('display', 'none');
    commentBox.style.setProperty('display', 'none');
    chatRoomData.style.setProperty('display', 'none');
    rightMetaBox.style.setProperty('display', 'block');

    tipChatTabRoomCount.style.setProperty('display', 'none');

    setTimeout(() => {
      tipInput.focus();
    }, 1000);
  }

  // Open Chat Room
  tipChatTabRoom.onclick = function () {
    tipReplyClose.click();

    tipChatTabRoom.classList.add('active');
    tipChatTabAI.classList.remove('active');
    tipChatTabComment.classList.remove('active');
    tipChatTabPresets.classList.remove('active');

    chatRoomTitle.before(tipChatTab);
    chatRoomData.appendChild(chatRoomFooter);
    chatRoomData.appendChild(chatEmojiBox);

    if (!chatRoomOpen) {
      chat_2.click();
    } else {
      markReadChat();
      presetsBox.style.setProperty('display', 'none');
      commentBox.style.setProperty('display', 'none');
      rightMetaBox.style.setProperty('display', 'none');
      chatRoomData.style.setProperty('display', 'block');
      chatEditClose.style.setProperty('display', 'none');
      chatRoomMedia.style.setProperty('display', 'block');
    }

    tipChatTabRoomCount.style.setProperty('display', 'none');

    setTimeout(() => {
      chatRoomInput.focus();
    }, 1000)
  }

  // Open Comments Tab
  tipChatTabComment.onclick = function () {
    tipReplyClose.click();

    tipChatTabAI.classList.remove('active');
    tipChatTabRoom.classList.remove('active');
    tipChatTabPresets.classList.remove('active');
    tipChatTabComment.classList.add('active');

    commentHeader.before(tipChatTab);
    commentBox.appendChild(chatRoomFooter);
    commentBox.appendChild(chatEmojiBox);

    let sortIcon = $.querySelectorAll('.sort-icon');
    for (let i = 0; i < sortIcon.length; i++) {
      sortIcon[i].classList.remove('active');
    }

    presetsBox.style.setProperty('display', 'none');
    commentBox.style.setProperty('display', 'block');
    chatRoomData.style.setProperty('display', 'none');
    rightMetaBox.style.setProperty('display', 'none');
    chatRoomMedia.style.setProperty('display', 'none');
    chatEditClose.style.setProperty('display', 'none');

    tipChatTabRoomCount.style.setProperty('display', 'none');

    setTimeout(() => {
      chatRoomInput.focus();
    }, 1000);
  }

  // Open Presets Tab
  tipChatTabPresets.onclick = function () {
    tipChatTabAI.classList.remove('active');
    tipChatTabRoom.classList.remove('active');
    tipChatTabPresets.classList.add('active');
    tipChatTabComment.classList.remove('active');

    presetsBody.before(tipChatTab);

    presetsBox.style.setProperty('display', 'block');
    commentBox.style.setProperty('display', 'none');
    chatRoomData.style.setProperty('display', 'none');
    rightMetaBox.style.setProperty('display', 'none');

    tipChatTabRoomCount.style.setProperty('display', 'none');
  }

  // Open AI Model Option
  tipTabAIIcon.onclick = function (e) {
    let display = tipTabAIMenu.style.getPropertyValue('display');

    if (display == '' || display == 'none') {
      tipTabAIMenu.style.setProperty('display', 'flex');
    } else {
      tipTabAIMenu.style.setProperty('display', 'none');
    }

    e.stopPropagation();
  }

  // Set GPT-4o-mini model
  tipTabAIOpt_1.onclick = function () {
    aiModel = 'gpt-4o-mini';
    setItem('AI_Model', 'gpt-4o-mini');

    tipTabAIOpt_1.classList.add('active');
    tipTabAIOpt_2.classList.remove('active');
    tipTabAIOpt_3.classList.remove('active');
  }

  // Set GPT-4o model
  tipTabAIOpt_2.onclick = function () {
    aiModel = 'gpt-4o';
    setItem('AI_Model', 'gpt-4o');

    tipTabAIOpt_2.classList.add('active');
    tipTabAIOpt_1.classList.remove('active');
    tipTabAIOpt_3.classList.remove('active');
  }

  // Set Image model
  tipTabAIOpt_3.onclick = function () {
    aiModel = 'dall-e-3';
    setItem('AI_Model', 'dall-e-3');

    tipTabAIOpt_3.classList.add('active');
    tipTabAIOpt_2.classList.remove('active');
    tipTabAIOpt_1.classList.remove('active');
  }

  // Load more chat
  chatLoadMore.onclick = async function () {
    try {
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

      chatLoadMore.style.setProperty('display', 'none');
      tipChatTabRoomCount.style.setProperty('display', 'none');
    } catch (error) {
      console.log(error);
    }
  }

  // Set another site
  headerInput.addEventListener("keyup", async function (event) {
    if (event.key === 'Enter') {
      await changeSite(headerInput.value);
      const newUrl = '?url=' + setURL().host;
      window.history.pushState({ url: newUrl }, '', newUrl);
    }
  })

  // Open current site
  headerSiteURL.onclick = function (e) {
    try {
      window.open(e.target.getAttribute("data-url"), 'blank');
    } catch (error) {
      console.log(error);
    }
  }

  // Activate AI send button
  tipInput.addEventListener("keyup", () => {
    if (tipInput.value.length) {
      tipAISend.classList.add('active');
    } else {
      tipAISend.classList.remove('active');
    }
  })

  // Handle input from AI Tab
  tipInput.addEventListener("keydown", async function (event) {
    let host = setURL().href;

    if (event.shiftKey && event.key === 'Enter') {
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();

      try {
        if (tipInput.value) {
          let search = tipInput.value;
          if (tipInput.value.length > 1000) {
            showAlertBox('Please enter a shorter message')

            return false;
          }

          await checkAPIUsage();
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
          rightMessage.innerHTML = markupText(search);
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

          if (tipDiscussCheck.checked && aiModel != 'dall-e-3') {
            const result = await axios.get('https://new.tipestry.com/api/site/analyze', { params: { q: host } });

            search += '. context: ' + result.data;
          }

          if (tipHighLightCheck.checked && aiModel != 'dall-e-3') {
            const result = await axios.get('https://new.tipestry.com/api/site/analyze', { params: { q: host } });

            search += '. context: ' + result.data;
          }

          const extraParam = {};

          if (token) {
            extraParam['headers'] = { "x-auth-token": token };
          } else {
            extraParam['headers'] = {};
          }

          const result = await axios.post('https://new.tipestry.com/api/site/openaiBot',
            {
              model: aiModel,
              data: search,
              conversation
            },
            extraParam
          );

          loading.remove();
          if (aiModel == 'dall-e-3') {
            var imageContent = $.createElement('img');

            imageContent.src = result.data;
            imageContent.className = 'ai_image';
            chatContent.className = 'chatContent media';
            chatContent.appendChild(imageContent);
          } else {
            conversation.push({ role: "user", content: search });
            conversation.push({ role: "assistant", content: result.data });

            chatContent.className = 'chatContent';
            chatContent.innerHTML = markupText(result.data.replace('\n', ''), true);
          }

          IndexedDB("add", userChat.innerHTML);
          innerCard.scrollTo(0, innerCard.scrollHeight);

          setTimeout(() => {
            tipInput.focus();
          }, 1000);
        }
      } catch (error) {
        loading.remove();
        chatContent.className = 'chatContent';
        chatContent.innerHTML = ':( No data found';

        console.log(error);
      }
    }
  });

  // Activate Chat send button
  chatRoomInput.addEventListener("keyup", () => {
    if (chatRoomInput.value.length) {
      chatRoomSend.classList.add('active');
    } else {
      chatRoomSend.classList.remove('active');
    }
  })

  // Handle input from chat room box
  chatRoomInput.addEventListener("keydown", async function (event) {
    if (chatRoomInput.value.length) {
      chatRoomSend.classList.add('active');
    } else {
      chatRoomSend.classList.remove('active');
    }

    if (event.shiftKey && event.key === 'Enter') {
      return;
    }

    function updateChat(messageText) {
      try {
        const extraParam = { headers: token ? { "x-auth-token": token } : { "x-user-token": userId } };
        const result = axios.put('https://new.tipestry.com/api/chat/update', { id: replyData.chatId, message: messageText }, extraParam);

        replyData.chatContent.innerHTML = markupText(messageText);
        chatEditClose.click();
      } catch (error) {
        console.log(error);
      }
    }

    function createRoomChat(messageText) {
      let chatId;
      var chatIcon = $.createElement('tip-icon');
      var chatIconImg = $.createElement('img');
      var chatBox = $.createElement('tip-span');
      var chatDate = $.createElement('tip-span');
      var chatName = $.createElement('tip-span');
      var messageBox = $.createElement('tip-span');
      var chatContent = $.createElement('tip-span');
      var chatContentText = $.createElement('tip-span');
      var rightMessage = $.createElement('tip-div');

      chatIcon.className = 'chatIcon';
      chatName.className = 'chatName';
      chatDate.className = 'chatDateTime';
      messageBox.className = 'messageBox';
      chatContent.className = 'chatContent self';
      rightMessage.className = 'chat-left';

      chatName.innerText = username;
      chatDate.innerText = currentTime();
      chatContentText.innerHTML = markupText(messageText);

      // Add replied message
      if (replyData.chatId) {
        var replyChatBox = $.createElement('tip-div');
        var replyChatMessage = $.createElement('tip-span');
        var replyChatUser = $.createElement('tip-span');

        replyChatBox.className = 'replyChatBox';
        replyChatUser.className = 'replyChatUser';

        if (replyData.is_media) {
          replyChatMessage.appendChild(replyData.chatContent);
        } else {
          replyChatMessage.innerHTML = replyData.chatContent;
        }

        replyChatUser.innerText = replyData.username + ' - ' + replyData.datetime;

        replyChatBox.appendChild(replyChatMessage);
        replyChatBox.appendChild(replyChatUser);
        chatContent.prepend(replyChatBox);
      }

      getItem("user").then(function (items) {
        if (Object.entries(items).length) {
          chatIconImg.src = items.user.img ? 'https://tipestry.com/api/topic/get/img/' + items.user.img : './assets/image/profile.png';

          let data = {
            id: userId,
            name: items.user.username,
            message: messageText,
            site: siteId,
            profile: items.user.imgOriginal,
            _id: null,
            replyId: replyData.chatId,
          };

          tipReplyClose.click();

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

      getItem("tempUser").then(function (items) {
        if (Object.entries(items).length) {
          chatIconImg.src = './assets/image/profile.png';

          let data = {
            id: userId,
            name: username,
            message: messageText,
            site: siteId,
            profile: '',
            _id: null,
            replyId: replyData.chatId,
          };

          tipReplyClose.click();

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
        }
      });

      // Menu Item Start
      var chatOption = $.createElement('tip-span');
      var moreVertIcon = $.createElement('img');
      var moreVertMenu = $.createElement('tip-div');
      var deleteMenu = $.createElement('tip-span');
      var editMenu = $.createElement('tip-span');

      chatOption.className = 'chatOption';
      moreVertMenu.className = 'moreVertMenu';
      deleteMenu.className = 'menuOption';
      editMenu.className = 'menuOption';

      editMenu.innerText = 'Edit';
      deleteMenu.innerText = 'Delete';
      moreVertIcon.src = './assets/image/more_vert.png';

      moreVertIcon.onclick = function (e) {
        const allMenu = $.querySelectorAll(".moreVertMenu");

        for (let i = 0; i < allMenu.length; i++) {
          allMenu[i].style.display = 'none';
        }

        if ((chatRoomChat.clientWidth - messageBox.clientWidth) <= 130) {
          moreVertMenu.classList.add('right');
        } else {
          moreVertMenu.classList.remove('right');
        }

        moreVertMenu.style.display = 'flex';
        e.stopPropagation();
      }

      // Delete message
      deleteMenu.onclick = async function () {
        try {
          await axios({
            method: "post",
            headers: token ? { "x-auth-token": token } : { "x-user-token": userId },
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

      // Edit message
      editMenu.onclick = function () {
        replyData.type = 'edit';
        replyData.chatId = chatId;
        replyData.chatContent = chatContentText;

        chatRoomInput.value = messageText;
        chatRoomMedia.style.setProperty('display', 'none');
        chatEditClose.style.setProperty('display', 'block');
      }

      moreVertMenu.appendChild(editMenu);
      moreVertMenu.appendChild(deleteMenu);
      chatOption.appendChild(moreVertIcon);
      chatOption.appendChild(moreVertMenu);
      // Menu Item End

      rightMessage.appendChild(chatIcon);
      rightMessage.appendChild(chatBox);
      chatIcon.appendChild(chatIconImg);
      chatBox.appendChild(chatName);
      chatName.appendChild(chatDate);
      chatBox.appendChild(messageBox);
      messageBox.appendChild(chatOption);
      chatContent.appendChild(chatContentText);
      messageBox.appendChild(chatContent);
      chatRoomChat.appendChild(rightMessage);

      chatRoomBody.scrollTo(0, chatRoomBody.scrollHeight);

      setTimeout(() => {
        chatRoomInput.focus();
      }, 1000);
    }

    function createComment(messageText) {
      if (replyData.type == 'commentReply' && replyData.chatId) {
        axios.post('https://new.tipestry.com/api/topic/reply', {
          content: messageText,
          topicId,
          commentId: replyData.chatId
        }, {
          headers: { "x-auth-token": token },
        });
      } else if (replyData.type == 'comment' && replyData.chatId) {
        axios.post('https://new.tipestry.com/api/topic/comment', {
          content: messageText,
          topicId: replyData.chatId
        }, {
          headers: { "x-auth-token": token },
        });
      } else {
        axios.post('https://new.tipestry.com/api/topic', {
          tags: [],
          url: setURL().href,
          title: messageText,
          message: messageText,
          isoriginalcontent: false,
          groupId: '63c45df44d4a821b05fad661',
        }, {
          headers: { "x-auth-token": token }
        })
      }

      tipReplyClose.click();
      getComments();

      setTimeout(() => {
        chatRoomInput.focus();
      }, 1000);
    }

    if (event.key === 'Enter') {
      event.preventDefault();

      if (!token && commentBox.style.getPropertyValue('display') == 'block') {
        tipUser.click();
        return;
      }

      if (emojiOpen) {
        emojiOpen = false;
        chatRoomEmoji.classList.remove('open');
        chatEmojiBox.style.cssText = 'display: none';
      }

      // Filter message
      var filterMessage = chatRoomInput.value;
      var filterDiv = document.createElement("div");

      filterDiv.innerHTML = filterMessage;
      filterMessage = filterDiv.textContent || filterDiv.innerText || "";

      let messageText = filterMessage.replace(/\s+/g, ' ').trim();

      try {
        if (messageText.length) {
          restrictedWords(messageText).then(async (valid) => {
            if (valid) {
              await checkAPIUsage('chat');

              if (commentBox.style.getPropertyValue('display') == 'block') {
                createComment(messageText);
              } else {
                if (replyData.type == 'edit' && replyData.chatId != null) {
                  updateChat(messageText);
                } else {
                  createRoomChat(messageText);
                }
              }
            } else {
              showAlertBox(`This content can't be posted due to <a href= 'https://developer.chrome.com/docs/webstore/program-policies/hate-and-violence'>Google's guidelines.</a>`);
            }
          })
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  // Handle paste from chat room box
  chatRoomInput.addEventListener("paste", function (event) {
    if (!token) {
      tipUser.click();
      dropBox.style.setProperty('display', 'none');

      return;
    }

    if (commentBox.style.getPropertyValue('display') != 'block') {
      if (event.clipboardData.files.length) {
        [...event.clipboardData.files].forEach((file) => {
          var reader = new FileReader();

          reader.onload = function (e) {
            if (file.size <= (16 * 1024 * 1024)) {
              sendImages(e.target.result, file.name, file.type);
            }
          };

          reader.readAsDataURL(file);
        });
      }
    }
  })

  // Handle input from AI Tab on button click
  tipAISend.onclick = async function () {
    tipInput.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Enter' }));
  }

  // Handle input from chat room on button click
  chatRoomSend.onclick = function () {
    chatRoomInput.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Enter' }));
  }

  // Show drop box
  chatRoomData.ondragover = function (event) {
    event.preventDefault();

    chatRoomBody.before(dropBox);
    dropBox.style.setProperty('display', 'block');
  }

  // Upload files on drop
  chatRoomData.ondrop = function (event) {
    event.preventDefault();

    if (!token) {
      tipUser.click();
      dropBox.style.setProperty('display', 'none');

      return;
    }

    [...event.dataTransfer.files].forEach((file) => {
      var reader = new FileReader();

      reader.onload = function (e) {
        if (file.size <= (16 * 1024 * 1024)) {
          sendImages(e.target.result, file.name, file.type);
        }
      };

      reader.readAsDataURL(file);
    });

    dropBox.style.setProperty('display', 'none');
  }

  // Remove drop box
  dropBox.ondragleave = function (event) {
    event.preventDefault();
    dropBox.style.setProperty('display', 'none');
  }

  // Markup chat text
  chatRoomFooterTool.onclick = function (e) {
    var markupType = e.target.getAttribute('data-value');

    if (markupType) {
      var selectedText = chatRoomInput.value.slice(chatRoomInput.selectionStart, chatRoomInput.selectionEnd);
      if (selectedText.length) {
        if (markupType == '```') {
          selectedText = '<>' + selectedText + '</>';
        } else {
          selectedText = markupType + selectedText + markupType;
        }

        chatRoomInput.value = chatRoomInput.value.substring(0, chatRoomInput.selectionStart) + selectedText + chatRoomInput.value.substring(chatRoomInput.selectionEnd);
      }
    }
  }

  // Back to top
  tipHome.onclick = function () {
    if (chatRoomData.style.display == 'block') {
      chatRoomBody.scrollTo(0, -chatRoomBody.scrollHeight);
    }

    if (rightMetaBox.style.display == 'block' || rightMetaBox.style.display == '') {
      innerCard.scrollTo(0, -innerCard.scrollHeight);
    }

    if (commentBox.style.display == 'block') {
      commentBody.scrollTo(0, -commentBody.scrollHeight);
    }
  }

  // Back to bottom
  tipBottom.onclick = function () {
    if (chatRoomData.style.display == 'block') {
      chatRoomBody.scrollTo(0, chatRoomBody.scrollHeight);
    }

    if (rightMetaBox.style.display == 'block' || rightMetaBox.style.display == '') {
      innerCard.scrollTo(0, innerCard.scrollHeight);
    }

    if (commentBox.style.display == 'block') {
      commentBody.scrollTo(0, commentBody.scrollHeight);
    }
  }

  // Open Editor Tool
  chatRoomEditor.onclick = function () {
    let display = chatRoomFooterTool.style.display;

    if (display == 'none' || display == '') {
      chatRoomEditor.classList.add('open');
      chatRoomFooterReply.classList.remove('only');
      chatRoomFooterTool.style.setProperty('display', 'flex');
    } else {
      chatRoomEditor.classList.remove('open');
      chatRoomFooterReply.classList.add('only');
      chatRoomFooterTool.style.setProperty('display', 'none');
    }
  }

  // Close reply box
  tipReplyClose.onclick = function () {
    replyData = {
      type: 'chat',
      chatId: null,
      username: null,
      datetime: null,
      is_media: false,
      chatContent: null
    }

    chatRoomInput.value = '';
    tipReplyUser.innerHTML = '';
    tipReplyMessage.innerHTML = '';
    chatRoomFooterReply.style.setProperty('display', 'none');
  }

  // Remember discuss checkbox selection
  tipDiscussCheck.onchange = function (e) {
    if (e.target.checked) {
      tipHighLightCheck.checked = false;
      tipHighLightCheck.removeAttribute('checked');
    }

    setItem("checkbox", e.target.checked);
  }

  // Remember highLight checkbox selection
  tipHighLightCheck.onchange = function (e) {
    if (e.target.checked) {
      tipDiscussCheck.checked = false;
      tipDiscussCheck.removeAttribute('checked');
    }
  }

  // Choose media file
  chatRoomMedia.onclick = function () {
    chatRoomFile.click();
  }

  // Close edit message
  chatEditClose.onclick = function () {
    tipReplyClose.click();
    chatEditClose.style.setProperty('display', 'none');
    chatRoomMedia.style.setProperty('display', 'block');
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
      chatEmojiBox.style.cssText = 'display: block';
    } else {
      emojiOpen = false;
      chatRoomEmoji.classList.remove('open');
      chatEmojiBox.style.cssText = 'display: none';
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
  chat_2.onclick = function () {
    getChat();
    connectChatRoom(setURL().host);

    tipChatTabRoom.classList.add('active');
    tipChatTabAI.classList.remove('active');
    tipChatTabPresets.classList.remove('active');
    tipChatTabComment.classList.remove('active');

    chatRoomTitle.before(tipChatTab);
    chatRoomData.appendChild(chatRoomFooter);
    chatRoomData.appendChild(chatEmojiBox);

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
    window.open('https://web.archive.org/web/20240101000000*/' + host, 'blank')
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
      presetsUserChat.appendChild(leftMessage);

      presetsBody.scrollTo(0, presetsBody.scrollHeight);

      try {
        const result = await axios.get('https://new.tipestry.com/api/site/summary', { params: { q: host } });

        loading.remove();
        chatContent.className = 'chatContent';
        chatContent.innerHTML = result.data;

        setItem("presetsData", presetsUserChat.innerHTML);
        presetsBody.scrollTo(0, presetsBody.scrollHeight);
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
      rightMessage.innerHTML = markupText(search);

      userChat.appendChild(rightMessage);
      leftMessage.appendChild(chatIcon);
      leftMessage.appendChild(chatBox);
      chatBox.appendChild(chatName);
      chatName.appendChild(chatDate);
      chatBox.appendChild(chatContent);
      chatContent.appendChild(loading);
      userChat.appendChild(leftMessage);

      innerCard.scrollTo(0, innerCard.scrollHeight);

      const extraParam = {};

      if (token) {
        extraParam['headers'] = { "x-auth-token": token };
      } else {
        extraParam['headers'] = {};
      }

      const data = await axios.post('https://new.tipestry.com/api/site/openaiBot',
        {
          model: aiModel,
          data: search,
          conversation
        },
        extraParam
      );

      loading.remove();
      chatContent.className = 'chatContent';
      chatContent.innerHTML = markupText(data.data.replace('\n', ''), true);

      conversation.push({ role: "user", content: search });
      conversation.push({ role: "assistant", content: result.data });

      IndexedDB("add", userChat.innerHTML)
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

    window.open('https://metachat.plus/reddit-thread?url=' + host, 'blank');
  }

  // Check Trustpilot reviews
  chat_12.onclick = function () {
    let host = setURL().host;

    window.open('https://www.trustpilot.com/review/' + host, 'blank');
  }

  // SimilarWeb
  chat_20.onclick = function () {
    let host = setURL().host;
    window.open('https://www.similarweb.com/website/' + host, 'blank');
  }

  // Open login & profile dialog
  tipUser.onclick = function () {
    getItem("token").then(function (items) {
      if (Object.entries(items).length) {
        token = items.token;
        getUserData(items.token);
      } else {
        loadCaptcha('login');

        getItem("loginData").then(function (items) {
          if (Object.entries(items).length) {
            userEmail.value = items.loginData.email;
            userPassword.value = atob(items.loginData.password);

            rememberInput.setAttribute('checked', true);
          }
        });

        userDialog.style.visibility = 'visible';
        userDialog.style.animation = 'fadeinDialog 0.5s';
      }
    });
  }

  // Close login dialog
  userClose.onclick = function () {
    captchaData = {
      url: null,
      validated: false
    }
    userEmail.value = '';
    userPassword.value = '';
    captchaInput.value = '';
    userDialog.style.animation = '';
    userDialog.style.visibility = 'hidden';

    captchaQuizBox.style.setProperty('display', 'flex');
    captchaValidateBox.style.setProperty('display', 'none');
  }

  // Open Sign Up dialog
  newUser.onclick = function () {
    userClose.click();
    loadCaptcha('signup');

    signUpDialog.style.visibility = 'visible';
    signUpDialog.style.animation = 'fadeinDialog 0.5s';

    signUpUserName.addEventListener('keyup', function (event) {
      if (event.key.match(/^[A-Za-z0-9_]+$/) == null) {
        signUpUserName.value = signUpUserName.value.replace(event.key, "");
        return;
      }
    })

    alreadyUser.onclick = function () {
      tipUser.click();
      signUpClose.click();
    }

    signUpClose.onclick = function () {
      captchaData = {
        url: null,
        validated: false
      }
      signUpName.value = '';
      signUpEmail.value = '';
      signUpUserName.value = '';
      signUpPassword.value = '';
      signUpCaptchaInput.value = '';
      signUpDialog.style.animation = '';
      signUpDialog.style.visibility = 'hidden';

      signUpCaptchaQuizBox.style.setProperty('display', 'flex');
      signUpCaptchaValidateBox.style.setProperty('display', 'none');
    }
  }

  // Handle Sign Up event
  signUpBtn.onclick = async function () {
    try {
      if (termsInput.checked) {
        if (signUpName.value && signUpEmail.value && signUpPassword.value && signUpUserName.value) {
          if (signUpUserName.value.match(/^[A-Za-z0-9_]+$/) == null) {
            showAlertBox('Username is not valid.');
            return;
          }

          if (!captchaData.validated) {
            showAlertBox('Captcha is not validated.');
            return;
          }

          const isValid = await axios.get('https://new.tipestry.com/api/user/username/' + signUpUserName.value);

          if (isValid) {
            const result = await axios.post('https://new.tipestry.com/api/user', {
              name: signUpName.value,
              email: signUpEmail.value,
              password: signUpPassword.value,
              username: signUpUserName.value,
              source: 'https://metachat.plus'
            });

            signUpClose.click();
            showAlertBox(result.data);
          }
        } else {
          showAlertBox('Please fill all input fields');
        }
      }
    } catch (error) {
      showAlertBox(error.response.data);
    }
  }

  // Close profile dialog
  closeProfile.onclick = function () {
    profileBox.style.animation = '';
    profileBox.style.visibility = 'hidden';
  }

  // Handle login event
  userBtn.onclick = async function () {
    if (userEmail.value && userPassword.value) {
      try {
        if (!captchaData.validated) {
          showAlertBox('Captcha is not validated.');
          return;
        }

        const login = await axios.post('https://new.tipestry.com/api/auth', { email: userEmail.value, password: userPassword.value });

        if (rememberInput.checked) {
          setItem("loginData", { email: userEmail.value, password: btoa(userPassword.value) });
        } else {
          removeItem("loginData");
        }

        setItem("token", login.headers["x-auth-token"]);
        setItem("usage", { new: false, limit: 0, chat: 0 });

        userClose.click();
        removeItem("tempUser");
        token = login.headers["x-auth-token"];
        getUserData(login.headers["x-auth-token"], false, true);
        getSubscription();
      } catch (error) {
        showAlertBox(error.response.data);
      }
    } else {
      showAlertBox('Please fill all input fields');
    }
  }

  // Visit profile
  dialogItem_1.onclick = function () {
    window.open('https://metachat.plus/profile', 'blank');
  }

  // User logout
  dialogItem_3.onclick = function () {
    removeItem("user");
    removeItem("token");
    IndexedDB("add", null);

    tipChatTabRoomCount.style.setProperty('display', 'none');
    tipUser.src = './assets/image/user.png';
    userMenu.style.visibility = 'hidden';
    tipChatTabRoomCount.innerText = 0;
    chatRoomMyChatBox.innerHTML = '';
    joinedSite = [];
    tipUser.click();
    userId = null;
    token = null;

    getSubscription();
    getTrendingRoom();

    if (roomHost) {
      getChat();
      connectChatRoom(roomHost);
    }
  }

  // Buy Subscription
  dialogItem_2.onclick = function () {
    window.open('https://metachat.plus/subscription', 'blank');
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

  // Sort comment by Top
  commentSortTop.onclick = async function () {
    let sortIcon = $.querySelectorAll('.sort-icon');
    for (let i = 0; i < sortIcon.length; i++) {
      sortIcon[i].classList.remove('active');
    }

    commentSortTop.classList.add('active');

    await getComments('top');
  }

  // Sort comment by Newest
  commentSortNew.onclick = async function () {
    let sortIcon = $.querySelectorAll('.sort-icon');
    for (let i = 0; i < sortIcon.length; i++) {
      sortIcon[i].classList.remove('active');
    }

    commentSortNew.classList.add('active');

    await getComments('newest');
  }

  // Sort comment by Oldest
  commentSortOld.onclick = async function () {
    let sortIcon = $.querySelectorAll('.sort-icon');
    for (let i = 0; i < sortIcon.length; i++) {
      sortIcon[i].classList.remove('active');
    }

    commentSortOld.classList.add('active');

    await getComments('oldest');
  }

  // Refresh Login Captcha
  captchaReload.onclick = function () {
    loadCaptcha('login');
  }

  // Validate Login Captcha
  captchaInput.addEventListener("keyup", async (event) => {
    if (event.target.value.length == 6) {
      const result = await axios.post('https://new.tipestry.com/api' + captchaData.url, { answer: event.target.value });

      if (result.data) {
        captchaData.validated = result.data;

        captchaQuizBox.style.setProperty('display', 'none');
        captchaValidateBox.style.setProperty('display', 'flex');
      }
    }
  })

  // Refresh Login Captcha
  signUpCaptchaReload.onclick = function () {
    loadCaptcha('signup');
  }

  // Validate Login Captcha
  signUpCaptchaInput.addEventListener("keyup", async (event) => {
    if (event.target.value.length == 6) {
      const result = await axios.post('https://new.tipestry.com/api' + captchaData.url, { answer: event.target.value });

      if (result.data) {
        captchaData.validated = result.data;

        signUpCaptchaQuizBox.style.setProperty('display', 'none');
        signUpCaptchaValidateBox.style.setProperty('display', 'flex');
      }
    }
  })

  // Handle google login event
  async function handleResponse(response) {
    function parseJwt(token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    }

    try {
      const jwt = response.credential;

      const userInfo = parseJwt(jwt);

      const googleUserId = userInfo.sub;
      const googleUserName = userInfo.name;
      const googleUserEmail = userInfo.email;

      const login = await axios.post('https://new.tipestry.com/api/auth/google', {
        name: googleUserName,
        email: googleUserEmail,
        socialId: googleUserId,
      });

      setItem("token", login.headers["x-auth-token"]);
      setItem("usage", { new: false, limit: 0, chat: 0 });

      userClose.click();
      removeItem("tempUser");
      token = login.headers["x-auth-token"];
      getUserData(login.headers["x-auth-token"], false, true);
    } catch (error) {
      showAlertBox(error.response.data);
    }
  }

  // Fetch user profile data
  async function getUserData(token, startup = false, login = false) {
    try {
      if (token) {
        const user = await axios.get('https://new.tipestry.com/api/user', {
          headers: { "x-auth-token": token },
        });

        userId = user.data._id;
        isAdmin = user.data.isAdmin;
        username = user.data.username;
        joinedSite = user.data.siteFollowing;
        userFullName.innerText = user.data.name;
        userSortName.innerText = '@' + user.data.username;

        if (user.data.imgOriginal) {
          tipUser.src = 'https://tipestry.com/api/topic/get/img/' + user.data.imgOriginal;
          userProfile.src = 'https://tipestry.com/api/topic/get/img/' + user.data.imgOriginal;
        }

        // Check if account is deleted
        if (user.data.isDeleted) {
          dialogItem_3.click();
          showAlertBox("Your account has been deleted!");
          return;
        }

        // Check if user is banned
        if (user.data.isBanned) {
          dialogItem_3.click();
          showAlertBox("Your account has been banned!");
          return;
        }

        if (login) {
          getMyChat();
          getTrendingRoom();
        }

        if (chatRoomOpen && login) {
          tipChatTabRoom.classList.add('active');
          tipChatTabAI.classList.remove('active');
          tipChatTabPresets.classList.remove('active');
          tipChatTabComment.classList.remove('active');

          chatRoomTitle.before(tipChatTab);
          chatRoomData.appendChild(chatRoomFooter);
          chatRoomData.appendChild(chatEmojiBox);

          getChat();
          connectChatRoom(roomHost);
        }

        setItem("user", user.data);
        if (!startup) {
          userMenu.style.visibility = 'visible';
        }
      }
    } catch (error) {
      dialogItem_3.click();
      showAlertBox(error.response.data);
    }
  }

  // Get temp user data
  function getTempUser() {
    function setTempData(data) {
      userId = data._id;
      username = data.username;

      // Check if account is deleted
      if (data.isDeleted) {
        dialogItem_3.click();
        showAlertBox("Your account has been deleted!");
        return;
      }

      // Check if user is banned
      if (data.isBanned) {
        dialogItem_3.click();
        showAlertBox("Your account has been banned!");
        return;
      }

      setItem("tempUser", data);
    }

    try {
      getItem("tempUser").then(async function (items) {
        if (Object.entries(items).length) {
          const extraParam = { headers: { "x-user-token": items.tempUser._id } };

          const result = await axios.get('https://new.tipestry.com/api/user/get-temp-user', extraParam);

          if (result.data) {
            setTempData(result.data);
          }
        } else {
          const result = await axios.post('https://new.tipestry.com/api/user/temp-user');

          if (result.data.status) {
            setTempData(result.data.data);
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Get subscription data
  async function getSubscription() {
    tipTabAIOpt_2.remove();
    tipTabAIOpt_3.remove();

    try {
      if (token) {
        aiModel = 'gpt-4o-mini';
        setItem('AI_Model', 'gpt-4o-mini');

        tipTabAIOpt_1.classList.add('active');

        const plan = await axios.get('https://new.tipestry.com/api/user/get-plan', {
          headers: { "x-auth-token": token },
        });

        if (plan.data.result) {
          const data = plan.data.result;
          if (data.status == 'success') {
            tipTabAIMenu.appendChild(tipTabAIOpt_2);
            tipTabAIMenu.appendChild(tipTabAIOpt_3);
          }
        }
      }
    } catch (error) {
      showAlertBox(error.response.data);
    }
  }

  // Send files to server
  async function sendImages(fileData, fileName, fileType) {
    let chatId;
    let play = false;
    let isImage = false;

    await checkAPIUsage('chat');
    var chatIcon = $.createElement('tip-icon');
    var chatIconImg = $.createElement('img');
    var chatBox = $.createElement('tip-span');
    var chatDate = $.createElement('tip-span');
    var chatName = $.createElement('tip-span');
    var messageBox = $.createElement('tip-span');
    var chatContent = $.createElement('tip-span');
    var chatContentBox = $.createElement('tip-span');
    var chatDownload = $.createElement('a');
    var chatDownloadImg = $.createElement('img');
    var rightMessage = $.createElement('tip-div');

    if (fileType == 'image/svg+xml' || fileType == 'image/webp' || fileType == 'image/jpeg' || fileType == 'image/png' || fileType == 'image/gif') {
      isImage = true;
      var chatImage = $.createElement('img');
      chatImage.src = fileData;

      viewImage(chatImage);

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

      if ((chatRoomChat.clientWidth - messageBox.clientWidth) <= 130) {
        moreVertMenu.classList.add('right');
      } else {
        moreVertMenu.classList.remove('right');
      }

      moreVertMenu.style.display = 'flex';
      e.stopPropagation();
    }

    // Delete message
    deleteMenu.onclick = async function () {
      try {
        await axios({
          method: "post",
          headers: token ? { "x-auth-token": token } : { "x-user-token": userId },
          url: 'https://new.tipestry.com/api/chat/delete',
          data: { id: chatId._id },
        });

        chatOption.remove();
        chatContentBox.className = 'chatContent self';
        chatContentBox.innerHTML = '<i class="deleted">Deleted</i>';

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

    chatIcon.className = 'chatIcon';
    chatName.className = 'chatName';
    chatDate.className = 'chatDateTime';
    messageBox.className = 'messageBox';
    chatContentBox.className = 'chatMedia self';
    chatDownloadImg.className = 'chatImage-child-1';
    rightMessage.className = 'chat-left';

    chatName.innerText = username;
    chatDate.innerText = currentTime();
    chatDownload.href = fileData;
    chatDownload.setAttribute('download', fileName);
    chatDownloadImg.src = './assets/image/download.png';

    // Add replied message
    if (replyData.chatId) {
      var replyChatBox = $.createElement('tip-div');
      var replyChatMessage = $.createElement('tip-span');
      var replyChatUser = $.createElement('tip-span');

      replyChatBox.className = 'replyChatBox';
      replyChatUser.className = 'replyChatUser';

      if (replyData.is_media) {
        replyChatMessage.appendChild(replyData.chatContent);
      } else {
        replyChatMessage.innerHTML = replyData.chatContent;
      }

      replyChatUser.innerText = replyData.username + ' - ' + replyData.datetime;

      replyChatBox.appendChild(replyChatMessage);
      replyChatBox.appendChild(replyChatUser);
      chatContentBox.prepend(replyChatBox);
    }

    rightMessage.appendChild(chatIcon);
    rightMessage.appendChild(chatBox);
    chatIcon.appendChild(chatIconImg);
    chatBox.appendChild(chatName);
    chatName.appendChild(chatDate);
    chatBox.appendChild(messageBox);
    messageBox.appendChild(chatOption);
    chatContentBox.appendChild(chatContent);
    messageBox.appendChild(chatContentBox);

    if (!isImage) {
      chatContent.appendChild(chatDownload);
      chatDownload.appendChild(chatDownloadImg);
    }

    chatRoomChat.appendChild(rightMessage);

    chatRoomBody.scrollTo(0, chatRoomBody.scrollHeight);

    getItem("user").then(function (items) {
      if (Object.entries(items).length) {
        chatIconImg.src = items.user.img ? 'https://tipestry.com/api/topic/get/img/' + items.user.img : './assets/image/profile.png';

        let data = {
          id: userId,
          name: items.user.username,
          fileData: fileData,
          fileName: fileName,
          fileType: fileType,
          site: siteId,
          profile: items.user.imgOriginal,
          _id: null,
          replyId: replyData.chatId,
        };

        tipReplyClose.click();

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

    getItem("tempUser").then(function (items) {
      if (Object.entries(items).length) {
        chatIconImg.src = './assets/image/profile.png';

        let data = {
          id: userId,
          name: username,
          fileData: fileData,
          fileName: fileName,
          fileType: fileType,
          site: siteId,
          profile: '',
          _id: null,
          replyId: replyData.chatId,
        };

        tipReplyClose.click();

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
        const result = await axios({
          method: "post",
          headers: token ? { "x-auth-token": token } : { "x-user-token": userId },
          url: 'https://new.tipestry.com/api/chat/save',
          data: data,
        });

        markReadChat();

        resolve(result.data.result);
      } catch (error) {
        reject(error);
      }
    });
  }

  // List group chat
  async function getChat() {
    var loading = $.createElement('img');

    loading.className = 'loading';
    loading.src = './assets/image/chat-loading.gif';
    chatRoomInput.setAttribute('disabled', true);

    chatRoomBody.appendChild(loading);

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
      chatLoadMore.style.setProperty('display', 'none');

      const data = await axios.get('https://new.tipestry.com/api/chat/list', extraParam);

      let result = data.data.result;

      result.map((row) => {
        if (row.message) {
          textChat(row, userId);
        } else {
          mediaChat(row, userId);
        }
      })

      loading.remove();
      chatRoomInput.removeAttribute('disabled');

      markReadChat();

      // Handle scroll event
      chatRoomBody.onscroll = async function (e) {
        let scrollHeight = (e.target.scrollHeight - e.target.clientHeight);

        if ((scrollHeight + e.target.scrollTop) < 500) {
          if (e.target.scrollTop == 0) {
            chatLoadMore.style.display = 'none';
          } else {
            if (result.length >= 50) {
              chatLoadMore.style.display = 'block';
            }
          }
        } else {
          chatLoadMore.style.display = 'none';
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Display text chat
  async function textChat(data, userId) {
    if (data.tempUserId) {
      data.userId = data.tempUserId;
      data.userId.img = null;
    }

    if (userId != data.userId._id) {
      var chatIcon = $.createElement('tip-icon');
      var chatIconImg = $.createElement('img');
      var chatBox = $.createElement('tip-span');
      var chatName = $.createElement('tip-span');
      var chatDate = $.createElement('tip-span');
      var messageBox = $.createElement('tip-span');
      var chatContent = $.createElement('tip-span');
      var chatContentText = $.createElement('tip-span');
      var leftMessage = $.createElement('tip-div');
      var tippingBox = $.createElement('tip-div');

      // Menu Item Start
      var chatOption = $.createElement('tip-span');
      var moreVertIcon = $.createElement('img');
      var moreVertMenu = $.createElement('tip-div');
      var deleteMenu = $.createElement('tip-span');
      var blockMenu = $.createElement('tip-span');
      var reportMenu = $.createElement('tip-span');
      var replyMenu = $.createElement('tip-span');
      var tippingMenu = $.createElement('tip-span');

      chatOption.className = 'chatOption';
      moreVertMenu.className = 'moreVertMenu';
      deleteMenu.className = 'menuOption';
      blockMenu.className = 'menuOption';
      reportMenu.className = 'menuOption';
      replyMenu.className = 'menuOption';
      tippingMenu.className = 'menuOption';

      replyMenu.innerText = 'Reply';
      reportMenu.innerText = 'Report';
      deleteMenu.innerText = 'Delete';
      blockMenu.innerText = 'Block User';
      tippingMenu.innerText = 'Give Tip';
      moreVertIcon.src = './assets/image/more_vert.png';

      moreVertIcon.onclick = function (e) {
        if (!token) {
          return;
        }

        const allMenu = $.querySelectorAll(".moreVertMenu");

        for (let i = 0; i < allMenu.length; i++) {
          allMenu[i].style.display = 'none';
        }

        if ((chatRoomChat.clientWidth - messageBox.clientWidth) <= 130) {
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

      // Reply Message
      replyMenu.onclick = function () {
        let display = chatRoomFooterTool.style.display;

        tipReplyUser.innerHTML = chatName.innerHTML;
        tipReplyMessage.innerHTML = chatContentText.innerHTML;
        chatRoomFooterReply.style.setProperty('display', 'flex');

        replyData = {
          chatId: data._id,
          username: chatName.firstChild.textContent,
          datetime: chatDate.innerText,
          chatContent: chatContentText.innerHTML
        };

        if (display == 'none' || display == '') {
          chatRoomFooterReply.classList.add('only');
        } else {
          chatRoomFooterReply.classList.remove('only');
        }
      }

      // Block user
      blockMenu.onclick = async function () {
        try {
          const message = await axios.put('https://new.tipestry.com/api/user/block',
            { userid: data.userId._id },
            {
              headers: { "x-auth-token": token }
            })

          showAlertBox(message.data);
        } catch (error) {
          console.log(error);
        }
      }

      // tip Message
      tippingMenu.onclick = function () {
        showTippingBox(data, chatRoomData, 'chat', tippingBox);
      }

      // Admin Delete Message
      if (isAdmin) {
        deleteMenu.onclick = async function () {
          showDeleteOpt(data, chatOption, chatContent);
        }

        moreVertMenu.appendChild(deleteMenu);
      }

      moreVertMenu.appendChild(replyMenu);
      moreVertMenu.appendChild(reportMenu);
      moreVertMenu.appendChild(blockMenu);
      moreVertMenu.appendChild(tippingMenu);
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
      tippingBox.className = 'voteBox';

      chatName.innerText = data.userId.isDeleted ? '[Deleted]' : data.userId.username;
      chatDate.innerText = data.edited ? ('Edited ' + currentTime(data.updatedAt)) : currentTime(data.createdAt);
      chatContentText.innerHTML = data.deleted ? '<i class="deleted">Deleted</i>' : markupText(data.message);
      chatIconImg.src = data.userId.img ? 'https://tipestry.com/api/topic/get/img/' + data.userId.img : './assets/image/profile.png';

      await addReplyChat(chatContent, data);

      leftMessage.appendChild(chatIcon);
      leftMessage.appendChild(chatBox);
      chatIcon.appendChild(chatIconImg);
      chatBox.appendChild(chatName);
      chatName.appendChild(chatDate);

      chatBox.appendChild(messageBox);
      chatContent.appendChild(chatContentText);
      chatContent.appendChild(tippingBox);
      messageBox.appendChild(chatContent);
      chatRoomChat.prepend(leftMessage);

      await getChatTip(data._id, tippingBox);
    } else {
      var chatIcon = $.createElement('tip-icon');
      var chatIconImg = $.createElement('img');
      var chatBox = $.createElement('tip-span');
      var chatName = $.createElement('tip-span');
      var chatDate = $.createElement('tip-span');
      var messageBox = $.createElement('tip-span');
      var chatContent = $.createElement('tip-span');
      var chatContentText = $.createElement('tip-span');
      var rightMessage = $.createElement('tip-div');
      var tippingBox = $.createElement('tip-div');

      // Menu Item Start
      var chatOption = $.createElement('tip-span');
      var moreVertIcon = $.createElement('img');
      var moreVertMenu = $.createElement('tip-div');
      var deleteMenu = $.createElement('tip-span');
      var editMenu = $.createElement('tip-span');

      chatOption.className = 'chatOption';
      moreVertMenu.className = 'moreVertMenu';
      deleteMenu.className = 'menuOption';
      editMenu.className = 'menuOption';

      editMenu.innerText = 'Edit';
      deleteMenu.innerText = 'Delete';
      moreVertIcon.src = './assets/image/more_vert.png';

      moreVertIcon.onclick = function (e) {
        const allMenu = $.querySelectorAll(".moreVertMenu");

        for (let i = 0; i < allMenu.length; i++) {
          allMenu[i].style.display = 'none';
        }

        if ((chatRoomChat.clientWidth - messageBox.clientWidth) <= 130) {
          moreVertMenu.classList.add('right');
        } else {
          moreVertMenu.classList.remove('right');
        }

        moreVertMenu.style.display = 'flex';
        e.stopPropagation();
      }

      // Delete message
      deleteMenu.onclick = async function () {
        try {
          await axios({
            method: "post",
            headers: token ? { "x-auth-token": token } : { "x-user-token": userId },
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

      // Edit message
      editMenu.onclick = function () {
        replyData.type = 'edit';
        replyData.chatId = data._id;
        replyData.chatContent = chatContentText;

        chatRoomInput.value = data.message;
        chatRoomMedia.style.setProperty('display', 'none');
        chatEditClose.style.setProperty('display', 'block');
      }

      moreVertMenu.appendChild(editMenu);
      moreVertMenu.appendChild(deleteMenu);
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
      chatContent.className = 'chatContent self';
      rightMessage.className = 'chat-left';
      tippingBox.className = 'voteBox';

      chatName.innerText = data.userId.isDeleted ? '[Deleted]' : data.userId.username;
      chatDate.innerText = data.edited ? ('Edited ' + currentTime(data.updatedAt)) : currentTime(data.createdAt);
      chatContentText.innerHTML = data.deleted ? '<i class="deleted">Deleted</i>' : markupText(data.message);
      chatIconImg.src = data.userId.img ? 'https://tipestry.com/api/topic/get/img/' + data.userId.img : './assets/image/profile.png';

      await addReplyChat(chatContent, data);

      rightMessage.appendChild(chatIcon);
      rightMessage.appendChild(chatBox);
      chatIcon.appendChild(chatIconImg);
      chatBox.appendChild(chatName);
      chatName.appendChild(chatDate);

      chatBox.appendChild(messageBox);
      chatContent.appendChild(chatContentText);
      chatContent.appendChild(tippingBox);
      messageBox.appendChild(chatContent);
      chatRoomChat.prepend(rightMessage);

      await getChatTip(data._id, tippingBox);
    }
  }

  // Display media chat
  async function mediaChat(data, userId) {
    let play = false;
    let isImage = false;

    if (data.tempUserId) {
      data.userId = data.tempUserId;
      data.userId.img = null;
    }

    if (userId != data.userId._id) {
      var chatIcon = $.createElement('tip-icon');
      var chatIconImg = $.createElement('img');
      var chatBox = $.createElement('tip-span');
      var chatName = $.createElement('tip-span');
      var chatDate = $.createElement('tip-span');
      var messageBox = $.createElement('tip-span');
      var chatContent = $.createElement('tip-span');
      var chatContentBox = $.createElement('tip-span');
      var chatDownload = $.createElement('a');
      var chatDownloadImg = $.createElement('img');
      var leftMessage = $.createElement('tip-div');
      var tippingBox = $.createElement('tip-div');

      if (data.media.type == 'image/svg+xml' || data.media.type == 'image/webp' || data.media.type == 'image/jpeg' || data.media.type == 'image/png' || data.media.type == 'image/gif') {
        if (!data.deleted) {
          isImage = true;
          var chatImage = $.createElement('img');
          chatImage.src = data.media.data;

          viewImage(chatImage);

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
      var blockMenu = $.createElement('tip-span');
      var reportMenu = $.createElement('tip-span');
      var replyMenu = $.createElement('tip-span');
      var tippingMenu = $.createElement('tip-span');

      chatOption.className = 'chatOption';
      moreVertMenu.className = 'moreVertMenu';
      deleteMenu.className = 'menuOption';
      blockMenu.className = 'menuOption';
      reportMenu.className = 'menuOption';
      replyMenu.className = 'menuOption';
      tippingMenu.className = 'menuOption';

      replyMenu.innerText = 'Reply';
      deleteMenu.innerText = 'Delete';
      blockMenu.innerText = 'Block User';
      reportMenu.innerText = 'Report';
      tippingMenu.innerText = 'Give Tip';
      moreVertIcon.src = './assets/image/more_vert.png';

      moreVertIcon.onclick = function (e) {
        if (!token) {
          return;
        }

        const allMenu = $.querySelectorAll(".moreVertMenu");

        for (let i = 0; i < allMenu.length; i++) {
          allMenu[i].style.display = 'none';
        }

        if ((chatRoomChat.clientWidth - messageBox.clientWidth) <= 130) {
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

      // Reply Message
      replyMenu.onclick = function () {
        let display = chatRoomFooterTool.style.display;

        let contentNode = chatContent.lastChild.previousSibling.cloneNode(true);

        tipReplyMessage.appendChild(contentNode);
        tipReplyUser.innerHTML = chatName.innerHTML;
        chatRoomFooterReply.style.setProperty('display', 'flex');

        replyData = {
          chatId: data._id,
          username: chatName.firstChild.textContent,
          datetime: chatDate.innerText,
          is_media: true,
          chatContent: contentNode
        };

        if (display == 'none' || display == '') {
          chatRoomFooterReply.classList.add('only');
        } else {
          chatRoomFooterReply.classList.remove('only');
        }
      }

      // Block User
      blockMenu.onclick = async function () {
        try {
          const message = await axios.put('https://new.tipestry.com/api/user/block',
            { userid: data.userId._id },
            {
              headers: { "x-auth-token": token }
            })

          showAlertBox(message.data);
        } catch (error) {
          console.log(error);
        }
      }

      // tip Message
      tippingMenu.onclick = function () {
        showTippingBox(data, chatRoomData, 'chat', tippingBox);
      }

      // Admin Delete Message
      if (isAdmin) {
        deleteMenu.onclick = async function () {
          showDeleteOpt(data, chatOption, chatContentBox);
        }

        moreVertMenu.appendChild(deleteMenu);
      }

      moreVertMenu.appendChild(replyMenu);
      moreVertMenu.appendChild(reportMenu);
      moreVertMenu.appendChild(blockMenu);
      moreVertMenu.appendChild(tippingMenu);
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
      chatContentBox.className = data.deleted ? 'chatContent' : 'chatMedia';
      chatDownloadImg.className = 'chatImage-child-1';
      leftMessage.className = 'chat-left';
      tippingBox.className = 'voteBox';

      chatDate.innerText = currentTime(data.createdAt);
      chatName.innerText = data.userId.isDeleted ? '[Deleted]' : data.userId.username;

      if (!data.deleted) {
        chatDownload.href = data.media.data;
        chatDownload.setAttribute('download', data.media.name);
        chatDownloadImg.src = './assets/image/download.png';
      }

      chatIconImg.src = data.userId.img ? 'https://tipestry.com/api/topic/get/img/' + data.userId.img : './assets/image/profile.png';

      await addReplyChat(chatContentBox, data);

      leftMessage.appendChild(chatIcon);
      leftMessage.appendChild(chatBox);
      chatIcon.appendChild(chatIconImg);
      chatBox.appendChild(chatName);
      chatName.appendChild(chatDate);
      chatBox.appendChild(messageBox);
      chatContentBox.appendChild(chatContent);
      chatContentBox.appendChild(tippingBox);
      messageBox.appendChild(chatContentBox);

      if (!data.deleted && !isImage) {
        chatContent.appendChild(chatDownload);
        chatDownload.appendChild(chatDownloadImg);
      }

      chatRoomChat.prepend(leftMessage);

      await getChatTip(data._id, tippingBox);
    } else {
      var chatIcon = $.createElement('tip-icon');
      var chatIconImg = $.createElement('img');
      var chatBox = $.createElement('tip-span');
      var chatName = $.createElement('tip-span');
      var chatDate = $.createElement('tip-span');
      var messageBox = $.createElement('tip-span');
      var chatContent = $.createElement('tip-span');
      var chatContentBox = $.createElement('tip-span');
      var chatDownload = $.createElement('a');
      var chatDownloadImg = $.createElement('img');
      var rightMessage = $.createElement('tip-div');
      var tippingBox = $.createElement('tip-div');

      if (data.media.type == 'image/svg+xml' || data.media.type == 'image/webp' || data.media.type == 'image/jpeg' || data.media.type == 'image/png' || data.media.type == 'image/gif') {
        if (!data.deleted) {
          isImage = true;
          var chatImage = $.createElement('img');
          chatImage.src = data.media.data;

          viewImage(chatImage);

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

        if ((chatRoomChat.clientWidth - messageBox.clientWidth) <= 130) {
          moreVertMenu.classList.add('right');
        } else {
          moreVertMenu.classList.remove('right');
        }

        moreVertMenu.style.display = 'flex';
        e.stopPropagation();
      }

      // Delete message
      deleteMenu.onclick = async function () {
        try {
          await axios({
            method: "post",
            headers: token ? { "x-auth-token": token } : { "x-user-token": userId },
            url: 'https://new.tipestry.com/api/chat/delete',
            data: { id: data._id },
          });

          chatOption.remove();
          chatContentBox.className = 'chatContent self';
          chatContentBox.innerHTML = '<i class="deleted">Deleted</i>';

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

      chatIcon.className = 'chatIcon';
      chatName.className = 'chatName';
      chatDate.className = 'chatDateTime';
      messageBox.className = 'messageBox';
      chatContentBox.className = data.deleted ? 'chatContent self' : 'chatMedia self';
      chatDownloadImg.className = 'chatImage-child-1';
      rightMessage.className = 'chat-left';
      tippingBox.className = 'voteBox';

      chatDate.innerText = currentTime(data.createdAt);
      chatName.innerText = data.userId.isDeleted ? '[Deleted]' : data.userId.username;

      if (!data.deleted) {
        chatDownload.href = data.media.data;
        chatDownload.setAttribute('download', data.media.name);
        chatDownloadImg.src = './assets/image/download.png';
      }

      chatIconImg.src = data.userId.img ? 'https://tipestry.com/api/topic/get/img/' + data.userId.img : './assets/image/profile.png';

      await addReplyChat(chatContentBox, data);

      rightMessage.appendChild(chatIcon);
      rightMessage.appendChild(chatBox);
      chatIcon.appendChild(chatIconImg);
      chatBox.appendChild(chatName);
      chatName.appendChild(chatDate);
      chatBox.appendChild(messageBox);
      chatContentBox.appendChild(chatContent);
      chatContentBox.appendChild(tippingBox);
      messageBox.appendChild(chatContentBox);

      if (!data.deleted && !isImage) {
        chatContent.appendChild(chatDownload);
        chatDownload.appendChild(chatDownloadImg);
      }

      chatRoomChat.prepend(rightMessage);

      await getChatTip(data._id, tippingBox);
    }
  }

  // Get chat tips
  async function getChatTip(chatId, node) {
    try {
      const result = await axios.get('https://new.tipestry.com/api/transaction/tip/chat/' + chatId);

      result.data.map((item) => {
        var TipBox = $.createElement('tip-div');
        var TipCoinImg = $.createElement('img');
        var TipAmount = $.createElement('tip-span');

        TipBox.className = 'TipBox';

        TipAmount.innerText = item.amount;

        if (item.walletType != "others") {
          TipCoinImg.src = 'https://new.tipestry.com' + renderCoinImage(item.walletType);
        } else {
          TipCoinImg.src = 'https://new.tipestry.com/api/topic/get/img/' + item.token.icon;
        }

        TipBox.appendChild(TipCoinImg);
        TipBox.appendChild(TipAmount);
        node.appendChild(TipBox);
      })
    } catch (error) {
      console.log(error);
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
  async function getChatListData(update = false) {
    try {
      if (!update) {
        getMyChat();
        connectSocket();
        getTrendingRoom();

        let host = setURL().host;

        const site = await axios.post("https://new.tipestry.com/api/site", {
          url: host,
          source: 'metachat'
        });

        siteId = site.data._id;
        homeSiteId = site.data._id;

        getHomeChat();
        getComments();
      } else {
        getMyChat();
        getHomeChat();
        getTrendingRoom();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Get Home chat
  async function getHomeChat(current = false) {
    function getMetaChat(data) {
      let host = setURL().hostname;

      if (data.result.length && data.result[0].tempUserId) {
        data.result[0].userId = data.result[0].tempUserId;
      }

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

      chatRoomMyChatListRoom.innerText = addEllipsis(host, true);
      chatRoomMyChatListProfile.src = 'https://www.google.com/s2/favicons?sz=32&domain_url=https://' + host;
      chatRoomMyChatListUser.innerText = data.result.length ? shortUsername(data.result[0].userId.isDeleted ? '[Deleted]' : data.result[0].userId.username) + ':' : '';
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

      // Add notification
      if (data.result.length && data.result[0].unreadChat) {
        tipChatTabRoomCount.style.setProperty('display', 'flex');
        tipChatTabRoomCount.innerText = data.result[0].unreadChat > 99 ? '99+' : data.result[0].unreadChat;
      }

      chatRoomMyChatList.onclick = function () {
        siteId = homeSiteId;

        getChat();
        connectChatRoom(host);
        getComments();

        tipChatTabRoom.classList.add('active');
        tipChatTabAI.classList.remove('active');
        tipChatTabPresets.classList.remove('active');
        tipChatTabComment.classList.remove('active');

        chatRoomTitle.before(tipChatTab);
        chatRoomData.appendChild(chatRoomFooter);
        chatRoomData.appendChild(chatEmojiBox);

        const reportBox = $.getElementsByClassName('reportBox');
        const chatList = $.querySelectorAll(".chatRoomMyChatList");

        reportBox.length ? reportBox[0].remove() : null;

        for (let i = 0; i < chatList.length; i++) {
          chatList[i].classList.remove("active");
        }

        chatRoomMyChatList.classList.add('active');
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

      if (token) {
        const extraParam = {
          headers: { "x-auth-token": token }
        };

        const data = await axios.get('https://new.tipestry.com/api/chat/favorite-chat', extraParam);

        chatRoomMyChatBox.innerHTML = "";
        data.data.result.map((item) => {
          getLastChat(item, 'favorite');
        })
      } else {
        chatRoomMyChatBox.innerHTML = "";
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Get trending room
  async function getTrendingRoom() {
    try {
      const extraParam = {};

      if (token) {
        extraParam['headers'] = { "x-auth-token": token };
      } else {
        extraParam['headers'] = {};
      }

      const data = await axios.get('https://new.tipestry.com/api/chat/trending-room', extraParam);

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
    if (data.chat.tempUserId) {
      data.chat.userId = data.chat.tempUserId;
    }

    var chatRoomMyChatList = $.createElement('tip-div');
    var chatRoomMyChatListProfile = $.createElement('img');
    var chatRoomMyChatListContent = $.createElement('tip-span');
    var chatRoomMyChatListRoom = $.createElement('tip-span');
    var chatRoomMyChatListData = $.createElement('tip-div');
    var chatRoomMyChatListUser = $.createElement('tip-span');
    var chatRoomMyChatListMessage = $.createElement('tip-span');
    var chatRoomMyChatListTime = $.createElement('tip-span');
    var chatRoomMyChatListCount = $.createElement('tip-span');

    chatRoomMyChatList.className = 'chatRoomMyChatList ' + type;
    chatRoomMyChatListProfile.className = 'chatRoomMyChatListProfile';
    chatRoomMyChatListContent.className = 'chatRoomMyChatListContent';
    chatRoomMyChatListRoom.className = 'chatRoomMyChatListRoom';
    chatRoomMyChatListData.className = 'chatRoomMyChatListData';
    chatRoomMyChatListUser.className = 'chatRoomMyChatListUser user-' + data._id;
    chatRoomMyChatListMessage.className = 'chatRoomMyChatListMessage message-' + data._id;
    chatRoomMyChatListTime.className = 'chatRoomMyChatListTime time-' + data._id;

    if (siteId == data._id) {
      const chatList = $.querySelectorAll(".chatRoomMyChatList");

      for (let i = 0; i < chatList.length; i++) {
        chatList[i].classList.remove("active");
      }

      chatRoomMyChatList.classList.add("active");
    }

    if (type == 'favorite') {
      chatRoomMyChatListRoom.innerText = addEllipsis(data.url, true);
      chatRoomMyChatListProfile.src = 'https://www.google.com/s2/favicons?sz=32&domain_url=https://' + data.url;
    } else {
      chatRoomMyChatListRoom.innerText = addEllipsis(data.chat.siteId.url, true);
      chatRoomMyChatListProfile.src = 'https://www.google.com/s2/favicons?sz=32&domain_url=https://' + data.chat.siteId.url;
    }

    chatRoomMyChatListUser.innerText = data.chat ? shortUsername(data.chat.userId.isDeleted ? '[Deleted]' : data.chat.userId.username) + ':' : ''
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

    // Add notification
    if (data.unreadChat) {
      if (siteId == data._id) {
        tipChatTabRoomCount.style.setProperty('display', 'flex');
        tipChatTabRoomCount.innerText = data.unreadChat > 99 ? '99+' : data.unreadChat;
      }

      chatRoomMyChatListCount.innerText = data.unreadChat > 99 ? '99+' : data.unreadChat;
      chatRoomMyChatListTime.appendChild(chatRoomMyChatListCount);
    }

    if (type == 'favorite') {
      chatRoomMyChatBox.appendChild(chatRoomMyChatList);
    } else {
      chatRoomTrendingBox.appendChild(chatRoomMyChatList);
    }

    chatRoomMyChatList.onclick = function () {
      siteId = data._id;
      homeSiteId = data._id;

      getChat();

      if (type == 'favorite') {
        let url = isValidUrl(data.url);
        if (url) {
          window.localStorage.setItem('url', url);

          connectChatRoom(data.url);

          getHomeChat();
        } else {
          showAlertBox('Unable to open URL');
        }
      } else {
        let url = isValidUrl(data.chat.siteId.url);
        if (url) {
          window.localStorage.setItem('url', url);

          connectChatRoom(data.chat.siteId.url);

          getHomeChat();
        } else {
          showAlertBox('Unable to open URL');
        }
      }

      // Add notification
      if (data.unreadChat) {
        tipChatTabRoomCount.style.setProperty('display', 'flex');
        tipChatTabRoomCount.innerText = data.unreadChat > 99 ? '99+' : data.unreadChat;
      } else {
        tipChatTabRoomCount.innerText = 0;
        tipChatTabRoomCount.style.setProperty('display', 'none');
      }

      getComments();
      chatRoomMyChatListCount.remove();
      tipChatTabRoom.classList.add('active');
      tipChatTabAI.classList.remove('active');
      tipChatTabPresets.classList.remove('active');
      tipChatTabComment.classList.remove('active');

      chatRoomTitle.before(tipChatTab);
      chatRoomData.appendChild(chatRoomFooter);
      chatRoomData.appendChild(chatEmojiBox);

      const reportBox = $.getElementsByClassName('reportBox');
      const chatList = $.querySelectorAll(".chatRoomMyChatList");

      reportBox.length ? reportBox[0].remove() : null;

      for (let i = 0; i < chatList.length; i++) {
        chatList[i].classList.remove("active");
      }

      chatRoomMyChatList.classList.add("active");
    }
  }

  // Connect with ChatRoom
  async function connectChatRoom(host, href = null) {
    try {
      page = 2;
      roomHost = host;
      chatRoomOpen = true;
      var joinedUser = [];

      tipReplyClose.click();

      if (joinedSite.includes(siteId)) {
        chatRoomJoin.innerText = "Leave";
      } else {
        chatRoomJoin.innerText = "Join";
      }

      chatRoomChat.innerHTML = "";
      chatRoomName.innerText = host;
      headerSiteURL.setAttribute('data-url', href ? href : 'https://' + host);
      headerSiteURL.innerText = href ? addEllipsis(href, true) : 'https://' + host;
      headerSiteIcon.src = 'https://www.google.com/s2/favicons?sz=32&domain_url=https://' + host;

      if (socket) {
        socket.disconnect();
      }

      socket = io.connect('https://new.tipestry.com', {
        path: "/socket/",
        withCredentials: true
      });

      socket.on('connect', () => {
        if (userId && username) {
          socket.emit("join", { id: userId, name: username, site: siteId }, (error) => {
            console.log(error)
          });
        }
      })

      socket.on('joined', (data) => {
        if (data.id != userId) {
          if (!joinedUser.includes(data.id)) {
            joinedUser.push(data.id);
            var centerMessage = $.createElement('tip-div');

            centerMessage.className = 'chat-center';
            centerMessage.innerHTML = data.content;
            chatRoomChat.appendChild(centerMessage);

            chatRoomBody.scrollTo(0, chatRoomBody.scrollHeight);
          }
        }
      });

      socket.on('response', async (data) => {
        var chatIcon = $.createElement('tip-icon');
        var chatIconImg = $.createElement('img');
        var chatBox = $.createElement('tip-span');
        var chatName = $.createElement('tip-span');
        var chatDate = $.createElement('tip-span');
        var messageBox = $.createElement('tip-span');
        var chatContent = $.createElement('tip-span');
        var chatContentText = $.createElement('tip-span');
        var leftMessage = $.createElement('tip-div');
        var tippingBox = $.createElement('tip-div');

        // Menu Item Start
        var chatOption = $.createElement('tip-span');
        var moreVertIcon = $.createElement('img');
        var moreVertMenu = $.createElement('tip-div');
        var deleteMenu = $.createElement('tip-span');
        var editMenu = $.createElement('tip-span');
        var blockMenu = $.createElement('tip-span');
        var reportMenu = $.createElement('tip-span');
        var replyMenu = $.createElement('tip-span');
        var tippingMenu = $.createElement('tip-span');

        chatOption.className = 'chatOption';
        moreVertMenu.className = 'moreVertMenu';
        deleteMenu.className = 'menuOption';
        editMenu.className = 'menuOption';
        blockMenu.className = 'menuOption';
        reportMenu.className = 'menuOption';
        replyMenu.className = 'menuOption';
        tippingMenu.className = 'menuOption';

        replyMenu.innerText = 'Reply';
        editMenu.innerText = 'Edit';
        deleteMenu.innerText = 'Delete';
        blockMenu.innerText = 'Block User';
        reportMenu.innerText = 'Report';
        tippingMenu.innerText = 'Give Tip';
        moreVertIcon.src = './assets/image/more_vert.png';

        moreVertIcon.onclick = function (e) {
          if (!token) {
            return;
          }

          const allMenu = $.querySelectorAll(".moreVertMenu");

          for (let i = 0; i < allMenu.length; i++) {
            allMenu[i].style.display = 'none';
          }

          if ((chatRoomChat.clientWidth - messageBox.clientWidth) <= 130) {
            moreVertMenu.classList.add('right');
          } else {
            moreVertMenu.classList.remove('right');
          }

          moreVertMenu.style.display = 'flex';
          e.stopPropagation();
        }

        if (data.id != userId) {
          // Report Message
          reportMenu.onclick = async function () {
            showReportOpt(data._id);
          }

          // Reply Message
          replyMenu.onclick = function () {
            let display = chatRoomFooterTool.style.display;

            tipReplyUser.innerHTML = chatName.innerHTML;
            tipReplyMessage.innerHTML = chatContentText.innerHTML;
            chatRoomFooterReply.style.setProperty('display', 'flex');

            replyData = {
              chatId: data._id,
              username: chatName.firstChild.textContent,
              datetime: chatDate.innerText,
              chatContent: chatContentText.innerHTML
            };

            if (display == 'none' || display == '') {
              chatRoomFooterReply.classList.add('only');
            } else {
              chatRoomFooterReply.classList.remove('only');
            }
          }

          // Block user
          blockMenu.onclick = async function () {
            try {
              const message = await axios.put('https://new.tipestry.com/api/user/block',
                { userid: data.id },
                {
                  headers: { "x-auth-token": token }
                })

              showAlertBox(message.data);
            } catch (error) {
              console.log(error);
            }
          }

          // tip Message
          tippingMenu.onclick = function () {
            showTippingBox(data, chatRoomData, 'chat', tippingBox);
          }
        }

        // Admin Delete Message
        if (isAdmin && data.id != userId) {
          deleteMenu.onclick = async function () {
            showDeleteOpt(data, chatOption, chatContent);
          }

          moreVertMenu.appendChild(deleteMenu);
        } else if (data.id == userId) {
          // Delete message
          deleteMenu.onclick = async function () {
            try {
              await axios({
                method: "post",
                headers: token ? { "x-auth-token": token } : { "x-user-token": userId },
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

          // Edit message
          editMenu.onclick = function () {
            replyData.type = 'edit';
            replyData.chatId = data._id;
            replyData.chatContent = chatContentText;

            chatRoomInput.value = data.message;
            chatRoomMedia.style.setProperty('display', 'none');
            chatEditClose.style.setProperty('display', 'block');
          }

          moreVertMenu.appendChild(editMenu);
          moreVertMenu.appendChild(deleteMenu);
        }

        if (data.id != userId) {
          moreVertMenu.appendChild(replyMenu);
          moreVertMenu.appendChild(reportMenu);
          moreVertMenu.appendChild(blockMenu);
          moreVertMenu.appendChild(tippingMenu);
        }

        chatOption.appendChild(moreVertIcon);
        chatOption.appendChild(moreVertMenu);
        messageBox.appendChild(chatOption);
        // Menu Item End

        chatIcon.className = 'chatIcon';
        chatName.className = 'chatName';
        chatDate.className = 'chatDateTime';
        messageBox.className = 'messageBox';
        chatContent.className = 'chatContent' + (data.id == userId ? ' self' : '');
        leftMessage.className = 'chat-left';
        tippingBox.className = 'voteBox';

        chatName.innerText = data.name;
        chatDate.innerText = currentTime();
        chatContentText.innerHTML = markupText(data.message);
        chatIconImg.src = data.profile ? 'https://tipestry.com/api/topic/get/img/' + data.profile : './assets/image/profile.png';

        if (data.replyId) {
          await addReplyChat(chatContent, null, data.replyId);
        }

        leftMessage.appendChild(chatIcon);
        leftMessage.appendChild(chatBox);
        chatIcon.appendChild(chatIconImg);
        chatBox.appendChild(chatName);
        chatName.appendChild(chatDate);
        chatBox.appendChild(messageBox);
        chatContent.appendChild(chatContentText);
        chatContent.appendChild(tippingBox);
        messageBox.appendChild(chatContent);
        chatRoomChat.appendChild(leftMessage);

        chatRoomBody.scrollTo(0, chatRoomBody.scrollHeight);
      });

      socket.on('responseFile', async (data) => {
        let play = false;
        let isImage = false;

        var chatIcon = $.createElement('tip-icon');
        var chatIconImg = $.createElement('img');
        var chatBox = $.createElement('tip-span');
        var chatName = $.createElement('tip-span');
        var chatDate = $.createElement('tip-span');
        var messageBox = $.createElement('tip-span');
        var chatContent = $.createElement('tip-span');
        var chatContentBox = $.createElement('tip-span');
        var chatDownload = $.createElement('a');
        var chatDownloadImg = $.createElement('img');
        var leftMessage = $.createElement('tip-div');
        var tippingBox = $.createElement('tip-div');

        if (data.fileType == 'image/svg+xml' || data.fileType == 'image/webp' || data.fileType == 'image/jpeg' || data.fileType == 'image/png' || data.fileType == 'image/gif') {
          isImage = true;
          var chatImage = $.createElement('img');
          chatImage.src = data.fileData;

          viewImage(chatImage);

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

          chatContent.appendChild(chatFile);
        }

        // Menu Item Start
        var chatOption = $.createElement('tip-span');
        var moreVertIcon = $.createElement('img');
        var moreVertMenu = $.createElement('tip-div');
        var deleteMenu = $.createElement('tip-span');
        var blockMenu = $.createElement('tip-span');
        var reportMenu = $.createElement('tip-span');
        var replyMenu = $.createElement('tip-span');
        var tippingMenu = $.createElement('tip-span');

        chatOption.className = 'chatOption';
        moreVertMenu.className = 'moreVertMenu';
        deleteMenu.className = 'menuOption';
        blockMenu.className = 'menuOption';
        reportMenu.className = 'menuOption';
        replyMenu.className = 'menuOption';
        tippingMenu.className = 'menuOption';

        replyMenu.innerText = 'Reply';
        deleteMenu.innerText = 'Delete';
        blockMenu.innerText = 'Block';
        reportMenu.innerText = 'Report';
        tippingMenu.innerText = 'Give Tip';
        moreVertIcon.src = './assets/image/more_vert.png';

        moreVertIcon.onclick = function (e) {
          if (!token) {
            return;
          }

          const allMenu = $.querySelectorAll(".moreVertMenu");

          for (let i = 0; i < allMenu.length; i++) {
            allMenu[i].style.display = 'none';
          }

          if ((chatRoomChat.clientWidth - messageBox.clientWidth) <= 130) {
            moreVertMenu.classList.add('right');
          } else {
            moreVertMenu.classList.remove('right');
          }

          moreVertMenu.style.display = 'flex';
          e.stopPropagation();
        }

        if (data.id != userId) {
          // Report Message
          reportMenu.onclick = async function () {
            showReportOpt(data._id);
          }

          // Reply Message
          replyMenu.onclick = function () {
            let display = chatRoomFooterTool.style.display;

            let contentNode = chatContent.lastChild.previousSibling.cloneNode(true);

            tipReplyMessage.appendChild(contentNode);
            tipReplyUser.innerHTML = chatName.innerHTML;
            chatRoomFooterReply.style.setProperty('display', 'flex');

            replyData = {
              chatId: data._id,
              username: chatName.firstChild.textContent,
              datetime: chatDate.innerText,
              is_media: true,
              chatContent: contentNode
            };

            if (display == 'none' || display == '') {
              chatRoomFooterReply.classList.add('only');
            } else {
              chatRoomFooterReply.classList.remove('only');
            }
          }

          // Block user
          blockMenu.onclick = async function () {
            try {
              const message = await axios.put('https://new.tipestry.com/api/user/block',
                { userid: data.id },
                {
                  headers: { "x-auth-token": token }
                })

              showAlertBox(message.data);
            } catch (error) {
              console.log(error);
            }
          }

          // tip Message
          tippingMenu.onclick = function () {
            showTippingBox(data, chatRoomData, 'chat', tippingBox);
          }
        }

        // Admin Delete Message
        if (isAdmin && data.id != userId) {
          deleteMenu.onclick = async function () {
            showDeleteOpt(data, chatOption, chatContentBox);
          }

          moreVertMenu.appendChild(deleteMenu);
        } else if (data.id == userId) {
          // Delete message
          deleteMenu.onclick = async function () {
            try {
              await axios({
                method: "post",
                headers: token ? { "x-auth-token": token } : { "x-user-token": userId },
                url: 'https://new.tipestry.com/api/chat/delete',
                data: { id: data._id },
              });

              chatOption.remove();
              chatContentBox.className = 'chatContent self';
              chatContentBox.innerHTML = '<i class="deleted">Deleted</i>';

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
        }

        if (data.id != userId) {
          moreVertMenu.appendChild(replyMenu);
          moreVertMenu.appendChild(reportMenu);
          moreVertMenu.appendChild(blockMenu);
          moreVertMenu.appendChild(tippingMenu);
        }

        chatOption.appendChild(moreVertIcon);
        chatOption.appendChild(moreVertMenu);
        messageBox.appendChild(chatOption);
        // Menu Item End

        chatIcon.className = 'chatIcon';
        chatName.className = 'chatName';
        chatDate.className = 'chatDateTime';
        messageBox.className = 'messageBox';
        chatContentBox.className = 'chatMedia' + (data.id == userId ? ' self' : '');
        chatDownloadImg.className = 'chatImage-child-1';
        leftMessage.className = 'chat-left';
        tippingBox.className = 'voteBox';

        chatName.innerText = data.name;
        chatDate.innerText = currentTime();
        chatDownload.href = data.fileData;
        chatDownload.setAttribute('download', data.fileName);
        chatDownloadImg.src = './assets/image/download.png';
        chatIconImg.src = data.profile ? 'https://tipestry.com/api/topic/get/img/' + data.profile : './assets/image/profile.png';

        if (data.replyId) {
          await addReplyChat(chatContentBox, null, data.replyId);
        }

        leftMessage.appendChild(chatIcon);
        leftMessage.appendChild(chatBox);
        chatIcon.appendChild(chatIconImg);
        chatBox.appendChild(chatName);
        chatName.appendChild(chatDate);
        chatBox.appendChild(messageBox);
        chatContentBox.appendChild(chatContent);
        chatContentBox.appendChild(tippingBox);
        messageBox.appendChild(chatContentBox);

        if (!isImage) {
          chatContent.appendChild(chatDownload);
          chatDownload.appendChild(chatDownloadImg);
        }

        chatRoomChat.appendChild(leftMessage);

        chatRoomBody.scrollTo(0, chatRoomBody.scrollHeight);
      });

      socket.on('responseAll', (data) => {
        let user = $.getElementsByClassName('user-' + data.siteId);
        let message = $.getElementsByClassName('message-' + data.siteId);
        let time = $.getElementsByClassName('time-' + data.siteId);

        if (user.length) {
          getChatListData(true);
        }

        for (let i = 0; i < user.length; i++) {
          user[i].innerText = shortUsername(data.name) + ':';
          message[i].innerHTML = addEllipsis(data);
          time[i].innerText = currentTime('', 'time');

          user[i].closest('.chatRoomMyChatList').setAttribute('data-index', new Date().toISOString());
        }

        SortData('trending');
        SortData('favorite');
      });

      presetsBox.style.setProperty('display', 'none');
      commentBox.style.setProperty('display', 'none');
      rightMetaBox.style.setProperty('display', 'none');
      chatRoomData.style.setProperty('display', 'block');
      chatEditClose.style.setProperty('display', 'none');
      chatRoomMedia.style.setProperty('display', 'block');

      setTimeout(() => {
        chatRoomInput.focus();
      }, 1000);
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

        if (user.length) {
          getChatListData(true);
        }

        for (let i = 0; i < user.length; i++) {
          user[i].innerText = shortUsername(data.name) + ':';
          message[i].innerHTML = addEllipsis(data);
          time[i].innerText = currentTime('', 'time');

          user[i].closest('.chatRoomMyChatList').setAttribute('data-index', new Date().toISOString());
        }

        SortData('trending');
        SortData('favorite');
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Add replied message
  async function addReplyChat(node, data = null, replyId = null) {
    if (replyId) {
      const extraParam = {
        params: { q: replyId },
      }

      if (token) {
        extraParam['headers'] = { "x-auth-token": token };
      } else {
        extraParam['headers'] = {};
      }

      const result = await axios.get('https://new.tipestry.com/api/chat', extraParam);

      data = { replyId: result.data.result };
    }

    if (data.replyId) {
      var replyChatBox = $.createElement('tip-div');
      var replyChatMessage = $.createElement('tip-span');
      var replyChatUser = $.createElement('tip-span');

      replyChatBox.className = 'replyChatBox';
      replyChatUser.className = 'replyChatUser';

      if (data.replyId.message) {
        replyChatMessage.innerHTML = markupText(data.replyId.message);
      } else {
        if (data.replyId.media.type == 'image/svg+xml' || data.replyId.media.type == 'image/webp' || data.replyId.media.type == 'image/jpeg' || data.replyId.media.type == 'image/png' || data.replyId.media.type == 'image/gif') {
          var chatImage = $.createElement('img');
          chatImage.src = data.replyId.media.data;

          replyChatMessage.appendChild(chatImage);
        } else if (data.replyId.media.type == 'video/mp4' || data.replyId.media.type == 'video/webm' || data.replyId.media.type == 'audio/ogg') {
          var chatVideo = $.createElement('video');

          chatVideo.src = data.replyId.media.data;
          chatVideo.controls = false;
          chatVideo.muted = false;

          replyChatMessage.appendChild(chatVideo);
        } else {
          var chatFile = $.createElement('tip-span');
          chatFile.innerText = data.replyId.media.name;
          chatFile.className = 'chatFile';

          replyChatMessage.appendChild(chatFile);
        }
      }

      replyChatUser.innerText = (data.replyId.userId.isDeleted ? '[Deleted]' : data.replyId.userId.username) + ' - ' + currentTime(data.replyId.createdAt);

      replyChatBox.appendChild(replyChatMessage);
      replyChatBox.appendChild(replyChatUser);
      node.prepend(replyChatBox);
    }
  }

  // Get comments
  async function getComments(sort = null) {
    var topicTitle = null;

    // Get domain data
    async function getDomainData(site) {
      try {
        // Check user vote
        if (token) {
          const userVote = await axios.get('https://new.tipestry.com/api/site/vote/' + site.data._id,
            {
              params: { vote_type: 'domain' },
              headers: { "x-auth-token": token }
            }
          );

          if (userVote.data.vote == 1) {
            chatRoomVoteUp.classList.add('active');
          } else if (userVote.data.vote == 0) {
            chatRoomVoteDown.classList.add('active');
          } else {
            chatRoomVoteUp.classList.remove('active');
            chatRoomVoteDown.classList.remove('active');
          }
        }

        // Up vote site
        chatRoomVoteUp.onclick = async function () {
          if (!token) {
            tipUser.click();
            return;
          }

          const result = await axios.put('https://new.tipestry.com/api/site/vote', {
            siteId: site.data._id,
            vote: 1,
            vote_type: 'domain'
          },
            { headers: { "x-auth-token": token } }
          );

          if (result.data.vote == 1) {
            chatRoomVoteUp.classList.add('active');
            chatRoomVoteDown.classList.remove('active');
          } else {
            chatRoomVoteUp.classList.remove('active');
          }

          chatRoomVoteCount.innerText = (result.data.domain_upVotes - result.data.domain_downVotes);
        }

        // Down vote site
        chatRoomVoteDown.onclick = async function () {
          if (!token) {
            tipUser.click();
            return;
          }

          const result = await axios.put('https://new.tipestry.com/api/site/vote', {
            siteId: site.data._id,
            vote: 0,
            vote_type: 'domain'
          },
            { headers: { "x-auth-token": token } }
          );

          if (result.data.vote == 0) {
            chatRoomVoteDown.classList.add('active');
            chatRoomVoteUp.classList.remove('active');
          } else {
            chatRoomVoteDown.classList.remove('active');
          }

          chatRoomVoteCount.innerText = (result.data.domain_upVotes - result.data.domain_downVotes);
        }
      } catch (error) {
        console.log(error);
      }
    }

    // Get site data
    async function getSiteData(site) {
      try {
        // Check user vote
        if (token) {
          const userVote = await axios.get('https://new.tipestry.com/api/site/vote/' + site.data._id,
            {
              params: { vote_type: 'site' },
              headers: { "x-auth-token": token }
            }
          );

          if (userVote.data.vote == 1) {
            commentVoteUp.classList.add('active');
          } else if (userVote.data.vote == 0) {
            commentVoteDown.classList.add('active');
          } else {
            commentVoteUp.classList.remove('active');
            commentVoteDown.classList.remove('active');
          }
        }

        // Up vote site
        commentVoteUp.onclick = async function () {
          if (!token) {
            tipUser.click();
            return;
          }

          const result = await axios.put('https://new.tipestry.com/api/site/vote', {
            siteId: site.data._id,
            vote: 1,
            vote_type: 'site'
          },
            { headers: { "x-auth-token": token } }
          );

          if (result.data.vote == 1) {
            commentVoteUp.classList.add('active');
            commentVoteDown.classList.remove('active');
          } else {
            commentVoteUp.classList.remove('active');
          }

          commentVoteCount.innerText = (result.data.upVotes - result.data.downVotes);
        }

        // Down vote site
        commentVoteDown.onclick = async function () {
          if (!token) {
            tipUser.click();
            return;
          }

          const result = await axios.put('https://new.tipestry.com/api/site/vote', {
            siteId: site.data._id,
            vote: 0,
            vote_type: 'site'
          },
            { headers: { "x-auth-token": token } }
          );

          if (result.data.vote == 0) {
            commentVoteDown.classList.add('active');
            commentVoteUp.classList.remove('active');
          } else {
            commentVoteDown.classList.remove('active');
          }

          commentVoteCount.innerText = (result.data.upVotes - result.data.downVotes);
        }
      } catch (error) {
        console.log(error);
      }
    }

    // Get comment tips
    async function getCommentTip(commentId, node, type = 'comment') {
      try {
        const result = await axios.get('https://new.tipestry.com/api/transaction/tip/' + type + '/' + commentId);

        result.data.map((item) => {
          var TipBox = $.createElement('tip-div');
          var TipCoinImg = $.createElement('img');
          var TipAmount = $.createElement('tip-span');

          TipBox.className = 'TipBox';

          TipAmount.innerText = item.amount;

          if (item.walletType != "others") {
            TipCoinImg.src = 'https://new.tipestry.com' + renderCoinImage(item.walletType);
          } else {
            TipCoinImg.src = 'https://new.tipestry.com/api/topic/get/img/' + item.token.icon;
          }

          TipBox.appendChild(TipCoinImg);
          TipBox.appendChild(TipAmount);
          node.appendChild(TipBox);
        })
      } catch (error) {
        console.log(error);
      }
    }

    // Check comment vote
    async function checkVote(commentId, node1, node2, type = 'comment') {
      try {
        const extraParam = {
          headers: { "x-auth-token": token }
        };

        const url = (type == 'topic') ? commentId : "comment/" + commentId;

        const result = await axios.get(
          'https://new.tipestry.com/api/topic/vote/' + url,
          extraParam
        );

        if (result?.data?.vote == 1) {
          node1.classList.add('active');
        }

        if (result?.data?.vote == 0) {
          node2.classList.add('active');
        }
      } catch (error) {
        console.log(error);
      }
    }

    // Vote on comment
    async function voteComment(commentId, vote, node1, node2, node3, type = 'comment') {
      try {
        if (!token) {
          tipUser.click();
          return;
        }

        const extraParam = {
          headers: { "x-auth-token": token }
        };

        const body = {
          vote: vote
        };

        if (type == 'comment') {
          body['commentId'] = commentId;
        } else {
          body['topicId'] = commentId;
        }

        const result = await axios.put(
          'https://new.tipestry.com/api/topic/vote/' + (type == 'comment' ? 'comment' : ''),
          body,
          extraParam
        );

        if (result?.data?.vote == 1) {
          node2.classList.add('active');
          node3.classList.remove('active');
        }

        if (result?.data?.vote == 0) {
          node3.classList.add('active');
          node2.classList.remove('active');
        }

        if (result?.data?.vote == null) {
          node3.classList.remove('active');
          node2.classList.remove('active');
        }

        if (type == 'comment') {
          node1.innerText = result?.data?.count;
        } else {
          node1.innerText = result?.data?.upVotes - result?.data?.downVotes;
        }
      } catch (error) {
        console.log(error);
      }
    }

    // Add replied comment
    async function commentReply(node, replyId) {
      const extraParam = token ? { headers: { "x-auth-token": token } } : {};

      const result = await axios.get('https://new.tipestry.com/api/topic/reply/' + replyId, extraParam);

      result.data.map((data) => {
        commentText(data, node);
      })
    }

    async function commentText(data, node = null) {
      var chatIcon = $.createElement('tip-icon');
      var chatIconImg = $.createElement('img');
      var chatBox = $.createElement('tip-span');
      var chatName = $.createElement('tip-span');
      var chatDate = $.createElement('tip-span');
      var messageBox = $.createElement('tip-span');
      var chatContent = $.createElement('tip-span');
      var chatContentText = $.createElement('tip-span');
      var leftMessage = $.createElement('tip-div');

      // Vote Start
      var voteBox = $.createElement('tip-div');
      var voteUpImg = $.createElement('img');
      var voteDownImg = $.createElement('img');
      var voteCount = $.createElement('tip-span');
      var replyCount = $.createElement('tip-span');
      var replyToggle = $.createElement('img');

      voteBox.className = 'voteBox';
      voteUpImg.className = 'voteUpBox';
      voteDownImg.className = 'voteDownBox';
      replyCount.className = 'replyCount';

      voteCount.innerText = data?.votesCount ?? 0;
      voteUpImg.src = './assets/image/thumb-down.png';
      voteDownImg.src = './assets/image/thumb-down.png';
      replyToggle.src = './assets/image/down-icon.png';
      replyCount.innerText = data?.replyCount + ' replies';

      // Vote Up
      voteUpImg.onclick = async function () {
        voteComment(data?._id, 1, voteCount, voteUpImg, voteDownImg);
      }

      // Vote Down
      voteDownImg.onclick = async function () {
        voteComment(data?._id, 0, voteCount, voteUpImg, voteDownImg);
      }

      voteBox.appendChild(voteUpImg);
      voteBox.appendChild(voteCount);
      voteBox.appendChild(voteDownImg);

      if (data?.replied && data?.replyCount) {
        voteBox.appendChild(replyCount);
        replyCount.appendChild(replyToggle);
      }
      // Vote End

      // Get comment tips
      getCommentTip(data?._id, voteBox);

      // Check vote status
      if (token) {
        checkVote(data?._id, voteUpImg, voteDownImg);
      }

      chatIcon.className = 'chatIcon';
      chatName.className = 'chatName';
      chatDate.className = 'chatDateTime';
      messageBox.className = 'messageBox';
      chatContent.className = 'chatContent' + (data?.userId?._id == userId ? ' self' : '');
      leftMessage.className = 'chat-left';

      chatDate.innerText = currentTime(data.createdAt);
      chatName.innerText = data?.userId?.isDeleted ? '[Deleted]' : (data?.userId?.username ?? 'guest');
      chatContentText.innerHTML = data.deleted ? '<i class="deleted">Deleted</i>' : markupText(data.content);
      chatIconImg.src = data?.userId?.img ? 'https://tipestry.com/api/topic/get/img/' + data.userId.img : './assets/image/profile.png';

      // Menu Item Start
      var chatOption = $.createElement('tip-span');
      var moreVertIcon = $.createElement('img');
      var moreVertMenu = $.createElement('tip-div');
      var deleteMenu = $.createElement('tip-span');

      if (data?.userId?._id != userId) {
        var reportMenu = $.createElement('tip-span');
        var replyMenu = $.createElement('tip-span');
        var blockMenu = $.createElement('tip-span');
        var tippingMenu = $.createElement('tip-span');

        reportMenu.className = 'menuOption';
        replyMenu.className = 'menuOption';
        blockMenu.className = 'menuOption';
        tippingMenu.className = 'menuOption';

        replyMenu.innerText = 'Reply';
        reportMenu.innerText = 'Report';
        blockMenu.innerText = 'Block User';
        tippingMenu.innerText = 'Give Tip';

        // Report Comment
        reportMenu.onclick = async function () {
          showReportOpt(data._id, commentBody, topicTitle);
        }

        // Reply Comment
        replyMenu.onclick = function () {
          let display = chatRoomFooterTool.style.display;

          tipReplyUser.innerHTML = chatName.innerHTML;
          tipReplyMessage.innerHTML = chatContentText.innerHTML;
          chatRoomFooterReply.style.setProperty('display', 'flex');

          replyData = {
            type: 'commentReply',
            chatId: data._id,
            username: chatName.firstChild.textContent,
            datetime: chatDate.innerText,
            chatContent: chatContentText.innerHTML
          };

          if (display == 'none' || display == '') {
            chatRoomFooterReply.classList.add('only');
          } else {
            chatRoomFooterReply.classList.remove('only');
          }
        }

        // Block user
        blockMenu.onclick = async function () {
          try {
            const message = await axios.put('https://new.tipestry.com/api/user/block',
              { userid: data.userId._id },
              {
                headers: { "x-auth-token": token }
              })

            getComments();
            showAlertBox(message.data);
          } catch (error) {
            console.log(error);
          }
        }

        // tip Comment
        tippingMenu.onclick = function () {
          showTippingBox(data, commentBody);
        }
      }

      chatOption.className = 'chatOption';
      moreVertMenu.className = 'moreVertMenu';
      deleteMenu.className = 'menuOption';

      deleteMenu.innerText = 'Delete';
      moreVertIcon.src = './assets/image/more_vert.png';

      moreVertIcon.onclick = function (e) {
        if (!token) {
          return;
        }

        const allMenu = $.querySelectorAll(".moreVertMenu");

        for (let i = 0; i < allMenu.length; i++) {
          allMenu[i].style.display = 'none';
        }

        if (node) {
          var nodes = [];
          var element = node;
          while (element.parentNode) {
            if (element.parentNode.classList.contains('chat-left')) {
              nodes.unshift(element.parentNode);
            }

            if (element.parentNode.classList.contains('tipUserChat')) {
              break;
            }

            element = element.parentNode;
          }

          if ((commentChat.clientWidth - messageBox.clientWidth) <= ((nodes.length * 40) + 130)) {
            moreVertMenu.classList.add('right');
          } else {
            moreVertMenu.classList.remove('right');
          }
        } else {
          if ((commentChat.clientWidth - messageBox.clientWidth) <= 130) {
            moreVertMenu.classList.add('right');
          } else {
            moreVertMenu.classList.remove('right');
          }
        }

        moreVertMenu.style.display = 'flex';
        e.stopPropagation();
      }

      // Admin/Own Delete Comment
      if (isAdmin || (data?.userId?._id == userId)) {
        deleteMenu.onclick = async function () {
          showDeleteOpt(data, chatOption, chatContent, commentBody);
        }

        moreVertMenu.appendChild(deleteMenu);
      }

      if (data?.userId?._id != userId) {
        moreVertMenu.appendChild(replyMenu);
        moreVertMenu.appendChild(reportMenu);
        moreVertMenu.appendChild(blockMenu);
        moreVertMenu.appendChild(tippingMenu);
      }

      chatOption.appendChild(moreVertIcon);
      chatOption.appendChild(moreVertMenu);

      if (!data.deleted) {
        messageBox.appendChild(chatOption);
      }
      // Menu Item End

      leftMessage.appendChild(chatIcon);
      leftMessage.appendChild(chatBox);
      chatIcon.appendChild(chatIconImg);
      chatBox.appendChild(chatName);
      chatName.appendChild(chatDate);

      chatBox.appendChild(messageBox);
      chatContent.appendChild(chatContentText);

      if (!data.deleted) {
        chatContent.appendChild(voteBox);
      }

      messageBox.appendChild(chatContent);

      if (node) {
        node.appendChild(leftMessage);
      } else {
        commentChat.appendChild(leftMessage);
      }

      // Toggle comment reply
      replyCount.onclick = async function () {
        if (replyToggle.classList.contains('active')) {
          replyToggle.classList.remove('active');
          if (chatBox.lastChild.classList.contains('chatBoxReply')) {
            chatBox.lastChild.remove();
          }
        } else {
          if (data.replied) {
            var chatBoxReply = $.createElement('tip-div');

            replyToggle.classList.add('active');
            chatBoxReply.className = 'chatBoxReply';

            chatBox.appendChild(chatBoxReply);

            await commentReply(chatBoxReply, data._id);
          }
        }
      }
    }

    async function postText(data) {
      var chatIcon = $.createElement('tip-icon');
      var chatIconImg = $.createElement('img');
      var chatBox = $.createElement('tip-span');
      var chatName = $.createElement('tip-span');
      var chatDate = $.createElement('tip-span');
      var messageBox = $.createElement('tip-span');
      var chatContent = $.createElement('tip-span');
      var chatContentText = $.createElement('tip-span');
      var leftMessage = $.createElement('tip-div');

      // Vote Start
      var voteBox = $.createElement('tip-div');
      var voteUpImg = $.createElement('img');
      var voteDownImg = $.createElement('img');
      var voteCount = $.createElement('tip-span');
      var replyCount = $.createElement('tip-span');
      var replyToggle = $.createElement('img');

      voteBox.className = 'voteBox';
      voteUpImg.className = 'voteUpBox';
      voteDownImg.className = 'voteDownBox';
      replyCount.className = 'replyCount';

      voteCount.innerText = data?.avgVotes;
      voteUpImg.src = './assets/image/thumb-down.png';
      voteDownImg.src = './assets/image/thumb-down.png';
      replyToggle.src = './assets/image/down-icon.png';
      replyCount.innerText = data?.commentsCount + ' replies';

      // Vote Up
      voteUpImg.onclick = async function () {
        voteComment(data?._id, 1, voteCount, voteUpImg, voteDownImg, 'topic');
      }

      // // Vote Down
      voteDownImg.onclick = async function () {
        voteComment(data?._id, 0, voteCount, voteUpImg, voteDownImg, 'topic');
      }

      voteBox.appendChild(voteUpImg);
      voteBox.appendChild(voteCount);
      voteBox.appendChild(voteDownImg);

      if (data?.commentsCount) {
        voteBox.appendChild(replyCount);
        replyCount.appendChild(replyToggle);
      }
      // Vote End

      // Get post tips
      getCommentTip(data?._id, voteBox, 'topic');

      // Check vote status
      if (token) {
        checkVote(data?._id, voteUpImg, voteDownImg, 'topic');
      }

      chatIcon.className = 'chatIcon';
      chatName.className = 'chatName';
      chatDate.className = 'chatDateTime';
      messageBox.className = 'messageBox';
      chatContent.className = 'chatContent';
      chatContentText.className = 'chatContentText';
      leftMessage.className = 'chat-left';

      const topicText = `${data.title}<br/>https://tipestry.com/topics/${data._id}/${nutralizeTitle(data.title)}`;

      chatDate.innerText = currentTime(data.createdAt);
      chatContentText.innerHTML = markupText(topicText);
      chatName.innerText = data?.userId?.isDeleted ? '[Deleted]' : (data?.userId?.username ?? 'guest');
      chatIconImg.src = data?.userId?.img ? 'https://tipestry.com/api/topic/get/img/' + data.userId.img : './assets/image/profile.png';

      chatContentText.onclick = () => {
        chatContentText.classList.add('active');
      }

      // Menu Item Start
      var chatOption = $.createElement('tip-span');
      var moreVertIcon = $.createElement('img');
      var moreVertMenu = $.createElement('tip-div');
      var replyMenu = $.createElement('tip-span');
      var blockMenu = $.createElement('tip-span');
      var threadMenu = $.createElement('tip-span');

      replyMenu.className = 'menuOption';
      blockMenu.className = 'menuOption';
      threadMenu.className = 'menuOption';

      replyMenu.innerText = 'Reply';
      blockMenu.innerText = 'Block User';
      threadMenu.innerText = 'View Thread';

      // Reply Comment
      replyMenu.onclick = function () {
        topicId = data._id;
        let display = chatRoomFooterTool.style.display;

        tipReplyUser.innerHTML = chatName.innerHTML;
        tipReplyMessage.innerHTML = chatContentText.innerHTML;
        chatRoomFooterReply.style.setProperty('display', 'flex');

        replyData = {
          type: 'comment',
          chatId: data._id,
          username: chatName.firstChild.textContent,
          datetime: chatDate.innerText,
          chatContent: chatContentText.innerHTML
        };

        if (display == 'none' || display == '') {
          chatRoomFooterReply.classList.add('only');
        } else {
          chatRoomFooterReply.classList.remove('only');
        }
      }

      // Block user
      blockMenu.onclick = async function () {
        try {
          const message = await axios.put('https://new.tipestry.com/api/user/block',
            { userid: data.userId._id },
            {
              headers: { "x-auth-token": token }
            })

          getComments();
          showAlertBox(message.data);
        } catch (error) {
          console.log(error);
        }
      }

      // View Thread
      threadMenu.onclick = function () {
        window.open('https://new.tipestry.com/topics/' + data._id + '/' + nutralizeTitle(data.title), 'blank');
      }

      chatOption.className = 'chatOption';
      moreVertMenu.className = 'moreVertMenu';

      moreVertIcon.src = './assets/image/more_vert.png';

      moreVertIcon.onclick = function (e) {
        if (!token) {
          return;
        }

        const allMenu = $.querySelectorAll(".moreVertMenu");

        for (let i = 0; i < allMenu.length; i++) {
          allMenu[i].style.display = 'none';
        }

        if ((commentChat.clientWidth - messageBox.clientWidth) <= 130) {
          moreVertMenu.classList.add('right');
        } else {
          moreVertMenu.classList.remove('right');
        }

        moreVertMenu.style.display = 'flex';
        e.stopPropagation();
      }

      moreVertMenu.appendChild(replyMenu);
      moreVertMenu.appendChild(blockMenu);
      moreVertMenu.appendChild(threadMenu);
      chatOption.appendChild(moreVertIcon);
      chatOption.appendChild(moreVertMenu);
      messageBox.appendChild(chatOption);
      // Menu Item End

      leftMessage.appendChild(chatIcon);
      leftMessage.appendChild(chatBox);
      chatIcon.appendChild(chatIconImg);
      chatBox.appendChild(chatName);
      chatName.appendChild(chatDate);

      chatBox.appendChild(messageBox);
      chatContent.appendChild(chatContentText);
      chatContent.appendChild(voteBox);

      messageBox.appendChild(chatContent);
      commentChat.appendChild(leftMessage);

      // Toggle comment reply
      replyCount.onclick = async function () {
        if (replyToggle.classList.contains('active')) {
          replyToggle.classList.remove('active');
          if (chatBox.lastChild.classList.contains('chatBoxReply')) {
            chatBox.lastChild.remove();
          }
        } else {
          if (data.commentsCount) {
            topicId = data.id;
            topicTitle = data.title;

            var chatBoxReply = $.createElement('tip-div');

            replyToggle.classList.add('active');
            chatBoxReply.className = 'chatBoxReply';

            chatBox.appendChild(chatBoxReply);

            const extraParam = token ? { headers: { "x-auth-token": token } } : {};

            const comments = await axios.get('https://new.tipestry.com/api/topic/comment/' + data.id, extraParam);

            comments.data.map((item) => {
              commentText(item, chatBoxReply);
            });
          }
        }
      }
    }

    try {
      var loading = $.createElement('img');

      loading.className = 'loading';
      loading.src = './assets/image/chat-loading.gif';

      commentBody.appendChild(loading);

      const site = await axios.post("https://new.tipestry.com/api/site", {
        url: setURL().href
      });

      commentVoteCount.innerText = (site.data.upVotes - site.data.downVotes);
      chatRoomVoteCount.innerText = (site.data.domain_upVotes - site.data.domain_downVotes);

      getSiteData(site);
      getDomainData(site);

      const extraParam = {
        params: { url: setURL().href }
      }

      if (token) {
        extraParam['headers'] = { "x-auth-token": token };
      } else {
        extraParam['headers'] = {};
      }

      if (sort) {
        extraParam['params']['sort'] = sort;
      }

      commentChat.innerHTML = "";
      commentCount.innerText = "0 Comments";
      tipChatTabCommentCount.innerText = 0;
      tipChatTabCommentCount.style.setProperty('display', 'none');

      const topic = await axios.get('https://new.tipestry.com/api/topic/by-url', extraParam);

      let commentNo = 0;
      topic.data.topics.map((item) => {
        commentNo += item.commentsCount + 1;

        postText(item);
      });

      loading.remove();
      commentCount.innerText = commentNo + " Comments";

      if (commentNo) {
        tipChatTabCommentCount.innerText = (commentNo > 99) ? '99+' : commentNo;
        tipChatTabCommentCount.style.setProperty('display', 'flex');
      }
    } catch (error) {
      loading.remove();
      tipChatTabCommentCount.innerText = 0;
      tipChatTabCommentCount.style.setProperty('display', 'none');
    }
  }

  // Change current site
  async function changeSite(siteUrl) {
    let url = isValidUrl(siteUrl);
    if (url) {
      headerInput.value = '';
      window.localStorage.setItem('url', url);

      const site = await axios.post("https://new.tipestry.com/api/site", {
        url: setURL().host,
        source: 'metachat'
      });

      siteId = site.data._id;
      homeSiteId = site.data._id;

      getChat();
      connectChatRoom(setURL().host, setURL().href);
      getComments();

      tipChatTabRoom.classList.add('active');
      tipChatTabAI.classList.remove('active');
      tipChatTabPresets.classList.remove('active');
      tipChatTabComment.classList.remove('active');

      chatRoomTitle.before(tipChatTab);
      chatRoomData.appendChild(chatRoomFooter);
      chatRoomData.appendChild(chatEmojiBox);

      const chatList = $.querySelectorAll(".chatRoomMyChatList");

      for (let i = 0; i < chatList.length; i++) {
        chatList[i].classList.remove("active");
      }

      getHomeChat(true);
    } else {
      showAlertBox('Please enter a valid URL');
    }
  }

  // Check API Usage
  async function checkAPIUsage(type = 'AI') {
    return new Promise((resolve, reject) => {
      getItem("usage").then(function (items) {
        if (Object.entries(items).length) {
          if (items.usage.new) {
            if (type == 'chat') {
              if (items?.usage?.chat && (items?.usage?.chat >= 10)) {
                tipUser.click();
                reject('Not logged-in');
              } else {
                setItem("usage", { new: true, limit: items.usage.limit, chat: ((items?.usage?.chat ?? 0) + 1) });
                resolve(true);
              }
            } else {
              if (items.usage.limit >= 10) {
                tipUser.click();
                reject('Not logged-in');
              } else {
                setItem("usage", { new: true, limit: (items.usage.limit + 1), chat: items.usage.chat });
                resolve(true);
              }
            }
          } else {
            resolve(true);
          }
        } else {
          setItem("usage", { new: true, limit: (type == 'AI' ? 1 : 0), chat: (type == 'chat' ? 1 : 0) });
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
  function showReportOpt(id, node = null, title = null) {
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

    label.innerText = "Report this " + (node ? 'comment' : 'message');
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

          var result;
          if (node) {
            result = await axios({
              method: "post",
              headers,
              url: 'https://new.tipestry.com/api/report/comment',
              data: {
                reason,
                userId,
                topicId,
                username,
                commentId: id,
                reportType: "comment",
                message: "Report Comment",
                topicTitle: title,
              },
            });
          } else {
            result = await axios({
              method: "post",
              headers,
              url: 'https://new.tipestry.com/api/chat/report',
              data: { id, reason, message: 'Report Message' },
            });
          }

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

    if (node) {
      node.appendChild(reportBox);
    } else {
      chatRoomData.appendChild(reportBox);
    }
  }

  // Show delete option
  function showDeleteOpt(data, node1, node2, node3 = null) {
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

    label.innerText = "Delete " + (node3 ? 'comment' : 'message');
    deleteCancelBtn.innerText = 'Cancel';
    deleteSubmitBtn.innerText = 'Delete';

    deleteBox.appendChild(label);

    let selectedItem = [];
    let optionArray = { delete: 'Delete this message', all: 'Delete all messages', ban: 'Ban this user' };

    if (node3) {
      var deleteOptBox = $.createElement('tip-div');
      var deleteOptLabel = $.createElement('tip-span');

      deleteOptBox.className = 'reportOptBox';
      deleteOptLabel.innerText = "Are you sure you want to delete this Comment. Once deleted it can't be recovered.";

      deleteBox.appendChild(deleteOptBox);
      deleteOptBox.appendChild(deleteOptLabel);
    } else {
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
    }

    deleteCancelBtn.onclick = function () {
      deleteBox.remove();
    }

    deleteSubmitBtn.onclick = async function () {
      try {
        if (node3) {
          const headers = {
            "x-auth-token": token
          };

          await axios({
            method: "delete",
            headers,
            url: 'https://new.tipestry.com/api/topic/delete/' + topicId + '/' + data._id,
          });

          node1.remove();
          deleteBox.remove();
          node2.className = 'chatContent';
          node2.innerHTML = '<i class="deleted">Deleted</i>';

          getComments();
        } else {
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

            getChat();

            // Update Chat List
            let message = $.getElementsByClassName('message-' + data.siteId);

            for (let i = 0; i < message.length; i++) {
              message[i].innerHTML = '<i class="deleted">Deleted</i>';
            }
          } else {
            showAlertBox('Please select any option');
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    deleteBtnBox.appendChild(deleteCancelBtn);
    deleteBtnBox.appendChild(deleteSubmitBtn);
    deleteBox.appendChild(deleteBtnBox);

    if (node3) {
      node3.appendChild(deleteBox);
    } else {
      chatRoomData.appendChild(deleteBox);
    }
  }

  // Show tipping box
  async function showTippingBox(data, node, type = 'comment', chatNode = null) {
    let coinId = null;
    let coin = 'bitcoin';

    const renderBalance = (coin, user) => {
      switch (coin) {
        case "dogecoin":
          return user.doge.balance;
        case "superdog":
          return user.pom.balance;
        case "bitcoin":
          return user.btc.balance;
        case "ethcoin":
          return user.eth.ethApiBalance;
        case "ethtipcoin":
          return user.eth.tipcoinApiBalance;
        case "ethxrtcoin":
          return user.eth.xrtApiBalance;
        case "ethtipc":
          return user.eth.tipccoinApiBalance;
        case "dogecoincash":
          return user.eth.dogecoincashApiBalance;
        case "ye":
          return user.ye.balance;
        case "pres":
          return user.pres.balance;
        case "joe":
          return user.joe.balance;
        default:
          const balance = user.groupWallets.find((item) => item.tokenName == coin);
          return balance ? balance.balance : 0;
      }
    };

    var TipBox = $.createElement('tip-div');
    var label = $.createElement('tip-span');
    var tipBtnBox = $.createElement('tip-div');
    var tipCryptoBox = $.createElement('tip-div');
    var tipCancelBtn = $.createElement('tip-span');
    var tipSubmitBtn = $.createElement('tip-span');
    var tipAmountText = $.createElement('tip-span');
    var tipAmountLabel = $.createElement('tip-span');
    var tipAmountBox = $.createElement('tip-div');
    var tipCryptoImg = $.createElement('img');
    var tipBalence = $.createElement('tip-span');
    var tipAmountInput = $.createElement('input');

    TipBox.className = 'reportBox';
    label.className = 'reportBoxLabel';
    tipBtnBox.className = 'reportBtnBox';
    tipCryptoBox.className = 'tipCryptoBox';
    tipCancelBtn.className = 'reportBtn cancel';
    tipSubmitBtn.className = 'reportBtn submit';
    tipAmountText.className = 'tipAmountText';
    tipAmountBox.className = 'tipAmountBox';
    tipAmountInput.className = 'tipInput cryptoInput';

    label.innerText = "Tip " + type;
    tipCancelBtn.innerText = 'Cancel';
    tipSubmitBtn.innerText = 'Send Gift';
    tipAmountInput.placeholder = 'Tip amount';
    tipAmountInput.setAttribute('type', 'number');
    tipAmountText.innerHTML = 'Fee of 5% will be deducted from the tip.<br/>User will get';

    // Set default crypto
    getItem("user").then(function (items) {
      if (Object.entries(items).length) {
        const balence = renderBalance(coin, items.user);

        tipBalence.innerText = balence;
        tipCryptoImg.src = 'https://new.tipestry.com/static/tipcoins/bit.svg';
      }
    });

    // List default coins
    defaultCoin.map((item) => {
      if (item.is_admin && !isAdmin) {
        return;
      }

      var tipCrypto = $.createElement('tip-span');
      var tipCryptoIcon = $.createElement('img');

      tipCryptoIcon.title = item.tokenName;
      tipCryptoIcon.src = 'https://new.tipestry.com' + item.icon;

      // Set crypto to pay
      tipCrypto.onclick = function () {
        coinId = null;
        coin = item.ticker;

        let amount = Math.abs(tipAmountInput.value);
        tipAmountLabel.innerHTML = `&nbsp;<b>${amount - amount * (5 / 100)} ${coin}</b>`;

        tipCryptoImg.src = 'https://new.tipestry.com' + item.icon;

        getItem("user").then(function (items) {
          if (Object.entries(items).length) {
            const balence = renderBalance(item.ticker, items.user);

            tipBalence.innerText = balence;
          }
        });
      }

      tipCrypto.appendChild(tipCryptoIcon);
      tipCryptoBox.appendChild(tipCrypto);
    })

    try {
      const crypto = await axios.get('https://new.tipestry.com/api/tokens?status=approved');

      // Filter approved coins
      const activeCryptos = crypto.data.data.filter(
        (item) => item.status == "approved"
      );

      activeCryptos.map((item) => {
        var tipCrypto = $.createElement('tip-span');
        var tipCryptoIcon = $.createElement('img');

        tipCryptoIcon.title = item.tokenName;
        tipCryptoIcon.src = 'https://new.tipestry.com/api/topic/get/img/' + item.icon;

        // Set crypto to pay
        tipCrypto.onclick = function () {
          coinId = item._id;
          coin = item.ticker;

          let amount = Math.abs(tipAmountInput.value);
          tipAmountLabel.innerHTML = `&nbsp;<b>${amount - amount * (5 / 100)} ${coin}</b>`;

          tipCryptoImg.src = 'https://new.tipestry.com/api/topic/get/img/' + item.icon;

          getItem("user").then(function (items) {
            if (Object.entries(items).length) {
              const balence = renderBalance(item.ticker, items.user);

              tipBalence.innerText = balence;
            }
          });
        }

        tipCrypto.appendChild(tipCryptoIcon);
        tipCryptoBox.appendChild(tipCrypto);
      })
    } catch (error) {
      console.log(error.response)
    }

    tipAmountInput.addEventListener("keyup", async function (event) {
      if (event.target.value.length) {
        let amount = Math.abs(event.target.value);

        if (amount > 0) {
          tipAmountText.style.setProperty('display', 'block');
          tipAmountLabel.innerHTML = `&nbsp;<b>${amount - amount * (5 / 100)} ${coin}</b>`;
        } else {
          tipAmountText.style.setProperty('display', 'none');
        }
      } else {
        tipAmountText.style.setProperty('display', 'none');
      }
    })

    tipCancelBtn.onclick = function () {
      TipBox.remove();
    }

    tipSubmitBtn.onclick = async function () {
      try {
        if (tipAmountInput.value.length) {
          let amount = Math.abs(tipAmountInput.value);

          if (amount <= 0) {
            showAlertBox('Amount must be greater than zero');
            return;
          }

          const checkDefaultCoin = defaultCoin.filter(
            (item) => item.ticker == coin
          );

          if (!checkDefaultCoin.length) {
            await axios.post(
              'https://new.tipestry.com/api/transaction/tip/' + type,
              { amount, coin: "others", commentId: data._id, tokenId: coinId },
              { headers: { "x-auth-token": token } }
            );
          } else {
            await axios.post(
              'https://new.tipestry.com/api/transaction/tip/' + type,
              { amount, coin, commentId: data._id },
              { headers: { "x-auth-token": token } }
            );
          }

          TipBox.remove();

          if (type == 'comment') {
            getComments();
          } else {
            getChatTip(data._id, chatNode);
          }
        }
      } catch (error) {
        showAlertBox(error.response.data);
      }
    }

    TipBox.appendChild(label);
    TipBox.appendChild(tipCryptoBox);
    TipBox.appendChild(tipAmountText);
    TipBox.appendChild(tipAmountBox);
    TipBox.appendChild(tipBtnBox);

    tipAmountText.appendChild(tipAmountLabel);
    tipAmountBox.appendChild(tipCryptoImg);
    tipAmountBox.appendChild(tipBalence);
    tipAmountBox.appendChild(tipAmountInput);
    tipBtnBox.appendChild(tipCancelBtn);
    tipBtnBox.appendChild(tipSubmitBtn);

    node.appendChild(TipBox);
  }

  // Mark chat as Read
  function markReadChat() {
    try {
      if (token) {
        axios.post('https://new.tipestry.com/api/chat/read', { siteId }, { headers: { "x-auth-token": token } });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Load Captcha
  function loadCaptcha(page) {
    try {
      axios.get('https://new.tipestry.com/api/captcha/generate', { responseType: "blob" }).then((result) => {
        const reader = new FileReader();
        reader.readAsDataURL(result.data);

        reader.onloadend = () => {
          if (page == 'login') {
            captchaImage.src = reader.result;
          } else {
            signUpCaptchaImage.src = reader.result;
          }

          captchaData.url = result.headers["x-validate-url"];
        };
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Display default coins
  function renderCoinImage(type) {
    const getDefaultCoin = defaultCoin.filter(
      (item) => item.ticker == type
    );

    if (getDefaultCoin.length) {
      return getDefaultCoin[0].icon;
    }
  };

  // Preview Image
  function viewImage(node) {
    node.onclick = function () {
      previewImage.src = node.src;
      imgPreview.style.setProperty('display', 'block');

      previewClose.src = './assets/image/cross.png';
    }

    previewClose.onclick = function () {
      previewImage.src = '';
      imgPreview.style.setProperty('display', 'none');
    }
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
      return data.slice(0, 10 - 3) + "...";
    } else {
      return data;
    }
  }

  // Add ellipsis in message
  function addEllipsis(data, url = false) {
    if (url) {
      if (data.length > 30) {
        return data.slice(0, 30 - 3) + "...";
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
      var message = data.message;
      var filterDiv = document.createElement("div");

      filterDiv.innerHTML = message;
      message = filterDiv.textContent || filterDiv.innerText || "";

      if (message.length > 25) {
        return message.slice(0, 25 - 3) + "...";
      } else {
        return message;
      }
    } else {
      if (
        data.media.type == "image/svg+xml" ||
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
  function markupText(data, ai = false) {
    if (!ai) {
      var dataArray = data.split('<br/>');
      data = dataArray[0];
    }

    data = data.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    data = data.replace(/\__(.*?)\__/g, '<i>$1</i>');
    data = data.replace(/\~~(.*?)\~~/g, '<strike>$1</strike>');
    data = data.replace(/\```(.*?)\```/g, '<code>$1</code>');
    data = data.replace(/\<>(.*?)\<\/>/g, '<code>$1</code>');
    data = data.replace(/((http:|https:)[^\s]+[\w])/g, '<a data-url="$1" class="tip-chat-link">$1</a>');

    if (!ai && dataArray.length > 1) {
      data = `<a data-url="${dataArray[1]}" class="tip-chat-link">${data}</a>`;
    }

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

  // CRUD for IndexedDB
  function IndexedDB(mode, data = null) {
    const key = 1;
    const dbName = 'metachat';
    const tableName = 'ai_data';

    const request = indexedDB.open(dbName, 1);

    request.onerror = (event) => {
      console.error('Error opening database: ', event.target.error);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      if (mode == 'add') {
        insertData(db);
      } else {
        readData(db);
      }
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const store = db.createObjectStore(tableName, { keyPath: 'id', autoIncrement: true });
    };

    function insertData(db) {
      const transaction = db.transaction(tableName, 'readwrite');
      const store = transaction.objectStore(tableName);

      const request = store.get(key);

      request.onsuccess = (event) => {
        const result = event.target.result;

        if (result) {
          store.put({ id: key, data: data });
        } else {
          store.add({ data });
        }
      };
    }

    function readData(db) {
      const transaction = db.transaction(tableName, 'readonly');
      const store = transaction.objectStore(tableName);

      const request = store.get(key);

      request.onsuccess = (event) => {
        const result = event.target.result;
        if (result) {
          userChat.innerHTML = result.data ? result.data : '';
          innerCard.scrollTo(0, innerCard.scrollHeight);
        }
      };
    }
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

  // Nutralize Text
  function nutralizeTitle(title) {
    return title
      .toLocaleLowerCase()
      .split(" ")
      .join("-")
      .replace(/[.*+?^$/{}()!%#>@=:;'|[\]\\]/g, "");
  };

  // Load Restricted Words
  async function loadRestrictedWords() {
    fetch('./assets/json/lang.json')
      .then(response => response.json())
      .then((json) => {
        prohibitedWords = json.words;
      });
  }

  // Check Restricted Words
  function restrictedWords(text) {
    return new Promise((resolve, reject) => {
      text = text.toLowerCase().split(' ');

      for (const word of prohibitedWords) {
        if (text.includes(word.toLowerCase())) {
          resolve(false);
        }
      }

      resolve(true);
    })
  }

  // Append User Login Dailog
  userDialog.appendChild(userClose);
  userDialog.appendChild(dialogLabel);
  userDialog.appendChild(emailLabel);
  userDialog.appendChild(userEmail);
  userDialog.appendChild(passLabel);
  userDialog.appendChild(userPassword);
  userDialog.appendChild(captchaBox);
  userDialog.appendChild(rememberBox);
  userDialog.appendChild(userBtn);
  userDialog.appendChild(googleLogin);
  userLink.appendChild(newUser);
  userDialog.appendChild(userLink);
  captchaBox.appendChild(captchaQuizBox);
  captchaBox.appendChild(captchaValidateBox);
  captchaQuizBox.appendChild(captchaImage);
  captchaQuizBox.appendChild(captchaReload);
  captchaQuizBox.appendChild(captchaInput);
  captchaValidateBox.appendChild(captchaValidatedImg);
  captchaValidateBox.appendChild(captchaValidatedTxt);
  rememberBox.appendChild(rememberInput);
  rememberBox.appendChild(rememberText);
  rememberBox.appendChild(resetPass);

  // Append User Sign Up Dailog
  signUpDialog.appendChild(signUpClose);
  signUpDialog.appendChild(signUpLabel);
  signUpDialog.appendChild(signUpUserName);
  signUpDialog.appendChild(signUpName);
  signUpDialog.appendChild(signUpEmail);
  signUpDialog.appendChild(signUpPassword);
  signUpDialog.appendChild(signUpCaptchaBox);
  signUpDialog.appendChild(termsBox);
  signUpDialog.appendChild(signUpBtn);
  loginLink.appendChild(alreadyUser);
  signUpDialog.appendChild(loginLink);
  termsBox.appendChild(termsInput);
  termsBox.appendChild(termsText);
  signUpCaptchaBox.appendChild(signUpCaptchaQuizBox);
  signUpCaptchaBox.appendChild(signUpCaptchaValidateBox);
  signUpCaptchaQuizBox.appendChild(signUpCaptchaImage);
  signUpCaptchaQuizBox.appendChild(signUpCaptchaReload);
  signUpCaptchaQuizBox.appendChild(signUpCaptchaInput);
  signUpCaptchaValidateBox.appendChild(signUpCaptchaValidatedImg);
  signUpCaptchaValidateBox.appendChild(signUpCaptchaValidatedTxt);

  // Append User Profile Dailog
  userDetails.appendChild(userFullName);
  userDetails.appendChild(userSortName);

  otherInfo.appendChild(otherText);
  otherInfo.appendChild(otherBtn);

  userBtnBox.appendChild(userLogout);
  userBtnBox.appendChild(userVisit);

  profileBox.appendChild(closeProfile);
  profileBox.appendChild(userProfile);
  profileBox.appendChild(userDetails);
  profileBox.appendChild(otherInfo);
  profileBox.appendChild(userBtnBox);

  // Append User Profile Menu
  dialogItem_1.appendChild(img_1);
  dialogItem_1.appendChild(text_1);
  dialogItem_2.appendChild(img_2);
  dialogItem_2.appendChild(text_2);
  dialogItem_3.appendChild(img_3);
  dialogItem_3.appendChild(text_3);

  userDialogList.appendChild(dialogItem_1);
  userDialogList.appendChild(dialogItem_2);
  userDialogList.appendChild(dialogItem_3);
  userMenu.appendChild(userDialogList);

  // Chat Box
  innerCard.appendChild(userChat);
  innerCard.appendChild(metaChat);

  // Append Body Content
  alertParent.appendChild(alertBox);
  container.appendChild(headerBox);
  container.appendChild(mainMetaBox);

  imgPreview.appendChild(previewBox);
  imgPreview.appendChild(previewClose);
  previewBox.appendChild(previewImage);

  mainMetaBox.appendChild(leftMetaBox);
  mainMetaBox.appendChild(rightMetaBox);
  mainMetaBox.appendChild(chatRoomData);
  mainMetaBox.appendChild(commentBox);
  mainMetaBox.appendChild(presetsBox);
  mainMetaBox.appendChild(userDialog);
  mainMetaBox.appendChild(signUpDialog);
  mainMetaBox.appendChild(profileBox);
  mainMetaBox.appendChild(userMenu);
  mainMetaBox.appendChild(alertParent);

  tipChatTab.appendChild(tipChatTabRoomBox);
  tipChatTabRoomBox.appendChild(tipChatTabRoom);
  tipChatTabRoomBox.appendChild(tipChatTabRoomCount);
  tipChatTab.appendChild(tipChatTabAIBox);
  tipChatTabAIBox.appendChild(tipChatTabAI);
  tipChatTabAIBox.appendChild(tipTabAIIcon);
  tipChatTabAIBox.appendChild(tipTabAIMenu);
  tipTabAIMenu.appendChild(tipTabAIOpt_1);
  tipChatTab.appendChild(tipChatTabCommentBox);
  tipChatTabCommentBox.appendChild(tipChatTabComment);
  tipChatTabCommentBox.appendChild(tipChatTabCommentCount);
  tipChatTab.appendChild(tipChatTabPresets);
  rightMetaBox.appendChild(tipChatTab);

  leftMetaBox.appendChild(chatRoomMyHome);
  leftMetaBox.appendChild(chatRoomMyChat);
  leftMetaBox.appendChild(chatRoomTrending);
  rightMetaBox.appendChild(innerCard);
  rightMetaBox.appendChild(footerBox);

  headerBoxLeft.appendChild(headerInput);
  headerBoxRight.appendChild(headerLabel);
  headerBoxRight.appendChild(headerSiteIcon);
  headerBoxRight.appendChild(headerSiteURL);
  headerBoxRight.appendChild(tipBottom);
  headerBoxRight.appendChild(tipHome);
  headerBoxRight.appendChild(tipUser);
  headerBox.appendChild(headerBoxLeft);
  headerBox.appendChild(headerBoxRight);

  footerBox.appendChild(checkHighLight);
  footerBox.appendChild(checkDiscuss);
  footerBox.appendChild(inputOuter);
  inputOuter.appendChild(tipInput);
  inputOuter.appendChild(tipAISend);
  checkDiscuss.appendChild(tipDiscussCheck);
  checkDiscuss.appendChild(tipDiscussLabel);
  checkHighLight.appendChild(tipHighLightCheck);
  checkHighLight.appendChild(tipHighLightLabel);

  // Append Chat room
  chatEmojiFilter.appendChild(chatEmojiInput);
  chatEmojiFilter.appendChild(chatEmojiSearch);
  chatEmojiBox.appendChild(chatEmojiInner);
  chatEmojiBox.appendChild(chatEmojiFilter);

  chatRoomData.appendChild(chatRoomTitle);
  chatRoomTitle.appendChild(chatRoomVoteBox);
  chatRoomTitle.appendChild(chatRoomName);
  chatRoomTitle.appendChild(chatRoomJoin);
  chatRoomVoteBox.appendChild(chatRoomVoteUp);
  chatRoomVoteBox.appendChild(chatRoomVoteCount);
  chatRoomVoteBox.appendChild(chatRoomVoteDown);
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

  chatRoomFooter.appendChild(chatRoomFooterTool);
  chatRoomFooter.appendChild(chatRoomFooterReply);
  chatRoomFooter.appendChild(chatRoomFooterInput);

  chatRoomFooterTool.appendChild(chatToolBold);
  chatRoomFooterTool.appendChild(chatToolItalic);
  chatRoomFooterTool.appendChild(chatToolStrike);
  chatRoomFooterTool.appendChild(chatToolCode);

  chatRoomFooterReply.appendChild(tipReplyClose);
  chatRoomFooterReply.appendChild(tipReplyContainer);
  tipReplyContainer.appendChild(tipReplyMessage);
  tipReplyContainer.appendChild(tipReplyUser);

  chatRoomFooterInput.appendChild(chatRoomMedia);
  chatRoomFooterInput.appendChild(chatRoomInput);
  chatRoomFooterInput.appendChild(chatRoomFile);
  chatRoomFooterInput.appendChild(chatRoomEditor);
  chatRoomFooterInput.appendChild(chatRoomEmoji);
  chatRoomFooterInput.appendChild(chatEditClose);
  chatRoomFooterInput.appendChild(chatRoomSend);

  // Comments
  commentBox.appendChild(commentHeader);
  commentBox.appendChild(commentBody);
  commentBody.appendChild(commentChat);

  commentHeader.appendChild(commentVoteBox);
  commentHeader.appendChild(commentCount);
  commentHeader.appendChild(commentSortBox);
  commentVoteBox.appendChild(commentVoteUp);
  commentVoteBox.appendChild(commentVoteCount);
  commentVoteBox.appendChild(commentVoteDown);
  commentSortBox.appendChild(commentSortText);
  commentSortText.appendChild(commentSortImg);
  commentSortBox.appendChild(commentSortOld);
  commentSortBox.appendChild(commentSortNew);
  commentSortBox.appendChild(commentSortTop);

  // Presets
  presetsBox.appendChild(presetsBody);
  presetsBody.appendChild(presetsUserChat);
  presetsBody.appendChild(presetsChat);

  // Add Elements in Container
  metaContainer.appendChild(container);
  metaContainer.appendChild(imgPreview);

  // Add google login button
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: "70167956137-m4f9d1vj4vicmslucjbjldo4ealvv9ng.apps.googleusercontent.com",
      callback: handleResponse
    });

    google.accounts.id.renderButton(
      googleLogin,
      {
        'type': 'icon',
        'size': 'medium',
        'shape': 'circle',
        'theme': 'outline'
      }
    );
  };

  $.getElementById('containerBox').appendChild(metaContainer);
}
