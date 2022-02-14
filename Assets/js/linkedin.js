const btn = document.querySelector(".linkedin");

btn.addEventListener("click", () => {
  window.open(
    "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=860rhmsc6a7xdy&redirect_uri=http%3A%2F%2F127.0.0.1%3A5500%2F2022%2Fbadge-pages%2Fparticipant.html&state=foobar&scope=r_liteprofile%20r_emailaddress%20w_member_social"
  );
});
