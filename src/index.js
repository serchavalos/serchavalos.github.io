const { formatHTML } = require("./lib/formatHTML");

const bioHTML = `
<body>
  <main>
    <p class="greeting">Hi!</p>
    <p>My name is Sergio</p>
    <p>Software Engineer @ Spotify</p>
    <ul>
      <li><a href="//www.linkedin.com/in/serchavalos" rel=”noreferrer” target="_blank">/linkedin</a></li>
      <li><a href="//twitter.com/serchavalos" rel=”noreferrer” target="_blank">/twitter</a></li>
      <li><a href="//github.com/serchavalos" rel=”noreferrer” target="_blank">/github</a></li>
      <li><a href="//codepen.io/serchavalos" rel=”noreferrer” target="_blank">/codepen</a></li>
    </ul>
  </main>
</body>
`;

console.log(
  formatHTML(bioHTML)
    .map((row) => `<p>${row}</p>`)
    .join("")
);
