const { formatHTML } = require("./lib/formatHTML");

describe("formatHTML", () => {
  test.each`
    input                                 | expected
    ${"<p>Hi!</p>"}                       | ${'<span class="tag">&lt;</span><span class="tag-name">p</span><span class="tag">&gt;</span>Hi!<span class="tag">&lt;&#47;</span><span class="tag-name">p</span><span class="tag">&gt;</span>'}
    ${"<body>"}                           | ${'<span class="tag">&lt;</span><span class="tag-name">body</span><span class="tag">&gt;</span>'}
    ${"</body>"}                          | ${'<span class="tag">&lt;&#47;</span><span class="tag-name">body</span><span class="tag">&gt;</span>'}
    ${`<li><a href="link">hola</a></li>`} | ${`<span class="tag">&lt;</span><span class="tag-name">li</span><span class="tag">&gt;</span><span class="tag">&lt;</span><span class="tag-name">a</span> <span class="attr-name">href</span>=<span class="attr-value">"link"</span><span class=\"tag\">&gt;</span>hola<span class="tag">&lt;&#47;</span><span class="tag-name">a</span><span class="tag">&gt;</span><span class="tag">&lt;&#47;</span><span class="tag-name">li</span><span class="tag">&gt;</span>`}
  `("formats HTML accordingly for $input", ({ input, expected }) => {
    const html = ``;

    expect(formatHTML(input)).toEqual([expected]);
  });

  test("formats a full paragraph", () => {
    const html = `
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
    `;
    const formatted = formatHTML(html);

    expect(formatted).toHaveLength(11);
    expect(formatted[1]).toMatch(/pad-left-2/);
    expect(formatted[6]).toMatch(/pad-left-4/);
    expect(formatted[10]).toEqual(
      '<span class="tag">&lt;&#47;</span><span class="tag-name">main</span><span class="tag">&gt;</span>'
    );
  });
});
