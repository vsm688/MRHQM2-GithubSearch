const fetchPromise = (search_param) => {
  var myHeaders = new Headers();

//   add authorization headers here DO NOT COMMIT THEM TO GITHUB!
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("https://api.github.com/users/vsm688", requestOptions)
    .then((response) => response.text())
    .then((result) => processData(result))
    .catch((error) => console.log("error", error));
};

const processData = (jsonObj) => {
  userObj = JSON.parse(jsonObj);
  console.log(userObj);
  const avatarUrl = userObj.avatar_url;
  const userName = userObj.login;
  const joinDate = constructDateString(convertDate(userObj.created_at));
  const followers = userObj.followers;
  const following = userObj.following;
  const repoNum = userObj.public_repos;
  const twitterUsername = userObj.twitter_username;
  const location = userObj.location;
  fillData(
    avatarUrl,
    userName,
    joinDate,
    followers,
    following,
    repoNum,
    twitterUsername,
    location
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
  location
) => {
  //   fill User Picture.
  document.getElementById("userpic").src = avatarUrl;
  //   fill Username fields in front end.
  userNameArray = document.getElementsByClassName("username");
  fillUserNameInfo(userNameArray, userName);
  //   fill Join date information.
  joinDateArray = document.getElementsByClassName("join-date");
  fillJoinDateInfo(joinDateArray, joinDate);
  //   next three lines fill followers, following and repoNum statistics.
  document.getElementById("followers-num").innerText = followers;
  document.getElementById("following-num").innerText = following;
  document.getElementById("repo-num").innerText = repoNum;
  
  fillIcons(twitterUsername,location);

  //   Dont load until card until all information fields have been filled.
  document.getElementById("card").style.display = "flex";
};


const fillIcons = (twitterText, locationText) =>{
    fillTwitter(twitterText);
    fillLocation(locationText);
}

const fillTwitter = (twitterText) => {
  if (twitterText === null) {
    document.getElementById("twitter-text").innerText = "N/A";
  } else {
    document.getElementById("twitter-text").innerText = twitterText;
  }
};

const fillLocation = (locationText) =>{
    if (locationText === null) {
        document.getElementById("location-text").innerText = "N/A";
      } else {
        document.getElementById("location-text").innerText = locationText;
      }
    };


//   Helper functions for processing the data. See below for implementation details.
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

fetchPromise();
