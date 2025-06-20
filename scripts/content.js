if (document.getElementById("toolbarBox")) {
  document.getElementById("toolbarBox").remove();
}
if (document.querySelector(".blog_container_aside")) {
  document.querySelector(".blog_container_aside").remove();
}
if (document.querySelector(".csdn-side-toolbar")) {
  document.querySelector(".csdn-side-toolbar").remove();
}
if (document.querySelector("#rightAside")) {
  document.querySelector("#rightAside").remove();
}
if (document.querySelector(".blog-content-box")) {
  const content = document.querySelector(".blog-content-box");
  content.style.position = "absolute";
  content.style.left = "0";
  content.style.top = "0";
  content.style.width = "100dvw";
}
