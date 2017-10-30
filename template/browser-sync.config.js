module.exports = {
  port: 3001,
  ghostMode: false,
  notify: false,
  {{#notServer}}server: true,
  startPath: {{#lib}}"demo.html"{{/lib}}{{#client}}"index.html"{{/client}},
  {{/notServer}}files: [ 'build/*'{{#lib}}, 'demo.html'{{/lib}}{{#server}}, "src/views/index.html"{{/server}}{{#clientOnly}}, "index.html"{{/clientOnly}} ]
};
