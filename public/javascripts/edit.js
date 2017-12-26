

var editor = CodeMirror.fromTextArea(document.getElementById('textarea'), {
  mode:  mode,
  lineNumbers: true,
  theme: 'ambiance',
  tabSize: 2,
  lineWrapping: true,
  indentUnit: 2,
	firstLineNumber: 1,
	extraKeys: {"Ctrl-Space": "autocomplete"},
  autofocus: true,
  keyMap: 'sublime'
});

console.log(mode);

//Catch cursor change event
editor.on('cursorActivity',function(e){
  var line = e.doc.getCursor().line,  //Cursor line
    ch = e.doc.getCursor().ch        //Cursor character

  position.innerHTML = `[${line}:${ch}]`
});

save.addEventListener('click', () => {
  $.post('/api/saveFile', { uri, content: editor.getValue() } , (data, stat) => {
    if (data.ok) {
      console.log('saved');
    } else {
      alert('Whoop! something went worng. ' + data.err)
    }
  })

})
