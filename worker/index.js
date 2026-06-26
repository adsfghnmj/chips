export default {
  async fetch(request, env) {

    const url = new URL(request.url);

    // CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: cors()
      });
    }
    if (
request.method === "POST" &&
url.pathname === "/register"
){

const {
username,
email,
password
}
=
await request.json();

await env.DB
.prepare(`
INSERT INTO users
(username,email,password,role)
VALUES (?,?,?,?)
`)
.bind(
username,
email,
password,
"user"
)
.run();

return json({
success:true
});

}
if (
request.method === "POST" &&
url.pathname === "/login"
){

const {
email,
password
}
=
await request.json();

const user =
await env.DB
.prepare(`
SELECT *
FROM users
WHERE email = ?
`)
.bind(email)
.first();

if(
!user ||
user.password !== password
){

return json({
success:false,
message:"Invalid login"
});

}

return json({
success:true,
token:String(user.id),
user:{
id:user.id,
username:user.username,
email:user.email,
role:user.role
}
});

}
if(
request.method==="GET" &&
url.pathname==="/dashboard"
){

const token =
request.headers
.get("Authorization")
?.replace(
"Bearer ",
""
);

const user =
await env.DB
.prepare(`
SELECT *
FROM users
WHERE id = ?
`)
.bind(token)
.first();

if(!user){

return json({
success:false
});

}

const vpn =
await env.DB
.prepare(`
SELECT *
FROM vpn_requests
WHERE user_id = ?
`)
.bind(user.id)
.first();

return json({

user,

status:
vpn?.status ||
"none",

vpnLink:
vpn?.vpn_link,

video:
vpn?.tutorial_link,

reason:
vpn?.reject_reason

});

}
if(
request.method==="POST" &&
url.pathname==="/vpn/request"
){

const token =
request.headers
.get("Authorization")
?.replace(
"Bearer ",
""
);

await env.DB
.prepare(`
INSERT INTO vpn_requests
(user_id,status)
VALUES (?,?)
`)
.bind(
token,
"pending"
)
.run();

return json({
success:true
});

}
if(
request.method==="GET" &&
url.pathname==="/vpn"
){

const token =
request.headers
.get("Authorization")
?.replace(
"Bearer ",
""
);

const vpn =
await env.DB
.prepare(`
SELECT *
FROM vpn_requests
WHERE user_id = ?
`)
.bind(token)
.first();

if(!vpn){

return json({
noRequest:true
});

}

return json({

status:
vpn.status,

vpnLink:
vpn.vpn_link,

video:
vpn.tutorial_link,

reason:
vpn.reject_reason

});

}
if(
request.method==="GET" &&
url.pathname==="/admin"
){

const rows =
await env.DB
.prepare(`
SELECT
vpn_requests.id,
users.username,
users.email,
vpn_requests.status
FROM vpn_requests
JOIN users
ON users.id =
vpn_requests.user_id
`)
.all();

return json({
requests:
rows.results
});

}
if(
request.method==="POST" &&
url.pathname==="/admin/approve"
){

const {
id,
vpn,
video
}
=
await request.json();

await env.DB
.prepare(`
UPDATE vpn_requests
SET
status=?,
vpn_link=?,
tutorial_link=?
WHERE id=?
`)
.bind(
"approved",
vpn,
video,
id
)
.run();

return json({
success:true
});

}
if(
request.method==="POST" &&
url.pathname==="/admin/reject"
){

const {
id,
reason
}
=
await request.json();

await env.DB
.prepare(`
UPDATE vpn_requests
SET
status=?,
reject_reason=?
WHERE id=?
`)
.bind(
"rejected",
reason,
id
)
.run();

return json({
success:true
});

}
return new Response(
"Not Found",
{
status:404
}
);

}
};

function json(data){

return Response.json(
data,
{
headers:cors()
}
);

}

function cors(){

return {
"Access-Control-Allow-Origin":"*",
"Access-Control-Allow-Methods":"*",
"Access-Control-Allow-Headers":"*"
};

}
