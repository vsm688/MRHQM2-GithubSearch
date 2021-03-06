// Grabs information from search bar.

const grabQuery = (event) => {
    event.preventDefault();
    fetchPromise(event.target['devquery'].value);
}

// Promise which grabs data from github API.
const fetchPromise = (search_param) => {
  var myHeaders = new Headers();
  let itemsearch = document.getElementById("searchQuery");


  //   add my authorization headers here DO NOT COMMIT THEM TO GITHUB / USE .ENV FILE IF POSSIBLE!
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`https://api.github.com/users/${search_param}`, requestOptions)
    .then((response) => response.text())
    .then((result) => processData(result))
    .catch((error) => console.log("error", error));
};


// Collect data from the API. --> Parses JSON string.

const processData = (jsonObj) => {
  userObj = JSON.parse(jsonObj);
  console.log(userObj);
  const bio = userObj.bio;
  const avatarUrl = userObj.avatar_url;
  const userName = userObj.login;
  const joinDate = constructDateString(convertDate(userObj.created_at));
  const followers = userObj.followers;
  const following = userObj.following;
  const repoNum = userObj.public_repos;
  const twitterUsername = userObj.twitter_username;
  const location = userObj.location;
  const email = userObj.email;
  const blog = userObj.blog;
  fillData(
    avatarUrl,
    userName,
    joinDate,
    followers,
    following,
    repoNum,
    twitterUsername,
    location,
    email,
    blog,
    bio
  );
};

const fillData = (
  avatarUrl,
  userName,
  joinDate,
  followers,
  following,
  repoNum,
  twitterUsername,
  location,
  email,
  blog,
  bio
) => {
  //   fill User Picture.
  document.getElementById("userpic").src = avatarUrl;
  //   fill Username fields in front end.
  userNameArray = document.getElementsByClassName("username");
  fillUserNameInfo(userNameArray, userName);
  //   fill Join date information.
  joinDateArray = document.getElementsByClassName("join-date");
  fillJoinDateInfo(joinDateArray, joinDate);
  //   fill bio information
  fillBio(bio);

  //   next three lines fill followers, following and repoNum statistics.
  document.getElementById("followers-num").innerText = followers;
  document.getElementById("following-num").innerText = following;
  document.getElementById("repo-num").innerText = repoNum;

  fillIcons(twitterUsername, location, email, blog);

  //   Doesn't load the card until all information fields have been filled.
  document.getElementById("card").style.display = "flex";
};

// Helper functions to fill the data into the html. 

const fillIcons = (twitterText, locationText, emailText, blogText) => {
  fillTwitter(twitterText);
  fillLocation(locationText);
  fillEmail(emailText);
  fillBlog(blogText);
};


const fillBio = (bioText) =>{
  if (bioText === null || bioText === "") {
    document.getElementById("bio").innerText = "this profile has no bio.";
  } else {

    document.getElementById("bio").innerText = bioText;
  }
}

const fillTwitter = (twitterText) => {
  if (twitterText === null || twitterText === "") {
    document.getElementById("twitter-text").innerText = "N/A";
    document.getElementById("twitter-icon").style.color = "#a4b5cb";
  } else {
    document.getElementById(
      "twitter-text"
    ).href = `https://twitter.com/${twitterText}`;
    document.getElementById("twitter-text").innerText = twitterText;
    document.getElementById("location-icon").style.color = "#4f6b9d;";
  }
};

const fillLocation = (locationText) => {
  if (locationText === null || locationText === "") {
    document.getElementById("location-text").innerText = "N/A";
    document.getElementById("location-icon").style.color = "#a4b5cb";
  } else {
    document.getElementById("location-text").innerText = locationText;
    document.getElementById("location-icon").style.color = "#4f6b9d;";
  }
};

const fillEmail = (emailText) => {
  if (emailText === null || emailText === "") {
    document.getElementById("email-text").innerText = "N/A";
    document.getElementById("mail-icon").style.color = "#a4b5cb";
  } else {
    document.getElementById("email-text").href = emailText;
    document.getElementById("email-text").innerText = "Email me!";
    document.getElementById("location-icon").style.color = "#4f6b9d;";
  }
};

const fillBlog = (blogText) => {
  if (blogText === null || blogText === "") {
    document.getElementById("blog-text").innerText = "N/A";
    document.getElementById("chain-icon").style.color ="#a4b5cb";
  } else {
    document.getElementById("blog-text").href = blogText;
    document.getElementById("blog-text").innerText = "Blog";
    document.getElementById("location-icon").style.color = "#4f6b9d;";
  }
};


const fillUserNameInfo = (userNameArray, userName) => {
  for (let i = 0; i < userNameArray.length; i++) {
    userNameArray[i].innerText = userName;
  }
};

const fillJoinDateInfo = (joinDateArray, joinDate) => {
  for (let i = 0; i < joinDateArray.length; i++) {
    joinDateArray[i].innerText = "Joined " + joinDate;
  }
};

//   Helper functions for processing the date data. See below for implementation details.

const convertDate = (joinDate) => {
  let dates = joinDate.split("T")[0].split("-");

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let convertedDates = [
    dates[0],
    months[parseInt(dates[1] - 1)],
    parseInt(dates[2]),
  ];

  return convertedDates;
};

const constructDateString = (dateArr) => {
  let dateString = "";
  for (let i = dateArr.length - 1; i >= 0; i--) {
    if (i != 0) {
      dateString += dateArr[i] + "/";
    } else {
      dateString += dateArr[i];
    }
  }
  return dateString;
};


  // light to dark toggle ( incomplete)

const lightToDarkToggle = () =>{
  document.getElementById("light-dark").style.display = "none";
  document.getElementById("dark-light").style.display = "flex";
}

const darkToLightToggle = () =>{
  document.getElementById("light-dark").style.display = "Flex";
  document.getElementById("dark-light").style.display = "none";
}

document.getElementById("light-dark").addEventListener("click",lightToDarkToggle);
document.getElementById("dark-light").addEventListener("click",darkToLightToggle);
