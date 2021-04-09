const profile = {
  profile: {
    status_text: "test",
    status_expiration: Math.floor(Date.now() / 1000) + 600
  }
};

const options = {
  method: 'POST',
  body: JSON.stringify(profile),
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': `Bearer ${token}`
  },
}

const res = await fetch('https://slack.com/api/users.profile.set', options)
console.log(await res.json())
