const userInfo =
document.getElementById(
"userInfo"
);

const logoutBtn =
document.getElementById(
"logoutBtn"
);

/* ======================
   REGISTER USER
====================== */

async function registerUser() {

try {

const name =
document.getElementById(
"name"
).value;

const email =
document.getElementById(
"email"
).value;

const password =
document.getElementById(
"password"
).value;

if (
!name ||
!email ||
!password
) {

alert(
"Please fill all fields ❌"
);

return;

}

const res = await fetch(
"http://localhost:5000/api/auth/register",
{
method: "POST",

headers: {
"Content-Type":
"application/json",
},

body: JSON.stringify({
name,
email,
password,
}),
}
);

const data =
await res.json();

alert(data.message);

/* CLEAR INPUTS */

document.getElementById(
"name"
).value = "";

document.getElementById(
"email"
).value = "";

document.getElementById(
"password"
).value = "";

} catch (err) {

console.log(err);

alert(
"Register Error ❌"
);

}

}

/* ======================
   LOGIN USER
====================== */

async function loginUser() {

try {

const email =
document.getElementById(
"email"
).value;

const password =
document.getElementById(
"password"
).value;

if (
!email ||
!password
) {

alert(
"Please enter email & password ❌"
);

return;

}

const res = await fetch(
"http://localhost:5000/api/auth/login",
{
method: "POST",

headers: {
"Content-Type":
"application/json",
},

body: JSON.stringify({
email,
password,
}),
}
);

const data =
await res.json();

alert(data.message);

if (data.user) {

localStorage.setItem(
"userName",
data.user.name
);

updateUI();

}

/* CLEAR INPUTS */

document.getElementById(
"email"
).value = "";

document.getElementById(
"password"
).value = "";

} catch (err) {

console.log(err);

alert(
"Login Error ❌"
);

}

}

/* ======================
   UPDATE UI
====================== */

function updateUI() {

const userName =
localStorage.getItem(
"userName"
);
if (userName) {

userInfo.innerHTML =
`👋 Hello, ${userName}`;

document.getElementById(
"profileName"
).innerText =
`👤 ${userName}`;

logoutBtn.classList.remove(
"hidden"
);

document.querySelector(
".auth-box"
).style.display =
"none";

} else {

userInfo.innerHTML = "";

logoutBtn.classList.add(
"hidden"
);

document.querySelector(
".auth-box"
).style.display =
"block";

document.getElementById(
"profileName"
).innerText =
"👤 User";

document.getElementById(
"followersCount"
).innerText =
"Followers: 0";

}

}

/* ======================
   LOGOUT
====================== */

if (logoutBtn) {

logoutBtn.addEventListener(
"click",
() => {

localStorage.removeItem(
"userName"
);

updateUI();

alert(
"Logged Out 👋"
);

}
);

}

/* ======================
   CREATE POST
====================== */

async function createPost() {

try {

const content =
document.getElementById(
"postInput"
).value;

const username =
localStorage.getItem(
"userName"
);

if (!content.trim()) {

alert(
"Write something first ❌"
);

return;

}

const res = await fetch(
"http://localhost:5000/api/posts",
{
method: "POST",

headers: {
"Content-Type":
"application/json",
},

body: JSON.stringify({
username,
content,
}),
}
);

const data =
await res.json();

alert(data.message);

document.getElementById(
"postInput"
).value = "";

fetchPosts();

} catch (err) {

console.log(err);

alert(
"Post Error ❌"
);

}

}

/* ======================
   FETCH POSTS
====================== */

async function fetchPosts() {

try {

const res = await fetch(
"http://localhost:5000/api/posts"
);

const posts =
await res.json();

displayPosts(posts);

} catch (err) {

console.log(err);

}

}

/* ======================
   DISPLAY POSTS
====================== */

function displayPosts(posts) {

const container =
document.getElementById(
"postsContainer"
);

container.innerHTML = "";

/* EMPTY POSTS */

if (posts.length === 0) {

container.innerHTML = `

<div class="empty-post">

No posts yet 😔

</div>

`;

return;

}

posts.reverse().forEach(
(post) => {

const date =
new Date(
post.createdAt
).toLocaleString();

container.innerHTML += `

<div class="post">

<h3>
👤 ${post.username}
</h3>

<p>
${post.content}
</p>

<small>
🕒 ${date}
</small>

<p>
❤️ Likes:
${post.likes}
</p>

<button
onclick="likePost(
'${post._id}'
)"
>
Like ❤️
</button>

<button
onclick="deletePost(
'${post._id}'
)"
>
Delete
</button>

<div class="comment-box">

<input
type="text"
id="comment-${post._id}"
placeholder="Write comment"
/>

<button
onclick="addComment(
'${post._id}'
)"
>
Comment
</button>

</div>

<div>

${post.comments.map(
(c) =>

`<p>💬 ${c.text}</p>`

).join("")}

</div>

</div>

`;

}
);

}

/* ======================
   DELETE POST
====================== */

async function deletePost(id) {

try {

await fetch(
`http://localhost:5000/api/posts/${id}`,
{
method: "DELETE",
}
);

alert(
"Post Deleted 🗑️"
);

fetchPosts();

} catch (err) {

console.log(err);

alert(
"Delete Error ❌"
);

}

}

/* ======================
   LIKE POST
====================== */

async function likePost(id) {

try {

await fetch(
`http://localhost:5000/api/posts/like/${id}`,
{
method: "PUT",
}
);

fetchPosts();

} catch (err) {

console.log(err);

}

}

/* ======================
   ADD COMMENT
====================== */

async function addComment(id) {

try {

const text =
document.getElementById(
`comment-${id}`
).value;

if (!text) {

alert(
"Write comment first ❌"
);

return;

}

await fetch(
`http://localhost:5000/api/posts/comment/${id}`,
{
method: "PUT",

headers: {
"Content-Type":
"application/json",
},

body: JSON.stringify({
text,
}),
}
);

fetchPosts();

} catch (err) {

console.log(err);

}

}

/* ======================
   FOLLOW USER
====================== */

let followers = 0;

function followUser() {

followers++;

document.getElementById(
"followersCount"
).innerText =
`Followers: ${followers}`;

}

/* ======================
   INITIAL RUN
====================== */

updateUI();

fetchPosts();
window.registerUser = registerUser;
window.loginUser = loginUser;
window.createPost = createPost;
window.deletePost = deletePost;
window.likePost = likePost;
window.addComment = addComment;
window.followUser = followUser;